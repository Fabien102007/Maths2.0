/* Mathevo Cloudflare Worker — auth-protected Stripe + feedback API.
   Secrets/configuration à définir dans les variables d'environnement Cloudflare:
   SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY,
   STRIPE_SECRET_KEY, STRIPE_PRICE_MONTHLY, STRIPE_PRICE_ANNUAL, STRIPE_WEBHOOK_SECRET, APP_URL, ALLOWED_ORIGIN.
*/
const cors=(env)=>({"Access-Control-Allow-Origin":env.ALLOWED_ORIGIN||env.APP_URL||"*","Access-Control-Allow-Headers":"Authorization,Content-Type,Stripe-Signature","Access-Control-Allow-Methods":"GET,POST,OPTIONS","Vary":"Origin"});
const json=(data,status=200,env={})=>new Response(JSON.stringify(data),{status,headers:{"Content-Type":"application/json",...cors(env)}});
async function userFromRequest(request,env){
 const token=(request.headers.get("Authorization")||"").replace(/^Bearer\s+/i,"");
 if(!token)throw new Error("Authentification requise.");
 const r=await fetch(env.SUPABASE_URL+"/auth/v1/user",{headers:{apikey:env.SUPABASE_ANON_KEY,Authorization:"Bearer "+token}});
 if(!r.ok)throw new Error("Session invalide ou expirée.");
 return await r.json();
}
async function db(env,path,options={}){
 const r=await fetch(env.SUPABASE_URL+"/rest/v1/"+path,{...options,headers:{apikey:env.SUPABASE_SERVICE_ROLE_KEY,Authorization:"Bearer "+env.SUPABASE_SERVICE_ROLE_KEY,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates,return=representation",...(options.headers||{})}});
 const t=await r.text();if(!r.ok)throw new Error("Erreur base de données: "+t);return t?JSON.parse(t):null;
}
async function stripe(env,path,body){
 const r=await fetch("https://api.stripe.com/v1/"+path,{method:"POST",headers:{Authorization:"Bearer "+env.STRIPE_SECRET_KEY,"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(body)});
 const data=await r.json();if(!r.ok)throw new Error(data.error?.message||"Erreur Stripe.");return data;
}
async function verifyStripe(request,secret,body){
 const sig=request.headers.get("Stripe-Signature")||"";
 const parts=sig.split(",").map(x=>x.trim().split("="));
 const timestamp=parts.find(([key])=>key==="t")?.[1];
 const signatures=parts.filter(([key])=>key==="v1").map(([,value])=>value);
 if(!timestamp||!signatures.length||!secret)return false;
 if(Math.abs(Date.now()/1000-Number(timestamp))>300)return false;
 const encoder=new TextEncoder(),key=await crypto.subtle.importKey("raw",encoder.encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
 const digest=await crypto.subtle.sign("HMAC",key,encoder.encode(timestamp+"."+body));
 const hex=[...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("");
 return signatures.some(signature=>signature.length===hex.length&&signature===hex);
}
export default {
 async fetch(request,env){
  if(request.method==="OPTIONS")return new Response(null,{headers:cors(env)});
  const url=new URL(request.url);
  try{
   if(url.pathname==="/api/stripe-webhook"&&request.method==="POST"){
    const body=await request.text();
    if(!await verifyStripe(request,env.STRIPE_WEBHOOK_SECRET,body))return json({error:"Signature webhook invalide."},400,env);
    const event=JSON.parse(body),obj=event.data.object;
    if(["checkout.session.completed","customer.subscription.updated","customer.subscription.deleted"].includes(event.type)){
      const userId=obj.client_reference_id||obj.metadata?.supabase_user_id;
      const subscriptionId=event.type==="checkout.session.completed"?obj.subscription:obj.id;
      if(userId&&subscriptionId){
        let sub=obj;
        if(event.type==="checkout.session.completed"){
          const rr=await fetch("https://api.stripe.com/v1/subscriptions/"+subscriptionId,{headers:{Authorization:"Bearer "+env.STRIPE_SECRET_KEY}});
          sub=await rr.json();
        }
        await db(env,"user_subscriptions",{method:"POST",body:JSON.stringify({user_id:userId,stripe_customer_id:obj.customer||sub.customer,stripe_subscription_id:subscriptionId,status:sub.status||"active",price_id:sub.items?.data?.[0]?.price?.id||env.STRIPE_PRICE_MONTHLY,current_period_end:sub.current_period_end?new Date(sub.current_period_end*1000).toISOString():null,updated_at:new Date().toISOString()})});
      }
    }
    return json({received:true},200,env);
   }
   if(url.pathname==="/api/checkout"&&request.method==="POST"){
    const user=await userFromRequest(request,env);
    const payload=await request.json().catch(()=>({}));
    const plan=payload.plan==="annual"?"annual":payload.plan==="monthly"||!payload.plan?"monthly":null;
    if(!plan)throw new Error("Formule invalide. Choisis mensuel ou annuel.");
    const priceId=plan==="annual"?env.STRIPE_PRICE_ANNUAL:env.STRIPE_PRICE_MONTHLY;
    if(!priceId)throw new Error("Le tarif "+plan+" n'est pas encore configuré dans Cloudflare.");
    const rows=await db(env,"user_subscriptions?select=stripe_customer_id,status&user_id=eq."+user.id);
    const existing=rows?.[0];
    if(existing&&["active","trialing"].includes(existing.status)){
      return json({error:"Un abonnement Premium est déjà actif sur ce compte. Utilise le portail de gestion pour le modifier."},409,env);
    }
    let customer=existing?.stripe_customer_id;
    if(!customer){const c=await stripe(env,"customers",{email:user.email,"metadata[supabase_user_id]":user.id});customer=c.id;}
    const s=await stripe(env,"checkout/sessions",{mode:"subscription",customer, "line_items[0][price]":priceId,"line_items[0][quantity]":"1",success_url:env.APP_URL+"?payment=success",cancel_url:env.APP_URL+"?payment=cancelled",client_reference_id:user.id,"metadata[supabase_user_id]":user.id,"subscription_data[metadata][supabase_user_id]":user.id});
    return json({url:s.url},200,env);
   }
   if(url.pathname==="/api/subscription"&&request.method==="POST"){
    const user=await userFromRequest(request,env);
    const rows=await db(env,"user_subscriptions?select=status,current_period_end&user_id=eq."+user.id);
    const row=rows?.[0];
    return json({active:!!row&&["active","trialing"].includes(row.status),status:row?.status||"inactive",currentPeriodEnd:row?.current_period_end||null},200,env);
   }
   if(url.pathname==="/api/ai-entitlement"&&request.method==="POST"){
    const user=await userFromRequest(request,env);
    const rows=await db(env,"user_subscriptions?select=status&user_id=eq."+encodeURIComponent(user.id));
    const row=rows?.[0];
    return json({active:!!row&&["active","trialing"].includes(row.status)},200,env);
   }
   if(url.pathname==="/api/portal"&&request.method==="POST"){
    const user=await userFromRequest(request,env);
    const rows=await db(env,"user_subscriptions?select=stripe_customer_id&user_id=eq."+user.id);
    const customer=rows?.[0]?.stripe_customer_id;
    if(!customer)throw new Error("Aucun abonnement Stripe associé à ce compte.");
    const p=await stripe(env,"billing_portal/sessions",{customer,return_url:env.APP_URL});
    return json({url:p.url},200,env);
   }
   if(url.pathname==="/api/feedback"&&request.method==="POST"){
    const user=await userFromRequest(request,env),data=await request.json();
    if(!["bug","cours","exercice","visualisation","idee","autre"].includes(data.category)||typeof data.message!=="string"||data.message.trim().length<5||data.message.length>4000)throw new Error("Retour incomplet ou invalide.");
    await db(env,"beta_feedback",{method:"POST",body:JSON.stringify({user_id:user.id,category:data.category,rating:Math.min(5,Math.max(1,Number(data.rating)||3)),message:data.message.trim()})});
    return json({ok:true},200,env);
   }
   return json({error:"Route inconnue."},404,env);
  }catch(e){return json({error:e.message||"Erreur interne."},400,env);}
 }
};
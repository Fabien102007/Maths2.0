/* Maths2.0 — authentication, cloud sync and billing bridge.
   Configure window.MATHS2_CONFIG in config.js with the Supabase project URL,
   anon key and the deployed Cloudflare Worker URL. Never put service-role or Stripe
   secret keys in this file. */
(() => {
 "use strict";
 const cfg=window.MATHS2_CONFIG||{};
 const modal=document.getElementById("accountModal");
 const status=document.getElementById("accountStatus");
 const form=document.getElementById("accountForm");
 const signed=document.getElementById("accountSignedIn");
 const open=document.getElementById("accountOpen");
 const close=document.getElementById("accountClose");
 if(!modal||!open)return;
 let client=null,session=null,syncTimer=null;
 const ready=()=>!!(cfg.supabaseUrl&&cfg.supabaseAnonKey&&window.supabase?.createClient);
 const message=t=>{if(status)status.textContent=t};
 const show=()=>{modal.hidden=false;document.getElementById("accountEmail")?.focus()};
 const hide=()=>{modal.hidden=true};
 const callWorker=async(path,body={})=>{
   if(!session?.access_token||!cfg.workerUrl)throw new Error("Le service de compte n'est pas encore configuré.");
   const res=await fetch(cfg.workerUrl.replace(/\/$/,"")+path,{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+session.access_token},body:JSON.stringify(body)});
   const data=await res.json().catch(()=>({}));
   if(!res.ok)throw new Error(data.error||"Le service est momentanément indisponible.");
   return data;
 };
 const syncProgress=async()=>{
   if(!client||!session)return;
   try{
     const local=JSON.parse(localStorage.getItem("maths4_studio_v1")||"{}");
     const {data,error}=await client.from("user_progress").select("state,updated_at").eq("user_id",session.user.id).maybeSingle();
     if(error)throw error;
     const localDate=local.updatedAt||"1970-01-01";
     const cloudDate=data?.updated_at||"1970-01-01";
     if(data?.state&&new Date(cloudDate)>new Date(localDate)){
       localStorage.setItem("maths4_studio_v1",JSON.stringify(data.state));
       message("Une progression cloud plus récente a été restaurée. Recharge l'application pour l'afficher.");
     }else{
       const now=new Date().toISOString();
       const {error:upsertError}=await client.from("user_progress").upsert({user_id:session.user.id,state:{...local,updatedAt:now},updated_at:now},{onConflict:"user_id"});
       if(upsertError)throw upsertError;
       message("Connecté : progression synchronisée avec ton compte.");
     }
     if(cfg.workerUrl){
       const sub=await callWorker("/api/subscription");
       const plan=document.getElementById("accountPlanStatus");
       if(plan)plan.textContent=sub.active?"Maths2.0 Premium · abonnement "+sub.status:"Offre gratuite";
     }
   }catch(e){message("Compte connecté, mais synchronisation non terminée : "+e.message);}
 };
 const refresh=async(s)=>{
   session=s;
   if(s){
     form.hidden=true;signed.hidden=false;
     open.textContent="Mon compte · connecté";
     message("Connecté avec "+s.user.email+".");
     await syncProgress();
   }else{
     form.hidden=false;signed.hidden=true;open.textContent="Mon compte";
     message(ready()?"Connecte-toi pour synchroniser ta progression.":"La connexion sera activée dès que le projet Supabase et le Worker seront configurés.");
   }
 };
 open.addEventListener("click",show);close?.addEventListener("click",hide);
 modal.addEventListener("click",e=>{if(e.target===modal)hide()});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!modal.hidden)hide()});
 if(!ready()){
   message("Configuration requise : renseigner l'URL et la clé publique du projet Supabase, puis déployer le Worker Cloudflare.");
 }else{
   client=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey);
   client.auth.getSession().then(({data})=>refresh(data.session));
   client.auth.onAuthStateChange((_event,s)=>{session=s;refresh(s)});
 }
 form?.addEventListener("submit",async e=>{
   e.preventDefault();
   if(!client){message("Supabase n'est pas encore configuré.");return;}
   const email=document.getElementById("accountEmail").value.trim(),password=document.getElementById("accountPassword").value;
   const {data,error}=await client.auth.signInWithPassword({email,password});
   if(error){message(error.message);return;}await refresh(data.session);
 });
 document.getElementById("accountSignUp")?.addEventListener("click",async()=>{
   if(!client){message("Supabase n'est pas encore configuré.");return;}
   const email=document.getElementById("accountEmail").value.trim(),password=document.getElementById("accountPassword").value;
   if(!email||password.length<8){message("Saisis un e-mail et un mot de passe d'au moins 8 caractères.");return;}
   const {data,error}=await client.auth.signUp({email,password});
   if(error){message(error.message);return;}
   message(data.session?"Compte créé.":"Compte créé : vérifie ton e-mail pour confirmer l'inscription.");
   if(data.session)await refresh(data.session);
 });
 document.getElementById("accountUpgrade")?.addEventListener("click",async()=>{
   try{const data=await callWorker("/api/checkout");if(data.url)location.href=data.url;}
   catch(e){message(e.message);}
 });
 document.getElementById("feedbackSend")?.addEventListener("click",async()=>{
   const messageText=document.getElementById("feedbackMessage").value.trim();
   if(messageText.length<5){message("Écris un retour d'au moins 5 caractères.");return;}
   try{
     await callWorker("/api/feedback",{category:document.getElementById("feedbackCategory").value,rating:Number(document.getElementById("feedbackRating").value),message:messageText});
     document.getElementById("feedbackMessage").value="";
     message("Merci ! Ton retour a bien été transmis à l'équipe Maths2.0.");
   }catch(e){message(e.message);}
 });
 document.getElementById("accountSignOut")?.addEventListener("click",async()=>{await client?.auth.signOut();await refresh(null)});
 document.getElementById("accountManagePlan")?.addEventListener("click",async()=>{
   try{const data=await callWorker("/api/portal");if(data.url)location.href=data.url;}
   catch(e){message(e.message);}
 });
 window.Maths2Account={sync:syncProgress,scheduleSync:()=>{clearTimeout(syncTimer);syncTimer=setTimeout(()=>syncProgress(),1800)},checkout:async()=>callWorker("/api/checkout")};
})();
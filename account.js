/* Mathevo — authentication, local guest profile and optional cloud sync. */
(() => {
 "use strict";
 const cfg=window.MATHS2_CONFIG||{};
 const modal=document.getElementById("accountModal");
 const status=document.getElementById("accountStatus");
 const form=document.getElementById("accountForm");
 const signed=document.getElementById("accountSignedIn");
 const open=document.getElementById("accountOpen");
 const close=document.getElementById("accountClose");
 const welcome=document.getElementById("welcomeModal");
 const welcomeForm=document.getElementById("welcomeForm");
 const welcomeStatus=document.getElementById("welcomeStatus");
 if(!modal||!open)return;
 const PROFILE_KEY="maths2_profile_v1";
 const readProfile=()=>{try{return JSON.parse(localStorage.getItem(PROFILE_KEY)||"{}")}catch{return {}}};
 const saveProfile=patch=>{
   const next={...readProfile(),...patch};
   localStorage.setItem(PROFILE_KEY,JSON.stringify(next));
   document.dispatchEvent(new CustomEvent("maths2:profile-updated",{detail:next}));
   return next;
 };
 const setWelcomeMessage=t=>{if(welcomeStatus)welcomeStatus.textContent=t};
 const showWelcome=()=>{if(welcome)welcome.hidden=false};
 const hideWelcome=()=>{if(welcome)welcome.hidden=true};
 const showAccount=()=>{modal.hidden=false;document.getElementById("accountEmail")?.focus()};
 const hideAccount=()=>{modal.hidden=true};
 let client=null,session=null,syncTimer=null;
 const ready=()=>cfg.accountsEnabled===true&&!!(cfg.supabaseUrl&&cfg.supabaseAnonKey&&window.supabase?.createClient);
 const message=t=>{if(status)status.textContent=t};
 const firstNameOf=s=>String(s?.user?.user_metadata?.first_name||s?.user?.user_metadata?.full_name||s?.user?.user_metadata?.name||"").trim()||String(readProfile().firstName||"").trim();
 const syncProgress=async()=>{
   if(!client||!session||cfg.progressSyncEnabled!==true)return;
   try{
     const local=JSON.parse(localStorage.getItem("maths4_studio_v1")||"{}");
     const {data,error}=await client.from("user_progress").select("state,updated_at").eq("user_id",session.user.id).maybeSingle();
     if(error)throw error;
     const localDate=local.updatedAt||"1970-01-01",cloudDate=data?.updated_at||"1970-01-01";
     if(data?.state&&new Date(cloudDate)>new Date(localDate)){
       localStorage.setItem("maths4_studio_v1",JSON.stringify(data.state));
       message("Une progression cloud plus récente a été restaurée. Recharge l'application pour l'afficher.");
     }else{
       const now=new Date().toISOString();
       const {error:upsertError}=await client.from("user_progress").upsert({user_id:session.user.id,state:{...local,updatedAt:now},updated_at:now},{onConflict:"user_id"});
       if(upsertError)throw upsertError;
       message("Connecté : progression synchronisée avec ton compte.");
     }
   }catch(e){message("Compte connecté, mais synchronisation non terminée : "+e.message);}
 };
 const callWorker=async(path,body={})=>{
   if(!session?.access_token||!cfg.workerUrl)throw new Error("Le service de compte n'est pas encore configuré.");
   const res=await fetch(cfg.workerUrl.replace(/\/$/,"")+path,{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+session.access_token},body:JSON.stringify(body)});
   const data=await res.json().catch(()=>({}));
   if(!res.ok)throw new Error(data.error||"Le service est momentanément indisponible.");
   return data;
 };
 const refresh=async(s)=>{
   session=s;
   if(s){
     const firstName=firstNameOf(s)||readProfile().firstName;
     if(firstName)saveProfile({firstName,guest:false});
     if(form)form.hidden=true;
     if(signed)signed.hidden=false;
     const nameInput=document.getElementById("accountFirstName");if(nameInput)nameInput.value=firstName||"";
     const billingReady=!!cfg.workerUrl;
     const upgradeButtons=["accountUpgrade","accountUpgradeAnnual","accountUpgradePreview","accountUpgradePreviewAnnual"].map(id=>document.getElementById(id)).filter(Boolean);
     const manage=document.getElementById("accountManagePlan");
     const feedback=document.getElementById("feedbackSend");
     upgradeButtons.forEach(button=>{button.disabled=!billingReady;});
     const monthly=document.getElementById("accountUpgrade");if(monthly)monthly.textContent="Choisir le mensuel · 5,99 €/mois";
     const annual=document.getElementById("accountUpgradeAnnual");if(annual)annual.textContent="Choisir l'annuel · 49,99 €/an";
     const previewMonthly=document.getElementById("accountUpgradePreview");if(previewMonthly)previewMonthly.textContent="Choisir le mensuel · 5,99 €/mois";
     const previewAnnual=document.getElementById("accountUpgradePreviewAnnual");if(previewAnnual)previewAnnual.textContent="Choisir l'annuel · 49,99 €/an";
     if(manage)manage.disabled=!billingReady;
     if(feedback)feedback.disabled=!billingReady;
     open.textContent="Mon compte · connecté";
     message("Connecté avec "+s.user.email+".");
     if(cfg.progressSyncEnabled===true)await syncProgress();
     else{
       const plan=document.getElementById("accountPlanStatus");
       if(plan)plan.textContent="Compte créé · progression conservée sur cet appareil";
       message("Compte connecté. La progression reste pour le moment enregistrée sur cet appareil.");
     }
   }else{
     if(form)form.hidden=false;
     if(signed)signed.hidden=true;
     open.textContent="Mon compte";
     message(ready()?"Connecte-toi pour retrouver ton compte.":"La création de compte n'est pas disponible pour le moment. Le mode invité reste accessible.");
   }
 };
 open.addEventListener("click",showAccount);
 close?.addEventListener("click",hideAccount);
 modal.addEventListener("click",e=>{if(e.target===modal)hideAccount()});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!modal.hidden)hideAccount()});
 document.getElementById("welcomeGuest")?.addEventListener("click",()=>{
   const firstName=String(document.getElementById("welcomeFirstName")?.value||"").trim();
   if(!firstName){setWelcomeMessage("Indique ton prénom pour personnaliser ton espace.");document.getElementById("welcomeFirstName")?.focus();return;}
   saveProfile({firstName,guest:true});
   hideWelcome();
 });
 document.getElementById("welcomeLogin")?.addEventListener("click",()=>{
   hideWelcome();showAccount();message("Connecte-toi avec ton compte Mathevo.");
 });
 welcomeForm?.addEventListener("submit",async e=>{
   e.preventDefault();
   if(!ready()){setWelcomeMessage("La création de compte n'est pas disponible pour le moment. Tu peux continuer en invité.");return;}
   const firstName=String(document.getElementById("welcomeFirstName").value||"").trim();
   const email=String(document.getElementById("welcomeEmail").value||"").trim();
   const password=document.getElementById("welcomePassword").value;
   if(!firstName){setWelcomeMessage("Saisis ton prénom.");return;}
   if(password.length<8){setWelcomeMessage("Le mot de passe doit contenir au moins 8 caractères.");return;}
   const button=document.getElementById("welcomeCreate");if(button)button.disabled=true;
   setWelcomeMessage("Création de ton compte…");
   try{
     const {data,error}=await client.auth.signUp({email,password,options:{data:{first_name:firstName}}});
     if(error)throw error;
     saveProfile({firstName,guest:false});
     if(data.session){await refresh(data.session);hideWelcome();}
     else{hideWelcome();showAccount();message("Compte créé. Vérifie ta boîte mail pour confirmer ton adresse, puis connecte-toi.");}
   }catch(err){setWelcomeMessage(err.message||"Impossible de créer le compte pour le moment.");}
   finally{if(button)button.disabled=false;}
 });
 form?.addEventListener("submit",async e=>{
   e.preventDefault();
   if(!client){message("Le service de compte n'est pas disponible.");return;}
   const email=document.getElementById("accountEmail").value.trim(),password=document.getElementById("accountPassword").value;
   const {data,error}=await client.auth.signInWithPassword({email,password});
   if(error){message(error.message);return;}
   await refresh(data.session);
 });
 document.getElementById("accountSignUp")?.addEventListener("click",async()=>{
   if(!client){message("Le service de compte n'est pas disponible.");return;}
   const email=document.getElementById("accountEmail").value.trim(),password=document.getElementById("accountPassword").value;
   if(!email||password.length<8){message("Saisis un e-mail et un mot de passe d'au moins 8 caractères.");return;}
   const firstName=readProfile().firstName||"";
   const {data,error}=await client.auth.signUp({email,password,options:{data:{first_name:firstName}}});
   if(error){message(error.message);return;}
   message(data.session?"Compte créé.":"Compte créé : vérifie ton e-mail pour confirmer l'inscription.");
   if(data.session)await refresh(data.session);
 });
 const startCheckout=async plan=>{
   try{message("Préparation du paiement sécurisé…");const data=await callWorker("/api/checkout",{plan});if(data.url)location.href=data.url;else message("Stripe n'a pas retourné de lien de paiement.");}
   catch(e){message(e.message);}
 };
 document.getElementById("accountUpgrade")?.addEventListener("click",()=>startCheckout("monthly"));
 document.getElementById("accountUpgradeAnnual")?.addEventListener("click",()=>startCheckout("annual"));
 document.getElementById("accountUpgradePreview")?.addEventListener("click",()=>startCheckout("monthly"));
 document.getElementById("accountUpgradePreviewAnnual")?.addEventListener("click",()=>startCheckout("annual"));
 document.getElementById("feedbackSend")?.addEventListener("click",async()=>{
   const messageText=document.getElementById("feedbackMessage").value.trim();
   if(messageText.length<5){message("Écris un retour d'au moins 5 caractères.");return;}
   try{
     await callWorker("/api/feedback",{category:document.getElementById("feedbackCategory").value,rating:Number(document.getElementById("feedbackRating").value),message:messageText});
     document.getElementById("feedbackMessage").value="";
     message("Merci ! Ton retour a bien été transmis à l'équipe Mathevo.");
   }catch(e){message(e.message);}
 });
 document.getElementById("accountSaveName")?.addEventListener("click",async()=>{
   const firstName=String(document.getElementById("accountFirstName")?.value||"").trim();
   if(!firstName){message("Saisis ton prénom.");return;}
   saveProfile({firstName,guest:false});
   if(client&&session){
     const {data,error}=await client.auth.updateUser({data:{first_name:firstName,full_name:firstName}});
     if(error){message("Prénom enregistré sur cet appareil, mais pas sur le compte : "+error.message);return;}
     session=data.user?{...session,user:data.user}:session;
   }
   message("Prénom enregistré : "+firstName+".");
 });
 document.getElementById("accountSignOut")?.addEventListener("click",async()=>{await client?.auth.signOut();await refresh(null)});
 document.getElementById("accountManagePlan")?.addEventListener("click",async()=>{
   try{const data=await callWorker("/api/portal");if(data.url)location.href=data.url;}catch(e){message(e.message);}
 });
 window.Maths2Account={sync:syncProgress,scheduleSync:()=>{clearTimeout(syncTimer);syncTimer=setTimeout(()=>syncProgress(),1800)},checkout:async(plan="monthly")=>callWorker("/api/checkout",{plan})};
 if(ready()){
   client=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey);
   client.auth.onAuthStateChange((_event,s)=>{refresh(s)});
   client.auth.getSession().then(async({data})=>{
     await refresh(data.session);
     if(!data.session&&!readProfile().firstName)showWelcome();
   }).catch(()=>{if(!readProfile().firstName)showWelcome()});
 }else{
   message("Tu peux utiliser Mathevo en invité. La création de compte sera disponible lorsque le service sera activé.");
   if(!readProfile().firstName)showWelcome();
   const signUp=document.getElementById("accountSignUp");
   if(signUp)signUp.disabled=true;
   const signIn=document.getElementById("accountSignIn");
   if(signIn)signIn.disabled=true;
 }
})();

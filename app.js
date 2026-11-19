(() => {
"use strict";
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const KEY="maths4_studio_v1";
const blank=()=>({mastered:[],solved:[],attempts:{},reviews:{},sessions:0,reviewCount:0,lastDay:"",streak:0,diagnostic:null});
let state=(()=>{try{return {...blank(),...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{return blank()}})();
let activeTopic=null,activeExercise=null,activeMode="tutor",chatHistory=[],chatImage=null,reviewQueue=[],reviewIndex=0,reviewFlipped=false;
const save=()=>{localStorage.setItem(KEY,JSON.stringify(state));renderDashboard();};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const typeset=el=>{if(window.MathJax?.typesetPromise)window.MathJax.typesetPromise([el]).catch(()=>{});};
const topic=id=>TOPICS.find(t=>t.id===id);
const dueTopics=()=>TOPICS.filter(t=>state.reviews[t.id]&&state.reviews[t.id].due<=Date.now());
const mastered=id=>state.attempts[id]?.independent>=2 && state.attempts[id]?.lastScore>=0.8;
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2600)}
function go(view){$$(".view").forEach(v=>v.classList.toggle("active",v.id==="view-"+view));$$(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.view===view));$("#crumb").textContent=({home:"Vue d'ensemble",path:"Mon parcours",courses:"Cours",exercises:"Exercices",tutor:"Tuteur IA",visuals:"Laboratoire visuel",review:"Révisions",progress:"Progression"})[view]||view;$("#sidebar").classList.remove("open");if(view==="courses")renderCourses();if(view==="exercises")renderExercises();if(view==="path")renderPath();if(view==="progress")renderProgress();if(view==="visuals")drawVisuals();if(view==="review")renderReviewStart();window.scrollTo({top:0,behavior:"smooth"})}
function renderDashboard(){
 const count=TOPICS.filter(t=>mastered(t.id)).length,solved=state.solved.length,due=dueTopics().length,pct=Math.round(100*count/TOPICS.length);
 $("#statMastered").textContent=count+"/"+TOPICS.length;$("#masteryRate").textContent=pct+" %";$("#statSolved").textContent=solved;$("#statDue").textContent=due;$("#statSessions").textContent=state.sessions;$("#streak").textContent=state.streak;
 $("#todayLabel").textContent=new Intl.DateTimeFormat("fr-FR",{weekday:"long",day:"numeric",month:"long"}).format(new Date());
 const next=chooseNextTopic();$("#dailyTitle").textContent=next?"Travailler : "+next.title:"Entretenir tes acquis";$("#dailyDescription").textContent=next?next.summary:"Toutes les notions ont été travaillées. Profite de cette séance pour consolider les notions déjà vues.";$("#bigProgress").textContent=pct+"%";$("#bigProgressBar").style.width=pct+"%";
}
function chooseNextTopic(){const due=dueTopics()[0];if(due)return due;return TOPICS.find(t=>!mastered(t.id))||TOPICS[0]}
function renderPath(){
 const host=$("#diagnosticArea"),rec=$("#pathRecommendation");rec.innerHTML="";
 if(!state.diagnostic){$("#pathTitle").textContent="Diagnostic de départ";$("#pathText").textContent="Réponds à quelques questions pour identifier tes points d'appui. Ce diagnostic ne note pas ton niveau : il oriente simplement ton parcours.";
 const qs=[{q:"Si uₙ=1/n, quelle est sa limite lorsque n tend vers +∞ ?",a:["0","1","+∞"],correct:0,topic:"limits"},{q:"Une fonction dérivable en a est nécessairement…",a:["continue en a","bornée sur R","strictement croissante"],correct:0,topic:"derivative"},{q:"Une famille libre de n vecteurs dans un espace de dimension n est…",a:["une base","toujours orthogonale","vide"],correct:0,topic:"basis"},{q:"Une matrice carrée est inversible lorsque…",a:["son déterminant est non nul","tous ses coefficients sont positifs","sa trace vaut 1"],correct:0,topic:"matrices"}];
 host.innerHTML='<div class="diagnostic-questions">'+qs.map((q,i)=>`<div class="diagnostic-q"><b>${i+1}. ${q.q}</b><div>${q.a.map((a,j)=>`<label><input type="radio" name="dq${i}" value="${j}"> ${a}</label>`).join("")}</div></div>`).join("")+'</div><button class="btn primary" id="submitDiagnostic">Analyser mes réponses →</button>';
 $("#submitDiagnostic").onclick=()=>{let score=0,by={};qs.forEach((q,i)=>{const v=$(`input[name="dq${i}"]:checked`);if(v&&+v.value===q.correct){score++;by[q.topic]=true}});state.diagnostic={score,total:qs.length,at:Date.now(),topics:by};save();renderPath();toast("Diagnostic enregistré.")};return;
 }
 const d=state.diagnostic;$("#pathTitle").textContent="Ton parcours est initialisé";$("#pathText").textContent=`Diagnostic : ${d.score}/${d.total}. Ce résultat est un point de départ, pas une étiquette.`;
 const next=chooseNextTopic();host.innerHTML=`<div class="diagnostic-result"><div class="result-score">${Math.round(100*d.score/d.total)}<small>%</small></div><div><b>Une première photographie de tes acquis</b><p>Les résultats servent à choisir les notions à travailler, puis seront affinés par tes exercices.</p></div></div>`;
 rec.innerHTML=next?`<div class="recommendation"><span class="eyebrow">PROCHAINE NOTION CONSEILLÉE</span><h3>${esc(next.title)}</h3><p>${esc(next.summary)}</p><button class="btn primary" id="startRecommended">Ouvrir le cours →</button><button class="btn ghost" id="startExercise">Faire un exercice</button></div>`:"";
 $("#startRecommended")?.addEventListener("click",()=>{go("courses");openTopic(next.id)});$("#startExercise")?.addEventListener("click",()=>{go("exercises");openExercise(next.exerciseId)});
}
function renderCourses(){
 const q=$("#courseSearch").value.toLowerCase(),cat=$("#courseCategory").value,lev=$("#courseLevel").value;
 const list=TOPICS.filter(t=>(!q||(t.title+" "+t.summary).toLowerCase().includes(q))&&(cat==="all"||t.category===cat)&&(lev==="all"||t.level===lev));
 $("#courseList").innerHTML=list.map(t=>`<button class="course-item ${activeTopic===t.id?"selected":""}" data-topic="${t.id}"><span class="course-symbol">${t.category==="Analyse"?"∫":"∑"}</span><span><b>${esc(t.title)}</b><small>${esc(t.category)} · ${esc(t.level)}</small></span><i>${mastered(t.id)?"✓":"→"}</i></button>`).join("")||'<p class="subtle">Aucune notion trouvée.</p>';
 $$("#courseList [data-topic]").forEach(b=>b.onclick=()=>openTopic(b.dataset.topic));
 if(activeTopic&&topic(activeTopic))renderTopic(activeTopic);
}
function openTopic(id){activeTopic=id;renderCourses()}
function renderTopic(id){
 const t=topic(id);if(!t)return;const ex=EXERCISES.find(e=>e.id===t.exerciseId);
 $("#courseDetail").innerHTML=`<div class="detail-top"><span class="tag">${esc(t.category)} · ${esc(t.level)}</span>${mastered(id)?'<span class="mastered-label">✓ Maîtrisée</span>':''}</div><h2>${esc(t.title)}</h2><p class="lead">${esc(t.summary)}</p><h3>Définitions essentielles</h3>${t.definitions.map(d=>`<div class="definition"><b>${d[0]}</b><p>${d[1]}</p></div>`).join("")}<h3>Propriétés à connaître</h3><ul class="property-list">${t.properties.map(p=>`<li>${p}</li>`).join("")}</ul><h3>Exemple détaillé</h3><div class="example-box">${t.example}</div><div class="detail-actions"><button class="btn primary" id="topicExercise">S'entraîner sur cette notion →</button><button class="btn ghost" id="topicReview">Ajouter aux révisions</button></div>`;
 $("#topicExercise").onclick=()=>{go("exercises");openExercise(t.exerciseId)};$("#topicReview").onclick=()=>scheduleReview(id,1);typeset($("#courseDetail"));
}
function renderExercises(){
 const q=$("#exerciseSearch").value.toLowerCase(),cat=$("#exerciseCategory").value,diff=$("#exerciseDifficulty").value;
 const list=EXERCISES.filter(e=>(!q||(e.title+" "+e.question).toLowerCase().includes(q))&&(cat==="all"||e.category===cat)&&(diff==="all"||e.difficulty===diff));
 $("#exerciseList").innerHTML=list.map(e=>`<button class="exercise-item ${activeExercise===e.id?"selected":""}" data-ex="${e.id}"><span class="difficulty ${e.difficulty.toLowerCase()}">${e.difficulty}</span><b>${esc(e.title)}</b><small>${esc(topic(e.topic)?.title||"")}</small><i>${state.solved.includes(e.id)?"✓":"→"}</i></button>`).join("")||'<p class="subtle">Aucun exercice correspondant.</p>';
 $$("#exerciseList [data-ex]").forEach(b=>b.onclick=()=>openExercise(b.dataset.ex));
 if(activeExercise&&EXERCISES.some(e=>e.id===activeExercise))renderExercise(activeExercise);
}
function openExercise(id){activeExercise=id;renderExercises()}
function renderExercise(id){
 const e=EXERCISES.find(x=>x.id===id);if(!e)return;
 $("#exerciseDetail").innerHTML=`<div class="detail-top"><span class="tag">${esc(e.category)} · ${esc(e.difficulty)}</span><span class="subtle">${esc(topic(e.topic)?.title||"")}</span></div><h2>${esc(e.title)}</h2><div class="question-box">${e.question}</div><div class="answer-area"><label for="selfAnswer">Ta démarche (facultatif, pour garder une trace)</label><textarea id="selfAnswer" rows="4" placeholder="Pose les étapes de ton raisonnement…"></textarea><div class="exercise-actions"><button class="btn ghost" id="hintBtn">Afficher un indice</button><button class="btn ghost" id="solutionBtn">Voir la correction</button></div><div id="hintBox" class="hint-box" hidden></div><div id="solutionBox" class="solution-box" hidden></div></div><div class="self-check"><b>Évalue ton travail en toute honnêteté</b><p>La validation repose sur ton autonomie, pas sur le simple affichage de la correction.</p><div><button class="rating-btn" data-score="0">À reprendre</button><button class="rating-btn" data-score="1">Avec aide</button><button class="rating-btn" data-score="2">Réussi seul</button></div></div>`;
 let h=0;$("#hintBtn").onclick=()=>{const hints=e.hints||[];if(h<hints.length){$("#hintBox").hidden=false;$("#hintBox").innerHTML=`<b>Indice ${h+1}/${hints.length}</b><p>${hints[h++]}</p>`;typeset($("#hintBox"))}else toast("Tous les indices ont été affichés.")};
 $("#solutionBtn").onclick=()=>{$("#solutionBox").hidden=false;$("#solutionBox").innerHTML=`<b>Correction détaillée</b><p>${e.answer}</p>${(e.solutionSteps||[]).map((s,i)=>`<p><b>Étape ${i+1}.</b> ${s}</p>`).join("")}<p class="check-note">${esc(e.check||"Vérifie que chaque implication est justifiée.")}</p>`;typeset($("#solutionBox"))};
 $$(".rating-btn").forEach(b=>b.onclick=()=>recordAttempt(e,+b.dataset.score));
 typeset($("#exerciseDetail"));
}
function recordAttempt(e,score){
 const a=state.attempts[e.topic]||{independent:0,total:0,lastScore:0};a.total++;a.lastScore=score/2;if(score===2)a.independent++;else if(score===0)a.independent=0;state.attempts[e.topic]=a;
 if(score===2&&!state.solved.includes(e.id))state.solved.push(e.id);
 scheduleReview(e.topic,score===2?3:1,false);save();toast(score===2?"Réussite enregistrée. Continue à consolider !":"Tentative enregistrée : la notion reviendra dans ton parcours.");
}
function scheduleReview(id,quality=1,notify=true){const days=quality>=3?7:quality===2?3:1;state.reviews[id]={due:Date.now()+days*86400000,interval:days};save();if(notify)toast("Notion ajoutée aux révisions.");}
function renderProgress(){
 const pct=Math.round(100*TOPICS.filter(t=>mastered(t.id)).length/TOPICS.length);$("#bigProgress").textContent=pct+"%";$("#bigProgressBar").style.width=pct+"%";$("#pSolved").textContent=state.solved.length;$("#pSessions").textContent=state.sessions;$("#pReviews").textContent=state.reviewCount;
 $("#masteryList").innerHTML=TOPICS.map(t=>{const a=state.attempts[t.id]||{};const score=Math.round((a.lastScore||0)*100);return `<div class="mastery-row"><span><b>${esc(t.title)}</b><small>${esc(t.category)} · ${a.total||0} tentative(s)</small></span><div class="mini-track"><i style="width:${score}%"></i></div><strong>${mastered(t.id)?"Maîtrisée":score+"%"}</strong></div>`}).join("");
}
function renderReviewStart(){
 const due=dueTopics();$("#reviewCard").innerHTML=`<div class="eyebrow">RÉPÉTITION ESPACÉE</div><h2>${due.length?due.length+" notion(s) à revoir":"Aucune révision en retard"}</h2><p>${due.length?"Essaie de retrouver les idées essentielles avant de retourner chaque carte.":"Tu peux tout de même lancer une session libre pour entretenir tes acquis."}</p><button class="btn primary" id="startReview">Démarrer une session →</button>`;$("#startReview").onclick=startReview;
}
function startReview(){reviewQueue=dueTopics().map(t=>t.id);if(!reviewQueue.length)reviewQueue=TOPICS.filter(t=>state.reviews[t.id]).slice(0,5).map(t=>t.id);if(!reviewQueue.length)reviewQueue=TOPICS.slice(0,5).map(t=>t.id);reviewIndex=0;reviewFlipped=false;renderReviewCard()}
function renderReviewCard(){
 const id=reviewQueue[reviewIndex],t=topic(id);if(!t){renderReviewStart();return}const card=FLASHCARDS.find(c=>c.topic===id)||{front:t.title,back:t.definitions[0][1]};
 $("#reviewCard").innerHTML=`<div class="review-counter">CARTE ${reviewIndex+1} / ${reviewQueue.length}</div><button class="flashcard ${reviewFlipped?"flipped":""}" id="flipCard"><small>${reviewFlipped?"RÉPONSE":"RAPPEL ACTIF"}</small><strong>${reviewFlipped?card.back:card.front}</strong><span>${reviewFlipped?"Clique pour revoir la question":"Clique pour retourner la carte"}</span></button>${reviewFlipped?'<div class="review-rating"><button data-quality="1">Difficile · 1 j</button><button data-quality="2">Moyen · 3 j</button><button data-quality="3">Facile · 7 j</button></div>':'<p class="subtle center">Prends quelques secondes pour retrouver la réponse sans regarder.</p>'}`;
 $("#flipCard").onclick=()=>{reviewFlipped=!reviewFlipped;renderReviewCard();typeset($("#reviewCard"))};
 $$("#reviewCard [data-quality]").forEach(b=>b.onclick=()=>{scheduleReview(id,+b.dataset.quality,false);state.reviewCount++;reviewIndex++;reviewFlipped=false;save();if(reviewIndex>=reviewQueue.length){state.sessions++;save();renderReviewStart();toast("Session de révision terminée.")}else renderReviewCard()});typeset($("#reviewCard"));
}
function renderTutorMessage(text,role){const div=document.createElement("div");div.className="chat-message "+role;const b=document.createElement("b");b.textContent=role==="user"?"TOI":"MATHS4";const p=document.createElement("div");p.textContent=text;div.append(b,p);return div}
function addChat(role,text){chatHistory.push({role,text});const host=$("#chat");if(host.querySelector(".chat-welcome"))host.innerHTML="";host.append(renderTutorMessage(text,role));host.scrollTop=host.scrollHeight}
async function sendChat(){
 const text=$("#chatInput").value.trim();if(!text&&!chatImage){toast("Écris une question ou joins une photo.");return}
 const endpoint=window.MATHS4_AI_ENDPOINT;if(!endpoint){$("#tutorStatus").textContent="Endpoint du Worker non configuré.";return}
 const outgoing=text||"Voici ma démarche manuscrite. Peux-tu l'analyser ?";
 addChat("user",outgoing);$("#chatInput").value="";const image=chatImage;chatImage=null;$("#tutorImage").value="";$("#uploadName").textContent="Aucune image jointe";$("#sendChat").disabled=true;$("#tutorStatus").textContent="Le tuteur analyse ta demande…";
 const modes={tutor:"Accompagne l'étudiant pas à pas. Ne donne pas immédiatement la solution. Pose une seule question utile à la fois et propose des indices progressifs.",concept:"Explique la notion de manière rigoureuse et progressive, avec définition, intuition, exemple et pièges classiques.",exam:"Agis comme un examinateur exigeant. Pose une question à la fois, n'aide pas spontanément et évalue précisément la réponse.",proof_review:"Analyse la démonstration manuscrite : repère la première étape fausse ou non justifiée, distingue le correct de l'incorrect et propose une question pour débloquer."};
 try{
  const res=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({mode:activeMode,exercise:null,messages:chatHistory.slice(-10),text:modes[activeMode]+"\n\nDemande de l'étudiant : "+outgoing,image})});
  const data=await res.json();if(!res.ok||!data.reply)throw new Error(data.error||"Réponse IA indisponible.");addChat("assistant",String(data.reply));$("#tutorStatus").textContent="Réponse reçue.";if(window.MathJax?.typesetPromise)typeset($("#chat"));
 }catch(err){$("#tutorStatus").textContent="Erreur : "+err.message;addChat("assistant","Je n'ai pas pu joindre le tuteur. Vérifie que le Worker Cloudflare est déployé et que son endpoint est accessible.")}
 finally{$("#sendChat").disabled=false}
}
function resizeImage(file){return new Promise((resolve,reject)=>{const url=URL.createObjectURL(file),img=new Image();img.onload=()=>{const scale=Math.min(1,1500/Math.max(img.width,img.height)),c=document.createElement("canvas");c.width=img.width*scale;c.height=img.height*scale;c.getContext("2d").drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(url);resolve(c.toDataURL("image/jpeg",.8))};img.onerror=reject;img.src=url})}
function drawDerivative(){
 const c=$("#derivativeCanvas");if(!c)return;const ctx=c.getContext("2d"),w=c.width,h=c.height,a=0.7,step=+$("#hSlider").value;ctx.clearRect(0,0,w,h);ctx.strokeStyle="#263653";ctx.lineWidth=1;
 for(let x=0;x<w;x+=45){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}for(let y=0;y<h;y+=45){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
 const X=x=>w/2+x*100,Y=y=>h*.72-y*75;ctx.strokeStyle="#72829d";ctx.beginPath();ctx.moveTo(0,Y(0));ctx.lineTo(w,Y(0));ctx.moveTo(X(0),0);ctx.lineTo(X(0),h);ctx.stroke();
 const f=x=>x*x*.45+0.4;ctx.strokeStyle="#8e83ff";ctx.lineWidth=4;ctx.beginPath();for(let px=0;px<=w;px++){let x=(px-w/2)/100;let py=Y(f(x));px?ctx.lineTo(px,py):ctx.moveTo(px,py)}ctx.stroke();
 const x1=a+step,y1=f(x1),slope=(y1-f(a))/step;ctx.strokeStyle="#43c9e7";ctx.lineWidth=2.5;ctx.setLineDash([8,7]);ctx.beginPath();ctx.moveTo(X(-1.5),Y(f(a)+slope*(-1.5-a)));ctx.lineTo(X(2.7),Y(f(a)+slope*(2.7-a)));ctx.stroke();ctx.setLineDash([]);
 ctx.fillStyle="#43c9e7";ctx.beginPath();ctx.arc(X(x1),Y(y1),7,0,Math.PI*2);ctx.fill();ctx.fillStyle="#f7f8ff";ctx.beginPath();ctx.arc(X(a),Y(f(a)),7,0,Math.PI*2);ctx.fill();
 $("#hValue").textContent=step.toFixed(2).replace(".",",");$("#derivativeFormula").innerHTML=`Taux d'accroissement : \\(\\frac{f(a+h)-f(a)}h\\). Lorsque \\(h\\to0\\), il tend vers \\(f'(a)\\).`;typeset($("#derivativeFormula"));
}
function drawSequence(){
 const c=$("#sequenceCanvas");if(!c)return;const ctx=c.getContext("2d"),w=c.width,h=c.height,n=+$("#nSlider").value;ctx.clearRect(0,0,w,h);ctx.strokeStyle="#263653";for(let x=0;x<w;x+=45){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}for(let y=0;y<h;y+=45){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
 const base=h-45;ctx.strokeStyle="#71819d";ctx.beginPath();ctx.moveTo(35,base);ctx.lineTo(w-15,base);ctx.stroke();ctx.fillStyle="#8d82ff";for(let k=1;k<=n;k++){const x=45+(k-1)*(w-90)/Math.max(1,n-1),y=base-(1/k)*(h-80);ctx.beginPath();ctx.arc(x,y,6,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#8d82ff";ctx.beginPath();ctx.moveTo(x,base);ctx.lineTo(x,y);ctx.stroke()}$("#nValue").textContent=n;
}
function drawVisuals(){drawDerivative();drawSequence()}
function renderProgressOnHome(){renderDashboard()}
function init(){
 $$("[data-view]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.view)));$$("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));
 $("#mobileMenu").onclick=()=>$("#sidebar").classList.toggle("open");
 $("#resetData").onclick=()=>{if(confirm("Effacer toute la progression locale de Maths4 ?")){state=blank();save();go("home");toast("Progression réinitialisée.")}};
 ["courseSearch","courseCategory","courseLevel"].forEach(id=>$("#"+id).addEventListener("input",renderCourses));["exerciseSearch","exerciseCategory","exerciseDifficulty"].forEach(id=>$("#"+id).addEventListener("input",renderExercises));
 $("#tutorModes").onclick=e=>{const b=e.target.closest("[data-mode]");if(!b)return;activeMode=b.dataset.mode;$$(".mode").forEach(x=>x.classList.toggle("active",x===b));$("#tutorStatus").textContent="Mode sélectionné : "+b.textContent};
 $("#sendChat").onclick=sendChat;$("#chatInput").addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendChat()}});
 $("#clearChat").onclick=()=>{chatHistory=[];$("#chat").innerHTML='<div class="chat-welcome"><span>✳</span><h3>Nouvelle discussion</h3><p>Sur quoi souhaites-tu travailler ?</p></div>'};
 $("#tutorImage").onchange=async e=>{const f=e.target.files?.[0];if(!f)return;if(f.size>8*1024*1024){toast("Image limitée à 8 Mo.");return}try{chatImage=await resizeImage(f);$("#uploadName").textContent=f.name+" · prête"}catch{toast("Lecture de l'image impossible.")}};
 $("#hSlider").oninput=drawDerivative;$("#nSlider").oninput=drawSequence;
 if(state.lastDay!==new Date().toDateString()){const yesterday=new Date(Date.now()-86400000).toDateString();state.streak=state.lastDay===yesterday?state.streak+1:1;state.lastDay=new Date().toDateString();save()}
 renderDashboard();renderPath();renderCourses();renderExercises();renderProgress();
 if("serviceWorker" in navigator)navigator.serviceWorker.register("./sw.js").catch(()=>{});
}
document.addEventListener("DOMContentLoaded",init);
})();
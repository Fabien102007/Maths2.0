(() => {
"use strict";
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const KEY="maths4_studio_v1";
const blank=()=>({mastered:[],solved:[],attempts:{},reviews:{},sessions:0,reviewCount:0,lastDay:"",streak:0,diagnostic:null});
let state=(()=>{try{return {...blank(),...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{return blank()}})();
let activeTopic=null,activeExercise=null,activeMode="tutor",chatHistory=[],chatImage=null,reviewQueue=[],reviewIndex=0,reviewFlipped=false;
const save=()=>{localStorage.setItem(KEY,JSON.stringify(state));renderDashboard();};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const mathMap={"ℝ":"\\mathbb{R}","ℕ":"\\mathbb{N}","ℤ":"\\mathbb{Z}","ℚ":"\\mathbb{Q}","ℂ":"\\mathbb{C}","∈":"\\in ","∉":"\\notin ","∋":"\\ni ","∀":"\\forall","∃":"\\exists","⇒":"\\Rightarrow","⇔":"\\Leftrightarrow","⇐":"\\Leftarrow","→":"\\to","←":"\\leftarrow","↔":"\\leftrightarrow","↦":"\\mapsto","≤":"\\leq ","≥":"\\geq ","≠":"\\neq ","≈":"\\approx ","≡":"\\equiv ","≅":"\\cong","≪":"\\ll","≫":"\\gg","∞":"\\infty","∑":"\\sum","∏":"\\prod","∫":"\\int","∮":"\\oint","∬":"\\iint","∭":"\\iiint","√":"\\sqrt{}","∛":"\\sqrt[3]{}","∜":"\\sqrt[4]{}","∂":"\\partial","∇":"\\nabla","λ":"\\lambda","μ":"\\mu","ε":"\\varepsilon","π":"\\pi","θ":"\\theta","α":"\\alpha","β":"\\beta","γ":"\\gamma","δ":"\\delta","ρ":"\\rho","σ":"\\sigma","τ":"\\tau","φ":"\\varphi","ω":"\\omega","Ω":"\\Omega","Γ":"\\Gamma","Π":"\\Pi","Σ":"\\Sigma","Φ":"\\Phi","Ψ":"\\Psi","Δ":"\\Delta","ℓ":"\\ell","×":"\\times","·":"\\cdot","÷":"\\div","±":"\\pm","−":"-","∝":"\\propto ","∼":"\\sim ","⊥":"\\perp ","∧":"\\land","∨":"\\lor","¬":"\\neg","⊗":"\\otimes","⊕":"\\oplus","‖":"\\Vert","∥":"\\parallel ","∩":"\\cap","∪":"\\cup","∖":"\\setminus","⊂":"\\subset ","⊆":"\\subseteq ","⊃":"\\supset ","⊇":"\\supseteq ","∅":"\\varnothing","∴":"\\therefore","∵":"\\because","∠":"\\angle","°":"^{\\circ}","′":"^{\\prime}","″":"^{\\prime\\prime}","∣":"\\mid","∤":"\\nmid","⊤":"\\top","⊢":"\\vdash","⊨":"\\models","↪":"\\hookrightarrow","⟼":"\\longmapsto","⟨":"\\langle ","⟩":"\\rangle "};
const subMap={"₀":"0","₁":"1","₂":"2","₃":"3","₄":"4","₅":"5","₆":"6","₇":"7","₈":"8","₉":"9","ₐ":"a","ₑ":"e","ₕ":"h","ᵢ":"i","ⱼ":"j","ₖ":"k","ₗ":"l","ₘ":"m","ₙ":"n","ₒ":"o","ₚ":"p","ᵣ":"r","ₛ":"s","ₜ":"t"};
const supMap={"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","⁺":"+","⁻":"-","⁼":"=","ⁱ":"i","ⁿ":"n","ᵃ":"a","ᵇ":"b","ᶜ":"c","ᵈ":"d","ᵉ":"e","ᶠ":"f","ᵍ":"g","ʰ":"h","ʲ":"j","ᵏ":"k","ˡ":"l","ᵐ":"m","ᵒ":"o","ᵖ":"p","ʳ":"r","ˢ":"s","ᵗ":"t","ᵘ":"u","ᵛ":"v","ʷ":"w","ˣ":"x","ʸ":"y","ᶻ":"z"};
const mathSpecial=/[₀-₉ₐ-ₜ⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼ⁱⁿᵃᵇᶜᵈᵉᶠᵍʰʲᵏˡᵐᵒᵖʳˢᵗᵘᵛʷˣʸᶻℝℕℤℚℂ∈∉∋∀∃⇒⇔⇐→←↔↦≤≥≠≈≡≅≪≫∞∑∏∫∮∬∭√∛∜∂∇λμεπθαβγδρστφωΩΓΠΣΦΨΔℓ×·÷±−∝∼⊥∧∨¬⊗⊕‖∥∩∪∖⊂⊆⊃⊇∅∴∵∠°′″∣∤⊤⊢⊨↪⟼⟨⟩]/u;
function mathifySegment(value){
 const token=/[A-Za-z0-9₀-₉ₐ-ₜ⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼ⁱⁿᵃᵇᶜᵈᵉᶠᵍʰʲᵏˡᵐᵒᵖʳˢᵗᵘᵛʷˣʸᶻℝℕℤℚℂ∈∉∋∀∃⇒⇔⇐→←↔↦≤≥≠≈≡≅≪≫∞∑∏∫∮∬∭√∛∜∂∇λμεπθαβγδρστφωΩΓΠΣΦΨΔℓ×·÷±−∝∼⊥∧∨¬⊗⊕‖∥∩∪∖⊂⊆⊃⊇∅∴∵∠°′″∣∤⊤⊢⊨↪⟼⟨⟩=+*\/^_.,:<>|(){}-]+/gu;
 return value.replace(token,part=>{
  if(!mathSpecial.test(part))return part;
  mathSpecial.lastIndex=0;
  let t=part.replace(/([A-Za-z])([₀-₉ₐ-ₜ]+)/gu,(_,v,sub)=>v+"_{"+[...sub].map(c=>subMap[c]||c).join("")+"}");
  t=t.replace(/([A-Za-z0-9}])([⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼ⁱⁿᵃᵇᶜᵈᵉᶠᵍʰʲᵏˡᵐᵒᵖʳˢᵗᵘᵛʷˣʸᶻ]+)/gu,(_,v,sup)=>v+"^{"+[...sup].map(c=>supMap[c]||c).join("")+"}");
  t=t.replace(/([ℝℕℤℚℂ])([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/gu,(_,v,sup)=>(mathMap[v]||v)+"^{"+[...sup].map(c=>supMap[c]||c).join("")+"}");
  t=[...t].map(c=>mathMap[c]||c).join("");
  return "\\("+t+"\\)";
 });
}
function mathifyTextNodes(root){
 if(!root||!document.createTreeWalker)return;
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 const nodes=[];while(walker.nextNode()){const n=walker.currentNode,p=n.parentElement;if(!p||p.closest("mjx-container,script,style,textarea,pre,code,input,option"))continue;nodes.push(n);}
 for(const n of nodes){
  const raw=n.nodeValue;if(!mathSpecial.test(raw))continue;mathSpecial.lastIndex=0;
  const parts=raw.split(/(\$\$[\\s\\S]*?\\$\\$|\\$[^$]*\\$|\\\\\\([\\s\\S]*?\\\\\\)|\\\\\\[[\\s\\S]*?\\\\\\])/g);
  n.nodeValue=parts.map((part,i)=>i%2?part:mathifySegment(part)).join("");
 }
}
const typeset=el=>{if(!el)return;mathifyTextNodes(el);if(window.MathJax?.typesetPromise)window.MathJax.typesetPromise([el]).catch(()=>{});};
const richText=value=>esc(value).replace(/\*\*(.+?)\*\*/gs,"<strong>$1</strong>").replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br>");
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
 typeset(host);$("#submitDiagnostic").onclick=()=>{let score=0,by={};qs.forEach((q,i)=>{const v=$(`input[name="dq${i}"]:checked`);if(v&&+v.value===q.correct){score++;by[q.topic]=true}});state.diagnostic={score,total:qs.length,at:Date.now(),topics:by};save();renderPath();toast("Diagnostic enregistré.")};return;
 }
 const d=state.diagnostic;$("#pathTitle").textContent="Ton parcours est initialisé";$("#pathText").textContent=`Diagnostic : ${d.score}/${d.total}. Ce résultat est un point de départ, pas une étiquette.`;
 const next=chooseNextTopic();host.innerHTML=`<div class="diagnostic-result"><div class="result-score">${Math.round(100*d.score/d.total)}<small>%</small></div><div><b>Une première photographie de tes acquis</b><p>Les résultats servent à choisir les notions à travailler, puis seront affinés par tes exercices.</p></div></div>`;
 rec.innerHTML=next?`<div class="recommendation"><span class="eyebrow">PROCHAINE NOTION CONSEILLÉE</span><h3>${esc(next.title)}</h3><p>${esc(next.summary)}</p><button class="btn primary" id="startRecommended">Ouvrir le cours →</button><button class="btn ghost" id="startExercise">Faire un exercice</button></div>`:"";
 $("#startRecommended")?.addEventListener("click",()=>{go("courses");openTopic(next.id)});$("#startExercise")?.addEventListener("click",()=>{go("exercises");openExercise(next.exerciseId)});typeset(host);typeset(rec);
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
 $("#exerciseDetail").innerHTML=`<div class="detail-top"><span class="tag">${esc(e.category)} · ${esc(e.difficulty)}</span><span class="subtle">${esc(topic(e.topic)?.title||"")}</span></div><h2>${esc(e.title)}</h2><div class="question-box">${richText(e.question)}</div><div class="answer-area"><label for="selfAnswer">Ta démarche (facultatif, pour garder une trace)</label><textarea id="selfAnswer" rows="4" placeholder="Pose les étapes de ton raisonnement…"></textarea><div class="exercise-actions"><button class="btn ghost" id="hintBtn">Afficher un indice</button><button class="btn ghost" id="solutionBtn">Voir la correction</button></div><div id="hintBox" class="hint-box" hidden></div><div id="solutionBox" class="solution-box" hidden></div></div><div class="self-check"><b>Évalue ton travail en toute honnêteté</b><p>La validation repose sur ton autonomie, pas sur le simple affichage de la correction.</p><div><button class="rating-btn" data-score="0">À reprendre</button><button class="rating-btn" data-score="1">Avec aide</button><button class="rating-btn" data-score="2">Réussi seul</button></div></div>`;
 let h=0;$("#hintBtn").onclick=()=>{const hints=e.hints||[];if(h<hints.length){$("#hintBox").hidden=false;$("#hintBox").innerHTML=`<b>Indice ${h+1}/${hints.length}</b><p>${richText(hints[h++])}</p>`;typeset($("#hintBox"))}else toast("Tous les indices ont été affichés.")};
 $("#solutionBtn").onclick=()=>{$("#solutionBox").hidden=false;$("#solutionBox").innerHTML=`<div class="solution-heading"><span>✓</span><div><b>Correction détaillée</b><small>Raisonnement et justification étape par étape</small></div></div><div class="solution-content"><p>${richText(e.answer)}</p>${(e.solutionSteps||[]).map((s,i)=>`<p><b>Étape ${i+1}.</b> ${richText(s)}</p>`).join("")}</div><p class="check-note">${esc(e.check||"Vérifie que chaque implication est justifiée.")}</p>`;typeset($("#solutionBox"))};
 $(".rating-btn").forEach(b=>b.onclick=()=>recordAttempt(e,+b.dataset.score));
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
function renderTutorMessage(text,role){const div=document.createElement("div");div.className="chat-message "+role;const b=document.createElement("b");b.textContent=role==="user"?"TOI":"MATHS2.0";const p=document.createElement("div");p.innerHTML=richText(text);div.append(b,p);return div}
function addChat(role,text){chatHistory.push({role,text});const host=$("#chat");if(host.querySelector(".chat-welcome"))host.innerHTML="";host.append(renderTutorMessage(text,role));typeset(host.lastElementChild);host.scrollTop=host.scrollHeight}
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
const LABS={
 sequence:{label:"Nombre de termes",min:3,max:40,step:1,value:12,caption:"Les termes de uₙ=1+1/n se rapprochent de 1 sans jamais l'atteindre.",formula:"\\\\(u_n=1+\\\\frac1n\\\\),\\quad \\lim_{n\\to+\\infty}u_n=1"},
 limit:{label:"Distance à a = 1",min:0.08,max:2.5,step:0.02,value:1.2,caption:"Le point x se rapproche de 1. Observe la valeur f(x) et son rapprochement de 2.",formula:"\\\\(f(x)=x+1,\\quad \\lim_{x\\to1}f(x)=2\\\\)"},
 continuity:{label:"Position x",min:-3,max:3,step:0.05,value:1,caption:"La courbe varie continûment : une petite variation de x produit une petite variation de f(x).",formula:"\\\\(f(x)=\\sin(x)+0.2x\\\\)"},
 derivative:{label:"Point a",min:-1.8,max:1.8,step:0.05,value:0.7,caption:"La droite sécante devient la tangente lorsque le point mobile se rapproche du point fixe.",formula:"\\\\(f(x)=x^2,\\quad f'(a)=2a\\\\)"},
 integral:{label:"Borne supérieure b",min:0.3,max:2.8,step:0.05,value:1.8,caption:"La zone colorée représente l'intégrale de x² entre 0 et b.",formula:"\\\\(\\int_0^b x^2\\,dx=\\frac{b^3}{3}\\\\)"},
 taylor:{label:"Ordre du développement",min:0,max:8,step:1,value:4,caption:"Compare exp(x) à son polynôme de Taylor. L'approximation s'améliore près de 0 quand l'ordre augmente.",formula:"\\\\(e^x=\\sum_{k=0}^{n}\\frac{x^k}{k!}+o(x^n)\\\\)"},
 injectivity:{label:"Valeur x",min:0.25,max:2.5,step:0.05,value:1.4,caption:"Pour x² sur ℝ, x et −x ont la même image : la fonction n'est pas injective.",formula:"\\\\(f(x)=x^2=f(-x),\\quad x\\ne0\\\\)"},
 determinant:{label:"Angle entre les vecteurs",min:10,max:170,step:1,value:55,caption:"L'aire du parallélogramme est la valeur absolue du déterminant des deux vecteurs.",formula:"\\\\(\\det(u,v)=\\|u\\|\\,\\|v\\|\\sin(\\theta)\\\\)"},
 schmidt:{label:"Angle entre v₁ et v₂",min:10,max:170,step:1,value:55,caption:"La projection de v₂ sur v₁ est retirée : le résidu obtenu est orthogonal à v₁.",formula:"\\\\(w_2=v_2-\\frac{\\langle v_2,v_1\\rangle}{\\|v_1\\|^2}v_1,\\quad \\langle w_2,v_1\\rangle=0\\\\)"},
 fourier:{label:"Nombre d'harmoniques",min:1,max:21,step:2,value:5,caption:"La somme des harmoniques impaires approche une onde carrée. Observe les oscillations près des discontinuités.",formula:"\\\\(S_n(x)=\\frac4\\pi\\sum_{k=0}^{n}\\frac{\\sin((2k+1)x)}{2k+1}\\\\)"},
 trig:{label:"Angle θ (degrés)",min:0,max:360,step:1,value:45,caption:"Le point mobile parcourt le cercle unité. Ses coordonnées sont le cosinus et le sinus de l'angle.",formula:"\\\\((\\cos\\theta,\\sin\\theta),\\quad \\cos^2\\theta+\\sin^2\\theta=1\\\\)"},
 eigen:{label:"Valeur propre λ",min:-2,max:4,step:0.1,value:2,caption:"Une direction propre reste stable par l'application : le vecteur est simplement multiplié par λ.",formula:"\\\\(Av=\\lambda v,\\quad v\\ne0\\\\)"}
};
let labType="derivative";
function labSetup(){
 const cfg=LABS[labType],slider=$("#labSlider");
 $("#labSliderLabel").textContent=cfg.label;slider.min=cfg.min;slider.max=cfg.max;slider.step=cfg.step;slider.value=cfg.value;
 $("#labCaption").textContent=cfg.caption;$("#labFormula").innerHTML=cfg.formula;
 $("#labValue").textContent=Number(cfg.value).toLocaleString("fr-FR",{maximumFractionDigits:2});
 typeset($("#labFormula"));typeset($("#labCaption"));typeset($("#labSliderLabel"));drawLab();
}
function drawLab(){
 const canvas=$("#labCanvas");if(!canvas)return;
 const rect=canvas.getBoundingClientRect(),cssW=Math.max(320,rect.width||900),cssH=Math.max(260,Math.min(520,cssW*.51));
 const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(cssW*dpr);canvas.height=Math.round(cssH*dpr);canvas.style.height=cssH+"px";
 const ctx=canvas.getContext("2d");ctx.setTransform(dpr,0,0,dpr,0,0);const w=cssW,h=cssH;
 ctx.clearRect(0,0,w,h);ctx.fillStyle="#0d1928";ctx.fillRect(0,0,w,h);
 const ox=w/2,oy=h*.56,scale=Math.min(w/7.4,h/5.1),X=x=>ox+x*scale,Y=y=>oy-y*scale;
 ctx.strokeStyle="#263b52";ctx.lineWidth=1;
 for(let x=-4;x<=4;x++){ctx.beginPath();ctx.moveTo(X(x),0);ctx.lineTo(X(x),h);ctx.stroke()}
 for(let y=-3;y<=3;y++){ctx.beginPath();ctx.moveTo(0,Y(y));ctx.lineTo(w,Y(y));ctx.stroke()}
 ctx.strokeStyle="#8aa0b8";ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(0,Y(0));ctx.lineTo(w,Y(0));ctx.moveTo(X(0),0);ctx.lineTo(X(0),h);ctx.stroke();
 const dot=(x,y,color="#f2c879",r=5)=>{ctx.fillStyle=color;ctx.beginPath();ctx.arc(X(x),Y(y),r,0,Math.PI*2);ctx.fill()};
 const line=(fn,a=-3,b=3,color="#85b8f4",width=3)=>{ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();let started=false;for(let i=0;i<=600;i++){const x=a+(b-a)*i/600,y=fn(x);if(!Number.isFinite(y)||Math.abs(y)>30){started=false;continue}if(!started){ctx.moveTo(X(x),Y(y));started=true}else ctx.lineTo(X(x),Y(y))}ctx.stroke()};
 const value=+$("#labSlider").value;
 if(labType==="sequence"){const n=Math.round(value);ctx.strokeStyle="#e0b86d";ctx.setLineDash([6,5]);ctx.beginPath();ctx.moveTo(0,Y(1));ctx.lineTo(w,Y(1));ctx.stroke();ctx.setLineDash([]);for(let k=1;k<=n;k++){const x=-3+6*(k-1)/Math.max(1,n-1),y=1+1/k;ctx.strokeStyle="#85b8f488";ctx.beginPath();ctx.moveTo(X(x),Y(1));ctx.lineTo(X(x),Y(y));ctx.stroke();dot(x,y,"#85b8f4",4)}}
 else if(labType==="limit"){line(x=>x+1,-2.8,2.8);const x=1+(value/2.5);dot(x,x+1);dot(1,2,"#e0b86d",6);ctx.setLineDash([5,5]);ctx.strokeStyle="#e0b86d";ctx.beginPath();ctx.moveTo(X(x),Y(0));ctx.lineTo(X(x),Y(x+1));ctx.lineTo(X(1),Y(x+1));ctx.stroke();ctx.setLineDash([])}
 else if(labType==="continuity"){line(x=>Math.sin(x)+.2*x);dot(value,Math.sin(value)+.2*value)}
 else if(labType==="derivative"){const a=value,eps=.55,fa=a*a,fp=2*a;line(x=>x*x,-2.5,2.5);line(x=>fa+fp*(x-a),-2.5,2.5,"#e0b86d",2.5);const b=a+eps;line(x=>fa+((b*b-fa)/eps)*(x-a),Math.min(-2.5,a-.7),Math.max(2.5,a+1.3),"#54cbb2",1.8);dot(a,fa,"#e0b86d",6);dot(b,b*b,"#54cbb2",6)}
 else if(labType==="integral"){const b=value;ctx.fillStyle="#4779c455";ctx.beginPath();ctx.moveTo(X(0),Y(0));for(let i=0;i<=220;i++){const x=b*i/220;ctx.lineTo(X(x),Y(x*x))}ctx.lineTo(X(b),Y(0));ctx.closePath();ctx.fill();line(x=>x*x,0,Math.max(2.8,b))}
 else if(labType==="taylor"){const n=Math.round(value);line(x=>Math.exp(x),-2.1,2.1,"#85b8f4",3);line(x=>{let sum=0,p=1,f=1;for(let k=0;k<=n;k++){if(k){p*=x;f*=k}sum+=p/f}return sum},-1.8,1.8,"#e0b86d",2.6)}
 else if(labType==="injectivity"){line(x=>x*x,-2.5,2.5);dot(value,value*value);dot(-value,value*value,"#e0b86d");ctx.setLineDash([5,5]);ctx.strokeStyle="#e0b86d";ctx.beginPath();ctx.moveTo(X(value),Y(0));ctx.lineTo(X(value),Y(value*value));ctx.moveTo(X(-value),Y(0));ctx.lineTo(X(-value),Y(value*value));ctx.stroke();ctx.setLineDash([])}
 else if(labType==="determinant"||labType==="schmidt"){const angle=value*Math.PI/180,u=[2.1,0],v=[2.1*Math.cos(angle),2.1*Math.sin(angle)];if(labType==="determinant"){ctx.fillStyle="#4779c455";ctx.beginPath();ctx.moveTo(X(0),Y(0));ctx.lineTo(X(u[0]),Y(u[1]));ctx.lineTo(X(u[0]+v[0]),Y(u[1]+v[1]));ctx.lineTo(X(v[0]),Y(v[1]));ctx.closePath();ctx.fill();ctx.strokeStyle="#85b8f4";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(X(0),Y(0));ctx.lineTo(X(u[0]),Y(u[1]));ctx.stroke();ctx.strokeStyle="#e0b86d";ctx.beginPath();ctx.moveTo(X(0),Y(0));ctx.lineTo(X(v[0]),Y(v[1]));ctx.stroke()}else{const proj=2.1*Math.cos(angle),res=[v[0]-proj,v[1]];ctx.strokeStyle="#85b8f4";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(X(0),Y(0));ctx.lineTo(X(u[0]),Y(u[1]));ctx.stroke();ctx.strokeStyle="#e0b86d";ctx.beginPath();ctx.moveTo(X(0),Y(0));ctx.lineTo(X(v[0]),Y(v[1]));ctx.stroke();ctx.strokeStyle="#54cbb2";ctx.beginPath();ctx.moveTo(X(proj),Y(0));ctx.lineTo(X(v[0]),Y(v[1]));ctx.stroke();ctx.setLineDash([5,4]);ctx.strokeStyle="#54cbb2";ctx.beginPath();ctx.moveTo(X(0),Y(0));ctx.lineTo(X(res[0]),Y(res[1]));ctx.stroke();ctx.setLineDash([]);dot(res[0],res[1],"#54cbb2",5)}}
 else if(labType==="fourier"){const n=Math.round(value);line(x=>{let sum=0;for(let k=1;k<=n;k+=2)sum+=Math.sin(k*x)/k;return 4/Math.PI*sum},-Math.PI,Math.PI,"#85b8f4",3);line(x=>x<0?-1:1,-Math.PI,Math.PI,"#e0b86d",1.6)}
 else if(labType==="trig"){ctx.strokeStyle="#85b8f4";ctx.lineWidth=2;ctx.beginPath();ctx.arc(ox,oy,scale*1.9,0,Math.PI*2);ctx.stroke();const a=value*Math.PI/180,x=1.9*Math.cos(a),y=1.9*Math.sin(a);ctx.strokeStyle="#e0b86d";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(X(0),Y(0));ctx.lineTo(X(x),Y(y));ctx.stroke();ctx.setLineDash([4,4]);ctx.beginPath();ctx.moveTo(X(x),Y(0));ctx.lineTo(X(x),Y(y));ctx.moveTo(X(0),Y(y));ctx.lineTo(X(x),Y(y));ctx.stroke();ctx.setLineDash([]);dot(x,y,"#e0b86d",6)}
 else if(labType==="eigen"){line(x=>.55*x,-3,3,"#85b8f4",2);const l=value;ctx.strokeStyle="#e0b86d";ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(X(-1.5),Y(-1.5*l));ctx.lineTo(X(1.5),Y(1.5*l));ctx.stroke();dot(1,l,"#e0b86d",6)}
 $("#labValue").textContent=value.toLocaleString("fr-FR",{maximumFractionDigits:2});
}
function drawVisuals(){if($("#labType"))labSetup()}
function renderProgressOnHome(){renderDashboard()}
function init(){
 $$("[data-view]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.view)));$$("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));
 $("#mobileMenu").onclick=()=>$("#sidebar").classList.toggle("open");
 $("#resetData").onclick=()=>{if(confirm("Effacer toute la progression locale de Maths2.0 ?")){state=blank();save();go("home");toast("Progression réinitialisée.")}};
 ["courseSearch","courseCategory","courseLevel"].forEach(id=>$("#"+id).addEventListener("input",renderCourses));["exerciseSearch","exerciseCategory","exerciseDifficulty"].forEach(id=>$("#"+id).addEventListener("input",renderExercises));
 $("#tutorModes").onclick=e=>{const b=e.target.closest("[data-mode]");if(!b)return;activeMode=b.dataset.mode;$$(".mode").forEach(x=>x.classList.toggle("active",x===b));$("#tutorStatus").textContent="Mode sélectionné : "+b.textContent};
 $("#sendChat").onclick=sendChat;$("#chatInput").addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendChat()}});
 $("#clearChat").onclick=()=>{chatHistory=[];$("#chat").innerHTML='<div class="chat-welcome"><span>✳</span><h3>Nouvelle discussion</h3><p>Sur quoi souhaites-tu travailler ?</p></div>'};
 $("#tutorImage").onchange=async e=>{const f=e.target.files?.[0];if(!f)return;if(f.size>8*1024*1024){toast("Image limitée à 8 Mo.");return}try{chatImage=await resizeImage(f);$("#uploadName").textContent=f.name+" · prête"}catch{toast("Lecture de l'image impossible.")}};
 $("#labType").onchange=()=>{labType=$("#labType").value;labSetup()};$("#labSlider").oninput=drawLab;window.addEventListener("resize",()=>{if($("#view-visuals")?.classList.contains("active"))drawLab()});
 if(state.lastDay!==new Date().toDateString()){const yesterday=new Date(Date.now()-86400000).toDateString();state.streak=state.lastDay===yesterday?state.streak+1:1;state.lastDay=new Date().toDateString();save()}
 renderDashboard();renderPath();renderCourses();renderExercises();renderProgress();typeset(document.body);
 if("serviceWorker" in navigator){navigator.serviceWorker.register("./sw.js",{updateViaCache:"none"}).then(reg=>reg.update()).catch(()=>{});}
}
document.addEventListener("DOMContentLoaded",init);
})();
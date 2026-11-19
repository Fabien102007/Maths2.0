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
const mathSpecial=/[=^₀-₉ₐ-ₜ⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼ⁱⁿᵃᵇᶜᵈᵉᶠᵍʰʲᵏˡᵐᵒᵖʳˢᵗᵘᵛʷˣʸᶻℝℕℤℚℂ∈∉∋∀∃⇒⇔⇐→←↔↦≤≥≠≈≡≅≪≫∞∑∏∫∮∬∭√∛∜∂∇λμεπθαβγδρστφωΩΓΠΣΦΨΔℓ×·÷±−∝∼⊥∧∨¬⊗⊕‖∥∩∪∖⊂⊆⊃⊇∅∴∵∠°′″∣∤⊤⊢⊨↪⟼⟨⟩]/u;
function mathifySegment(value){
 const token=/[A-Za-z0-9₀-₉ₐ-ₜ⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼ⁱⁿᵃᵇᶜᵈᵉᶠᵍʰʲᵏˡᵐᵒᵖʳˢᵗᵘᵛʷˣʸᶻℝℕℤℚℂ∈∉∋∀∃⇒⇔⇐→←↔↦≤≥≠≈≡≅≪≫∞∑∏∫∮∬∭√∛∜∂∇λμεπθαβγδρστφωΩΓΠΣΦΨΔℓ×·÷±−∝∼⊥∧∨¬⊗⊕‖∥∩∪∖⊂⊆⊃⊇∅∴∵∠°′″∣∤⊤⊢⊨↪⟼⟨⟩=+*\\/^_.,:<>|(){}-]+/gu;
 return value.replace(token,part=>{
  mathSpecial.lastIndex=0;
  if(!mathSpecial.test(part))return part;
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
 const nodes=[];
 while(walker.nextNode()){
  const n=walker.currentNode,p=n.parentElement;
  if(!p||p.closest("mjx-container,script,style,textarea,pre,code,input,option"))continue;
  nodes.push(n);
 }
 const delimiters=/(\$\$[\s\S]*?\$\$|\$[^$\n]+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\])/g;
 const looksLikeProse=value=>/[A-Za-zÀ-ÿ]{3,}\s+[A-Za-zÀ-ÿ]{3,}/u.test(value);
 for(const n of nodes){
  // Normalise les délimiteurs LaTeX doublés sans modifier les \\ de mise en page.
  const raw=(n.nodeValue||"").replace(/(?:\\){2,}(?=[()]|\[|\])/g,"\\");
  mathSpecial.lastIndex=0;
  const hasMathSymbol=mathSpecial.test(raw);
  if(!hasMathSymbol&&!/(?:\$\$|\$[^$\n]+\$|\\\(|\\\[)/.test(raw))continue;
  const parts=raw.split(delimiters);
  n.nodeValue=parts.map((part,i)=>{
   if(i%2===0)return mathifySegment(part);
   let formula=part;
   let display=false;
   if(formula.startsWith("$$")&&formula.endsWith("$$")){display=true;formula=formula.slice(2,-2);}
   else if(formula.startsWith("$")&&formula.endsWith("$"))formula=formula.slice(1,-1);
   else if(formula.startsWith("\\[")&&formula.endsWith("\\]")){display=true;formula=formula.slice(2,-2);}
   else if(formula.startsWith("\\(")&&formula.endsWith("\\)"))formula=formula.slice(2,-2);
   // Un énoncé entier reste du texte ; seuls les fragments mathématiques sont convertis.
   if(looksLikeProse(formula))return mathifySegment(formula);
   return display?"\\["+formula+"\\]":"\\("+formula+"\\)";
  }).join("");
 }
}
const typeset=el=>{
 if(!el)return Promise.resolve();
 const ready=window.__mathJaxReady||Promise.resolve(window.MathJax||null);
 return ready.then(mj=>{
  mathifyTextNodes(el);
  if(!mj?.typesetPromise){console.error("MathJax n'est pas disponible : les formules ne peuvent pas être rendues.");return;}
  try{mj.typesetClear?.([el]);}catch(e){}
  return mj.typesetPromise([el]);
 }).catch(error=>console.error("Erreur de rendu LaTeX :",error));
};
const richText=value=>esc(value).replace(/\*\*(.+?)\*\*/gs,"<strong>$1</strong>").replace(/\n{2,}/g,"</p><p>").replace(/\n/g," ");
// Les formules brutes sont converties après insertion dans le DOM par mathifyTextNodes.
const exerciseRichText=value=>richText(value);

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
 $("#exerciseDetail").innerHTML=`<div class="detail-top"><span class="tag">${esc(e.category)} · ${esc(e.difficulty)}</span><span class="subtle">${esc(topic(e.topic)?.title||"")}</span></div><h2>${esc(e.title)}</h2><div class="question-box">${exerciseRichText(e.question)}</div><div class="answer-area"><label for="selfAnswer">Ta démarche (facultatif, pour garder une trace)</label><textarea id="selfAnswer" rows="4" placeholder="Pose les étapes de ton raisonnement…"></textarea><div class="exercise-actions"><button class="btn ghost" id="hintBtn">Afficher un indice</button><button class="btn ghost" id="solutionBtn">Voir la correction</button></div><div id="hintBox" class="hint-box" hidden></div><div id="solutionBox" class="solution-box" hidden></div></div><div class="self-check"><b>Évalue ton travail en toute honnêteté</b><p>La validation repose sur ton autonomie, pas sur le simple affichage de la correction.</p><div><button class="rating-btn" data-score="0">À reprendre</button><button class="rating-btn" data-score="1">Avec aide</button><button class="rating-btn" data-score="2">Réussi seul</button></div></div>`;
 let h=0;$("#hintBtn").onclick=()=>{const hints=e.hints||[];if(h<hints.length){$("#hintBox").hidden=false;$("#hintBox").innerHTML=`<b>Indice ${h+1}/${hints.length}</b><p>${exerciseRichText(hints[h++])}</p>`;typeset($("#hintBox"))}else toast("Tous les indices ont été affichés.")};
 $("#solutionBtn").onclick=()=>{$("#solutionBox").hidden=false;$("#solutionBox").innerHTML=`<div class="solution-heading"><span>✓</span><div><b>Correction détaillée</b><small>Raisonnement et justification étape par étape</small></div></div><div class="solution-content"><p>${exerciseRichText(e.answer)}</p>${(e.solutionSteps||[]).map((s,i)=>`<p><b>Étape ${i+1}.</b> ${exerciseRichText(s)}</p>`).join("")}</div><p class="check-note">${esc(e.check||"Vérifie que chaque implication est justifiée.")}</p>`;typeset($("#solutionBox"))};
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
 derivative:{label:"Écart h du point mobile",min:-1.5,max:1.5,step:0.05,value:1.2,caption:"Le point fixe est a = 0,5. Fais tendre h vers 0 : le point mobile b = a + h rejoint le point fixe et la sécante tend vers la tangente.",formula:"\\\\(f(x)=x^2,\\quad m_{sec}=\\frac{f(a+h)-f(a)}{h}=2a+h,\\quad \\lim_{h\\to0}m_{sec}=f'(a)=2a\\)"},
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
function renderLabGuide(){
 const value=Number($("#labSlider").value);
 const guides={
  sequence:{title:"Voir une suite converger",text:"Chaque point représente un terme. Quand n augmente, le terme se rapproche de 1 : la distance verticale à la droite y = 1 diminue.",question:"Peux-tu trouver un rang N à partir duquel tous les termes sont à moins de 0,1 de 1 ?",steps:["1 · Lis la hauteur du point : c'est uₙ.","2 · Compare sa distance à la droite y = 1.","3 · Relie la distance observée à |uₙ − 1| = 1/n."]},
  derivative:{title:"De la sécante à la tangente",text:"La droite verte relie deux points : c'est une sécante. La droite dorée est la tangente au point a. Quand le second point se rapproche de a, la sécante prend la direction de la tangente.",question:"Que devient le coefficient directeur de la sécante lorsque h tend vers 0 ?",steps:["1 · La courbe bleue donne f(x) = x².","2 · La sécante mesure un taux de variation moyen.","3 · À la limite, sa pente vaut f′(a) = 2a."]},
  integral:{title:"L'intégrale comme accumulation d'aire",text:"La zone colorée représente l'aire sous la courbe y = x² entre 0 et b. En déplaçant b, tu ajoutes ou retires une tranche d'aire.",question:"Si tu doubles b, par combien l'aire est-elle multipliée ?",steps:["1 · Repère les bornes 0 et b.","2 · Observe la zone colorée sous la courbe.","3 · La primitive x³/3 donne l'aire : b³/3."]},
  schmidt:{title:"Construire une direction orthogonale",text:"Le vecteur doré est décomposé en une projection sur l'axe du premier vecteur et une composante perpendiculaire. Cette seconde composante est celle que Gram–Schmidt conserve.",question:"Quand l'angle change, quelle composante reste perpendiculaire au premier vecteur ?",steps:["1 · Le vecteur bleu fixe la première direction.","2 · La projection retire la composante parallèle.","3 · Le vecteur vert restant est orthogonal au bleu."]}
 };
 const g=guides[labType]||{title:"Observer puis expliquer",text:$("#labCaption").textContent,question:"Quel phénomène mathématique le dessin illustre-t-il ?",steps:["1 · Modifie le paramètre.","2 · Décris ce qui change.","3 · Formule la propriété correspondante."]};
 $("#labLearningTitle").textContent=g.title;$("#labLearningText").textContent=g.text;$("#labQuestion").textContent=g.question;
 $("#labSteps").innerHTML=g.steps.map((step,i)=>'<div class="lab-step"><span>'+(i+1)+'</span><p>'+step.replace(/^\d+ · /,"")+'</p></div>').join("");
 typeset($("#labLearning"));
}
function labSetup(){
 const cfg=LABS[labType],slider=$("#labSlider");
 $("#labSliderLabel").textContent=cfg.label;slider.min=cfg.min;slider.max=cfg.max;slider.step=cfg.step;slider.value=cfg.value;
 $("#labCaption").textContent=cfg.caption;$("#labFormula").innerHTML=cfg.formula.replace(/\\\\/g,"\\");
 $("#labValue").textContent=Number(cfg.value).toLocaleString("fr-FR",{maximumFractionDigits:2});
 typeset($("#labFormula"));typeset($("#labCaption"));typeset($("#labSliderLabel"));renderLabGuide();drawLab();
}
function drawLab(){
 const canvas=$("#labCanvas");if(!canvas)return;
 const rect=canvas.getBoundingClientRect(),W=Math.max(320,rect.width||900),H=Math.max(300,Math.min(560,W*.52));
 const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);canvas.style.height=H+"px";
 const ctx=canvas.getContext("2d");ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);ctx.fillStyle="#0d1928";ctx.fillRect(0,0,W,H);
 const m={l:58,r:24,t:24,b:48},pw=W-m.l-m.r,ph=H-m.t-m.b;
 let xmin,xmax,ymin,ymax;
 if(labType==="sequence"){xmin=0;xmax=Math.round(+$("#labSlider").value)+1;ymin=.75;ymax=2.15}
 else if(labType==="derivative"){xmin=-2.5;xmax=2.5;ymin=-1;ymax=6.5}
 else{xmin=-3;xmax=3;ymin=-3;ymax=3}
 const X=x=>m.l+(x-xmin)/(xmax-xmin)*pw,Y=y=>m.t+(ymax-y)/(ymax-ymin)*ph;
 const grid="#263b52",axis="#91a8c0",txt="#9eb2c9";ctx.font="11px system-ui";ctx.lineWidth=1;ctx.strokeStyle=grid;ctx.fillStyle=txt;
 const xt=labType==="sequence"?[0,Math.round(xmax/2),xmax-1]:[-2,-1,0,1,2],yt=labType==="sequence"?[1,1.5,2]:labType==="derivative"?[0,1,2,3,4,5,6]:[-2,-1,0,1,2];
 xt.forEach(v=>{const x=X(v);ctx.beginPath();ctx.moveTo(x,m.t);ctx.lineTo(x,m.t+ph);ctx.stroke();ctx.textAlign="center";ctx.fillText(String(v),x,H-17)});
 yt.forEach(v=>{const y=Y(v);ctx.beginPath();ctx.moveTo(m.l,y);ctx.lineTo(m.l+pw,y);ctx.stroke();ctx.textAlign="right";ctx.fillText(String(v),m.l-9,y+4)});
 ctx.strokeStyle=axis;ctx.lineWidth=1.5;ctx.beginPath();if(ymin<=0&&ymax>=0){ctx.moveTo(m.l,Y(0));ctx.lineTo(m.l+pw,Y(0))}if(xmin<=0&&xmax>=0){ctx.moveTo(X(0),m.t);ctx.lineTo(X(0),m.t+ph)}ctx.stroke();
 const point=(x,y,color,r=5)=>{ctx.fillStyle=color;ctx.beginPath();ctx.arc(X(x),Y(y),r,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#081321";ctx.lineWidth=1.5;ctx.stroke()};
 const segment=(x1,y1,x2,y2,color,width=2,dash=[])=>{ctx.beginPath();ctx.setLineDash(dash);ctx.moveTo(X(x1),Y(y1));ctx.lineTo(X(x2),Y(y2));ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();ctx.setLineDash([])};
 const curve=(fn,a,b,color,width=3)=>{ctx.beginPath();let open=false;for(let k=0;k<=800;k++){const x=a+(b-a)*k/800,y=fn(x);if(!Number.isFinite(y)||y<ymin-1||y>ymax+1){open=false;continue}if(!open){ctx.moveTo(X(x),Y(y));open=true}else ctx.lineTo(X(x),Y(y))}ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap="round";ctx.stroke()};
 if(labType==="sequence"){
  const N=Math.max(3,Math.round(+$("#labSlider").value));segment(0,1,N+1,1,"#e0b86d",2,[7,5]);curve(n=>1+1/n,1,N,"#80b8f4",2.5);
  for(let n=1;n<=N;n++){segment(n,1,n,1+1/n,"#80b8f466",1,[3,4]);point(n,1+1/n,"#80b8f4",4)}
  ctx.fillStyle="#e0b86d";ctx.textAlign="left";ctx.fillText("limite L = 1",X(Math.max(1,N*.65)),Y(1)-9);
  $("#labLegend").innerHTML='<span><b style="color:#80b8f4">● uₙ = 1 + 1/n</b> : termes de la suite</span><span><b style="color:#e0b86d">┄ L = 1</b> : limite</span>';
 }else if(labType==="derivative"){
  const a=.5,h=+$("#labSlider").value,b=a+h,fa=a*a,fb=b*b;
  curve(x=>x*x,xmin,xmax,"#80b8f4",3);curve(x=>fa+2*a*(x-a),xmin,xmax,"#e0b86d",2.5);
  if(Math.abs(h)>.015)segment(a,fa,b,fb,"#54cbb2",2.8);
  point(a,fa,"#e0b86d",6);point(b,fb,"#54cbb2",6);
  ctx.fillStyle="#e0b86d";ctx.textAlign="left";ctx.fillText("A : point fixe",X(a)+9,Y(fa)-10);
  ctx.fillStyle="#54cbb2";ctx.fillText("B : point mobile",X(b)+8,Y(fb)+17);
  $("#labLegend").innerHTML='<span style="color:#80b8f4">● Courbe f(x)=x²</span><span style="color:#e0b86d">━ Tangente en A</span><span style="color:#54cbb2">━ Sécante AB</span>';
 }else{
  const v=+$("#labSlider").value;
  if(labType==="integral"){ctx.beginPath();ctx.moveTo(X(0),Y(0));for(let k=0;k<=300;k++){const x=v*k/300;ctx.lineTo(X(x),Y(x*x))}ctx.lineTo(X(v),Y(0));ctx.closePath();ctx.fillStyle="#4779c455";ctx.fill();curve(x=>x*x,0,Math.max(2.8,v),"#80b8f4",3)}
  else if(labType==="taylor"){const n=Math.round(v);curve(Math.exp,xmin,xmax,"#80b8f4",3);curve(x=>{let s=0,p=1,f=1;for(let k=0;k<=n;k++){if(k){p*=x;f*=k}s+=p/f}return s},xmin,xmax,"#e0b86d",2.5)}
  else if(labType==="injectivity"){curve(x=>x*x,-2.5,2.5,"#80b8f4",3);point(v,v*v,"#80b8f4");point(-v,v*v,"#e0b86d")}
  else if(labType==="continuity"){curve(x=>Math.sin(x)+.2*x,xmin,xmax,"#80b8f4",3);point(v,Math.sin(v)+.2*v,"#e0b86d")}
  else if(labType==="limit"){curve(x=>x+1,xmin,xmax,"#80b8f4",3);point(1+v/2.5,2+v/2.5,"#e0b86d")}
  else if(labType==="fourier"){curve(x=>{let s=0;for(let k=1;k<=Math.round(v);k+=2)s+=Math.sin(k*x)/k;return 4/Math.PI*s},-Math.PI,Math.PI,"#80b8f4",3)}
  else if(labType==="eigen"){curve(x=>.55*x,xmin,xmax,"#80b8f4",2);curve(x=>v*x,xmin,xmax,"#e0b86d",3)}
  else if(labType==="determinant"||labType==="schmidt"){const t=v*Math.PI/180;segment(0,0,2.1,0,"#80b8f4",3);segment(0,0,2.1*Math.cos(t),2.1*Math.sin(t),"#e0b86d",3)}
  else curve(x=>x,xmin,xmax,"#80b8f4",3);
  $("#labLegend").innerHTML='<span style="color:#80b8f4">● Courbe / direction de référence</span><span style="color:#e0b86d">● Élément mobile</span>';
 }
 typeset($("#labLegend"));$("#labValue").textContent=(+$("#labSlider").value).toLocaleString("fr-FR",{maximumFractionDigits:2});renderLabGuide();
}
function drawVisuals(){if($("#labType"))labSetup()}
function renderProgressOnHome(){renderDashboard()}
function init(){
  if(window.__maths20InitDone)return;
  window.__maths20InitDone=true;
 $$("[data-view]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.view)));$$("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));
 $("#mobileMenu").onclick=()=>$("#sidebar").classList.toggle("open");
 $("#resetData").onclick=()=>{if(confirm("Effacer toute la progression locale de Maths2.0 ?")){state=blank();save();go("home");toast("Progression réinitialisée.")}};
 ["courseSearch","courseCategory","courseLevel"].forEach(id=>$("#"+id).addEventListener("input",renderCourses));["exerciseSearch","exerciseCategory","exerciseDifficulty"].forEach(id=>$("#"+id).addEventListener("input",renderExercises));
 $("#tutorModes").onclick=e=>{const b=e.target.closest("[data-mode]");if(!b)return;activeMode=b.dataset.mode;$$(".mode").forEach(x=>x.classList.toggle("active",x===b));$("#tutorStatus").textContent="Mode sélectionné : "+b.textContent};
 $("#sendChat").onclick=sendChat;$("#chatInput").addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendChat()}});
 $("#clearChat").onclick=()=>{chatHistory=[];$("#chat").innerHTML='<div class="chat-welcome"><span>✳</span><h3>Nouvelle discussion</h3><p>Sur quoi souhaites-tu travailler ?</p></div>'};
 $("#tutorImage").onchange=async e=>{const f=e.target.files?.[0];if(!f)return;if(f.size>8*1024*1024){toast("Image limitée à 8 Mo.");return}try{chatImage=await resizeImage(f);$("#uploadName").textContent=f.name+" · prête"}catch{toast("Lecture de l'image impossible.")}};
 const labSelect=$("#labType");if(labSelect){const seen=new Set();[...labSelect.options].forEach(option=>{if(seen.has(option.value))option.remove();else seen.add(option.value)});labType=labSelect.value||"derivative";}labSelect.onchange=()=>{labType=labSelect.value;labSetup()};$("#labSlider").oninput=drawLab;window.addEventListener("resize",()=>{if($("#view-visuals")?.classList.contains("active"))drawLab()});
 if(state.lastDay!==new Date().toDateString()){const yesterday=new Date(Date.now()-86400000).toDateString();state.streak=state.lastDay===yesterday?state.streak+1:1;state.lastDay=new Date().toDateString();save()}
 renderDashboard();renderPath();renderCourses();renderExercises();renderProgress();typeset(document.body);
 if("serviceWorker" in navigator){navigator.serviceWorker.register("./sw.js",{updateViaCache:"none"}).then(reg=>reg.update()).catch(()=>{});}
}
document.addEventListener("DOMContentLoaded",init);
})();
(() => {
"use strict";
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const KEY="maths4_studio_v1";
const blank=()=>({mastered:[],solved:[],attempts:{},reviews:{},drafts:{},sessions:0,reviewCount:0,lastDay:"",streak:0,diagnostic:null});
let state=(()=>{try{return {...blank(),...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{return blank()}})();
let activeTopic=null,activeCourseCategory=null,activeExercise=null,activeExerciseCategory=null,activeExerciseTopic=null,activeMode="tutor",chatHistory=[],chatImage=null,reviewQueue=[],reviewIndex=0,reviewFlipped=false;
let progressSyncTimer=null;
const save=()=>{state.updatedAt=new Date().toISOString();localStorage.setItem(KEY,JSON.stringify(state));renderDashboard();if(window.Maths2Account?.sync){clearTimeout(progressSyncTimer);progressSyncTimer=setTimeout(()=>window.Maths2Account.sync(),1200);}};
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
const typesetExercise=el=>{
 if(!el)return Promise.resolve();
 const ready=window.__mathJaxReady||Promise.resolve(window.MathJax||null);
 return ready.then(mj=>{
  if(!mj?.typesetPromise){console.error("MathJax indisponible : rendu des exercices impossible.");return;}
  try{mj.typesetClear?.([el]);}catch(e){}
  return mj.typesetPromise([el]);
 }).catch(error=>console.error("Erreur MathJax dans un exercice :",error));
};
const richText=value=>esc(value).replace(/\*\*(.+?)\*\*/gs,"<strong>$1</strong>").replace(/\n{2,}/g,"</p><p>").replace(/\n/g," ");
// Les formules brutes sont converties après insertion dans le DOM par mathifyTextNodes.
const exerciseRichText=value=>{
 const raw=String(value??"").replace(/(?:\\){2,}(?=[()[\]])/g,"\\");
 const delimiters=/(\$\$[\s\S]*?\$\$|\$[^$\n]+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\])/g;
 const parts=raw.split(delimiters);
 return parts.map((part,i)=>{
  if(i%2===1){
   let formula=part,display=false;
   if(formula.startsWith("$$")&&formula.endsWith("$$")){display=true;formula=formula.slice(2,-2);}
   else if(formula.startsWith("$")&&formula.endsWith("$"))formula=formula.slice(1,-1);
   else if(formula.startsWith("\\[")&&formula.endsWith("\\]")){display=true;formula=formula.slice(2,-2);}
   else if(formula.startsWith("\\(")&&formula.endsWith("\\)"))formula=formula.slice(2,-2);
   return display?"\\["+formula+"\\]":"\\("+formula+"\\)";
  }
  return mathifySegment(esc(part));
 }).join("").replace(/\*\*(.+?)\*\*/gs,"<strong>$1</strong>").replace(/\n{2,}/g,"</p><p>").replace(/\n/g," ");
};

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
function chooseNextTopic(){
 const due=dueTopics().sort((a,b)=>(state.reviews[a.id]?.due||0)-(state.reviews[b.id]?.due||0))[0];
 if(due)return due;
 const remaining=TOPICS.filter(t=>!mastered(t.id));
 if(!remaining.length)return TOPICS[0];
 const diagnostic=state.diagnostic?.topics||{};
 const priority=t=>{
  let score=0;
  if(diagnostic[t.id]===false)score-=5;
  const a=state.attempts[t.id];
  if(a)score+=(a.lastScore??0)*3-Math.log1p(a.total||0);
  const prerequisites=t.prerequisites||[];
  score+=prerequisites.filter(p=>!mastered(p)).length*2;
  return score;
 };
 return remaining.sort((a,b)=>priority(a)-priority(b))[0];
}
function renderPath(){
 const host=$("#diagnosticArea"),rec=$("#pathRecommendation");rec.innerHTML="";
 if(!state.diagnostic){$("#pathTitle").textContent="Diagnostic de départ";$("#pathText").textContent="Réponds à quelques questions pour identifier tes points d'appui. Ce diagnostic ne note pas ton niveau : il oriente simplement ton parcours.";
 const qs=[
 {q:"Si uₙ=1/n, quelle est sa limite lorsque n tend vers +∞ ?",a:["0","1","+∞"],correct:0,topic:"limits"},
 {q:"Une fonction dérivable en a est nécessairement…",a:["continue en a","bornée sur R","strictement croissante"],correct:0,topic:"derivative"},
 {q:"Une famille libre de n vecteurs dans un espace de dimension n est…",a:["une base","toujours orthogonale","vide"],correct:0,topic:"basis"},
 {q:"Une matrice carrée est inversible lorsque…",a:["son déterminant est non nul","tous ses coefficients sont positifs","sa trace vaut 1"],correct:0,topic:"matrices"},
 {q:"La période fondamentale de cos(2x) est…",a:["π","2π","π/2"],correct:0,topic:"trigonometry"},
 {q:"Le module de 3−4i vaut…",a:["5","7","1"],correct:0,topic:"complex"},
 {q:"Pour un dé équilibré, la probabilité d'obtenir 6 vaut…",a:["1/6","1/2","1/3"],correct:0,topic:"probability"},
 {q:"Si deux vecteurs ont un produit scalaire nul, ils sont…",a:["orthogonaux","colinéaires","égaux"],correct:0,topic:"vector-spaces"},
 {q:"La série géométrique Σqⁿ converge lorsque…",a:["|q|<1","q>1","q=1"],correct:0,topic:"series"},
 {q:"Le développement de eˣ à l'ordre 1 en 0 commence par…",a:["1+x","x²","1−x"],correct:0,topic:"taylor"}
 ];;
 host.innerHTML='<div class="diagnostic-questions">'+qs.map((q,i)=>`<div class="diagnostic-q"><b>${i+1}. ${q.q}</b><div>${q.a.map((a,j)=>`<label><input type="radio" name="dq${i}" value="${j}"> ${a}</label>`).join("")}</div></div>`).join("")+'</div><button class="btn primary" id="submitDiagnostic">Analyser mes réponses →</button>';
 typeset(host);$("#submitDiagnostic").onclick=()=>{let score=0,by={};qs.forEach((q,i)=>{const v=$(`input[name="dq${i}"]:checked`),ok=!!v&&+v.value===q.correct;if(ok)score++;by[q.topic]=ok});state.diagnostic={score,total:qs.length,at:Date.now(),topics:by};save();renderPath();toast("Diagnostic enregistré.")};return;
 }
 const d=state.diagnostic;$("#pathTitle").textContent="Ton parcours est initialisé";$("#pathText").textContent=`Diagnostic : ${d.score}/${d.total}. Ce résultat est un point de départ, pas une étiquette.`;
 const next=chooseNextTopic();host.innerHTML=`<div class="diagnostic-result"><div class="result-score">${Math.round(100*d.score/d.total)}<small>%</small></div><div><b>Une première photographie de tes acquis</b><p>Les résultats servent à choisir les notions à travailler, puis seront affinés par tes exercices.</p></div></div>`;
 rec.innerHTML=next?`<div class="recommendation"><span class="eyebrow">PROCHAINE NOTION CONSEILLÉE</span><h3>${esc(next.title)}</h3><p>${esc(next.summary)}</p><button class="btn primary" id="startRecommended">Ouvrir le cours →</button><button class="btn ghost" id="startExercise">Faire un exercice</button></div>`:"";
 $("#startRecommended")?.addEventListener("click",()=>{go("courses");openTopic(next.id)});$("#startExercise")?.addEventListener("click",()=>{go("exercises");openExercise(next.exerciseId)});typeset(host);typeset(rec);
}
function renderCourses(){
 const q=$("#courseSearch").value.trim().toLowerCase();
 const themes=$("#courseThemes"),topicsView=$("#courseTopicsView"),listHost=$("#courseList"),detail=$("#courseDetail");
 const filtered=TOPICS.filter(t=>(!q||(t.title+" "+t.summary+" "+(t.chapter||"")).toLowerCase().includes(q))&&(!activeCourseCategory||t.category===activeCourseCategory));
 const showTopics=!!activeCourseCategory||!!q||!!activeTopic;
 themes.hidden=showTopics;topicsView.hidden=!showTopics;
 if(!showTopics){activeTopic=null;detail.hidden=true;return;}
 listHost.innerHTML=filtered.map(t=>`<button class="course-item ${activeTopic===t.id?"selected":""}" data-topic="${t.id}"><span class="course-symbol">${t.category==="Analyse"?"∫":"∑"}</span><span><b>${esc(t.title)}</b><small>${esc(t.category)} · ${esc(t.level)}</small></span><i>${mastered(t.id)?"✓":"→"}</i></button>`).join("")||'<p class="subtle">Aucune notion trouvée.</p>';
 $$("#courseList [data-topic]").forEach(b=>b.onclick=()=>openTopic(b.dataset.topic));
 if(activeTopic&&topic(activeTopic)){detail.hidden=false;renderTopic(activeTopic);}else{detail.hidden=true;detail.innerHTML="";}
}
function openTopic(id){activeTopic=id;renderCourses()}
function renderTopic(id){
 const t=topic(id);if(!t)return;const ex=EXERCISES.find(e=>e.id===t.exerciseId);
 $("#courseDetail").innerHTML=`<div class="detail-top"><span class="tag">${esc(t.category)} · ${esc(t.level)}</span>${mastered(id)?'<span class="mastered-label">✓ Maîtrisée</span>':''}</div><h2>${esc(t.title)}</h2><p class="lead">${esc(t.summary)}</p><p class="course-meta">${esc(t.chapter||t.category)} · ${esc(t.level)} · ${EXERCISES.filter(e=>e.topic===id).length} exercice(s)</p><h3>Définitions essentielles</h3>${t.definitions.map(d=>`<div class="definition"><b>${d[0]}</b><p>${d[1]}</p></div>`).join("")}<h3>Propriétés à connaître</h3><ul class="property-list">${t.properties.map(p=>`<li>${p}</li>`).join("")}</ul><h3>Exemple détaillé</h3><div class="example-box">${t.example}</div><div class="detail-actions"><button class="btn primary" id="topicExercise">S'entraîner sur cette notion →</button><button class="btn ghost" id="topicReview">Ajouter aux révisions</button></div>`;
 $("#topicExercise").onclick=()=>{go("exercises");openExercise(t.exerciseId)};$("#topicReview").onclick=()=>scheduleReview(id,1);typeset($("#courseDetail"));
}
function renderExercises(){
 const q=$("#exerciseSearch").value.toLowerCase(),diff=$("#exerciseDifficulty").value;
 const themes=$("#exerciseThemes"),topicsView=$("#exerciseTopicsView"),detail=$("#exerciseWorkspace");
 const topicCards=TOPICS.filter(t=>t.category===activeExerciseCategory);
 const showTopics=!!activeExerciseCategory;
 themes.hidden=showTopics;topicsView.hidden=!showTopics;
 if(!showTopics){$("#exerciseTopicList").innerHTML="";detail.hidden=true;return;}
 $("#exerciseTopicList").innerHTML=topicCards.map(t=>{
  const count=EXERCISES.filter(e=>e.topic===t.id).length,solved=EXERCISES.filter(e=>e.topic===t.id&&state.solved.includes(e.id)).length;
  return `<button class="course-item ${activeExerciseTopic===t.id?"selected":""}" data-ex-topic="${t.id}"><span class="course-symbol">${t.category==="Analyse"?"∫":"∑"}</span><span><b>${esc(t.title)}</b><small>${esc(t.level)} · ${count} exercice(s) · ${solved} réussi(s)</small></span><i>→</i></button>`;
 }).join("")||'<p class="subtle">Aucun chapitre disponible.</p>';
 $$("[data-ex-topic]").forEach(b=>b.onclick=()=>{activeExerciseTopic=b.dataset.exTopic;activeExercise=null;renderExercises()});
 if(!activeExerciseTopic){detail.hidden=true;return;}
 detail.hidden=false;$("#exerciseTopicHeading").textContent=topic(activeExerciseTopic)?.title||"Exercices";
 const list=EXERCISES.filter(e=>e.topic===activeExerciseTopic&&(!q||(e.title+" "+e.question).toLowerCase().includes(q))&&(diff==="all"||e.difficulty===diff));
 $("#exerciseList").innerHTML=list.map(e=>`<button class="exercise-item ${activeExercise===e.id?"selected":""}" data-ex="${e.id}"><span class="difficulty ${e.difficulty.toLowerCase()}">${e.difficulty}</span><b>${esc(e.title)}</b><small>${esc(topic(e.topic)?.title||"")}</small><i>${state.solved.includes(e.id)?"✓":"→"}</i></button>`).join("")||'<p class="subtle">Aucun exercice correspondant.</p>';
 $(".exercise-layout").classList.toggle("exercise-open",!!activeExercise);
 $$("#exerciseList [data-ex]").forEach(b=>b.onclick=()=>openExercise(b.dataset.ex));
 if(activeExercise&&EXERCISES.some(e=>e.id===activeExercise&&e.topic===activeExerciseTopic))renderExercise(activeExercise);
 else if(!activeExercise)$("#exerciseDetail").innerHTML='<div class="empty-state"><span>⌘</span><h3>Choisis un exercice</h3><p>Sélectionne un exercice dans la liste pour commencer.</p></div>';
}
function openExercise(id){const e=EXERCISES.find(x=>x.id===id);if(e){activeExerciseCategory=e.category;activeExerciseTopic=e.topic;activeExercise=id;}renderExercises()}
function renderExercise(id){
 const e=EXERCISES.find(x=>x.id===id);if(!e)return;
 $("#exerciseDetail").innerHTML=`<button class="exercise-back" id="exerciseBack" type="button">← Tous les exercices</button><div class="detail-top"><span class="tag">${esc(e.category)} · ${esc(e.difficulty)}</span><span class="subtle">${esc(topic(e.topic)?.title||"")}</span></div><h2>${esc(e.title)}</h2><div class="question-box">${exerciseRichText(e.question)}</div><div class="answer-area"><label for="selfAnswer">Ta démarche (facultatif, pour garder une trace)</label><textarea id="selfAnswer" rows="4" placeholder="Pose les étapes de ton raisonnement…">${esc(state.drafts?.[id]||"")}</textarea><div class="exercise-actions"><button class="btn ghost" id="hintBtn">Afficher un indice</button><button class="btn ghost" id="solutionBtn">Voir la correction</button></div><div id="hintBox" class="hint-box" hidden></div><div id="solutionBox" class="solution-box" hidden></div></div><div class="self-check"><b>Évalue ton travail en toute honnêteté</b><p>La validation repose sur ton autonomie, pas sur le simple affichage de la correction.</p><div><button class="rating-btn" data-score="0">À reprendre</button><button class="rating-btn" data-score="1">Avec aide</button><button class="rating-btn" data-score="2">Réussi seul</button></div></div>`;
 $("#exerciseBack").onclick=()=>{activeExercise=null;renderExercises()};
 $("#selfAnswer").addEventListener("input",()=>{state.drafts=state.drafts||{};state.drafts[id]=$("#selfAnswer").value;state.updatedAt=new Date().toISOString();try{localStorage.setItem(KEY,JSON.stringify(state));window.Maths2Account?.scheduleSync?.()}catch(e){console.warn("Sauvegarde locale indisponible",e)}});
  let h=0;$("#hintBtn").onclick=()=>{const hints=e.hints||[];if(h<hints.length){$("#hintBox").hidden=false;$("#hintBox").innerHTML=`<b>Indice ${h+1}/${hints.length}</b><p>${exerciseRichText(hints[h++])}</p>`;typesetExercise($("#hintBox"))}else toast("Tous les indices ont été affichés.")};
 $("#solutionBtn").onclick=()=>{$("#solutionBox").hidden=false;$("#solutionBox").innerHTML=`<div class="solution-heading"><span>✓</span><div><b>Correction détaillée</b><small>Raisonnement et justification étape par étape</small></div></div><div class="solution-content">${(e.solutionSteps||[]).map((s,i)=>`<div class="solution-step"><b>Étape ${i+1}</b><p>${exerciseRichText(s)}</p></div>`).join("")}<div class="solution-conclusion"><b>Conclusion</b><p>${exerciseRichText(e.answer)}</p></div></div><p class="check-note">${esc(e.check||"Vérifie que chaque implication est justifiée.")}</p>`;typesetExercise($("#solutionBox"))};
 $$(".rating-btn").forEach(b=>b.onclick=()=>recordAttempt(e,+b.dataset.score));
 // Attendre que le navigateur ait réellement inséré et peint l’énoncé avant MathJax.
 requestAnimationFrame(()=>{
  const question=$("#exerciseDetail .question-box");
  if(question)typesetExercise(question);
 });
}
function recordAttempt(e,score){
 const a=state.attempts[e.topic]||{independent:0,total:0,lastScore:0};a.total++;a.lastScore=score/2;if(score===2)a.independent++;else a.independent=0;state.attempts[e.topic]=a;
 if(score===2&&!state.solved.includes(e.id))state.solved.push(e.id);
 scheduleReview(e.topic,score===2?3:score===1?2:1,false);save();toast(score===2?"Réussite enregistrée. Continue à consolider !":"Tentative enregistrée : la notion reviendra dans ton parcours.");
}
function scheduleReview(id,quality=1,notify=true){
 const previous=state.reviews[id]||{interval:0,repetitions:0};
 let days;
 if(quality<=1)days=1;
 else if(quality===2)days=Math.max(3,Math.round((previous.interval||1)*1.5));
 else days=Math.max(7,Math.round((previous.interval||3)*2.2));
 const repetitions=quality<=1?0:(previous.repetitions||0)+1;
 state.reviews[id]={due:Date.now()+days*86400000,interval:days,repetitions,lastQuality:quality};
 save();if(notify)toast("Révision reprogrammée dans "+days+" jour(s).");
}
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
 $("#reviewCard").innerHTML=`<div class="review-counter">CARTE ${reviewIndex+1} / ${reviewQueue.length}</div><button class="flashcard" id="flipCard" type="button" aria-label="Retourner la carte"><span class="flashcard-inner"><span class="flashcard-face flashcard-front"><small>RAPPEL ACTIF</small><strong>${card.front}</strong><span>Clique pour retourner la carte</span></span><span class="flashcard-face flashcard-back"><small>RÉPONSE</small><strong>${card.back}</strong><span>Clique pour revoir la question</span></span></span></button><p class="subtle center flashcard-prompt">${reviewFlipped?"Voici la réponse. Évalue ton rappel.":"Essaie de retrouver la réponse avant de retourner la carte."}</p><div class="review-rating" ${reviewFlipped?"":"hidden"}><button data-quality="1">Difficile</button><button data-quality="2">Moyen</button><button data-quality="3">Facile</button></div>`;
 const flip=$("#flipCard");if(reviewFlipped)flip.classList.add("flipped");
 flip.onclick=()=>{reviewFlipped=!reviewFlipped;flip.classList.toggle("flipped",reviewFlipped);$("#reviewCard .review-rating").hidden=!reviewFlipped;$("#reviewCard .flashcard-prompt").textContent=reviewFlipped?"Voici la réponse. Évalue ton rappel.":"Essaie de retrouver la réponse avant de retourner la carte.";typeset($("#reviewCard"))};
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
 limit:{label:"Distance δ à a = 1",min:0.05,max:1.2,step:0.05,value:1.2,caption:"Les deux points x=1−δ et x=1+δ se rapprochent de a=1. Observe leurs images sur la parabole f(x)=x² et la distance verticale à L=1.",formula:"\\\\(f(x)=x^2,\\quad \\lim_{x\\to1}f(x)=1\\\\)"},
 continuity:{label:"Abscisse du point mobile x",min:-0.5,max:2.3,step:0.05,value:2.2,caption:"Le point A reste fixé en (1,1). Déplace P sur la parabole f(x)=x² : les segments en pointillés visualisent Δx et Δy.",formula:"\\\\(f(x)=x^2,\\quad \\lim_{x\\to1}f(x)=f(1)=1\\\\)"},
 derivative:{label:"Écart h du point mobile",min:-1.5,max:1.5,step:0.05,value:1.2,caption:"Le point fixe est a = 0,5. Fais tendre h vers 0 : le point mobile b = a + h rejoint le point fixe et la sécante tend vers la tangente.",formula:"\\\\(f(x)=x^2,\\quad m_{sec}=\\frac{f(a+h)-f(a)}{h}=2a+h,\\quad \\lim_{h\\to0}m_{sec}=f'(a)=2a\\)"},
 integral:{label:"Borne supérieure b",min:0.3,max:2.8,step:0.05,value:1.8,caption:"La zone colorée représente l'intégrale de x² entre 0 et b.",formula:"\\\\(\\int_0^b x^2\\,dx=\\frac{b^3}{3}\\\\)"},
 taylor:{label:"Ordre du développement",min:0,max:8,step:1,value:4,caption:"Compare exp(x) à son polynôme de Taylor. L'approximation s'améliore près de 0 quand l'ordre augmente.",formula:"\\\\(e^x=\\sum_{k=0}^{n}\\frac{x^k}{k!}+o(x^n)\\\\)"},
 injectivity:{label:"Valeur x",min:0.25,max:2.5,step:0.05,value:1.4,caption:"Pour x² sur ℝ, x et −x ont la même image : la fonction n'est pas injective.",formula:"\\\\(f(x)=x^2=f(-x),\\quad x\\ne0\\\\)"},
 determinant:{label:"Angle orienté entre les vecteurs",min:0,max:360,step:1,value:55,caption:"L'aire du parallélogramme est la valeur absolue du déterminant des deux vecteurs.",formula:"\\\\(\\det(u,v)=\\|u\\|\\,\\|v\\|\\sin(\\theta)\\\\)"},
 schmidt:{label:"Angle entre v₁ et v₂",min:10,max:170,step:1,value:55,caption:"La projection de v₂ sur v₁ est retirée : le résidu obtenu est orthogonal à v₁.",formula:"\\\\(w_2=v_2-\\frac{\\langle v_2,v_1\\rangle}{\\|v_1\\|^2}v_1,\\quad \\langle w_2,v_1\\rangle=0\\\\)"},
 fourier:{label:"Nombre d'harmoniques",min:1,max:21,step:2,value:5,caption:"La somme des harmoniques impaires approche une onde carrée. Observe les oscillations près des discontinuités.",formula:"\\\\(S_n(x)=\\frac4\\pi\\sum_{k=0}^{n}\\frac{\\sin((2k+1)x)}{2k+1}\\\\)"},
 trig:{label:"Angle θ (degrés)",min:0,max:360,step:1,value:45,caption:"Le point mobile parcourt le cercle unité. Ses coordonnées sont le cosinus et le sinus de l'angle.",formula:"\\\\((\\cos\\theta,\\sin\\theta),\\quad \\cos^2\\theta+\\sin^2\\theta=1\\\\)"},
 eigen:{label:"Valeur propre λ",min:-2,max:4,step:0.1,value:2,caption:"Une direction propre reste stable par l'application : le vecteur est simplement multiplié par λ.",formula:"\\\\(Av=\\lambda v,\\quad v\\ne0\\\\)"},
 surface3d:{label:"Angle de vue",min:-180,max:180,step:1,value:-38,caption:"Explore une surface z=f(x,y). Fais glisser le curseur ou déplace directement la vue à la souris pour observer les reliefs.",formula:"\\\\(z=f(x,y)\\\\)"},
 complex3d:{label:"Vitesse angulaire ω",min:0.5,max:2.5,step:0.1,value:1,caption:"L'exponentielle complexe décrit une rotation uniforme dans le plan complexe. En ajoutant le temps comme troisième axe, la trajectoire devient une hélice.",formula:"\\\\(e^{i\\omega t}=\\cos(\\omega t)+i\\sin(\\omega t)\\\\)"}
};
let labType="sequence";
function renderLabGuide(){
 const value=Number($("#labSlider").value);
 const guides={
  sequence:{title:"Voir une suite converger",text:"Chaque point représente un terme. Quand n augmente, le terme se rapproche de 1 : la distance verticale à la droite y = 1 diminue.",question:"Peux-tu trouver un rang N à partir duquel tous les termes sont à moins de 0,1 de 1 ?",steps:["1 · Lis la hauteur du point : c'est uₙ.","2 · Compare sa distance à la droite y = 1.","3 · Relie la distance observée à |uₙ − 1| = 1/n."]},
  derivative:{title:"De la sécante à la tangente",text:"La droite verte relie deux points : c'est une sécante. La droite dorée est la tangente au point a. Quand le second point se rapproche de a, la sécante prend la direction de la tangente.",question:"Que devient le coefficient directeur de la sécante lorsque h tend vers 0 ?",steps:["1 · La courbe bleue donne f(x) = x².","2 · La sécante mesure un taux de variation moyen.","3 · À la limite, sa pente vaut f′(a) = 2a."]},
  integral:{title:"L'intégrale : aire exacte et sommes de rectangles",text:"La courbe bleue est f(x)=x². La surface bleutée est l'aire exacte entre 0 et b ; les rectangles dorés donnent une approximation par sommes de Riemann. Quand leur largeur diminue, leur aire totale se rapproche de l'intégrale.",question:"Pourquoi la somme des rectangles devient-elle une meilleure approximation lorsque leur largeur diminue ?",steps:["1 · Déplace b : la borne supérieure et l'aire changent.","2 · Compare les rectangles à la surface sous la courbe.","3 · L'aire exacte vaut b³/3 ; si b double, elle est multipliée par 8."]},
  schmidt:{title:"Gram–Schmidt : décomposer puis orthogonaliser",text:"Le vecteur orange v₂ se décompose en deux morceaux : sa projection dorée sur la direction de v₁, et le résidu vert w₂. Ce résidu est perpendiculaire à v₁. L'algorithme conserve ensuite w₂, puis le normalise si l'on veut une base orthonormée.",question:"Quand l'angle entre v₁ et v₂ varie, comment évoluent la projection et le résidu orthogonal ?",steps:["1 · Le vecteur bleu v₁ fixe la première direction.","2 · La flèche dorée est projᵥ₁(v₂), la composante parallèle.","3 · La flèche verte w₂=v₂−projᵥ₁(v₂) est orthogonale à v₁ : ⟨v₁,w₂⟩=0."]},
  surface3d:{title:"Lire une fonction de deux variables",text:"La hauteur de chaque point représente f(x,y). La couleur et la perspective rendent visibles les zones de minimum, de maximum et les directions de variation. Fais tourner la surface pour ne pas confondre relief et projection.",question:"Comment la valeur de f(x,y) évolue-t-elle lorsque tu changes x ou y séparément ?",steps:["1 · x et y déterminent la position dans le plan de base.","2 · La hauteur z=f(x,y) donne la valeur de la fonction.","3 · Compare le paraboloïde, la selle et les surfaces ondulées."]},
  complex3d:{title:"De la rotation à l'hélice",text:"Dans le plan complexe, le point e^(iωt) tourne sur le cercle unité. En représentant aussi le temps t sur un troisième axe, la trajectoire devient une hélice. La norme reste égale à 1 : seule l'argument évolue.",question:"Pourquoi le rayon de la trajectoire reste-t-il constant alors que le point tourne ?",steps:["1 · La partie réelle vaut cos(ωt).","2 · La partie imaginaire vaut sin(ωt).","3 · cos²(ωt)+sin²(ωt)=1 : le point reste sur le cercle unité."]},
  limit:{title:"Limite en un point : rapprocher x de a",text:"On étudie f(x)=x² au voisinage de a=1. Les deux points mobiles sont placés en 1−δ et 1+δ. Lorsque δ diminue, leurs abscisses se rapprochent de 1 et leurs images se rapprochent de L=1. Les traits pointillés matérialisent les écarts.",question:"Quand δ est divisé par 2, que deviennent les écarts |(1±δ)²−1| ?",steps:["Le point fixe A=(1,1) représente (a,L).","Les points P− et P+ représentent les images de 1−δ et 1+δ.","Pour f(x)=x², |f(1±δ)−1|=|±2δ+δ²| : ces écarts tendent vers 0 avec δ."]},
  continuity:{title:"Continuité en a : contrôler Δx et Δy",text:"Le point A=(1,1) reste fixe tandis que P=(x,x²) se déplace. Les pointillés montrent séparément Δx=x−1 et Δy=x²−1. La continuité en 1 signifie précisément que Δy devient arbitrairement petit dès que Δx est suffisamment petit.",question:"Peux-tu choisir une zone horizontale autour de 1 qui force |f(x)−f(1)| à être inférieur à 0,5 ?",steps:["A est le point de référence : f(1)=1.","P est le point mobile : Δx=x−1 et Δy=x²−1.","Comme x²−1=(x−1)(x+1), si |x−1|<0,2 alors x∈(0,8;1,2), donc |x+1|<2,2 et |x²−1|<0,44<0,5."]},
  taylor:{title:"Comparer exp et son polynôme",text:"La courbe bleue représente exp(x), la courbe dorée son polynôme de Taylor à l'ordre choisi. L'approximation est particulièrement bonne près de 0.",question:"Que se passe-t-il lorsque l'ordre du développement augmente ?",steps:["Compare les deux courbes près de 0.","Augmente l'ordre avec le curseur.","Observe l'amélioration locale de l'approximation."]},
  injectivity:{title:"Détecter une fonction non injective",text:"Pour f(x)=x², deux antécédents opposés ont la même image.",question:"Pourquoi x et −x ont-ils la même image ?",steps:["Observe les deux points symétriques.","Compare leurs ordonnées.","Une même image pour deux antécédents distincts empêche l'injectivité."]},
  determinant:{title:"Le déterminant comme aire orientée",text:"Les deux vecteurs forment un parallélogramme. La valeur absolue du déterminant est son aire.",question:"Que devient l'aire lorsque les vecteurs deviennent presque colinéaires ?",steps:["Fais varier l'angle.","Observe l'ouverture du parallélogramme.","L'aire vaut ||u|| ||v|| |sin θ|."]},
  fourier:{title:"Reconstruire un signal par Fourier",text:"La somme de sinus harmoniques impairs approche un signal en créneaux.",question:"Pourquoi la courbe se rapproche-t-elle d'un signal carré quand le nombre d'harmoniques augmente ?",steps:["Observe la première harmonique.","Augmente le nombre d'harmoniques.","Repère les oscillations près des discontinuités."]},
  trig:{title:"Explorer le cercle trigonométrique",text:"Le point mobile reste sur le cercle unité. Ses coordonnées sont cos θ et sin θ.",question:"Pourquoi la somme des carrés des coordonnées vaut-elle toujours 1 ?",steps:["Fais varier θ.","Lis les projections horizontale et verticale.","Utilise cos² θ + sin² θ = 1."]},
  eigen:{title:"Comprendre une direction propre",text:"Une direction propre reste inchangée par l'application : seul le facteur d'échelle varie.",question:"Qu'est-ce qui change lorsque la valeur propre varie : la direction ou la longueur ?",steps:["Compare les deux pentes.","Fais varier λ.","Le vecteur propre conserve sa direction et est multiplié par λ."]},
 };
 const g=guides[labType]||{title:"Observer puis expliquer",text:$("#labCaption").textContent,question:"Quel phénomène mathématique le dessin illustre-t-il ?",steps:["1 · Modifie le paramètre.","2 · Décris ce qui change.","3 · Formule la propriété correspondante."]};
 $("#labLearningTitle").textContent=g.title;$("#labLearningText").textContent=g.text;$("#labQuestion").textContent=g.question;
 $("#labSteps").innerHTML=g.steps.map((step,i)=>'<div class="lab-step"><span>'+(i+1)+'</span><p>'+step.replace(/^\d+ · /,"")+'</p></div>').join("");
 typeset($("#labLearning"));
}
function renderLabExtras(){
 const host=$("#labExtraControls");if(!host)return;
 if(labType==="integral"){
  host.innerHTML='<div class="lab-extra-head"><b>Précision de l’approximation</b><span id="labExtraValue">20 rectangles</span></div><input id="labExtraSlider" type="range" min="2" max="100" step="1" value="20"><p>Augmente le nombre de subdivisions pour observer la convergence de la somme de Riemann.</p>';
  $("#labExtraSlider").oninput=()=>{$("#labExtraValue").textContent=$("#labExtraSlider").value+" rectangles";drawLab()};
 }else if(labType==="trig"){
  const angles=[0,30,45,60,90,120,135,150,180,210,225,240,270,300,315,330,360];
  host.innerHTML='<div class="lab-extra-head"><b>Angles remarquables</b><span>Accès direct</span></div><div class="lab-angle-presets">'+angles.map(a=>`<button type="button" data-angle="${a}">${a}°</button>`).join("")+'</div><div class="lab-trig-values" id="labTrigValues"></div>';
  $("[data-angle]").forEach(b=>b.onclick=()=>{$("#labSlider").value=b.dataset.angle;drawLab()});
 }else if(labType==="determinant"){
  host.innerHTML='<div class="lab-extra-head"><b>Norme du second vecteur</b><span id="labExtraValue">2,0</span></div><input id="labExtraSlider" type="range" min="0.5" max="3" step="0.1" value="2"><p>Le déterminant dépend de la longueur des deux vecteurs et de leur angle.</p>';
  $("#labExtraSlider").oninput=()=>{$("#labExtraValue").textContent=Number($("#labExtraSlider").value).toLocaleString("fr-FR",{maximumFractionDigits:1});drawLab()};
 }else if(labType==="fourier"){
  host.innerHTML='<div class="lab-extra-head"><b>Lecture du signal</b><span>Harmoniques impaires</span></div><p>Les oscillations près des discontinuités illustrent le phénomène de Gibbs.</p>';
 }else host.innerHTML="";
}
function labSetup(){
 const cfg=LABS[labType],slider=$("#labSlider");
 $("#surfaceFunctionWrap").hidden=labType!=="surface3d";$("#labAnimate").hidden=labType!=="complex3d";renderLabExtras();
 if(labType!=="complex3d")stopComplexAnimation();
 $("#labSliderLabel").textContent=cfg.label;slider.min=cfg.min;slider.max=cfg.max;slider.step=cfg.step;slider.value=cfg.value;
 if(labType==="surface3d"){labRotationY=Number(cfg.value)*Math.PI/180;updateSurfaceMeta()}
 else{$("#labCaption").textContent=cfg.caption;$("#labFormula").innerHTML=cfg.formula.replace(/\\\\/g,"\\");}
 $("#labValue").textContent=Number(cfg.value).toLocaleString("fr-FR",{maximumFractionDigits:2});
 typeset($("#labFormula"));typeset($("#labCaption"));typeset($("#labSliderLabel"));renderLabGuide();drawLab();
}

const SURFACE_FUNCTIONS={
 paraboloid:{label:"Paraboloïde",formula:"\\\\(f(x,y)=0.34(x^2+y^2)\\\\)",caption:"Un minimum au point (0,0). La hauteur augmente dans toutes les directions à mesure que l'on s'éloigne de l'origine.",fn:(x,y)=>.34*(x*x+y*y)},
 saddle:{label:"Selle",formula:"\\\\(f(x,y)=0.34(x^2-y^2)\\\\)",caption:"Une selle : la fonction augmente dans la direction x et diminue dans la direction y. L'origine est un point selle, pas un extremum local.",fn:(x,y)=>.34*(x*x-y*y)},
 wave:{label:"Surface ondulée",formula:"\\\\(f(x,y)=1.2\\sin(x)\\cos(y)\\\\)",caption:"Une surface périodique avec alternance de bosses et de creux. Observe les lignes de niveau et les symétries.",fn:(x,y)=>1.2*Math.sin(x)*Math.cos(y)},
 gaussian:{label:"Gaussienne",formula:"\\\\(f(x,y)=2e^{-0.7(x^2+y^2)}\\\\)",caption:"Une bosse centrée à l'origine qui décroît rapidement vers 0 lorsqu'on s'éloigne du centre.",fn:(x,y)=>2*Math.exp(-.7*(x*x+y*y))}
};
let labRotationY=-.66,labRotationX=.88,labDragging=null,complexRunning=false,complexPhase=0,complexLastFrame=0,complexAnimationFrame=0;
function updateSurfaceMeta(){const s=SURFACE_FUNCTIONS[$("#surfaceFunction").value]||SURFACE_FUNCTIONS.paraboloid;$("#labCaption").textContent=s.caption;$("#labFormula").innerHTML=s.formula;}
function project3D(x,y,z,W,H,scale=1){
 const cy=Math.cos(labRotationY),sy=Math.sin(labRotationY),cx=Math.cos(labRotationX),sx=Math.sin(labRotationX),xr=x*cy-z*sy,zr=x*sy+z*cy,yr=y*cx-zr*sx,depth=y*sx+zr*cx,k=Math.min(W/9,H/6.2)*scale;
 return {x:W*.5+xr*k,y:H*.53-yr*k,depth};
}
function drawAxes3D(ctx,W,H,scale=1){
 const O=project3D(0,0,0,W,H,scale),X=project3D(2.55,0,0,W,H,scale),Y=project3D(0,2.55,0,W,H,scale),Z=project3D(0,0,2.25,W,H,scale);
 ctx.lineWidth=1.5;ctx.strokeStyle="#536985";ctx.beginPath();ctx.moveTo(O.x,O.y);ctx.lineTo(X.x,X.y);ctx.moveTo(O.x,O.y);ctx.lineTo(Y.x,Y.y);ctx.moveTo(O.x,O.y);ctx.lineTo(Z.x,Z.y);ctx.stroke();ctx.font="12px system-ui";ctx.fillStyle="#aebfda";ctx.fillText("x",X.x+5,X.y);ctx.fillText("y",Y.x+5,Y.y);ctx.fillText("z",Z.x+5,Z.y);
}
function drawSurface3D(ctx,W,H){
 const cfg=SURFACE_FUNCTIONS[$("#surfaceFunction").value]||SURFACE_FUNCTIONS.paraboloid,n=28,step=4/n,cells=[];
 for(let i=0;i<n;i++)for(let j=0;j<n;j++){const x0=-2+i*step,x1=x0+step,y0=-2+j*step,y1=y0+step,pts=[[x0,y0],[x1,y0],[x1,y1],[x0,y1]].map(([x,y])=>project3D(x,y,cfg.fn(x,y),W,H,.93));cells.push({pts,depth:pts.reduce((s,p)=>s+p.depth,0)/4,z:(cfg.fn(x0,y0)+cfg.fn(x1,y0)+cfg.fn(x1,y1)+cfg.fn(x0,y1))/4})}
 cells.sort((a,b)=>a.depth-b.depth);const maxZ=Math.max(.2,...cells.map(c=>Math.abs(c.z)));
 for(const c of cells){const q=Math.max(-1,Math.min(1,c.z/maxZ)),h=215-((q+1)/2)*105;ctx.beginPath();ctx.moveTo(c.pts[0].x,c.pts[0].y);for(let k=1;k<4;k++)ctx.lineTo(c.pts[k].x,c.pts[k].y);ctx.closePath();ctx.fillStyle="hsla("+h+",78%,"+(42+Math.abs(q)*9)+"%,.88)";ctx.fill();ctx.strokeStyle="rgba(190,218,255,.22)";ctx.lineWidth=.65;ctx.stroke()}
 drawAxes3D(ctx,W,H,.93);ctx.fillStyle="#e8f0ff";ctx.font="600 13px system-ui";ctx.fillText(cfg.label+" · z = f(x,y)",22,28);ctx.fillStyle="#9aabc5";ctx.font="11px system-ui";ctx.fillText("Glisse sur la surface pour changer le point de vue",22,H-17);$("#labLegend").innerHTML='<span style="color:#57d9ee">■ Hauteur z = f(x,y)</span><span style="color:#9aabc5">↔ Axes x et y</span>';
}
function drawComplex3D(ctx,W,H){
 const omega=Number($("#labSlider").value)||1,segments=420,end=4*Math.PI,pts=[];
 for(let i=0;i<=segments;i++){const t=end*i/segments;pts.push(project3D(t-end/2,Math.cos(omega*t),Math.sin(omega*t),W,H,.72))}
 drawAxes3D(ctx,W,H,.72);ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.strokeStyle="#57d9ee";ctx.lineWidth=3.2;ctx.shadowColor="#42cde8";ctx.shadowBlur=13;ctx.stroke();ctx.shadowBlur=0;
 const tNow=(complexPhase/omega)%end,index=Math.min(segments,Math.max(0,Math.floor(tNow/end*segments))),p=pts[index];ctx.beginPath();ctx.arc(p.x,p.y,7,0,Math.PI*2);ctx.fillStyle="#fff";ctx.shadowColor="#54d9ef";ctx.shadowBlur=18;ctx.fill();ctx.shadowBlur=0;
 const ring=[];for(let k=0;k<=100;k++){const a=2*Math.PI*k/100;ring.push(project3D(tNow-end/2,Math.cos(a),Math.sin(a),W,H,.72))}ctx.beginPath();ring.forEach((q,i)=>i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y));ctx.strokeStyle="rgba(245,190,105,.72)";ctx.lineWidth=1.5;ctx.setLineDash([4,5]);ctx.stroke();ctx.setLineDash([]);
 ctx.fillStyle="#e8f0ff";ctx.font="600 13px system-ui";ctx.fillText("Hélice : t ↦ (t, cos(ωt), sin(ωt))",22,28);ctx.fillStyle="#9aabc5";ctx.font="11px system-ui";ctx.fillText("Le rayon dans le plan complexe reste égal à 1",22,H-17);$("#labLegend").innerHTML='<span style="color:#57d9ee">━ Trajectoire hélicoïdale</span><span style="color:#fff">● Point mobile</span><span style="color:#e6b66e">┄ Cercle unité</span>';
}
function stopComplexAnimation(){complexRunning=false;complexLastFrame=0;if(complexAnimationFrame)cancelAnimationFrame(complexAnimationFrame);complexAnimationFrame=0;const b=$("#labAnimate");if(b)b.textContent="▶ Animer"}
function animateComplexFrame(now){if(!complexRunning||labType!=="complex3d")return;if(complexLastFrame)complexPhase+=(now-complexLastFrame)/1000*(Number($("#labSlider").value)||1);complexLastFrame=now;drawLab();complexAnimationFrame=requestAnimationFrame(animateComplexFrame)}
function toggleComplexAnimation(){if(complexRunning){stopComplexAnimation();return}complexRunning=true;complexLastFrame=0;$("#labAnimate").textContent="Ⅱ Pause";complexAnimationFrame=requestAnimationFrame(animateComplexFrame)}
function drawLab(){
 const canvas=$("#labCanvas");if(!canvas)return;
 const rect=canvas.getBoundingClientRect(),W=Math.max(320,rect.width||900),H=Math.max(300,Math.min(560,W*.52));
 const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);canvas.style.height=H+"px";
 const ctx=canvas.getContext("2d");ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);ctx.fillStyle="#081321";ctx.fillRect(0,0,W,H);
 if(labType==="surface3d"){labRotationY=Number($("#labSlider").value)*Math.PI/180;drawSurface3D(ctx,W,H);$("#labValue").textContent=Number($("#labSlider").value).toLocaleString("fr-FR",{maximumFractionDigits:0})+"°";return}
 if(labType==="complex3d"){drawComplex3D(ctx,W,H);$("#labValue").textContent=(+$("#labSlider").value).toLocaleString("fr-FR",{maximumFractionDigits:1});return}
 const m={l:58,r:24,t:24,b:48},pw=W-m.l-m.r,ph=H-m.t-m.b;
 let xmin,xmax,ymin,ymax;
 if(labType==="sequence"){xmin=0;xmax=Math.round(+$("#labSlider").value)+1;ymin=.75;ymax=2.15}
 else if(labType==="derivative"){xmin=-2.5;xmax=2.5;ymin=-1;ymax=6.5}
 else if(labType==="integral"){xmin=0;xmax=3.1;ymin=0;ymax=9}
 else if(labType==="determinant"){xmin=-1;xmax=5.2;ymin=-3.5;ymax=3.5}
 else if(labType==="trig"){xmin=-1.5;xmax=1.5;ymin=-1.5;ymax=1.5}
 else if(labType==="limit"||labType==="continuity"){xmin=-0.5;xmax=2.5;ymin=-0.6;ymax=5.4}
 else{xmin=-3;xmax=3;ymin=-3;ymax=3}
 const trigScale=Math.min(pw/(xmax-xmin),ph/(ymax-ymin));const X=x=>labType==="trig"?W*.5+x*trigScale:m.l+(x-xmin)/(xmax-xmin)*pw,Y=y=>labType==="trig"?H*.53-y*trigScale:m.t+(ymax-y)/(ymax-ymin)*ph;
 const grid="#263b52",axis="#91a8c0",txt="#9eb2c9";ctx.font="11px system-ui";ctx.lineWidth=1;ctx.strokeStyle=grid;ctx.fillStyle=txt;
 const xt=labType==="sequence"?[0,Math.round(xmax/2),xmax-1]:labType==="integral"?[0,.5,1,1.5,2,2.5,3]:(labType==="limit"||labType==="continuity")?[0,.5,1,1.5,2]:[-2,-1,0,1,2],yt=labType==="sequence"?[1,1.5,2]:labType==="derivative"?[0,1,2,3,4,5,6]:labType==="integral"?[0,1,2,4,6,8]:(labType==="limit"||labType==="continuity")?[0,1,2,3,4,5]:[-2,-1,0,1,2,3,4];
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
  if(labType==="integral"){
    const b=v,N=Math.max(2,Math.round(Number($("#labExtraSlider")?.value||20))),dx=b/N,area=b*b*b/3;let riemann=0;
    // L'aire exacte est peinte en premier pour laisser les rectangles de Riemann visibles.
    ctx.beginPath();ctx.moveTo(X(0),Y(0));for(let k=0;k<=400;k++){const x=b*k/400;ctx.lineTo(X(x),Y(x*x))}ctx.lineTo(X(b),Y(0));ctx.closePath();
    const grad=ctx.createLinearGradient(0,Y(b*b),0,Y(0));grad.addColorStop(0,"rgba(76,145,235,.24)");grad.addColorStop(1,"rgba(76,145,235,.07)");ctx.fillStyle=grad;ctx.fill();
    for(let k=0;k<N;k++){const x0=k*dx,x1=(k+1)*dx,mid=(x0+x1)/2,height=mid*mid;riemann+=height*dx;ctx.fillStyle=k%2?"rgba(235,177,91,.28)":"rgba(235,177,91,.42)";ctx.fillRect(X(x0),Y(height),Math.max(1,X(x1)-X(x0)),Y(0)-Y(height));ctx.strokeStyle="rgba(235,177,91,.9)";ctx.lineWidth=1;ctx.strokeRect(X(x0),Y(height),X(x1)-X(x0),Y(0)-Y(height))}
    curve(x=>x*x,0,3.02,"#80b8f4",3.5);segment(b,0,b,b*b,"#e0b86d",2,[6,4]);point(b,b*b,"#e0b86d",6);point(b,0,"#e0b86d",4);
    ctx.fillStyle="#e8edf5";ctx.font="bold 13px system-ui";ctx.textAlign="left";ctx.fillText("Intégrale = "+area.toFixed(4).replace(".",","),m.l+12,m.t+18);ctx.fillStyle="#e0b86d";ctx.font="12px system-ui";ctx.fillText("Riemann = "+riemann.toFixed(4).replace(".",",")+" · erreur = "+Math.abs(area-riemann).toFixed(4).replace(".",","),m.l+12,m.t+37);$("#labExtraValue").textContent=N+" rectangles";
    ctx.fillStyle="#f0c77c";ctx.font="bold 12px system-ui";ctx.fillText("b = "+b.toFixed(2).replace(".",","),X(b)+8,Y(0)+18);
    $("#labLegend").innerHTML='<span style="color:#80b8f4">● Courbe f(x)=x²</span><span style="color:#e0b86d">▧ Somme de Riemann (points milieux)</span><span style="color:#54cbb2">● Aire exacte</span>';
   }
  else if(labType==="trig"){
   const theta=v*Math.PI/180,c=Math.cos(theta),sn=Math.sin(theta),cx=X(0),cy=Y(0),r=Math.abs(X(1)-X(0));
   ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.strokeStyle="#526a8a";ctx.lineWidth=2;ctx.stroke();
   ctx.beginPath();ctx.arc(cx,cy,r*.28,0,-theta,true);ctx.strokeStyle="#f0c77c";ctx.lineWidth=2;ctx.stroke();
   segment(0,0,c,0,"#80b8f4",2,[4,4]);segment(c,0,c,sn,"#e0b86d",2,[4,4]);segment(0,0,c,sn,"#54cbb2",3);point(c,sn,"#54cbb2",6);
   ctx.fillStyle="#e8edf5";ctx.font="bold 13px system-ui";ctx.textAlign="left";ctx.fillText("θ = "+v+"°",m.l+10,m.t+18);ctx.font="12px system-ui";ctx.fillText("cos θ = "+c.toFixed(4),m.l+10,m.t+39);ctx.fillText("sin θ = "+sn.toFixed(4),m.l+10,m.t+57);
   const exact={0:["1","0"],30:["√3/2","1/2"],45:["√2/2","√2/2"],60:["1/2","√3/2"],90:["0","1"],120:["−1/2","√3/2"],135:["−√2/2","√2/2"],150:["−√3/2","1/2"],180:["−1","0"],210:["−√3/2","−1/2"],225:["−√2/2","−√2/2"],240:["−1/2","−√3/2"],270:["0","−1"],300:["1/2","−√3/2"],315:["√2/2","−√2/2"],330:["√3/2","−1/2"],360:["1","0"]};
   const angle=((v%360)+360)%360,exactValues=exact[angle];$("#labTrigValues").innerHTML=exactValues?'<b>Valeurs exactes :</b> cos θ = '+exactValues[0]+' · sin θ = '+exactValues[1]:'<b>Valeurs remarquables :</b> angle non remarquable — valeurs décimales affichées.';
   $("#labLegend").innerHTML='<span style="color:#54cbb2">● Point mobile</span><span style="color:#80b8f4">┆ cos θ : abscisse</span><span style="color:#e0b86d">┆ sin θ : ordonnée</span>';
  }
  else if(labType==="taylor"){const n=Math.round(v);curve(Math.exp,xmin,xmax,"#80b8f4",3);curve(x=>{let s=0,p=1,f=1;for(let k=0;k<=n;k++){if(k){p*=x;f*=k}s+=p/f}return s},xmin,xmax,"#e0b86d",2.5)}
  else if(labType==="injectivity"){curve(x=>x*x,-2.5,2.5,"#80b8f4",3);point(v,v*v,"#80b8f4");point(-v,v*v,"#e0b86d")}
  else if(labType==="limit"){
    const delta=v,a=1,L=1,xm=a-delta,xp=a+delta,ym=xm*xm,yp=xp*xp,epsilon=Math.max(Math.abs(ym-L),Math.abs(yp-L));
    ctx.fillStyle="rgba(84,203,178,.08)";ctx.fillRect(X(xm),m.t,X(xp)-X(xm),ph);
    ctx.fillStyle="rgba(224,184,109,.10)";ctx.fillRect(m.l,Y(L+epsilon),pw,Math.max(1,Y(L-epsilon)-Y(L+epsilon)));
    curve(x=>x*x,-1.25,3.05,"#80b8f4",3.5);
    segment(-1.25,L,3.05,L,"#e0b86d",2,[7,5]);
    segment(a,0,a,4.5,"#8b9bb1",1.2,[3,5]);
    segment(xm,0,xm,ym,"#54cbb2",1.8,[4,4]);segment(xp,0,xp,yp,"#54cbb2",1.8,[4,4]);
    segment(xm,ym,a,L,"#e0b86d",2,[4,4]);segment(xp,yp,a,L,"#e0b86d",2,[4,4]);
    point(a,L,"#e0b86d",6);point(xm,ym,"#54cbb2",5);point(xp,yp,"#54cbb2",5);
    ctx.fillStyle="#e8edf5";ctx.font="bold 13px system-ui";ctx.textAlign="left";ctx.fillText("A = (1,1)",X(a)+9,Y(L)-12);
    ctx.fillStyle="#54cbb2";ctx.fillText("P₋",X(xm)-22,Y(ym)-10);ctx.fillText("P₊",X(xp)+8,Y(yp)-10);
    ctx.fillStyle="#e0b86d";ctx.fillText("L = 1",X(2.35),Y(L)-9);
    ctx.fillStyle="#c8d5e8";ctx.font="12px system-ui";ctx.fillText("δ = "+delta.toFixed(2).replace(".",","),m.l+12,m.t+18);
    ctx.fillText("ε ≈ "+epsilon.toFixed(2).replace(".",","),m.l+12,m.t+36);
    $("#labLegend").innerHTML='<span style="color:#80b8f4">● Graphe f(x)=x²</span><span style="color:#54cbb2">● Images de 1−δ et 1+δ</span><span style="color:#e0b86d">┄ Valeur limite L=1</span>';
    $("#labValue").textContent=delta.toFixed(2).replace(".",",");
  }
  else if(labType==="continuity"){
    const a=1,L=1,x=v,y=x*x,dx=x-a,dy=y-L,epsilon=Math.max(.15,Math.abs(dy)+.25);
    ctx.fillStyle="rgba(224,184,109,.10)";ctx.fillRect(m.l,Y(L+epsilon),pw,Math.max(1,Y(L-epsilon)-Y(L+epsilon)));
    ctx.fillStyle="rgba(84,203,178,.08)";ctx.fillRect(Math.min(X(a),X(x)),m.t,Math.abs(X(x)-X(a)),ph);
    curve(t=>t*t,-1.25,3.05,"#80b8f4",3.5);
    segment(a,0,a,4.5,"#8b9bb1",1,[3,5]);segment(-1.25,L,3.05,L,"#e0b86d",1.6,[7,5]);
    segment(x,y,x,L,"#e0b86d",2,[4,4]);segment(x,L,a,L,"#54cbb2",2,[4,4]);segment(a,L,x,y,"#e0b86d",1.5,[3,4]);
    point(a,L,"#e0b86d",6);point(x,y,"#54cbb2",6);
    ctx.fillStyle="#e0b86d";ctx.font="bold 13px system-ui";ctx.textAlign="left";ctx.fillText("A=(1,1)",X(a)+9,Y(L)-12);
    ctx.fillStyle="#54cbb2";ctx.fillText("P=(x,x²)",X(x)+8,Y(y)-10);
    ctx.fillStyle="#c8d5e8";ctx.font="12px system-ui";ctx.fillText("Δx = "+dx.toFixed(2).replace(".",","),m.l+12,m.t+18);
    ctx.fillText("Δy = "+dy.toFixed(2).replace(".",","),m.l+12,m.t+36);
    ctx.fillText("ε choisi ≈ "+epsilon.toFixed(2).replace(".",","),m.l+12,m.t+54);
    $("#labLegend").innerHTML='<span style="color:#80b8f4">● Graphe f(x)=x²</span><span style="color:#e0b86d">● A : point de référence</span><span style="color:#54cbb2">● P : point mobile</span><span style="color:#e0b86d">┄ Écart vertical Δy</span>';
    $("#labValue").textContent=x.toFixed(2).replace(".",",");
  }
  else if(labType==="fourier"){curve(x=>{let s=0;for(let k=1;k<=Math.round(v);k+=2)s+=Math.sin(k*x)/k;return 4/Math.PI*s},-Math.PI,Math.PI,"#80b8f4",3)}
  else if(labType==="eigen"){curve(x=>.55*x,xmin,xmax,"#80b8f4",2);curve(x=>v*x,xmin,xmax,"#e0b86d",3)}
  else if(labType==="determinant"){
    const t=v*Math.PI/180,u=[2,0],len=Number($("#labExtraSlider")?.value||2),w=[len*Math.cos(t),len*Math.sin(t)],cross=u[0]*w[1]-u[1]*w[0],area=Math.abs(cross);
    ctx.beginPath();ctx.moveTo(X(0),Y(0));ctx.lineTo(X(u[0]),Y(u[1]));ctx.lineTo(X(u[0]+w[0]),Y(u[1]+w[1]));ctx.lineTo(X(w[0]),Y(w[1]));ctx.closePath();ctx.fillStyle="rgba(84,203,178,.20)";ctx.fill();ctx.strokeStyle="#54cbb2";ctx.lineWidth=2;ctx.stroke();
    segment(0,0,u[0],u[1],"#80b8f4",4);segment(0,0,w[0],w[1],"#e0b86d",4);segment(u[0],u[1],u[0]+w[0],u[1]+w[1],"#80b8f466",1.5,[5,4]);segment(w[0],w[1],u[0]+w[0],u[1]+w[1],"#e0b86d66",1.5,[5,4]);
    point(u[0],u[1],"#80b8f4",5);point(w[0],w[1],"#e0b86d",5);
    ctx.fillStyle="#e8edf5";ctx.font="bold 13px system-ui";ctx.textAlign="left";ctx.fillText("det(u,v) = "+cross.toFixed(3).replace(".",","),m.l+10,m.t+18);ctx.fillText("Aire = |det| = "+area.toFixed(3).replace(".",","),m.l+10,m.t+38);
    ctx.fillStyle="#80b8f4";ctx.fillText("u",X(u[0])+7,Y(u[1])-8);ctx.fillStyle="#e0b86d";ctx.fillText("v",X(w[0])+7,Y(w[1])-8);
    $("#labExtraValue").textContent=len.toLocaleString("fr-FR",{maximumFractionDigits:1});
    $("#labLegend").innerHTML='<span style="color:#80b8f4">→ u : premier vecteur</span><span style="color:#e0b86d">→ v : second vecteur</span><span style="color:#54cbb2">▧ Parallélogramme : aire |det(u,v)|</span>';
   }
   else if(labType==="schmidt"){
    const theta=v*Math.PI/180,base=-Math.PI/7,v1=[2.05*Math.cos(base),2.05*Math.sin(base)],v2=[2.55*Math.cos(base+theta),2.55*Math.sin(base+theta)];
    const coeff=(v2[0]*v1[0]+v2[1]*v1[1])/(v1[0]*v1[0]+v1[1]*v1[1]),p=[coeff*v1[0],coeff*v1[1]],w=[v2[0]-p[0],v2[1]-p[1]];
    const vec=(x1,y1,x2,y2,color,width=3)=>{segment(x1,y1,x2,y2,color,width);const ex=X(x2),ey=Y(y2),ang=Math.atan2(Y(y2)-Y(y1),X(x2)-X(x1)),len=10;ctx.beginPath();ctx.moveTo(ex,ey);ctx.lineTo(ex-len*Math.cos(ang-.4),ey-len*Math.sin(ang-.4));ctx.lineTo(ex-len*Math.cos(ang+.4),ey-len*Math.sin(ang+.4));ctx.closePath();ctx.fillStyle=color;ctx.fill()};
    vec(0,0,v1[0],v1[1],"#80b8f4",4);vec(0,0,v2[0],v2[1],"#f2a45b",3.5);vec(0,0,p[0],p[1],"#e0b86d",4);vec(p[0],p[1],v2[0],v2[1],"#54c99b",4);
    point(0,0,"#e8edf5",4);point(v1[0],v1[1],"#80b8f4",5);point(v2[0],v2[1],"#f2a45b",5);
    ctx.font="bold 13px system-ui";ctx.textAlign="left";ctx.fillStyle="#80b8f4";ctx.fillText("v₁",X(v1[0])+7,Y(v1[1])-7);ctx.fillStyle="#f2a45b";ctx.fillText("v₂",X(v2[0])+7,Y(v2[1])-7);ctx.fillStyle="#e0b86d";ctx.fillText("projection",X(p[0])+7,Y(p[1])-8);ctx.fillStyle="#54c99b";ctx.fillText("w₂",X((p[0]+v2[0])/2)+7,Y((p[1]+v2[1])/2)-8);
    ctx.fillStyle="#e8edf5";ctx.font="12px system-ui";ctx.fillText("v₂ = projᵥ₁(v₂) + w₂",m.l+8,m.t+16);ctx.fillText("⟨v₁,w₂⟩ = 0",m.l+8,m.t+32);
    $("#labLegend").innerHTML='<span style="color:#80b8f4">→ v₁ : direction initiale</span><span style="color:#f2a45b">→ v₂ : vecteur à décomposer</span><span style="color:#e0b86d">→ projection parallèle</span><span style="color:#54c99b">→ w₂ : composante orthogonale</span>';
   }
  else curve(x=>x,xmin,xmax,"#80b8f4",3);
  if(!["integral","schmidt","trig","determinant","limit","continuity"].includes(labType))$("#labLegend").innerHTML='<span style="color:#80b8f4">● Courbe / direction de référence</span><span style="color:#e0b86d">● Élément mobile</span>';
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
 $("#exportData").onclick=()=>{
  const payload={app:"Maths2.0",version:1,exportedAt:new Date().toISOString(),state};
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download="maths2-sauvegarde-"+new Date().toISOString().slice(0,10)+".json";
  document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  toast("Sauvegarde téléchargée.");
 };
 $("#importData").onchange=async e=>{
  const file=e.target.files?.[0];if(!file)return;
  try{
   const payload=JSON.parse(await file.text()),incoming=payload.state||payload;
   if(!incoming||typeof incoming!=="object"||Array.isArray(incoming)||!Array.isArray(incoming.solved)||!incoming.attempts||typeof incoming.attempts!=="object"||!incoming.reviews||typeof incoming.reviews!=="object")throw new Error("Format de sauvegarde non reconnu.");
   if(!confirm("Importer cette sauvegarde et remplacer la progression actuellement enregistrée sur cet appareil ?"))return;
   state={...blank(),...incoming,drafts:incoming.drafts&&typeof incoming.drafts==="object"?incoming.drafts:{}};
   localStorage.setItem(KEY,JSON.stringify(state));renderDashboard();renderPath();renderCourses();renderExercises();renderProgress();go("home");
   toast("Progression restaurée.");
  }catch(err){toast("Import impossible : "+err.message)}
  finally{e.target.value=""}
 };
 $("#courseSearch").addEventListener("input",()=>{activeTopic=null;renderCourses()});
 $$("#courseThemes [data-course-category]").forEach(b=>b.addEventListener("click",()=>{activeCourseCategory=b.dataset.courseCategory;activeTopic=null;renderCourses()}));
 $("#courseBackThemes").onclick=()=>{activeCourseCategory=null;activeTopic=null;$("#courseSearch").value="";renderCourses()};
 $("#exerciseBackThemes").onclick=()=>{activeExerciseCategory=null;activeExerciseTopic=null;activeExercise=null;renderExercises()};
  // Les catégories sont gérées par délégation globale pour rester actives après les rerendus.
 $("#exerciseTopicBack").onclick=()=>{activeExerciseTopic=null;activeExercise=null;renderExercises()};
 ["exerciseSearch","exerciseDifficulty"].forEach(id=>$("#"+id).addEventListener("input",renderExercises));
 $("#tutorModes").onclick=e=>{const b=e.target.closest("[data-mode]");if(!b)return;activeMode=b.dataset.mode;$$(".mode").forEach(x=>x.classList.toggle("active",x===b));$("#tutorStatus").textContent="Mode sélectionné : "+b.textContent};
 $("#sendChat").onclick=sendChat;$("#chatInput").addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendChat()}});
 $("#clearChat").onclick=()=>{chatHistory=[];$("#chat").innerHTML='<div class="chat-welcome"><span>✳</span><h3>Nouvelle discussion</h3><p>Sur quoi souhaites-tu travailler ?</p></div>'};
 $("#tutorImage").onchange=async e=>{const f=e.target.files?.[0];if(!f)return;if(f.size>8*1024*1024){toast("Image limitée à 8 Mo.");return}try{chatImage=await resizeImage(f);$("#uploadName").textContent=f.name+" · prête"}catch{toast("Lecture de l'image impossible.")}};
 const labSelect=$("#labType");if(labSelect){const seen=new Set();[...labSelect.options].forEach(option=>{if(seen.has(option.value))option.remove();else seen.add(option.value)});labType=labSelect.value||"derivative";}labSelect.onchange=()=>{labType=labSelect.value;labSetup()};$("#labSlider").oninput=()=>{if(labType==="surface3d")labRotationY=Number($("#labSlider").value)*Math.PI/180;drawLab()};$("#surfaceFunction").onchange=()=>{updateSurfaceMeta();typeset($("#labFormula"));renderLabGuide();drawLab()};$("#labAnimate").onclick=toggleComplexAnimation;
 const labCanvas=$("#labCanvas");labCanvas.addEventListener("pointerdown",e=>{if(labType!=="surface3d"&&labType!=="complex3d")return;labDragging={x:e.clientX,y:e.clientY};labCanvas.setPointerCapture(e.pointerId)});labCanvas.addEventListener("pointermove",e=>{if(!labDragging)return;const dx=e.clientX-labDragging.x,dy=e.clientY-labDragging.y;labDragging={x:e.clientX,y:e.clientY};labRotationY+=dx*.009;labRotationX=Math.max(.15,Math.min(1.45,labRotationX+dy*.007));if(labType==="surface3d")$("#labSlider").value=Math.round(labRotationY*180/Math.PI);drawLab()});["pointerup","pointercancel","lostpointercapture"].forEach(ev=>labCanvas.addEventListener(ev,()=>{labDragging=null}));
 window.addEventListener("resize",()=>{if($("#view-visuals")?.classList.contains("active"))drawLab()});
 if(state.lastDay!==new Date().toDateString()){const yesterday=new Date(Date.now()-86400000).toDateString();state.streak=state.lastDay===yesterday?state.streak+1:1;state.lastDay=new Date().toDateString();save()}
 renderDashboard();renderPath();renderCourses();renderExercises();renderProgress();typeset(document.body);
 if("serviceWorker" in navigator){navigator.serviceWorker.register("./sw.js",{updateViaCache:"none"}).then(reg=>reg.update()).catch(()=>{});}
}
// Délégation globale pour les cartes Analyse / Algèbre.
document.addEventListener("click",event=>{
 const card=event.target.closest("#exerciseThemes [data-ex-category]");
 if(!card)return;
 activeExerciseCategory=card.dataset.exCategory;
 activeExerciseTopic=null;
 activeExercise=null;
 renderExercises();
});
document.addEventListener("DOMContentLoaded",init);
})();
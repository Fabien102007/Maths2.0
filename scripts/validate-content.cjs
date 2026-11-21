const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");

const root = path.resolve(__dirname, "..");
const context = vm.createContext({ window: {}, console });
for (const file of ["data.js", "curriculum.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
}

const topics = context.window.TOPICS || [];
const exercises = context.window.EXERCISES || [];
const flashcards = context.window.FLASHCARDS || [];
const unique = (items, label) => {
  const values = items.map(x => x.id);
  assert.equal(new Set(values).size, values.length, label + " : identifiants dupliqués");
};

assert.ok(topics.length >= 26, "Le catalogue doit contenir au moins 26 notions.");
assert.ok(exercises.length >= 117, "Le catalogue doit contenir au moins 117 exercices.");
assert.ok(flashcards.length >= 64, "Le catalogue doit contenir au moins 64 flashcards.");
unique(topics, "Notions");
unique(exercises, "Exercices");

const topicIds = new Set(topics.map(t => t.id));
for (const t of topics) {
  assert.ok(t.title && t.summary, "Notion sans titre ou résumé : " + t.id);
  assert.ok(t.definitions?.length, "Définitions manquantes : " + t.id);
  assert.ok(t.properties?.length, "Propriétés manquantes : " + t.id);
  assert.ok(t.example, "Exemple manquant : " + t.id);
  assert.ok(t.methods?.length, "Méthodes manquantes : " + t.id);
  assert.ok(t.commonErrors?.length, "Erreurs classiques manquantes : " + t.id);
  assert.ok(t.theorems?.length, "Théorèmes manquants : " + t.id);
  for (const prerequisite of t.prerequisites || []) {
    assert.ok(topicIds.has(prerequisite), "Prérequis inconnu " + prerequisite + " pour " + t.id);
  }
  for (const theorem of t.theorems || []) {
    assert.ok(theorem.title && theorem.statement && theorem.proof, "Théorème incomplet : " + t.id);
  }
}

for (const t of topics) {
  assert.ok(exercises.some(e => e.topic === t.id), "Aucun exercice associé à la notion : " + t.id);
}
assert.ok(exercises.filter(e => e.level === "L2").length >= 5, "Le parcours L2 doit proposer au moins cinq exercices.");
assert.ok(topics.some(t => t.level === "Prépa") && exercises.some(e => topics.find(t => t.id === e.topic)?.level === "Prépa"), "Le parcours approfondissement doit contenir cours et exercices.");

for (const e of exercises) {
  assert.ok(topicIds.has(e.topic), "Exercice sans notion associée : " + e.id);
  assert.ok(e.title && e.question, "Énoncé incomplet : " + e.id);
  assert.ok(e.answer && e.answer.trim(), "Correction manquante : " + e.id);
  assert.ok(e.solutionSteps?.length, "Correction non découpée : " + e.id);
  assert.ok(e.hints?.length >= 2, "Moins de deux indices : " + e.id);
}

const htmlFiles = ["app.html", "index.html", "landing.html", "privacy.html", "legal.html"];
for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const ref = match[1];
    if (!ref || ref.startsWith("#") || /^(?:https?:|data:|mailto:|tel:|javascript:)/i.test(ref)) continue;
    const local = decodeURIComponent(ref.split("?")[0].split("#")[0]);
    if (!local) continue;
    assert.ok(fs.existsSync(path.join(root, local)), file + " référence une ressource absente : " + ref);
  }
}

const appScript = fs.readFileSync(path.join(root, "app.js"), "utf8");
assert.ok(appScript.includes("async function sendChat(){"), "Le tuteur doit conserver son gestionnaire de requête asynchrone.");
assert.ok(appScript.includes("function openTutorWithContext(message){"), "Les cours et exercices doivent pouvoir ouvrir le tuteur contextuel.");
assert.ok(appScript.includes('$$("#tutorModes .mode").forEach'), "Le changement de mode du tuteur doit cibler tous les boutons.");
assert.ok(appScript.includes('labType==="trig"?[-1,0,1]'), "Le cercle trigonométrique doit conserver des graduations dans le cadre.");
assert.ok(appScript.includes('const base=[.65,.38],image=[base[0]*v,base[1]*v]'), "La visualisation des valeurs propres doit montrer Av = λv.");
assert.ok(appScript.includes('"fourier","eigen"].includes(labType)'), "Les légendes propres des visualisations doivent être préservées.");
assert.ok(appScript.includes("rating.sum/rating.count"), "Une session ne doit pas multiplier l'intervalle de révision pour chaque flashcard.");

const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.webmanifest"), "utf8"));
assert.equal(manifest.start_url, "./app.html", "La PWA doit ouvrir directement l'espace de travail.");
assert.ok(fs.existsSync(path.join(root, manifest.start_url.replace(/^\.\//, ""))), "URL de démarrage PWA absente.");

for (const video of ["euler_helix.mp4", "derivative_tangent.mp4", "fourier_square.mp4", "riemann_integral.mp4"]) {
  assert.ok(fs.existsSync(path.join(root, "assets", "manim", video)), "Vidéo Manim manquante : " + video);
}

console.log("Maths2.0 quality gate: OK");
console.log(topics.length + " notions · " + exercises.length + " exercices · " + flashcards.length + " flashcards");
console.log("Cours structurés, prérequis, corrections, ressources locales et manifeste PWA vérifiés.");

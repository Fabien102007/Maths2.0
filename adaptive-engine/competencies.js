(function (root) {
  "use strict";

  const competencies = [
    {
      id: "vector-space-prerequisites",
      title: "Mobiliser les notions d'espace vectoriel",
      description: "Reconnaître un espace vectoriel, un sous-espace et les combinaisons linéaires nécessaires au chapitre.",
      prerequisites: [],
      level: "foundation",
      skills: ["subspace-test", "linear-combination"]
    },
    {
      id: "linear-map-definition",
      title: "Comprendre la définition d'une application linéaire",
      description: "Identifier les espaces de départ et d'arrivée, et interpréter la conservation des combinaisons linéaires.",
      prerequisites: ["vector-space-prerequisites"],
      level: "core",
      skills: ["domain-codomain", "linearity-definition"]
    },
    {
      id: "linearity-verification",
      title: "Vérifier la linéarité",
      description: "Démontrer ou réfuter l'additivité et l'homogénéité, ou la conservation de toute combinaison linéaire.",
      prerequisites: ["linear-map-definition"],
      level: "core",
      skills: ["additivity", "homogeneity", "counterexample"]
    },
    {
      id: "kernel",
      title: "Déterminer et interpréter le noyau",
      description: "Résoudre f(x)=0, décrire le noyau et justifier qu'il s'agit d'un sous-espace vectoriel.",
      prerequisites: ["linear-map-definition", "linearity-verification"],
      level: "core",
      skills: ["solve-kernel-equation", "kernel-subspace"]
    },
    {
      id: "image",
      title: "Déterminer et interpréter l'image",
      description: "Décrire les valeurs atteintes, construire une famille génératrice et déterminer une base de l'image.",
      prerequisites: ["linear-map-definition", "vector-space-prerequisites"],
      level: "core",
      skills: ["describe-image", "image-generators", "image-basis"]
    },
    {
      id: "injectivity",
      title: "Caractériser l'injectivité",
      description: "Utiliser l'équivalence entre injectivité et noyau réduit au vecteur nul, dans le cadre approprié.",
      prerequisites: ["kernel"],
      level: "core",
      skills: ["injectivity-kernel-criterion", "injectivity-proof"]
    },
    {
      id: "surjectivity",
      title: "Caractériser la surjectivité",
      description: "Montrer que tout élément de l'espace d'arrivée possède un antécédent, ou exploiter l'image.",
      prerequisites: ["image"],
      level: "core",
      skills: ["surjectivity-definition", "surjectivity-proof"]
    },
    {
      id: "rank-nullity",
      title: "Utiliser le théorème du rang",
      description: "Relier dimension du noyau, dimension de l'image et dimension de l'espace de départ en dimension finie.",
      prerequisites: ["kernel", "image"],
      level: "core",
      skills: ["rank-nullity-hypotheses", "rank-nullity-calculation"]
    },
    {
      id: "isomorphism",
      title: "Reconnaître et démontrer un isomorphisme",
      description: "Relier linéarité, injectivité, surjectivité et bijectivité ; exploiter les critères de dimension finie.",
      prerequisites: ["injectivity", "surjectivity", "rank-nullity"],
      level: "advanced",
      skills: ["isomorphism-definition", "isomorphism-proof"]
    },
    {
      id: "linear-map-proof",
      title: "Construire une démonstration autonome",
      description: "Choisir une caractérisation pertinente, expliciter les hypothèses, enchaîner les implications et conclure.",
      prerequisites: ["linearity-verification", "kernel", "image", "injectivity", "surjectivity"],
      level: "advanced",
      skills: ["proof-structure", "theorem-selection", "hypothesis-checking"]
    }
  ];

  const byId = Object.fromEntries(competencies.map(item => [item.id, item]));

  function getCompetencies() {
    return competencies.map(item => ({
      ...item,
      prerequisites: [...item.prerequisites],
      skills: [...item.skills]
    }));
  }

  function getCompetency(id) {
    const item = byId[id];
    return item ? { ...item, prerequisites: [...item.prerequisites], skills: [...item.skills] } : null;
  }

  const api = Object.freeze({ version: "0.1.0", getCompetencies, getCompetency });
  root.MathEvoCompetencies = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);

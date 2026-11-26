(function (root) {
  "use strict";

  const VALID_LEVELS = ["unassessed", "emerging", "developing", "proficient", "secure"];

  function createProfile(options) {
    const input = options || {};
    return {
      schemaVersion: 1,
      curriculumVersion: input.curriculumVersion || "linear-maps-l1-v0.1",
      createdAt: input.createdAt || new Date().toISOString(),
      attempts: [],
      reviews: {},
      metadata: { locale: "fr-FR" }
    };
  }

  function validateAttempt(attempt, competencies) {
    if (!attempt || typeof attempt !== "object") throw new TypeError("Une tentative structurée est requise.");
    if (!competencies.some(item => item.id === attempt.competencyId)) {
      throw new Error("Compétence inconnue : " + String(attempt.competencyId));
    }
    if (typeof attempt.itemId !== "string" || !attempt.itemId.trim()) throw new TypeError("itemId doit être une chaîne non vide.");
    if (typeof attempt.correct !== "boolean") throw new TypeError("correct doit être un booléen.");
    if (typeof attempt.independent !== "boolean") throw new TypeError("independent doit être un booléen.");
    const hintLevel = attempt.hintLevel == null ? 0 : attempt.hintLevel;
    if (!Number.isInteger(hintLevel) || hintLevel < 0) throw new TypeError("hintLevel doit être un entier positif ou nul.");
    if (attempt.transfer != null && typeof attempt.transfer !== "boolean") throw new TypeError("transfer doit être un booléen.");
    if (attempt.errorTags != null && (!Array.isArray(attempt.errorTags) || !attempt.errorTags.every(tag => typeof tag === "string"))) {
      throw new TypeError("errorTags doit être un tableau de chaînes.");
    }
  }

  function recordAttempt(profile, attempt, competencies) {
    if (!profile || !Array.isArray(profile.attempts)) throw new TypeError("Profil MathEvo invalide.");
    validateAttempt(attempt, competencies);
    const normalized = {
      competencyId: attempt.competencyId,
      itemId: attempt.itemId.trim(),
      correct: attempt.correct,
      independent: attempt.independent && (attempt.hintLevel == null || attempt.hintLevel === 0),
      hintLevel: attempt.hintLevel == null ? 0 : attempt.hintLevel,
      transfer: attempt.transfer === true,
      errorTags: [...new Set(attempt.errorTags || [])],
      timestamp: attempt.timestamp || new Date().toISOString()
    };
    if (Number.isNaN(Date.parse(normalized.timestamp))) throw new TypeError("timestamp doit être une date ISO valide.");
    return {
      ...profile,
      attempts: [...profile.attempts, normalized]
    };
  }

  function getEvidence(profile, competencyId) {
    const attempts = profile.attempts.filter(item => item.competencyId === competencyId).slice().sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));
    const correct = attempts.filter(item => item.correct);
    const independentCorrect = correct.filter(item => item.independent);
    const transferCorrect = correct.filter(item => item.transfer);
    const distinctItems = new Set(correct.map(item => item.itemId));
    const distinctDays = new Set(correct.map(item => new Date(item.timestamp).toISOString().slice(0, 10)));
    return {
      attempts,
      total: attempts.length,
      correct: correct.length,
      independentCorrect: independentCorrect.length,
      transferCorrect: transferCorrect.length,
      distinctItems: distinctItems.size,
      distinctDays: distinctDays.size,
      latest: attempts.length ? attempts[attempts.length - 1] : null,
      errorTags: [...new Set(attempts.flatMap(item => item.errorTags || []))]
    };
  }

  function estimateMastery(profile, competencyId) {
    const evidence = getEvidence(profile, competencyId);
    let level = "unassessed";
    if (evidence.total) {
      const rate = evidence.correct / evidence.total;
      if (rate < 0.5 || (evidence.latest && !evidence.latest.correct && evidence.latest.independent)) {
        level = "emerging";
      } else if (evidence.correct >= 2 && evidence.independentCorrect >= 1) {
        level = "proficient";
      } else {
        level = "developing";
      }
      const secure = evidence.correct >= 3 &&
        evidence.independentCorrect >= 2 &&
        evidence.transferCorrect >= 1 &&
        evidence.distinctItems >= 2 &&
        evidence.distinctDays >= 2 &&
        evidence.latest && evidence.latest.correct;
      if (secure) level = "secure";
    }
    return {
      competencyId,
      level,
      evidence,
      confidence: evidence.total === 0 ? "none" :
        evidence.total < 3 ? "low" :
        evidence.total < 5 ? "moderate" : "higher"
    };
  }

  function getPrerequisiteBlockers(profile, competency, competencies) {
    const byId = Object.fromEntries(competencies.map(item => [item.id, item]));
    return competency.prerequisites
      .map(id => byId[id])
      .filter(Boolean)
      .map(item => estimateMastery(profile, item.id))
      .filter(result => !["proficient", "secure"].includes(result.level));
  }

  function recommendNext(profile, competencies, options) {
    const settings = options || {};
    const now = settings.now ? new Date(settings.now).getTime() : Date.now();
    const candidates = competencies
      .map(competency => ({
        competency,
        mastery: estimateMastery(profile, competency.id),
        blockers: getPrerequisiteBlockers(profile, competency, competencies),
        review: profile.reviews && profile.reviews[competency.id]
      }))
      .filter(item => item.mastery.level !== "secure");

    if (!candidates.length) {
      return {
        type: "consolidation",
        competencyId: null,
        reason: "Toutes les compétences du parcours sont actuellement sécurisées. Proposer un problème de synthèse inédit."
      };
    }

    const due = candidates
      .filter(item => item.review && Date.parse(item.review.dueAt) <= now)
      .sort((a, b) => Date.parse(a.review.dueAt) - Date.parse(b.review.dueAt));
    if (due.length) {
      const item = due[0];
      return {
        type: "spaced-review",
        competencyId: item.competency.id,
        reason: "Cette compétence doit être réactivée : sa révision est arrivée à échéance.",
        mastery: item.mastery
      };
    }

    const eligible = candidates.filter(item => item.blockers.length === 0);
    const pool = eligible.length ? eligible : candidates.filter(item => item.mastery.level !== "secure");
    pool.sort((a, b) => {
      const rank = { emerging: 0, unassessed: 1, developing: 2, proficient: 3, secure: 4 };
      return rank[a.mastery.level] - rank[b.mastery.level] ||
        a.blockers.length - b.blockers.length ||
        a.competency.id.localeCompare(b.competency.id);
    });
    const chosen = pool[0];
    if (chosen.blockers.length) {
      const blocker = chosen.blockers.sort((a, b) => {
        const rank = { emerging: 0, unassessed: 1, developing: 2, proficient: 3, secure: 4 };
        return rank[a.level] - rank[b.level];
      })[0];
      return {
        type: "prerequisite-repair",
        competencyId: blocker.competencyId,
        targetCompetencyId: chosen.competency.id,
        reason: "La compétence cible dépend d'un prérequis qui n'est pas encore suffisamment maîtrisé.",
        mastery: blocker
      };
    }
    return {
      type: chosen.mastery.level === "unassessed" ? "diagnostic" : "practice",
      competencyId: chosen.competency.id,
      reason: chosen.mastery.level === "unassessed"
        ? "Il manque des preuves pour estimer cette compétence : commencer par un diagnostic court."
        : "La maîtrise n'est pas encore suffisamment stable : proposer un exercice ciblé, puis vérifier le raisonnement.",
      mastery: chosen.mastery
    };
  }

  function setReviewDue(profile, competencyId, dueAt, competencies) {
    if (!competencies.some(item => item.id === competencyId)) throw new Error("Compétence inconnue : " + competencyId);
    if (Number.isNaN(Date.parse(dueAt))) throw new TypeError("dueAt doit être une date valide.");
    return {
      ...profile,
      reviews: { ...(profile.reviews || {}), [competencyId]: { dueAt: new Date(dueAt).toISOString() } }
    };
  }

  function getLearnerOverview(profile, competencies) {
    return competencies.map(competency => estimateMastery(profile, competency.id));
  }

  const api = Object.freeze({
    version: "0.1.0",
    VALID_LEVELS,
    createProfile,
    recordAttempt,
    getEvidence,
    estimateMastery,
    getPrerequisiteBlockers,
    recommendNext,
    setReviewDue,
    getLearnerOverview
  });
  root.MathEvoAdaptiveEngine = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);

"use strict";

const assert = require("node:assert/strict");
const competenciesApi = require("./competencies.js");
const engine = require("./engine.js");
const competencies = competenciesApi.getCompetencies();

function attempt(overrides) {
  return {
    competencyId: "linear-map-definition",
    itemId: "item-a",
    correct: true,
    independent: true,
    hintLevel: 0,
    transfer: false,
    timestamp: "2026-11-20T10:00:00.000Z",
    ...overrides
  };
}

let profile = engine.createProfile({ createdAt: "2026-11-20T09:00:00.000Z" });
assert.equal(engine.estimateMastery(profile, "linear-map-definition").level, "unassessed");

profile = engine.recordAttempt(profile, attempt(), competencies);
assert.notEqual(engine.estimateMastery(profile, "linear-map-definition").level, "secure",
  "A single correct answer must never create secure mastery.");

profile = engine.recordAttempt(profile, attempt({ itemId: "item-a", timestamp: "2026-11-21T10:00:00.000Z" }), competencies);
assert.notEqual(engine.estimateMastery(profile, "linear-map-definition").level, "secure",
  "Repeating the same item must not create secure mastery.");

profile = engine.recordAttempt(profile, attempt({
  itemId: "item-b",
  transfer: true,
  timestamp: "2026-11-22T10:00:00.000Z"
}), competencies);
assert.equal(engine.estimateMastery(profile, "linear-map-definition").level, "secure");

profile = engine.recordAttempt(profile, attempt({
  itemId: "item-c",
  correct: false,
  independent: true,
  timestamp: "2026-11-23T10:00:00.000Z"
}), competencies);
assert.notEqual(engine.estimateMastery(profile, "linear-map-definition").level, "secure",
  "A recent independent failure must remove the secure label.");

const fresh = engine.createProfile({ createdAt: "2026-11-20T09:00:00.000Z" });
const recommendation = engine.recommendNext(fresh, competencies, { now: "2026-11-20T12:00:00.000Z" });
assert.equal(recommendation.type, "diagnostic");
assert.equal(recommendation.competencyId, "vector-space-prerequisites");

assert.throws(() => engine.recordAttempt(fresh, attempt({ competencyId: "unknown" }), competencies));
assert.throws(() => engine.recordAttempt(fresh, attempt({ correct: "yes" }), competencies));

console.log("MathEvo Adaptive Engine v0.1: all tests passed.");

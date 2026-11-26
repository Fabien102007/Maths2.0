# MathEvo Adaptive Engine — v0.1

## Mission

Build a pedagogical engine independent from the current MathEvo interface. Its job is to maintain an evidence-based model of a learner's mathematical competencies and select the next useful learning activity. It is not a chatbot and it must not infer mastery from a single correct answer.

## Pilot scope

- Audience: L1 mathematics.
- Domain: linear algebra.
- First learning unit: linear maps (applications linéaires).
- Initial competency graph: vector-space prerequisites, definition and verification of linearity, kernel, image, injectivity, surjectivity, rank-nullity, isomorphisms, proof construction.

The exact syllabus must be checked against the target university before the content bank is considered complete.

## Product principles

1. **Competency-level tracking:** track small, observable skills, not only chapter completion.
2. **Evidence before mastery:** keep attempts, independence, hints, transfer performance and dates.
3. **No false certainty:** distinguish estimated mastery from confidence and expose "insufficient evidence".
4. **Prerequisite-aware sequencing:** do not prescribe an advanced task when a required prerequisite is fragile.
5. **Retrieval and transfer:** revisit skills after a delay and test them in unfamiliar contexts.
6. **Socratic support:** hints should be progressive; reveal a full solution only after an effort or an explicit request.
7. **Human-quality mathematics:** mathematical content, rubrics and model-generated feedback must be checked against validated answer keys and explicit criteria.
8. **Privacy by design:** v0.1 uses no student name or account identifier. The host application decides where and how profiles are stored.

## v0.1 architecture

- `competencies.js`: static, versioned competency graph.
- `engine.js`: pure functions to create a learner profile, record evidence, estimate mastery and recommend a next competency.
- Future modules: diagnostic item bank, deterministic answer checkers, proof rubrics, tutor orchestration, spaced-review scheduler, analytics and persistence adapter.

The engine deliberately does not call an AI model and does not grade arbitrary written proofs. An upstream validated evaluator may submit a structured attempt; the engine stores and interprets that evidence.

## Evidence model

Each attempt may contain:
- `competencyId`, `itemId`, `correct`;
- `independent` (no hint or solution used);
- `hintLevel` (0 = none; larger values mean more support);
- `transfer` (whether the item tests application in a different context);
- `errorTags` (from a controlled taxonomy);
- `timestamp`.

An attempt is evidence, not a verdict. The profile keeps the complete attempt history for explainability.

## Mastery policy (initial thresholds; must be calibrated with learners)

- `unassessed`: no evidence.
- `emerging`: evidence exists but is mostly unsuccessful or highly assisted.
- `developing`: some correct performance, but not yet consistent or independent.
- `proficient`: at least two correct attempts, including one independent attempt.
- `secure`: at least three correct attempts on at least two distinct items, including an independent transfer item, with evidence collected across at least two sessions/days.

A recent independent failure can downgrade the status. The engine must never label a skill "secure" from repeated attempts at the same item.

## Recommendation policy

1. Prioritise a due review when the skill was previously learned and is due.
2. Otherwise identify the weakest unmet prerequisite on the competency path.
3. Recommend a diagnostic or foundational activity if evidence is insufficient.
4. Only recommend advanced application when prerequisites are at least proficient.
5. Explain the reason for every recommendation.

## v0.1 acceptance criteria

- Pure, deterministic functions; no network, UI or AI dependency.
- Same input profile and attempt always produce the same result.
- Unknown competency and malformed attempt are rejected clearly.
- One correct answer cannot create secure mastery.
- Repeating the same item cannot create secure mastery.
- A secure label requires independent transfer evidence and multiple items/sessions.
- Recommendations explain prerequisite blockers and evidence gaps.
- Unit tests cover thresholds, downgrade, malformed input and recommendation order.

## Validation before integration

Run a small supervised pilot with L1 students. Compare pre-test and post-test on the same competency map, include delayed retention and transfer questions, and collect learner feedback. Do not claim that MathEvo outperforms teachers until a fair comparison supports that claim.

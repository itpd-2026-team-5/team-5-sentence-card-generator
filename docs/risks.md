# Risks

The team reads this register during every Friday 15:00 weekly review. When evidence settles a risk, the team updates its status and records its outcome or the reason it was dropped.

| ID | Status | Impact | Likelihood | Risk |
| -- | ------ | ------ | ---------- | ---- |
| [RISK-01](#risk-01) | Open | High | High | The Customer has not yet accepted the exact MUP candidate, so the team may build to an unconfirmed scope, which would leave the Week 3 increment without an agreed outcome. |
| [RISK-02](#risk-02) | Open | High | Medium | The prototype used mocked generation and generation quality and cost remain untested, so the chosen LLM may fail to produce usable sentences within the available budget, which would block the core card-generation flow. |
| [RISK-03](#risk-03) | Open | High | Medium | The team has one semester and several cross-cutting product flows to build, so integration may take longer than planned, which would leave the MUP incomplete at its deadline. |
| [RISK-04](#risk-04) | Open | Medium | Medium | Personal API-key handling and teacher regeneration are unresolved, so a learner's key may be exposed or unusable by the teacher, which would block safe shared-deck review. |
| [RISK-05](#risk-05) | Open | High | Medium | Recruiting is limited to adults learning Russian who are not on the team, so fewer than three participants may complete a counted session by the end of SPRINT-08, which would leave `UT-01` and the `QR-11` test without a result. |
| [RISK-06](#risk-06) | Open | Medium | Low | A participant may withdraw or refuse the recording or the sanitized public results, so their session cannot be counted, which would reduce the counted sample and force its data to be removed. |
| [RISK-07](#risk-07) | Open | Medium | Medium | The private usability-data repository and the recordings folder need instructor access, so an instructor may be unable to open them, which would leave the raw usability evidence unverifiable. |
| [RISK-08](#risk-08) | Open | High | Medium | The sessions depend on staging card generation, verified instrumentation, and participants' dates in a one-week run sprint, so `UT-01` may not finish by 2026-11-21, which would leave its results and the `QR-11` verdict missing from Submission 8. |

## RISK-01

The Customer has not yet accepted the exact MUP candidate, so the team may build to an unconfirmed scope, which would leave the Week 3 increment without an agreed outcome.

- **Status:** Open
- **Impact:** High
  - Without an accepted minimum scope, the team cannot tell whether the increment satisfies the Customer or which stories must be completed first.
- **Likelihood:** High
  - The Week 2 report says the Customer did not explicitly accept or reject the candidate of `US-01`, `US-02`, and `US-03`.
- **Trigger:** No customer verdict and corresponding decision are recorded before the team commits the Week 3 backlog.
- **Window:** SPRINT-03.
- **Mitigation:** Present the candidate stories to the Customer together, record the verdict as a decision, and update the plan and affected stories before scheduling the work.
- **Contingency:** Replan the remaining Week 3 work around the smallest scope the Customer explicitly accepts, moving excluded stories to SPRINT-04.

## RISK-02

The prototype used mocked generation and generation quality and cost remain untested, so the chosen LLM may fail to produce usable sentences within the available budget, which would block the core card-generation flow.

- **Status:** Open
- **Impact:** High
  - A generator that returns inaccurate, unsuitable, or unaffordable sentences would undermine the MUP's central outcome.
- **Likelihood:** Medium
  - The Week 2 validation report confirms that the prototype did not test a real provider; quality and cost checks remain action points.
- **Trigger:** Representative test outputs contain incorrect word meanings or exceed the team's agreed cost limit.
- **Window:** SPRINT-03 and SPRINT-04.
- **Mitigation:** Test candidate models early on words with known contextual meanings in Russian, English, and German, and record output quality and cost per card before integrating one.
- **Contingency:** Keep generation behind a provider boundary and ship only the tested model and languages that meet the agreed checks, rescheduling the remaining generation work to the next sprint.

## RISK-03

The team has one semester and several cross-cutting product flows to build, so integration may take longer than planned, which would leave the MUP incomplete at its deadline.

- **Status:** Open
- **Impact:** High
  - An incomplete end-to-end flow would prevent a learner from completing the MUP's core task even if individual components work.
- **Likelihood:** Medium
  - The product spans a React frontend, a FastAPI backend, persistent data, authentication, and LLM generation, while the Week 2 prototype was not a complete product implementation.
- **Trigger:** A pull request needed for the learner's text-to-card flow remains blocked across a weekly review, or the flow cannot be completed on a clean checkout.
- **Window:** SPRINT-03 through SPRINT-04.
- **Mitigation:** Integrate the smallest end-to-end learner flow first, keep the main branch buildable, and verify the documented setup from a clean checkout during each sprint.
- **Contingency:** Defer teacher and other non-MUP flows, keeping the sprint focused on the accepted learner text-to-card outcome.

## RISK-04

Personal API-key handling and teacher regeneration are unresolved, so a learner's key may be exposed or unusable by the teacher, which would block safe shared-deck review.

- **Status:** Open
- **Impact:** Medium
  - Exposing a learner's key would violate the agreed privacy boundary, while an unusable key would prevent the teacher from regenerating a card.
- **Likelihood:** Medium
  - The Week 2 report records personal-key handling as an open technical question; the Customer requires learners and teachers to use their own keys.
- **Trigger:** The proposed teacher flow sends a learner's key to the backend, stores it where the teacher can access it, or cannot regenerate a card with the teacher's own key.
- **Window:** SPRINT-04 through SPRINT-06, before shared-deck review is released.
- **Mitigation:** Prototype and review the key flow before implementing teacher regeneration; keep learner and teacher credentials separate and out of shared-deck data.
- **Contingency:** Disable teacher regeneration until the teacher can use a separate personal key without access to the learner's key.

## RISK-05

Recruiting is limited to adults learning Russian who are not on the team, so fewer than three participants may complete a counted session by the end of SPRINT-08, which would leave `UT-01` and the `QR-11` test without a result.

- **Status:** Open
- **Impact:** High
  - Without three counted sessions the test cannot settle `QR-11`, and the Week 8 results submission claims no result.
- **Likelihood:** Medium
  - The [participant profile](usability-tests/ut-01/README.md#participant-profile) narrows the pool to Russian learners at A1 to B1, and no participant is recruited yet.
- **Trigger:** Fewer than three participants have agreed to a session date by 2026-11-17, or a session date falls through without a replacement booked.
- **Window:** SPRINT-07 and SPRINT-08, until the last counted session.
- **Mitigation:** Recruit towards the design target of five rather than the minimum of three, ask through several channels at once, and arrange sessions as soon as the design is merged.
- **Contingency:** Recruit replacements under the next free code; when three counted sessions still cannot be completed, keep the `QR-11` testing-plan row `Not verified` in SPRINT-08 or move it to SPRINT-09, declare the shortfall in the weekly report, and claim no result.

## RISK-06

A participant may withdraw or refuse the recording or the sanitized public results, so their session cannot be counted, which would reduce the counted sample and force its data to be removed.

- **Status:** Open
- **Impact:** Medium
  - An uncounted session costs the team a participant slot and its data cannot be used or published.
- **Likelihood:** Low
  - The [consent](usability-tests/ut-01/README.md#consent-and-data) requires the recording and the sanitized public results, and participants may withdraw at any time.
- **Trigger:** A participant declines a required consent clause, asks to stop, or asks for their data to be removed.
- **Window:** From the first counted session until the course is graded.
- **Mitigation:** Send the consent template before the session so the participant reads it in advance, and confirm the signed consent before the recording starts.
- **Contingency:** Do not count the session, remove the participant's raw text from the private repository and the recording from the folder, retire the code, and recruit a replacement under the next free code.

## RISK-07

The private usability-data repository and the recordings folder need instructor access, so an instructor may be unable to open them, which would leave the raw usability evidence unverifiable.

- **Status:** Open
- **Impact:** Medium
  - The instructors could not check the consent records, the raw notes, or the recordings behind the public results.
- **Likelihood:** Medium
  - The private repository has not been created yet, and each instructor's GitHub account and cloud-folder access must be set up by the team, per [#248](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/248).
- **Trigger:** An instructor reports that they cannot open the private repository or the recordings folder, or an access invitation is still pending at submission.
- **Window:** SPRINT-07 and SPRINT-08, before each submission.
- **Mitigation:** Create the repository and the folder in SPRINT-07 with the team and the instructors as readers, and confirm that each instructor can open both before the first counted session.
- **Contingency:** Create the repository and the folder with the team and the instructors; when an instructor cannot use GitHub, give them the private text through a Moodle-only archive and declare the deviation in the weekly report.

## RISK-08

The sessions depend on staging card generation, verified instrumentation, and participants' dates in a one-week run sprint, so `UT-01` may not finish by 2026-11-21, which would leave its results and the `QR-11` verdict missing from Submission 8.

- **Status:** Open
- **Impact:** High
  - The run week's submission would carry no usability result, and the `QR-11` row would stay unsettled.
- **Likelihood:** Medium
  - Card generation has failed to reach a model provider from the university VM before, per [the deployment log](deployment.md). The instrumentation implementation is merged, but its behavior is not yet verified on staging.
- **Trigger:** The instrumentation is not verified, or staging generation does not work, by 2026-11-17, or fewer than three sessions are complete by 2026-11-20.
- **Window:** SPRINT-08.
- **Mitigation:** Verify the deployed instrumentation and complete the dry run before counted sessions, check staging generation before each session, and arrange the sessions early in SPRINT-08.
- **Contingency:** Move the `QR-11` testing-plan row to SPRINT-09 with a reason, declare the open window in the weekly report, and claim no result.

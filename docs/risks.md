# Risks

The team reads this register during every Friday 15:00 weekly review. When evidence settles a risk, the team updates its status and records its outcome or the reason it was dropped.

| ID | Status | Impact | Likelihood | Risk |
| -- | ------ | ------ | ---------- | ---- |
| [RISK-01](#risk-01) | Open | High | High | The Customer has not yet accepted the exact MUP candidate, so the team may build to an unconfirmed scope, which would leave the Week 3 increment without an agreed outcome. |
| [RISK-02](#risk-02) | Open | High | Medium | The prototype used mocked generation and generation quality and cost remain untested, so the chosen LLM may fail to produce usable sentences within the available budget, which would block the core card-generation flow. |
| [RISK-03](#risk-03) | Open | High | Medium | The team has one semester and several cross-cutting product flows to build, so integration may take longer than planned, which would leave the MUP incomplete at its deadline. |
| [RISK-04](#risk-04) | Open | Medium | Medium | Personal API-key handling and teacher regeneration are unresolved, so a learner's key may be exposed or unusable by the teacher, which would block safe shared-deck review. |

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

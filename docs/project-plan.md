# Project plan

## Milestones

### MLS-03

- **Due:** 2026-10-17
- **Sprints:** [SPRINT-03](#sprint-03)
- **Advances:** [TOS-01](threshold-of-success.md#tos-01), [TOS-02](threshold-of-success.md#tos-02)

The MUP delivers a working learner flow from bringing in a plain-text source through selecting words to generating cards with new sentences and translations. Its exact scope follows the Customer's recorded verdict on the MUP candidate.

### MLS-05

- **Due:** 2026-10-31
- **Sprints:** [SPRINT-04](#sprint-04), [SPRINT-05](#sprint-05)
- **Advances:** [TOS-01](threshold-of-success.md#tos-01)

A learner can import a text, generate cards, and study them in the product running on staging and production on the university VM.
The release is verified by CI and deployed checks, and the Customer can open it from the university network.

### MLS-07

- **Due:** 2026-11-14
- **Sprints:** [SPRINT-06](#sprint-06), [SPRINT-07](#sprint-07)
- **Advances:** [TOS-01](threshold-of-success.md#tos-01), [TOS-03](threshold-of-success.md#tos-03)

A learner studies on a phone and returns for reviews the product scheduled, while a teacher reviews and corrects a deck the learner explicitly shared.
External learners can try the deployed product in structured usability sessions.

## Sprints

### SPRINT-03

The MUP candidate is a working end-to-end learner flow on the main branch, ready for the Customer's explicit verdict.

- **Due:** 2026-10-17
- **Sprint Backlog:** [SPRINT-03 GitHub milestone](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/milestone/1)

#### REL-03

Released as [v0.1.0](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/releases/tag/v0.1.0) on 2026-10-18.

### SPRINT-04

A learner can complete the core text-to-card flow reliably, with automated checks covering its behavior and an architecture that supports further product work.

- **Due:** 2026-10-24
- **Sprint Backlog:** [SPRINT-04 GitHub milestone](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/milestone/2)
- **Planned Velocity:** 21
- **Actual Velocity:** 18; [US-08](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/41) did not pass review and moved to SPRINT-05 for audio rework, per [DEC-075](decisions.md#dec-075).

#### REL-04

Released as [v0.2.0](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/releases/tag/v0.2.0) on 2026-10-25.

### SPRINT-05

A learner can complete the core text-to-card-and-study flow from the university network on a product deployed to staging and production, with automated checks verifying the critical modules and active High-importance quality requirements.

- **Due:** 2026-10-31
- **Sprint Backlog:** [SPRINT-05 GitHub milestone](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/milestone/3)
- **Planned Velocity:** 21
- **Actual Velocity:** 0; the Sprint Review took no story verdicts, so [US-10](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/36), [US-08](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/41), and [US-14](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/141) moved to SPRINT-06 for the per-criterion verdicts the [Week 5 meeting report](../reports/week-05/meeting-report.md#action-points) assigns.

#### REL-05

- **Released:** [v0.3.0](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/releases/tag/v0.3.0) on 2026-10-31.
- **Checked QRs:**
  - [QR-02](quality-requirements/qr/QR-02.md)
  - [QR-07](quality-requirements/qr/QR-07.md)

  Each test's result is in the [Quality Requirement Testing Plan](#quality-requirement-testing-plan).

### SPRINT-06

The team can observe how learners use the core task and whether the deployed product meets its quality targets, with the analytics and observability pipelines and their four dashboards running for staging and production, and the Customer's review of the product's mobile and desktop usability and deployed pronunciation and LLM access verified.

The Customer review prioritizes improving desktop and especially mobile usability under [DEC-100](decisions.md#dec-100), and verifying deployed pronunciation and LLM access under [DEC-101](decisions.md#dec-101).
Alternative provider trials carry into this sprint under [DEC-103](decisions.md#dec-103); no provider or external-VM migration has been selected.
Individual-card reordering remains deferred under [DEC-094](decisions.md#dec-094), with separate order and identifiers required if it is later implemented under [DEC-093](decisions.md#dec-093).

- **Due:** 2026-11-08
- **Sprint Backlog:** [SPRINT-06 GitHub milestone](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/milestone/4)
- **Planned Velocity:** 8; the story points of the two internal stories scheduled here: [US-16](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/190) (3) and [US-17](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/191) (5).
- **Actual Velocity:** 0 at the 2026-11-08 deadline: no story had recorded Customer acceptance and all [Definition of Done](definition-of-done.md#story) checks completed by then. [US-16](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/190) contributes 0 of its 3 planned points and [US-17](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/191) contributes 0 of its 5 planned points; their outstanding completion checks carry forward to SPRINT-07.

Correction recorded on 2026-11-09: the earlier value of 3 incorrectly counted US-16 as completed by the deadline. The [supplemental written review received on 2026-11-09](../reports/week-06/written-review-report.md#outcomes) accepts the presented criterion evidence for both US-16 and US-17, so neither is described as still lacking that response. It does not establish completion of every Definition of Done check, including closure of the linked tasks through merged pull requests and the accountable member's clean-checkout verification. No additional completed points are recorded from this response alone. The [passing QR-10 check on 2026-11-09](../reports/week-06/qr10-evidence.md) is late SPRINT-06 evidence and does not change the deadline velocity; the [retrospective correction](../reports/week-06/sprint-retrospective.md) records the same distinction.

#### REL-06

The Customer approved releasing the deployed version with the production Claude API connection limitation disclosed and its fix carried to SPRINT-07, per [DEC-126](decisions.md#dec-126). The tag points to the [verified production commit](../reports/week-06/part13-deployment-evidence.md) `a658ea49dc767cd7579e38949369a4880ecaa51d` on `main`; the release note states the limitation.

- **Released:** [v0.6.0](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/releases/tag/v0.6.0) on 2026-11-09.
- **Checked QRs:**
  - [QR-02](quality-requirements/qr/QR-02.md): CI duration check, recorded in SPRINT-06.
  - [QR-10](quality-requirements/qr/QR-10.md): staging failure diagnosability check passed on 2026-11-09, after the SPRINT-06 deadline.

  Each test's result and date are in the [Quality Requirement Testing Plan](#quality-requirement-testing-plan). QR-01, QR-03, and QR-06 moved to SPRINT-07 with reasons recorded there.

### SPRINT-07

The `UT-01` usability test is designed for Russian and German learners, including flashcard-app newcomers. The Customer reportedly confirmed the five-adult plan, QR-11's 80% unaided-completion bar, the 16–20 November session window, and results by 21 November in a [Telegram follow-up](../reports/week-07/customer-follow-up.md#confirmed-questions). The dry run and live staging instrumentation check remain prerequisites for counted sessions.

- **Due:** 2026-11-15
- **Sprint Backlog:** [SPRINT-07 GitHub milestone](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/milestone/5)
- **Planned Velocity:** 8; the story points of the two stories scheduled here: [US-16](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/190) (3) and [US-17](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/191) (5).
- **Actual Velocity:** 0 at the 2026-11-15 deadline: no story had a recorded Customer acceptance verdict, so [US-16](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/190) contributes 0 of 3 points and [US-17](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/191) 0 of 5. Both stories and every other open SPRINT-07 issue moved to [SPRINT-08](#sprint-08), and the retrospective is [reports/week-07/sprint-retrospective.md](../reports/week-07/sprint-retrospective.md).

#### REL-07

- **Released:** [v0.7.0](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/releases/tag/v0.7.0) on 2026-11-15.
- **Checked QRs:** None.

  The [Quality Requirement Testing Plan](#quality-requirement-testing-plan) records the planned and unverified tests.

### SPRINT-08

UT-01's evidence and QR-11 outcome are recorded and triaged, while the configuration evaluation produces an evidence-based first-change recommendation.

- **Due:** 2026-11-21
- **Sprint Backlog:** [SPRINT-08 GitHub milestone](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/milestone/6)
- **Planned Velocity:** 8; [US-16](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/190) contributes 3 points and [US-17](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/191) contributes 5.
- **Actual Velocity:** 8 at the extended 2026-11-28 deadline: the Customer accepted [US-16](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/190) in [DEC-164](decisions.md#dec-164) and [US-17](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/191) in [DEC-165](decisions.md#dec-165) at the review on 2026-11-28, after the original 2026-11-21 due date. The open finding issues [#309](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/309) and [#310](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/310), the unfinished fix [#308](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/308), and every other open SPRINT-08 issue move to [SPRINT-09](#sprint-09), and the retrospective is [reports/week-08/sprint-retrospective.md](../reports/week-08/sprint-retrospective.md).

#### REL-08

- **Released:** [v0.8.0](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/releases/tag/v0.8.0) on 2026-11-28.
- **Checked QRs:**
  - [QR-11](quality-requirements/qr/QR-11.md)

  The [Quality Requirement Testing Plan](#quality-requirement-testing-plan) records each test's result and the tests still unverified.

### SPRINT-09

Provisional: the final repository and evidence are ready for handover and course review, with the seven-minute pitch deck and individual reflection complete.

- **Due:** 2026-11-28

#### REL-09

## Quality Requirement Testing Plan

What each quality requirement test found at its last check, in the order of the [quality requirements index](quality-requirements/README.md).
The tests themselves are in their requirements' files.

| QR | QRT | Status | Checked | Planned for sprint | Evidence |
| --- | --- | --- | --- | --- | --- |
| [QR-03](quality-requirements/qr/QR-03.md) | [QR-03 QRT-01](quality-requirements/qr/QR-03.md#qrt-01) | Not verified | None | [SPRINT-09](#sprint-09) | Moved from SPRINT-08: the 90-card first-generation evaluation in Russian, English, and German was not run, as the team told the Customer at the review ([DEC-169](decisions.md#dec-169)); `TOS-02`, which it serves, is Missed. It also moved from SPRINT-06 and SPRINT-07 for lack of the same evidence. |
| [QR-01](quality-requirements/qr/QR-01.md) | [QR-01 QRT-01](quality-requirements/qr/QR-01.md#qrt-01) | Not verified | None | [SPRINT-09](#sprint-09) | Moved from SPRINT-08: `backend/tests/test_confidentiality.py` is still absent and the separate-account, real-key isolation check was not run; the review's `UAT-03` run did not check access to an unshared deck ([DEC-168](decisions.md#dec-168)). It also moved from SPRINT-06 and SPRINT-07. |
| [QR-02](quality-requirements/qr/QR-02.md) | [QR-02 QRT-01](quality-requirements/qr/QR-02.md#qrt-01) | Passes | [SPRINT-06](#sprint-06) | [SPRINT-05](#sprint-05) | [2026-11-08 Product checks on main at `3cde59f`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/runs/42501364765), CI: backend Test 15 s + frontend Type check 1 s + Build 2 s = 18 s, below 3 minutes; both jobs passed |
| [QR-06](quality-requirements/qr/QR-06.md) | [QR-06 QRT-01](quality-requirements/qr/QR-06.md#qrt-01) | Not verified | None | [SPRINT-09](#sprint-09) | Moved from SPRINT-08: `scripts/check-phone-layout.mjs` is still absent, so the 360- and 390-pixel learner and teacher workflow check has no result; the usability sessions ran on desktop only. It also moved from SPRINT-06 and SPRINT-07. |
| [QR-07](quality-requirements/qr/QR-07.md) | [QR-07 QRT-01](quality-requirements/qr/QR-07.md#qrt-01) | Passes | [SPRINT-05](#sprint-05) | [SPRINT-05](#sprint-05) | [Staging run of `scripts/check-restart.sh` on `b904ab3`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-05/README.md#qr-07-qrt-01-on-the-release-commit) |
| [QR-10](quality-requirements/qr/QR-10.md) | [QR-10 QRT-01](quality-requirements/qr/QR-10.md#qrt-01) | Passes | [SPRINT-06](#sprint-06) | [SPRINT-06](#sprint-06) | [Late Week 6 staging core-task failure check on 2026-11-09](../reports/week-06/qr10-evidence.md): log 0.861 s, numeric SLI-01 P95 24.704 ms after 9.175 s. The 2026-11-08 run did not observe P95 within one minute; this pass occurred after the sprint deadline. |
| [QR-11](quality-requirements/qr/QR-11.md) | [QR-11 QRT-01](quality-requirements/qr/QR-11.md#qrt-01) | Passes | [SPRINT-08](#sprint-08) | [SPRINT-08](#sprint-08) | [UT-01 results](usability-tests/ut-01/results.md#main-task): 4 of 5 counted participants completed the main task `Unaided` (80%), meeting the bar of 4 of 5, with Russian and German learners and newcomers represented. At the review, with 4 sessions, the Customer recorded 3 of 4 as a failure and said a further participant could reach 80% ([DEC-163](decisions.md#dec-163)); the fifth ran on 2026-11-28 after the review. |

## Progress Monitoring

- **Review:** The team holds its weekly review every Friday at 15:00, separately from the Customer meeting, and checks this plan, the [threshold of success](threshold-of-success.md), and the [risk register](risks.md).
- **Checked by:** The accountable member of each scheduled issue reports its state; the team checks the sprint's GitHub milestone against its goal and release.
- **Visible at:** The team's [GitHub Project table view](https://github.com/orgs/itpd-2026-team-5/projects/1/views/1) and the [sprints' GitHub milestones](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/milestones).

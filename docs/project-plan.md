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

Provisional: the team can observe product use and present a running product with evidence of its behavior.

The Customer review prioritizes improving desktop and especially mobile usability under [DEC-100](decisions.md#dec-100), and verifying deployed pronunciation and LLM access under [DEC-101](decisions.md#dec-101).
Alternative provider trials carry into this sprint under [DEC-103](decisions.md#dec-103); no provider or external-VM migration has been selected.
Individual-card reordering remains deferred under [DEC-094](decisions.md#dec-094), with separate order and identifiers required if it is later implemented under [DEC-093](decisions.md#dec-093).

- **Due:** 2026-11-07

#### REL-06

### SPRINT-07

Provisional: the product and study tasks are ready for structured usability testing with external learners.

- **Due:** 2026-11-14

#### REL-07

### SPRINT-08

Provisional: the product's configuration and dependencies support a reproducible final build and release.

- **Due:** 2026-11-21

#### REL-08

### SPRINT-09

Provisional: the product and repository are ready for the final pitch, handover, and course review.

- **Due:** 2026-11-28

#### REL-09

## Quality Requirement Testing Plan

What each quality requirement test found at its last check, in the order of the [quality requirements index](quality-requirements/README.md).
The tests themselves are in their requirements' files.

| QR | QRT | Status | Checked | Planned for sprint | Evidence |
| --- | --- | --- | --- | --- | --- |
| [QR-03](quality-requirements/qr/QR-03.md) | [QR-03 QRT-01](quality-requirements/qr/QR-03.md#qrt-01) | Not verified | None | [SPRINT-06](#sprint-06) | None |
| [QR-01](quality-requirements/qr/QR-01.md) | [QR-01 QRT-01](quality-requirements/qr/QR-01.md#qrt-01) | Not verified | None | [SPRINT-06](#sprint-06) | None |
| [QR-02](quality-requirements/qr/QR-02.md) | [QR-02 QRT-01](quality-requirements/qr/QR-02.md#qrt-01) | Passes | [SPRINT-05](#sprint-05) | [SPRINT-05](#sprint-05) | [`Product checks` run on `main` at `b904ab3`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/runs/41224928507) |
| [QR-06](quality-requirements/qr/QR-06.md) | [QR-06 QRT-01](quality-requirements/qr/QR-06.md#qrt-01) | Not verified | None | [SPRINT-06](#sprint-06) | None |
| [QR-07](quality-requirements/qr/QR-07.md) | [QR-07 QRT-01](quality-requirements/qr/QR-07.md#qrt-01) | Passes | [SPRINT-05](#sprint-05) | [SPRINT-05](#sprint-05) | [Staging run of `scripts/check-restart.sh` on `b904ab3`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-05/README.md#qr-07-qrt-01-on-the-release-commit) |

## Progress Monitoring

- **Review:** The team holds its weekly review every Friday at 15:00, separately from the Customer meeting, and checks this plan, the [threshold of success](threshold-of-success.md), and the [risk register](risks.md).
- **Checked by:** The accountable member of each scheduled issue reports its state; the team checks the sprint's GitHub milestone against its goal and release.
- **Visible at:** The team's [GitHub Project table view](https://github.com/orgs/itpd-2026-team-5/projects/1/views/1) and the [sprints' GitHub milestones](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/milestones).

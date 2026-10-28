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

A learner turns a text into cards, corrects a sentence they do not trust, hears the sentence, and studies on a phone in the product running on the staging and production deployments.
The Customer can open that product from the university network, and the checks that prove it run in CI and against the deployments.

### MLS-07

- **Due:** 2026-11-14
- **Sprints:** [SPRINT-06](#sprint-06), [SPRINT-07](#sprint-07)
- **Advances:** [TOS-01](threshold-of-success.md#tos-01), [TOS-03](threshold-of-success.md#tos-03)

A learner studies decks in the order they chose and returns for reviews the product scheduled, and a teacher corrects a deck the learner shared, which the learner then studies.
It builds on the deployed product of the previous increment, so external learners and a teacher can try it in the usability sessions.

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

The product runs on staging and production on the university VM, its critical modules and High-importance quality requirements are covered by recorded tests, and a learner can correct a sentence, hear it, and study on a phone.

- **Due:** 2026-10-31
- **Sprint Backlog:** [SPRINT-05 GitHub milestone](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/milestone/3)
- **Planned Velocity:** 16

#### REL-05

### SPRINT-06

Provisional: the team can observe product use and present a running product with evidence of its behavior.

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

## Progress Monitoring

- **Review:** The team holds its weekly review every Friday at 15:00, separately from the Customer meeting, and checks this plan, the [threshold of success](threshold-of-success.md), and the [risk register](risks.md).
- **Checked by:** The accountable member of each scheduled issue reports its state; the team checks the sprint's GitHub milestone against its goal and release.
- **Visible at:** The team's [GitHub Project table view](https://github.com/orgs/itpd-2026-team-5/projects/1/views/1) and the [sprints' GitHub milestones](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/milestones).

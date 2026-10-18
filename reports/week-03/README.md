# Week 03 report

## Project

Sentence Cards Generator, ITPD Team 5.

This report covers Assignment 3, Planning and the Minimum Usable Product, and SPRINT-03.

## What we did

The team wrote the threshold, seven-sprint plan, risk register, stack decision, Definition of Done, and contributing guide. The backend, frontend, and Docker Compose workflow were merged to `main`, and the team demonstrated the candidate to the Customer on 2026-10-17.

The Customer's formal acceptance verdicts for US-01, US-02, and US-03 against their individual acceptance criteria remain pending, as does confirmation that these three stories are the complete MUP candidate. The demonstration used placeholder generation and therefore did not establish real-model sentence quality, contextual translation, or token cost.

REL-03 was published late, on 2026-10-18, as the pre-release [v0.1.0](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/releases/tag/v0.1.0). The release records the current `main` candidate; it is not evidence of Customer acceptance or production readiness.

## Coverage

| Deliverable | Artifact |
| --- | --- |
| Threshold of success | [`docs/threshold-of-success.md`](../../docs/threshold-of-success.md) |
| Project plan | [`docs/project-plan.md`](../../docs/project-plan.md) |
| Risk register | [`docs/risks.md`](../../docs/risks.md) |
| Stack decision | [`DEC-023`](../../docs/decisions.md#dec-023) |
| Definition of Done | [`docs/definition-of-done.md`](../../docs/definition-of-done.md) |
| Contributing guide | [`CONTRIBUTING.md`](../../CONTRIBUTING.md) |
| Sprint milestones and issue fields | [`SPRINT-03 GitHub milestone`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/milestone/1) and [public Project table view with ownership fields, assignees, and milestones](https://github.com/orgs/itpd-2026-team-5/projects/1/views/1) |
| GitHub project | [Public Project table view](https://github.com/orgs/itpd-2026-team-5/projects/1/views/1) |
| Minimum usable product | [Week 2 MUP candidate](../week-02/README.md#minimum-usable-product-candidate), [US-01](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/30), [US-02](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/31), and [US-03](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/32); merged implementation: [PR #59](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/59), [PR #60](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/60), and [PR #61](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/61) |
| Changelog and first release | [`CHANGELOG.md`](../../CHANGELOG.md) still has only `[Unreleased]` (the dated release section was intentionally not changed); [pre-release v0.1.0](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/releases/tag/v0.1.0) |
| Documentation site | [Published documentation](https://itpd-2026-team-5.github.io/team-5-sentence-card-generator/) |
| Setup and run instructions | [`docs/setup.md`](../../docs/setup.md) |
| Week 2 action points | [Week 2 meeting report](../week-02/meeting-report.md#action-points), with outcomes in [Previous action points](meeting-report.md#previous-action-points) |
| Week 2 open questions | [Week 2 meeting report](../week-02/meeting-report.md#open-questions), with outcomes in [Previous open questions](meeting-report.md#previous-open-questions) |
| Meeting script | [`reports/week-03/meeting-script.md`](meeting-script.md) |
| Customer validation | [`reports/week-03/meeting-report.md`](meeting-report.md) and [sanitized transcript](meeting-transcript.md) |
| AI usage | Not available in the repository yet; the required `reports/week-03/ai-usage.md` remains outstanding. |

## Customer outcome

The team showed US-01, US-02, and US-03. The Week 3 meeting report does not record a formal accept/reject verdict against the individual acceptance criteria for any of them, and no candidate story was recorded as moved out. The follow-up decision is still pending; see the [Week 3 meeting report](meeting-report.md#previous-open-questions).

## Contribution

| Member | Work |
| --- | --- |
| @KaramKhaddour | Built the backend, frontend, and Docker Compose/CI slice in [PR #59](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/59), [PR #60](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/60), and [PR #61](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/61); presented the candidate at the customer meeting. |
| @Byakko-san | Wrote the project plan and risk register in [PR #92](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/92) and [PR #91](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/91); linked the Project and clarified product CI in [PR #97](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/97) and [PR #98](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/98). |
| @Horokk1 | Participated in the customer validation meeting; follow-up items and unresolved questions are recorded in the [Week 3 report](meeting-report.md). |
| @saleemasekrea000 | Participated in the customer validation meeting; follow-up items and unresolved questions are recorded in the [Week 3 report](meeting-report.md). |

## Repository evidence

[PR #98](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/98) merged and closed task #95. The latest green [Link check](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/runs/39157815249) and [Markdown check](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/runs/39157815083) on `main` ran on commit [`eeec72f`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/commit/eeec72fe13d163823ee1df79cdf31167ef834d15).

## Deviations

- REL-03 was published on 2026-10-18, one day after the SPRINT-03 hard deadline of 2026-10-17.
- The pre-release was published before the Customer's formal AC-based verdicts on US-01 through US-03 and before confirmation of the exact candidate scope. This records the team's decision to tag the current `main` candidate; it does not waive the outstanding Customer validation.
- The release was cut without moving the `[Unreleased]` entries into a dated `CHANGELOG.md` section, as that change was intentionally excluded. The changelog requirement remains incomplete.
- The required Week 3 AI usage report is not present yet.

## Privacy

No private-only material was committed to this repository.

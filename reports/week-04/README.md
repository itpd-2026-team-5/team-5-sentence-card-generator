# Week 04 report

## Project

Sentence Cards Generator, ITPD Team 5.

This report covers Assignment 4, SPRINT-04, and the work recorded for the week ending 2026-10-25.

## What we did

The team completed the SPRINT-04 plan and release records, wrote quality and functional requirements, documented the architecture and its decisions, carried Week 3 customer feedback into the product, and held the Sprint Review and retrospective. REL-04 was published as [v0.2.0](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/releases/tag/v0.2.0). Actual velocity was 18 points; US-08 moved to SPRINT-05 for audio rework.

The assignment checklist is not fully satisfied yet. The quality/architecture criteria in Part 2, the missing Customer verdicts in Part 10, the unmerged Part 13 report, and the repository/Moodle submission steps remain open. The coverage table and deviations below state the evidence and limits.

## Customer outcome

The [Week 4 report](meeting-report.md) records the meeting and distinguishes what participants confirmed from what was not individually tested. It does not record explicit Customer acceptance or rejection for every story, nor a Customer verdict on the quality requirements and architecture.

| Story shown as a closure candidate | Recorded outcome |
| --- | --- |
| [US-01](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/30) | The Customer agreed with the basic text-input capability. The team closed the story under [DEC-082](../../docs/decisions.md#dec-082) without objection; the transcript does not record an explicit Customer verdict against every criterion. |
| [US-02](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/31) | Marking, ignoring, and clearing words were discussed. The team closed the story under [DEC-082](../../docs/decisions.md#dec-082) without objection; the transcript does not record an explicit Customer accept/reject verdict. |
| [US-03](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/32) | Real generation and the contextual meaning of “Bank” were discussed. The team closed the demonstrated workflow under [DEC-082](../../docs/decisions.md#dec-082), separating problem reporting under [DEC-076](../../docs/decisions.md#dec-076); several acceptance checks were not individually demonstrated. |
| [US-08](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/41) | The team kept the story open for audio rework under [DEC-075](../../docs/decisions.md#dec-075). This is not recorded as a Customer rejection. |

The [Week 2 MUP candidate](../week-02/README.md#minimum-usable-product-candidate) identifies US-01 through US-03, but the Week 4 transcript does not record the Customer's explicit confirmation that this exact set is sufficient.

## Coverage

| Deliverable | Artifact |
| --- | --- |
| Sprint plan and estimates | [docs/project-plan.md#sprint-04](../../docs/project-plan.md#sprint-04) — planned velocity 21, actual velocity 18, and REL-04. |
| Product backlog refinement | [Public GitHub Project table view grouped by Milestone](https://github.com/orgs/itpd-2026-team-5/projects/1/views/1) — stories in the next two sprints have Story Points and remain unscheduled. |
| Issue catch-up | [User Story issue list](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues?q=is%3Aissue+type%3A%22User+Story%22) and [Task issue list](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues?q=is%3Aissue+type%3ATask) — issue types, story criteria/references, and open-task Requirements were audited. |
| Quality requirements | [docs/quality-requirements/README.md](../../docs/quality-requirements/README.md) and [docs/quality-requirements/qr/](../../docs/quality-requirements/qr/) — nine indexed requirements. QR-02 names generation, scheduling, and the frontend entry point, but omits the payment-module path required by the assignment; see [Deviations](#deviations). |
| Functional requirements | [docs/functional-requirements/README.md](../../docs/functional-requirements/README.md) and [docs/functional-requirements/fr/](../../docs/functional-requirements/fr/) — eleven indexed requirements. |
| Container view | [docs/architecture/README.md#container-view](../../docs/architecture/README.md#container-view), [docs/architecture/container.png](../../docs/architecture/container.png), [docs/architecture/container.mmd](../../docs/architecture/container.mmd), and [docs/architecture/README.md#container-responsibilities](../../docs/architecture/README.md#container-responsibilities). |
| Architecture and drivers | [docs/architecture/README.md](../../docs/architecture/README.md) — links business goals, constraints, functional requirements, and quality requirements to the container view and ADR index. |
| Architectural decisions | [docs/architecture/README.md#architectural-decisions](../../docs/architecture/README.md#architectural-decisions) and [docs/architecture/adr/](../../docs/architecture/adr/) — five accepted ADRs are indexed. |
| Glossary | [docs/glossary.md](../../docs/glossary.md). |
| Team `AGENTS.md` | [AGENTS.md](../../AGENTS.md). |
| Issue fields in the project view | [Public GitHub Project table view](https://github.com/orgs/itpd-2026-team-5/projects/1/views/1) — role fields, MoSCoW, Story Points, Priority, assignees, and milestones. |
| Documentation site | [Published documentation site](https://itpd-2026-team-5.github.io/team-5-sentence-card-generator/) — navigation is defined in [docs/SUMMARY.md](../../docs/SUMMARY.md). |
| Week 3 action points | [reports/week-04/meeting-report.md#previous-action-points](meeting-report.md#previous-action-points) — outcomes are recorded; several remain partial and are carried forward. |
| Week 3 open questions | [reports/week-04/meeting-report.md#previous-open-questions](meeting-report.md#previous-open-questions) — answered or carried forward with follow-up. |
| Meeting script | [reports/week-04/meeting-script.md](meeting-script.md). |
| Customer validation | [reports/week-04/meeting-report.md](meeting-report.md), [reports/week-04/meeting-transcript.md](meeting-transcript.md), and the story issues [#30](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/30), [#31](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/31), [#32](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/32), and [#41](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/41). Verdict limits are stated above and in the meeting report. |
| `REL-04` | [v0.2.0 release](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/releases/tag/v0.2.0), [CHANGELOG.md](../../CHANGELOG.md), and [docs/project-plan.md#rel-04](../../docs/project-plan.md#rel-04). |
| Sprint retrospective | [reports/week-04/sprint-retrospective.md](sprint-retrospective.md). |
| AI usage | [PR #134](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/134) proposes `reports/week-04/ai-usage.md`, but the PR is open and the file is not yet on `main`. |

## Contribution

| Member | Work |
| --- | --- |
| @Byakko-san | Synchronized future sprint dates and preserved the unscheduled backlog in [PR #137](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/137). |
| @KaramKhaddour | Contributed the quality requirements ([PR #118](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/118)), architecture and functional requirements ([PR #126](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/126)), meeting-feedback implementation ([PR #129](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/129)), and release records ([PR #132](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/132)). |
| @Horokk1 | Prepared the Part 10 meeting artifacts in [PR #130](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/130); the AI-usage report is proposed in [open PR #134](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/134). |
| @saleemasekrea000 | Added the sprint retrospective in [PR #136](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/136). |

## Repository evidence

The Part 10 artifacts were merged and closed task #127 in [PR #130](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/130). On `main` at `f19539015740409dc3dda8250408852a26ef74c5`, the latest [link check](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/runs/40229294532) and [Markdown check](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/runs/40229294564) both succeeded.

## Deviations

- **Part 2:** the required `Maintainability` / `Testability` criterion in QR-02 names `backend/app/generation.py`, `backend/app/study.py`, and `frontend/src/main.tsx`, but not a payment module by repository path as the assignment checklist requires. The repository has no payment module; this criterion remains incomplete rather than inventing a path.
- **Part 10:** the meeting report states that the meeting did not record an explicit Customer verdict on the architecture-to-driver mapping. The transcript also does not establish explicit accept/reject verdicts for every story, the exact MUP-candidate confirmation, or the final read-back. [The meeting script](meeting-script.md) now marks unanswered questions as open instead of closed. A further Customer review and accurate updates to the report and story issues are still required.
- **Part 13 and submission:** the AI-usage report is in open PR #134 and is not merged into `main`. This README is not yet merged into `main`; consequently, the required full-hash permalink and snapshot, and the two-page Moodle PDF, are not yet available. The PDF also requires team-member details that are not part of this public report.
- **Timing:** REL-04 and the related Week 4 work were published on 2026-10-25, after the assignment's 2026-10-24 hard deadline.

## Privacy

No private-only material was committed to this repository. The published transcript is sanitized, and the meeting report records permission to publish it.

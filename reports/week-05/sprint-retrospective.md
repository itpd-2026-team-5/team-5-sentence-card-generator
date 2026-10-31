# SPRINT-05 Retrospective

The retrospective of [SPRINT-05](../../docs/project-plan.md#sprint-05), written at the sprint's close after its Actual Velocity was set.

## What Went Well

| What went well |
| --- |
| The product runs on the university VM as separate staging and production deployments from one commit, following the [deployment runbook](../../docs/deployment.md), and the Customer accepted that version for the Week 5 submission. |
| The QR-07 restart check passed on staging for both the first deploy and the release commit, so REL-05 is the first release with a `deployed` quality requirement test behind it. |
| The product CI gained `actionlint`, a backend type check, a frontend format check, and frontend regression tests ([#155](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/155), [#159](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/159), [#161](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/161)), and every check stayed green on `main`. |
| The Sprint Review was recorded and its [transcript](meeting-transcript.md) published, and its decisions entered the decision log the same day. |

## What Did Not

| Problem | Root cause |
| --- | --- |
| Card generation does not work on the deployed product, so the core task's last step could not be verified on production. | Outbound access from the university network to the LLM providers was never checked before deployment day; Anthropic times out and OpenRouter refuses requests from it. |
| No story received a verdict, so the Actual Velocity is 0 and all three stories moved to SPRINT-06. | The review spent its time on feedback and not on per-criterion verdicts, the same cause the SPRINT-04 retrospective named. |
| Most of the sprint's pull requests merged on the due date. | The assignment's parts still had no task issues with owners and mid-week merge dates at the start of the sprint. |

## Actions

| Action | Owner | Impact | Reason | Carried |
| --- | --- | --- | --- | --- |
| Find an LLM provider or gateway reachable from the university network, and check generation on staging before the next Sprint Review. | saleemasekrea000 | High | Generation is blocked on the deployed product. | Yes |
| Hold sprint planning on the sprint's first day and record its goal, backlog, and Planned Velocity before any work merges. | Byakko-san | High | SPRINT-05 was planned on 2026-10-29, after the sprint had started. | Yes |
| Give every part of the assignment a task issue with an owner and a merge date before Thursday. | saleemasekrea000 | High | Most work merged on the due date again. | Yes |
| Take the story verdicts first in the Sprint Review, one `AC-nn` at a time, before the open feedback discussion. | Horokk1 | High | No story got a verdict in SPRINT-05. | Yes |

## Carried Actions

| Action | Outcome |
| --- | --- |
| [reports/week-04/sprint-retrospective.md](../week-04/sprint-retrospective.md#actions): "Hold sprint planning on the sprint's first day and record its goal, backlog, and Planned Velocity before any work merges." | Not done: the SPRINT-05 plan merged on 2026-10-29 in [#151](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/151), not on the sprint's first day; re-listed above. |
| [reports/week-04/sprint-retrospective.md](../week-04/sprint-retrospective.md#actions): "Give every part of the assignment a task issue with an owner and a merge date before Thursday." | Not done: most parts' task issues were opened on 2026-10-31, the due date; re-listed above. |
| [reports/week-04/sprint-retrospective.md](../week-04/sprint-retrospective.md#actions): "Take the story verdicts first in the Sprint Review, one `AC-nn` at a time, before the open feedback discussion." | Not done: the Week 5 review took no story verdicts, and the [meeting report](meeting-report.md#action-points) moves them to Week 6; re-listed above. |

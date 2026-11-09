# SPRINT-06 Retrospective

The retrospective of [SPRINT-06](../../docs/project-plan.md#sprint-06), written on 2026-11-08, the sprint's due date.

Correction added on 2026-11-09: the deadline Actual Velocity is **0 points**, matching the corrected [sprint plan](../../docs/project-plan.md#sprint-06). No story had recorded Customer acceptance and all [Definition of Done](../../docs/definition-of-done.md#story) checks completed by 2026-11-08. Of the two stories in the planned 8 points, [US-16](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/190) contributes 0 of 3 and [US-17](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/191) contributes 0 of 5. Their outstanding completion checks carry forward to SPRINT-07.

The [supplemental written response received on 2026-11-09](written-review-transcript.md#dashboard-and-test-questions) confirms that the presented evidence suffices for each of the three asked criteria of US-16 and US-17. The [written-review report](written-review-report.md#outcomes) records those responses and the outstanding failure-log-view question. This later review does not establish closure of all linked tasks or the accountable member's clean-checkout verification, so it adds no completed points without the remaining Definition of Done evidence. The [passing core-task QR-10 check](qr10-evidence.md) also occurred on 2026-11-09; neither result is counted as available by the deadline. The original-review observations below refer to the 2026-11-08 meeting.

## What Went Well

| What went well |
| --- |
| The analytics and observability pipelines run on the university VM with separate `staging` and `production` OpenPanel projects and OpenObserve organizations, and the [dashboard provisioner](../../scripts/provision-telemetry-dashboards.py) recreates all four dashboards repeatably ([#212](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/212)). |
| The [OpenObserve evidence](openobserve-dashboard-evidence.md) records a timed staging failure with its request ID, a log point after 0.729 seconds, and a numeric `server_error` P95 for [SLI-01](../../docs/observability.md#sli-01), and shows that a staging-only request ID is absent from the production organization. |
| The [OpenPanel evidence](openpanel-evidence.md) shows the staging `source=smoke` event, the filter that excludes it from the metric charts, and both environments' product dashboards. |
| The Week 5 follow-up accounted for all 16 due actions and all 13 open questions, each with its outcome or its next owner and date ([#222](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/222)). |
| The Sprint Review was recorded, its [transcript](meeting-transcript.md) was published, and its decisions entered the decision log ([#203](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/203)). |

## What Did Not

| Problem | Root cause |
| --- | --- |
| The observability requirement's `QRT-01` had not run against a failed core-task request by the due date; the only recorded failure used the diagnostic route `/api/diagnostics/fail`. | The test script and the core-task failure case were not written until after the dashboards, so the dashboard check could only use the diagnostic route. |
| The original Sprint Review took no per-criterion story verdict and did not establish that the new version runs on production, so deadline Actual Velocity is 0; the 2026-11-09 written responses are recorded separately above. | The review again spent its time on interface feedback, and the meeting did not start from the ready stories and their `AC-nn` list. |
| Most of the sprint's pull requests merged on the due date, 2026-11-08. | The sprint plan merged on 2026-11-06 in [#199](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/199) and the pipeline and dashboard task issues were opened on 2026-11-05, so owners had no mid-week merge dates. |

## Actions

| Action | Owner | Impact | Reason | Carried |
| --- | --- | --- | --- | --- |
| Find an LLM provider or gateway reachable from the university network, and check generation on staging before the next Sprint Review. | saleemasekrea000 | High | Generation access is still unresolved, and the Customer deferred provider trials to this sprint under [DEC-103](../../docs/decisions.md#dec-103). | Yes |
| Hold sprint planning on the sprint's first day and record its goal, backlog, and Planned Velocity before any work merges. | Byakko-san | High | The SPRINT-06 plan merged on 2026-11-06, days after the sprint started. | Yes |
| Give every part of the assignment a task issue with an owner and a merge date before Thursday. | saleemasekrea000 | High | The task issues were opened on Thursday 2026-11-05, and most work still merged on the due date. | Yes |
| Take the story verdicts first in the Sprint Review, one `AC-nn` at a time, before the open feedback discussion. | Horokk1 | High | The original Sprint Review recorded no story verdicts; the US-16 and US-17 evidence responses arrived in writing on 2026-11-09, after the deadline. | Yes |

## Carried Actions

| Action | Outcome |
| --- | --- |
| [reports/week-05/sprint-retrospective.md](../week-05/sprint-retrospective.md#actions): "Find an LLM provider or gateway reachable from the university network, and check generation on staging before the next Sprint Review." | Not done: the [Week 6 meeting report](meeting-report.md#previous-action-points) records no reachable provider or generation check, and [DEC-103](../../docs/decisions.md#dec-103) defers provider trials; re-listed above. |
| [reports/week-05/sprint-retrospective.md](../week-05/sprint-retrospective.md#actions): "Hold sprint planning on the sprint's first day and record its goal, backlog, and Planned Velocity before any work merges." | Not done: the SPRINT-06 plan merged on 2026-11-06 in [#199](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/199); re-listed above. |
| [reports/week-05/sprint-retrospective.md](../week-05/sprint-retrospective.md#actions): "Give every part of the assignment a task issue with an owner and a merge date before Thursday." | Not done: the pipeline, dashboard, and test issues [#192](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/192)–[#198](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/198) were opened on Thursday 2026-11-05; re-listed above. |
| [reports/week-05/sprint-retrospective.md](../week-05/sprint-retrospective.md#actions): "Take the story verdicts first in the Sprint Review, one `AC-nn` at a time, before the open feedback discussion." | Not done: the [original Week 6 meeting](meeting-report.md) recorded no individual story acceptance. The [2026-11-09 written review](written-review-report.md#outcomes) supplies later US-16 and US-17 evidence responses, but does not fulfil the action to take verdicts first during the original review; re-listed above. |

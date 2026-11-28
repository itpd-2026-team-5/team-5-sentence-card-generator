# SPRINT-08 Retrospective

The retrospective of [SPRINT-08](../../docs/project-plan.md#sprint-08), written on 2026-11-28, the extended Week 8 deadline.

The Actual Velocity is **8 points**: the Customer accepted [US-16](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/190) (3) in [DEC-164](../../docs/decisions.md#dec-164) and [US-17](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/191) (5) in [DEC-165](../../docs/decisions.md#dec-165) at the review on 2026-11-28, a week after the original due date.
Every open SPRINT-08 issue moves to [SPRINT-09](../../docs/project-plan.md#sprint-09).

## What Went Well

| What went well |
| --- |
| The Customer gave explicit verdicts on both stories, so the Actual Velocity is 8 after two sprints at 0. |
| Five counted `UT-01` sessions covered Russian and German learners and three flashcard newcomers, every session's staging events matched the observer's task times, and `QR-11` passes at 4 of 5 ([results](../../docs/usability-tests/ut-01/results.md)). |
| The Customer ran all three acceptance tests on production themselves and passed each one ([DEC-166](../../docs/decisions.md#dec-166) to [DEC-168](../../docs/decisions.md#dec-168)). |
| The configuration plan and evaluation merged on 2026-11-22 in one pull request that closed its issue ([#301](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/301)). |

## What Did Not

| Problem | Root cause |
| --- | --- |
| The counted sessions ran on 27 and 28 November instead of 16–20 November, and the Week 8 submission missed its original 21 November deadline. | No session date was booked in the sprint's first days, and the instrumentation check ([#254](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/254)) was only recorded on 2026-11-26. |
| All five sessions ran remotely, with paraphrased scenarios and the facilitator and observer swapped, against the in-person protocol. | The participants were reachable only online at short notice, and the protocol had no remote variant or printed script for the facilitator to read from. |
| The Customer judged all three threshold goals missed ([DEC-170](../../docs/decisions.md#dec-170)), and `QR-01`, `QR-03`, and `QR-06` moved for the third sprint running. | No sprint scheduled the measured runs the goals and tests need, such as the four-platform return sessions, the 90-card evaluation, or an outside teacher, as dated task issues. |

## Actions

| Action | Owner | Impact | Reason | Carried |
| --- | --- | --- | --- | --- |
| Hold sprint planning on the sprint's first day and record its goal, backlog, and Planned Velocity before any work merges. | Byakko-san | High | The SPRINT-08 plan merged on 2026-11-26 in [#297](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/297), eight days into the sprint. | Yes |
| Give every part of the assignment a task issue with an owner and a merge date before Thursday. | saleemasekrea000 | High | The SPRINT-08 tasks were opened on 2026-11-18 with assignees but no merge dates, and the finding issues on 2026-11-28 with no owners. | Yes |
| Schedule each remaining quality test as a dated task issue with an owner in SPRINT-09, or record why it will not run. | Horokk1 | High | `QR-01`, `QR-03`, and `QR-06` have moved three times without a run. | Yes |
| Book any session or check that needs an outside person with its date in the sprint plan before the sprint starts. | KaramKhaddour | Medium | The usability sessions slipped a week because no date was booked early. | Yes |

## Carried Actions

| Action | Outcome |
| --- | --- |
| [reports/week-07/sprint-retrospective.md](../week-07/sprint-retrospective.md#actions): "Hold sprint planning on the sprint's first day and record its goal, backlog, and Planned Velocity before any work merges." | Not done: the SPRINT-08 plan merged on 2026-11-26 in [#297](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/297); re-listed above. |
| [reports/week-07/sprint-retrospective.md](../week-07/sprint-retrospective.md#actions): "Give every part of the assignment a task issue with an owner and a merge date before Thursday." | Not done: the tasks opened on 2026-11-18 had owners but no merge dates; re-listed above. |
| [reports/week-07/sprint-retrospective.md](../week-07/sprint-retrospective.md#actions): "Take the story verdicts first in the Sprint Review, one `AC-nn` at a time, before the open feedback discussion." | Done: the [review](meeting-report.md#decisions) recorded a verdict on each story, [DEC-164](../../docs/decisions.md#dec-164) and [DEC-165](../../docs/decisions.md#dec-165), before the acceptance tests and the open discussion. |
| [reports/week-07/sprint-retrospective.md](../week-07/sprint-retrospective.md#actions): "Read the survey questions from `surveys.md` in every counted session, and check them off on the observation sheet." | Done: all five counted sessions asked the SEQ after each task and the ten SUS statements, as the [session notes](../../docs/usability-tests/ut-01/sessions/README.md) record. |

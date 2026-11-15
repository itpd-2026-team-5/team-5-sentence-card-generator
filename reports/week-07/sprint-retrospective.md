# SPRINT-07 Retrospective

The retrospective of [SPRINT-07](../../docs/project-plan.md#sprint-07), written on 2026-11-15, the sprint's due date.

The Actual Velocity is **0 points**: no story had a recorded Customer acceptance verdict by the deadline, so [US-16](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/190) contributes 0 of 3 and [US-17](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/191) 0 of 5.
Both stories and every other open SPRINT-07 issue moved to [SPRINT-08](../../docs/project-plan.md#sprint-08).

## What Went Well

| What went well |
| --- |
| The `UT-01` design was merged in small pull requests that each closed one task issue: the record, surveys, session sheet, and analysis plan ([#261](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/261)), the glossary terms and risks ([#263](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/263)), and the Customer's design changes ([#280](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/280)). |
| The participant-code event tagging merged with tests ([#268](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/268)), and the [dry run](../../docs/usability-tests/ut-01/sessions/README.md#dry-run) saw its events reach staging OpenPanel with `source=usability-test` and none reach production. |
| Card generation works again through a gateway after the `response_format` fallback ([#266](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/266)), and the Customer saw production generation in the [Sprint Review](meeting-report.md). |
| The Sprint Review was recorded and its [transcript](meeting-transcript.md) published, and its decisions entered the decision log as `DEC-127` to `DEC-161`. |

## What Did Not

| Problem | Root cause |
| --- | --- |
| The SPRINT-07 plan merged on 2026-11-13 in [#260](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/260), and the `UT-01` task issues were opened on 12 and 13 November, so most of the design merged in the last three days. | The sprint's first days went to Week 6 corrections, and nobody held planning on the sprint's first day. |
| The Sprint Review again gave no per-story verdict, so the Actual Velocity is 0 for the second sprint running. | The review's time went to product and test-design feedback, and the story verdicts were not taken first. |
| The dry run skipped the SEQ and the SUS and used two ratings that are not in the surveys. | The rehearsal ran late on the due date, and the facilitator did not read the questions from the [surveys](../../docs/usability-tests/ut-01/surveys.md). |

## Actions

| Action | Owner | Impact | Reason | Carried |
| --- | --- | --- | --- | --- |
| Hold sprint planning on the sprint's first day and record its goal, backlog, and Planned Velocity before any work merges. | Byakko-san | High | The SPRINT-07 plan merged on 2026-11-13, four days into the sprint. | Yes |
| Give every part of the assignment a task issue with an owner and a merge date before Thursday. | saleemasekrea000 | High | The `UT-01` task issues were opened on Thursday and Friday, with no merge dates. | Yes |
| Take the story verdicts first in the Sprint Review, one `AC-nn` at a time, before the open feedback discussion. | Horokk1 | High | No story verdict was recorded in SPRINT-06 or SPRINT-07. | Yes |
| Read the survey questions from `surveys.md` in every counted session, and check them off on the observation sheet. | saleemasekrea000 | High | The dry run skipped the SEQ and the SUS, which `QR-11` and the analysis plan need. | Yes |

## Carried Actions

| Action | Outcome |
| --- | --- |
| [reports/week-06/sprint-retrospective.md](../week-06/sprint-retrospective.md#actions): "Find an LLM provider or gateway reachable from the university network, and check generation on staging before the next Sprint Review." | Done: generation runs through a gateway after [#266](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/266), merged on 2026-11-14, and the [Sprint Review](meeting-report.md) showed production generation on 2026-11-15. |
| [reports/week-06/sprint-retrospective.md](../week-06/sprint-retrospective.md#actions): "Hold sprint planning on the sprint's first day and record its goal, backlog, and Planned Velocity before any work merges." | Not done: the SPRINT-07 plan merged on 2026-11-13 in [#260](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/260); re-listed above. |
| [reports/week-06/sprint-retrospective.md](../week-06/sprint-retrospective.md#actions): "Give every part of the assignment a task issue with an owner and a merge date before Thursday." | Not done: the `UT-01` task issues were opened on 12 and 13 November without merge dates; re-listed above. |
| [reports/week-06/sprint-retrospective.md](../week-06/sprint-retrospective.md#actions): "Take the story verdicts first in the Sprint Review, one `AC-nn` at a time, before the open feedback discussion." | Not done: the [Week 7 meeting report](meeting-report.md) records no per-story acceptance verdict; re-listed above. |

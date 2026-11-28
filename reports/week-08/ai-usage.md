# AI usage — Week 08

## Tools

- Claude Code, a coding agent, run by `KaramKhaddour` in the repository with the course skill installed.
- TurboScribe, for machine transcripts of the session recordings.

## How we used them

- **Configuration review:** we gave the agent the repository and asked it to inventory the configuration into `CFG-nn` items and to draft the [configuration evaluation](cm-evaluation.md). It read the workflows, manifests, runbook, and the branch protection's required checks from GitHub. The agent was given the [configuration plan](../../docs/configuration-plan.md) it had drafted when it wrote the evaluation, glossary terms, and risks. A member checked the item owners and the evaluation's evidence before merging [#301](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/301).
- **Usability results:** TurboScribe transcribed the five session recordings. We gave the agent the transcripts, the observer's clock times, the rating answers, and screenshots of each session's staging OpenPanel events. It drafted the sanitized session notes, computed the times, the SEQ medians, and the SUS scores, and drafted the [results](../../docs/usability-tests/ut-01/results.md) and findings. The agent was given the raw, identifying material, not only the sanitized results; it kept names out of every public file, and the raw files went to the private repository.
- **Review and records:** the agent drafted the [meeting script](meeting-script.md), the three acceptance tests, and a speaking sheet for the review. After the meeting, it used the [transcript](meeting-transcript.md) to write `DEC-162` to `DEC-170`, the acceptance-test run records, the threshold outcomes, this report's release and velocity records, and the [retrospective](sprint-retrospective.md).

## What worked

- Recomputing every SUS score and median from the raw answers with a script, instead of by hand, found no arithmetic slip, and the same script gave the five-session totals.
- The agent caught three things we would have missed before the review:
  - `P-07`'s pre-test said they had used the product, which we then confirmed was an entry mistake.
  - The facilitator named **Texts** in `P-07`'s main task, which makes it `Assisted`.
  - The `QR-11` verdict changes from fail to pass once the fifth session is counted.
- Reading the OpenPanel screenshots against the task times confirmed two findings with independent evidence: no study answers and three quick regenerations for `P-07`.

## What did not work

- The agent's first draft of the configuration plan used connection verbs that are not one of the five allowed kinds, and miscounted the check steps the documentation leaves out; it found and fixed both when it re-checked the plan against the course rules and `package.json`.
- The agent could not reach OpenPanel or the VM, which are on the university network, so a member exported the events as screenshots and ran the deploy. The agent read only those exports.
- TurboScribe attributed some lines to the wrong speaker, so the task outcomes were judged from the recording's sense and the observer's times, not from the speaker labels.
- No generated text went into a report without a member reading it, and every number in the results was recomputed from the raw answers.

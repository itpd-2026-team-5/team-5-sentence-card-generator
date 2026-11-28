# Week 08 report — Sentence Card Generator, Team 5

The Week 8 submission of ITPD Team 5, the Sentence Cards Generator: the `UT-01` usability results, the configuration review, and the close of [SPRINT-08](../../docs/project-plan.md#sprint-08).
The deadline was extended to 2026-11-28; the work below was completed then, a week after the original 21 November deadline, as [Deviations](#deviations) declares.

## Summary

- **Usability test:** five counted sessions ran, three Russian and two German learners, three of them new to flashcard apps.
  - All five completed the main task, and four did it unaided, so the main-task completion is 80% with `n=5`.
  - The median main-task time is 173 seconds, the median SEQ is 6, 6, and 5 for the three tasks, and the SUS has a median of 85.0 and a mean of 78.5.
  - Each session's staging events matched the observer's task times.
- **`QR-11`:** [`QR-11 QRT-01`](../../docs/quality-requirements/qr/QR-11.md#qrt-01) **passes** at 4 of 5 against the 80% bar.
  At the review, with four sessions, the Customer recorded 3 of 4 as a failure ([DEC-163](../../docs/decisions.md#dec-163)); the fifth ran afterwards under the same bar.
- **Conclusion and response:** adding a text and choosing words works. Learners struggle after generation: finding the new cards, knowing what the study ratings mean, and telling the rewrite icons apart.
  - The team fixes the first two first: [#308](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/308) (Critical) and [#309](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/309) (Major).
  - [#310](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/310) (Minor) follows in SPRINT-09.
  - The Customer's preferred in-flow tutorial ([DEC-162](../../docs/decisions.md#dec-162)) stays in the backlog.
- **Configuration review:** the [configuration plan](../../docs/configuration-plan.md) has 23 `Active` items and one `Dropped`, judged by six local goals.
  The first change cuts the two stale copies of the check commands from `AGENTS.md` and `CONTRIBUTING.md` and keeps one corrected list, at the cost of one more link for an agent.
  The team keeps the release, planning, and decision records as they are.
- **Review:** the [Weeks 8 and 9 Customer review](meeting-report.md) on 2026-11-28 accepted [US-16](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/190) ([DEC-164](../../docs/decisions.md#dec-164)) and [US-17](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/191) ([DEC-165](../../docs/decisions.md#dec-165)).
  No candidate story moved out. The Customer called the product "a pretty solid MVP" but gave no renewed verdict on the US-01 to US-03 [MUP candidate](../../docs/project-plan.md#mls-03), which stays an open question.
  The Customer also passed the three acceptance tests on production and judged all three threshold goals missed ([DEC-170](../../docs/decisions.md#dec-170)).
- **Sprint close:** the Actual Velocity is 8, and [`REL-08`](../../docs/project-plan.md#rel-08) is [v0.8.0](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/releases/tag/v0.8.0), which adds local Piper pronunciation.
  The tests that are not `Passes`, `QR-01`, `QR-03`, and `QR-06`, are in the [testing plan](../../docs/project-plan.md#quality-requirement-testing-plan).
- **Analytics:** the focus metric, [weekly completed study reviews](../../docs/analytics.md#weekly-completed-study-reviews), has no production value yet. The production OpenPanel view showed no data at the review, and finding out why is an action point; the metric needs real learners' study ratings on production.
  Test traffic is excluded and not presented as a value. Response times and errors are on the [observability](../../docs/observability.md) dashboard the Customer accepted.

## Usability test

The [results](../../docs/usability-tests/ut-01/results.md) are the record; this is the summary.

- **Sessions:** [P-02](../../docs/usability-tests/ut-01/sessions/P-02.md), [P-04](../../docs/usability-tests/ut-01/sessions/P-04.md), [P-05](../../docs/usability-tests/ut-01/sessions/P-05.md), [P-06](../../docs/usability-tests/ut-01/sessions/P-06.md), and [P-07](../../docs/usability-tests/ut-01/sessions/P-07.md), remote, on 27 and 28 November, all counted.
- **Results:** 5 of 5 reached the main task's end state and 4 of 5 unaided; median time 173 seconds; secondary task 1 had 3 unaided, 1 assisted, and 1 failed, and secondary task 2 had 3 unaided and 2 assisted.
- **SEQ and SUS:** median SEQ 6 (main), 6 (study), 5 (replace a sentence); SUS mean 78.5 and median 85.0 with `n=5`, four of five above 68.
- **Instrumentation comparison:** the [staging events](../../docs/usability-tests/ut-01/results.md#instrumentation-comparison) agree with the observed outcomes in every session. The failed study task shows no study answer, and the missing progress indicator shows as three regenerations in one minute. The German sessions' `language` property reads `of`.
- **Conclusion:** the [conclusion](../../docs/usability-tests/ut-01/results.md#conclusion) answers the three research questions, and the product response commits to [#308](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/308) and [#309](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/309) and declines an About page.
- **Findings and triage:**
  - [Finding 1](../../docs/usability-tests/ut-01/results.md#finding-1), Critical: new cards are hard to find after generation; [#308](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/308), scheduled in SPRINT-08, not landed in `REL-08`, moved to SPRINT-09.
  - [Finding 2](../../docs/usability-tests/ut-01/results.md#finding-2), Minor: look-alike rewrite icons and no progress state; [#310](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/310), SPRINT-09.
  - [Finding 3](../../docs/usability-tests/ut-01/results.md#finding-3), Major: the study ratings are unexplained on first use; [#309](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/309), SPRINT-09.
- **`QR/QRT`:** [`QR-11 QRT-01`](../../docs/quality-requirements/qr/QR-11.md#qrt-01) is `Passes`, `Checked: SPRINT-08`, in the [testing plan](../../docs/project-plan.md#quality-requirement-testing-plan).
- **Raw evidence:** the transcripts, task times, consent records, and the [filtered telemetry export](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator-usability-data) are in the private usability-data repository, and the recordings are in the recordings folder, whose link is in the Moodle submission.
  The private repository is excluded from the link check in [`.lycheeignore`](../../.lycheeignore) because it needs authentication.

## Configuration management

- **Plan:** [docs/configuration-plan.md](../../docs/configuration-plan.md), `**Reviewed:** 2026-11-22`, with 23 `Active` items across the five groups and one `Dropped` item.
- **Evaluation:** [reports/week-08/cm-evaluation.md](cm-evaluation.md), against the baseline `1a9bae1`, the head of `main` on 2026-11-22.
- **Local goals:** getting a change safely into `main`; running the same checks locally as in CI; delivering the same build to staging and production; releasing what was built; planning and tracking the sprint; keeping the context trustworthy for a reader or an agent.
- **First change:** keep one corrected list of check commands on the setup page and cut the copies in `AGENTS.md` and `CONTRIBUTING.md`; its tradeoff is one more link for an agent to follow.
- **What is kept:** the changelog, tags, and release blocks; the milestones, project plan, and decision log.

## Threshold review

| Goal | Current measure | New data can settle it | Proposal |
| --- | --- | --- | --- |
| [TOS-01](../../docs/threshold-of-success.md#tos-01) | Four outside learners on four desktop and mobile Firefox and Chrome combinations each import a text, mark 10 words, generate, study, and return on a later day, by the end of Week 8 | No: the deadline has passed and no measured run took place; analytics cannot show the return session per platform | — |
| [TOS-02](../../docs/threshold-of-success.md#tos-02) | 30 first-generated cards in each of Russian, English, and German, 24 of 30 passing per language, by the end of Week 8 | No: it needs reviewer and learner verdicts, which no analytics event carries | — |
| [TOS-03](../../docs/threshold-of-success.md#tos-03) | An outside teacher reviews a shared 10-card deck, corrects and regenerates cards, and access checks pass, by the end of Week 8 | No: the deadline has passed and no outside teacher took part | — |

[TOS-01](../../docs/threshold-of-success.md#tos-01) is `Missed`.
[TOS-02](../../docs/threshold-of-success.md#tos-02) is `Missed`.
[TOS-03](../../docs/threshold-of-success.md#tos-03) is `Missed`.

The team proposed no new measure: the Customer rejected replacing the goals at the end to claim success, and kept the original measures and deadlines ([DEC-170](../../docs/decisions.md#dec-170)).

## Week 9 handoff

- **Results:** the [UT-01 results](../../docs/usability-tests/ut-01/results.md) are complete for five sessions, and the three finding issues are in SPRINT-09.
- **Configuration:** the [configuration plan](../../docs/configuration-plan.md) is the maintained inventory. The evaluation's [goal sections](cm-evaluation.md#getting-a-change-safely-into-main) and [first change](cm-evaluation.md#the-first-change) are a recommendation; none is implemented yet.
- **Repository state:** `main` carries `v0.8.0`, deployed to production at `462657a`, the build the Customer used for the acceptance tests ([UAT record](../../docs/user-acceptance-tests.md)).
- **Private evidence:** the private repository is `team-5-sentence-card-generator-usability-data`; the recordings folder, with recordings `P-02`, `P-04`, `P-05`, `P-06`, and `P-07`, is linked from the Moodle submission.
- **Evidence for the deck:** the QR-11 pass at 4 of 5, the SUS median of 85.0, Finding 1 and its fix, the three accepted acceptance tests, and the Customer's verdict that the goals were missed.
- **Open for Week 9:** the fix in [#308](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/308), the written follow-up to the Customer with the handoff questions, and the [action points](meeting-report.md#action-points).

## Coverage

| Deliverable | Where |
| --- | --- |
| Sprint plan | [docs/project-plan.md#sprint-08](../../docs/project-plan.md#sprint-08) |
| Usability results | [docs/usability-tests/ut-01/results.md](../../docs/usability-tests/ut-01/results.md) |
| Sanitized session notes | [docs/usability-tests/ut-01/sessions/](../../docs/usability-tests/ut-01/sessions/README.md): `P-02.md`, `P-04.md`, `P-05.md`, `P-06.md`, `P-07.md` |
| `QR-11` and its test | [docs/quality-requirements/qr/QR-11.md](../../docs/quality-requirements/qr/QR-11.md) and its [`QRT-01`](../../docs/quality-requirements/qr/QR-11.md#qrt-01) |
| Findings and their issues | [docs/usability-tests/ut-01/results.md#findings](../../docs/usability-tests/ut-01/results.md#findings) |
| Threshold review | [#threshold-review](#threshold-review) |
| Configuration management | [#configuration-management](#configuration-management) |
| Glossary | [docs/glossary.md](../../docs/glossary.md#configuration-management) |
| Risk register | [docs/risks.md](../../docs/risks.md) |
| `REL-08` | [docs/project-plan.md#rel-08](../../docs/project-plan.md#rel-08), the [v0.8.0 release](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/releases/tag/v0.8.0), and the [changelog section](../../CHANGELOG.md#080---2026-11-28) |
| Sprint retrospective | [reports/week-08/sprint-retrospective.md](sprint-retrospective.md) |
| AI usage | [reports/week-08/ai-usage.md](ai-usage.md) |
| Week 7 action points | [reports/week-08/meeting-report.md#previous-action-points](meeting-report.md#previous-action-points) |
| Week 7 open questions | [reports/week-08/meeting-report.md#previous-open-questions](meeting-report.md#previous-open-questions) |
| Sprint Review | [reports/week-08/meeting-report.md](meeting-report.md) |
| Meeting script | [reports/week-08/meeting-script.md](meeting-script.md) |
| Meeting transcript | [reports/week-08/meeting-transcript.md](meeting-transcript.md) |
| Week 9 handoff | [#week-9-handoff](#week-9-handoff) |

## Contribution

| Member | Work |
| --- | --- |
| `KaramKhaddour` | Facilitated the five counted sessions and moderated the [Customer review](meeting-report.md); added local Piper pronunciation ([#299](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/299)); wrote the configuration plan and evaluation ([#301](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/301)) and the results, script, and acceptance tests ([#311](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/311)); deployed `462657a` to production; reviewed [#313](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/313). |
| `saleemasekrea000` | Observed the five sessions; recorded the instrumentation verification ([#305](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/305)); fixed the link check's GitHub links ([#307](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/307)); reviewed and merged [#301](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/301) and [#297](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/297). |
| `Byakko-san` | Planned SPRINT-08 and moved the course skill pin ([#297](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/297)). |
| `Horokk1` | Took notes at the review and wrote its [report and transcript](meeting-report.md) ([#313](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/313)); reviewed [#311](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/311). |

## Repository evidence

- **Merged pull requests:**
  - sessions and results: [#305](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/305) and [#311](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/311), which closed [#257](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/257)
  - fix: [#299](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/299)
  - configuration work: [#301](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/301), which closed [#300](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/300)
  - review: [#313](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/313)
- **Latest green runs on `main`:**
  - [Link check](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/runs/46159057710)
  - [Markdown check](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/runs/46159057689)
  - [Workflow lint (`actionlint`)](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/runs/46159057727)
  - [Product checks](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/runs/46159057762)

## Deviations

- **Late submission:** the Week 8 work was completed on 2026-11-28 under the extended deadline, a week after the original 21 November deadline; the Customer review was held the same day.
- **Sessions:** the counted sessions ran on 27 and 28 November, not in the planned 16–20 November window. All five ran remotely on the participants' own computers rather than in person on the team's laptop, the scenarios were paraphrased, and `KaramKhaddour` facilitated with `saleemasekrea000` observing instead of the planned roles, per the [limitations](../../docs/usability-tests/ut-01/results.md#limitations).
- **Fifth session after the review:** `P-02` ran after the Customer review, so the review judged four sessions and recorded a failure; the record now counts five and `QR-11` passes, which the written follow-up to the Customer reports.
- **Fix not in `REL-08`:** [#308](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/308), the significant finding's fix, was scheduled in SPRINT-08 but did not land in `REL-08`, and moves to SPRINT-09.
- **Testing-plan rows:** `QR-01`, `QR-03`, and `QR-06` moved to SPRINT-09 with their reasons in the [testing plan](../../docs/project-plan.md#quality-requirement-testing-plan).
- **Recordings folder:** the recordings folder is still in a personal Drive rather than a team-owned location, as declared in Week 7.
- **Focus metric:** no production analytics value is shown, because the production OpenPanel view showed no data at the review.

## Privacy

No private-only material was committed to the product repository, and no participant identity was committed to it.

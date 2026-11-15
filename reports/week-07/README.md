# Week 07 report — Sentence Card Generator, Team 5

## Summary

The team planned [SPRINT-07](../../docs/project-plan.md#sprint-07) and designed [UT-01](../../docs/usability-tests/ut-01/README.md) for first-time Russian and German learners, including people new to flashcard apps. The design target is five adults, with at least three counted sessions required. The Customer reportedly confirmed the [80% unaided main-task target and the 16–20 November session plan](customer-follow-up.md#confirmed-questions), with results due by 21 November. The [QR-11 manual test](../../docs/quality-requirements/qr/QR-11.md#qrt-01) remains `Not verified`; no participant result is claimed.

The [Week 7 Customer review](meeting-report.md) and [sanitized transcript](meeting-transcript.md) record the product and test-design feedback. The three quality checks scheduled for SPRINT-07 were not completed and have been moved, with individual reasons, to SPRINT-08 in the [testing plan](../../docs/project-plan.md#quality-requirement-testing-plan). `REL-07`, the sprint retrospective, and the final submission evidence remain to be completed separately.

## Usability test

[UT-01](../../docs/usability-tests/ut-01/README.md) has one text-to-card main task followed by a deck-study task and a sentence-regeneration task, with the [same scenario structure and outcome rules](../../docs/usability-tests/ut-01/sessions/README.md#scenario-cards) for Russian and German learners. The [surveys](../../docs/usability-tests/ut-01/surveys.md) include screening, SEQ after each task, SUS, and open-ended questions. The [analysis plan and evidence map](../../docs/usability-tests/ut-01/README.md#analysis-plan) were written before counted sessions.

The [instrumentation design](../../docs/usability-tests/ut-01/README.md#instrumentation) tags staging test events with a participant code and excludes them from product metrics. The code is merged, but the [teammate dry run](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/252) and [live staging-event verification](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/254) have no recorded result. Issue #254 is scheduled in SPRINT-08, before the first counted session.

The public [consent template](../../docs/usability-tests/ut-01/consent.md) and [private usability-data repository](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator-usability-data) are in place. On 2026-11-15, KaramKhaddour reported instructor access to the private repository and recordings folder; those opening checks were not independently observed. The folder is in their personal My Drive because Shared drives are unavailable in that account, so it does not meet the team-owned storage requirement. This deviation and the remaining checks are tracked under [#248](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/248). The folder link and access instructions are in the private repository, not here. The private repository is excluded from the link check in [`.lycheeignore`](../../.lycheeignore) because its access is restricted. Session dates will be arranged with participants on the university network against staging, with seed reset and verified instrumentation before the first counted session. The [results stub](../../docs/usability-tests/ut-01/results.md) and triage plan are ready for SPRINT-08; recruitment and counted sessions are not claimed as completed.

## Coverage

| Deliverable | Artifact or current state |
| --- | --- |
| Sprint plan | [SPRINT-07 and SPRINT-08](../../docs/project-plan.md#sprint-07) |
| UT-01 test record | [UT-01](../../docs/usability-tests/ut-01/README.md) and [index](../../docs/usability-tests/README.md) |
| Surveys and post-test | [surveys.md](../../docs/usability-tests/ut-01/surveys.md) |
| Tasks and protocol | [UT-01 tasks](../../docs/usability-tests/ut-01/README.md#the-tasks) and [session sheet](../../docs/usability-tests/ut-01/sessions/README.md) |
| Test instrumentation | [UT-01 instrumentation](../../docs/usability-tests/ut-01/README.md#instrumentation) and [event table](../../docs/analytics.md#the-events); live verification pending |
| Consent template | [consent.md](../../docs/usability-tests/ut-01/consent.md) |
| Private usability-data repository | [Restricted repository](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator-usability-data); instructor access reported by KaramKhaddour, independent opening check not recorded |
| Recordings folder | Personal My Drive folder; instructor access reported, Restricted setting not independently verified, team ownership not met; private link and access instructions are in the private repository |
| QR-11 and manual QRT-01 | [QR-11](../../docs/quality-requirements/qr/QR-11.md); `Not verified` until counted results exist |
| Recruitment and session plan | [Participant profile](../../docs/usability-tests/ut-01/README.md#participant-profile) and [schedule](../../docs/usability-tests/ut-01/README.md#schedule) |
| Week 8 handoff | The [analysis and triage plan](../../docs/usability-tests/ut-01/README.md#analysis-plan) is written; recruitment, dry run, instrumentation verification, independent access checks, and team-owned storage remain open |
| Glossary and risk register | [Glossary](../../docs/glossary.md) and [risks](../../docs/risks.md) |
| Week 6 follow-up | [Previous action outcomes](meeting-report.md#previous-action-points) and [previous question outcomes](meeting-report.md#previous-open-questions) |
| Customer review | [Meeting report](meeting-report.md), [script](meeting-script.md), [transcript](meeting-transcript.md), and [Telegram follow-up record](customer-follow-up.md) |
| REL-07 | [Release plan block](../../docs/project-plan.md#rel-07) is still empty; release not claimed |
| Sprint retrospective | Not yet recorded |
| AI usage | [Open AI usage PR #277](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/277); not yet merged in this report's base commit |

## Deviations

- **Recordings are in a personal My Drive folder.** Shared drives are not visible in KaramKhaddour's account, so the present folder is not team-owned as Assignment 7 requires. Instructor access was reported but not independently verified here. The link and access instructions are stored privately; the team must keep access restricted, use signed consent before recording, and move recordings to team-owned storage if one becomes available. [Issue #248](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/248) remains open for the unmet ownership and access checks.
- **QR-01 QRT-01 moved from SPRINT-07 to SPRINT-08.** The specified `backend/tests/test_confidentiality.py` CI test is absent, and there is no recorded separate-account, real-key deployed isolation result. The [testing-plan row](../../docs/project-plan.md#quality-requirement-testing-plan) remains `Not verified`, with `Checked: None`.
- **QR-03 QRT-01 moved from SPRINT-07 to SPRINT-08.** The required 30 consecutive first-generated cards in each of Russian, English, and German, with reviewer and learner judgments, were not recorded. The [testing-plan row](../../docs/project-plan.md#quality-requirement-testing-plan) remains `Not verified`, with `Checked: None`.
- **QR-06 QRT-01 moved from SPRINT-07 to SPRINT-08.** The specified `scripts/check-phone-layout.mjs` is absent, and the complete 360- and 390-pixel learner and teacher workflow check has no recorded result. The [testing-plan row](../../docs/project-plan.md#quality-requirement-testing-plan) remains `Not verified`, with `Checked: None`.

These moves do not claim that a check passed or failed. SPRINT-08 must implement or run the full procedures and link dated evidence before changing their verdicts.

## Privacy

No private-only material or participant identity was committed to the product repository. The meeting transcript is published in sanitized form with the Customer's reported permission; the Telegram message itself, consent signatures, raw notes, and recordings are not published here.

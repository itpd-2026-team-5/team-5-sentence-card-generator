# Week 06 report — Sentence Card Generator, Team 5

The [OpenPanel evidence](openpanel-evidence.md) shows the staging smoke event, its exclusion filter, and the staging and production product dashboards.

The [OpenObserve dashboard evidence](openobserve-dashboard-evidence.md) records the staging and production SLI-01 panels, production request-log delivery, and a staging diagnostic failure series. The [late QR-10 core-task check](qr10-evidence.md) records the 2026-11-09 passing staging result, including a matching log within 0.861 seconds and numeric P95 within 9.175 seconds. This evidence was produced after the 2026-11-08 deadline and is included in the Week 6 late submission.

The [AI usage report](ai-usage.md) records the tools used for this week's work and how the output was reviewed.

## Summary

This update covers the Part 10 threshold review for [SPRINT-06](../../docs/project-plan.md#sprint-06), prepared on 2026-11-08 from the [analytics plan](../../docs/analytics.md), the [observability plan](../../docs/observability.md), and the [Customer review record](meeting-report.md#decisions).
All three success goals remain Open with their existing Week 8 measures; this review recommends no change to the success bar.

## Threshold review

All three goals were Open when this review started.
The table assesses what the defined telemetry can establish; it does not claim a measured dashboard value or a completed validation run.

| Goal | Current measure | New data can settle it | Proposal |
| --- | --- | --- | --- |
| [TOS-01](../../docs/threshold-of-success.md#tos-01) | By the end of Week 8, each of three learners outside the team imports a text they chose, marks at least 10 words, generates a card for each marked word using a real LLM, and completes a study session using only the deck or decks they selected, without step-by-step assistance from the team. Each learner returns on a later day and completes a review scheduled by the application's spaced-repetition algorithm, with their previous progress preserved. An anonymized validation report records the application version, selected decks, task completion, assistance, failures, and review results for all three learners. The goal passes only if all three learners complete both sessions under these conditions. | No. [Texts added](../../docs/analytics.md#texts-added), [marked words](../../docs/analytics.md#marked-words), [generated cards](../../docs/analytics.md#generated-cards), and [weekly completed study reviews](../../docs/analytics.md#weekly-completed-study-reviews) show aggregate core-task activity. The events have no participant identifier and cannot establish three distinct external learners, their independent completion, selected decks, later-day return, or preserved progress. [SLI-01](../../docs/observability.md#sli-01) provides operational context rather than learner-validation evidence. | — |
| [TOS-02](../../docs/threshold-of-success.md#tos-02) | By the end of Week 8, evaluate 30 consecutive first-generated cards for distinct marked words in each of Russian, English, and German, for 90 cards in total. Record the intended learner's level, source contexts, deck instructions, model, and generation settings before generating each language's sample. A reviewer proficient in that language checks that each generated sentence differs from the source sentence, uses the target word in its source meaning, is grammatical and natural, and has correct sentence and target-word translations. A sentence is grammatical and natural when the reviewer identifies no grammatical error or wording they would correct for idiomatic usage; the contextual translation passes when the reviewer identifies no mistranslation of the target word or sentence meaning. The intended learner checks that they understand the sentence apart from the target word, can identify no additional unfamiliar vocabulary or grammar, and would keep the card unchanged. A card passes only when every reviewer and learner check passes and the card satisfies any explicit deck instructions, including sentence-length limits. At least 24 of 30 cards must pass in each language separately. An anonymized evaluation report records all sampled outputs, the input settings, each check's verdict, reasons for failures, and per-language totals. Failed or missing outputs count as failures and remain in the sample; edited or regenerated replacements do not replace first-generation results. | No. [Generation failure rate](../../docs/analytics.md#generation-failure-rate) measures failed generation attempts, not linguistic correctness or suitability. [Regeneration and rewrite events](../../docs/analytics.md#the-events) show revision activity without a first-generation sample or reviewer and learner verdicts; lack of a rewrite does not prove a card passes. SLI-01 measures request duration and outcome, not card quality. The language-specific evaluation remains necessary. | — |
| [TOS-03](../../docs/threshold-of-success.md#tos-03) | By the end of Week 8, a learner explicitly shares a deck containing at least 10 cards with a teacher outside the team. Without step-by-step assistance from the team, the teacher reviews all 10 cards, saves at least one manual correction, and regenerates and saves at least one other card using their own API key. The learner then sees and studies both saved card versions in the application. Access checks using the teacher's account confirm that a separate unshared deck cannot be listed or read through the interface or direct requests, and that the learner's API key is absent from responses available to that account. An anonymized validation report records the application version, completed steps, before-and-after card contents, and access-check results without exposing personal API keys. The goal passes only if the complete review workflow and all access checks succeed. | No. [Teacher approval, regeneration, and study events](../../docs/analytics.md#the-events) indicate activity without deck, card, or participant identifiers that link the complete workflow. They do not establish manual corrections, who supplied a key, the learner studying the saved versions, or access isolation. SLI-01 and request logs diagnose technical failures but do not establish the required authorization and key-isolation verdicts. The external-teacher workflow and access checks remain necessary. | — |

[TOS-01](../../docs/threshold-of-success.md#tos-01) remains **Open** after this review.

[TOS-02](../../docs/threshold-of-success.md#tos-02) remains **Open** after this review.

[TOS-03](../../docs/threshold-of-success.md#tos-03) remains **Open** after this review.

For TOS-01, no revised measure or additional analytics-measured goal is proposed because aggregate activity does not establish independent completion and retention by the three external learners; the existing two-session validation remains the appropriate evidence.

For TOS-02, no revised measure is proposed because generation failures and rewrites cannot replace the per-language reviewer and learner checks or the first-generation sampling rule; the existing 80% threshold remains meaningful.

For TOS-03, no revised measure is proposed because event counts cannot replace the end-to-end teacher/learner workflow and negative access checks; the current measure preserves both the usable correction outcome and privacy protections.

All three measures land in Week 8, and the available record supplies neither a settled outcome nor evidence that a goal is already impossible.
No numerical analytics target is added: the [focus metric](../../docs/analytics.md#weekly-completed-study-reviews) remains an activity indicator, and this review has no verified external-user baseline from which to justify a separate success threshold.

## Week 5 follow-up

The Part 11 review accounts for all 16 Week 5 actions due in Week 6 and all 13 previous open questions in the [previous-action outcomes](meeting-report.md#previous-action-points) and [previous-question outcomes](meeting-report.md#previous-open-questions).
Each incomplete action names its missing evidence and the next step, owner, and Week 7 planning deadline; each unresolved question remains in [Open questions](meeting-report.md#open-questions).
The follow-up incorporates repository evidence available after the meeting while preserving the Week 5 record and the meeting's actual decisions.

The [Product checks run](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/runs/42501364765) passes on main at `3cde59f27dd68f2e7839c0b6fa918c4dca46dcf2`.
Those fake-provider and mocked-request checks support the implementation review; deployed/runtime test statuses remain in the [quality requirement testing plan](../../docs/project-plan.md#quality-requirement-testing-plan).
The [driver-to-container map](architecture-review.md#driver-to-container-review-map) is prepared for Customer review, and the [follow-up preparation](follow-up-tasks.md#implementation-evidence-used-to-scope-follow-up-tasks) now distinguishes existing implementation from remaining checks.
[ASM-01 and ASM-03](../../docs/assumptions.md) retain their Open status with explicit Week 6 follow-ups.
The [pronunciation comparison](pronunciation-options.md) covers the three TTS approaches and proposes playback/failure checks; no listening or deployment result is claimed.

## Deviations

The QR-10 core-task check passed on 2026-11-09, one day after the SPRINT-06 deadline. Its actual date, response ID, timings, and checkout commit are retained in the [late Week 6 evidence](qr10-evidence.md); the Week 6 submission will incur the applicable late penalty. This does not replace the missing Customer acceptance verdict for US-17.

Several Week 5 actions due before the Week 6 meeting remain only partly verified, and the transcript does not answer every previous open question.
The team confirmed that no additional external validation or Customer answers are available beyond the transcripts.
The missing checks and Customer responses are carried to the existing Week 7 owner/deadline assignments; the report does not treat partial demonstrations, code inspection, or passing CI as completion of those obligations.
The [publication record](follow-up-tasks.md#task-and-comment-publication-record) links the nine created tasks, story change comments, and dashboard-task updates; Task-type assignment and clearing the old milestone on reopened #31/#32 still require metadata correction.

# Week 7 Customer Validation Script

## Context

Our problem-space sentence: language learners need to turn words chosen from their own texts into useful sentence cards, study them regularly, and obtain teacher feedback when they need it.

We believe the deployed text-to-card workflow can support a first-time learner, but the instructions, deck navigation, study scheduling, and card controls still need validation.
The proposed [UT-01 design](../../docs/usability-tests/ut-01/README.md) targets five English-reading learners of Russian at A1-B1, with previous flashcard-app experience.
We need the Customer to challenge that profile, the tasks, and the proposed success measure before recruitment and counted sessions.
Bring the evidence and remaining questions from the [Week 6 action points](../week-06/meeting-report.md#action-points) and [open questions](../week-06/meeting-report.md#open-questions).

Target: establish whether the usability test will answer the Customer's questions, agree the participant profile and meaningful success criteria, and settle the preparation, session arrangements, and results date for Week 8.

Plan for 30 minutes and ask for 60 if the Customer can give it.
Agenda allocations are **30-minute plan / 60-minute plan** and total 30 and 60 minutes.
Prioritize questions 12, 15, and 24, keep product demonstrations focused in the shorter plan, and record unanswered questions for follow-up.
The Customer reviews the design rather than taking part as a usability participant.

## Agenda

1. **Permissions (2 / 3 min).**
   Show: nothing.
   Ask questions 1-3 separately before recording and record each answer.
2. **Previous commitments and production (3 / 4 min).**
   Show: the Week 6 report linked above, the [deployment runbook](../../docs/deployment.md), the production instance, and the current [SPRINT-07 backlog](../../docs/project-plan.md#sprint-07).
   Identify the environment and deployed commit; demonstrate the configured generation provider without exposing keys or private addresses.
   Present ready stories against their current acceptance criteria and distinguish working behavior from checks still outstanding.
   Ask questions 4-5.
3. **First-time learner: text to cards (4 / 7 min).**
   Show: empty learner views, Add text, a sample text, word selection, destination decks, generated cards, and the card editor.
   Walk from adding a text to choosing two words and generating cards; inspect instructions, repeated-word highlights, existing-card information, regeneration guidance, teacher-review controls, Archive, and Delete.
   Ask questions 6-8.
4. **Decks, study, and card progress (3 / 6 min).**
   Show: the deck list, a deck's card list, reordering, Today, a single-deck study session, the return destination, and the To rewrite view.
   Compare daily scheduling with studying one deck, and inspect individual and proposed group actions.
   Ask questions 9-11.
5. **Research questions, participants, and recruitment (4 / 6 min).**
   Show: [UT-01](../../docs/usability-tests/ut-01/README.md#research-questions), its participant profile, recruitment target, and the [screening survey](../../docs/usability-tests/ut-01/surveys.md#pre-test).
   Present five participants as the target and three as the minimum, all aged 18 or older and outside the team.
   Check language coverage, prior Anki or flashcard experience, and recruitment channels before treating the proposed profile as settled.
   Ask questions 12-13.
6. **Tasks, surveys, and the usability requirement (3 / 6 min).**
   Show: UT-01's main text-to-card task and two secondary tasks, its success and help rules, the [surveys](../../docs/usability-tests/ut-01/surveys.md), and [QR-11 and QRT-01](../../docs/quality-requirements/qr/QR-11.md).
   Review the fixed task order, time limits, Unaided/Assisted/Failed outcomes, SEQ after each task, SUS, and post-test questions.
   Present the proposed 60% unaided main-task completion bar for challenge; keep completion, task time, ratings, and generated-card quality separate.
   Ask questions 14-15.
7. **Staging and instrumentation readiness (3 / 6 min).**
   Show: staging, a reset seed, [UT-01's instrumentation](../../docs/usability-tests/ut-01/README.md#instrumentation), the [analytics events](../../docs/analytics.md#the-events), and the staging event store through privately shared access.
   Walk through text addition, word selection, generation, study, and rewrite events with a test participant code; check session linkage and separation from production traffic.
   Present available verification evidence, identify anything still pending, and arrange a teammate dry run and instrumentation verification before the first counted session.
   Ask question 16.
8. **Consent, private evidence, and access (2 / 4 min).**
   Show: the [consent template](../../docs/usability-tests/ut-01/consent.md) and [consent and data plan](../../docs/usability-tests/ut-01/README.md#consent-and-data), the private repository invitation, and the recordings-folder access arrangement.
   Explain required consent, optional quotes, withdrawal, sanitized public evidence, private raw data, and deletion after grading.
   Keep identities, recordings, folder addresses, and credentials out of public material.
   Ask questions 17-18.
9. **Product scope and quality expectations (2 / 7 min).**
   Show: the [minimum usable product goal](../../docs/project-plan.md#mls-03), [threshold of success](../../docs/threshold-of-success.md), [pronunciation options](../week-06/pronunciation-options.md), generation examples, and deployment and personal-key settings.
   Review what a complete learner scenario must include and which quality expectations should become measurable requirements.
   Compare regeneration counts with controlled prompt examples and expert assessment without treating either as an agreed quality metric.
   Ask questions 19-22.
10. **Open questions and the Week 8 execution plan (2 / 8 min).**
    Show: the note taker's unresolved questions, the Week 6 open-question table, UT-01's [schedule](../../docs/usability-tests/ut-01/README.md#schedule), and the [SPRINT-08 plan](../../docs/project-plan.md#sprint-08).
    Resolve or assign the remaining questions, confirm how sessions will be arranged, and agree a results date and review.
    Agree at least two action points with GitHub-username owners and deadlines after Week 7, including at least one in Week 8.
    Ask questions 23-24.
11. **Read back decisions and action points (2 / 3 min).**
    Show: the note taker's decisions, reasons, unresolved questions, and actions with owners and due weeks.
    Read back the test-design changes and Week 8 arrangements, distinguishing confirmed decisions from proposals still open.
    Ask question 25.

## Questions

1. _(closed)_ May we record this meeting?
2. _(closed)_ May we publish a sanitized English transcript in the public project repository?
3. _(closed)_ If public transcript publication is refused, may we share the sanitized transcript privately with the course instructors through Moodle?
4. _(open)_ Which Week 6 commitments can we close from the evidence shown, and which need further work or a Customer answer?
5. _(closed)_ For each ready story demonstrated against its current acceptance criteria, do you accept it, with any failed or unverified criteria recorded separately?
6. _(open)_ Starting with no cards or texts, where would a first-time learner hesitate while adding text, choosing words, or understanding what Learn, Ignore, and unselected words mean?
7. _(open)_ Which information and controls would help a learner understand existing cards, destination decks, sentence regeneration, teacher review, and the difference between Archive and Delete?
8. _(open)_ After generating cards, what should the interface explain about the next step so a learner can continue without guidance?
9. _(open)_ When cards are added or reordered under daily study limits, what should happen to their order and due dates?
10. _(open)_ What should studying a single deck include, which statistics and return destination should it show, and how should it interact with the learner's Today deck selection?
11. _(open)_ Which actions should work on a group of cards, and what should happen to learning progress when a sentence is regenerated?
12. _(open, priority)_ Which learners must the sample represent, and what would our proposed Russian-only A1-B1 profile and prior-flashcard-experience requirement prevent us from learning?
13. _(open)_ Which screening and background questions should distinguish language level and Anki experience, which recruitment channels can reach the required learners, and which survey language can the team support?
14. _(open)_ What would the main card-making task and the study and regeneration tasks fail to reveal, and what should the SEQ, SUS, and post-test questions help us understand?
15. _(open, priority)_ What unaided main-task completion proportion would be satisfactory for QR-11, and is the proposed 60% bar sufficient for the outcome you expect?
16. _(open)_ What evidence is still missing from the task observations and staging instrumentation before we can rely on the session data, and what must the verification demonstrate?
17. _(open)_ What is missing from the consent and evidence-storage plan before participants can consent and instructors can inspect the private material?
18. _(closed)_ Can you accept the private usability-data repository invitation and confirm access to the recordings folder once its invitation is sent?
19. _(open)_ Beyond adding text, selecting words, and generating cards, which study, return-session, editing, and pronunciation behaviors are essential to the minimum usable product?
20. _(open)_ Which Linux deployment, RAM limit, ordinary-response time, LLM timeout, and restart data-preservation expectations should become explicit quality requirements?
21. _(open)_ What evidence would demonstrate the intended browser-only handling of a learner's personal API key?
22. _(open)_ How should we assess generated-card quality: which cards or prompts should be evaluated, who should judge them, and what proportion should be acceptable?
23. _(open)_ Which remaining Week 6 questions can we settle now, including placement-test guidance and single- or multiple-teacher assignment, and which need a specific follow-up owner?
24. _(open, priority)_ What session arrangements, preparation owners and deadlines, and results date should we agree for Week 8, with saleemasekrea000 facilitating, Byakko-san observing, and the submission due on 21 November?
25. _(closed)_ Does this read-back correctly capture the decisions, unanswered questions, and action owners and deadlines, including the Week 8 session and results arrangements?

## Roles

The whole team attends.

- **Moderator and product presenter:** KaramKhaddour; demonstrate the product, ask the questions, and manage the agenda.
- **Note taker:** Horokk1; record permission answers, feedback, story verdicts, decisions and reasons, unresolved questions, and actions with owners and deadlines.
- **Observer:** Byakko-san; note unclear instructions, navigation problems, omitted questions, and participant-profile assumptions.
- **Staging, instrumentation, and private-data support:** saleemasekrea000; prepare reset seed data, the test-event demonstration and verification evidence, the private repository, and the recordings-folder access arrangement.

## Key improvements

- **Before:** "Do you think anything is confusing?"
- **After:** question 6, "Starting with no cards or texts, where would a first-time learner hesitate while adding text, choosing words, or understanding what Learn, Ignore, and unselected words mean?"
- **Principle:** anchor feedback to a concrete starting state and task so it identifies an obstacle that can change the interface.

- **Before:** "Is our participant group okay?"
- **After:** question 12, "Which learners must the sample represent, and what would our proposed Russian-only A1-B1 profile and prior-flashcard-experience requirement prevent us from learning?"
- **Principle:** test the sampling assumptions and missing perspectives instead of inviting general approval.

- **Before:** "Are regeneration counts enough to measure quality?"
- **After:** question 22, "How should we assess generated-card quality: which cards or prompts should be evaluated, who should judge them, and what proportion should be acceptable?"
- **Principle:** define the evaluated sample, judgment, and success measure before treating a proxy as evidence of quality.

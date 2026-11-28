# Week 8 Sprint Review Script

## Context

Our problem-space sentence: language learners need to turn words chosen from their own texts into useful sentence cards, study them regularly, and obtain teacher feedback when they need it.

We believe a first-time learner can complete the text-to-card task on staging without help, and the counted `UT-01` sessions are the first evidence from people outside the team.
Three counted sessions have run and a fourth, with a German learner, is planned; the [sanitized results](../../docs/usability-tests/ut-01/results.md) report the counted sessions with `n=<count>`.
This review also serves the Sprint 9 review: it runs the three [user acceptance tests](../../docs/user-acceptance-tests.md) on production and asks what the Customer expects at the handoff.
It follows up the [Week 7 action points](../week-07/meeting-report.md#action-points) and [open questions](../week-07/meeting-report.md#open-questions), putting only the ones the Customer has to settle on the agenda; the rest are closed from evidence in the report.

Target: agree what the `UT-01` results mean for the product and which fixes come first, record the `QR-11` verdict and the threshold outcomes, obtain the Customer's verdict on the three acceptance tests, and learn what the Customer expects at the handoff.

Plan for 45 minutes; the timeboxes below add up to 45.
If time runs short, ask the priority questions 6, 10, and 14 first.

## Agenda

1. **Permissions (2 min).**
   Show: nothing.
   Ask questions 1-3 separately before recording, and record each answer.
2. **Production and the analytics and observability dashboards (4 min).**
   Show: the production instance at the deployed commit, the production [analytics dashboard](../../docs/analytics.md#the-dashboard) and [observability dashboard](../../docs/observability.md), opened from the team's laptop; no address or credential is shown on screen.
   Identify the environment and the deployed commit, and the local pronunciation now generated on the server.
   Ask question 4.
3. **`UT-01` results and conclusion (8 min).**
   Show: the [`UT-01` results](../../docs/usability-tests/ut-01/results.md#the-results): the per-participant table, the main-task completion and median time, the median SEQ for each task, the SUS with `n=<count>`, and the instrumentation comparison; and the [conclusion](../../docs/usability-tests/ut-01/results.md#conclusion) with the product response.
   State the sample's coverage by learning language and prior flashcard experience, that the German session is still to run, and that no participant identity is shown.
   Ask questions 5-6.
4. **Findings, triage, and the `QR-11` verdict (7 min).**
   Show: the [findings](../../docs/usability-tests/ut-01/results.md#findings) with their severity and task issues, and [`QR-11` and `QRT-01`](../../docs/quality-requirements/qr/QR-11.md#qrt-01) against the 80% unaided main-task bar.
   Present which fixes the team commits to in `SPRINT-08` and `SPRINT-09`, and which it declines and why.
   Ask questions 7-8.
5. **User acceptance tests on production (12 min).**
   Show: [`UAT-01`](../../docs/user-acceptance-tests.md#uat-01), [`UAT-02`](../../docs/user-acceptance-tests.md#uat-02), and [`UAT-03`](../../docs/user-acceptance-tests.md#uat-03), each from its start state on production with the test accounts.
   The Customer runs each test; if the Customer cannot reach production, the team runs it live for the Customer to observe and judge, and the note taker records the actual runner.
   Ask question 9 after each test.
6. **Quality plan and threshold goals (4 min).**
   Show: the [quality requirement testing plan](../../docs/project-plan.md#quality-requirement-testing-plan), separating checks that failed from checks with no result, and [`TOS-01` to `TOS-03`](../../docs/threshold-of-success.md) against their current measures.
   Ask questions 10-11.
7. **Week 7 open questions the Customer must settle (3 min).**
   Show: the [Week 7 open questions](../week-07/meeting-report.md#open-questions) the team could not close from evidence.
   Ask questions 12-13.
8. **Handoff expectations and next steps (3 min).**
   Show: the [`SPRINT-09` plan](../../docs/project-plan.md#sprint-09).
   Agree at least two action points with owners and deadlines after Week 8, at least one due in Week 9.
   Ask question 14.
9. **Read back decisions and action points (2 min).**
   Show: the note taker's decisions, the acceptance-test verdicts with their runners, the unresolved questions, and the actions with owners and due dates.
   Ask question 15.

## Questions

1. _(closed)_ May we record this meeting?
2. _(closed)_ May we publish a sanitized English transcript in the public project repository?
3. _(closed)_ If public transcript publication is refused, may we share the sanitized transcript privately with the course instructors through Moodle?
4. _(open)_ Looking at production and the two dashboards, what would you need to see to trust that the product is running correctly for real learners?
5. _(open)_ Which result surprises you most, and what does it change about what a first-time learner needs from the product?
6. _(open, priority)_ Does our conclusion and product response match what you saw in the results, and which change should we make first?
7. _(open)_ For each finding, does the severity we gave it match how much it would hurt a real learner, and is any finding missing that you have seen yourself?
8. _(closed)_ Do you accept the `QR-11` verdict as recorded from the counted sessions against the 80% bar, given the sample size?
9. _(closed)_ Did this test reach its expected result: pass or fail, and if it failed, what was missing?
10. _(open, priority)_ For each threshold goal still open, does the current evidence pass it, fail it, or leave it without a result, and should any goal's measure change before the handoff?
11. _(open)_ Of the quality checks with no result yet, which would you most want to see evidence for before the handoff?
12. _(open)_ Should a shared deck allow one teacher or several, and what should happen when a second teacher is invited?
13. _(open)_ Which provider and model would you accept for generation in each language, given the quality and cost we have shown?
14. _(open, priority)_ What do you expect to receive at the handoff on 6 December, such as access, documentation, deployment, or data, and what would make you unable to take the product over?
15. _(closed)_ Does this read-back correctly capture the decisions, the acceptance-test verdicts and who ran each, the open questions, and the action owners and deadlines?

## Roles

The whole team attends.

- **Moderator and product presenter:** KaramKhaddour; present production, the results, and the findings, ask the questions, and manage the agenda.
- **Note taker:** Horokk1; record the permission answers, the feedback, each acceptance-test result with its actual runner, the decisions and reasons, the unresolved questions, and the actions with owners and deadlines.
- **Observer:** Byakko-san; note where the Customer hesitates while running the acceptance tests, and any question the team skipped.
- **Results and staging support:** saleemasekrea000; answer questions about how the sessions were run, as their facilitator, without naming or describing any participant.

## Key improvements

- **Before:** "Are you happy with the usability results?"
- **After:** question 6, "Does our conclusion and product response match what you saw in the results, and which change should we make first?"
- **Principle:** ask the Customer to judge a specific claim and choose between concrete next steps, rather than invite general approval.

- **Before:** "What do you want at the end of the course?"
- **After:** question 14, "What do you expect to receive at the handoff on 6 December, such as access, documentation, deployment, or data, and what would make you unable to take the product over?"
- **Principle:** name the date and the kinds of deliverable, and ask for the condition that would block the handoff, so the answer becomes a checklist the team can prepare.

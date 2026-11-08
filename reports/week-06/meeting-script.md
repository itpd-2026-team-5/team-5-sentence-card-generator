# Week 6 Customer Validation Script

## Context

Our problem-space sentence: learners need to turn words selected from their own texts into useful sentence cards, study them, and let a teacher review the cards they share.

We believe the revised mobile layout, visible global sound control, placement-test guidance, and direct teacher approval remove obstacles identified in the previous review.
The initial analytics and OpenObserve dashboards should help us understand product use, generation quality, and operational problems.
We need to check whether the interface communicates its actions clearly and whether the telemetry answers questions that matter to the Customer.
Bring the outcomes and evidence for the Week 5 [action points](../week-05/meeting-report.md#action-points) and [open questions](../week-05/meeting-report.md#open-questions).

Target: validate the revised learner and teacher workflows and the telemetry, establish what the staging diagnosability evidence proves, and agree what the threshold of success should measure next and which work belongs in Week 7.

Plan for 30 minutes and ask for 60 minutes for the full review.
Each agenda item gives its allocation as **30-minute plan / 60-minute plan**; the totals are 30 and 60 minutes.
Prioritize questions 6, 9, and 19 if time is short, preserve the final read-back, and carry unanswered questions forward.

## Agenda

1. **Permissions (2 / 3 min).**
   Show: nothing.
   Ask questions 1–3 separately before recording and note each answer.
2. **Week 5 follow-ups and the current product (3 / 5 min).**
   Show: the previous report's action points and open questions, the product's Settings and mobile navigation, and the [deployment runbook](../../docs/deployment.md).
   Open production on the university VM using the address and credentials shared privately, identify its commit, and show the changes to navigation, horizontal scrolling, sound, language-level guidance, and direct teacher approval.
   If the new version has not reached the VM, identify the local demonstration and record the outstanding deployment work.
   Ask questions 4–5.
3. **Product analytics and useful dashboard groups (3 / 6 min).**
   Show: the analytics staging and production dashboards, reached through the privately shared addresses.
   Inspect generated cards, completed study sessions, added texts, generation failures, and teacher approvals; identify where the data comes from and whether the focus metric has a value yet.
   Discuss separate views for product overview, teacher activity, and generation quality, including regeneration and possible learner feedback.
   Ask questions 6–7.
4. **Observability and staging diagnosability (3 / 6 min).**
   Show: the OpenObserve request logs, staging and production observability dashboards, and the [quality requirement testing plan](../../docs/project-plan.md#quality-requirement-testing-plan).
   Inspect slow routes, server errors, request counts, and P95 latency by route and outcome; make the actual label values visible.
   Show the observability requirement's staging `QRT-01` result: the failed request's log point, `request_id`, route and failure labels, the demonstrated `SLI-nn`, its five-minute P95 query result, and the sanitized dashboard screenshot.
   Include an additional runtime test's result at its execution level and name the `SLI-nn` it read if one was run; record missing evidence as follow-up work.
   Ask questions 8–9.
5. **LLM usage and cost visibility (1 / 3 min).**
   Show: the available provider usage information and the proposed operator dashboard view, without exposing account details or keys.
   Discuss token counts, provider-reported expenses, and the value of retaining cost history when the operator changes providers.
   Ask question 10.
6. **Mobile teacher review and card editing (4 / 9 min).**
   Show: Teaching on a phone-sized screen, its card list and status labels, direct approval, and the card-editing view.
   Review the visibility of the sentence translation, placement of Approve and Edit, and explanations of Checked, To check, and Asked to check.
   Open a card and inspect its original source context, editable word and meaning, sentence and translation, regeneration instructions, result preview, and Archive action.
   Ask questions 11–13, including whether editing the word could affect card identity, sorting, or learning progress.
7. **Texts, selected words, and generation settings (3 / 7 min).**
   Show: Texts, Add text, empty-field validation, the reader with a long text, word search, the word tray, and destination-deck controls.
   Check what happens when the selected language and the pasted text differ, how a learner selects or removes words, and whether selected words remain discoverable while scrolling.
   Compare the placement of selected-word information with the language-pair and destination-deck settings; show the additional fields for a new deck.
   Ask questions 14–15.
8. **Today, deck order, and the Decks view (3 / 7 min).**
   Show: Today before and after a study session, several selected decks, a long deck title, and the Decks list and editor.
   Inspect new and reviewed counters, progress-bar segments, ordering controls, language-pair visibility, daily limits, long word and translation wrapping, and access to card editing.
   Check adding a card to another deck and trying to remove its last deck.
   Ask questions 16–17.
9. **Story acceptance (3 / 5 min).**
   Show: the [SPRINT-06 plan](../../docs/project-plan.md#sprint-06) and each story issue presented as finished, including the product analyst and system operator stories.
   Demonstrate each current `AC-nn` separately and ask question 18 after each story.
   Record the verdict and any failed criteria for the decision log and the story issue comment.
10. **Threshold proposal and Week 7 priorities (3 / 6 min).**
    Show: the current [threshold of success](../../docs/threshold-of-success.md) and the proposed review table, one row per open goal with its current measure, whether analytics or observability can settle it, and any proposed number, due sprint, and metric definition.
    Discuss whether to retain the current measures or change them, then agree at least two concrete Week 7 actions with owners and deadlines.
    Ask questions 19–20; capture the threshold decision for a `DEC-nnn` entry, including a decision to make no change.
11. **Read back decisions and action points (2 / 3 min).**
    Show: the note taker's list of decisions, story verdicts, evidence gaps, unresolved questions, and actions with owners and deadlines.
    Ask question 21 and correct misunderstandings before closing.

## Questions

1. _(closed)_ May we record this meeting?
2. _(closed)_ May we publish a sanitized English transcript in the public project repository?
3. _(closed)_ If publication is refused, may we share the sanitized transcript privately with the course instructors through Moodle?
4. _(open)_ Which Week 5 commitments can we close from the evidence shown, and which questions or checks need an owner and further work?
5. _(open)_ In the revised mobile navigation, global sound control, and language-level guidance, which actions remain difficult to find or understand?
6. _(open, priority)_ Which questions about learner value do these analytics answer, and what is still missing before the focus metric can tell us whether the product is useful?
7. _(open)_ How would you group product overview, teacher activity, and generation quality so that each dashboard supports a clear decision, and what would regeneration counts or learner ratings add?
8. _(open)_ When investigating a slow or failed request, which route, outcome, and latency information do you need, and can you identify those values in the current charts?
9. _(open, priority)_ What does the failed-request log point and the demonstrated SLI's P95 result establish about diagnosability in staging, and what evidence is still missing?
10. _(open)_ What operational decision would a shared LLM usage-and-cost dashboard support beyond the provider's own dashboard, and which provider-reported figures would be sufficient?
11. _(open)_ As a teacher scanning the mobile card list, can you distinguish review requests and unchecked cards, find the translation, and approve or edit a sentence without losing your place?
12. _(open)_ What source context must a teacher see to check the intended meaning, which word and sentence fields should they edit, and what must remain unchanged when a word is corrected?
13. _(open)_ When regenerating a card, what should the prompt fields and preview explain, where should the result appear, and what should Archive do?
14. _(open)_ When adding a text, which instructions or validation messages are unclear, and what should happen when the text contains a different language from the one selected?
15. _(open)_ With a long text, how would you find and unselect a word, what purpose does the word tray serve, and where should selected words and generation settings appear?
16. _(open)_ On Today, what do the counters and progress segments tell you, and how should selecting and ordering several decks work without long titles obscuring the study action?
17. _(open)_ In Decks, what information and editing guidance are missing, who should set daily study limits, and what should happen when a card is removed from its last deck?
18. _(closed)_ For each story demonstrated against its current acceptance criteria, do you accept it or reject it, and which `AC-nn` failed or still lacks evidence?
19. _(closed, priority)_ For each open threshold goal, do you agree with the proposed measure and due sprint, or should its current measure remain unchanged?
20. _(open)_ Which interface, telemetry, deployment, and usability checks should come first in Week 7, and who will own each agreed action and its deadline?
21. _(closed)_ Does our read-back accurately capture the decisions, story verdicts, unresolved questions, and action owners and Week 7 deadlines?

## Roles

The whole team attends.

- **Moderator and product presenter:** KaramKhaddour; demonstrate the learner and teacher workflows, ask the questions, and control the time.
- **Note taker:** Horokk1; record permission answers, customer feedback, story verdicts, decisions and reasons, unanswered questions, and actions with owners and deadlines.
- **Observer:** Byakko-san; note confusing controls, mobile usability problems, and questions the demonstration leaves unanswered.
- **Deployment and telemetry support:** saleemasekrea000; prepare the VM, demonstration accounts, dashboards, and test evidence, and identify the environment and commit being shown.

## Key improvements

- **Before:** "Are these dashboards useful?"
- **After:** question 6, "Which questions about learner value do these analytics answer, and what is still missing before the focus metric can tell us whether the product is useful?"
- **Principle:** ask what decision the data supports and what evidence is missing, so general approval does not substitute for checking whether the metric reflects learner value.

- **Before:** "Is the mobile interface better now?"
- **After:** question 11, "As a teacher scanning the mobile card list, can you distinguish review requests and unchecked cards, find the translation, and approve or edit a sentence without losing your place?"
- **Principle:** anchor feedback to a concrete task that exposes unclear labels, missing translations, and unnecessary navigation.

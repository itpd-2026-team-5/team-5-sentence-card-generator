# Week 5 Customer Validation Script

## Context

Our problem-space sentence: learners need to turn words selected from their own texts into useful sentence cards, study them, and let a teacher review the cards they share.

We believe the interface-language controls, separation of generation context by language, simpler teacher view, individual audio buttons, and mobile layout improve that workflow.
We need to check whether those controls are understandable and whether the deployed application supports the same task as the local version.
The [Week 4 action points](../week-04/meeting-report.md#action-points) and [open questions](../week-04/meeting-report.md#open-questions) still require evidence and explicit closure or follow-up.

Target: establish which demonstrated stories and tested quality requirements the Customer accepts on the deployed product, and agree the interface, audio, and provider-access work to prioritize in Week 6.

Plan for 30 minutes and ask for 60 minutes for the full review.
Each agenda item gives its allocation as **30-minute plan / 60-minute plan**; the totals are 30 and 60 minutes.
Prioritize questions 4, 14, and 18 if time is short, preserve the final read-back, and carry unanswered questions forward.

## Agenda

1. **Permissions (2 / 3 min).**
   Show: nothing.
   Ask questions 1-3 separately before recording and note each answer.
2. **Production deployment and the core task (3 / 6 min).**
   Show: production on the university VM from the university network, using the address and demonstration credentials shared privately; refer to the [deployment runbook](../../docs/deployment.md).
   Sign in, open a text, select a word, generate a card, and open the resulting deck; identify the deployed commit.
   Ask question 4; if production or its LLM provider is unavailable, show the failure, distinguish existing demonstration cards from new generation, and use the local application only as a clearly identified fallback.
   Record the limitation and any substitution for the weekly report's deviations.
3. **Implemented tests and their evidence (3 / 6 min).**
   Show: the [quality requirement testing plan](../../docs/project-plan.md#quality-requirement-testing-plan), [QR-02 QRT-01](../../docs/quality-requirements/qr/QR-02.md#qrt-01), its latest Product checks run on `main`, and [QR-07 QRT-01 on staging](README.md#qr-07-qrt-01-on-staging).
   Walk through every testing-plan row and show each implemented test at its stated level, including its commit and evidence; distinguish CI results, staging results, and requirements not yet verified.
   Ask question 5.
4. **Language settings and text-to-deck generation (3 / 7 min).**
   Show: Settings in English, German, and Russian; interface-language choices; learning-language levels; new-deck defaults; and the reader's destination-deck selector.
   Follow a selected word from its source language into an existing deck and a new deck; compare a mixed-language account with the [marking](../../docs/functional-requirements/fr/FR-002.md) and [generation requirements](../../docs/functional-requirements/fr/FR-003.md).
   Ask questions 6-8.
5. **Teacher review, permissions, and editing layout (5 / 11 min).**
   Show: a learner sharing a deck, requesting review with and without a note, and the teacher's deck list, counters, card list, and detail panel.
   Compare reviewing an unrequested card with a requested one; edit a sentence, inspect the generation instructions, regenerate with corrective feedback, and check the preview and review status.
   Show the empty Teaching view and how a learner finds the account email needed for sharing; refer to the [shared-deck requirement](../../docs/functional-requirements/fr/FR-011.md).
   Ask questions 9-11, including which actions should be available to a teacher and which remain with the learner.
6. **Sound, study, and mobile navigation (3 / 7 min).**
   Show: global sound settings, a study session's sound control, and separate playback of the word, meaning, sentence, and translation.
   Switch to a phone-sized view and navigate between Today, Settings, decks, and Teaching; check the bottom navigation, vertical alignment, and horizontal scrolling.
   Explain the current browser-and-operating-system dependency of pronunciation, using the [audio requirement](../../docs/functional-requirements/fr/FR-010.md) and [mobile quality scenario](../../docs/quality-requirements/qr/QR-06.md).
   Ask questions 12-13.
7. **Story-by-story acceptance (4 / 7 min).**
   Show: the [SPRINT-05 backlog](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/milestone/3) and the current issue body for every story presented as finished.
   Demonstrate each current `AC-nn` separately and ask question 14 after each story; include [US-08](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/41) if its audio rework is ready for acceptance.
   Separate acceptance of existing functionality from newly requested changes, and record every failed or unproven criterion without inferring a verdict from general UI feedback.
8. **Previous commitments and remaining quality questions (3 / 5 min).**
   Show: each row of the Week 4 [action points](../week-04/meeting-report.md#action-points) and [open questions](../week-04/meeting-report.md#open-questions), with the artifact or evidence for its outcome.
   Include group access, remaining core-story evidence, model quality and cost, contextual generation, level assessment, teacher access and key isolation, audio options, the batch warning, and deployment and persistence checks.
   Show the [architecture and drivers](../../docs/architecture/README.md) alongside the [quality matrix](../../docs/quality-requirements/README.md), separating design choices from measured results.
   Ask questions 15-16 and identify an owner for each unresolved item.
9. **Next increment and submission scope (2 / 5 min).**
   Show: the [project plan](../../docs/project-plan.md#sprint-06), current story issues, and the proposed interface, audio, and provider-access follow-ups.
   Ask questions 17-18; distinguish immediate rework from optional features such as card reordering and its effect on review scheduling.
   Agree at least two concrete action points, each with a GitHub username as owner and a deadline inside Week 6.
10. **Read back decisions and action points (2 / 3 min).**
    Show: the note taker's list of story verdicts, changed requirements, deployment limitations, unanswered questions, and actions with owners and deadlines.
    Ask question 19 and correct misunderstandings before closing.

## Questions

1. _(closed)_ May we record this meeting?
2. _(closed)_ May we publish a sanitized English transcript in the public project repository?
3. _(closed)_ If publication is refused, may we share the sanitized transcript privately with the course instructors through Moodle?
4. _(open, priority)_ While completing the core task on production, which steps work and which are blocked, and what would the provider-access limitation prevent you from using?
5. _(open)_ What do the testability CI run and the staging restart test establish about the required quality, and what evidence is still missing before you can accept the remaining scenarios?
6. _(open)_ When changing the interface language, what helps you recognize your language and understand the names of the other language settings?
7. _(open)_ Starting from a text and its selected words, how would you choose the language pair and destination deck, and where does the current flow make that choice difficult?
8. _(open)_ When a learner studies several languages, what should the proficiency controls and external-test guidance tell them, and which defaults or overrides are actually needed?
9. _(open)_ As a teacher opening shared decks, what do the request and unchecked-card counters tell you, and can you find the learner's request and the information needed to review it without opening every card?
10. _(open)_ When a teacher corrects or regenerates a card, which instructions and content may they change, and which decisions about archiving or permanent deletion should remain with the learner?
11. _(open)_ After clicking "Rewrite now", what result do you expect to see immediately, and which information and actions must remain visible on desktop and mobile for a quick review?
12. _(open)_ If you turn sound off during study, what should happen in that session and the next one, and where would you look for a global sound control?
13. _(open)_ On a phone, which navigation, layout, or playback behavior prevents you from completing the learner or teacher task, and what is the most urgent correction?
14. _(closed, priority)_ For each finished story demonstrated against its current criteria, do you accept it or reject it, and which `AC-nn` failed or still lacks evidence?
15. _(open)_ For each previous action and question, which outcome can we close from the evidence shown, and what must be carried forward with an owner and deadline?
16. _(open)_ Does the container design answer the agreed drivers for key isolation, persistence, generation failure, pronunciation, and mobile use, and which design choices or quality measures still need to change?
17. _(open)_ Which work should come first in Week 6: teacher-review layout, mobile navigation, audio, provider access, or card reordering, and what can be deferred without blocking the main task?
18. _(closed, priority)_ If live generation remains blocked on the university VM, is the demonstrated deployed version with existing cards sufficient for this submission, with provider replacement carried into the next sprint?
19. _(closed)_ Does our read-back accurately capture every story verdict, required change, unresolved question, and action owner and Week 6 deadline?

## Roles

The whole team attends.

- **Moderator and product presenter:** KaramKhaddour; run the learner and teacher workflows, ask the questions, and keep the review focused on its target.
- **Note taker:** Horokk1; record permission answers, evidence and limitations, story verdicts and failed criteria, decisions and reasons, and actions with owners and deadlines.
- **Observer:** Byakko-san; record unasked questions, confusing controls, mobile usability problems, and differences between the expected and observed behavior.
- **Deployment and test support:** saleemasekrea000; prepare the VM and demonstration accounts, show the deployed commit and test evidence, and help diagnose provider access without exposing credentials.

## Key improvements

- **Before:** "Is the teacher interface easier to use now?"
- **After:** question 9, "As a teacher opening shared decks, what do the request and unchecked-card counters tell you, and can you find the learner's request and the information needed to review it without opening every card?"
- **Principle:** replace a request for general approval with a concrete task that can reveal unclear counters, unnecessary navigation, and missing information.

- **Before:** "Is the deployed application ready?"
- **After:** question 4, "While completing the core task on production, which steps work and which are blocked, and what would the provider-access limitation prevent you from using?"
- **Principle:** ask about observable behavior and its consequence for the user, so a working deployment is not mistaken for verified end-to-end generation.

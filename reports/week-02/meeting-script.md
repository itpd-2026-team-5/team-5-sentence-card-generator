# Week 2 Customer Validation Script

## Context

Our problem-space sentence: language learners need to turn words selected from their own texts into sentence cards with translations and pronunciation, and teachers need to review the cards the learner shares with them.

We believe a learner should be able to bring in plain text, choose words to learn or ignore, and generate new sentences that preserve each word's original meaning.
The prototype demonstrates text input, word selection, card editing, study sessions, and profile settings, with mocked generation and no authentication.
The uncertain parts are the relationship between texts, cards, and decks; the scope of generation instructions; and the teacher's review workflow.
The kickoff also left language-level assessment and questionnaire-based prompts open.

Target: settle which prototype workflows must change, which capabilities belong outside the product boundary, and whether the proposed MUP candidate lets a learner complete the core task.

Plan for 30 minutes and ask the Customer for 60; the full agenda below budgets 60 minutes.
If only 30 minutes are available, use 3 minutes for permissions, 3 for the kickoff follow-up, 12 for the prototype, 5 for the boundary, 5 for the candidate, and 2 for the read-back.
Questions 6, 11, and 14 are the priority questions if time runs short.

## Agenda

1. **Permissions (3 minutes).**
   Show: nothing.
   Ask questions 1-3 before recording; record the three answers separately.
2. **Follow up the kickoff (5 minutes).**
   Show: the [previous action points](../week-01/meeting-report.md#action-points) and [previous open questions](../week-01/meeting-report.md#open-questions).
   Ask questions 4-5 about the customer group, language-level assessment, and generation instructions.
3. **Test the prototype (30 minutes).**
   Show: the mobile prototype screens for entering text, marking words, generating and editing cards, studying, and changing settings.
   Start with the uncertain text-to-deck workflow, then show card review and settings; use the current editor to discuss the missing teacher workflow.
   Ask questions 6-10 while the relevant screen is visible.
   Generation is mocked; do not present the demonstration as proof of LLM output quality.
4. **Challenge the product boundary (10 minutes).**
   Show: the working boundary proposal below.
   Proposed in scope: plain-text input, contextual sentence generation, card editing, study sessions, and teacher access to explicitly shared decks.
   Proposed outside scope: extracting content directly from individual media platforms, transferring payments to teachers, and requiring a service subscription as the only way to generate cards.
   Ask questions 11-13; distinguish optional future subscriptions from the ability to bring a personal API key.
5. **Confirm the minimum usable product candidate (10 minutes).**
   Show: the proposed candidate below and [all user stories with their current MoSCoW labels](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues?q=is%3Aissue%20label%3Auser-story).
   Core task: a learner turns a chosen plain text into new sentence cards with translations for the words they selected.
   Candidate stories:
   - [US-01: Bring in a text I chose](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/30).
   - [US-02: Mark the words I want to learn in a text](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/31).
   - [US-03: Get a new sentence for each word I marked](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/32).

   Ask questions 14-15, using the full issue list if the customer adds or removes a story or changes a priority.
   Record the Customer's explicit verdict on the final candidate and any changes to story priorities separately.
   Walk through individual acceptance criteria only if time remains.
6. **Read back decisions and actions (2 minutes).**
   Show: the decisions and action list captured during the meeting, including owners and due dates inside Week 3.
   Ask question 16 and correct any misunderstanding before closing.

## Questions

1. _(closed)_ May we record this meeting?
2. _(closed)_ May we publish a sanitized English transcript in the public project repository?
3. _(closed)_ If you refuse public publication, may we share the sanitized transcript privately with the course instructors through Moodle?
4. _(closed)_ Have you received access to the project group and can you use it for follow-up questions?
5. _(open)_ For the kickoff's unresolved language-level and prompt questions, what should the learner specify themselves, and what would the product need to determine or explain?
6. _(open)_ In the text-to-card workflow shown here, which steps or relationships between texts, cards, and decks differ from what you need?
7. _(open)_ When reviewing or correcting a card on mobile, what information and actions are missing or in the wrong place, including translation, audio, and regeneration?
8. _(open)_ How should the learner choose the decks for a study session, and what should the session's progress display mean?
9. _(open)_ In these settings, what should apply across the account and what should be specific to a deck, including generation instructions and sentence-length limits?
10. _(open)_ When a teacher reviews a shared deck, what must be visible and editable without opening each card separately?
11. _(open)_ Which capability excluded by our boundary proposal would prevent you or a learner from completing the intended workflow, and why?
12. _(open)_ Whose API key should be used when a learner generates cards or a teacher regenerates them, and what access must each person be prevented from having?
13. _(closed)_ Can payment between the learner and teacher remain outside this product?
14. _(open)_ If only the three candidate stories shipped, what would prevent a learner from completing the stated core task, and which story would you add or remove?
15. _(closed)_ After those changes, do you accept the candidate as sufficient for that core task, with any priority changes recorded separately?
16. _(closed)_ Does our read-back correctly capture the decisions and each action's owner and Week 3 due date?

## Roles

The whole team attends.

- **Moderator and prototype presenter:** KaramKhaddour; ask the questions and control the time.
- **Technical support:** saleemasekrea000; assist with the demonstration and clarify generation and settings when invited by the moderator.
- **Note taker:** Horokk1; record feedback, decisions, unresolved questions, permission answers, and actions with owners and due dates.
- **Observer:** Byakko-san; record skipped questions, hesitation, and mismatches between the demonstrated workflow and the customer's expectations.

## Key improvements

- **Before:** "Do you have any vision about that?"
- **After:** question 10, "When a teacher reviews a shared deck, what must be visible and editable without opening each card separately?"
- **Principle:** anchor the question to a concrete task and interface constraint instead of asking the customer to design an unspecified feature; the answer can change the teacher editor and its acceptance criteria.

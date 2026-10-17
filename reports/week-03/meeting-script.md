# Week 3 Customer Validation Script

## Context

Our problem-space sentence: learners need to turn words selected from their own texts into useful sentence cards, study the decks they choose, and have a teacher correct the cards they share.

We believe the revised separation of texts, cards, and decks supports that workflow.
The application now includes accounts, settings, word selection, generation into a chosen deck, card editing, study sessions, and teacher sharing.
The demonstration still uses placeholder generation because a working paid API key is not available; it cannot establish sentence quality, contextual translation, or real token cost.
The Week 2 follow-up also left the exact MUP candidate, language-level assessment, sufficient generation context, and personal-key handling to settle.

Target: establish which candidate stories the Customer accepts against their acceptance criteria, which demonstrated workflows need rework, and which stories the team should deliver next.

Use the agenda as a flexible discussion order, allowing more attention to questions that reveal unresolved needs or failed criteria.
Questions 6, 8, and 19 have priority; defer remaining feedback topics to a follow-up if needed.

## Agenda

1. **Permissions.**
   Show: nothing.
   Ask questions 1-3 before recording and record each answer separately.
2. **Previous commitments and open questions.**
   Show: the Week 2 [action points](../week-02/meeting-report.md#action-points), [open questions](../week-02/meeting-report.md#open-questions), and [recorded decisions](../../docs/decisions.md).
   Ask questions 4-5; distinguish completed work, unanswered questions, and checks that placeholder generation cannot establish.
3. **US-01: bring in a text.**
   Show: the application's Texts page and [US-01](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/30).
   Walk through AC-01 with a 300-word German text, AC-02 with a Russian `.txt` file, and AC-03 with an empty input, one criterion at a time.
   Identify any unavailable capability rather than substituting a different operation for its criterion.
   Ask question 6 and record the verdict before moving on.
4. **US-02: mark words to learn or ignore.**
   Show: the text reader, word selection, and [US-02](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/31).
   Walk through AC-01 by marking five words, AC-02 by marking a word not to learn and checking that generation excludes it, and AC-03 by unmarking a word selected by mistake.
   Ask question 7 and record the verdict before moving on.
5. **US-03: generate cards into a deck.**
   Show: the Generate into control, the resulting deck, a card's sentence and translation, and [US-03](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/32).
   Walk through AC-01 for ten marked words, AC-02 for the contextual meaning of "Bank" in "Ich sitze auf der Bank im Park," AC-03 for sentences different from the source, and AC-04 for a generator that does not answer.
   Separate what the running application proves from the language and provider behavior that remains unverified with placeholder output.
   Ask questions 8-9; record the verdict and every failed or unproven criterion.
6. **Settings and generation controls.**
   Show: Settings, the linked placement tests, Edit Deck, the API-key controls, and the usage display.
   Ask questions 10-12 about account versus deck settings, sentence length, provider choice, and useful generation statistics.
7. **Study workflow.**
   Show: Today, selecting one or several decks, the front and revealed answer of a study card, audio, ratings, and the end of a session.
   Ask questions 13-14 about persistent deck choice, review progress, card layout, and actions needed during study.
8. **Card correction and teacher review.**
   Show: a deck's card list, the card editor and source-context disclosure, sharing controls, and the Teaching page.
   Ask questions 15-17 about correcting many cards, generation instructions, and teacher access and prioritization.
   Treat these additional screens as feedback topics rather than claiming acceptance of their stories without checking their individual criteria.
9. **Text management, candidate scope, and next delivery.**
   Show: Texts, the selected deck and existing generated cards, the [Week 2 candidate](../week-02/README.md#minimum-usable-product-candidate), and the [story issues](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues?q=is%3Aissue%20label%3Auser-story).
   Ask questions 18-20 about repeated generation, the candidate's sufficiency, unfinished stories, and the next delivery order.
   Obtain an explicit decision for any candidate story the team will not finish by the deadline; if the remaining stories no longer complete the core task, agree on the revised core task as well.
10. **Read back decisions and action points.**
    Show: the note taker's list of story verdicts, scope decisions, unresolved questions, and actions with owners and dates.
    Ask question 21 and correct misunderstandings before closing.
    Confirm at least two concrete action points with deadlines inside Week 4.

## Questions

1. _(closed)_ May we record this meeting?
2. _(closed)_ May we publish a sanitized English transcript in the public project repository?
3. _(closed)_ If public publication is refused, may we share the sanitized transcript privately with the course instructors through Moodle?
4. _(closed)_ Have you received access to the project group and can you use it for follow-up questions?
5. _(open)_ Which Week 2 commitments or open questions remain unresolved after the work and evidence we have shown, and what evidence is needed to close them?
6. _(closed, priority)_ Do you accept US-01 against AC-01 through AC-03 as demonstrated, or reject it with the failed or unproven criteria identified?
7. _(closed)_ Do you accept US-02 against AC-01 through AC-03 as demonstrated, or reject it with the failed or unproven criteria identified?
8. _(closed, priority)_ Do you accept US-03 against AC-01 through AC-04 with the evidence available today, or reject it with the failed or unproven criteria identified?
9. _(open)_ What generation-quality, context-preservation, and cost evidence should we bring after replacing placeholder output with a real model?
10. _(open)_ If a learner studies more than one language or uses different levels in different decks, which language and level settings should apply across the account and which should belong to each deck?
11. _(open)_ What sentence-length controls and placement-test support are necessary for the learner to obtain suitably difficult sentences?
12. _(open)_ When choosing a personal or service API key and a model, what controls and usage information help you make that choice, and which information would be confusing or unnecessary?
13. _(open)_ When returning to Today with several decks, what selection and progress information should persist, and how should daily limits and cards due again within the current session be represented?
14. _(open)_ While studying, what would you change about the word and translation placement, source context, highlighting, keyboard controls, audio, and access to card correction?
15. _(open)_ If you need to correct hundreds of cards, which actions must be available directly in the list or study screen, and how should archiving, deleting, requesting teacher review, and regeneration differ?
16. _(open)_ When a deck's generation instructions change after some cards already exist, what should the deck description and each card retain so that later regeneration uses the intended instructions and meaning?
17. _(open)_ When reviewing shared decks, which cards should a teacher be able to inspect, which should be shown first, and what student and review information should be visible without opening every card?
18. _(open)_ When a learner adds marked words, changes their context, or selects another destination deck, which existing cards should prevent duplicate generation, and what text ordering or source metadata is needed to manage that work?
19. _(closed, priority)_ Do you accept US-01, US-02, and US-03 as the sufficient MUP candidate, with a separate recorded decision for any story removed and any resulting change to the core task?
20. _(open)_ After the story verdicts and scope decisions, which rework and next stories should take priority in Week 4, and what should we demonstrate at the next meeting?
21. _(closed)_ Does our read-back correctly capture each story's verdict, the scope decisions, unresolved questions, and the owners and Week 4 deadlines of at least two action points?

## Roles

The whole team attends.

- **Moderator and product presenter:** KaramKhaddour; run the demonstration, ask the questions, and keep the discussion focused on the meeting's target.
- **Note taker:** Horokk1; record permission answers, story verdicts and failed criteria, decisions, unanswered questions, and actions with owners and due dates.
- **Observer:** Byakko-san; record skipped criteria and questions, confusion during the demonstration, and mismatches between the workflow and the Customer's expectations.

## Key improvements

- **Before:** "Does the application look good?"
- **After:** question 15, "If you need to correct hundreds of cards, which actions must be available directly in the list or study screen, and how should archiving, deleting, requesting teacher review, and regeneration differ?"
- **Principle:** anchor feedback to a concrete high-volume task so that the answer can change card actions and their acceptance criteria rather than produce a general impression.

- **Before:** "Are these three stories enough?"
- **After:** question 19, "Do you accept US-01, US-02, and US-03 as the sufficient MUP candidate, with a separate recorded decision for any story removed and any resulting change to the core task?"
- **Principle:** distinguish explicit acceptance of the candidate's scope from approval of a demonstration or acceptance of individual finished stories.

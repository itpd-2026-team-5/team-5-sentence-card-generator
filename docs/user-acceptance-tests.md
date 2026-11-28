# User acceptance tests

The end-to-end journeys the Customer expects to complete on the deployed product.
Each test uses the synthetic seed data, a test account, and `<production-url>` for the deployment; the address and the test accounts are in the Moodle submission.

## The Tests

| Test              | Journey                                              | Status | SPRINT-09                 | SPRINT-10       |
| ----------------- | ---------------------------------------------------- | ------ | ------------------------- | --------------- |
| [UAT-01](#uat-01) | Turn words chosen from a text into cards in a deck   | Active | Not yet run               | Not yet defined |
| [UAT-02](#uat-02) | Study only the deck the learner chooses              | Active | Not yet run               | Not yet defined |
| [UAT-03](#uat-03) | Share a deck with a teacher who corrects a card      | Active | Not yet run               | Not yet defined |

## UAT-01

A learner turns two words they chose from a text into sentence cards in their deck.

**Status:** Active

**Start state:** A test learner account is signed in on `<production-url>`, with the interface and translation language set to English, a learning language set, and at least one deck; the learner has a short text in that learning language ready to paste.

**Steps:** Add the text, mark two words in it to learn, choose the destination deck, and generate the cards; then open the deck.

**Expected result:** The deck holds one new card for each marked word, each with a new sentence that uses the word, its translation, and the word's meaning in the text, and the text is kept in the learner's texts.

| Sprint | Date | Runner | Build | Result | Evidence | DEC-nnn |
| ------ | ---- | ------ | ----- | ------ | -------- | ------- |

## UAT-02

A learner studies only the deck they choose and their answers are saved.

**Status:** Active

**Start state:** The test learner account from [UAT-01](#uat-01) is signed in and has at least two decks, each with at least three cards due.

**Steps:** Choose one deck to study, answer at least three cards, play one card's pronunciation, and finish the session.

**Expected result:** Only cards from the chosen deck are shown, the pronunciation plays, each answer is saved, and the answered cards are rescheduled to a later due date.

| Sprint | Date | Runner | Build | Result | Evidence | DEC-nnn |
| ------ | ---- | ------ | ----- | ------ | -------- | ------- |

## UAT-03

A learner shares one deck with a teacher, the teacher corrects a card, and the learner sees the correction.

**Status:** Active

**Start state:** A test learner account with two decks of at least three cards each, and a separate test teacher account, both signed in on `<production-url>` in two browser windows.

**Steps:** As the learner, share one deck with the teacher's email; as the teacher, open the shared deck, correct one card's sentence manually, and save it; as the learner, open the deck.

**Expected result:** The teacher sees the shared deck and not the learner's other deck, the correction is saved, and the learner sees the corrected card in that deck.

| Sprint | Date | Runner | Build | Result | Evidence | DEC-nnn |
| ------ | ---- | ------ | ----- | ------ | -------- | ------- |

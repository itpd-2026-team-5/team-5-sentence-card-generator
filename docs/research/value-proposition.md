# Value proposition

Each value proposition closes at least one gap from [the gap analysis](gap-analysis.md), names what it costs, and says how a competitor would respond.
Evidence about the alternatives is in [the alternatives research](alternatives.md) and [the comparison](comparison.md).

Our core is VP-01 and VP-03: sentences an LLM writes for one particular learner, and a teacher who sees and corrects the cards that learner studies.
VP-02 supports them.
The kickoff meeting confirmed this direction: the Customer named a card editor (VP-01, VP-03) and a word picker (VP-01, VP-02) as the two most important features, and called the teacher "the ultimate oracle" for what stays in a deck.

## VP-01

Sentences written for this learner

- **Status:** Active
- **User:** a learner of Russian, English, or German who picks the words they want to learn from texts they chose.
- **Problem:** no alternative writes sentences for the learner in front of it.
  LinguaCafe (ALT-03) puts the original sentence from the text on the card and translates only the word, with no LLM at all.
  Migaku (ALT-01) fills its cards from the content the learner is consuming; its AI explains a word in context but does not write sentences at the learner's level or about their interests.
  Language Reactor (ALT-02) translates the learner's sentence and shows five translated example sentences per word, but as far as we saw, every learner gets the same examples.
  So a beginner gets the same sentence as an advanced learner, full of other unknown words, on a topic they may not care about.
- **What we do that the alternatives do not:** build a context pipeline for each learner and generate new sentences from it.
  For every word the learner picks, the LLM gets:

  - the sentence the word appeared in, so it uses the same meaning;
  - the learner's level;
  - the learner's interests, either from a prompt they write themselves or from a short questionnaire (profession, study goals) that writes the prompt for them;
  - the words the learner already knows (the words they did not pick in a text) and the words they marked to ignore or as too hard, so the new sentence avoids them;
  - a fixed sentence length, so a study session's length is predictable.

  Measured by: the share of generated sentences the learner keeps without editing, and the share in which every word other than the target is already known to the learner.
- **Closes:** [GAP-01](gap-analysis.md#gap-01).
- **Rests on:** [ASM-01](../assumptions.md#asm-01), [ASM-02](../assumptions.md#asm-02), [ASM-03](../assumptions.md#asm-03), [ASM-04](../assumptions.md#asm-04), [ASM-05](../assumptions.md#asm-05).
- **What it costs:** an LLM call for every card, and again for every regeneration, so the token cost grows with the number of learners and cards; this is a running cost that LinguaCafe and a hand-made Anki deck do not have.
  Personal data about the learner (level, interests, known words) has to be stored.
  LLM sentences can still be wrong, which is why VP-03 exists.
- **How a competitor would respond:** Migaku and Language Reactor are the closest.
  Both already track which words a learner knows, Migaku uses ChatGPT for explanations, and Language Reactor has an AI chat and example sentences, so either could ship "examples built from your known words" in a release.
  LinguaCafe could plug in an LLM through its custom dictionary API, but it has had no release since April 2025 and translates only words, so it is further away.
  The defensible part is not one LLM call but the whole loop: the learner's own text, their profile, the "too hard" feedback from reviews, and the teacher's corrections (VP-03) all feed the next generation.
- **Changed:**
  - Always passes the sentence the word appeared in to the LLM ([DEC-003](../decisions.md#dec-003)).
  - Prompt written by technical learners, or produced from a short questionnaire for the others ([DEC-004](../decisions.md#dec-004)).

## VP-02

The words you chose come up first

- **Status:** Active
- **User:** the same learner, who has uploaded several texts and wants the words from one of them first.
- **Problem:** in Migaku (ALT-01) and Language Reactor (ALT-02) the learner can change a word's status in bulk but not choose which words are learned first (Language Reactor's sliders set how many, not which); in LinguaCafe (ALT-03) word levels follow the review schedule.
- **What we do that the alternatives do not:** a word picker in which the learner marks the words to learn and the words to ignore in each text, and orders the texts, so the words from the first text come up first in reviews.
  Measured by: whether the words from the text ranked first appear in the learner's next review session before any others, without manual rescheduling.
- **Closes:** [GAP-03](gap-analysis.md#gap-03).
- **Rests on:** [ASM-08](../assumptions.md#asm-08), [ASM-09](../assumptions.md#asm-09).
- **What it costs:** we schedule reviews ourselves, with an established algorithm such as FSRS as decided at the kickoff, so we build and maintain a review screen and scheduling instead of leaving them to Anki.
  A learner who wants to keep studying in Anki loses the priority, because an exported deck can carry it only as new-card order, which the learner can undo by hand.
- **How a competitor would respond:** this is easy to copy.
  LinguaCafe already lets a learner review one book or chapter at a time, which is close; ordering the books would be a small change.
  VP-02 matters because the Customer asked for it, not because it is a moat.
- **Changed:**
  - Reviews are scheduled in the app with an established algorithm such as FSRS ([DEC-005](../decisions.md#dec-005)).

## VP-03

The teacher sees and corrects the cards the student studies

- **Status:** Active
- **User:** a teacher of Russian, English, or German, and the students who share their decks with them.
- **Problem:** the teacher cannot see what their student is studying, and LLM sentences are sometimes wrong or unnatural.
  The Customer had to remove bad sentences by hand when using songs2anki.
  None of the alternatives has a teacher view: Migaku has no teacher or sharing feature (ALT-01, P6), Language Reactor has none in the screens we used (ALT-02, P6), and LinguaCafe has accounts managed by an admin but no way for one user to see another's cards (ALT-03, P6).
- **What we do that the alternatives do not:** a student shares a deck with their teacher, and the teacher sees the same cards in the same editor the student uses, marks bad sentences for removal or regeneration, edits sentences to sound natural, and has the final say on what stays in the deck.
  Measured by: the share of cards a teacher changes or removes, and whether a corrected card reaches the student before their next review.
- **Closes:** [GAP-02](gap-analysis.md#gap-02).
- **Rests on:** [ASM-06](../assumptions.md#asm-06), [ASM-07](../assumptions.md#asm-07).
- **What it costs:** accounts, a teacher and a student role, sharing permissions, and a review flow, which makes this the largest part of the scope.
  A learner without a teacher gets nothing from it.
- **How a competitor would respond:** Migaku and Language Reactor would need accounts that can see each other's data, and LinguaCafe would need a permission model on top of an admin-run server where Anki export already works for only one user, so none of them is a one-release change.
  The teacher's corrections also improve VP-01's sentences for that student, which a competitor copying only the review screen would not have.

## VP-04

A readiness score for a YouTube video the learner chose.

- **Status:** Dropped
- **Dropped:** 2026-10-02, after the kickoff meeting, per [DEC-001](../decisions.md#dec-001): the Customer asked us to accept plain text from any source rather than build around one media platform (see also the Disagreements in the meeting report), and three value propositions is the limit.
  The ID is not reused.

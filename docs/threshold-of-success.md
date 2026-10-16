# Threshold Of Success

The project counts as successful only when all three goals are achieved.

## TOS-01

By the end of Week 8, at least three learners outside the team independently turn their own texts into cards and study their chosen decks in the application.

- **Status:** Open
- **Measure:** By the end of Week 8, each of three learners outside the team imports a text they chose, marks at least 10 words, generates a card for each marked word using a real LLM, and completes a study session using only the deck or decks they selected, without step-by-step assistance from the team.
  Each learner returns on a later day and completes a review scheduled by the application's spaced-repetition algorithm, with their previous progress preserved.
  An anonymized validation report records the application version, selected decks, task completion, assistance, failures, and review results for all three learners.
  The goal passes only if all three learners complete both sessions under these conditions.

## TOS-02

By the end of Week 8, at least 80% of first-generated cards in each supported language are suitable for the intended learner without editing or regeneration.

- **Status:** Open
- **Measure:** By the end of Week 8, evaluate 30 consecutive first-generated cards for distinct marked words in each of Russian, English, and German, for 90 cards in total.
  Record the intended learner's level, source contexts, deck instructions, model, and generation settings before generating each language's sample.
  A reviewer proficient in that language checks that each generated sentence differs from the source sentence, uses the target word in its source meaning, is grammatical and natural, and has correct sentence and target-word translations.
  A sentence is grammatical and natural when the reviewer identifies no grammatical error or wording they would correct for idiomatic usage; the contextual translation passes when the reviewer identifies no mistranslation of the target word or sentence meaning.
  The intended learner checks that they understand the sentence apart from the target word, can identify no additional unfamiliar vocabulary or grammar, and would keep the card unchanged.
  A card passes only when every reviewer and learner check passes and the card satisfies any explicit deck instructions, including sentence-length limits.
  At least 24 of 30 cards must pass in each language separately.
  An anonymized evaluation report records all sampled outputs, the input settings, each check's verdict, reasons for failures, and per-language totals.
  Failed or missing outputs count as failures and remain in the sample; edited or regenerated replacements do not replace first-generation results.

## TOS-03

By the end of Week 8, a teacher outside the team reviews and corrects a learner's explicitly shared deck without access to the learner's unshared decks or personal API key, and the learner studies the corrected cards.

- **Status:** Open
- **Measure:** By the end of Week 8, a learner explicitly shares a deck containing at least 10 cards with a teacher outside the team.
  Without step-by-step assistance from the team, the teacher reviews all 10 cards, saves at least one manual correction, and regenerates and saves at least one other card using their own API key.
  The learner then sees and studies both saved card versions in the application.
  Access checks using the teacher's account confirm that a separate unshared deck cannot be listed or read through the interface or direct requests, and that the learner's API key is absent from responses available to that account.
  An anonymized validation report records the application version, completed steps, before-and-after card contents, and access-check results without exposing personal API keys.
  The goal passes only if the complete review workflow and all access checks succeed.

## Failure And Success Statements

| Goal | Success statement | Failure statement |
| --- | --- | --- |
| [TOS-01](#tos-01) | Learners independently turn their own texts into cards and study the decks they choose. | Nobody outside the team can complete the text-to-study workflow without our help. |
| [TOS-01](#tos-01) | Learners return for scheduled reviews with their progress preserved. | Learners can generate cards but cannot continue studying them through scheduled reviews. |
| [TOS-02](#tos-02) | Most generated cards are usable without manual repair in every supported language. | Learners must edit or regenerate most cards because the sentences or translations are unsuitable. |
| [TOS-03](#tos-03) | A teacher corrects explicitly shared cards, and the learner studies the corrected versions. | Teacher review does not produce corrections the learner can actually use. |
| [TOS-03](#tos-03) | Sharing a deck preserves the privacy of other decks and personal API keys. | Sharing cards with a teacher exposes unrelated learning materials or the learner's API key. |

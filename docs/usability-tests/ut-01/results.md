# UT-01 Results

Three counted sessions ran on 2026-11-27, `P-05`, `P-06`, and `P-07`, all with Russian learners; a fourth session with a German learner is planned and is not included here.
Every figure below is for `n=3` and supports no claim about learners in general.
The analysis follows the [analysis plan](README.md#analysis-plan); the sanitized notes are in [`sessions/`](sessions/README.md), and the raw notes, recordings, and telemetry export are private.

## The Results

### Per-participant table

| Code | Language | Prior flashcard apps | Interview | Main task | Secondary 1 | Secondary 2 | Help | SEQ (main, S1, S2) | SUS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [P-05](sessions/P-05.md) | Russian, A2 | RemNote, Anki | English | `Unaided`, 295 s | `Assisted`, 60 s | `Unaided`, 46 s | S1: explained the rating buttons | 5, 7, 7 | 92.5 |
| [P-06](sessions/P-06.md) | Russian, A2 | None | English | `Unaided`, 173 s | `Unaided`, 83 s | `Unaided`, 30 s | None | 7, 6, 5 | 85.0 |
| [P-07](sessions/P-07.md) | Russian, A1 | None | English | `Assisted`, 210 s | `Failed`, 248 s | `Assisted`, 109 s | Main: named **Texts**; S1: pointed to the deck; S2: said where cards are kept | 6, 1, 5 | 50.0 |

### Main task

- **Reached the end state:** 3 of 3.
- **Unaided:** 2 of 3 (67%).
- **Time on task:** median 210 seconds, minimum 173, maximum 295; every participant finished inside the 10-minute limit.

### Secondary tasks

- **Secondary task 1, study a chosen deck:** 1 `Unaided`, 1 `Assisted`, 1 `Failed`.
- **Secondary task 2, replace a sentence:** 2 `Unaided`, 1 `Assisted`; all three finished inside the 5-minute limit.

### SEQ and SUS

- **Median SEQ:** main task 6, secondary task 1 6, secondary task 2 5, on a scale of 1 (very difficult) to 7 (very easy).
- **SUS:** mean 75.8, median 85.0, `n=3`; the scores spread from 50.0 to 92.5.

### Coverage

- **Learning language:** Russian 3, German 0; the German group is missing until the planned fourth session.
- **Prior flashcard experience:** experienced 1 (`P-05`), newcomers 2 (`P-06`, `P-07`).
- The one participant who failed a task and gave the lowest SUS is a newcomer at A1; no claim is made that level or experience caused it.

### Thematic analysis

1. **Finding the generated cards and starting to study them** (`P-05`, `P-07`): after generation, `P-07` could not find the two new cards among the seeded decks and gave up on studying them; `P-05` opened the seeded German deck first while looking for the Russian one.
2. **The rewrite controls** (`P-05`, `P-06`, `P-07`): the two icons on a card, **Mark to rewrite with others** and regenerate, were taken for each other by `P-05` and `P-06`, and `P-07` saw no progress while a sentence was regenerated and expected to press again.
3. **First-use guidance** (`P-05`, `P-06`, `P-07`): all three asked for a tutorial, a highlighted first walk-through, or an introduction; `P-05` did not know what the study ratings do until it was explained.
4. **Adding a text and choosing words is clear** (`P-05`, `P-06`): both described the text and word-selection steps as intuitive, and neither hesitated there.

### Instrumentation comparison

`<fill in from the staging export filtered by participant_code P-05, P-06, and P-07 and source=usability-test: for each session, whether text_added, word_marked, generation_completed, study_review_completed, and card_regeneration_completed fall inside the observer's task windows, and where they disagree with the observed outcomes>`

The instrumentation cannot show hesitation, detours, help, or which deck a study answer belonged to, per [what it cannot cover](README.md#what-it-cannot-cover); those come from the observation, and no test event is presented as a product metric.

## Findings

### Finding 1

After generating cards, a first-time learner cannot find the new cards or start studying them.

- **Severity:** Critical: it stopped `P-07` from reaching the end state of secondary task 1, which they gave up after four minutes.
- **Tasks:** `UT-01 Task 2` and `UT-01 Task 3`, from `UT-01 P-07` and `UT-01 P-05`.
- **Evidence:** `P-07` looked through the study screen and the deck list without finding the two cards and gave up ([P-07](sessions/P-07.md)); in the next task they found them only after help; `P-05` opened the seeded German deck first ([P-05](sessions/P-05.md)); see the [per-participant table](#per-participant-table).
- **Recommendation:** after generation, show which deck received the cards with a direct link to open that deck and to study the new cards; in the test account, keep only the decks the session needs.
- **Task issue:** `<link the task issue>`

### Finding 2

The two rewrite icons on a card are mistaken for each other, and regeneration shows no progress.

- **Severity:** Minor: `P-05` and `P-06` hesitated and `P-07` expected to press again, but no outcome changed because of it.
- **Tasks:** `UT-01 Task 3`, from `UT-01 P-05`, `UT-01 P-06`, and `UT-01 P-07`.
- **Evidence:** `P-06` took **Mark to rewrite with others** for regeneration and needed the hover text ([P-06](sessions/P-06.md)); `P-05` passed over it unsure what it does ([P-05](sessions/P-05.md)); `P-07` saw the new sentence only after a delay with no indicator ([P-07](sessions/P-07.md)).
- **Recommendation:** label the two controls in words rather than icons alone, and show a progress state on the card while a sentence is regenerated.
- **Task issue:** `<link the task issue, or None with the reason>`

### Finding 3

A first-time learner does not know what the study ratings do and asks for first-use guidance.

- **Severity:** Major: it caused the `Assisted` outcome of `P-05`'s secondary task 1; it is one participant, and the team rates it up rather than down because all three asked for first-use guidance.
- **Tasks:** `UT-01 Task 2`, from `UT-01 P-05`, with the post-test answers of `UT-01 P-05`, `UT-01 P-06`, and `UT-01 P-07`.
- **Evidence:** `P-05` asked whether **Hard**, **Good**, and **Easy** rate the sentence and was told they set how often the card returns ([P-05](sessions/P-05.md)); all three asked for a tutorial or introduction in the post-test ([theme 3](#thematic-analysis)).
- **Recommendation:** explain the ratings on the study screen the first time a learner studies, such as a one-line hint under the buttons, and offer a short first-use walk-through.
- **Task issue:** `<link the task issue>`

## Limitations

- **Sample:** `n=3`, all Russian learners; the German group is missing until the fourth session, and one experienced user against two newcomers supports no comparison between the groups.
- **Remote sessions:** the three sessions ran remotely on the participants' own computers and browsers, not in person on the team's laptop as [the design](README.md#participant-profile) requires; the device, the screen size, and the network differed between sessions, and the facilitator could not see the participant's hands.
- **Protocol:** the scenarios were paraphrased rather than read verbatim; in `P-05`'s session the facilitator moved on to studying inside the main task's time, so secondary task 1 was judged from that earlier study; each help to `P-07` followed a question from the participant, as the help rule allows, and still makes that outcome `Assisted`.
- **`P-07`'s familiarity:** the pre-test answer says `P-07` had used the product before, while in the session they said they had not; the session is counted on the session answer. `<confirm with the participant or remove from the count>`
- **Environment:** the test account held seeded decks in both languages, which `P-05` and `P-07` mistook for their own; the team observed every session.
- **What could not be measured:** which deck a study answer belonged to comes from the observation only, and the instrumentation comparison is listed above.

## Conclusion

1. **Can a representative learner turn chosen words into cards without help?** Mostly: all three reached the main task's end state within half its time limit, and two of three did it unaided; the third needed the **Texts** screen named.
2. **Where do learners hesitate?** After generation rather than before it: finding the new cards and starting to study them is where a newcomer failed, followed by the two look-alike rewrite icons and the study ratings' meaning; adding a text and choosing words caused no hesitation.
3. **How easy do learners rate it?** The main task's median SEQ is 6 of 7, and the median SUS is 85.0 (mean 75.8), with one newcomer at 50.0.

**Product response:** the team commits to [Finding 1](#finding-1), a direct link from the generation result to the new cards' deck and to studying them, as the first fix, and to [Finding 3](#finding-3), a first-use hint on the study ratings.
It commits to the labels and progress state of [Finding 2](#finding-2) when time allows in `SPRINT-09`.
It declines a full guided tutorial this course, because the first two fixes address where participants actually stopped, and a tutorial would cover steps that no participant found hard.

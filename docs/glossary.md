# Glossary

The words this project uses in one way only.

## Texts And Words

### Text

A passage the learner pasted in to pick words from, kept with its title, its source address, and notes, and separate from the cards made from it.

**Defined by:** [`FR-001`](functional-requirements/fr/FR-001.md), [`DEC-007`](decisions.md#dec-007), and [`DEC-046`](decisions.md#dec-046).

### Marked Word

A word the learner chose in one sentence of a text, either to learn, which gets a card for that sentence and its meaning there, or to ignore, which no sentence may use.

**Defined by:** [`FR-002`](functional-requirements/fr/FR-002.md) and [`US-02`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/31).

### Known Word

A word of the learner's texts that they left unmarked, which the product treats as a word the learner already knows and writes sentences from.

**Defined by:** [`FR-002`](functional-requirements/fr/FR-002.md) and [`ASM-04`](assumptions.md#asm-04).

### Source Sentence

The sentence of a text in which a word was marked, which fixes the meaning the word's card is written in.

**Defined by:** [`FR-003`](functional-requirements/fr/FR-003.md) and [`DEC-003`](decisions.md#dec-003).

## Cards And Decks

### Card

One marked word with a new sentence that uses it in its source meaning, the sentence's translation, the word's translation in that sentence, and the card's own review history.

**Defined by:** [`FR-003`](functional-requirements/fr/FR-003.md), [`DEC-007`](decisions.md#dec-007), and [`DEC-012`](decisions.md#dec-012).

### Deck

A named set of cards with its own language pair, level, generation instructions, and daily limits, which the learner generates cards into and chooses to study.

**Defined by:** [`FR-003`](functional-requirements/fr/FR-003.md), [`FR-008`](functional-requirements/fr/FR-008.md), [`DEC-007`](decisions.md#dec-007), [`DEC-024`](decisions.md#dec-024), and [`DEC-041`](decisions.md#dec-041).

### Generation Instructions

The learner-controlled deck guidance to the LLM about the sentences it should write, such as a topic, kept with each card generated under it and distinct from a teacher's corrective feedback.

**Defined by:** [`DEC-013`](decisions.md#dec-013), [`DEC-033`](decisions.md#dec-033), and [`DEC-097`](decisions.md#dec-097).

### Corrective Feedback

A teacher's explanation of what was wrong with a card's generated sentence, used to guide a rewrite without changing the learner's generation instructions.

**Defined by:** [FR-011](functional-requirements/fr/FR-011.md) and [DEC-097](decisions.md#dec-097).

### Flagged Card

A card whose sentence still failed an automatic check after three attempts, kept in its deck but out of study until it is fixed.

**Defined by:** [`FR-003`](functional-requirements/fr/FR-003.md), [`ADR-003`](architecture/adr/ADR-003.md), and [`DEC-048`](decisions.md#dec-048).

### Archived Card

A card taken out of study without permanent deletion, by its learner or a teacher with access to its shared deck, which stays in the learner's deck.

**Defined by:** [`FR-006`](functional-requirements/fr/FR-006.md), [`FR-011`](functional-requirements/fr/FR-011.md), [`DEC-034`](decisions.md#dec-034), and [`DEC-098`](decisions.md#dec-098).

### Rewrite

Replacing a card's sentence and translations with newly generated ones, optionally with instructions, while the card keeps its review history.

**Defined by:** [`FR-006`](functional-requirements/fr/FR-006.md) and [`DEC-035`](decisions.md#dec-035).

## Study

### Session

One run through the due and new cards of the decks the learner ticked on Today, within each deck's daily limits.

**Defined by:** [`FR-008`](functional-requirements/fr/FR-008.md), [`FR-009`](functional-requirements/fr/FR-009.md), and [`DEC-008`](decisions.md#dec-008).

### Again Card

A card rated `Again` or still being learned today, which comes back in the same day's session without counting against a daily limit.

**Defined by:** [`FR-009`](functional-requirements/fr/FR-009.md) and [`DEC-042`](decisions.md#dec-042).

## People And Keys

### Learner

A person with an account who brings texts, owns decks, and studies cards.

**Defined by:** [the product vision's stakeholders](product-vision.md#stakeholders).

### Teacher

A user acting as a reviewer for decks explicitly shared with their account, and nothing else of those learners'; Teaching is available to any account, while deck access still requires sharing.

**Defined by:** [`FR-011`](functional-requirements/fr/FR-011.md), [`DEC-044`](decisions.md#dec-044), and [`DEC-091`](decisions.md#dec-091).

### Own Key

A learner's or a teacher's own LLM API key, kept in their browser and sent only to their LLM provider, never to the product's server.

**Defined by:** [`FR-005`](functional-requirements/fr/FR-005.md), [`ADR-002`](architecture/adr/ADR-002.md), and [`DEC-019`](decisions.md#dec-019).

### Service Key

The product's own LLM API key, held by the backend and used when a learner has not chosen their own key.

**Defined by:** [`ADR-001`](architecture/adr/ADR-001.md) and [`DEC-028`](decisions.md#dec-028).

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

## Telemetry

### Telemetry

Limited data the product emits about use or operation for the two self-hosted pipelines.

**Defined by:** [the analytics plan](analytics.md) and [the observability plan](observability.md).

### Event

A named record of a product action, with a timestamp and the allowed fields for that action.

**Defined by:** [the event registry](analytics.md#the-events) and [`FR-013`](functional-requirements/fr/FR-013.md).

### Instrumentation

Code that captures product events or runtime signals and sends them to the configured analytics or observability backend.

**Defined by:** [`FR-013`](functional-requirements/fr/FR-013.md) and [`FR-014`](functional-requirements/fr/FR-014.md).

### Analytics Backend

A service that receives and stores allowlisted product events for analysis; this project uses separate OpenPanel projects for staging and production.

**Defined by:** [the analytics pipeline](analytics.md#the-pipeline) and [`ADR-006`](architecture/adr/ADR-006.md).

### Observability Backend

A service that receives runtime metrics and structured logs for operators to query; this project uses separate OpenObserve organizations for staging and production.

**Defined by:** [the observability pipeline](observability.md#the-pipeline) and [`ADR-007`](architecture/adr/ADR-007.md).

### Dashboard

A visual view of selected analytics events or runtime signals, charted for a chosen environment and time range.

**Defined by:** [the analytics dashboard](analytics.md#the-dashboard) and [the observability dashboard](observability.md#the-dashboard).

### Signal

A metric, log, or trace that reports how the product operates.

**Defined by:** [the observability plan](observability.md#the-signals).

### Observability

Using operating signals to understand the product's runtime behavior and diagnose a failure.

**Defined by:** [the observability plan](observability.md).

### SLI

A service level indicator: a defined, queryable measure of runtime quality, such as request duration P95.

**Defined by:** [SLI-01](observability.md#sli-01).

### Service level indicator

See [SLI](#sli).

## Product Analytics

### Metric

A product-analytics number computed from the product's events, such as the weekly count of completed study reviews, and never from what a usability session records.

**Defined by:** [the analytics plan](analytics.md#the-metric-tree).

### Focus Metric

The one number from which the product's value is read.

**Defined by:** [the analytics plan](analytics.md#the-metric-tree).

### Input Metric

A metric for a product step the team can change and use to explain movement in the focus metric.

**Defined by:** [the analytics plan](analytics.md#the-metric-tree).

### Counter-Metric

A metric that guards the focus metric against increasing it at the user's expense.

**Defined by:** [the analytics plan](analytics.md#the-metric-tree).

### Metric Tree

A nested view of the focus metric, its counter-metric, and the input metrics that explain it.

**Defined by:** [the analytics plan](analytics.md#the-metric-tree).

## Usability Testing

### Usability Test

A planned check of whether representative participants outside the team can reach a goal in the product without help, run from one test record such as `UT-01`.

**Defined by:** [the usability tests](usability-tests/README.md).

### Participant

A person aged 18 or older, outside the team and not the Customer, the instructor, or the course staff, who attempts a usability test's tasks under a code such as `P-01`.

**Defined by:** [`UT-01`'s participant profile](usability-tests/ut-01/README.md#participant-profile).

### Usability Session

One participant's run of a usability test's tasks, surveys, and debrief, counted only when it was consented to, recorded, and completed.

**Defined by:** [`UT-01`'s protocol](usability-tests/ut-01/README.md#protocol).

### Consent

A participant's durable, signed agreement, given before their usability session, to take part, to be recorded, and to have sanitized results published.

**Defined by:** [`UT-01`'s consent and data](usability-tests/ut-01/README.md#consent-and-data).

### Recording

The private screen and voice capture of a usability session, kept in the team's cloud recordings folder and deleted after the course is graded.

**Defined by:** [`UT-01`'s consent and data](usability-tests/ut-01/README.md#consent-and-data).

### Measure

A quantity one usability session records for one participant, such as a task's outcome, its time on task, an SEQ answer, or a SUS score.

**Defined by:** [`UT-01`'s measures](usability-tests/ut-01/README.md#measures).

### Statistic

A summary computed across participants from one measure's recorded values, such as a count, a proportion, a median, or a mean.

**Defined by:** [`UT-01`'s analysis plan](usability-tests/ut-01/README.md#analysis-plan).

### SUS

The System Usability Scale: ten standard statements a participant rates from 1 to 5 after all the tasks, scored from 0 to 100 as `2.5 × (20 + sum(odd) - sum(even))`.

**Defined by:** [`UT-01`'s surveys](usability-tests/ut-01/surveys.md#sus-after-all-the-tasks).

### SEQ

The Single Ease Question a participant answers after each task, rating how difficult or easy it was from 1, very difficult, to 7, very easy.

**Defined by:** [`UT-01`'s surveys](usability-tests/ut-01/surveys.md#seq-after-each-task).

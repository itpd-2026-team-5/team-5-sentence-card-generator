# Product analytics

## The Value And The Metrics

**Focus metric:** the unedited card retention rate measures the share of generated sentences the learner keeps without editing. This metric expresses [VP-01](research/value-proposition.md#vp-01).

### The Metric Tree

Each label names the metric's level in the tree.

- **Focus:** [Unedited card retention rate](#unedited-card-retention-rate)
  - **L1 (counter-metric):** [Flagged card rate](#flagged-card-rate)
  - **L1:** [First-attempt validation pass rate](#first-attempt-validation-pass-rate)
    - **L2:** [Target-word validation pass rate](#target-word-validation-pass-rate)
    - **L2:** [Sentence-constraints validation pass rate](#sentence-constraints-validation-pass-rate)

### Why This Focus Metric

- **It expresses value:** learners get sentences they can use as cards without spending time correcting them.
- **It represents the vision and strategy:** the product vision's goal is for learners to keep generated sentences without editing, and this is the first measure named by VP-01.
- **It is a leading indicator:** an unchanged card is an early signal that generation fits the learner, before the learner studies it.
- **It is actionable:** the team can investigate changes to generation prompts, validation, and learner context when the rate falls.
- **It is understandable:** it is the share of generated cards kept unchanged.
- **It is measurable:** generation, edit, and archive events can be matched by an opaque card identifier and timestamp.
- **It is not a vanity metric:** it reflects a learner's decision about a generated sentence rather than visits, registrations, or the volume of generation.

Rejected as a vanity metric: total generated cards, because volume does not show whether learners find the sentences useful.

The focus metric may have no value as a product measure until people outside the team use the product. The Customer and the team's test traffic are not end users; any value from usability or smoke traffic is not evidence of real-user value.
The focus metric depends on several input metrics, which help the team diagnose a change in the focus metric.

### Unedited card retention rate

**Definition:** Of generated cards old enough to have a complete seven-day observation window, the share still active and neither edited nor archived in the seven days after generation. The cohort covers the 30 days before the query, excluding the most recent seven days.

**Source:** [card_generated](#the-events), [card_edited](#the-events), and [card_archived](#the-events).

**Query:** For generation events in the trailing 30-day cohort that are at least seven days old, use `source IN ("web", "usability-test")`. Divide the distinct `card_id` count for cards with no matching `card_edited` or `card_archived` event in the seven days after generation by the distinct `card_id` count of all eligible `card_generated` events. Apply the same source filter to each event.

### Flagged card rate

**Definition:** Of cards generated in the cohort, the share still flagged after the automatic generation checks have used all three attempts.

**Source:** [card_generated](#the-events) and [card_flagged](#the-events).

**Query:** For `card_generated` events in the trailing 30 days with `source IN ("web", "usability-test")`, divide the distinct generated `card_id` count with a matching `card_flagged` event from the same generation by the distinct generated `card_id` count. Apply the same source filter to both events.

### First-attempt validation pass rate

**Definition:** Of cards with validation on their first generation attempt, the share that passes every required automatic check on that attempt, measured over the trailing 30 days.

**Source:** [card_validation](#the-events).

**Query:** For `card_validation` events in the trailing 30 days with `source IN ("web", "usability-test")`, divide the distinct `card_id` count whose required checks all have `attempt = 1` and `passed = true` by the distinct `card_id` count with a first-attempt validation event.

This rate is computed by the query from validation events, not tallied by hand.

### Target-word validation pass rate

**Definition:** Of target-word checks on a card's first generation attempt, the share that pass, measured over the trailing 30 days.

**Source:** [card_validation](#the-events).

**Query:** For `card_validation` events with `check = "target_word"` and `attempt = 1` in the trailing 30 days and `source IN ("web", "usability-test")`, divide the distinct `card_id` count with `passed = true` by the distinct `card_id` count checked.

### Sentence-constraints validation pass rate

**Definition:** Of sentence-constraint checks on a card's first generation attempt, the share that pass, measured over the trailing 30 days. Sentence constraints cover the configured length bounds and avoiding words the learner chose to ignore.

**Source:** [card_validation](#the-events).

**Query:** For `card_validation` events with `check = "sentence_constraints"` and `attempt = 1` in the trailing 30 days and `source IN ("web", "usability-test")`, divide the distinct `card_id` count with `passed = true` by the distinct `card_id` count checked.

## The Events

The event names cited above are proposed inputs for these queries. Part 3 will define the event registry, payload fields, and collection points before instrumentation; these names do not yet define an event schema. Events must use opaque card identifiers and must not contain sentence text or other personal data.

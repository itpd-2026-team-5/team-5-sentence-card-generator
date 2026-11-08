# Product analytics

The focus metric is **weekly completed study reviews**. It expresses [VP-02](research/value-proposition.md#vp-02): learners study the sentence cards made from their chosen words. It may have no value until real users create traffic.

## The Value And The Metrics

### The Metric Tree

The label marks each metric's level.

- **Focus:** [Weekly completed study reviews](#weekly-completed-study-reviews)
  - **L1 (counter-metric):** [Generation failure rate](#generation-failure-rate)
  - **L1:** [Generated cards](#generated-cards)
    - **L2:** [Marked words](#marked-words)
    - **L2:** [Texts added](#texts-added)

### Why This Focus Metric

- **Expresses value:** a review is the learner using a generated card.
- **Represents the vision and strategy:** it measures the study loop after choosing words and generating cards.
- **Leading indicator:** repeated reviews precede learning outcomes.
- **Actionable:** the team can improve generation and study entry points.
- **Understandable:** one completed rating is one review.
- **Measurable:** the backend emits an event after saving a rating.
- **Not a vanity metric:** it requires use of the core task, not a page view.

Rejected as a vanity metric: account registrations, because registration alone creates no studied card. The focus may depend on several inputs and can be empty before real use.

### Weekly completed study reviews

**Definition:** Count of saved study ratings in the trailing seven days, in reviews.

**Source:** [`study_review_completed`](#the-events).

**Query:** OpenPanel event count for `study_review_completed`, trailing seven days, filter `source != smoke`, grouped by day. The dashboard computes this query.

### Generation failure rate

**Definition:** Failed generation attempts divided by all completed or failed generation attempts in the trailing seven days, as a percentage; empty when there are no attempts.

**Source:** [`generation_failed`](#the-events), [`generation_completed`](#the-events).

**Query:** OpenPanel event counts, trailing seven days, filter `source != smoke`; divide `generation_failed` by the sum of `generation_failed` and `generation_completed`, multiplied by 100.

### Generated cards

**Definition:** Sum of new cards in completed batches in the trailing seven days, in cards.

**Source:** [`generation_completed`](#the-events).

**Query:** OpenPanel sum of `card_count` on `generation_completed`, trailing seven days, filter `source != smoke`.

### Marked words

**Definition:** Count of marks set to learn in the trailing seven days, in mark actions. Repeated changes can count again.

**Source:** [`word_marked`](#the-events).

**Query:** OpenPanel event count for `word_marked`, trailing seven days, filters `action = learn` and `source != smoke`.

### Texts added

**Definition:** Count of committed new texts in the trailing seven days, in texts.

**Source:** [`text_added`](#the-events).

**Query:** OpenPanel event count for `text_added`, trailing seven days, filter `source != smoke`.

## The Events

Names use `object_action` in snake case. Every row also carries `source` (enum `web`, `usability-test`, `smoke`, required) and `environment` (enum `staging`, `production`, `development`, required). The backend registry in `backend/app/analytics.py` enforces event-specific keys.

| Event | Fires when | Fields | Collected at |
| --- | --- | --- | --- |
| `text_added` | A learner saves a new text. | `language` (enum, required) | `backend`, staging and production |
| `word_marked` | A learner sets a word's mark. | `language` (enum, required), `action` (enum, required) | `backend`, staging and production |
| `generation_completed` | A generation request saves its cards. | `language` (enum, required), `card_count` (integer, required), `rewritten_count` (integer, required) | `backend`, staging and production |
| `generation_failed` | A generation request fails. | `language` (enum, required), `failure` (enum, required) | `backend`, staging and production |
| `card_rewrite_requested` | A learner or teacher first marks a card for rewriting. | `language` (enum, required), `actor` (`learner` or `teacher`, required) | `backend`, staging and production |
| `card_regeneration_completed` | An individual or batch rewrite saves replacement cards. | `language` (enum, required), `actor` (`learner` or `teacher`, required), `mode` (`single` or `batch`, required), `card_count` (integer, required) | `backend`, staging and production |
| `card_regeneration_failed` | An individual or batch rewrite fails at the provider. | `language` (enum, required), `actor` (`learner` or `teacher`, required), `mode` (`single` or `batch`, required) | `backend`, staging and production |
| `llm_usage_recorded` | A model response reports token usage, including retries and word glosses. | `task` (`cards` or `gloss`, required), `billing_scope` (`service` or `user_key`, required), `input_tokens` and `output_tokens` (integers, required) | `backend`, staging and production |
| `study_review_completed` | A learner saves a study rating. | `rating` (enum, required), `is_new` (boolean, required) | `backend`, staging and production |
| `teacher_card_approved` | A teacher approves a shared card. | No event-specific fields | `backend`, staging and production |

## The Pipeline

The backend posts allowlisted events to a self-hosted OpenPanel instance on the university VM. Staging and production use different OpenPanel projects and write credentials. Collection is disabled by `TELEMETRY_ENABLED=false`; missing configuration also disables export. Retain events for at least seven days. See [deployment](deployment.md#telemetry-pipelines) for configuration. A `source=smoke` event checks staging only; production must not receive test traffic. Addresses and credentials stay in private VM configuration.

## The Dashboard

Each project needs a dashboard with a **Weekly completed study reviews** chart using the query above and the same seven-day window. Add **Generated cards** when reviews have no data. The staging event list must show a smoke event while chart filters exclude it. Dashboard creation and live values require VM access and are not established by this repository change.

### Local operator views

The local OpenPanel project groups reports as **01 · Product overview**, **02 · Learning journey**, **03 · Generation quality**, and **04 · LLM usage (tokens, not cost)**. The learning view shows activity by step, review ratings, new versus repeat reviews, and generated cards by language. The quality view shows cards regenerated, cards marked for rewriting, rewrite attempts and failures, and learner versus teacher rewrites. It also sums `rewritten_count` from initial generation batches and divides it by generated cards to show automatic rewrites per card. The usage view separates calls made with the service's key from learners' own keys and shows input and output tokens. Reports exclude `source=smoke` and use a 30-day range; operators can change the dashboard time picker.

Regeneration is a **quality signal**, not a satisfaction score. A rewrite may reflect a typo, a teacher's preference, or a request for variety. Compare it with the number of generated cards, failure rate, and study reviews before drawing conclusions. Older events have no `rewritten_count`; the automatic rewrite report starts when the updated backend emits it. Empty charts mean there were no matching events in the selected time range.

## Collected Data

Events contain only the enumerated fields, their source, and environment. No text body, word, sentence, translation, email, name, account ID, IP address, request header, or key is forwarded by the product event sender. Data lives in the corresponding OpenPanel project. Disable collection with `TELEMETRY_ENABLED=false`.

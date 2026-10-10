# Product vision

Sentence Card Generator

## Goal

A learner of Russian, English, or German turns the words they mark in a text they chose into cards whose new sentences they keep without editing, studies the decks they choose first, and has a teacher correct the cards they share.

**Supports:** [VP-01](research/value-proposition.md#vp-01), [VP-02](research/value-proposition.md#vp-02), [VP-03](research/value-proposition.md#vp-03).

## Stakeholders

- **Learner**: people studying Russian, English, or German who want personalized, LLM-generated sentences matched to their level.
- **Teacher**: language instructors who need full visibility into their students' study materials to review and correct them.
- **Customer**: decides the scope and wants to eliminate the manual workarounds required by previous tools.
- **Operator**: our team runs the web application during the course.
- **Payer**: the learner pays for generation through their own LLM API key, and a teacher who regenerates cards uses their own key, per [`DEC-019`](decisions.md#dec-019).
- **LLM API provider**: receives the sentence around each marked word, not the whole text, per [`DEC-015`](decisions.md#dec-015).

## Constraints

### CON-01

Accept plain text as the only input format for vocabulary extraction.

- **Status:** Active
- **Source:** Customer-given
- **What it costs:** users must manually copy and paste texts, and we lose users who prefer automated video pipelines.
- **Decision:** [`DEC-001`](decisions.md#dec-001)

### CON-02

Deploy as a web application specifically targeting Firefox and Chrome browsers.

- **Status:** Active
- **Source:** Customer-given
- **What it costs:** no native offline capabilities for studying on the go.
- **Decision:** [`DEC-002`](decisions.md#dec-002)

### CON-03

Restrict language generation and support explicitly to Russian, English, and German.

- **Status:** Active
- **Source:** Customer-given
- **What it costs:** limits market reach by turning away learners of other popular languages.

### CON-04

Build and deliver the product by a team of 3-4 members within a single academic semester.

- **Status:** Active
- **Source:** Environmental
- **What it costs:** caps total development hours, forcing the team to reject complex features.

### CON-05

Handle review scheduling internally using an established spaced-repetition algorithm like FSRS.

- **Status:** Active
- **Source:** Customer-given
- **What it costs:** drastically increases development scope compared to just generating an export file for Anki.
- **Decision:** [`DEC-005`](decisions.md#dec-005)

## Boundary

### BND-01

Extract vocabulary, audio, or subtitles directly from video streaming platforms such as YouTube or Netflix.

- **Status:** Active
- **Handled by:** The user, by hand
- **Why:** [`CON-01`](#con-01): the product relies entirely on plain text inputs.

### BND-02

Provide offline study capabilities and review sessions through a native mobile application.

- **Status:** Active
- **Handled by:** Nobody
- **Why:** [`DEC-002`](decisions.md#dec-002): the Customer decided a web application is sufficient for now.

### BND-03

Support vocabulary generation, translations, or learning tools for languages other than Russian, English, and German.

- **Status:** Active
- **Handled by:** Nobody
- **Why:** [`CON-03`](#con-03): restricted scope to manage QA and prompt engineering costs.

### BND-04

Provide a built-in library of graded reading materials, books, or articles.

- **Status:** Active
- **Handled by:** The user, by hand
- **Why:** team reasoning: the core premise is built around learners bringing their own texts.

### BND-05

Take or pass on payments between a learner and their teacher.

- **Status:** Active
- **Handled by:** The learner and the teacher, outside the product
- **Why:** [`DEC-020`](decisions.md#dec-020): the Customer decided in the validation meeting that payments stay outside the service.

## System Context

![System context diagram](architecture/context.png)

The learners, teachers, and the customer are the actors.
The external system is the LLM API provider.

## Where The Detail Lives

- [User stories](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues?q=label%3Auser-story)
- [Week 2 report](../reports/week-02/README.md)

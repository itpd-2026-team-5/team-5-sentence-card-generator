# Week 2 Report

**Project:** Sentence Cards Generator, ITPD Team 5.
**Scope:** Assignment 2, Requirements And Prototyping: the decisions and assumptions logs, the Markdown check, the product vision, the user stories, the minimum usable product candidate, a prototype, and the validation meeting with the Customer.

## Summary

We moved the Week 1 decisions and assumptions into their own logs, added a Markdown check, reformatted the research, wrote the user stories as issues, and built a code spike of the learner flow, which we showed the Customer in the validation meeting on 2026-10-09.

What we were wrong about:

- **Texts are not decks.** We treated each text as the unit the learner studies and orders. The Customer separates them: words are picked in a text, cards are generated into a deck, a card stays independent of its text, and the learner studies one deck or a chosen set of decks, as in Anki. Ordering texts (`ASM-09`) is not how the learner chooses what comes first.
- **The profile questionnaire.** We expected a questionnaire about the learner's profession and interests to steer the sentences (`DEC-004`). The Customer finds it unnecessary and intrusive, and wants instructions per deck instead.
- **The card layout.** We flipped the card to show the translation. The Customer wants the sentence to stay in place, the translation added below it, the target word and its translation above it, and the sentence read aloud automatically.

The meeting also settled who pays for the LLM: the learner brings their own API key, kept in their browser if possible, or uses a subscription, and the teacher uses their own key.
Still open: whether a card's sentence should take one sentence of context or the sentences around it, how long a sentence may be in characters, and when a teacher's regeneration runs.

## Coverage

| Deliverable | Artifact |
| --- | --- |
| Kickoff action points | [reports/week-02/meeting-report.md](meeting-report.md#previous-action-points) |
| Kickoff open questions | [reports/week-02/meeting-report.md](meeting-report.md#previous-open-questions) |
| Product vision | [`docs/product-vision.md`](../../docs/product-vision.md) |
| System context diagram | [`docs/architecture/context.png`](../../docs/architecture/context.png) and its source, embedded in [`docs/product-vision.md`](../../docs/product-vision.md) |
| Assumptions | [`docs/assumptions.md`](../../docs/assumptions.md) |
| Decisions | [`docs/decisions.md`](../../docs/decisions.md) |
| Story issues | (https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues?q=is%3Aissue%20label%3Auser-story) |
| Issue forms | [`.github/ISSUE_TEMPLATE/user-story.yml`](../../.github/ISSUE_TEMPLATE/user-story.yml), [`.github/ISSUE_TEMPLATE/task.yml`](../../.github/ISSUE_TEMPLATE/task.yml), and [`.github/ISSUE_TEMPLATE/config.yml`](../../.github/ISSUE_TEMPLATE/config.yml) |
| Labels | [the repository's labels page](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/labels), with `user-story`, `task`, and the `moscow:*` labels |
| Pull request template | [`.github/pull_request_template.md`](../../.github/pull_request_template.md) |
| Prototypes | [`reports/week-02/prototypes.md`](prototypes.md) |
| Meeting script | [`reports/week-02/meeting-script.md`](meeting-script.md) |
| Customer validation | [`reports/week-02/meeting-report.md`](meeting-report.md), and [`reports/week-02/meeting-transcript.md`](meeting-transcript.md) |
| AI usage | [`reports/week-02/ai-usage.md`](ai-usage.md) |

## Minimum Usable Product Candidate

Core task: a learner turns a text they chose into cards that carry a new sentence for each word they marked.

- [`US-01`: Bring in a text I chose](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/30)
- [`US-02`: Mark the words I want to learn in a text](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/31)
- [`US-03`: Get a new sentence for each word I marked](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/32)

Customer's verdict: Pending. No decision accepting or rejecting the exact MUP candidate was recorded during the meeting. The verdict is carried forward as an open question to be documented with a new DEC-nnn in Week 3.
The meeting did not give an explicit verdict on the candidate; the Customer said three stories are enough for a prototype.

## What the prototype changed

The customer's feedback on the prototype resulted in significant structural, interface, and logic changes to the product requirements:

* **Data Structure & Navigation:** The prototype originally treated source texts effectively as decks. This was corrected so that texts are merely sources for word selection; generated cards are now independent objects that can be assigned to one or more selected decks (DEC-007).
* **Study Session Flow:** Instead of automatically gathering all ready cards across the application, learners must now explicitly select a deck or a subset of decks before a study session begins (DEC-008).
* **Card Interface:** The review layout will keep the original-language sentence fixed in place when revealing the translation beneath it (DEC-009). Additionally, sentence audio will play automatically when a card is shown (DEC-010), and the translation displayed will be specific to the contextual meaning of the word in that exact sentence (DEC-011).
* **Context & Generation Prompting:** The plan to use a global, user-level profile questionnaire for generation context was scrapped. Instead, generation instructions will be optional and configured per deck (DEC-013, reversing DEC-004). To generate cards, the LLM will only receive the specific source sentence and its immediate neighbors, rather than the entire text or a summary (DEC-015).
* **Generation Constraints:** Sentence length controls must now support character limits, not just word counts, specifically to handle long compound words in German (DEC-014).
* **Teacher Interface & Access:** The bulky, card-by-card list view for teachers will be replaced with a compact table offering immediate inline regeneration (DEC-017, DEC-018).
* **Security:** The API key model was adjusted so that learners can use their personal keys without being forced to expose them to reviewing teachers (DEC-019).

## Repository evidence

- Merged pull request that closed its task issue: [#19](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/19), which closed [#18](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/18).
- Latest green link check run on `main`: [Link check](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/runs/38083400434)
- Latest green Markdown check run on `main`: [markdown check](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/runs/38083400441)

## Contributions

..................................

## Deviations

None.

No private-only material was committed to the repository.

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
| Kickoff action points | TODO: `reports/week-02/meeting-report.md#previous-action-points` |
| Kickoff open questions | TODO: `reports/week-02/meeting-report.md#previous-open-questions` |
| Product vision | TODO: `docs/product-vision.md` |
| System context diagram | TODO: `docs/architecture/context.<ext>` and its source, embedded in `docs/product-vision.md` |
| Assumptions | [`docs/assumptions.md`](../../docs/assumptions.md) |
| Decisions | [`docs/decisions.md`](../../docs/decisions.md) |
| Story issues | [the `US-nn` issues, filtered by the `user-story` label](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues?q=is%3Aissue%20label%3Auser-story) |
| Issue forms | [`.github/ISSUE_TEMPLATE/user-story.yml`](../../.github/ISSUE_TEMPLATE/user-story.yml), [`.github/ISSUE_TEMPLATE/task.yml`](../../.github/ISSUE_TEMPLATE/task.yml), and [`.github/ISSUE_TEMPLATE/config.yml`](../../.github/ISSUE_TEMPLATE/config.yml) |
| Labels | [the repository's labels page](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/labels), with `user-story`, `task`, and the `moscow:*` labels |
| Pull request template | [`.github/pull_request_template.md`](../../.github/pull_request_template.md) |
| Prototypes | [`reports/week-02/prototypes.md`](prototypes.md) |
| Meeting script | TODO: `reports/week-02/meeting-script.md` |
| Customer validation | TODO: `reports/week-02/meeting-report.md`, and `reports/week-02/meeting-transcript.md` when there is one |
| AI usage | TODO: `reports/week-02/ai-usage.md` |

## Minimum Usable Product Candidate

Core task: a learner turns a text they chose into cards that carry a new sentence for each word they marked.

- [`US-01`: Bring in a text I chose](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/30)
- [`US-02`: Mark the words I want to learn in a text](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/31)
- [`US-03`: Get a new sentence for each word I marked](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/32)

Customer's verdict: TODO `DEC-nnn`.
The meeting did not give an explicit verdict on the candidate; the Customer said three stories are enough for a prototype.

## What the prototype changed

TODO after the validation meeting: the `US-nn`, boundary item, constraint, or `ASM-nn` that changed because of what the Customer said about the prototype, what changed in it, and the `DEC-nnn` behind the change.

## Repository evidence

- Merged pull request that closed its task issue: [#19](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/19), which closed [#18](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/18).
- Latest green link check run on `main`: TODO.
- Latest green Markdown check run on `main`: TODO.

## Contributions

TODO: each member's GitHub username and the work they did, with links to their pull requests, commits, or reviews.

## Deviations

TODO: anything we did differently from the assignment, or "None."

No private-only material was committed to the repository.

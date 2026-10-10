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
| Kickoff action points | [`reports/week-02/meeting-report.md#previous-action-points`](meeting-report.md#previous-action-points) |
| Kickoff open questions | [`reports/week-02/meeting-report.md#previous-open-questions`](meeting-report.md#previous-open-questions) |
| Product vision | [`docs/product-vision.md`](../../docs/product-vision.md) |
| System context diagram | [`docs/architecture/context.png`](../../docs/architecture/context.png), embedded in [`docs/product-vision.md#system-context`](../../docs/product-vision.md#system-context) |
| Assumptions | [`docs/assumptions.md`](../../docs/assumptions.md) |
| Decisions | [`docs/decisions.md`](../../docs/decisions.md) |
| Story issues | [the `US-nn` issues, filtered by the `user-story` label](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues?q=is%3Aissue%20label%3Auser-story) |
| Issue forms | [`.github/ISSUE_TEMPLATE/user-story.yml`](../../.github/ISSUE_TEMPLATE/user-story.yml), [`.github/ISSUE_TEMPLATE/task.yml`](../../.github/ISSUE_TEMPLATE/task.yml), and [`.github/ISSUE_TEMPLATE/config.yml`](../../.github/ISSUE_TEMPLATE/config.yml) |
| Labels | [the repository's labels page](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/labels), with `user-story`, `task`, and the `moscow:*` labels |
| Pull request template | [`.github/pull_request_template.md`](../../.github/pull_request_template.md) |
| Prototypes | [`reports/week-02/prototypes.md`](prototypes.md) |
| Meeting script | [`reports/week-02/meeting-script.md`](meeting-script.md) |
| Customer validation | [`reports/week-02/meeting-report.md`](meeting-report.md), [`reports/week-02/meeting-transcript.md`](meeting-transcript.md) |
| AI usage | [`reports/week-02/ai-usage.md`](ai-usage.md) |

## Minimum Usable Product Candidate

Core task: a learner turns a text they chose into cards that carry a new sentence for each word they marked.

- [`US-01`: Bring in a text I chose](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/30)
- [`US-02`: Mark the words I want to learn in a text](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/31)
- [`US-03`: Get a new sentence for each word I marked](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/32)

Customer's verdict: not yet given.
The Customer said three stories are enough for a prototype, but did not accept or reject this candidate; asking for the verdict is an [action point](meeting-report.md#action-points) due in Week 3.

## What the prototype changed

[`ASM-09`](../../docs/assumptions.md#asm-09) is now `Refuted`: the learner chooses which decks to study instead of ordering texts, per [`DEC-007`](../../docs/decisions.md#dec-007) and [`DEC-008`](../../docs/decisions.md#dec-008).

## Repository evidence

- Merged pull request that closed its task issue: [#19](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/19), which closed [#18](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/18).
- Latest green link check run on `main`: [run 38080094882](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/runs/38080094882).
- Latest green Markdown check run on `main`: [run 38080094871](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/runs/38080094871).
- The link check excludes one link, the Figma research board, because Figma answers automated requests with HTTP 403; we opened it in a private browser window, without signing in, on 2026-10-10.

## Contributions

| Member | Work |
| ------ | ---- |
| @KaramKhaddour | Decisions and assumptions logs, Markdown check, prototype: [#15](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/15), [#17](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/17), [#19](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/19), [#22](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/22), [#24](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/24), [#25](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/25), [#45](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/45). Reviewed [#13](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/13#pullrequestreview-5462790015), [#26](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/26#pullrequestreview-5479484575), [#29](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/29#pullrequestreview-5479577627). |
| @saleemasekrea000 | Research identifiers, story form, [user stories](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues?q=label%3Auser-story): [#26](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/26), [#29](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/29). Reviewed [#15](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/15#pullrequestreview-5478719903), [#22](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/22#pullrequestreview-5478746660), [#25](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/25#pullrequestreview-5479209693). |
| @Byakko-san | Product vision: [#48](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/48). Issue templates: [#13](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/13). Reviewed [#19](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/19#pullrequestreview-5479145800), [#45](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/45#pullrequestreview-5480147518), [#47](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/47#pullrequestreview-5480510850). |
| @Horokk1 | Week 2 meeting: [#47](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/47). Reviewed [#24](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/24#pullrequestreview-5479034508), [#45](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/45#pullrequestreview-5479989853), [#48](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/48#pullrequestreview-5480430897). |

## Deviations

- The Customer has not yet given a verdict on the minimum usable product candidate, so the candidate cites no `DEC-nnn`; we record it in Week 3.
- [#13](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/13) and [#26](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/26) came from branches without an issue number, and #26 closed no task issue.
- [#24](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/24) also changed Week 1 files, in commit 17490dd, which belonged in the formatting-only pull request.
- `US-13` ([#33](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/33)) was opened before `US-04` to `US-12`, so its issue number is lower; story numbers are not issue numbers, so we did not renumber.

No private-only material was committed to the repository.

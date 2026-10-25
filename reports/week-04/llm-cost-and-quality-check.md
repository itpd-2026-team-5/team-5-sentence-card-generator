# Real-Model Cost And Quality Check

The Week 3 action point "Obtain a working API key and run the real text-to-card flow … measure quality and token cost and update the checks for ASM-01 and ASM-02 with evidence" ([Week 3 action points](../week-03/meeting-report.md#action-points)), run on 2026-10-25.

## Method

- Product: `main` at the merge of [#120](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/120), run with docker compose, with the service key on `claude-sonnet-4-5` through an Anthropic-compatible gateway.
- A new learner account, so its statistics start at zero, with the default sentence length of 8 to 12 words, no character bounds, and level A2 in German and Russian and B1 in English.
- Three texts written by the team: German (300 words), Russian (141 words), and English (156 words), each in its own deck with no instructions.
  The first 34, 33, and 33 distinct words of four letters or more, without common function words, were marked to learn.
- Cards were generated for each text, then 10 cards spread over the three decks were rewritten one at a time.
- Token counts are the ones the provider reported, from the product's generation log; prices are Anthropic's list prices for Claude Sonnet 4.5, $3 per million input tokens and $15 per million output tokens, from [the pricing page](https://platform.claude.com/docs/en/about-claude/pricing) on 2026-10-25.
  The gateway's own price per token is not published, so the cost below is the list price.

## Results

| Step | Requests | Cards | Input tokens | Output tokens | Cost at list price | Time |
| --- | --- | --- | --- | --- | --- | --- |
| Generate, German | 2 | 34 | 33,046 | 2,753 | $0.140 | 83 s |
| Generate, Russian | 2 | 33 | 20,482 | 2,946 | $0.106 | 43 s |
| Generate, English | 2 | 33 | 15,655 | 2,822 | $0.089 | 32 s |
| Rewrite one card | 10 | 10 | 64,891 | 950 | $0.209 | 7 to 37 s each |
| **Total** | 16 | 110 | 134,074 | 9,471 | **$0.544** | |

- Every one of the 100 generated cards passed the product's checks on the first attempt: the word in the sentence and 8 to 12 words; none was flagged and no sentence was asked for again.
- A generated card costs about $0.0034; a rewrite costs about $0.021, six times as much, because each request repeats the known-word list for a single word.
- With 10% of cards rewritten, a card costs about $0.0054, so $4 of usage at list price makes about 730 cards; with 30% rewritten, about $0.0096 a card and about 410 cards.
- A learner who makes 300 cards a month costs about $1.63 a month with 10% rewritten, and $2.89 with 30%; a subscription keeps a 50% margin on that at $3.30 and $5.80 a month.

## Unknown Words

Each sentence's words were compared with the words of the learner's texts, without the card's own word.
Inflected forms of a known word count as unknown here, so the numbers overstate what the learner does not know.

| Language | Sentences | Average unknown words | Sentences with none | Sentences with at most one |
| --- | --- | --- | --- | --- |
| German | 30 | 0.8 | 14 | 24 |
| Russian | 30 | 6.1 | 0 | 0 |
| English | 30 | 5.7 | 0 | 0 |

The difference comes from the product, not the model: the known-word list sent with each request is built from all the learner's texts in every language and cut at 150 words, so the German text filled it, and the Russian and English requests were sent German words as the learner's known words.
A learner who learns two languages therefore gets sentences that ignore what they know in the second one.

## Not Yet Checked

Whether the sentences are natural and the translations correct needs a fluent reviewer for each language, as [`TOS-02`](../../docs/threshold-of-success.md#tos-02) describes.
The first 30 cards generated in each language are kept as the sample for that review.

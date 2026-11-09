# Supplemental written Customer review — 2026-11-09

The team sent written questions after the Week 6 meeting and received a Word document with answers in comments. The file itself is private; this public record transcribes the Customer's comments without identity or document metadata. The response did not supply a time of day.

## Dashboard and test questions

| Team question, shortened for readability | Customer's written response |
| --- | --- |
| Does the product dashboard show useful information about text, card, and study activity? | "Yes" |
| What important question does it fail to answer? | "What do you measure to make sure that it's not a single spammer produces most of the traffic?" |
| Are the failed request, request duration, and route/result labels clear on the system dashboard? | "Yes" |
| Is the timed staging failure test enough to investigate the request? What else is needed? | "View logs that show the failure" |
| Is the evidence sufficient for each product-analytics criterion: one event per completed step, no learner/card text, and counts for a selected period? | "Yes" |
| Is the evidence sufficient for each monitoring criterion: environment labels, signals on both dashboards, and actual route/result labels? | "yes" |

The [QR-10 evidence](qr10-evidence.md#openobserve-evidence) includes a request-ID log screenshot showing the failure. The Customer's comment does not explicitly say whether that existing screenshot satisfies the requested log view.

## Success goals

The team asked whether to retain the three proposed success conditions: three outside learners completing the text-to-study and later review workflow; at least 24 of 30 first-generated cards passing in each of Russian, English, and German; and an outside teacher correcting and regenerating shared cards without access to private decks or keys.

On the learner condition, the Customer wrote: "Better try with four learners. They complete the scenario in the desktop and mobile versions using Firefox and Chrome. Each combination platform-browser is assigned to at least one participant. Each combination requires a separate account."

On the general agreement question, the Customer wrote: "Replied for the learner framework". No separate comment requested a change to the card-quality or teacher/privacy conditions. This response changes [TOS-01](../../docs/threshold-of-success.md#tos-01) through [DEC-125](../../docs/decisions.md#dec-125); it does not report that any success goal has already passed.

## Release decision

The team asked whether REL-06 could be released with the production Claude API connection failure disclosed and the fix moved to SPRINT-07, or should be delayed until new-card generation works. The Customer wrote: "Yes". The team records this as approval of the stated limited release in [DEC-126](../../docs/decisions.md#dec-126). No additional condition was supplied. The response does not prove that the release has been cut.

## Publication

Asked whether the answers could be quoted without the Customer's name in the public course report, the Customer wrote: "Yes".

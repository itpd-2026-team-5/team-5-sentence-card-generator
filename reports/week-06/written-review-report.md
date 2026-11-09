# Supplemental written Customer review report

## Metadata

- **Date received:** 2026-11-09; the response document supplied no time of day.
- **Participants:** Customer and the team through a written question-and-comment exchange.
- **Presented:** public product dashboard screenshots, system dashboard screenshots, and the [QR-10 failed-request evidence](qr10-evidence.md).
- **Record:** [anonymized written response](written-review-transcript.md).
- **Publication:** the Customer permitted anonymous quotation in the public course report. The original Word document remains outside the repository.

## Outcomes

| Topic | Customer response | Result and limit |
| --- | --- | --- |
| Evidence presentation | Asked for screenshots embedded in the Markdown pages instead of separate image links. | The [product evidence](openpanel-evidence.md#screenshots), [system evidence](openobserve-dashboard-evidence.md#screenshots), and [Week 6 report](README.md#dashboard-evidence) now show the screenshots inline. |
| Product dashboard | Yes; asked how to detect whether one spammer produces most traffic. | Dashboard usefulness affirmed. Unique-contributor or abuse measurement is a follow-up, with privacy-preserving design still to decide. Aggregate counts alone cannot answer it. |
| System dashboard | Yes to failed request, duration, and route/result clarity. | Current labels and failure view accepted in the written review. |
| Timed staging failure | Asked to view logs that show the failure. | [QR-10 log evidence](qr10-evidence.md#openobserve-evidence) already shows the request ID, route, result, HTTP status, and duration. Whether that view fully answers the request was not explicitly confirmed. |
| US-16 product analytics | Yes to the question asking whether evidence suffices for each of its three criteria. | Customer accepted the presented evidence for event coverage, text exclusion, and period counts. This is an evidence verdict, not a new independent event-duplication test. |
| US-17 system monitoring | Yes to the question asking whether evidence suffices for each of its three criteria. | Customer accepted the presented evidence for environment scopes, both dashboards, and resolved route/result labels. |
| Success goals | Requested four learners, separate accounts, and all four desktop/mobile × Firefox/Chrome combinations. | [DEC-125](../../docs/decisions.md#dec-125) changes TOS-01's measure. TOS-02 and TOS-03 received no requested change, but neither has validation results yet. |
| REL-06 | Yes to release with the disclosed production Claude API limitation and its fix in SPRINT-07. | [DEC-126](../../docs/decisions.md#dec-126) approves the limited release. Tag, changelog, plan record, and final deployment verification remain to be completed. |

## Decisions

- [DEC-125](../../docs/decisions.md#dec-125): four-learner platform/browser validation for TOS-01.
- [DEC-126](../../docs/decisions.md#dec-126): limited REL-06 release accepted with the production provider connection limitation disclosed.

## Follow-up actions

- **Byakko-san, SPRINT-07:** define a privacy-preserving way to assess whether one actor dominates product events, and ask the Customer to review the proposed measure. Do not infer distinct learners from the current aggregate event counts.
- **KaramKhaddour, SPRINT-07:** present the existing request-ID failure-log view to the Customer and confirm whether it supplies enough detail for investigation; preserve the QR-10 timing evidence.
- **KaramKhaddour, SPRINT-07:** repair or replace the production Claude API connection, then rerun real-provider card generation and record the result.
- **Horokk1, before the Week 6 release is marked complete:** complete the REL-06 tag, changelog, plan record, and production verification against the approved limitation; retain the failed generation result in the release notes.
- **Byakko-san, before Week 8 validation:** recruit four learners with separate accounts, assign one to each platform/browser combination, and record both study sessions and later scheduled reviews anonymously.

## Open questions

- Which privacy-preserving traffic measure should expose a single actor dominating events?
- Does the existing QR-10 request-ID log screenshot satisfy the Customer's requested failure-log view?

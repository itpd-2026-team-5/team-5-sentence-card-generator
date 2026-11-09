# Part 13 deployment and verification — late Week 6

The team redeployed main commit `a658ea49dc767cd7579e38949369a4880ecaa51d` on 2026-11-09, after the SPRINT-06 deadline. These are the results supplied from the university VM and a production browser check. The VM build logs remain private; this record omits its address, credentials, cookies, and database backup.

| Check | Result |
| --- | --- |
| Staging `docker compose up -d --build` | Exit 0; backend and frontend started, database healthy |
| Staging `/api/health` | HTTP 200 at 11:12:55 UTC; `{"status":"ok"}` |
| First staging QR-10 rerun | Log queryable in 0.231 s; numeric SLI-01 P95 not found within 60 s; exit 1 |
| Second staging QR-10 rerun | Pass at 11:30:51 UTC; matching log in 0.443 s, numeric SLI-01 P95 in 2.016 s; exit 0 |
| Production database backup | Created and confirmed nonempty before redeployment; retained privately on the VM |
| Production `docker compose up -d --build` | Exit 0; backend and frontend started, database healthy |
| Production `/api/health` | HTTP 200 at 11:15:59 UTC; `{"status":"ok"}` |
| Production card generation | HTTP 502 at 11:20:14 UTC; `Could not reach the Claude API.` |

The passing staging check used request ID `2d9a295e-3dd8-4178-8e40-5a01b4bfd764`, route `/api/texts/{text_id}/generate`, outcome `server_error`, and a numeric five-minute [SLI-01](../../docs/observability.md#sli-01) P95 of 24.68938259363553 ms. Its log duration was 22.404480958357453 ms. The [sanitized checker result](part13-qr10-result.json) records both deadline booleans as true and the same checkout commit. No QR-10 failure request was sent to production.

The [production screenshot](images/production-existing-deck-after-redeploy.png) shows that an existing deck and its saved cards were accessible after redeployment. It does not show a newly generated card or a completed study rating; the displayed study count is zero. The attempted production `POST /api/texts/{text_id}/generate` returned HTTP 502 with request ID `878e61de-27a3-4baf-904a-ffc5d31da282`. This matches the [previously recorded provider reachability limitation](../../docs/deployment.md#2026-10-31-card-generation-cannot-reach-an-llm-from-the-vm), but the present attempt still fails the real-generation part of the production core-task check. Pronunciation playback was not reported.

The staging QR-10 retry passed **after** the production redeployment, so the required test-before-production order was not met on this run. The same checkout commit was used for both builds, but the supplied evidence does not independently label each running image with its source commit. The team must record the production limitation and the order deviation; it must not claim complete production core-task verification or a new Customer acceptance decision from this evidence. Provider access and any requested rework remain follow-up work.

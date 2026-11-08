# OpenObserve dashboard evidence

On 2026-11-08, the operator checked the staging and production OpenObserve organizations on the university VM. The dashboard definitions and [SLI-01 query](../../docs/observability.md#sli-01) were already tracked with the telemetry provisioning work. The screenshots below omit the dashboard addresses and credentials.

## Staging

The [staging operator dashboard](images/observability-staging.png) displayed the `SLI-01 Backend request duration` panel with plotted request-duration series. Its [hover detail](images/observability-staging-sli-tooltip.png) showed numeric values for core-task routes including `/api/texts`, `/api/decks`, and `/api/study`; these visible series had `outcome=ok`. The [generation panel](images/observability-staging-generation-error.png) separately showed a `server_error` for `/api/texts/{text_id}/generate` and a route P95 around 1.7 seconds. The screenshot does not establish the cause of that generation failure or link it to an SLI-01 failure series.

## Production

Production initially had no `http_requests` stream. After the production backend was redeployed with telemetry enabled, the public health endpoint returned HTTP 200 with request ID `a5068fcd-8fd2-4f6c-9b4b-edd1427f71e9`. The [production log query](images/observability-production-health-log.png) found that ID in the production organization's `http_requests` stream at 18:48:25.165 UTC, with route `/api/health`, outcome `ok`, and status 200. The [production operator dashboard](images/observability-production.png) then rendered its request panels and plotted an `/api/health · ok` SLI-01 series.

The [production query for a staging-only request ID](images/qrt-01-production-no-match.png) returned zero rows over the surrounding two hours. That check supports separation for that request ID. No deliberate failure request was sent to production.

These screenshots establish that both organizations can query their own request data and display an SLI-01 series. They do not complete [QR-10 QRT-01](../../docs/quality-requirements/qr/QR-10.md#qrt-01): a failed core-task response still needs a matching request log, a numeric `server_error` SLI-01 series, and measured arrival times. The running container image also needs to be tied to the recorded application commit.

# Observability

The backend reports request duration and outcome to help diagnose failures in staging and production.

## The Signals

Every completed HTTP request records a `cards_request_duration_ms` histogram point with `route` and `outcome` (`ok`, `client_error`, or `server_error`). It also emits one structured `http_request` log point with a random `request_id`, route template, outcome, numeric `status_code`, and `duration_ms`. The response exposes the same ID in `x-request-id`. The product emits no trace span or alert this week.

## The SLIs

### SLI-01

Backend request duration P95.

**Status:** Active

**Definition:** The 95th percentile of completed request duration over five minutes, separated by `route` and `outcome`. `request_id` joins one failed response to its log line; `outcome=server_error` identifies a failure. It includes the full response body transfer.

**Unit:** Milliseconds.

**Window:** Rolling five minutes.

**Source:** OpenTelemetry histogram `cards_request_duration_ms`, exported by `backend` to the environment's OpenObserve organization.

**Query:** OpenObserve PromQL `histogram_quantile(0.95, sum by (le, route, outcome) (rate(cards_request_duration_ms_bucket[5m])))`. The chart must separate the failure series by `outcome`. The per-request log query in the same organization is `SELECT request_id, route, outcome, duration_ms FROM http_requests WHERE request_id = '<response x-request-id>'`; the log query's time range must cover the request.

## The Pipeline

The backend sends OTLP/HTTP protobuf metrics every 10 seconds and batches logs every 1 second to OpenObserve on the university VM. Staging and production use separate organizations and credentials. The backend has a three-second export timeout and works when collection is disabled. The [deployment runbook](deployment.md#telemetry-pipelines) describes configuration. Retain both signals for at least one day, covering the five-minute SLI window.

## The Dashboard

Each organization needs a **SLI-01 Backend request duration P95** chart with the exact query above, showing separate outcome series. The staging organization must contain a failed request's numeric P95 and matching log point. Production uses the same chart without staging test traffic. The [Week 6 OpenObserve evidence](../reports/week-06/openobserve-dashboard-evidence.md) records the deployed dashboards, a numeric staging diagnostic failure series, and production request-log delivery. The separate QR-10 core-task failure test remains open.

The local **01 · Sentence Cards · Operator overview** groups panels into traffic and reliability, generation requests, and authentication and access. **02 · Sentence Cards · Backend route detail** keeps the focused route charts. The access tab counts 401 responses by time and route using `status_code`. Generation request panels measure backend HTTP calls; card counts and rewrite quality are in OpenPanel. Older log points lack `status_code`, so the 401 series begins when the updated backend starts exporting it.

The P95 panels use `{route} · {outcome}` as their PromQL legend template, so each series names the measured route and outcome rather than showing placeholders. Their title states the five-minute SLI window.

Provider responses currently supply input and output token counts, which the application stores in `generation_logs`. The [Claude Messages response](https://platform.claude.com/docs/en/claude_api_primer) reports usage, while [Claude cost analytics](https://platform.claude.com/docs/en/manage-claude/usage-cost-analytics-api) is a separate organization API; [OpenRouter generation metadata](https://openrouter.ai/docs/api/api-reference/generations/get-generation) has a separate cost lookup. The current application does not collect one dependable per-request money amount across these providers. The local OpenPanel usage dashboard shows reported token volume by billing scope, not a guessed cost. A future expense view would need provider-specific billed amounts and a clear separation between service-paid and learner-paid calls.

For this local stack, restart the app with `bash scripts/start-local-telemetry.sh` so its telemetry override remains active. The override lives outside the repository and holds the local service credentials; starting with only `docker-compose.yml` removes the exporter configuration from the backend container.

## Collected Data

The histogram stores duration, route template, outcome, service name, and environment. The log also stores a random request ID. No URL path parameters, body, query string, headers, email, text content, account ID, or key is sent by this instrumentation. Disable both exporters with `TELEMETRY_ENABLED=false`.

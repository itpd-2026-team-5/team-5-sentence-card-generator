# REL-06 upgrade note

From v0.3.0 or any earlier version, back up the production database and deploy the final `v0.6.0` commit following the [deployment runbook](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/deployment.md#deploy). The backend applies its database migration on startup.

To enable the new product and system dashboards, provision separate staging and production OpenPanel projects and OpenObserve organizations. In each VM environment file, set `TELEMETRY_ENABLED=true`, the correct `TELEMETRY_ENVIRONMENT`, and that environment's `OPENPANEL_URL`, `OPENPANEL_CLIENT_ID`, `OPENPANEL_CLIENT_SECRET`, `OPENOBSERVE_URL`, `OPENOBSERVE_ORGANIZATION`, `OPENOBSERVE_USER`, and `OPENOBSERVE_PASSWORD`. Use separate credentials for staging and production; follow the [telemetry setup](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/deployment.md#telemetry-pipelines). If these scopes and variables are already configured, no additional configuration is needed beyond deploying the release.

Known limitation: production can open existing cards, but generating new cards returns HTTP 502 because the VM cannot reach the Claude API. The Customer accepted this limited REL-06 scope in [DEC-126](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-126); provider connectivity is a SPRINT-07 follow-up. The staging QR-10 check passed for failure visibility, not successful generation.

[Full changelog](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/CHANGELOG.md#060---2026-11-09)

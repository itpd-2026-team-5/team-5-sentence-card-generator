#!/usr/bin/env python3
"""Provision the Sentence Cards operator dashboards on the self-hosted VM.

Run once for staging and once for production. Credentials stay in the VM env files.
OpenPanel 2.x has no supported dashboard write API for this deployment, so its
reports are written to the self-hosted PostgreSQL database in one transaction.
OpenObserve dashboards use its authenticated HTTP API.
"""

from __future__ import annotations

import argparse
import base64
import hashlib
import json
import subprocess
import sys
import urllib.error
import urllib.request
from dataclasses import dataclass, field
from pathlib import Path
from urllib.parse import quote as url_quote

SLI_QUERY = (
    "histogram_quantile(0.95, sum by (le, route, outcome) "
    "(rate(cards_request_duration_ms_bucket[5m])))"
)
SOURCE_FILTER = {
    "name": "properties.source",
    "operator": "isNot",
    "value": ["smoke"],
    "type": "string",
}


def event(
    name: str,
    series_id: str = "A",
    *,
    sum_property: str | None = None,
    filters: list[dict] | None = None,
) -> dict:
    result = {
        "type": "event",
        "id": series_id,
        "name": name,
        "segment": "property_sum" if sum_property else "event",
        "filters": [SOURCE_FILTER, *(filters or [])],
    }
    if sum_property:
        result["property"] = f"properties.{sum_property}"
    return result


def property_filter(name: str, value: str | bool, kind: str = "string") -> dict:
    return {
        "name": f"properties.{name}",
        "operator": "is",
        "value": [value],
        "type": kind,
    }


def formula(expression: str, label: str) -> dict:
    return {
        "type": "formula",
        "id": "C",
        "formula": expression,
        "displayName": label,
        "hideSeries": ["A", "B"],
    }


@dataclass(frozen=True)
class Report:
    name: str
    chart: str
    events: list[dict]
    unit: str
    breakdowns: list[dict] = field(default_factory=list)


@dataclass(frozen=True)
class ProductDashboard:
    suffix: str
    title: str
    reports: list[Report]
    range: str = "30d"


def openpanel_dashboards() -> list[ProductDashboard]:
    return [
        ProductDashboard(
            "product-overview",
            "01 · Sentence Cards · Product overview",
            [
                Report(
                    "Weekly completed study reviews",
                    "linear",
                    [event("study_review_completed")],
                    "reviews",
                ),
                Report(
                    "Generated cards",
                    "metric",
                    [event("generation_completed", sum_property="card_count")],
                    "cards",
                ),
                Report(
                    "Words marked to learn",
                    "linear",
                    [
                        event(
                            "word_marked", filters=[property_filter("action", "learn")]
                        )
                    ],
                    "marks",
                ),
                Report("Texts added", "metric", [event("text_added")], "texts"),
                Report(
                    "Generation failure rate",
                    "metric",
                    [
                        event("generation_failed", "A"),
                        event("generation_completed", "B"),
                        formula("A/(A+B)*100", "Failure rate"),
                    ],
                    "%",
                ),
                Report(
                    "Teacher approvals",
                    "metric",
                    [event("teacher_card_approved")],
                    "cards",
                ),
            ],
            "7d",
        ),
        ProductDashboard(
            "learning-journey",
            "02 · Sentence Cards · Learning journey",
            [
                Report(
                    "Learning activity by step",
                    "bar",
                    [
                        event("text_added", "A"),
                        event(
                            "word_marked",
                            "B",
                            filters=[property_filter("action", "learn")],
                        ),
                        event("generation_completed", "C"),
                        event("study_review_completed", "D"),
                    ],
                    "actions",
                ),
                Report(
                    "Generation success rate",
                    "metric",
                    [
                        event("generation_completed", "A"),
                        event("generation_failed", "B"),
                        formula("A/(A+B)*100", "Success rate"),
                    ],
                    "%",
                ),
                Report(
                    "Cards per successful generation",
                    "metric",
                    [
                        event("generation_completed", "A", sum_property="card_count"),
                        event("generation_completed", "B"),
                        formula("A/B", "Cards per generation"),
                    ],
                    "cards",
                ),
                Report(
                    "Words marked by language",
                    "bar",
                    [
                        event(
                            "word_marked", filters=[property_filter("action", "learn")]
                        )
                    ],
                    "marks",
                    [{"name": "properties.language"}],
                ),
                Report(
                    "Study ratings",
                    "bar",
                    [
                        event(
                            "study_review_completed",
                            series,
                            filters=[property_filter("rating", rating)],
                        )
                        for series, rating in zip(
                            "ABCD", ["again", "hard", "good", "easy"]
                        )
                    ],
                    "reviews",
                ),
                Report(
                    "New cards versus repeat reviews",
                    "bar",
                    [
                        event(
                            "study_review_completed",
                            "A",
                            filters=[property_filter("is_new", True, "boolean")],
                        ),
                        event(
                            "study_review_completed",
                            "B",
                            filters=[property_filter("is_new", False, "boolean")],
                        ),
                    ],
                    "reviews",
                ),
                Report(
                    "Generated cards by language",
                    "bar",
                    [
                        event(
                            "generation_completed",
                            series,
                            sum_property="card_count",
                            filters=[property_filter("language", language)],
                        )
                        for series, language in zip("ABC", ["en", "de", "ru"])
                    ],
                    "cards",
                ),
            ],
        ),
        ProductDashboard(
            "generation-quality",
            "03 · Sentence Cards · Generation quality",
            [
                Report(
                    "Regenerated cards",
                    "metric",
                    [event("card_regeneration_completed", sum_property="card_count")],
                    "cards",
                ),
                Report(
                    "Cards marked for rewriting",
                    "metric",
                    [event("card_rewrite_requested")],
                    "cards",
                ),
                Report(
                    "Regeneration attempts",
                    "linear",
                    [
                        event("card_regeneration_completed", "A"),
                        event("card_regeneration_failed", "B"),
                    ],
                    "attempts",
                ),
                Report(
                    "Regeneration failure rate",
                    "metric",
                    [
                        event("card_regeneration_failed", "A"),
                        event("card_regeneration_completed", "B"),
                        formula("A/(A+B)*100", "Failure rate"),
                    ],
                    "%",
                ),
                Report(
                    "Learner-regenerated cards",
                    "metric",
                    [
                        event(
                            "card_regeneration_completed",
                            sum_property="card_count",
                            filters=[property_filter("actor", "learner")],
                        )
                    ],
                    "cards",
                ),
                Report(
                    "Teacher-regenerated cards",
                    "metric",
                    [
                        event(
                            "card_regeneration_completed",
                            sum_property="card_count",
                            filters=[property_filter("actor", "teacher")],
                        )
                    ],
                    "cards",
                ),
                Report(
                    "Automatic rewrites during generation",
                    "metric",
                    [event("generation_completed", sum_property="rewritten_count")],
                    "rewrites",
                ),
                Report(
                    "Automatic rewrites per generated card",
                    "metric",
                    [
                        event(
                            "generation_completed", "A", sum_property="rewritten_count"
                        ),
                        event("generation_completed", "B", sum_property="card_count"),
                        formula("A/B*100", "Rewrite share"),
                    ],
                    "%",
                ),
            ],
        ),
        ProductDashboard(
            "llm-usage",
            "04 · Sentence Cards · LLM usage (tokens, not cost)",
            [
                Report(
                    "LLM calls by billing scope",
                    "bar",
                    [event("llm_usage_recorded")],
                    "calls",
                    [{"name": "properties.billing_scope"}],
                ),
                Report(
                    "Service input tokens",
                    "metric",
                    [
                        event(
                            "llm_usage_recorded",
                            sum_property="input_tokens",
                            filters=[property_filter("billing_scope", "service")],
                        )
                    ],
                    "tokens",
                ),
                Report(
                    "Service output tokens",
                    "metric",
                    [
                        event(
                            "llm_usage_recorded",
                            sum_property="output_tokens",
                            filters=[property_filter("billing_scope", "service")],
                        )
                    ],
                    "tokens",
                ),
                Report(
                    "User-key input tokens",
                    "metric",
                    [
                        event(
                            "llm_usage_recorded",
                            sum_property="input_tokens",
                            filters=[property_filter("billing_scope", "user_key")],
                        )
                    ],
                    "tokens",
                ),
                Report(
                    "User-key output tokens",
                    "metric",
                    [
                        event(
                            "llm_usage_recorded",
                            sum_property="output_tokens",
                            filters=[property_filter("billing_scope", "user_key")],
                        )
                    ],
                    "tokens",
                ),
                Report(
                    "LLM calls by task",
                    "bar",
                    [event("llm_usage_recorded")],
                    "calls",
                    [{"name": "properties.task"}],
                ),
            ],
        ),
    ]


def sql_quote(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"


def jsonb(value: object) -> str:
    return sql_quote(json.dumps(value, separators=(",", ":"))) + "::jsonb"


def read_env(path: Path) -> dict[str, str]:
    values: dict[str, str] = {}
    for raw in path.read_text().splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        value = value.strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
            value = value[1:-1]
        values[key.strip()] = value
    return values


def validate_env(values: dict[str, str]) -> None:
    required = [
        "TELEMETRY_ENVIRONMENT",
        "OPENPANEL_URL",
        "OPENPANEL_CLIENT_ID",
        "OPENPANEL_CLIENT_SECRET",
        "OPENOBSERVE_URL",
        "OPENOBSERVE_ORGANIZATION",
        "OPENOBSERVE_USER",
        "OPENOBSERVE_PASSWORD",
    ]
    missing = [
        key for key in required if not values.get(key) or values[key].startswith("<")
    ]
    if missing:
        raise ValueError(
            "Missing or placeholder VM configuration: " + ", ".join(missing)
        )
    if values.get("TELEMETRY_ENABLED", "").lower() != "true":
        raise ValueError("TELEMETRY_ENABLED must be true")
    if values["TELEMETRY_ENVIRONMENT"] not in {"staging", "production"}:
        raise ValueError("Environment must be staging or production")


def psql(compose: Path, sql: str) -> str:
    command = [
        "docker",
        "compose",
        "-f",
        str(compose),
        "exec",
        "-T",
        "op-db",
        "sh",
        "-lc",
        'psql -X -v ON_ERROR_STOP=1 -U "${POSTGRES_USER:-postgres}" -d "${POSTGRES_DB:-postgres}" -At',
    ]
    result = subprocess.run(
        command, input=sql, text=True, capture_output=True, check=False
    )
    if result.returncode:
        raise RuntimeError(
            "OpenPanel database command failed: " + result.stderr[-1200:]
        )
    return result.stdout.strip()


def openpanel_project(compose: Path, client_id: str) -> tuple[str, str]:
    rows = psql(
        compose,
        'SELECT "projectId", "organizationId" FROM clients WHERE id::text = '
        + sql_quote(client_id)
        + ";",
    ).splitlines()
    if len(rows) != 1 or "|" not in rows[0]:
        raise ValueError(
            "The OpenPanel write client was not found in this self-hosted instance"
        )
    project_id, organization_id = rows[0].split("|", 1)
    if not project_id or not organization_id:
        raise ValueError("The OpenPanel write client has no project or organization")
    return project_id, organization_id


def openpanel_sql(
    project_id: str, organization_id: str
) -> tuple[str, list[tuple[str, int]]]:
    token = hashlib.sha256(project_id.encode()).hexdigest()[:12]
    statements = ["BEGIN;"]
    expected: list[tuple[str, int]] = []
    for dashboard in openpanel_dashboards():
        dashboard_id = f"itpd-{dashboard.suffix}-{token}"
        expected.append((dashboard_id, len(dashboard.reports)))
        statements.append(
            'INSERT INTO dashboards (id, name, "projectId", "organizationId") VALUES '
            f"({sql_quote(dashboard_id)}, {sql_quote(dashboard.title)}, "
            f"{sql_quote(project_id)}, {sql_quote(organization_id)}) "
            "ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name "
            'WHERE dashboards."projectId"=EXCLUDED."projectId";'
        )
        for index, report in enumerate(dashboard.reports):
            x, y = (index % 2) * 6, (index // 2) * 4
            common = (
                f'\'day\'::"Interval", {sql_quote(report.chart)}::"ChartType", '
                f"{jsonb(report.breakdowns)}, {jsonb(report.events)}, "
                f"{jsonb([SOURCE_FILTER])}, {sql_quote(dashboard.range)}, "
                "'monotone', 'sum'::\"Metric\", "
                f"{sql_quote(report.unit)}, ARRAY[]::text[]"
            )
            statements.append(
                'UPDATE reports SET (interval, "chartType", breakdowns, events, '
                '"globalFilters", range, "lineType", metric, unit, "visibleSeries") = '
                f'({common}) WHERE "dashboardId"={sql_quote(dashboard_id)} '
                f"AND name={sql_quote(report.name)};"
            )
            statements.append(
                "WITH new_report AS (INSERT INTO reports "
                '(name, interval, "chartType", breakdowns, events, "globalFilters", '
                '"projectId", "dashboardId", range, "lineType", metric, unit, "visibleSeries") '
                f"SELECT {sql_quote(report.name)}, "
                f'\'day\'::"Interval", {sql_quote(report.chart)}::"ChartType", '
                f"{jsonb(report.breakdowns)}, {jsonb(report.events)}, "
                f"{jsonb([SOURCE_FILTER])}, {sql_quote(project_id)}, {sql_quote(dashboard_id)}, "
                f"{sql_quote(dashboard.range)}, 'monotone', 'sum'::\"Metric\", "
                f"{sql_quote(report.unit)}, ARRAY[]::text[] "
                "WHERE NOT EXISTS (SELECT 1 FROM reports WHERE "
                f'"dashboardId"={sql_quote(dashboard_id)} AND name={sql_quote(report.name)}) '
                'RETURNING id) INSERT INTO report_layouts ("reportId",x,y,w,h) '
                f"SELECT id,{x},{y},6,4 FROM new_report;"
            )
    statements.append("COMMIT;")
    return "\n".join(statements), expected


def provision_openpanel(compose: Path, client_id: str) -> None:
    project_id, organization_id = openpanel_project(compose, client_id)
    sql, expected = openpanel_sql(project_id, organization_id)
    psql(compose, sql)
    for dashboard_id, report_count in expected:
        found = psql(
            compose,
            'SELECT count(*) FROM reports WHERE "dashboardId"='
            + sql_quote(dashboard_id)
            + ";",
        )
        if int(found) < report_count:
            raise RuntimeError(
                f"OpenPanel dashboard {dashboard_id} has only {found} reports"
            )
    print(
        f"OpenPanel: {len(expected)} dashboards and {sum(count for _, count in expected)} reports ready in {project_id}"
    )


def panel(
    panel_id: str,
    title: str,
    chart: str,
    query: str,
    x: str,
    y: str,
    index: int,
    *,
    metric: bool = False,
    description: str = "",
) -> dict:
    fields = {
        "stream": "cards_request_duration_ms_bucket" if metric else "http_requests",
        "stream_type": "metrics" if metric else "logs",
        "x": [] if metric else [{"label": x, "alias": x, "column": x}],
        "y": [] if metric else [{"label": y, "alias": y, "column": y}],
        "filter": {"filterType": "group", "logicalOperator": "AND", "conditions": []},
    }
    return {
        "id": panel_id,
        "type": chart,
        "title": title,
        "description": description,
        "queryType": "promql" if metric else "sql",
        "queries": [
            {
                "query": query,
                "customQuery": True,
                "fields": fields,
                "config": {"promql_legend": "{route} · {outcome}" if metric else ""},
            }
        ],
        "config": {"show_legends": True},
        "layout": {
            "x": 48 * (index % 2),
            "y": 18 * (index // 2),
            "w": 48,
            "h": 18,
            "i": index + 1,
        },
    }


def tab(tab_id: str, name: str, panels: list[dict]) -> dict:
    return {"tabId": tab_id, "name": name, "panels": panels}


def openobserve_dashboards() -> list[dict]:
    operator = {
        "title": "01 · Sentence Cards · Operator overview",
        "description": "Traffic, failures, generation requests and access problems. Product behavior is in OpenPanel.",
        "version": 8,
        "tabs": [
            tab(
                "traffic",
                "01 · Traffic & reliability",
                [
                    panel(
                        "traffic_volume",
                        "Request volume · 5 min",
                        "line",
                        "SELECT histogram(_timestamp, '5 minutes') AS time, count(*) AS requests FROM \"http_requests\" GROUP BY time ORDER BY time",
                        "time",
                        "requests",
                        0,
                    ),
                    panel(
                        "traffic_failures",
                        "Server errors · 5 min",
                        "bar",
                        "SELECT histogram(_timestamp, '5 minutes') AS time, sum(CASE WHEN outcome = 'server_error' THEN 1 ELSE 0 END) AS errors FROM \"http_requests\" GROUP BY time ORDER BY time",
                        "time",
                        "errors",
                        1,
                    ),
                    panel(
                        "traffic_p95",
                        "SLI-01 Backend request duration P95 (5 minutes)",
                        "line",
                        SLI_QUERY,
                        "time",
                        "duration_ms",
                        2,
                        metric=True,
                        description="Five-minute P95 in milliseconds; separate route and outcome series.",
                    ),
                    panel(
                        "traffic_slow",
                        "Slowest routes · P95 ms",
                        "bar",
                        'SELECT route, approx_percentile_cont(duration_ms, 0.95) AS p95_ms FROM "http_requests" GROUP BY route ORDER BY p95_ms DESC LIMIT 10',
                        "route",
                        "p95_ms",
                        3,
                    ),
                ],
            ),
            tab(
                "generation",
                "02 · Generation requests",
                [
                    panel(
                        "generation_volume",
                        "Generation and rewrite requests · 5 min",
                        "line",
                        "SELECT histogram(_timestamp, '5 minutes') AS time, count(*) AS requests FROM \"http_requests\" WHERE route LIKE '%generat%' GROUP BY time ORDER BY time",
                        "time",
                        "requests",
                        0,
                    ),
                    panel(
                        "generation_errors",
                        "Generation server errors · 5 min",
                        "bar",
                        "SELECT histogram(_timestamp, '5 minutes') AS time, sum(CASE WHEN outcome = 'server_error' THEN 1 ELSE 0 END) AS errors FROM \"http_requests\" WHERE route LIKE '%generat%' GROUP BY time ORDER BY time",
                        "time",
                        "errors",
                        1,
                    ),
                    panel(
                        "generation_latency",
                        "Generation routes · P95 ms",
                        "bar",
                        "SELECT route, approx_percentile_cont(duration_ms, 0.95) AS p95_ms FROM \"http_requests\" WHERE route LIKE '%generat%' GROUP BY route ORDER BY p95_ms DESC LIMIT 10",
                        "route",
                        "p95_ms",
                        2,
                    ),
                    panel(
                        "generation_outcomes",
                        "Generation requests by outcome",
                        "bar",
                        "SELECT outcome, count(*) AS requests FROM \"http_requests\" WHERE route LIKE '%generat%' GROUP BY outcome ORDER BY requests DESC",
                        "outcome",
                        "requests",
                        3,
                    ),
                ],
            ),
            tab(
                "access",
                "03 · Authentication & access",
                [
                    panel(
                        "auth_unauthorized",
                        "Unauthorized responses · 5 min",
                        "line",
                        "SELECT histogram(_timestamp, '5 minutes') AS time, count(*) AS responses FROM \"http_requests\" WHERE status_code = 401 GROUP BY time ORDER BY time",
                        "time",
                        "responses",
                        0,
                    ),
                    panel(
                        "auth_routes",
                        "Routes returning 401",
                        "bar",
                        'SELECT route, count(*) AS responses FROM "http_requests" WHERE status_code = 401 GROUP BY route ORDER BY responses DESC LIMIT 10',
                        "route",
                        "responses",
                        1,
                    ),
                    panel(
                        "access_errors",
                        "Other client errors by route",
                        "bar",
                        "SELECT route, count(*) AS responses FROM \"http_requests\" WHERE outcome = 'client_error' AND (status_code IS NULL OR status_code != 401) GROUP BY route ORDER BY responses DESC LIMIT 10",
                        "route",
                        "responses",
                        2,
                    ),
                ],
            ),
        ],
        "defaultDatetimeDuration": {"type": "relative", "relativeTimePeriod": "24h"},
    }
    detail = {
        "title": "02 · Sentence Cards · Backend route detail",
        "description": "Focused backend route and failure investigation.",
        "version": 8,
        "tabs": [
            tab(
                "routes",
                "Routes",
                [
                    panel(
                        "route_p95",
                        "SLI-01 Backend request duration P95 (5 minutes)",
                        "line",
                        SLI_QUERY,
                        "time",
                        "duration_ms",
                        0,
                        metric=True,
                    ),
                    panel(
                        "route_requests",
                        "Requests by route and outcome",
                        "bar",
                        'SELECT route, outcome, count(*) AS requests FROM "http_requests" GROUP BY route, outcome ORDER BY requests DESC LIMIT 20',
                        "route",
                        "requests",
                        1,
                    ),
                    panel(
                        "route_failures",
                        "Server errors by route",
                        "bar",
                        "SELECT route, count(*) AS errors FROM \"http_requests\" WHERE outcome = 'server_error' GROUP BY route ORDER BY errors DESC LIMIT 10",
                        "route",
                        "errors",
                        2,
                    ),
                    panel(
                        "route_latency",
                        "Slowest routes · P95 ms",
                        "bar",
                        'SELECT route, approx_percentile_cont(duration_ms, 0.95) AS p95_ms FROM "http_requests" GROUP BY route ORDER BY p95_ms DESC LIMIT 10',
                        "route",
                        "p95_ms",
                        3,
                    ),
                ],
            )
        ],
        "defaultDatetimeDuration": {"type": "relative", "relativeTimePeriod": "24h"},
    }
    return [operator, detail]


def observe_request(
    values: dict[str, str], path: str, method: str = "GET", data: dict | None = None
) -> dict:
    base = values["OPENOBSERVE_URL"].rstrip("/")
    organization = url_quote(values["OPENOBSERVE_ORGANIZATION"], safe="")
    credential = (
        values["OPENOBSERVE_USER"] + ":" + values["OPENOBSERVE_PASSWORD"]
    ).encode()
    token = base64.b64encode(credential).decode()
    request = urllib.request.Request(
        f"{base}/api/{organization}{path}",
        data=json.dumps(data).encode() if data is not None else None,
        headers={"Authorization": "Basic " + token, "Content-Type": "application/json"},
        method=method,
    )
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            body = response.read()
            return json.loads(body) if body else {}
    except urllib.error.HTTPError as error:
        # Never print headers, bodies, URLs or credentials. The status is enough
        # to distinguish a permission problem from an unsupported API shape.
        raise RuntimeError(
            f"OpenObserve {method} {path} returned HTTP {error.code}"
        ) from error
    except urllib.error.URLError as error:
        raise RuntimeError(
            f"OpenObserve {method} {path} could not connect: {error.reason}"
        ) from error


def provision_openobserve(values: dict[str, str]) -> None:
    existing = observe_request(values, "/dashboards").get("dashboards", [])
    for body in openobserve_dashboards():
        title = body["title"]
        match = next(
            (
                item
                for item in existing
                if (item.get("v8") or item).get("title") == title
            ),
            None,
        )
        if match:
            print(
                f"OpenObserve: {title} already exists; existing panels left unchanged"
            )
            continue
        observe_request(values, "/dashboards", "POST", body)
        print(f"OpenObserve: created {title}")
    titles = {body["title"] for body in openobserve_dashboards()}
    saved = observe_request(values, "/dashboards").get("dashboards", [])
    seen = {(item.get("v8") or item).get("title") for item in saved}
    if not titles.issubset(seen):
        raise RuntimeError(
            "OpenObserve did not list every expected dashboard after creation"
        )
    print(f"OpenObserve: {len(titles)} operator dashboards ready")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--env-file", type=Path, help="The staging.env or prod.env file on the VM"
    )
    parser.add_argument(
        "--staging-env",
        type=Path,
        default=Path("~/cards/staging.env").expanduser(),
        help="Staging env file when provisioning both environments",
    )
    parser.add_argument(
        "--production-env",
        type=Path,
        default=Path("~/cards/prod.env").expanduser(),
        help="Production env file when provisioning both environments",
    )
    parser.add_argument(
        "--openpanel-compose",
        type=Path,
        default=Path(
            "~/cards/telemetry/openpanel/self-hosting/docker-compose.yml"
        ).expanduser(),
        help="OpenPanel 2.x Docker Compose file on the VM",
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Create or update dashboards; otherwise show the plan",
    )
    args = parser.parse_args()
    if not args.apply:
        print("OpenPanel:")
        for dashboard in openpanel_dashboards():
            print(f"  {dashboard.title}: {len(dashboard.reports)} reports")
        print("OpenObserve:")
        for dashboard in openobserve_dashboards():
            print(
                f"  {dashboard['title']}: {sum(len(tab['panels']) for tab in dashboard['tabs'])} panels"
            )
        print("Pass --apply for both environments, or --env-file FILE --apply for one.")
        return 0
    paths = (
        [args.env_file] if args.env_file else [args.staging_env, args.production_env]
    )
    environments = [read_env(path) for path in paths]
    for values in environments:
        validate_env(values)
    if not args.openpanel_compose.is_file():
        raise ValueError(f"OpenPanel Compose file not found: {args.openpanel_compose}")
    if len(environments) == 2:
        staging, production = environments
        if (
            staging["TELEMETRY_ENVIRONMENT"] != "staging"
            or production["TELEMETRY_ENVIRONMENT"] != "production"
        ):
            raise ValueError(
                "The staging and production env files have the wrong environment labels"
            )
        isolated = [
            "OPENPANEL_CLIENT_ID",
            "OPENPANEL_CLIENT_SECRET",
            "OPENOBSERVE_ORGANIZATION",
            "OPENOBSERVE_USER",
            "OPENOBSERVE_PASSWORD",
        ]
        reused = [key for key in isolated if staging[key] == production[key]]
        if reused:
            raise ValueError(
                "Staging and production share credentials or scopes: "
                + ", ".join(reused)
            )
        staging_project, _ = openpanel_project(
            args.openpanel_compose, staging["OPENPANEL_CLIENT_ID"]
        )
        production_project, _ = openpanel_project(
            args.openpanel_compose, production["OPENPANEL_CLIENT_ID"]
        )
        if staging_project == production_project:
            raise ValueError(
                "Staging and production OpenPanel clients point to the same project"
            )
    for values in environments:
        print(f"Provisioning {values['TELEMETRY_ENVIRONMENT']} dashboards")
        provision_openpanel(args.openpanel_compose, values["OPENPANEL_CLIENT_ID"])
        provision_openobserve(values)
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, ValueError, RuntimeError) as error:
        print(f"Error: {error}", file=sys.stderr)
        sys.exit(1)

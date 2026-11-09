"""Time a failed staging card-generation request and its OpenObserve signals.

Run on the VM with --staging-url and --env-file. The script prompts for a verified
staging learner account, creates a temporary text and mark, then submits an invalid
browser-provider result. This deterministically exercises the deployed generation
route's HTTP 502 path without a real LLM call or production traffic. It removes the
temporary text and any deck it created after the check. Credentials stay in memory.
"""

import argparse
import base64
import getpass
import json
import math
import re
import subprocess
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import UTC, datetime
from http.cookiejar import CookieJar
from pathlib import Path

SLI_QUERY = (
    "histogram_quantile(0.95, sum by (le, route, outcome) "
    "(rate(cards_request_duration_ms_bucket[5m])))"
)
ROUTE = "/api/texts/{text_id}/generate"
LOG_DEADLINE_SECONDS = 5.0
METRIC_DEADLINE_SECONDS = 60.0


def read_env(path: Path) -> dict[str, str]:
    values = {}
    for line in path.expanduser().read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        values[key.strip()] = value.strip().strip('"').strip("'")
    for key in (
        "OPENOBSERVE_URL",
        "OPENOBSERVE_ORGANIZATION",
        "OPENOBSERVE_USER",
        "OPENOBSERVE_PASSWORD",
    ):
        if not values.get(key):
            raise ValueError(f"{key} is missing from the staging env file")
    if values.get("TELEMETRY_ENVIRONMENT") != "staging":
        raise ValueError("The env file must have TELEMETRY_ENVIRONMENT=staging")
    if "prod" in values["OPENOBSERVE_ORGANIZATION"].lower():
        raise ValueError("The env file points to a production OpenObserve organization")
    return values


def request_json(
    url: str, auth: str, *, body: dict | None = None, timeout: float = 2.0
) -> dict:
    request = urllib.request.Request(
        url,
        data=json.dumps(body).encode() if body is not None else None,
        headers={
            "Authorization": auth,
            "Content-Type": "application/json",
        },
        method="POST" if body is not None else "GET",
    )
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return json.load(response)
    except urllib.error.HTTPError as error:
        raise RuntimeError(f"OpenObserve query returned HTTP {error.code}") from None
    except urllib.error.URLError as error:
        raise RuntimeError(f"OpenObserve query failed: {error.reason}") from None


def query_log(base: str, auth: str, request_id: str, start_us: int) -> dict | None:
    payload = {
        "query": {
            "sql": (
                "SELECT request_id, route, outcome, status_code, duration_ms "
                f"FROM http_requests WHERE request_id = '{request_id}'"
            ),
            "start_time": start_us - 10_000_000,
            "end_time": int((time.time() + 5) * 1_000_000),
            "from": 0,
            "size": 1,
        }
    }
    hits = request_json(f"{base}/_search", auth, body=payload).get("hits", [])
    for hit in hits:
        if (
            hit.get("request_id") == request_id
            and hit.get("route") == ROUTE
            and hit.get("outcome") == "server_error"
            and int(hit.get("status_code", 0)) == 502
            and math.isfinite(float(hit.get("duration_ms", "nan")))
        ):
            return hit
    return None


def query_metric(
    base: str, auth: str, promql: str, *, match_failure_route: bool = False
) -> float | None:
    params = urllib.parse.urlencode({"query": promql, "time": time.time()})
    payload = request_json(f"{base}/prometheus/api/v1/query?{params}", auth)
    for item in payload.get("data", {}).get("result", []):
        metric = item.get("metric", {})
        if match_failure_route and (
            metric.get("route") != ROUTE or metric.get("outcome") != "server_error"
        ):
            continue
        try:
            value = float(item["value"][1])
        except (IndexError, KeyError, TypeError, ValueError):
            continue
        if math.isfinite(value):
            return value
    return None


def checkout_commit() -> str | None:
    result = subprocess.run(
        ["git", "-C", str(Path("~/cards/app").expanduser()), "rev-parse", "HEAD"],
        capture_output=True,
        text=True,
        check=False,
    )
    return result.stdout.strip() if result.returncode == 0 else None


def app_request(
    opener: urllib.request.OpenerDirector,
    origin: str,
    path: str,
    method: str,
    body: dict | None = None,
    *,
    browser_provider: bool = False,
) -> tuple[int, object, dict]:
    headers = {"Content-Type": "application/json"} if body is not None else {}
    if browser_provider:
        headers["x-llm"] = "browser"
    request = urllib.request.Request(
        origin + path,
        data=json.dumps(body).encode() if body is not None else None,
        headers=headers,
        method=method,
    )
    try:
        response = opener.open(request, timeout=15)
    except urllib.error.HTTPError as error:
        response = error
    with response:
        raw = response.read()
        return response.status, response.headers, json.loads(raw) if raw else {}


def prepare_core_task(
    opener: urllib.request.OpenerDirector, origin: str
) -> tuple[int, int, bool]:
    email = input("Verified staging learner email: ").strip()
    password = getpass.getpass("Staging learner password: ")
    status, _, _ = app_request(
        opener,
        origin,
        "/api/auth/login",
        "POST",
        {"email": email, "password": password},
    )
    if status != 200:
        raise RuntimeError(f"Staging login returned HTTP {status}")
    status, _, decks = app_request(opener, origin, "/api/decks", "GET")
    if status != 200:
        raise RuntimeError(f"Listing staging decks returned HTTP {status}")
    german = next(
        (
            deck
            for deck in decks
            if deck["target_language"] == "de" and deck["known_language"] == "en"
        ),
        None,
    )
    created_deck = german is None
    if german is None:
        status, _, german = app_request(
            opener,
            origin,
            "/api/decks",
            "POST",
            {
                "name": "QR-10 staging check",
                "known_language": "en",
                "target_language": "de",
            },
        )
        if status != 201:
            raise RuntimeError(f"Creating a staging test deck returned HTTP {status}")
    status, _, source = app_request(
        opener,
        origin,
        "/api/texts",
        "POST",
        {
            "title": "QR-10 staging check",
            "language": "de",
            "body": "Heute kaufe ich ein Brot.",
        },
    )
    if status != 201:
        raise RuntimeError(f"Creating a staging test text returned HTTP {status}")
    text_id = source["id"]
    status, _, _ = app_request(
        opener,
        origin,
        f"/api/texts/{text_id}/marks",
        "PUT",
        {"word": "Brot", "sentence": "Heute kaufe ich ein Brot.", "status": "learn"},
    )
    if status != 204:
        raise RuntimeError(f"Marking the staging test word returned HTTP {status}")
    return text_id, german["id"], created_deck


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--staging-url", required=True)
    parser.add_argument("--env-file", type=Path, required=True)
    args = parser.parse_args()
    values = read_env(args.env_file)
    if not re.fullmatch(r"https?://[^/]+:8081/?", args.staging_url):
        raise ValueError("--staging-url must be the staging origin on port 8081")
    origin = args.staging_url.rstrip("/")
    base = (
        values["OPENOBSERVE_URL"].rstrip("/")
        + "/api/"
        + urllib.parse.quote(values["OPENOBSERVE_ORGANIZATION"], safe="")
    )
    credential = f"{values['OPENOBSERVE_USER']}:{values['OPENOBSERVE_PASSWORD']}"
    auth = "Basic " + base64.b64encode(credential.encode()).decode()

    try:
        urllib.request.urlopen(
            values["OPENOBSERVE_URL"].rstrip("/") + "/healthz", timeout=3
        )
    except urllib.error.URLError as error:
        raise RuntimeError(f"OpenObserve health check failed: {error.reason}") from None

    opener = urllib.request.build_opener(
        urllib.request.HTTPCookieProcessor(CookieJar())
    )
    text_id, deck_id, created_deck = prepare_core_task(opener, origin)
    try:
        count_query = (
            'sum(cards_request_duration_ms_count{route="/api/texts/{text_id}/generate",'
            'outcome="server_error"})'
        )
        baseline_count = query_metric(base, auth, count_query) or 0.0
        response_status, response_headers, _ = app_request(
            opener,
            origin,
            f"/api/texts/{text_id}/generate",
            "POST",
            {
                "deck_id": deck_id,
                "llm_output": {
                    "data": {},
                    "model": "qrt-invalid-output",
                    "input_tokens": 0,
                    "output_tokens": 0,
                },
            },
            browser_provider=True,
        )
        response_wall = time.time()
        response_mono = time.monotonic()
        request_id = response_headers.get("x-request-id", "")
        if response_status != 502 or not re.fullmatch(r"[0-9a-f-]{36}", request_id):
            raise RuntimeError(
                f"Expected HTTP 502 and a UUID x-request-id, got HTTP {response_status}"
            )
        print(f"Core-task response: HTTP 502, request ID {request_id}", flush=True)

        log_hit = None
        log_elapsed = None
        while time.monotonic() - response_mono <= LOG_DEADLINE_SECONDS:
            log_hit = query_log(base, auth, request_id, int(response_wall * 1_000_000))
            if log_hit is not None:
                log_elapsed = time.monotonic() - response_mono
                break
            time.sleep(0.2)

        metric_value = None
        metric_elapsed = None
        while time.monotonic() - response_mono <= METRIC_DEADLINE_SECONDS:
            current_count = query_metric(base, auth, count_query) or 0.0
            if current_count > baseline_count:
                metric_value = query_metric(
                    base, auth, SLI_QUERY, match_failure_route=True
                )
                if metric_value is not None:
                    metric_elapsed = time.monotonic() - response_mono
                    break
            time.sleep(0.5)

        result = {
            "response_time_utc": datetime.fromtimestamp(response_wall, UTC).isoformat(),
            "request_id": request_id,
            "route": ROUTE,
            "status_code": response_status,
            "environment": "staging",
            "checkout_commit": checkout_commit(),
            "log_first_seen_seconds": round(log_elapsed, 3)
            if log_elapsed is not None
            else None,
            "log_duration_ms": log_hit.get("duration_ms") if log_hit else None,
            "p95_first_seen_seconds": round(metric_elapsed, 3)
            if metric_elapsed is not None
            else None,
            "p95_ms": metric_value,
            "log_within_5_seconds": log_elapsed is not None
            and log_elapsed <= LOG_DEADLINE_SECONDS,
            "p95_within_60_seconds": (
                metric_elapsed is not None and metric_elapsed <= METRIC_DEADLINE_SECONDS
            ),
        }
        print(json.dumps(result, indent=2), flush=True)
        return (
            0
            if result["log_within_5_seconds"] and result["p95_within_60_seconds"]
            else 1
        )
    finally:
        for path in (
            f"/api/texts/{text_id}",
            f"/api/decks/{deck_id}" if created_deck else None,
        ):
            if path:
                try:
                    status, _, _ = app_request(opener, origin, path, "DELETE")
                    if status != 204:
                        print(f"Cleanup warning: DELETE {path} returned HTTP {status}")
                except (OSError, ValueError) as error:
                    print(f"Cleanup warning: DELETE {path} failed: {error}")


if __name__ == "__main__":
    raise SystemExit(main())

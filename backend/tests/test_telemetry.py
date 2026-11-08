"""Telemetry sends registered fields only and preserves request diagnosis."""

import asyncio
from unittest.mock import patch

import pytest

from app import analytics, observability


def test_analytics_registry_rejects_personal_or_unknown_fields():
    with pytest.raises(ValueError):
        analytics.track("text_added", language="de", title="private text")
    with pytest.raises(ValueError):
        analytics.track("account_registered", email="person@example.com")
    with pytest.raises(ValueError):
        analytics.track("text_added", source="other", language="de")


def test_analytics_payload_has_environment_and_source():
    with (
        patch.object(analytics.settings, "telemetry_enabled", True),
        patch.object(analytics.settings, "openpanel_url", "https://example.invalid"),
        patch.object(analytics.settings, "openpanel_client_id", "id"),
        patch.object(analytics.settings, "openpanel_client_secret", "secret"),
        patch.object(analytics._worker, "submit") as submit,
    ):
        analytics.track(
            "generation_completed",
            source="smoke",
            language="de",
            card_count=2,
            rewritten_count=1,
        )
    assert submit.call_args.args[2] == {
        "source": "smoke",
        "environment": "development",
        "language": "de",
        "card_count": 2,
        "rewritten_count": 1,
    }


def test_usage_event_keeps_only_counts_and_billing_scope():
    with (
        patch.object(analytics.settings, "telemetry_enabled", True),
        patch.object(analytics.settings, "openpanel_url", "https://example.invalid"),
        patch.object(analytics.settings, "openpanel_client_id", "id"),
        patch.object(analytics.settings, "openpanel_client_secret", "secret"),
        patch.object(analytics._worker, "submit") as submit,
    ):
        analytics.track(
            "llm_usage_recorded",
            task="cards",
            billing_scope="service",
            input_tokens=120,
            output_tokens=40,
        )
    assert submit.call_args.args[2] == {
        "source": "web",
        "environment": "development",
        "task": "cards",
        "billing_scope": "service",
        "input_tokens": 120,
        "output_tokens": 40,
    }


def test_request_signal_records_failed_response():
    records = []
    logs = []

    class Histogram:
        def record(self, duration, labels):
            records.append((duration, labels))

    class Logger:
        def info(self, message, extra):
            logs.append((message, extra))

    async def failing_app(scope, receive, send):
        scope["route"] = type("Route", (), {"path": "/api/fail"})()
        await send({"type": "http.response.start", "status": 500, "headers": []})
        await send({"type": "http.response.body", "body": b"failure"})

    sent = []

    async def send(message):
        sent.append(message)

    with (
        patch.object(observability, "_duration", Histogram()),
        patch.object(observability, "_request_log", Logger()),
    ):
        asyncio.run(observability.RequestSignals(failing_app)({"type": "http"}, None, send))

    assert records[0][1] == {"route": "/api/fail", "outcome": "server_error"}
    assert records[0][0] >= 0
    assert logs[0][0] == "http_request"
    assert logs[0][1]["request_id"]
    assert logs[0][1]["status_code"] == 500
    assert logs[0][1]["duration_ms"] >= 0
    assert b"x-request-id" in dict(sent[0]["headers"])

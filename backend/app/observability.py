"""Optional OTLP request latency and structured request points for OpenObserve."""

import base64
import logging
import time
from uuid import uuid4

from app.config import settings

log = logging.getLogger(__name__)
_duration = None
_request_log = None


def configure() -> None:
    global _duration, _request_log
    if not settings.telemetry_enabled or not all(
        (
            settings.openobserve_url,
            settings.openobserve_organization,
            settings.openobserve_user,
            settings.openobserve_password,
        )
    ):
        return
    from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter
    from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter
    from opentelemetry.sdk._logs import LoggerProvider, LoggingHandler
    from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
    from opentelemetry.sdk.metrics import MeterProvider
    from opentelemetry.sdk.metrics.export import PeriodicExportingMetricReader
    from opentelemetry.sdk.resources import Resource

    base = settings.openobserve_url.rstrip("/") + "/api/" + settings.openobserve_organization
    token = base64.b64encode(
        f"{settings.openobserve_user}:{settings.openobserve_password}".encode()
    ).decode()
    headers = {"Authorization": f"Basic {token}"}
    resource = Resource.create(
        {
            "service.name": "sentence-cards-backend",
            "deployment.environment": settings.telemetry_environment,
        }
    )
    reader = PeriodicExportingMetricReader(
        OTLPMetricExporter(endpoint=base + "/v1/metrics", headers=headers, timeout=3),
        export_interval_millis=10000,
    )
    meter_provider = MeterProvider(resource=resource, metric_readers=[reader])
    _duration = meter_provider.get_meter(__name__).create_histogram(
        "cards_request_duration_ms", unit="ms", description="Completed HTTP request duration"
    )
    logger_provider = LoggerProvider(resource=resource)
    logger_provider.add_log_record_processor(
        BatchLogRecordProcessor(
            OTLPLogExporter(
                endpoint=base + "/v1/logs",
                headers={**headers, "stream-name": "http_requests"},
                timeout=3,
            ),
            schedule_delay_millis=1000,
        )
    )
    _request_log = logging.getLogger("cards.requests")
    _request_log.addHandler(LoggingHandler(logger_provider=logger_provider))
    _request_log.setLevel(logging.INFO)
    _request_log.propagate = False


class RequestSignals:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http" or _duration is None:
            await self.app(scope, receive, send)
            return
        request_id = str(uuid4())
        start = time.perf_counter()
        status = 500
        complete = False

        def record():
            nonlocal complete
            if complete:
                return
            complete = True
            route = getattr(scope.get("route"), "path", "unmatched")
            outcome = "ok" if status < 400 else "client_error" if status < 500 else "server_error"
            elapsed = (time.perf_counter() - start) * 1000
            _duration.record(elapsed, {"route": route, "outcome": outcome})
            _request_log.info(
                "http_request",
                extra={
                    "request_id": request_id,
                    "route": route,
                    "outcome": outcome,
                    "status_code": status,
                    "duration_ms": elapsed,
                },
            )

        async def send_with_id(message):
            nonlocal status
            if message["type"] == "http.response.start":
                status = message["status"]
                message = {
                    **message,
                    "headers": [
                        *message.get("headers", []),
                        (b"x-request-id", request_id.encode()),
                    ],
                }
            if message["type"] == "http.response.body" and not message.get("more_body", False):
                record()
            await send(message)

        try:
            await self.app(scope, receive, send_with_id)
        finally:
            record()

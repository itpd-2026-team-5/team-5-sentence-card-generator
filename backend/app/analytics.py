"""Privacy-limited product events sent to the configured OpenPanel project."""

import json
import logging
from concurrent.futures import ThreadPoolExecutor
from urllib.request import Request, urlopen

from app.config import settings

log = logging.getLogger(__name__)
_worker = ThreadPoolExecutor(max_workers=1, thread_name_prefix="analytics")
EVENTS = {
    "text_added": {"language"},
    "word_marked": {"language", "action"},
    "generation_completed": {"language", "card_count", "rewritten_count"},
    "generation_failed": {"language", "failure"},
    "card_rewrite_requested": {"language", "actor"},
    "card_regeneration_completed": {"language", "actor", "card_count", "mode"},
    "card_regeneration_failed": {"language", "actor", "mode"},
    "llm_usage_recorded": {"task", "billing_scope", "input_tokens", "output_tokens"},
    "study_review_completed": {"rating", "is_new"},
    "teacher_card_approved": set(),
}


def _send(name: str, fields: dict[str, str | int | bool]) -> None:
    body = json.dumps({"type": "track", "payload": {"name": name, "properties": fields}}).encode()
    request = Request(
        settings.openpanel_url.rstrip("/") + "/track",
        data=body,
        headers={
            "Content-Type": "application/json",
            "openpanel-client-id": settings.openpanel_client_id,
            "openpanel-client-secret": settings.openpanel_client_secret,
        },
        method="POST",
    )
    try:
        with urlopen(request, timeout=2) as response:
            response.read()
    except OSError:
        log.warning("analytics export failed for %s", name)


def track(name: str, *, source: str = "web", **fields: str | int | bool) -> None:
    """Send only registered, bounded fields. Never forward user text, headers, or IDs."""
    if name not in EVENTS or source not in {"web", "usability-test", "smoke"}:
        raise ValueError("Unknown analytics event or source")
    if set(fields) != EVENTS[name]:
        raise ValueError("Analytics event fields differ from the registry")
    if not settings.telemetry_enabled or not all(
        (settings.openpanel_url, settings.openpanel_client_id, settings.openpanel_client_secret)
    ):
        return
    _worker.submit(
        _send, name, {"source": source, "environment": settings.telemetry_environment, **fields}
    )

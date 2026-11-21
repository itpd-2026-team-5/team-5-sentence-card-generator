"""Generate card pronunciation with local Piper and reuse the stored WAV."""

import hashlib
import json
import os
import tempfile
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from app.config import settings

VOICES = {
    "en": "en_US-joe-medium",
    "de": "de_DE-thorsten-medium",
    "ru": "ru_RU-denis-medium",
}


class SpeechError(Exception):
    pass


def audio_for(text: str, language: str) -> bytes:
    if not text.strip() or len(text) > 4096:
        raise SpeechError("This card text cannot be read aloud")
    voice = VOICES.get(language)
    if voice is None:
        raise SpeechError("No local voice is available for this language")
    identity = json.dumps(["piper-v1", voice, text], ensure_ascii=False).encode()
    cache = Path(settings.speech_cache_dir)
    filename = cache / (hashlib.sha256(identity).hexdigest() + ".wav")
    if filename.is_file():
        return filename.read_bytes()
    request = Request(
        settings.piper_url.rstrip("/") + "/synthesize",
        data=json.dumps({"text": text, "voice": voice}).encode(),
        headers={"Content-Type": "application/json"},
    )
    try:
        with urlopen(request, timeout=60) as response:
            audio = response.read(16_000_001)
    except (HTTPError, URLError, TimeoutError) as exc:
        raise SpeechError("Local pronunciation is unavailable") from exc
    if len(audio) < 44 or len(audio) > 16_000_000 or not audio.startswith(b"RIFF"):
        raise SpeechError("Local pronunciation returned invalid audio")
    cache.mkdir(parents=True, exist_ok=True)
    handle, temporary = tempfile.mkstemp(dir=cache, suffix=".tmp")
    try:
        with os.fdopen(handle, "wb") as output:
            output.write(audio)
        os.replace(temporary, filename)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)
    return audio

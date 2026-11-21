"""Stored pronunciation is reused and stays behind card access checks."""

import json
import wave
from io import BytesIO
from urllib.error import URLError

from app.config import settings
from tests.helpers import first_deck


def test_card_audio_is_cached_and_shared_only_with_invited_teacher(
    client, teacher, monkeypatch, tmp_path
):
    text = client.post(
        "/api/texts", json={"title": "T", "body": "Ich gehe heute zur Bank. Dort hole ich Geld."}
    ).json()
    client.put(
        f"/api/texts/{text['id']}/marks",
        json={"word": "Geld", "sentence": "Dort hole ich Geld.", "status": "learn"},
    )
    deck = first_deck(client)
    card = client.post(f"/api/texts/{text['id']}/generate", json={"deck_id": deck}).json()[
        "created"
    ][0]
    url = f"/api/cards/{card['id']}/audio/sentence"
    monkeypatch.setattr(settings, "piper_url", "http://piper:5000")
    monkeypatch.setattr(settings, "speech_cache_dir", str(tmp_path))

    def unavailable(request, timeout):
        raise URLError("offline")

    monkeypatch.setattr("app.speech.urlopen", unavailable)
    assert client.get(url).status_code == 503

    output = BytesIO()
    with wave.open(output, "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(22050)
        wav.writeframes(b"\0" * 100)
    sample = output.getvalue()
    calls = []

    def fake_open(request, timeout):
        calls.append(request)
        return BytesIO(sample)

    monkeypatch.setattr("app.speech.urlopen", fake_open)
    assert teacher.get(url).status_code == 404
    assert client.get(url).content == sample
    assert client.get(url).headers["content-type"] == "audio/wav"
    assert len(calls) == 1
    assert calls[0].full_url == "http://piper:5000/synthesize"
    assert json.loads(calls[0].data) == {
        "text": card["sentence"],
        "voice": "de_DE-thorsten-medium",
    }
    assert len(list(tmp_path.glob("*.wav"))) == 1

    client.post(f"/api/decks/{deck}/shares", json={"email": "teacher@example.com"})
    assert teacher.get(url).content == sample
    client.delete(f"/api/decks/{deck}/shares/teacher@example.com")
    assert teacher.get(url).status_code == 404

    client.patch(f"/api/cards/{card['id']}", json={"sentence": "Ein neuer Satz."})
    assert client.get(url).content == sample
    assert len(calls) == 2
    assert client.get(f"/api/cards/{card['id']}/audio/unknown").status_code == 404

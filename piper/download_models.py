"""Fetch the three Piper voices and retain their license information in the image."""

import subprocess
import sys
from pathlib import Path
from urllib.request import urlretrieve

VOICES = {
    "en_US-joe-medium": "en/en_US/joe/medium",
    "de_DE-thorsten-medium": "de/de_DE/thorsten/medium",
    "ru_RU-denis-medium": "ru/ru_RU/denis/medium",
}


def main() -> None:
    target = Path(sys.argv[1])
    target.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            sys.executable,
            "-m",
            "piper.download_voices",
            "--data-dir",
            str(target),
            *VOICES,
        ],
        check=True,
    )
    for name, source in VOICES.items():
        url = f"https://huggingface.co/rhasspy/piper-voices/resolve/main/{source}/MODEL_CARD"
        urlretrieve(url, target / f"{name}.MODEL_CARD")


if __name__ == "__main__":
    main()

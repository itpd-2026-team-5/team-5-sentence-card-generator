"""LLM providers behind one interface, so the model can be swapped without touching the pipeline."""

import json
from dataclasses import dataclass
from typing import Protocol

import anthropic

from app.config import settings


class LLMError(Exception):
    """The provider could not produce an answer; the message is safe to show the user."""


@dataclass
class LLMResult:
    data: dict
    model: str
    input_tokens: int
    output_tokens: int


class LLMProvider(Protocol):
    def generate_json(self, system: str, prompt: str, schema: dict) -> LLMResult: ...


class AnthropicProvider:
    def __init__(self, model: str, effort: str):
        self.model = model
        self.effort = effort

    def generate_json(self, system: str, prompt: str, schema: dict) -> LLMResult:
        try:
            client = anthropic.Anthropic()
            response = client.beta.messages.create(
                model=self.model,
                max_tokens=16000,
                system=system,
                messages=[{"role": "user", "content": prompt}],
                output_config={
                    "effort": self.effort,
                    "format": {"type": "json_schema", "schema": schema},
                },
                # On a policy decline, the API re-runs the request on its recommended fallback model.
                betas=["server-side-fallback-2026-07-01"],
                fallbacks="default",
            )
        except anthropic.AuthenticationError as e:
            raise LLMError(
                "The Claude API key is missing or invalid; set ANTHROPIC_API_KEY."
            ) from e
        except anthropic.RateLimitError as e:
            raise LLMError("Claude is rate limiting us; try again in a minute.") from e
        except anthropic.APIStatusError as e:
            raise LLMError(f"Claude returned an error ({e.status_code}).") from e
        except anthropic.APIConnectionError as e:
            raise LLMError("Could not reach the Claude API.") from e
        except anthropic.AnthropicError as e:
            # For example, no credentials configured at all.
            raise LLMError(f"Claude is not configured: {e}") from e

        if response.stop_reason == "refusal":
            raise LLMError("Claude declined to write these sentences.")
        if response.stop_reason == "max_tokens":
            raise LLMError("The answer was cut off; try fewer words at once.")
        texts = [block.text for block in response.content if block.type == "text"]
        if not texts:
            raise LLMError("Claude returned no sentences.")
        return LLMResult(
            data=json.loads(texts[-1]),
            model=response.model,
            input_tokens=response.usage.input_tokens,
            output_tokens=response.usage.output_tokens,
        )


class FakeProvider:
    """Canned sentences, for tests and for working without an API key."""

    def generate_json(self, system: str, prompt: str, schema: dict) -> LLMResult:
        request = json.loads(prompt.split("\n", 1)[1])
        cards = []
        for n, item in enumerate(request["words"]):
            # A different sentence for each copy of a word, so "more cards" can be told apart.
            existing = item.get("existing_sentences", [])
            seen = len(existing) + n if existing else 0
            variant = f" ({seen + 1})" if seen else ""
            cards.append(
                {
                    "word": item["word"],
                    "word_form": item["word"],
                    "word_translation": f"[{item['word']}]",
                    "sentence": f"This is a short practice sentence that uses {item['word']}{variant} today.",
                    "translation": f"(fake translation of the sentence with {item['word']})",
                }
            )
        return LLMResult(data={"cards": cards}, model="fake", input_tokens=0, output_tokens=0)


class NeedsLLM(Exception):
    """The browser has to run this request with the learner's own key, then call again."""

    def __init__(self, system: str, prompt: str, schema: dict):
        super().__init__("The browser must call the LLM")
        self.request = {"system": system, "prompt": prompt, "schema": schema}


class BrowserProvider:
    """For learners who bring their own key, which stays in their browser.

    The server builds the request but cannot send it: the first call stops with NeedsLLM and
    hands the request to the browser, which sends it to Claude itself and repeats the call with
    the answer. Only one LLM call fits in that round trip, so a failed check is not retried.
    """

    retries = False

    def __init__(self, output: dict | None):
        self.output = output

    def generate_json(self, system: str, prompt: str, schema: dict) -> LLMResult:
        if self.output is None:
            raise NeedsLLM(system, prompt, schema)
        output, self.output = self.output, None
        if not isinstance(output.get("data"), dict) or "cards" not in output["data"]:
            raise LLMError("The answer from Claude was not in the expected shape.")
        return LLMResult(
            data=output["data"],
            model=output["model"],
            input_tokens=output["input_tokens"],
            output_tokens=output["output_tokens"],
        )


def get_provider() -> LLMProvider:
    if settings.llm_provider == "fake":
        return FakeProvider()
    return AnthropicProvider(settings.llm_model, settings.llm_effort)

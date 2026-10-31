"""LLM providers behind one interface, so the model can be swapped without touching the pipeline."""

import json
import re
from dataclasses import dataclass
from typing import Any, Protocol, cast

import anthropic
from anthropic.types.beta import BetaMessageParam, BetaOutputConfigParam

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


def parse_json(text: str) -> dict:
    """The JSON object in a model's answer. Structured output returns it bare, but a model
    behind a gateway that drops that setting may wrap it in a code fence or a sentence."""
    text = text.strip()
    fenced = re.search(r"```(?:json)?\s*(\{.*\})\s*```", text, re.DOTALL)
    if fenced:
        text = fenced.group(1)
    elif not text.startswith("{"):
        start, end = text.find("{"), text.rfind("}")
        if start < 0 or end <= start:
            raise LLMError("The model's answer held no cards; try again.")
        text = text[start : end + 1]
    try:
        data = json.loads(text)
    except json.JSONDecodeError as e:
        raise LLMError("The model's answer was not valid JSON; try again.") from e
    if not isinstance(data, dict):
        raise LLMError("The model's answer was not in the expected shape; try again.")
    return data


def schema_reminder(schema: dict) -> str:
    """The required shape, stated in the prompt too, for providers that ignore structured output."""
    return (
        "\n\nAnswer with only one JSON object, no other text, that matches this JSON schema:\n"
        + json.dumps(schema)
    )


def supports_new_features(model: str) -> bool:
    """Effort and the server-side refusal fallback exist on the Claude 5 family; an older
    model, or another model behind a gateway, rejects them."""
    return re.match(r"claude-(opus|sonnet|haiku|fable)-5", model) is not None


class AnthropicProvider:
    def __init__(self, model: str, effort: str):
        self.model = model
        self.effort = effort

    def _client(self) -> anthropic.Anthropic:
        options: dict[str, Any] = {}
        if settings.anthropic_api_key:
            options["api_key"] = settings.anthropic_api_key
        if settings.anthropic_auth_token:
            options["auth_token"] = settings.anthropic_auth_token
        if settings.anthropic_base_url:
            options["base_url"] = settings.anthropic_base_url
        return anthropic.Anthropic(**options)

    def generate_json(self, system: str, prompt: str, schema: dict) -> LLMResult:
        output_config: BetaOutputConfigParam = {"format": {"type": "json_schema", "schema": schema}}
        extra: dict[str, Any] = {}
        if supports_new_features(self.model):
            if self.effort:
                output_config["effort"] = cast(Any, self.effort)
            # On a policy decline, the API re-runs the request on its recommended fallback model.
            extra = {"betas": ["server-side-fallback-2026-07-01"], "fallbacks": "default"}
        messages: list[BetaMessageParam] = [
            {"role": "user", "content": prompt + schema_reminder(schema)}
        ]
        try:
            response = self._client().beta.messages.create(
                model=self.model,
                max_tokens=16000,
                system=system,
                messages=messages,
                output_config=output_config,
                **extra,
            )
        except anthropic.AuthenticationError as e:
            raise LLMError(
                "The Claude API key is missing or invalid; set ANTHROPIC_API_KEY or ANTHROPIC_AUTH_TOKEN."
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
        data = parse_json(texts[-1])
        if any(key not in data for key in schema.get("required", [])):
            raise LLMError("The model's answer was not in the expected shape; try again.")
        return LLMResult(
            data=data,
            model=response.model,
            input_tokens=response.usage.input_tokens,
            output_tokens=response.usage.output_tokens,
        )


class FakeProvider:
    """Canned sentences, for tests and for working without an API key."""

    def generate_json(self, system: str, prompt: str, schema: dict) -> LLMResult:
        request = json.loads(prompt.split("\n", 1)[1])
        if "glosses" in schema["properties"]:
            glosses = [{"id": w["id"], "gloss": f"[{w['word']}]"} for w in request["words"]]
            return LLMResult(
                data={"glosses": glosses}, model="fake", input_tokens=0, output_tokens=0
            )
        cards = []
        for n, item in enumerate(request["words"]):
            # A different sentence for each copy of a word, so "more cards" can be told apart.
            existing = item.get("existing_sentences", [])
            seen = len(existing) + n if existing else 0
            variant = f" ({seen + 1})" if seen else ""
            cards.append(
                {
                    "id": item.get("id", str(n)),
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
        self.request = {
            "system": system,
            "prompt": prompt + schema_reminder(schema),
            "schema": schema,
        }


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
        data = output.get("data")
        if not isinstance(data, dict) or any(key not in data for key in schema.get("required", [])):
            raise LLMError("The answer from the model was not in the expected shape.")
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

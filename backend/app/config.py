from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "postgresql+psycopg://cards:cards@localhost:5433/cards"
    # "anthropic" calls Claude; "fake" returns canned sentences for tests and offline work.
    llm_provider: str = "anthropic"
    llm_model: str = "claude-opus-5-5"
    # Effort and the refusal fallback are sent only to models that take them; empty turns
    # effort off, for example on an older model behind a gateway.
    llm_effort: str = "low"
    # Credentials for the service's key. A gateway that speaks the Anthropic API takes its
    # address as anthropic_base_url and often a bearer token as anthropic_auth_token.
    anthropic_api_key: str = ""
    anthropic_auth_token: str = ""
    anthropic_base_url: str = ""
    cors_origins: list[str] = ["http://localhost:5173"]
    # Where the app runs, for the link in the verification email.
    app_url: str = "http://localhost:5173"
    # Outgoing email. With no host, emails are only logged (and kept for tests).
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    smtp_starttls: bool = True
    mail_from: str = "Sentence Cards <no-reply@sentence-cards.local>"


settings = Settings()

# Free placement tests shown in the profile form, by target language. Checked on 2026-10-17:
# - English: EF SET, free, CEFR A1-C2, no sign-up needed to start.
# - German: Sprachcaffe, free, 70 questions, CEFR A1-C2, no sign-up.
# - Russian: Liden & Denz, 65 questions from beginner to advanced; asks for a name and an
#   email address to send the result, which the profile form tells the learner.
PLACEMENT_TESTS: dict[str, str] = {
    "en": "https://www.efset.org/",
    "de": "https://www.sprachcaffe.com/en/oc/free-german-level-test-online.htm",
    "ru": "https://lidenz.com/online-test",
}

import { t } from "../i18n";
import { useEffect, useState } from "react";
import { InterfaceLanguage } from "../components/InterfaceLanguage";
import { ModelPicker } from "../components/ModelPicker";
import {
  api,
  LANGUAGES,
  LEVELS,
  local,
  type Language,
  type Level,
  type Profile,
  type Stats,
  type User,
} from "../api";
import { Icon } from "../components/Icon";
import { listModels, ownKey, PROVIDERS, type ProviderKind } from "../llm";

const LEVEL_NOTES: Record<Level, string> = {
  A1: "Beginner",
  A2: "Elementary",
  B1: "Intermediate",
  B2: "Upper intermediate",
  C1: "Advanced",
  C2: "Proficient",
};

export function Settings({
  user,
  onSignedOut,
}: {
  user: User;
  onSignedOut: () => void;
}) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saved, setSaved] = useState<string>("");
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [firstSave, setFirstSave] = useState(false);

  useEffect(() => {
    api.profile().then(setProfile, (e) => setError(e.message));
    api.stats().then(setStats);
  }, []);
  if (!profile) return <p className="muted">{error || t("Loading…")}</p>;

  const set = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    setProfile({ ...profile, [key]: value });
    setDirty(true);
    setSaved("");
  };

  const setLevel = (language: Language, level: Level | "") => {
    const levels = { ...profile.levels };
    if (level) levels[language] = level;
    else delete levels[language];
    set("levels", levels);
  };

  const save = async () => {
    try {
      if (!profile.set_up) setFirstSave(true);
      // A learner who never picked a level for the language they learn starts at A2.
      const levels = { ...profile.levels };
      if (!levels[profile.target_language])
        levels[profile.target_language] = "A2";
      setProfile(await api.saveProfile({ ...profile, levels }));
      setDirty(false);
      setSaved(t("Saved"));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const swap = () => {
    setProfile({
      ...profile,
      known_language: profile.target_language,
      target_language: profile.known_language,
    });
    setDirty(true);
  };

  // The language for new decks comes first; every language with a level gets the same picker.
  const others = (Object.keys(LANGUAGES) as Language[]).filter(
    (l) => l !== profile.known_language && l !== profile.target_language,
  );
  const learning = [
    profile.target_language,
    ...others.filter((l) => profile.levels[l]),
  ];
  const notLearning = others.filter((l) => !profile.levels[l]);

  return (
    <div className="page narrow">
      {!profile.set_up && (
        <section className="glass block welcome">
          <h2>
            {t("Welcome,")} {user.full_name.split(" ")[0]}.
          </h2>
          <p>
            {t(
              "Before your first cards, tell us which language you speak, which one you are learning, and your level. Every sentence is written for them. Save, and you can start.",
            )}
          </p>
        </section>
      )}
      {profile.set_up && saved && firstSave && (
        <section className="glass block welcome">
          <h2>{t("You are set up.")}</h2>
          <p>{t("Next, add a text and mark the words you want to learn.")}</p>
          <a className="btn primary" href="#/texts">
            {t("Add your first text")}
          </a>
        </section>
      )}
      <header className="page-head">
        <p className="eyebrow">{t("Settings")}</p>
        <h1>{t("Your languages")}</h1>
        <p className="muted">
          {t(
            "Sentences are written for your level, from words you already know. Each deck has its own language pair and instructions.",
          )}
        </p>
      </header>

      <section className="glass block">
        <InterfaceLanguage />
        <p className="muted small">
          {t(
            "Saved in this browser. Your learning languages and card voices stay the same.",
          )}
        </p>
      </section>
      <section className="glass block">
        <h3>{t("Languages for new decks")}</h3>
        <div className="lang-row">
          <label>
            {t("I speak")}
            <select
              value={profile.known_language}
              onChange={(e) =>
                set("known_language", e.target.value as Language)
              }
            >
              {Object.entries(LANGUAGES).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <button
            className="ghost icon-btn"
            onClick={swap}
            aria-label={t("Swap languages")}
            title={t("Swap")}
          >
            <Icon name="swap" />
          </button>
          <label>
            {t("I am learning")}
            <select
              value={profile.target_language}
              onChange={(e) =>
                set("target_language", e.target.value as Language)
              }
            >
              {Object.entries(LANGUAGES).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="also-learning">
          <span className="muted small">{t("Also learning:")}</span>
          {learning.slice(1).map((language) => (
            <span key={language} className="chip">
              {t(LANGUAGES[language])}
              <button
                className="ghost"
                onClick={() => setLevel(language, "")}
                aria-label={t("Stop learning {v0}", {
                  v0: LANGUAGES[language],
                })}
                title={t("Stop learning")}
              >
                <Icon name="close" size={14} />
              </button>
            </span>
          ))}
          {notLearning.length > 0 ? (
            <select
              className="add-language"
              value=""
              onChange={(e) =>
                e.target.value && setLevel(e.target.value as Language, "A1")
              }
              aria-label={t("Add another language to learn")}
            >
              <option value="">{t("+ Add another language to learn")}</option>
              {notLearning.map((language) => (
                <option key={language} value={language}>
                  {t(LANGUAGES[language])}
                </option>
              ))}
            </select>
          ) : (
            learning.length === 1 && (
              <span className="muted small">{t("no other language")}</span>
            )
          )}
        </div>
        <p className="muted small spaced">
          {t(
            "New decks use the pair above; a deck can use any language you learn.",
          )}
        </p>
      </section>

      <section className="glass block">
        <h3>{t("Your level in each language")}</h3>
        <p className="muted small level-intro">
          {t(
            "New sentences in each language are written at this level. A deck can set a level of its own, which then wins for that deck. Changing a level here affects only cards generated from now on, not the cards you already have.",
          )}
        </p>
        <div className="level-list">
          {learning.map((language) => {
            const level = profile.levels[language] ?? t("A2");
            const test = profile.placement_tests?.[language];
            return (
              <div key={language} className="level-block">
                <div className="level-head">
                  <strong>{t(LANGUAGES[language])}</strong>
                  {language === profile.target_language && (
                    <span
                      className="tag"
                      title={t("The language new decks start with")}
                    >
                      {t("Main language")}
                    </span>
                  )}
                </div>
                <div
                  className="segmented"
                  role="radiogroup"
                  aria-label={t("Level in {v0}", { v0: LANGUAGES[language] })}
                >
                  {LEVELS.map((l) => (
                    <button
                      key={l}
                      role="radio"
                      aria-checked={level === l}
                      className={level === l ? "on" : ""}
                      onClick={() => setLevel(language, l)}
                    >
                      <strong>{l}</strong>
                      <small>{t(LEVEL_NOTES[l])}</small>
                    </button>
                  ))}
                </div>
                <p className="muted small">
                  {test ? (
                    <>
                      {t("Not sure?")}{" "}
                      <a href={test} target="_blank" rel="noreferrer">
                        {t("Take a free placement test ↗")}
                      </a>
                      {language === "ru" ? t(" (it asks for your email)") : ""}
                    </>
                  ) : (
                    t("No placement test linked yet.")
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="glass block">
        <h3>{t("Sentence length")}</h3>
        <div className="lang-row">
          <label>
            {t("Shortest (words)")}
            <input
              type="number"
              min={3}
              max={30}
              value={profile.sentence_min_words}
              onChange={(e) =>
                set("sentence_min_words", Number(e.target.value))
              }
            />
          </label>
          <span className="muted">{t("to")}</span>
          <label>
            {t("Longest (words)")}
            <input
              type="number"
              min={3}
              max={30}
              value={profile.sentence_max_words}
              onChange={(e) =>
                set("sentence_max_words", Number(e.target.value))
              }
            />
          </label>
        </div>
        <div className="lang-row spaced">
          <label>
            {t("Shortest (characters)")}
            <input
              type="number"
              min={0}
              max={500}
              step={10}
              value={profile.sentence_min_chars || ""}
              placeholder={t("No minimum")}
              onChange={(e) =>
                set("sentence_min_chars", Number(e.target.value) || 0)
              }
            />
          </label>
          <span className="muted">{t("to")}</span>
          <label>
            {t("Longest (characters)")}
            <input
              type="number"
              min={0}
              max={500}
              step={10}
              value={profile.sentence_max_chars || ""}
              placeholder={t("No maximum")}
              onChange={(e) =>
                set("sentence_max_chars", Number(e.target.value) || 0)
              }
            />
          </label>
        </div>
        <p className="muted small">
          {t(
            "German words can be long, so bounds in characters keep a session predictable, and a minimum keeps sentences from being too simple.",
          )}
        </p>
      </section>

      <ReadAloud />
      <WhoWrites />

      <section className="glass block">
        <h3>{t("Statistics")}</h3>
        {stats ? (
          <>
            <div className="usage">
              <div>
                <strong>{stats.cards}</strong>
                <span>{t("cards")}</span>
              </div>
              <div>
                <strong>{stats.kept_as_generated}</strong>
                <span>{t("kept as generated")}</span>
              </div>
              <div>
                <strong>{stats.regenerated}</strong>
                <span>
                  {t("regenerated")}
                  {stats.regenerations > stats.regenerated
                    ? t(" ({v0} times in all)", { v0: stats.regenerations })
                    : ""}
                </span>
              </div>
              <div>
                <strong>{stats.edited}</strong>
                <span>{t("edited by hand")}</span>
              </div>
              <div>
                <strong>{stats.archived}</strong>
                <span>{t("archived")}</span>
              </div>
              <div>
                <strong>{stats.deleted}</strong>
                <span>{t("deleted")}</span>
              </div>
            </div>
            <p className="muted small spaced">
              {t("Tokens, as the provider reported them:")}{" "}
              {stats.input_tokens.toLocaleString()} {t("in,")}{" "}
              {stats.output_tokens.toLocaleString()} {t("out.")}
              {stats.failed_checks > 0 &&
                t(" {v0} cards still failed a check after the retries.", {
                  v0: stats.failed_checks,
                })}{" "}
              {t("Your provider's own dashboard shows what you were billed.")}
            </p>
          </>
        ) : (
          <p className="muted">{t("Loading…")}</p>
        )}
      </section>

      <section className="glass block row-between center-y">
        <div>
          <h3>{t("Account")}</h3>
          <p>{user.full_name}</p>
          <p className="muted small">{user.email}</p>
        </div>
        <button
          className="btn"
          onClick={async () => {
            await api.logout();
            onSignedOut();
          }}
        >
          {t("Sign out")}
        </button>
      </section>

      <div className={`savebar ${dirty || !profile.set_up ? "show" : ""}`}>
        <span>
          {error ? (
            <span className="error">{error}</span>
          ) : profile.set_up ? (
            t("You have unsaved changes")
          ) : (
            t("Check your languages and level, then save")
          )}
        </span>
        <button className="btn primary" onClick={save}>
          {t("Save changes")}
        </button>
      </div>
      {saved && !dirty && (
        <p className="toast">
          <Icon name="check" size={16} /> {saved}
        </p>
      )}
    </div>
  );
}

/** Reading sentences aloud, switched in the app so the device need not be muted. */
function ReadAloud() {
  const [on, setOn] = useState(local.get("autoplay", "on") === "on");
  return (
    <section className="glass block">
      <h3>{t("Sound")}</h3>
      <label className="switch big-switch">
        <input
          type="checkbox"
          checked={on}
          onChange={(e) => {
            setOn(e.target.checked);
            local.set("autoplay", e.target.checked ? "on" : "off");
          }}
        />
        {t("Read each sentence aloud when a card appears")}
      </label>
      <p className="muted small">
        {t("You can also switch it during study, with the speaker button.")}
      </p>
    </section>
  );
}

/** Who writes the sentences: the service's key, or the learner's own key with any provider. */
function WhoWrites() {
  const [source, setSource] = useState(ownKey.source());
  const [kind, setKind] = useState<ProviderKind>(ownKey.kind());
  const [baseUrl, setBaseUrl] = useState(ownKey.baseUrl());
  const [model, setModel] = useState(ownKey.model());
  const [key, setKey] = useState(ownKey.get());
  const [saved, setSaved] = useState(false);
  const [check, setCheck] = useState<
    "checking" | { ok: boolean; message: string } | null
  >(null);
  const [found, setFound] = useState<string[]>([]);

  // Ask the provider for its models with this key, so a wrong address or key shows before saving.
  const checkConnection = async () => {
    setCheck("checking");
    try {
      const models = await listModels(kind, baseUrl, key.trim());
      setFound(models);
      if (!model.trim() && models[0]) setModel(models[0]);
      setCheck({
        ok: true,
        message: models.length
          ? t("Connected: {v0} models; pick one under Model.", {
              v0: models.length,
            })
          : "Connected, but the provider listed no models.",
      });
    } catch (e) {
      setFound([]);
      setCheck({ ok: false, message: (e as Error).message });
    }
  };

  const changeKind = (next: ProviderKind) => {
    setKind(next);
    setBaseUrl(PROVIDERS[next].defaultUrl);
    setModel(PROVIDERS[next].models[0] ?? "");
    setSaved(false);
  };
  const save = () => {
    ownKey.setSource(source);
    ownKey.setKind(kind);
    ownKey.setBaseUrl(baseUrl.trim());
    ownKey.setModel(model.trim());
    ownKey.set(key.trim());
    setSaved(true);
  };
  const ready = key.trim() && model.trim() && baseUrl.trim();

  return (
    <section className="glass block stack">
      <h3>{t("Who writes the sentences")}</h3>
      <div className="segmented two" role="radiogroup" aria-label={t("Key")}>
        <button
          role="radio"
          aria-checked={source === "service"}
          className={source === "service" ? "on" : ""}
          onClick={() => {
            setSource("service");
            ownKey.setSource("service");
            setSaved(true);
          }}
        >
          <strong>{t("The service")}</strong>
          <small>{t("Its key and model")}</small>
        </button>
        <button
          role="radio"
          aria-checked={source === "own"}
          className={source === "own" ? "on" : ""}
          onClick={() => {
            setSource("own");
            setSaved(false);
          }}
        >
          <strong>{t("My own key")}</strong>
          <small>{t("Any provider, paid by you")}</small>
        </button>
      </div>
      {source === "own" && (
        <>
          <label>
            {t("Provider")}
            <select
              value={kind}
              onChange={(e) => changeKind(e.target.value as ProviderKind)}
            >
              {(Object.keys(PROVIDERS) as ProviderKind[]).map((k) => (
                <option key={k} value={k}>
                  {t(PROVIDERS[k].label)}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t("Base URL")}
            <input
              value={baseUrl}
              spellCheck={false}
              placeholder={PROVIDERS[kind].defaultUrl}
              onChange={(e) => {
                setBaseUrl(e.target.value);
                setSaved(false);
                setCheck(null);
              }}
            />
          </label>
          <div className="stack tight">
            <label htmlFor="provider-model">{t("Model")}</label>
            <ModelPicker
              id="provider-model"
              value={model}
              options={found.length ? found : PROVIDERS[kind].models}
              placeholder={
                kind === "openai"
                  ? t("e.g. the name your provider lists")
                  : "claude-opus-5-5"
              }
              onChange={(value) => {
                setModel(value);
                setSaved(false);
              }}
            />
          </div>
          <label>
            {t("API key")}
            <input
              type="password"
              autoComplete="off"
              spellCheck={false}
              placeholder={t("Your key")}
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
                setSaved(false);
              }}
            />
          </label>
          <div className="row-gap">
            <button
              className="btn small"
              disabled={!key.trim() || !baseUrl.trim() || check === "checking"}
              onClick={checkConnection}
            >
              {check === "checking"
                ? t("Checking…")
                : t("Check the connection")}
            </button>
            {check && check !== "checking" && (
              <span className={check.ok ? "toast" : "error"}>
                {check.message}
              </span>
            )}
          </div>
          <p className="muted small">
            {t(PROVIDERS[kind].hint)}{" "}
            {t(
              "The key stays in this browser: it goes straight to the provider and is never sent to our server, so we and your teacher cannot read it.",
            )}
          </p>
        </>
      )}
      {source === "own" && (
        <div className="row-gap">
          <button className="btn primary" disabled={!ready} onClick={save}>
            {t("Save in this browser")}
          </button>
          {ownKey.get() && (
            <button
              className="btn"
              onClick={() => {
                ownKey.set("");
                setKey("");
                setSource("service");
                ownKey.setSource("service");
                setSaved(true);
              }}
            >
              {t("Forget my key")}
            </button>
          )}
        </div>
      )}
      {saved && (
        <p className="toast">
          <Icon name="check" size={16} />{" "}
          {source === "own"
            ? t("New sentences will be written with your key, by {v0}.", {
                v0: model,
              })
            : t("New sentences will be written by the service.")}
        </p>
      )}
    </section>
  );
}

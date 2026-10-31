import { t } from "../i18n";
import { useEffect, useState } from "react";
import { api, LANGUAGES, type Language, type TextFields } from "../api";

/** A text's fields. The source address and notes are kept apart from the text itself, so no
 *  card is ever made from a word in a link or a note. */
export function TextForm({
  initial,
  submit,
  onSave,
}: {
  initial?: TextFields;
  submit: string;
  onSave: (fields: TextFields) => Promise<unknown>;
}) {
  const [fields, setFields] = useState<TextFields>(
    initial ?? { title: "", body: "", source_url: "", notes: "" },
  );
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (!initial)
      api
        .profile()
        .then((profile) =>
          setFields((current) => ({
            ...current,
            language: current.language ?? profile.target_language,
          })),
        )
        .catch(() => {});
  }, [initial]);
  const set = (key: Exclude<keyof TextFields, "language">, value: string) =>
    setFields({ ...fields, [key]: value });

  const load = async (file: File | undefined) => {
    if (!file) return;
    const body = await file.text();
    setFields({
      ...fields,
      body,
      title: fields.title || file.name.replace(/\.txt$/i, ""),
    });
    setError(body.trim() ? "" : t("{v0} is empty.", { v0: file.name }));
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!fields.body.trim())
      return setError(
        t("The text is empty. Paste a text or choose a .txt file."),
      );
    setBusy(true);
    try {
      await onSave({ ...fields, source_url: fields.source_url.trim() });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="stack" onSubmit={save}>
      <label>
        {t("Title")}
        <input
          required
          autoFocus
          value={fields.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder={t("e.g. Chapter 5")}
        />
      </label>
      <label>
        {t("Text language")}
        <select
          required
          value={fields.language ?? ""}
          onChange={(e) =>
            setFields({ ...fields, language: e.target.value as Language })
          }
        >
          <option value="" disabled>
            {t("Choose a language")}
          </option>
          {Object.entries(LANGUAGES).map(([code, name]) => (
            <option key={code} value={code}>
              {t(name)}
            </option>
          ))}
        </select>
      </label>
      <label>
        {t("Text")}
        <textarea
          required
          rows={12}
          value={fields.body}
          onChange={(e) => set("body", e.target.value)}
          placeholder={t(
            "Paste a song, an article, or a chapter in the language you are learning.",
          )}
        />
      </label>
      <label className="file-pick">
        {t("Or load it from a .txt file")}
        <input
          type="file"
          accept=".txt,text/plain"
          onChange={(e) => load(e.target.files?.[0])}
        />
      </label>
      <label>
        {t("Where it is from")} <span className="muted">{t("(optional)")}</span>
        <input
          type="url"
          value={fields.source_url}
          onChange={(e) => set("source_url", e.target.value)}
          placeholder={t("https://…")}
        />
      </label>
      <label>
        {t("Notes")}{" "}
        <span className="muted">
          {t("(optional, never turned into cards)")}
        </span>
        <input
          value={fields.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder={t("e.g. Episode 3, from minute 10")}
        />
      </label>
      <button className="btn primary" type="submit" disabled={busy}>
        {submit}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

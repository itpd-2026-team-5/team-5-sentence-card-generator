import { useState } from "react";
import type { TextFields } from "../api";

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
  const set = (key: keyof TextFields, value: string) =>
    setFields({ ...fields, [key]: value });

  const load = async (file: File | undefined) => {
    if (!file) return;
    const body = await file.text();
    setFields({
      ...fields,
      body,
      title: fields.title || file.name.replace(/\.txt$/i, ""),
    });
    setError(body.trim() ? "" : `${file.name} is empty.`);
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!fields.body.trim())
      return setError("The text is empty. Paste a text or choose a .txt file.");
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
        Title
        <input
          required
          autoFocus
          value={fields.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="e.g. Chapter 5"
        />
      </label>
      <label>
        Text
        <textarea
          required
          rows={12}
          value={fields.body}
          onChange={(e) => set("body", e.target.value)}
          placeholder="Paste a song, an article, or a chapter in the language you are learning."
        />
      </label>
      <label className="file-pick">
        Or load it from a .txt file
        <input
          type="file"
          accept=".txt,text/plain"
          onChange={(e) => load(e.target.files?.[0])}
        />
      </label>
      <label>
        Where it is from <span className="muted">(optional)</span>
        <input
          type="url"
          value={fields.source_url}
          onChange={(e) => set("source_url", e.target.value)}
          placeholder="https://…"
        />
      </label>
      <label>
        Notes <span className="muted">(optional, never turned into cards)</span>
        <input
          value={fields.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="e.g. Episode 3, from minute 10"
        />
      </label>
      <button className="btn primary" type="submit" disabled={busy}>
        {submit}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

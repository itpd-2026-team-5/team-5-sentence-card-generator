import { useState } from "react";
import { api, speak, type Card, type Deck, type Language } from "../api";
import { Icon } from "./Icon";

export function CardEditor({
  card,
  decks,
  language,
  onSaved,
  onCreated,
  onDeleted,
}: {
  card: Card;
  decks: Deck[];
  language: Language;
  onSaved: (card: Card) => void;
  onCreated: (cards: Card[]) => void;
  onDeleted: (id: number) => void;
}) {
  const fields = (c: Card) => ({
    sentence: c.sentence,
    translation: c.translation,
    word_form: c.word_form,
    word_translation: c.word_translation,
  });
  const [draft, setDraft] = useState(fields(card));
  const [feedback, setFeedback] = useState("");
  const [instructions, setInstructions] = useState(card.instructions);
  const [note, setNote] = useState(card.note);
  const [count, setCount] = useState(1);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [made, setMade] = useState(0);
  const changed = (Object.keys(draft) as (keyof typeof draft)[]).some(
    (k) => draft[k] !== card[k],
  );

  const run = async (label: string, action: () => Promise<Card | void>) => {
    setBusy(label);
    setError("");
    try {
      const result = await action();
      if (result) {
        onSaved(result);
        setDraft(fields(result));
        setInstructions(result.instructions);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy("");
    }
  };

  const toggleDeck = (id: number) => {
    const next = card.deck_ids.includes(id)
      ? card.deck_ids.filter((d) => d !== id)
      : [...card.deck_ids, id];
    if (next.length === 0)
      return setError("A card stays in at least one deck.");
    run("decks", () => api.setCardDecks(card.id, next));
  };

  return (
    <div className="stack">
      <div className="status-line">
        {card.status === "active" && <span className="tag ok">in study</span>}
        {card.status === "flagged" && (
          <span className="tag warn">failed a check</span>
        )}
        {card.status === "archived" && <span className="tag">archived</span>}
        {card.needs_regeneration && (
          <span className="tag">marked to rewrite</span>
        )}
        {card.edited && <span className="tag">edited</span>}
        {card.teacher_checked_at && (
          <span className="tag ok">checked by the teacher</span>
        )}
        <button
          className="ghost icon-btn push"
          aria-label="Listen"
          onClick={() => speak(card.sentence, language)}
        >
          <Icon name="sound" />
        </button>
      </div>
      {card.problems.length > 0 && (
        <p className="error">{card.problems.join("; ")}</p>
      )}

      <label>
        Sentence
        <textarea
          rows={3}
          value={draft.sentence}
          onChange={(e) => setDraft({ ...draft, sentence: e.target.value })}
        />
      </label>
      <label>
        Translation
        <textarea
          rows={2}
          value={draft.translation}
          onChange={(e) => setDraft({ ...draft, translation: e.target.value })}
        />
      </label>
      <div className="lang-row">
        <label>
          The word as it appears
          <input
            value={draft.word_form}
            onChange={(e) => setDraft({ ...draft, word_form: e.target.value })}
          />
        </label>
        <label>
          Its meaning here
          <input
            value={draft.word_translation}
            onChange={(e) =>
              setDraft({ ...draft, word_translation: e.target.value })
            }
          />
        </label>
      </div>
      <button
        className="btn primary"
        disabled={!!busy || !changed}
        onClick={() => run("save", () => api.updateCard(card.id, draft))}
      >
        <Icon name="edit" size={16} /> Save changes
      </button>

      <details className="source-note">
        <summary>Where the word came from</summary>
        <p>
          {card.text_title &&
            (card.text_exists ? (
              <>
                <a className="link" href={`#/text/${card.text_id}`}>
                  <Icon name="link" size={13} /> {card.text_title}
                </a>
                :{" "}
              </>
            ) : (
              <>
                <strong>{card.text_title}</strong> (the text was deleted):{" "}
              </>
            ))}
          “{card.source_sentence}”
        </p>
      </details>

      <div className="divider" />
      <h3>Decks</h3>
      <div className="chips">
        {decks.map((deck) => (
          <button
            key={deck.id}
            className={`chip ${card.deck_ids.includes(deck.id) ? "learn" : ""}`}
            disabled={!!busy}
            onClick={() => toggleDeck(deck.id)}
          >
            {deck.name}
            {card.deck_ids.includes(deck.id) && <Icon name="check" size={12} />}
          </button>
        ))}
      </div>

      <div className="divider" />
      <h3>New sentence</h3>
      <label>
        What was wrong <span className="muted">(optional)</span>
        <input
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="e.g. too formal, wrong meaning, too many new words"
        />
      </label>
      <label>
        Instructions this card is written with
        <textarea
          rows={2}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="None: only your level and the words you know"
        />
      </label>
      <div className="row-gap">
        <button
          className="btn"
          disabled={!!busy}
          onClick={() =>
            run("regenerate", () =>
              api.regenerateCard(
                card.id,
                feedback,
                instructions !== card.instructions ? instructions : undefined,
              ),
            )
          }
        >
          <Icon name="refresh" size={16} />{" "}
          {busy === "regenerate" ? "Writing…" : "Rewrite now"}
        </button>
        <button
          className="btn"
          disabled={!!busy}
          onClick={() =>
            run("mark", () =>
              api.updateCard(card.id, {
                needs_regeneration: !card.needs_regeneration,
              }),
            )
          }
        >
          {card.needs_regeneration ? "Unmark" : "Mark to rewrite later"}
        </button>
      </div>
      <div className="more-row">
        <span>Add</span>
        <select
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          aria-label="How many cards"
        >
          {[1, 2, 3].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <span>
          more {count === 1 ? "card" : "cards"} for this word, each with its own
          sentence
        </span>
        <button
          className="btn"
          disabled={!!busy}
          onClick={() =>
            run("more", async () => {
              const { created } = await api.moreCards(card.id, count);
              setMade(created.length);
              onCreated(created);
            })
          }
        >
          <Icon name="plus" size={16} /> {busy === "more" ? "Writing…" : "Add"}
        </button>
      </div>
      {made > 0 && (
        <p className="toast">
          <Icon name="check" size={16} /> Added {made}{" "}
          {made === 1 ? "card" : "cards"}
        </p>
      )}

      <div className="divider" />
      <h3>Ask your teacher</h3>
      {card.can_ask_teacher ? (
        <>
          <label>
            Note for the teacher
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Is this how people say it?"
            />
          </label>
          <div className="row-gap">
            <button
              className="btn"
              disabled={!!busy}
              onClick={() =>
                run("teacher", () =>
                  api.updateCard(card.id, { needs_check: true, note }),
                )
              }
            >
              <Icon name="flag" size={16} />{" "}
              {card.needs_check
                ? "Update the note"
                : "Ask the teacher to check"}
            </button>
            {card.needs_check && (
              <button
                className="btn"
                disabled={!!busy}
                onClick={() =>
                  run("teacher", () =>
                    api.updateCard(card.id, { needs_check: false, note: "" }),
                  )
                }
              >
                Resolved
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="muted small">
          None of this card's decks has a teacher. Share the deck with your
          teacher (Edit deck → Share with a teacher) to ask them about a card.
        </p>
      )}

      <div className="divider" />
      <div className="row-gap">
        {card.status === "archived" ? (
          <button
            className="btn"
            disabled={!!busy}
            onClick={() =>
              run("archive", () =>
                api.updateCard(card.id, { status: "active" }),
              )
            }
          >
            <Icon name="archive" size={16} /> Bring back into study
          </button>
        ) : (
          <button
            className="btn"
            disabled={!!busy}
            onClick={() =>
              run("archive", () =>
                api.updateCard(card.id, { status: "archived" }),
              )
            }
          >
            <Icon name="archive" size={16} /> Archive
          </button>
        )}
        <button
          className="btn danger"
          disabled={!!busy}
          onClick={() =>
            run("delete", async () => {
              if (
                !confirm(
                  `Delete the card for “${card.word}” for good? Archiving keeps it.`,
                )
              )
                return;
              await api.deleteCard(card.id);
              onDeleted(card.id);
            })
          }
        >
          <Icon name="trash" size={16} /> Delete for good
        </button>
      </div>
      <p className="muted small">
        Archive keeps the card and its history but stops studying it. Delete
        removes it for good.
      </p>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

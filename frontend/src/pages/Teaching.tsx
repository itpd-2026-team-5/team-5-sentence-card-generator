import { useEffect, useState } from "react";
import { api, type Card, type Language, type TaughtDeck } from "../api";
import { Say } from "../components/Say";
import { Icon } from "../components/Icon";

/** The decks students shared with the signed-in teacher. */
export function Teaching() {
  const [decks, setDecks] = useState<TaughtDeck[] | null>(null);
  useEffect(() => {
    api.teaching().then(setDecks);
  }, []);
  if (!decks) return <p className="muted">Loading…</p>;

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Teaching</p>
        <h1>Your students' decks</h1>
        <p className="muted">
          A student shares a deck with you by your email. You see only the decks
          they share, and you can correct every card in them.
        </p>
      </header>
      {decks.length === 0 ? (
        <div className="empty glass">
          <strong>No shared decks yet</strong>
          <span className="muted">
            Ask your student to open a deck, choose Edit deck, and share it with
            your email.
          </span>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="deck-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Deck</th>
                <th className="num">Cards</th>
                <th className="num">Asked</th>
                <th className="num">Left to check</th>
              </tr>
            </thead>
            <tbody>
              {decks.map((deck) => (
                <tr
                  key={deck.id}
                  onClick={() => {
                    location.hash = `/teach/${deck.id}`;
                  }}
                >
                  <td>
                    <strong>{deck.student_name || deck.student}</strong>
                    <span className="muted small deck-desc">
                      {deck.student}
                    </span>
                  </td>
                  <td>
                    <a href={`#/teach/${deck.id}`} className="deck-name">
                      {deck.name}
                    </a>
                    {deck.description && (
                      <span className="muted small deck-desc">
                        {deck.description}
                      </span>
                    )}
                  </td>
                  <td className="num">{deck.cards}</td>
                  <td className="num">
                    {deck.needs_check > 0 ? (
                      <span className="tag teacher">{deck.needs_check}</span>
                    ) : (
                      <span className="muted">0</span>
                    )}
                  </td>
                  <td className="num">
                    {deck.to_check > 0 ? (
                      <strong>{deck.to_check}</strong>
                    ) : (
                      <span className="tag ok">done</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/** One shared deck as a sheet: every card on one line, edited in place, so a teacher can go
 *  through hundreds of cards without opening each one. */
export function TeachDeck({
  deckId,
  language,
}: {
  deckId: number;
  language: Language;
}) {
  const [deck, setDeck] = useState<TaughtDeck | null>(null);
  const [cards, setCards] = useState<Card[] | null>(null);
  const [error, setError] = useState("");
  const [onlyOpen, setOnlyOpen] = useState(false);

  useEffect(() => {
    api.teaching().then((all) => {
      const found = all.find((d) => d.id === deckId);
      if (!found) setError("This deck is not shared with you.");
      setDeck(found ?? null);
    });
    api.taughtCards(deckId).then(setCards, (e) => setError(e.message));
  }, [deckId]);

  if (error) return <p className="error">{error}</p>;
  if (!deck || !cards) return <p className="muted">Loading…</p>;

  const replace = (card: Card) =>
    setCards(cards.map((c) => (c.id === card.id ? card : c)));
  // Every card is shown, the ones the student asked about first; the switch narrows to the
  // cards still waiting for the teacher.
  const shown = onlyOpen
    ? cards.filter(
        (c) =>
          c.needs_check || (!c.teacher_checked_at && c.status !== "archived"),
      )
    : cards;
  const left = cards.filter(
    (c) => !c.teacher_checked_at && c.status !== "archived",
  ).length;

  return (
    <div className="page wide">
      <header className="page-head row-between">
        <div className="stack tight">
          <a className="back" href="#/teaching">
            ← Teaching
          </a>
          <h1>{deck.name}</h1>
          <p className="muted">
            {deck.student_name || deck.student} ({deck.student}) · {left} of{" "}
            {cards.length} left to check
            {deck.instructions ? ` · next sentences: ${deck.instructions}` : ""}
          </p>
        </div>
        <label className="switch">
          <input
            type="checkbox"
            checked={onlyOpen}
            onChange={(e) => setOnlyOpen(e.target.checked)}
          />{" "}
          Only cards left to check
        </label>
      </header>

      <ul className="legend sheet-legend" aria-label="What the marks mean">
        <li>
          <span className="legend-asked" /> The student asked you about this
          card
        </li>
        <li>
          <Icon name="sound" size={14} /> Listen
        </li>
        <li>
          <Icon name="check" size={14} /> Looks right: answers the question and
          marks the card checked
        </li>
        <li>
          <Icon name="refresh" size={14} /> Write a new sentence, with what is
          wrong
        </li>
        <li>
          <Icon name="archive" size={14} /> Archive: out of the student's study
        </li>
        <li>
          <Icon name="trash" size={14} /> Delete
        </li>
      </ul>

      <div className="sheet-wrap">
        <table className="sheet">
          <thead>
            <tr>
              <th>Word</th>
              <th>Meaning</th>
              <th>Sentence</th>
              <th>Translation</th>
              <th>Student's note</th>
              <th>New sentence</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {shown.map((card) => (
              <SheetRow
                key={card.id}
                card={card}
                language={deck.target_language ?? language}
                known={deck.known_language ?? "en"}
                onSaved={replace}
                onDeleted={(id) => setCards(cards.filter((c) => c.id !== id))}
              />
            ))}
          </tbody>
        </table>
        {shown.length === 0 && (
          <p className="muted pad">Nothing to check here.</p>
        )}
      </div>
    </div>
  );
}

function SheetRow({
  card,
  language,
  known,
  onSaved,
  onDeleted,
}: {
  card: Card;
  language: Language;
  known: Language;
  onSaved: (card: Card) => void;
  onDeleted: (id: number) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const run = async (action: () => Promise<Card | void>) => {
    setBusy(true);
    setError("");
    try {
      const result = await action();
      if (result) onSaved(result);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  // Save a cell when the teacher leaves it, only if it changed.
  const cell = (field: "word_translation" | "sentence" | "translation") => ({
    defaultValue: card[field],
    onBlur: (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const value = e.target.value.trim();
      if (value && value !== card[field])
        run(() => api.updateCard(card.id, { [field]: value }));
    },
  });

  return (
    <tr
      className={`${card.status} ${card.needs_check ? "asks" : ""} ${busy ? "busy" : ""}`}
    >
      <td className="sheet-word" data-label="Word">
        {card.word}
        <Say
          text={card.word_form || card.word}
          language={language}
          label="the word"
        />
      </td>
      <td data-label="Meaning">
        <span className="cell-say">
          <input
            key={card.word_translation}
            {...cell("word_translation")}
            aria-label={`Meaning of ${card.word}`}
          />
          <Say
            text={card.word_translation}
            language={known}
            label="the meaning"
          />
        </span>
      </td>
      <td data-label="Sentence">
        <span className="cell-say">
          <textarea
            key={card.sentence}
            rows={2}
            {...cell("sentence")}
            aria-label={`Sentence for ${card.word}`}
          />
          <Say text={card.sentence} language={language} label="the sentence" />
        </span>
      </td>
      <td data-label="Translation">
        <span className="cell-say">
          <textarea
            key={card.translation}
            rows={2}
            {...cell("translation")}
            aria-label={`Translation for ${card.word}`}
          />
          <Say
            text={card.translation}
            language={known}
            label="the translation"
          />
        </span>
      </td>
      <td className="sheet-note" data-label="Student's note">
        {card.needs_check ? (
          <span className="note-open">
            {card.note || "Please check this card"}
          </span>
        ) : card.note && card.teacher_checked_at ? (
          <>
            <span className="note-done" title="You answered this">
              {card.note}
            </span>
            <button
              className="btn small"
              disabled={busy}
              onClick={() =>
                run(() =>
                  api.updateCard(card.id, {
                    needs_check: true,
                    teacher_checked: false,
                  }),
                )
              }
            >
              Reopen
            </button>
          </>
        ) : card.status === "flagged" ? (
          <span className="muted small">{card.problems.join("; ")}</span>
        ) : null}
      </td>
      <td className="sheet-regen" data-label="New sentence">
        <span className="cell-say">
          <input
            placeholder="What is wrong?"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            aria-label="Reason"
          />
          <button
            className="ghost icon-btn"
            disabled={busy}
            title="Write a new sentence"
            aria-label="Write a new sentence"
            onClick={() =>
              run(async () => {
                const c = await api.regenerateCard(card.id, reason);
                setReason("");
                return c;
              })
            }
          >
            <Icon name="refresh" size={16} />
          </button>
        </span>
        {error && <span className="error small">{error}</span>}
      </td>
      <td className="sheet-actions">
        {card.teacher_checked_at ? (
          <span className="ghost icon-btn is-ok" title="You checked this card">
            <Icon name="check" size={16} />
          </span>
        ) : (
          <button
            className="ghost icon-btn"
            disabled={busy}
            title="Looks right"
            aria-label="Looks right"
            onClick={() =>
              run(() => api.updateCard(card.id, { teacher_checked: true }))
            }
          >
            <Icon name="check" size={16} />
          </button>
        )}
        <button
          className={`ghost icon-btn ${card.status === "archived" ? "is-on" : ""}`}
          disabled={busy}
          title={
            card.status === "archived" ? "Bring back into study" : "Archive"
          }
          aria-label={card.status === "archived" ? "Unarchive" : "Archive"}
          onClick={() =>
            run(() =>
              api.updateCard(card.id, {
                status: card.status === "archived" ? "active" : "archived",
              }),
            )
          }
        >
          <Icon name="archive" size={16} />
        </button>
        <button
          className="ghost icon-btn danger-icon"
          disabled={busy}
          aria-label="Delete"
          title="Delete"
          onClick={() =>
            run(async () => {
              if (confirm(`Delete the card for “${card.word}”?`)) {
                await api.deleteCard(card.id);
                onDeleted(card.id);
              }
            })
          }
        >
          <Icon name="trash" size={16} />
        </button>
      </td>
    </tr>
  );
}

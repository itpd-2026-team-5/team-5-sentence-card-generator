import { t } from "../i18n";
import { useEffect, useId, useState } from "react";
import { api, speak, type Card, type Deck, type Language } from "../api";
import { Icon } from "./Icon";
import { Say } from "./Say";

export function CardEditor({
  card,
  decks,
  language,
  knownLanguage = "en",
  teacher = false,
  onDirtyChange,
  onBusyChange,
  onSaved,
  onCreated,
  onDeleted,
}: {
  card: Card;
  decks: Deck[];
  language: Language;
  knownLanguage?: Language;
  teacher?: boolean;
  onDirtyChange?: (dirty: boolean) => void;
  onBusyChange?: (busy: boolean) => void;
  onSaved: (card: Card) => void;
  onCreated: (cards: Card[]) => void;
  onDeleted: (id: number) => void;
}) {
  const fieldId = useId();
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

  useEffect(() => {
    onDirtyChange?.(
      changed || instructions !== card.instructions || !!feedback.trim(),
    );
  }, [changed, instructions, card.instructions, feedback, onDirtyChange]);
  useEffect(() => {
    onBusyChange?.(!!busy);
  }, [busy, onBusyChange]);
  useEffect(
    () => () => {
      onDirtyChange?.(false);
      onBusyChange?.(false);
    },
    [onDirtyChange, onBusyChange],
  );

  const run = async (label: string, action: () => Promise<Card | void>) => {
    if (busy) return;
    setBusy(label);
    setError("");
    try {
      const result = await action();
      if (result) {
        onSaved(result);
        setDraft(fields(result));
        setInstructions(result.instructions);
        if (label === "regenerate") setFeedback("");
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
      return setError(t("A card stays in at least one deck."));
    run("decks", () => api.setCardDecks(card.id, next));
  };

  return (
    <div className="stack">
      <div className="status-line">
        {card.status === "active" && (
          <span className="tag ok">{t("in study")}</span>
        )}
        {card.status === "flagged" && (
          <span className="tag warn">{t("failed a check")}</span>
        )}
        {card.status === "archived" && (
          <span className="tag">{t("archived")}</span>
        )}
        {card.needs_regeneration && (
          <span className="tag">{t("marked to rewrite")}</span>
        )}
        {card.edited && <span className="tag">{t("edited")}</span>}
        {card.teacher_checked_at && (
          <span className="tag ok">{t("checked by the teacher")}</span>
        )}
        {!teacher && (
          <button
            className="ghost icon-btn push"
            aria-label={t("Listen")}
            onClick={() => speak(card.sentence, language)}
          >
            <Icon name="sound" />
          </button>
        )}
      </div>
      {teacher && (
        <section className="stack teacher-review">
          <h3>{t("Student's request")}</h3>
          <p className={card.needs_check ? "note-open" : "muted"}>
            {card.note ||
              (card.needs_check
                ? t("Please check this card")
                : t("No note from the student."))}
          </p>
          {card.teacher_checked_at && !card.needs_check ? (
            <button
              className="btn"
              disabled={!!busy || changed}
              onClick={() =>
                run("review", () =>
                  api.updateCard(card.id, {
                    teacher_checked: false,
                    needs_check: true,
                  }),
                )
              }
            >
              {t("Reopen review")}
            </button>
          ) : (
            <button
              className="btn primary"
              disabled={!!busy || changed}
              onClick={() =>
                run("review", () =>
                  api.updateCard(card.id, { teacher_checked: true }),
                )
              }
            >
              <Icon name="check" size={16} /> {t("Looks right")}
            </button>
          )}
        </section>
      )}

      {card.problems.length > 0 && (
        <p className="error">{card.problems.join("; ")}</p>
      )}

      <div className="card-field">
        <div className="card-field-heading">
          <label htmlFor={`${fieldId}-sentence`}>{t("Sentence")}</label>
          {teacher && (
            <Say
              text={draft.sentence}
              language={language}
              label={t("the sentence")}
            />
          )}
        </div>
        <textarea
          id={`${fieldId}-sentence`}
          disabled={!!busy}
          rows={3}
          value={draft.sentence}
          onChange={(event) =>
            setDraft({ ...draft, sentence: event.target.value })
          }
        />
      </div>
      <div className="card-field">
        <div className="card-field-heading">
          <label htmlFor={`${fieldId}-translation`}>{t("Translation")}</label>
          {teacher && (
            <Say
              text={draft.translation}
              language={knownLanguage}
              label={t("the translation")}
            />
          )}
        </div>
        <textarea
          id={`${fieldId}-translation`}
          disabled={!!busy}
          rows={2}
          value={draft.translation}
          onChange={(event) =>
            setDraft({ ...draft, translation: event.target.value })
          }
        />
      </div>
      <div className="lang-row">
        <div className="card-field">
          <div className="card-field-heading">
            <label htmlFor={`${fieldId}-word`}>
              {t("The word as it appears")}
            </label>
            {teacher && (
              <Say
                text={draft.word_form}
                language={language}
                label={t("the word")}
              />
            )}
          </div>
          <input
            id={`${fieldId}-word`}
            disabled={!!busy}
            value={draft.word_form}
            onChange={(event) =>
              setDraft({ ...draft, word_form: event.target.value })
            }
          />
        </div>
        <div className="card-field">
          <div className="card-field-heading">
            <label htmlFor={`${fieldId}-meaning`}>
              {t("Its meaning here")}
            </label>
            {teacher && (
              <Say
                text={draft.word_translation}
                language={knownLanguage}
                label={t("the meaning")}
              />
            )}
          </div>
          <input
            id={`${fieldId}-meaning`}
            disabled={!!busy}
            value={draft.word_translation}
            onChange={(event) =>
              setDraft({ ...draft, word_translation: event.target.value })
            }
          />
        </div>
      </div>
      <button
        className="btn primary"
        disabled={!!busy || !changed}
        onClick={() => {
          if (Object.values(draft).some((value) => !value.trim())) {
            setError(t("The card's fields cannot be empty."));
            return;
          }
          run("save", () =>
            api.updateCard(card.id, {
              ...draft,
              ...(teacher ? { teacher_checked: true } : {}),
            }),
          );
        }}
      >
        <Icon name="edit" size={16} /> {t("Save changes")}
      </button>

      {changed && (
        <button
          className="btn"
          disabled={!!busy}
          onClick={() => {
            setDraft(fields(card));
            setError("");
          }}
        >
          {t("Discard edits")}
        </button>
      )}

      <details className="source-note">
        <summary>{t("Where the word came from")}</summary>
        <p>
          {card.text_title &&
            (card.text_exists && !teacher ? (
              <>
                <a className="link" href={`#/text/${card.text_id}`}>
                  <Icon name="link" size={13} /> {card.text_title}
                </a>
                :{" "}
              </>
            ) : (
              <>
                <strong>{card.text_title}</strong>
                {!card.text_exists && " (the text was deleted)"}:{" "}
              </>
            ))}
          “{card.source_sentence}”
        </p>
      </details>

      {!teacher && (
        <>
          <div className="divider" />
          <h3>{t("Decks")}</h3>
          <div className="chips">
            {decks.map((deck) => (
              <button
                key={deck.id}
                className={`chip ${card.deck_ids.includes(deck.id) ? "learn" : ""}`}
                disabled={!!busy || changed}
                onClick={() => toggleDeck(deck.id)}
              >
                {deck.name}
                {card.deck_ids.includes(deck.id) && (
                  <Icon name="check" size={12} />
                )}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="divider" />
      <h3>{t("New sentence")}</h3>
      <label>
        {t("What was wrong")} <span className="muted">{t("(optional)")}</span>
        <input
          disabled={!!busy}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder={t("e.g. too formal, wrong meaning, too many new words")}
        />
      </label>
      <label>
        {t("Instructions this card is written with")}
        <textarea
          disabled={!!busy}
          rows={2}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder={t("None: only your level and the words you know")}
        />
      </label>
      <div className="row-gap">
        <button
          className="btn"
          disabled={!!busy || changed}
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
          {busy === "regenerate" ? t("Writing…") : t("Rewrite now")}
        </button>
        <button
          className="btn"
          disabled={!!busy || changed}
          onClick={() =>
            run("mark", () =>
              api.updateCard(card.id, {
                needs_regeneration: !card.needs_regeneration,
              }),
            )
          }
        >
          {card.needs_regeneration ? t("Unmark") : t("Mark to rewrite later")}
        </button>
      </div>
      {!teacher && (
        <>
          <div className="more-row">
            <span>{t("Add")}</span>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              aria-label={t("How many cards")}
            >
              {[1, 2, 3].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span>
              {t("more")} {count === 1 ? t("card") : t("cards")}{" "}
              {t("for this word, each with its own sentence")}
            </span>
            <button
              className="btn"
              disabled={!!busy || changed}
              onClick={() =>
                run("more", async () => {
                  const { created } = await api.moreCards(card.id, count);
                  setMade(created.length);
                  onCreated(created);
                })
              }
            >
              <Icon name="plus" size={16} />{" "}
              {busy === "more" ? t("Writing…") : t("Add")}
            </button>
          </div>
          {made > 0 && (
            <p className="toast">
              <Icon name="check" size={16} /> {t("Added")} {made}{" "}
              {made === 1 ? t("card") : t("cards")}
            </p>
          )}

          <div className="divider" />
          <h3>{t("Ask your teacher")}</h3>
          {card.can_ask_teacher ? (
            <>
              <label>
                {t("Note for the teacher")}
                <input
                  disabled={!!busy}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t("e.g. Is this how people say it?")}
                />
              </label>
              <div className="row-gap">
                <button
                  className="btn"
                  disabled={!!busy || changed}
                  onClick={() =>
                    run("teacher", () =>
                      api.updateCard(card.id, { needs_check: true, note }),
                    )
                  }
                >
                  <Icon name="flag" size={16} />{" "}
                  {card.needs_check
                    ? t("Update the note")
                    : t("Ask the teacher to check")}
                </button>
                {card.needs_check && (
                  <button
                    className="btn"
                    disabled={!!busy || changed}
                    onClick={() =>
                      run("teacher", () =>
                        api.updateCard(card.id, {
                          needs_check: false,
                          note: "",
                        }),
                      )
                    }
                  >
                    {t("Resolved")}
                  </button>
                )}
              </div>
            </>
          ) : (
            <p className="muted small">
              {t(
                "None of this card's decks has a teacher. Share the deck with your teacher (Edit deck → Share with a teacher) to ask them about a card.",
              )}
            </p>
          )}
        </>
      )}

      <div className="divider" />
      <div className="row-gap">
        {card.status === "archived" ? (
          <button
            className="btn"
            disabled={!!busy || changed}
            onClick={() =>
              run("archive", () =>
                api.updateCard(card.id, { status: "active" }),
              )
            }
          >
            <Icon name="archive" size={16} /> {t("Bring back into study")}
          </button>
        ) : (
          <button
            className="btn"
            disabled={!!busy || changed}
            onClick={() =>
              run("archive", () =>
                api.updateCard(card.id, { status: "archived" }),
              )
            }
          >
            <Icon name="archive" size={16} /> {t("Archive")}
          </button>
        )}
        <button
          className="btn danger"
          disabled={!!busy || changed}
          onClick={() =>
            run("delete", async () => {
              if (
                !confirm(
                  t(
                    "Delete the card for “{v0}” for good? Archiving keeps it.",
                    { v0: card.word },
                  ),
                )
              )
                return;
              await api.deleteCard(card.id);
              onDeleted(card.id);
            })
          }
        >
          <Icon name="trash" size={16} /> {t("Delete for good")}
        </button>
      </div>
      <p className="muted small">
        {t(
          "Archive keeps the card and its history but stops studying it. Delete removes it for good.",
        )}
      </p>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

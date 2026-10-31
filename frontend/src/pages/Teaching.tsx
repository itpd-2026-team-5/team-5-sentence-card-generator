import { t } from "../i18n";
import { useEffect, useState } from "react";
import { api, type Card, type Language, type TaughtDeck } from "../api";
import { CardEditor } from "../components/CardEditor";
import { Drawer } from "../components/Drawer";
import { Icon } from "../components/Icon";

/** The decks students shared with the signed-in teacher. */
export function Teaching() {
  const [decks, setDecks] = useState<TaughtDeck[] | null>(null);
  useEffect(() => {
    api.teaching().then(setDecks);
  }, []);
  if (!decks) return <p className="muted">{t("Loading…")}</p>;

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">{t("Teaching")}</p>
        <h1>{t("Your students' decks")}</h1>
        <p className="muted">
          {t(
            "A student shares a deck with you by your email. You see only the decks they share, and you can correct every card in them.",
          )}
        </p>
      </header>
      {decks.length === 0 ? (
        <div className="empty glass">
          <strong>{t("No shared decks yet")}</strong>
          <span className="muted">
            {t(
              "Ask your student to open a deck, choose Edit deck, and share it with your email.",
            )}
          </span>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="deck-table">
            <thead>
              <tr>
                <th>{t("Student")}</th>
                <th>{t("Deck")}</th>
                <th className="num">{t("Cards")}</th>
                <th className="num">{t("Asked")}</th>
                <th className="num">{t("Left to check")}</th>
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
                      <span className="tag ok">{t("done")}</span>
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

/** A compact review queue; a card's full controls live in its detail panel. */
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
  const [openId, setOpenId] = useState<number | null>(null);
  const [hasDraft, setHasDraft] = useState(false);
  const [cardBusy, setCardBusy] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.all([api.teaching(), api.taughtCards(deckId)]).then(
      ([all, loaded]) => {
        if (!active) return;
        const found = all.find((item) => item.id === deckId);
        if (!found) {
          setError(t("This deck is not shared with you."));
          return;
        }
        setDeck(found);
        setCards(loaded);
      },
      (failure) => {
        if (active) setError(failure.message);
      },
    );
    return () => {
      active = false;
    };
  }, [deckId]);

  useEffect(() => {
    if (!hasDraft && !cardBusy) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [hasDraft, cardBusy]);

  if (error) return <p className="error">{error}</p>;
  if (!deck || !cards) return <p className="muted">{t("Loading…")}</p>;

  const replace = (updated: Card) =>
    setCards(
      (current) =>
        current?.map((card) => (card.id === updated.id ? updated : card)) ??
        null,
    );
  const open = cards.find((card) => card.id === openId);
  const shown = [...cards]
    .filter(
      (card) =>
        !onlyOpen ||
        card.needs_check ||
        (!card.teacher_checked_at && card.status !== "archived"),
    )
    .sort((a, b) => Number(b.needs_check) - Number(a.needs_check));
  const left = cards.filter(
    (card) =>
      (card.needs_check || !card.teacher_checked_at) &&
      card.status !== "archived",
  ).length;
  const close = () => {
    if (
      cardBusy ||
      (hasDraft && !window.confirm(t("Discard unsaved changes?")))
    )
      return;
    setOpenId(null);
    setHasDraft(false);
    document
      .querySelector<HTMLButtonElement>(`button[data-review-card="${openId}"]`)
      ?.focus();
  };

  return (
    <div className="page">
      <header className="page-head row-between">
        <div className="stack tight">
          <a className="back" href="#/teaching">
            {t("← Teaching")}
          </a>
          <h1>{deck.name}</h1>
          <p className="muted">
            {deck.student_name || deck.student} · {left} {t("of")}{" "}
            {cards.length} {t("left to check")}
          </p>
        </div>
        <label className="switch">
          <input
            type="checkbox"
            checked={onlyOpen}
            onChange={(event) => setOnlyOpen(event.target.checked)}
          />
          {t("Only cards left to check")}
        </label>
      </header>
      <p className="muted">
        {t(
          "Open a card to listen, edit, or review it. Requests from the student appear first.",
        )}
      </p>
      <div className="teacher-cards-wrap">
        <table className="teacher-cards">
          <thead>
            <tr>
              <th>{t("Word and meaning")}</th>
              <th>{t("Review")}</th>
              <th>
                <span className="sr-only">{t("Card details")}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {shown.map((card) => (
              <tr
                key={card.id}
                className={card.needs_check ? "has-request" : ""}
                onClick={() => setOpenId(card.id)}
              >
                <td>
                  <strong className="teacher-word">
                    {card.word_form || card.word}
                  </strong>
                  <span className="teacher-meaning muted">
                    {card.word_translation || "—"}
                  </span>
                </td>
                <td>
                  <span
                    className={`tag ${card.needs_check ? "teacher" : card.teacher_checked_at ? "ok" : ""}`}
                  >
                    {card.needs_check
                      ? t("Asked to check")
                      : card.teacher_checked_at
                        ? t("Checked")
                        : t("To check")}
                  </span>
                  {card.status === "archived" && (
                    <span className="teacher-card-extra muted small">
                      {t("Archived")}
                    </span>
                  )}
                  {card.status === "flagged" && (
                    <span className="teacher-card-extra error small">
                      {t("Failed a check")}
                    </span>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn small teacher-card-open"
                    data-review-card={card.id}
                    aria-label={t("Open card: {v0}, {v1}", {
                      v0: card.word,
                      v1: card.word_translation,
                    })}
                    onClick={(event) => {
                      event.stopPropagation();
                      setOpenId(card.id);
                    }}
                  >
                    <span className="teacher-open-label">{t("Open card")}</span>
                    <Icon name="edit" size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {shown.length === 0 && (
          <p className="muted pad">{t("Nothing to check here.")}</p>
        )}
      </div>
      {open && (
        <Drawer title={open.word_form || open.word} onClose={close}>
          <CardEditor
            key={open.id}
            card={open}
            decks={[]}
            language={deck.target_language ?? language}
            knownLanguage={deck.known_language ?? "en"}
            teacher
            onDirtyChange={setHasDraft}
            onBusyChange={setCardBusy}
            onSaved={replace}
            onCreated={() => {}}
            onDeleted={(id) => {
              setCards(
                (current) => current?.filter((card) => card.id !== id) ?? null,
              );
              setOpenId(null);
              setHasDraft(false);
            }}
          />
        </Drawer>
      )}
    </div>
  );
}

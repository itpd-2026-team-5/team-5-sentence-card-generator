import { t } from "../i18n";
import { useEffect, useState } from "react";
import { api, type Deck, type Study } from "../api";
import { Icon } from "../components/Icon";
import { Progress } from "../components/Progress";

function greeting() {
  const hour = new Date().getHours();
  return hour < 5
    ? "Late night"
    : hour < 12
      ? "Good morning"
      : hour < 18
        ? "Good afternoon"
        : "Good evening";
}

function when(iso: string) {
  const minutes = Math.round((new Date(iso).getTime() - Date.now()) / 60000);
  if (minutes < 1) return t("in a moment");
  if (minutes < 60) return t("in {v0} min", { v0: minutes });
  if (minutes < 1440) return t("in {v0} h", { v0: Math.round(minutes / 60) });
  return t("on {v0}", {
    v0: new Date(iso).toLocaleDateString(document.documentElement.lang),
  });
}

/** Today: choose the decks to study, as in Anki, then start one session over them. */
export function Home() {
  const [decks, setDecks] = useState<Deck[] | null>(null);
  const [chosen, setChosen] = useState<number[]>([]);
  const [study, setStudy] = useState<Study | null>(null);

  useEffect(() => {
    Promise.all([api.decks(), api.profile()]).then(([all, profile]) => {
      setDecks(all);
      // The learner's last choice is saved with their account; before they ever choose,
      // start with every deck that has something to study.
      const saved = (profile.study_deck_ids ?? []).filter((id) =>
        all.some((d) => d.id === id),
      );
      setChosen(
        saved.length
          ? saved
          : all.filter((d) => d.due + d.new > 0).map((d) => d.id),
      );
    });
  }, []);

  useEffect(() => {
    if (decks) api.study(chosen).then(setStudy);
  }, [decks, chosen]);

  if (!decks) return <p className="muted">{t("Loading…")}</p>;

  const toggle = (id: number) => {
    const next = chosen.includes(id)
      ? chosen.filter((d) => d !== id)
      : [...chosen, id];
    setChosen(next);
    api.saveStudyDecks(next);
  };

  // New cards come in the order of the decks, so moving a deck up studies it first.
  const move = (index: number, by: number) => {
    const next = [...decks];
    const [deck] = next.splice(index, 1);
    next.splice(index + by, 0, deck);
    setDecks(next);
    api.reorderDecks(next.map((d) => d.id));
  };

  const left = study ? study.new + study.review + study.again : 0;
  const names = decks.filter((d) => chosen.includes(d.id)).map((d) => d.name);

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">
          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
        <h1>{t(greeting())}.</h1>
      </header>

      <section className="glass block stack">
        <h3>{t("Today in the decks you ticked")}</h3>
        {chosen.length === 0 ? (
          <p className="muted">
            {t("Tick at least one deck below to study it.")}
          </p>
        ) : left > 0 ? (
          <a
            className="btn primary start"
            href={`#/study?decks=${chosen.join(",")}`}
          >
            <Icon name="play" size={16} /> {t("Study")}{" "}
            {names.length === 1 ? names[0] : `${names.length} decks`} · {left}{" "}
            {left === 1 ? t("card") : t("cards")}
          </a>
        ) : (
          <p className="muted">
            {study?.next_due
              ? t(
                  "Nothing to study in these decks now. The next card returns {v0}.",
                  { v0: when(study.next_due) },
                )
              : t(
                  "No cards to study in these decks yet. Add a text and pick words to make some.",
                )}
          </p>
        )}
        {study && chosen.length > 0 && (
          <Progress
            newDone={study.new_done}
            newLeft={study.new}
            reviewsDone={study.reviews_done}
            reviewsLeft={study.review + study.again}
          />
        )}
      </section>

      <section className="glass block stack">
        <div className="row-between">
          <h3>{t("Your decks")}</h3>
          <span className="muted small">
            <span className="count new">{t("new")}</span> {t("never studied ·")}{" "}
            <span className="count due">{t("review")}</span> {t("due again")}
          </span>
        </div>
        <p className="muted small">
          {t(
            "Tick the decks to study together. New cards come in the order of this list; use the arrows to study a deck first.",
          )}
        </p>
        <ul className="deck-picks scroll-list">
          {decks.map((deck, index) => (
            <li key={deck.id} className="pick-row">
              <label className={`pick ${chosen.includes(deck.id) ? "on" : ""}`}>
                <input
                  type="checkbox"
                  checked={chosen.includes(deck.id)}
                  onChange={() => toggle(deck.id)}
                />
                <span className="pick-name">{deck.name}</span>
                <span className="pick-counts">
                  <span className="count new" title={t("Never studied")}>
                    {deck.new} {t("new")}
                  </span>
                  <span className="count due" title={t("Due for review")}>
                    {deck.due} {t("to review")}
                  </span>
                </span>
              </label>
              <span className="order-buttons">
                <button
                  className="ghost icon-btn"
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                  aria-label={t("Move {v0} up", { v0: deck.name })}
                  title={t("Study earlier")}
                >
                  <Icon name="up" size={16} />
                </button>
                <button
                  className="ghost icon-btn"
                  disabled={index === decks.length - 1}
                  onClick={() => move(index, 1)}
                  aria-label={t("Move {v0} down", { v0: deck.name })}
                  title={t("Study later")}
                >
                  <Icon name="down" size={16} />
                </button>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {decks.every((d) => d.cards === 0) && (
        <a className="empty glass" href="#/texts">
          <strong>{t("Make your first cards")}</strong>
          <span className="muted">
            {t(
              "Add a text, mark the words you want to learn, and generate cards into a deck.",
            )}
          </span>
        </a>
      )}
    </div>
  );
}

import { useCallback, useEffect, useState } from "react";
import {
  api,
  local,
  speak,
  type Deck,
  type Language,
  type Rating,
  type Study as StudyData,
} from "../api";
import { Icon } from "../components/Icon";
import { Say } from "../components/Say";

const RATINGS: { rating: Rating; label: string; key: string }[] = [
  { rating: "again", label: "Again", key: "1" },
  { rating: "hard", label: "Hard", key: "2" },
  { rating: "good", label: "Good", key: "3" },
  { rating: "easy", label: "Easy", key: "4" },
];

function when(iso: string) {
  const minutes = Math.round((new Date(iso).getTime() - Date.now()) / 60000);
  if (minutes < 1) return "in a moment";
  if (minutes < 60) return `in ${minutes} min`;
  if (minutes < 1440) return `in ${Math.round(minutes / 60)} h`;
  return `on ${new Date(iso).toLocaleDateString()}`;
}

/** A study session over the chosen decks. The sentence stays where it is: revealing the
 *  answer adds the word's meaning above it and the translation below it, as on an Anki card. */
export function Study({
  deckIds,
  language,
  onExit,
}: {
  deckIds: number[];
  language: Language;
  onExit: () => void;
}) {
  const [study, setStudy] = useState<StudyData | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [tooHard, setTooHard] = useState(false);
  const [autoplay, setAutoplay] = useState(
    local.get("autoplay", "on") === "on",
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const decks = deckIds.join(",");
  const [deckList, setDeckList] = useState<Deck[]>([]);
  const [note, setNote] = useState("");
  const noAudio = () =>
    setNote(
      "This browser cannot read the sentence aloud, so read it on the card.",
    );
  useEffect(() => {
    api
      .decks()
      .then(setDeckList)
      .catch(() => {});
  }, []);

  const load = useCallback(async () => {
    try {
      setStudy(await api.study(decks ? decks.split(",").map(Number) : []));
      setRevealed(false);
      setTooHard(false);
      setNote("");
    } catch (e) {
      setError((e as Error).message);
    }
  }, [decks]);
  useEffect(() => {
    load();
  }, [load]);

  // Each card is read in its own deck's language; a learner may study several languages.
  const cardDeck = deckList.find((d) => study?.card?.deck_ids.includes(d.id));
  const cardLanguage = (cardDeck?.target_language ?? language) as Language;
  const knownLanguage = (cardDeck?.known_language ?? "en") as Language;

  // Read each new card aloud as it appears, for learners who review on the go.
  const cardId = study?.card?.id;
  useEffect(() => {
    if (autoplay && study?.card)
      speak(study.card.sentence, cardLanguage, noAudio);
  }, [cardId]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleAutoplay = () => {
    local.set("autoplay", autoplay ? "off" : "on");
    if (autoplay) speechSynthesis.cancel();
    setAutoplay(!autoplay);
  };

  const rate = useCallback(
    async (rating: Rating) => {
      if (!study?.card || busy) return;
      setBusy(true);
      try {
        await api.review(study.card.id, rating, tooHard);
        await load();
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setBusy(false);
      }
    },
    [study, busy, tooHard, load],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") return onExit();
      if (!study?.card) return;
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        setRevealed(true);
      } else if (revealed) {
        const match = RATINGS.find((r) => r.key === event.key);
        if (match) rate(match.rating);
        if (event.key.toLowerCase() === "t") setTooHard((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [study, revealed, rate, onExit]);

  if (!study)
    return (
      <div className="focus">
        <p className="muted">{error || "Loading…"}</p>
      </div>
    );

  const card = study.card;
  const done = study.new_done + study.reviews_done;
  const total = done + study.new + study.review + study.again;

  // Fix a bad sentence where it was found: rewrite it now, or mark it for the next batch.
  const rewrite = async () => {
    if (!card || busy) return;
    setBusy(true);
    setError("");
    try {
      const fresh = await api.regenerateCard(card.id, "Found while studying.");
      setStudy({ ...study, card: fresh });
      setNote("Rewritten. Here is the new sentence.");
      setRevealed(false);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  const markForLater = async () => {
    if (!card) return;
    const updated = await api.updateCard(card.id, {
      needs_regeneration: !card.needs_regeneration,
    });
    setStudy({ ...study, card: updated });
    setNote(
      updated.needs_regeneration
        ? "Marked: it will be rewritten with the deck’s other marked cards."
        : "",
    );
  };

  return (
    <div className="focus">
      <header className="focus-bar">
        <button
          className="ghost icon-btn"
          onClick={onExit}
          aria-label="Leave session"
        >
          <Icon name="close" />
        </button>
        <div className="progress" aria-label={`${done} of ${total} done today`}>
          <span style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
        </div>
        <span
          className="counts-line small"
          aria-label={`${study.new} new, ${study.review} to review, ${study.again} to see again`}
        >
          <span className="count new" title="New cards">
            {study.new}
          </span>
          <span className="count due" title="Reviews from earlier days">
            {study.review}
          </span>
          <span className="count again" title="To see again today">
            {study.again}
          </span>
        </span>
        <button
          className={`ghost icon-btn ${autoplay ? "" : "muted-off"}`}
          onClick={toggleAutoplay}
          aria-pressed={autoplay}
          title={autoplay ? "Sentences play aloud" : "Sentences are silent"}
          aria-label="Play sentences aloud"
        >
          <Icon name={autoplay ? "sound" : "mute"} />
        </button>
      </header>

      {!card ? (
        <div className="focus-done">
          <div className="burst">
            <Icon name="check" size={40} />
          </div>
          <h1>{done > 0 ? "Session complete" : "Nothing to study"}</h1>
          <p className="muted">
            {done > 0
              ? `You studied ${done} card${done === 1 ? "" : "s"} today. `
              : ""}
            {study.next_due
              ? `The next card returns ${when(study.next_due)}.`
              : "Generate cards into these decks to begin."}
          </p>
          <div className="row-gap center">
            <button className="btn" onClick={load}>
              Check again
            </button>
            <button className="btn primary" onClick={onExit}>
              Back to Today
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="stage-card">
            <div
              className={`study-card ${revealed ? "revealed" : ""}`}
              role="button"
              tabIndex={0}
              onClick={() => setRevealed(true)}
              aria-label={revealed ? "Card" : "Show the answer"}
            >
              <span className="kind">{study.is_new ? "New" : "Review"}</span>
              <p className="card-word">
                <span>
                  {card.word}
                  <Say
                    text={card.word_form || card.word}
                    language={cardLanguage}
                    label="the word"
                    onFail={noAudio}
                  />
                </span>
                {revealed && (
                  <span className="card-word-meaning">
                    {card.word_translation}
                    <Say
                      text={card.word_translation}
                      language={knownLanguage}
                      label="the word's translation"
                      onFail={noAudio}
                    />
                  </span>
                )}
              </p>
              <p className="card-sentence">
                {highlight(
                  card.sentence,
                  [card.highlight, card.word_form],
                  cardLanguage,
                )}
                <Say
                  text={card.sentence}
                  language={cardLanguage}
                  label="the sentence"
                  onFail={noAudio}
                />
              </p>
              <p className="card-translation">
                {revealed && (
                  <>
                    {card.translation}
                    <Say
                      text={card.translation}
                      language={knownLanguage}
                      label="the translation"
                      onFail={noAudio}
                    />
                  </>
                )}
              </p>
              {revealed ? (
                <details
                  className="source-note"
                  onClick={(e) => e.stopPropagation()}
                >
                  <summary>Where the word came from</summary>
                  <p>
                    {card.text_title ? (
                      card.text_exists ? (
                        <>
                          <a
                            className="link"
                            href={`#/text/${card.text_id}`}
                            onClick={onExit}
                          >
                            {card.text_title}
                          </a>
                          :{" "}
                        </>
                      ) : (
                        <>
                          <strong>{card.text_title}</strong>:{" "}
                        </>
                      )
                    ) : null}
                    {card.source_sentence}
                  </p>
                </details>
              ) : (
                <span className="hint">
                  Tap to show the answer
                  <span className="key-hint">
                    {" "}
                    or press <kbd>Space</kbd>
                  </span>
                </span>
              )}
            </div>
          </div>

          {note && <p className="toast center-text">{note}</p>}
          <footer className={`focus-actions ${revealed ? "show" : ""}`}>
            <div className="row-gap center">
              <button className="flag" onClick={rewrite} disabled={busy}>
                <Icon name="sparkle" size={16} />{" "}
                {busy ? "Rewriting…" : "Rewrite this sentence"}
              </button>
              <button
                className={`flag ${card.needs_regeneration ? "on" : ""}`}
                onClick={markForLater}
                aria-pressed={card.needs_regeneration}
              >
                <Icon name="refresh" size={16} /> Rewrite later
              </button>
            </div>
            <button
              className={`flag ${tooHard ? "on" : ""}`}
              onClick={() => setTooHard(!tooHard)}
              aria-pressed={tooHard}
            >
              <Icon name="flag" size={16} /> Too hard <kbd>T</kbd>
            </button>
            <div className="rate-row">
              {RATINGS.map(({ rating, label, key }) => (
                <button
                  key={rating}
                  className={`rate ${rating}`}
                  disabled={busy || !revealed}
                  onClick={() => rate(rating)}
                >
                  <strong>{label}</strong>
                  <small>in {study.intervals?.[rating]}</small>
                  <kbd>{key}</kbd>
                </button>
              ))}
            </div>
          </footer>
        </>
      )}
      {error && <p className="error center-text">{error}</p>}
    </div>
  );
}

// German nouns are learned with their article, so the article right before the word is
// highlighted too when the model did not include it.
const GERMAN_ARTICLE =
  /(?:^|\s)((?:der|die|das|den|dem|des|ein|eine|einen|einem|einer|eines)\s+)$/i;

function highlight(sentence: string, spans: string[], language: Language) {
  // The model's span (the word with its article), or failing that the word form itself.
  const span = spans.find(
    (s) => s && sentence.toLowerCase().includes(s.toLowerCase()),
  );
  if (!span) return sentence;
  let start = sentence.toLowerCase().indexOf(span.toLowerCase());
  const end = start + span.length;
  if (language === "de") {
    const article = sentence.slice(0, start).match(GERMAN_ARTICLE);
    if (article) start -= article[1].length;
  }
  return (
    <>
      {sentence.slice(0, start)}
      <mark>{sentence.slice(start, end)}</mark>
      {sentence.slice(end)}
    </>
  );
}

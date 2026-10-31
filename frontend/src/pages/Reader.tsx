import { t } from "../i18n";
import { useEffect, useRef, useState } from "react";
import {
  api,
  LANGUAGES,
  languageName,
  local,
  type Card,
  type Deck,
  type Mark,
  type TextDetail,
  type WordMark,
} from "../api";
import { CardEditor } from "../components/CardEditor";
import { Drawer } from "../components/Drawer";
import { Icon } from "../components/Icon";
import { TextForm } from "../components/TextForm";

export function Reader({ textId }: { textId: number }) {
  const [text, setText] = useState<TextDetail | null>(null);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [deckId, setDeckId] = useState<number | null>(null);
  const [withCard, setWithCard] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<string | null>(null);
  const [onlyMarked, setOnlyMarked] = useState(false);
  const [query, setQuery] = useState("");
  const [found, setFound] = useState<string[] | null>(null);
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [made, setMade] = useState<{
    cards: Card[];
    deck: Deck;
    warning: string;
  } | null>(null);
  const [open, setOpen] = useState<Card | null>(null);
  const [error, setError] = useState("");
  const glossTimer = useRef<number | undefined>(undefined);

  // A mark has its card when a card came from the same word in the same sentence.
  const loadCards = () =>
    api
      .cards({ textId })
      .then((cards) =>
        setWithCard(
          new Set(cards.map((c) => markKey(c.word, c.source_sentence))),
        ),
      );
  useEffect(() => {
    Promise.all([api.text(textId), api.decks()]).then(
      ([detail, all]) => {
        setText(detail);
        setDecks(all);
        const last = Number(local.get("generate-deck", "0"));
        const matching = all.filter(
          (deck) => deck.target_language === detail.language,
        );
        setDeckId(
          matching.some((deck) => deck.id === last)
            ? last
            : (matching[0]?.id ?? null),
        );
      },
      (error) => setError(error.message),
    );
    loadCards();
  }, [textId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Close the word menu on a click anywhere else.
  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".w-wrap")) setActive(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  if (!text) return <p className="muted">{error || t("Loading…")}</p>;

  // The same rules as the server: a learned word is marked per sentence, an ignored word for the whole text.
  const choose = async (
    word: string,
    sentence: string,
    status: Mark | "none",
  ) => {
    const same = (m: WordMark) => m.word.toLowerCase() === word.toLowerCase();
    let marks = text.marks;
    if (status === "learn") {
      marks = marks.filter((m) => !(same(m) && m.status === "ignore"));
      if (!marks.some((m) => same(m) && m.sentence === sentence))
        marks = [...marks, { word, sentence, status, gloss: "", decks: [] }];
    } else if (status === "ignore") {
      marks = [
        ...marks.filter((m) => !same(m)),
        { word, sentence, status, gloss: "", decks: [] },
      ];
    } else {
      marks = marks.filter(
        (m) => !(same(m) && (m.status === "ignore" || m.sentence === sentence)),
      );
    }
    setText({ ...text, marks });
    setActive(null);
    await api.mark(textId, word, sentence, status);
    // Look up what each new word means in its sentence, once the learner pauses.
    if (status === "learn") {
      window.clearTimeout(glossTimer.current);
      glossTimer.current = window.setTimeout(() => {
        api.gloss(textId).then(
          (detail) =>
            setText(
              (current) => current && { ...current, marks: detail.marks },
            ),
          () => {},
        );
      }, 1200);
    }
  };

  const find = async (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) setFound(await api.find(textId, query.trim()));
  };

  const pickDeck = async (value: string) => {
    if (value !== "new") {
      setDeckId(Number(value));
      local.set("generate-deck", value);
      return;
    }
    const name = prompt(t("Name of the new deck"));
    if (!name?.trim()) return;
    const deck = await api.createDeck({
      name: name.trim(),
      target_language: text.language,
    });
    setDecks([...decks, deck]);
    setDeckId(deck.id);
    local.set("generate-deck", String(deck.id));
  };

  const generate = async () => {
    if (deckId === null) return;
    setBusy(true);
    setError("");
    setMade(null);
    try {
      const { created, warning } = await api.generate(textId, deckId);
      await loadCards();
      setText(await api.text(textId));
      setMade({
        cards: created,
        deck: decks.find((d) => d.id === deckId)!,
        warning,
      });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const learn = text.marks.filter((m) => m.status === "learn");
  const ignore = text.marks.filter((m) => m.status === "ignore");
  const pending = learn.filter(
    (m) => !withCard.has(markKey(m.word, m.sentence)),
  ).length;
  const learnedHere = new Set(learn.map((m) => markKey(m.word, m.sentence)));
  const learnedWords = new Set(learn.map((m) => m.word.toLowerCase()));
  const ignored = new Set(ignore.map((m) => m.word.toLowerCase()));
  const markOf = (word: string, sentence: string) => {
    const key = word.toLowerCase();
    if (learnedHere.has(markKey(word, sentence))) return "learn";
    if (ignored.has(key)) return "ignore";
    return learnedWords.has(key) ? "learn-elsewhere" : "";
  };
  const sentences = text.sentences
    .map((sentence, i) => ({ sentence, i }))
    .filter(
      ({ sentence }) =>
        !onlyMarked || sentence.words.some((w) => markOf(w, sentence.text)),
    );
  const deck = decks.find((d) => d.id === deckId);

  return (
    <div className="reader-layout">
      <article className="paper">
        <div className="row-between">
          <a className="back" href="#/texts">
            {t("← Texts")}
          </a>
          <button className="btn small" onClick={() => setEditing(true)}>
            <Icon name="edit" size={14} /> {t("Edit text")}
          </button>
        </div>
        <h1>{text.title}</h1>
        <p className="muted small">
          {t("Text language")}: {t(languageName(text.language))}
        </p>
        {(text.source_url || text.notes) && (
          <p className="muted small">
            {text.source_url && (
              <a
                className="link"
                href={text.source_url}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="link" size={13} />{" "}
                {new URL(text.source_url).hostname}
              </a>
            )}
            {text.source_url && text.notes && " · "}
            {text.notes}
          </p>
        )}

        <form className="finder" onSubmit={find}>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setFound(null);
            }}
            placeholder={t("Type a word to find its sentences")}
            aria-label={t("Find a word")}
          />
          <button className="btn" type="submit">
            {t("Find")}
          </button>
        </form>
        {found && (
          <div className="found glass">
            {found.length === 0 ? (
              <p className="muted small">
                “{query}
                {t("” is not in this text.")}
              </p>
            ) : (
              <>
                <p className="muted small">
                  {t(
                    "Pick the sentence that has the meaning you want to learn:",
                  )}
                </p>
                {found.map((sentence) => {
                  const word =
                    text.sentences
                      .find((s) => s.text === sentence)
                      ?.words.find((w) =>
                        w.toLowerCase().startsWith(query.trim().toLowerCase()),
                      ) ?? query.trim();
                  return (
                    <div key={sentence} className="found-row">
                      <p className="serif">{sentence}</p>
                      <button
                        className="btn small"
                        onClick={() => {
                          choose(word, sentence, "learn");
                          setFound(null);
                          setQuery("");
                        }}
                      >
                        {t("Learn “")}
                        {word}
                        {t("” here")}
                      </button>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}

        <div className="row-between reader-tools">
          <p className="muted small">
            {t(
              "Or click a word to learn it or ignore it. Words you leave alone count as words you know. A word with two meanings can be learned in each of its sentences.",
            )}
          </p>
          <label className="switch">
            <input
              type="checkbox"
              checked={onlyMarked}
              onChange={(e) => setOnlyMarked(e.target.checked)}
            />{" "}
            {t("Only sentences with marked words")}
          </label>
        </div>
        <div className="prose">
          {sentences.map(({ sentence, i }) => (
            <p key={i}>
              {sentence.tokens.map((token, j) => {
                if (!token.word) return <span key={j}>{token.text}</span>;
                const word = token.text;
                const mark = markOf(word, sentence.text);
                const id = `${i}:${j}`;
                return (
                  <span key={j} className="w-wrap">
                    <button
                      className={`w ${mark ?? ""} ${active === id ? "open" : ""}`}
                      onClick={() => setActive(active === id ? null : id)}
                    >
                      {word}
                    </button>
                    {active === id && (
                      <span className="pop" role="menu">
                        <button
                          role="menuitem"
                          className="learn"
                          onClick={() => choose(word, sentence.text, "learn")}
                        >
                          {mark === "learn-elsewhere"
                            ? t("Learn in this meaning too")
                            : t("Learn")}
                        </button>
                        <button
                          role="menuitem"
                          onClick={() => choose(word, sentence.text, "ignore")}
                        >
                          {t("Ignore")}
                        </button>
                        {(mark === "learn" || mark === "ignore") && (
                          <button
                            role="menuitem"
                            onClick={() => choose(word, sentence.text, "none")}
                          >
                            {t("Clear")}
                          </button>
                        )}
                      </span>
                    )}
                  </span>
                );
              })}
            </p>
          ))}
          {sentences.length === 0 && (
            <p className="muted small">
              {t("No sentence has a marked word yet.")}
            </p>
          )}
        </div>
      </article>

      <aside className="tray glass">
        <h3>{t("Word tray")}</h3>
        <div className="chips-block">
          <p className="label">
            {t("To learn")} <span>{learn.length}</span>
          </p>
          <div className="chips">
            {learn.length === 0 && (
              <span className="muted small">{t("Nothing picked yet.")}</span>
            )}
            {learn.map((m) => {
              const done = withCard.has(markKey(m.word, m.sentence));
              return (
                <button
                  key={markKey(m.word, m.sentence)}
                  className={`chip learn ${done ? "done" : ""}`}
                  title={`${m.sentence}${m.decks.length ? `\nAlready in: ${m.decks.join(", ")}` : ""}\n${done ? t("Has a card from this sentence") : t("Click to remove")}`}
                  onClick={() => choose(m.word, m.sentence, "none")}
                >
                  <span>
                    {m.word}
                    {m.gloss && (
                      <span className="chip-gloss"> · {m.gloss}</span>
                    )}
                  </span>
                  {m.decks.length > 0 && (
                    <span className="chip-decks">
                      {t("in")}{" "}
                      {m.decks.length === 1
                        ? m.decks[0]
                        : `${m.decks.length} decks`}
                    </span>
                  )}
                  {done ? (
                    <Icon name="check" size={12} />
                  ) : (
                    <Icon name="close" size={12} />
                  )}
                </button>
              );
            })}
          </div>
          {learn.some((m) => m.decks.length > 0) && (
            <p className="muted small">
              {t(
                "“in …” names the decks that already have a card for the word.",
              )}
            </p>
          )}
        </div>
        {ignore.length > 0 && (
          <div className="chips-block">
            <p className="label">
              {t("Ignored")} <span>{ignore.length}</span>
            </p>
            <div className="chips">
              {ignore.map((m) => (
                <button
                  key={m.word}
                  className="chip ignore"
                  title={t("Remove")}
                  onClick={() => choose(m.word, m.sentence, "none")}
                >
                  {m.word}
                  <Icon name="close" size={12} />
                </button>
              ))}
            </div>
          </div>
        )}
        <label>
          {t("Generate into")}
          <select
            value={deckId ?? ""}
            onChange={(e) => pickDeck(e.target.value)}
          >
            <option value="" disabled>
              {t("Choose a deck")}
            </option>
            {decks
              .filter((d) => d.target_language === text.language)
              .map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}: {t(LANGUAGES[d.target_language])} {t("from")}{" "}
                  {t(LANGUAGES[d.known_language])}
                </option>
              ))}
            <option value="new">{t("+ New deck…")}</option>
          </select>
        </label>
        {deck && (
          <p className="muted small">
            {t("Sentences in")} {t(LANGUAGES[deck.target_language])}
            {t(", translated into")} {t(LANGUAGES[deck.known_language])}
            {t(", at level")} {deck.effective_level}.
          </p>
        )}
        <button
          className="btn primary wide"
          disabled={busy || pending === 0 || deckId === null}
          onClick={generate}
        >
          {busy
            ? t("Writing sentences…")
            : pending === 0
              ? t("No new words to generate")
              : t("Generate {v0} card{v1}", {
                  v0: pending,
                  v1: pending === 1 ? "" : "s",
                })}
        </button>
        {made && (
          <div className="made">
            <a className="toast" href={`#/deck/${made.deck.id}`}>
              <Icon name="check" size={16} /> {made.cards.length}{" "}
              {made.cards.length === 1 ? t("card") : t("cards")} {t("added to")}{" "}
              {made.deck.name} →
            </a>
            {made.warning && <p className="warn-note">{made.warning}</p>}
            {made.cards.length > 0 && (
              <>
                <p className="label">
                  {t("Just made")} <span>{t("click one to change it")}</span>
                </p>
                <ul className="made-list">
                  {made.cards.map((card) => (
                    <li key={card.id}>
                      <button
                        className={`made-card ${card.status === "flagged" ? "flagged" : ""}`}
                        onClick={() => setOpen(card)}
                      >
                        <strong>{card.word_form}</strong>{" "}
                        {card.word_translation}
                        <span className="serif">{card.sentence}</span>
                        <span className="muted small">{card.translation}</span>
                        {card.status === "flagged" && (
                          <span className="tag warn">
                            {t("failed a check")}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </aside>

      {open && made && (
        <Drawer title={open.word_form} onClose={() => setOpen(null)}>
          <CardEditor
            key={open.id}
            card={open}
            decks={decks}
            language={made.deck.target_language}
            onSaved={(card) => {
              setOpen(card);
              setMade({
                ...made,
                cards: made.cards.map((c) => (c.id === card.id ? card : c)),
              });
            }}
            onCreated={(cards) =>
              setMade({ ...made, cards: [...made.cards, ...cards] })
            }
            onDeleted={(id) => {
              setOpen(null);
              setMade({
                ...made,
                cards: made.cards.filter((c) => c.id !== id),
              });
              loadCards();
            }}
          />
        </Drawer>
      )}

      {editing && (
        <Drawer title={t("Edit text")} onClose={() => setEditing(false)}>
          <TextForm
            initial={{
              language: text.language,
              title: text.title,
              body: text.body,
              source_url: text.source_url,
              notes: text.notes,
            }}
            submit={t("Save text")}
            onSave={async (fields) => {
              const updated = await api.updateText(text.id, fields);
              setText(updated);
              if (
                decks.find((deck) => deck.id === deckId)?.target_language !==
                updated.language
              ) {
                setDeckId(
                  decks.find(
                    (deck) => deck.target_language === updated.language,
                  )?.id ?? null,
                );
              }
              setEditing(false);
            }}
          />
        </Drawer>
      )}
    </div>
  );
}

function markKey(word: string, sentence: string) {
  return `${word.toLowerCase()}|${sentence}`;
}

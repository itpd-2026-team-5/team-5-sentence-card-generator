import { useEffect, useState } from "react";
import {
  api,
  LANGUAGES,
  speak,
  type Card,
  type Deck,
  type Language,
  type Profile,
  type Share,
} from "../api";
import { CardEditor } from "../components/CardEditor";
import { Drawer } from "../components/Drawer";
import { Icon } from "../components/Icon";
import { useDragReorder } from "../hooks";
import { DeckForm } from "./Decks";

const FILTERS = [
  { key: "study", label: "In study" },
  { key: "rewrite", label: "To rewrite" },
  { key: "teacher", label: "For the teacher" },
  { key: "flagged", label: "Failed a check" },
  { key: "archived", label: "Archived" },
];

const matches = (card: Card, filter: string) =>
  filter === "study"
    ? card.status !== "archived"
    : filter === "rewrite"
      ? card.needs_regeneration
      : filter === "teacher"
        ? card.needs_check
        : card.status === filter;

export function DeckPage({
  deckId,
}: {
  deckId: number;
  language: Language;
  known: Language;
}) {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [filter, setFilter] = useState("study");
  const [openId, setOpenId] = useState<number | null>(null);
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");

  const loadDecks = () =>
    api.decks().then((all) => {
      setDecks(all);
      setDeck(all.find((d) => d.id === deckId) ?? null);
      if (!all.some((d) => d.id === deckId)) setError("Deck not found");
    });
  const loadCards = () => api.cards({ deckId }).then(setCards);
  useEffect(() => {
    loadDecks();
    loadCards();
    api.profile().then(setProfile);
  }, [deckId]); // eslint-disable-line react-hooks/exhaustive-deps

  const drag = useDragReorder(cards, setCards, api.reorderCards);
  if (!deck || !profile) return <p className="muted">{error || "Loading…"}</p>;

  const language = deck.target_language;
  const shown = cards.filter((c) => matches(c, filter));
  const marked = cards.filter((c) => c.needs_regeneration).length;
  const open = cards.find((c) => c.id === openId) ?? null;
  const replace = (card: Card) => {
    // A card taken out of this deck leaves the list.
    setCards((now) =>
      card.deck_ids.includes(deckId)
        ? now.map((c) => (c.id === card.id ? card : c))
        : now.filter((c) => c.id !== card.id),
    );
    loadDecks();
  };

  const quick =
    (card: Card, changes: Parameters<typeof api.updateCard>[1]) =>
    async (event: React.MouseEvent) => {
      event.stopPropagation();
      replace(await api.updateCard(card.id, changes));
    };

  const rewriteNow = (card: Card) => async (event: React.MouseEvent) => {
    event.stopPropagation();
    setBusy(`card-${card.id}`);
    setError("");
    try {
      replace(await api.regenerateCard(card.id, ""));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy("");
    }
  };

  const rewriteMarked = async () => {
    setBusy("batch");
    setError("");
    try {
      // The server rewrites a batch at a time; keep going until none is left.
      for (;;) {
        const { regenerated, remaining } = await api.regenerateMarked(deck.id);
        regenerated.forEach(replace);
        if (!remaining || !regenerated.length) break;
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy("");
      loadCards();
      loadDecks();
    }
  };

  const remove = async () => {
    if (
      !confirm(
        `Delete the deck “${deck.name}”? Cards that are in no other deck are deleted with it.`,
      )
    )
      return;
    try {
      await api.deleteDeck(deck.id);
      location.hash = "/decks";
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="page">
      <header className="page-head row-between">
        <div className="stack tight">
          <a className="back" href="#/decks">
            ← Decks
          </a>
          <h1>{deck.name}</h1>
          {deck.description && <p>{deck.description}</p>}
          <p className="muted small">
            {LANGUAGES[deck.target_language]} from{" "}
            {LANGUAGES[deck.known_language]} · level {deck.effective_level} ·{" "}
            {deck.new_per_day} new and {deck.reviews_per_day} reviews a day
            {deck.teachers.length > 0 &&
              ` · shared with ${deck.teachers.join(", ")}`}
          </p>
        </div>
        <div className="row-gap">
          <button className="btn" onClick={() => setEditing(true)}>
            <Icon name="edit" size={16} /> Edit deck
          </button>
          <a
            className={`btn primary ${deck.due + deck.new === 0 ? "disabled" : ""}`}
            href={`#/study?decks=${deck.id}`}
          >
            <Icon name="play" size={16} /> Study · {deck.due + deck.new}
          </a>
        </div>
      </header>
      {error && <p className="error">{error}</p>}

      <div className="row-between">
        <div className="segmented small-seg">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={filter === f.key ? "on" : ""}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
              {f.key === "rewrite" && marked ? ` · ${marked}` : ""}
              {f.key === "archived" && deck.archived
                ? ` · ${deck.archived}`
                : ""}
            </button>
          ))}
        </div>
        {marked > 0 && (
          <button className="btn" disabled={!!busy} onClick={rewriteMarked}>
            <Icon name="refresh" size={16} />{" "}
            {busy === "batch"
              ? "Rewriting…"
              : `Rewrite ${marked} marked ${marked === 1 ? "card" : "cards"}`}
          </button>
        )}
      </div>
      {filter === "study" && cards.length > 1 && (
        <span className="muted small drag-hint">
          Drag a card to change the order new cards come in. The ↻ mark collects
          cards to rewrite together.
        </span>
      )}

      {shown.length === 0 ? (
        <div className="empty glass">
          <strong>
            {filter === "study" ? "No cards in this deck yet" : "No cards here"}
          </strong>
          {filter === "study" && (
            <span className="muted">
              Open a text, mark words to learn, and generate them into this
              deck.
            </span>
          )}
        </div>
      ) : (
        <ul className="card-rows">
          {shown.map((card) => (
            <li
              key={card.id}
              {...(filter === "study" ? drag.props(card.id) : {})}
              className={`card-row ${card.status} ${card.needs_regeneration ? "marked" : ""} ${drag.dragging === card.id ? "dragging" : ""} ${drag.over === card.id && drag.dragging !== card.id ? "drop" : ""}`}
              onClick={() => setOpenId(card.id)}
            >
              <div className="row-word">
                <strong>{card.word}</strong>
                <span className="muted small">{card.word_translation}</span>
              </div>
              <div className="row-text">
                <p className="serif">{card.sentence}</p>
                <p className="muted small">{card.translation}</p>
              </div>
              <div className="row-tags">
                {card.needs_check && (
                  <span className="tag teacher" title={card.note}>
                    teacher
                  </span>
                )}
                {card.status === "flagged" && (
                  <span className="tag warn" title={card.problems.join("; ")}>
                    check
                  </span>
                )}
                {card.edited && <span className="tag">edited</span>}
              </div>
              <div className="row-actions">
                <button
                  className="ghost icon-btn"
                  aria-label="Listen"
                  title="Listen"
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(card.sentence, language);
                  }}
                >
                  <Icon name="sound" size={18} />
                </button>
                <button
                  className={`ghost icon-btn ${card.needs_regeneration ? "is-on" : ""}`}
                  aria-pressed={card.needs_regeneration}
                  title={
                    card.needs_regeneration
                      ? "Marked for the next rewrite"
                      : "Mark to rewrite with the others"
                  }
                  aria-label="Mark to rewrite"
                  onClick={quick(card, {
                    needs_regeneration: !card.needs_regeneration,
                  })}
                >
                  <Icon name="refresh" size={18} />
                </button>
                <button
                  className="ghost icon-btn"
                  title="Rewrite now"
                  aria-label="Rewrite now"
                  disabled={busy === `card-${card.id}`}
                  onClick={rewriteNow(card)}
                >
                  <Icon name="sparkle" size={18} />
                </button>
                <button
                  className={`ghost icon-btn ${card.status === "archived" ? "is-on" : ""}`}
                  title={
                    card.status === "archived"
                      ? "Bring back into study"
                      : "Archive: keep it, but stop studying it"
                  }
                  aria-label={
                    card.status === "archived" ? "Unarchive" : "Archive"
                  }
                  onClick={quick(card, {
                    status: card.status === "archived" ? "active" : "archived",
                  })}
                >
                  <Icon name="archive" size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {open && (
        <Drawer title={open.word} onClose={() => setOpenId(null)}>
          <CardEditor
            key={open.id}
            card={open}
            decks={decks}
            language={language}
            onSaved={replace}
            onCreated={(created) => {
              setCards([
                ...cards,
                ...created.filter((c) => c.deck_ids.includes(deckId)),
              ]);
              loadDecks();
            }}
            onDeleted={(id) => {
              setCards(cards.filter((c) => c.id !== id));
              setOpenId(null);
              loadDecks();
            }}
          />
        </Drawer>
      )}

      {editing && (
        <Drawer title="Edit deck" onClose={() => setEditing(false)}>
          <DeckForm
            deck={deck}
            profile={profile}
            submit="Save deck"
            onSave={async (fields) => {
              await api.updateDeck(deck.id, fields);
              await loadDecks();
              setEditing(false);
            }}
          />
          <div className="divider spaced" />
          <Sharing
            deckId={deck.id}
            onChange={() => {
              loadDecks();
              loadCards();
            }}
          />
          <div className="divider spaced" />
          <button className="btn danger" onClick={remove}>
            <Icon name="trash" size={16} /> Delete deck
          </button>
        </Drawer>
      )}
    </div>
  );
}

function Sharing({
  deckId,
  onChange,
}: {
  deckId: number;
  onChange: () => void;
}) {
  const [shares, setShares] = useState<Share[]>([]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    api.shares(deckId).then(setShares);
  }, [deckId]);

  const add = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      await api.share(deckId, email);
      setEmail("");
      setShares(await api.shares(deckId));
      onChange();
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="stack">
      <h3>Share with a teacher</h3>
      <p className="muted small">
        Your teacher sees this deck's cards and can fix them, mark them bad,
        rewrite them, or delete them. They see no other deck, and never your API
        key.
      </p>
      {shares.map((share) => (
        <div key={share.email} className="row-between center-y">
          <span>{share.email}</span>
          <button
            className="btn small"
            onClick={async () => {
              await api.unshare(deckId, share.email);
              setShares(await api.shares(deckId));
              onChange();
            }}
          >
            Stop sharing
          </button>
        </div>
      ))}
      <form className="finder" onSubmit={add}>
        <input
          type="email"
          required
          placeholder="teacher@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Teacher's email"
        />
        <button className="btn" type="submit">
          Share
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

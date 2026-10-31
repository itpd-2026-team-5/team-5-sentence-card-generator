import { useEffect, useState } from "react";
import { api, type TextSummary } from "../api";
import { Drawer } from "../components/Drawer";
import { Icon } from "../components/Icon";
import { TextForm } from "../components/TextForm";
import { useDragReorder } from "../hooks";

export function Library() {
  const [texts, setTexts] = useState<TextSummary[]>([]);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const load = () =>
    api.texts().then(
      (t) => {
        setTexts(t);
        setLoaded(true);
      },
      (e) => setError(e.message),
    );
  useEffect(() => {
    load();
  }, []);
  const drag = useDragReorder(texts, setTexts, api.reorderTexts);

  // Up and down buttons, for screens where dragging does not work.
  const move = async (event: React.MouseEvent, index: number, by: number) => {
    event.preventDefault();
    event.stopPropagation();
    const next = [...texts];
    const [text] = next.splice(index, 1);
    next.splice(index + by, 0, text);
    setTexts(next);
    await api.reorderTexts(next.map((t) => t.id));
  };

  const remove = async (event: React.MouseEvent, text: TextSummary) => {
    event.preventDefault();
    event.stopPropagation();
    if (!confirm(`Delete “${text.title}”? Its cards stay in their decks.`))
      return;
    await api.deleteText(text.id);
    load();
  };

  return (
    <div className="page">
      <header className="page-head row-between">
        <div>
          <p className="eyebrow">
            {texts.length} {texts.length === 1 ? "text" : "texts"}
          </p>
          <h1>Texts</h1>
        </div>
        <button className="btn primary" onClick={() => setAdding(true)}>
          <Icon name="plus" size={16} /> Add text
        </button>
      </header>
      <p className="muted">
        A text is where you find words: paste one, mark the words you want to
        learn, and generate their cards into a deck. Drag a text by its handle,
        or use the arrows, to put the texts in the order you want to work
        through them.
      </p>
      {error && <p className="error">{error}</p>}

      {loaded && texts.length === 0 && (
        <div className="empty glass">
          <strong>No texts yet</strong>
          <span className="muted">
            Add a text in the language you are learning.
          </span>
        </div>
      )}

      {texts.length > 0 && (
        <ul className="card-rows">
          {texts.map((text, index) => (
            <li
              key={text.id}
              {...drag.props(text.id)}
              className={`card-row text-row ${drag.dragging === text.id ? "dragging" : ""} ${drag.over === text.id && drag.dragging !== text.id ? "drop" : ""}`}
              onClick={() => {
                location.hash = `/text/${text.id}`;
              }}
            >
              <span className="text-order" title="Drag to move">
                <Icon name="grip" size={18} />
                <span>{index + 1}</span>
              </span>
              <div className="row-text">
                <p>
                  <a href={`#/text/${text.id}`} className="deck-name">
                    {text.title}
                  </a>
                </p>
                <p className="muted small">
                  {text.to_learn} to learn · {text.cards} cards
                  {text.source_url && (
                    <>
                      {" "}
                      ·{" "}
                      <a
                        className="link"
                        href={text.source_url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        source ↗
                      </a>
                    </>
                  )}
                </p>
              </div>
              <div className="row-actions">
                <button
                  className="ghost icon-btn"
                  aria-label="Move up"
                  disabled={index === 0}
                  onClick={(e) => move(e, index, -1)}
                >
                  <Icon name="up" size={16} />
                </button>
                <button
                  className="ghost icon-btn"
                  aria-label="Move down"
                  disabled={index === texts.length - 1}
                  onClick={(e) => move(e, index, 1)}
                >
                  <Icon name="down" size={16} />
                </button>
                <button
                  className="ghost icon-btn danger-icon"
                  aria-label={`Delete ${text.title}`}
                  onClick={(e) => remove(e, text)}
                >
                  <Icon name="trash" size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {adding && (
        <Drawer title="Add a text" onClose={() => setAdding(false)}>
          <TextForm
            submit="Add and pick words"
            onSave={async (fields) => {
              const text = await api.createText(fields);
              location.hash = `/text/${text.id}`;
            }}
          />
        </Drawer>
      )}
    </div>
  );
}

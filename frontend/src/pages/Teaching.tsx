import { useEffect, useState } from 'react'
import { api, speak, type Card, type Language, type TaughtDeck } from '../api'
import { Icon } from '../components/Icon'

/** The decks students shared with the signed-in teacher. */
export function Teaching() {
  const [decks, setDecks] = useState<TaughtDeck[] | null>(null)
  useEffect(() => { api.teaching().then(setDecks) }, [])
  if (!decks) return <p className="muted">Loading…</p>

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Teaching</p>
        <h1>Your students' decks</h1>
        <p className="muted">A student shares a deck with you by your email. You see only the decks they share, and you can correct every card in them.</p>
      </header>
      {decks.length === 0 ? (
        <div className="empty glass">
          <strong>No shared decks yet</strong>
          <span className="muted">Ask your student to open a deck, choose Edit deck, and share it with your email.</span>
        </div>
      ) : (
        <ul className="card-rows">
          {decks.map((deck) => (
            <li key={deck.id} className="card-row teach-row" onClick={() => { location.hash = `/teach/${deck.id}` }}>
              <div className="row-word"><strong>{deck.name}</strong><span className="muted small">{deck.student}</span></div>
              <div className="row-text"><p className="muted small">{deck.instructions || 'No instructions'}</p></div>
              <div className="row-tags">
                <span className="tag">{deck.cards} cards</span>
                {deck.needs_check > 0 && <span className="tag teacher">{deck.needs_check} questions</span>}
                {deck.bad > 0 && <span className="tag bad">{deck.bad} bad</span>}
              </div>
              <div className="row-actions"><Icon name="play" size={16} /></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/** One shared deck as a sheet: every card on one line, edited in place, so a teacher can go
 *  through hundreds of cards without opening each one. */
export function TeachDeck({ deckId, language }: { deckId: number; language: Language }) {
  const [deck, setDeck] = useState<TaughtDeck | null>(null)
  const [cards, setCards] = useState<Card[] | null>(null)
  const [error, setError] = useState('')
  const [onlyOpen, setOnlyOpen] = useState(false)

  useEffect(() => {
    api.teaching().then((all) => {
      const found = all.find((d) => d.id === deckId)
      if (!found) setError('This deck is not shared with you.')
      setDeck(found ?? null)
    })
    api.taughtCards(deckId).then(setCards, (e) => setError(e.message))
  }, [deckId])

  if (error) return <p className="error">{error}</p>
  if (!deck || !cards) return <p className="muted">Loading…</p>

  const replace = (card: Card) => setCards(cards.map((c) => (c.id === card.id ? card : c)))
  const shown = onlyOpen ? cards.filter((c) => c.needs_check || c.status !== 'active') : cards

  return (
    <div className="page wide">
      <header className="page-head row-between">
        <div className="stack tight">
          <a className="back" href="#/teaching">← Teaching</a>
          <h1>{deck.name}</h1>
          <p className="muted">{deck.student}{deck.instructions ? ` · ${deck.instructions}` : ''}</p>
        </div>
        <label className="switch"><input type="checkbox" checked={onlyOpen} onChange={(e) => setOnlyOpen(e.target.checked)} /> Only questions and problems</label>
      </header>

      <div className="sheet-wrap">
        <table className="sheet">
          <thead>
            <tr><th>Word</th><th>Meaning</th><th>Sentence</th><th>Translation</th><th>Student's note</th><th>New sentence</th><th /></tr>
          </thead>
          <tbody>
            {shown.map((card) => <SheetRow key={card.id} card={card} language={language} onSaved={replace}
              onDeleted={(id) => setCards(cards.filter((c) => c.id !== id))} />)}
          </tbody>
        </table>
        {shown.length === 0 && <p className="muted pad">Nothing to check here.</p>}
      </div>
    </div>
  )
}

function SheetRow({ card, language, onSaved, onDeleted }: {
  card: Card
  language: Language
  onSaved: (card: Card) => void
  onDeleted: (id: number) => void
}) {
  const [busy, setBusy] = useState(false)
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')

  const run = async (action: () => Promise<Card | void>) => {
    setBusy(true)
    setError('')
    try {
      const result = await action()
      if (result) onSaved(result)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(false)
    }
  }
  // Save a cell when the teacher leaves it, only if it changed.
  const cell = (field: 'word_translation' | 'sentence' | 'translation') => ({
    defaultValue: card[field],
    onBlur: (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const value = e.target.value.trim()
      if (value && value !== card[field]) run(() => api.updateCard(card.id, { [field]: value }))
    },
  })

  return (
    <tr className={`${card.status} ${card.needs_check ? 'asks' : ''} ${busy ? 'busy' : ''}`}>
      <td className="sheet-word">{card.word}</td>
      <td><input key={card.word_translation} {...cell('word_translation')} aria-label={`Meaning of ${card.word}`} /></td>
      <td><textarea key={card.sentence} rows={2} {...cell('sentence')} aria-label={`Sentence for ${card.word}`} /></td>
      <td><textarea key={card.translation} rows={2} {...cell('translation')} aria-label={`Translation for ${card.word}`} /></td>
      <td className="sheet-note">
        {card.needs_check ? (
          <>
            <span>{card.note || 'Please check'}</span>
            <button className="btn small" disabled={busy} onClick={() => run(() => api.updateCard(card.id, { needs_check: false }))}>Answered</button>
          </>
        ) : card.status === 'flagged' ? <span className="muted small">{card.problems.join('; ')}</span> : null}
      </td>
      <td className="sheet-regen">
        <input placeholder="What is wrong?" value={reason} onChange={(e) => setReason(e.target.value)} aria-label="Reason" />
        <button className="btn small" disabled={busy} onClick={() => run(async () => { const c = await api.regenerateCard(card.id, reason); setReason(''); return c })}>
          <Icon name="refresh" size={14} /> {busy ? '…' : 'Rewrite'}
        </button>
        {error && <span className="error small">{error}</span>}
      </td>
      <td className="sheet-actions">
        <button className="ghost icon-btn" aria-label="Listen" onClick={() => speak(card.sentence, language)}><Icon name="sound" size={16} /></button>
        <button className={`ghost icon-btn ${card.status === 'bad' ? 'is-bad' : ''}`} disabled={busy}
          title={card.status === 'bad' ? 'Restore' : 'Mark bad'} aria-label={card.status === 'bad' ? 'Restore' : 'Mark bad'}
          onClick={() => run(() => api.updateCard(card.id, { status: card.status === 'bad' ? 'active' : 'bad' }))}><Icon name="flag" size={16} /></button>
        <button className="ghost icon-btn danger-icon" disabled={busy} aria-label="Delete" title="Delete"
          onClick={() => run(async () => { if (confirm(`Delete the card for “${card.word}”?`)) { await api.deleteCard(card.id); onDeleted(card.id) } })}><Icon name="trash" size={16} /></button>
      </td>
    </tr>
  )
}

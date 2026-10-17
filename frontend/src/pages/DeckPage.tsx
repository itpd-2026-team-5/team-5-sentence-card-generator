import { useEffect, useState } from 'react'
import { api, speak, type Card, type Deck, type Language, type Share } from '../api'
import { CardEditor } from '../components/CardEditor'
import { Drawer } from '../components/Drawer'
import { Icon } from '../components/Icon'
import { useDragReorder } from '../hooks'
import { DeckForm } from './Decks'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'teacher', label: 'For the teacher' },
  { key: 'flagged', label: 'Failed a check' },
  { key: 'bad', label: 'Marked bad' },
]

export function DeckPage({ deckId, language }: { deckId: number; language: Language; known: Language }) {
  const [deck, setDeck] = useState<Deck | null>(null)
  const [decks, setDecks] = useState<Deck[]>([])
  const [cards, setCards] = useState<Card[]>([])
  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState<number | null>(null)
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState('')

  const loadDecks = () => api.decks().then((all) => {
    setDecks(all)
    setDeck(all.find((d) => d.id === deckId) ?? null)
    if (!all.some((d) => d.id === deckId)) setError('Deck not found')
  })
  const loadCards = () => api.cards({ deckId }).then(setCards)
  useEffect(() => { loadDecks(); loadCards() }, [deckId]) // eslint-disable-line react-hooks/exhaustive-deps

  const drag = useDragReorder(cards, setCards, api.reorderCards)
  if (!deck) return <p className="muted">{error || 'Loading…'}</p>

  const shown = cards.filter((c) =>
    filter === 'all' ? true : filter === 'teacher' ? c.needs_check : c.status === filter)
  const open = cards.find((c) => c.id === openId) ?? null
  const replace = (card: Card) => {
    // A card taken out of this deck leaves the list.
    setCards(card.deck_ids.includes(deckId) ? cards.map((c) => (c.id === card.id ? card : c)) : cards.filter((c) => c.id !== card.id))
    loadDecks()
  }

  const quickBad = async (event: React.MouseEvent, card: Card) => {
    event.stopPropagation()
    replace(await api.updateCard(card.id, { status: card.status === 'bad' ? 'active' : 'bad' }))
  }

  const remove = async () => {
    if (!confirm(`Delete the deck “${deck.name}”? Cards that are in no other deck are deleted with it.`)) return
    try {
      await api.deleteDeck(deck.id)
      location.hash = '/decks'
    } catch (e) {
      setError((e as Error).message)
    }
  }

  return (
    <div className="page">
      <header className="page-head row-between">
        <div className="stack tight">
          <a className="back" href="#/decks">← Decks</a>
          <h1>{deck.name}</h1>
          <p className="muted">{deck.instructions || 'No instructions: sentences follow only your level and the words you know.'}</p>
        </div>
        <div className="row-gap">
          <button className="btn" onClick={() => setEditing(true)}><Icon name="edit" size={16} /> Edit deck</button>
          <a className={`btn primary ${deck.due + deck.new === 0 ? 'disabled' : ''}`} href={`#/study?decks=${deck.id}`}>
            <Icon name="play" size={16} /> Study · {deck.due + deck.new}
          </a>
        </div>
      </header>
      {error && <p className="error">{error}</p>}

      <div className="row-between">
        <div className="segmented small-seg">
          {FILTERS.map((f) => (
            <button key={f.key} className={filter === f.key ? 'on' : ''} onClick={() => setFilter(f.key)}>{f.label}</button>
          ))}
        </div>
        {filter === 'all' && cards.length > 1 && <span className="muted small drag-hint">Drag to change the order new cards come in.</span>}
      </div>

      {shown.length === 0 ? (
        <div className="empty glass">
          <strong>{filter === 'all' ? 'No cards in this deck yet' : 'No cards here'}</strong>
          {filter === 'all' && <span className="muted">Open a text, mark words to learn, and generate them into this deck.</span>}
        </div>
      ) : (
        <ul className="card-rows">
          {shown.map((card) => (
            <li key={card.id} {...(filter === 'all' ? drag.props(card.id) : {})}
              className={`card-row ${card.status} ${drag.dragging === card.id ? 'dragging' : ''} ${drag.over === card.id && drag.dragging !== card.id ? 'drop' : ''}`}
              onClick={() => setOpenId(card.id)}>
              <div className="row-word">
                <strong>{card.word}</strong>
                <span className="muted small">{card.word_translation}</span>
              </div>
              <div className="row-text">
                <p className="serif">{card.sentence}</p>
                <p className="muted small">{card.translation}</p>
              </div>
              <div className="row-tags">
                {card.needs_check && <span className="tag teacher" title={card.note}>teacher</span>}
                {card.status === 'flagged' && <span className="tag warn" title={card.problems.join('; ')}>check</span>}
                {card.edited && <span className="tag">edited</span>}
              </div>
              <div className="row-actions">
                <button className="ghost icon-btn" aria-label="Listen" onClick={(e) => { e.stopPropagation(); speak(card.sentence, language) }}><Icon name="sound" size={18} /></button>
                <button className={`ghost icon-btn ${card.status === 'bad' ? 'is-bad' : ''}`}
                  aria-label={card.status === 'bad' ? 'Restore' : 'Mark bad'} title={card.status === 'bad' ? 'Restore' : 'Mark bad'}
                  onClick={(e) => quickBad(e, card)}><Icon name="flag" size={18} /></button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {open && (
        <Drawer title={open.word} onClose={() => setOpenId(null)}>
          <CardEditor key={open.id} card={open} decks={decks} language={language}
            onSaved={replace}
            onCreated={(created) => { setCards([...cards, ...created.filter((c) => c.deck_ids.includes(deckId))]); loadDecks() }}
            onDeleted={(id) => { setCards(cards.filter((c) => c.id !== id)); setOpenId(null); loadDecks() }} />
        </Drawer>
      )}

      {editing && (
        <Drawer title="Edit deck" onClose={() => setEditing(false)}>
          <DeckForm deck={deck} submit="Save deck" onSave={async (name, instructions) => {
            await api.updateDeck(deck.id, { name, instructions })
            await loadDecks()
            setEditing(false)
          }} />
          <div className="divider spaced" />
          <Sharing deckId={deck.id} />
          <div className="divider spaced" />
          <button className="btn danger" onClick={remove}><Icon name="trash" size={16} /> Delete deck</button>
        </Drawer>
      )}
    </div>
  )
}

/** Let a teacher see and correct this deck, and only this deck. */
function Sharing({ deckId }: { deckId: number }) {
  const [shares, setShares] = useState<Share[]>([])
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  useEffect(() => { api.shares(deckId).then(setShares) }, [deckId])

  const add = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    try {
      await api.share(deckId, email)
      setEmail('')
      setShares(await api.shares(deckId))
    } catch (e) {
      setError((e as Error).message)
    }
  }

  return (
    <div className="stack">
      <h3>Share with a teacher</h3>
      <p className="muted small">Your teacher sees this deck's cards and can fix them, mark them bad, rewrite them, or delete them. They see no other deck, and never your API key.</p>
      {shares.map((share) => (
        <div key={share.email} className="row-between center-y">
          <span>{share.email}</span>
          <button className="btn small" onClick={async () => { await api.unshare(deckId, share.email); setShares(await api.shares(deckId)) }}>Stop sharing</button>
        </div>
      ))}
      <form className="finder" onSubmit={add}>
        <input type="email" required placeholder="teacher@example.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Teacher's email" />
        <button className="btn" type="submit">Share</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  )
}

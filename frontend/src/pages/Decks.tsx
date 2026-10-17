import { useEffect, useState } from 'react'
import { api, type Deck } from '../api'
import { coverStyle, initial } from '../components/Cover'
import { Drawer } from '../components/Drawer'
import { Icon } from '../components/Icon'

export function Decks() {
  const [decks, setDecks] = useState<Deck[] | null>(null)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { api.decks().then(setDecks, (e) => setError(e.message)) }, [])
  if (!decks) return <p className="muted">{error || 'Loading…'}</p>

  return (
    <div className="page">
      <header className="page-head row-between">
        <div>
          <p className="eyebrow">{decks.length} {decks.length === 1 ? 'deck' : 'decks'}</p>
          <h1>Decks</h1>
        </div>
        <button className="btn primary" onClick={() => setAdding(true)}><Icon name="plus" size={16} /> New deck</button>
      </header>
      <p className="muted">A deck is what you study. Give it instructions, such as a topic, and every sentence made for it follows them.</p>

      <div className="covers">
        {decks.map((deck) => (
          <a key={deck.id} href={`#/deck/${deck.id}`} className="cover" style={coverStyle(deck.name)}>
            <span className="cover-initial">{initial(deck.name)}</span>
            <span className="cover-title">{deck.name}</span>
            {deck.instructions && <span className="cover-note">{deck.instructions}</span>}
            <span className="cover-meta">
              {deck.cards} cards · {deck.new} new · {deck.due} to review
              {deck.needs_check > 0 && ` · ${deck.needs_check} for the teacher`}
            </span>
          </a>
        ))}
      </div>

      {adding && (
        <Drawer title="New deck" onClose={() => setAdding(false)}>
          <DeckForm submit="Create deck" onSave={async (name, instructions) => {
            const deck = await api.createDeck(name, instructions)
            location.hash = `/deck/${deck.id}`
          }} />
        </Drawer>
      )}
    </div>
  )
}

export function DeckForm({ deck, submit, onSave }: {
  deck?: Deck
  submit: string
  onSave: (name: string, instructions: string) => Promise<unknown>
}) {
  const [name, setName] = useState(deck?.name ?? '')
  const [instructions, setInstructions] = useState(deck?.instructions ?? '')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const save = async (event: React.FormEvent) => {
    event.preventDefault()
    setBusy(true)
    try {
      await onSave(name, instructions)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="stack" onSubmit={save}>
      <label>Name<input required autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Verbs of motion" /></label>
      <label>Instructions for the sentences <span className="muted">(optional)</span>
        <textarea rows={4} value={instructions} onChange={(e) => setInstructions(e.target.value)}
          placeholder="e.g. Sentences about football, in everyday spoken German." />
      </label>
      <p className="muted small">Only these instructions, your level, and the words you know go into the request. Nothing about you is sent.</p>
      <button className="btn primary" type="submit" disabled={busy}>{submit}</button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}

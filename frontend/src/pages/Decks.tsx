import { useEffect, useState } from 'react'
import { api, LANGUAGES, LEVELS, type Deck, type DeckFields, type Language, type Level, type Profile } from '../api'
import { Drawer } from '../components/Drawer'
import { Icon } from '../components/Icon'

const pair = (deck: Pick<Deck, 'known_language' | 'target_language'>) =>
  `${LANGUAGES[deck.target_language]} from ${LANGUAGES[deck.known_language]}`

/** The decks as compact rows: what each holds, what is due, and who teaches it. */
export function Decks() {
  const [decks, setDecks] = useState<Deck[] | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.decks().then(setDecks, (e) => setError(e.message))
    api.profile().then(setProfile)
  }, [])
  if (!decks || !profile) return <p className="muted">{error || 'Loading…'}</p>

  return (
    <div className="page">
      <header className="page-head row-between">
        <div>
          <p className="eyebrow">{decks.length} {decks.length === 1 ? 'deck' : 'decks'}</p>
          <h1>Decks</h1>
        </div>
        <button className="btn primary" onClick={() => setAdding(true)}><Icon name="plus" size={16} /> New deck</button>
      </header>

      <div className="table-wrap">
        <table className="deck-table">
          <thead>
            <tr><th>Deck</th><th>Languages</th><th className="num">Cards</th><th className="num">New</th><th className="num">Due</th><th>Teacher</th></tr>
          </thead>
          <tbody>
            {decks.map((deck) => (
              <tr key={deck.id} onClick={() => { location.hash = `/deck/${deck.id}` }}>
                <td>
                  <a href={`#/deck/${deck.id}`} className="deck-name">{deck.name}</a>
                  {deck.description && <span className="muted small deck-desc">{deck.description}</span>}
                </td>
                <td className="muted small nowrap">{pair(deck)} · {deck.effective_level}</td>
                <td className="num">{deck.cards}{deck.archived > 0 && <span className="muted small"> +{deck.archived} archived</span>}</td>
                <td className="num"><span className="count new">{deck.new}</span></td>
                <td className="num"><span className="count due">{deck.due}</span></td>
                <td className="small">
                  {deck.teachers.length ? deck.teachers.join(', ') : <span className="muted">—</span>}
                  {deck.needs_check > 0 && <span className="tag teacher"> {deck.needs_check} asked</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {adding && (
        <Drawer title="New deck" onClose={() => setAdding(false)}>
          <DeckForm profile={profile} submit="Create deck" onSave={async (fields) => {
            const deck = await api.createDeck(fields)
            location.hash = `/deck/${deck.id}`
          }} />
        </Drawer>
      )}
    </div>
  )
}

export function DeckForm({ deck, profile, submit, onSave }: {
  deck?: Deck
  profile: Profile
  submit: string
  onSave: (fields: DeckFields) => Promise<unknown>
}) {
  const [fields, setFields] = useState<DeckFields>({
    name: deck?.name ?? '',
    description: deck?.description ?? '',
    instructions: deck?.instructions ?? '',
    known_language: deck?.known_language ?? profile.known_language,
    target_language: deck?.target_language ?? profile.target_language,
    level: deck?.level ?? '',
    new_per_day: deck?.new_per_day ?? 10,
    reviews_per_day: deck?.reviews_per_day ?? 200,
  })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const set = <K extends keyof DeckFields>(key: K, value: DeckFields[K]) => setFields({ ...fields, [key]: value })
  const learnerLevel = profile.levels[fields.target_language] ?? 'A2'

  const save = async (event: React.FormEvent) => {
    event.preventDefault()
    setBusy(true)
    try {
      await onSave(fields)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="stack" onSubmit={save}>
      <label>Name<input required autoFocus value={fields.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Verbs of motion" /></label>
      <label>Description <span className="muted">(optional, for you)</span>
        <input value={fields.description} onChange={(e) => set('description', e.target.value)} placeholder="e.g. Words from my train trips" />
      </label>
      <div className="lang-row">
        <label>Learning
          <select value={fields.target_language} onChange={(e) => set('target_language', e.target.value as Language)}>
            {Object.entries(LANGUAGES).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
          </select>
        </label>
        <label>Translated into
          <select value={fields.known_language} onChange={(e) => set('known_language', e.target.value as Language)}>
            {Object.entries(LANGUAGES).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
          </select>
        </label>
        <label>Level
          <select value={fields.level} onChange={(e) => set('level', e.target.value as Level | '')}>
            <option value="">Mine ({learnerLevel})</option>
            {LEVELS.map((level) => <option key={level} value={level}>{level}</option>)}
          </select>
        </label>
      </div>
      <label>Instructions for the next sentences <span className="muted">(optional)</span>
        <textarea rows={4} value={fields.instructions} onChange={(e) => set('instructions', e.target.value)}
          placeholder="e.g. Sentences about football, in everyday spoken German." />
      </label>
      <p className="muted small">Each card keeps the instructions it was written with, so changing them affects only the cards you generate next.</p>
      <div className="lang-row">
        <label>New cards a day<input type="number" min={0} max={999} value={fields.new_per_day} onChange={(e) => set('new_per_day', Number(e.target.value))} /></label>
        <label>Reviews a day<input type="number" min={0} max={9999} value={fields.reviews_per_day} onChange={(e) => set('reviews_per_day', Number(e.target.value))} /></label>
      </div>
      <button className="btn primary" type="submit" disabled={busy}>{submit}</button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}

import { useEffect, useState } from 'react'
import { api, LANGUAGES, local, type Deck, type Mark, type TextDetail } from '../api'
import { Drawer } from '../components/Drawer'
import { Icon } from '../components/Icon'
import { TextForm } from '../components/TextForm'

export function Reader({ textId }: { textId: number }) {
  const [text, setText] = useState<TextDetail | null>(null)
  const [decks, setDecks] = useState<Deck[]>([])
  const [deckId, setDeckId] = useState<number | null>(null)
  const [withCard, setWithCard] = useState<Set<string>>(new Set())
  const [active, setActive] = useState<string | null>(null)
  const [onlyMarked, setOnlyMarked] = useState(false)
  const [query, setQuery] = useState('')
  const [found, setFound] = useState<string[] | null>(null)
  const [editing, setEditing] = useState(false)
  const [busy, setBusy] = useState(false)
  const [made, setMade] = useState<{ count: number; deck: Deck } | null>(null)
  const [error, setError] = useState('')

  const loadCards = () => api.cards({ textId }).then((cards) => setWithCard(new Set(cards.map((c) => c.word.toLowerCase()))))
  useEffect(() => {
    api.text(textId).then(setText, (e) => setError(e.message))
    loadCards()
    api.decks().then((all) => {
      setDecks(all)
      const last = Number(local.get('generate-deck', '0'))
      setDeckId(all.some((d) => d.id === last) ? last : all[0]?.id ?? null)
    })
  }, [textId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Close the word menu on a click anywhere else.
  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.w-wrap')) setActive(null)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  if (!text) return <p className="muted">{error || 'Loading…'}</p>

  const choose = async (word: string, sentence: string, status: Mark | 'none') => {
    const key = word.toLowerCase()
    const marks = { ...text.marks }
    if (status === 'none') delete marks[key]
    else marks[key] = status
    setText({ ...text, marks })
    setActive(null)
    await api.mark(textId, word, sentence, status)
  }

  const find = async (event: React.FormEvent) => {
    event.preventDefault()
    if (query.trim()) setFound(await api.find(textId, query.trim()))
  }

  const pickDeck = async (value: string) => {
    if (value !== 'new') {
      setDeckId(Number(value))
      local.set('generate-deck', value)
      return
    }
    const name = prompt('Name of the new deck')
    if (!name?.trim()) return
    const deck = await api.createDeck({ name: name.trim() })
    setDecks([...decks, deck])
    setDeckId(deck.id)
    local.set('generate-deck', String(deck.id))
  }

  const generate = async () => {
    if (deckId === null) return
    setBusy(true)
    setError('')
    setMade(null)
    try {
      const { created } = await api.generate(textId, deckId)
      await loadCards()
      setMade({ count: created.length, deck: decks.find((d) => d.id === deckId)! })
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const learn = Object.entries(text.marks).filter(([, s]) => s === 'learn').map(([w]) => w)
  const ignore = Object.entries(text.marks).filter(([, s]) => s === 'ignore').map(([w]) => w)
  const pending = learn.filter((w) => !withCard.has(w)).length
  const marked = new Set(Object.keys(text.marks))
  const sentences = text.sentences
    .map((sentence, i) => ({ sentence, i }))
    .filter(({ sentence }) => !onlyMarked || sentence.words.some((w) => marked.has(w.toLowerCase())))

  // A chip only knows the lowercase word; find the sentence it came from for the API call.
  const sentenceOf = (key: string) =>
    text.sentences.find((s) => s.words.some((w) => w.toLowerCase() === key))?.text ?? ''

  return (
    <div className="reader-layout">
      <article className="paper">
        <div className="row-between">
          <a className="back" href="#/texts">← Texts</a>
          <button className="btn small" onClick={() => setEditing(true)}><Icon name="edit" size={14} /> Edit text</button>
        </div>
        <h1>{text.title}</h1>
        {(text.source_url || text.notes) && (
          <p className="muted small">
            {text.source_url && <a className="link" href={text.source_url} target="_blank" rel="noreferrer"><Icon name="link" size={13} /> {new URL(text.source_url).hostname}</a>}
            {text.source_url && text.notes && ' · '}
            {text.notes}
          </p>
        )}

        <form className="finder" onSubmit={find}>
          <input value={query} onChange={(e) => { setQuery(e.target.value); setFound(null) }} placeholder="Type a word to find its sentences" aria-label="Find a word" />
          <button className="btn" type="submit">Find</button>
        </form>
        {found && (
          <div className="found glass">
            {found.length === 0 ? <p className="muted small">“{query}” is not in this text.</p> : (
              <>
                <p className="muted small">Pick the sentence that has the meaning you want to learn:</p>
                {found.map((sentence) => {
                  const word = text.sentences.find((s) => s.text === sentence)?.words.find((w) => w.toLowerCase().startsWith(query.trim().toLowerCase())) ?? query.trim()
                  return (
                    <div key={sentence} className="found-row">
                      <p className="serif">{sentence}</p>
                      <button className="btn small" onClick={() => { choose(word, sentence, 'learn'); setFound(null); setQuery('') }}>Learn “{word}” here</button>
                    </div>
                  )
                })}
              </>
            )}
          </div>
        )}

        <div className="row-between reader-tools">
          <p className="muted small">Or click a word to learn it or ignore it. Words you leave alone count as words you know.</p>
          <label className="switch"><input type="checkbox" checked={onlyMarked} onChange={(e) => setOnlyMarked(e.target.checked)} /> Only sentences with marked words</label>
        </div>
        <div className="prose">
          {sentences.map(({ sentence, i }) => (
            <p key={i}>
              {sentence.tokens.map((token, j) => {
                if (!token.word) return <span key={j}>{token.text}</span>
                const word = token.text
                const key = word.toLowerCase()
                const mark = text.marks[key]
                const id = `${i}:${j}`
                return (
                  <span key={j} className="w-wrap">
                    <button className={`w ${mark ?? ''} ${active === id ? 'open' : ''}`}
                      onClick={() => setActive(active === id ? null : id)}>
                      {word}
                    </button>
                    {active === id && (
                      <span className="pop" role="menu">
                        <button role="menuitem" className="learn" onClick={() => choose(word, sentence.text, 'learn')}>Learn</button>
                        <button role="menuitem" onClick={() => choose(word, sentence.text, 'ignore')}>Ignore</button>
                        {mark && <button role="menuitem" onClick={() => choose(word, sentence.text, 'none')}>Clear</button>}
                      </span>
                    )}
                  </span>
                )
              })}
            </p>
          ))}
          {sentences.length === 0 && <p className="muted small">No sentence has a marked word yet.</p>}
        </div>
      </article>

      <aside className="tray glass">
        <h3>Word tray</h3>
        <div className="chips-block">
          <p className="label">To learn <span>{learn.length}</span></p>
          <div className="chips">
            {learn.length === 0 && <span className="muted small">Nothing picked yet.</span>}
            {learn.map((word) => (
              <button key={word} className={`chip learn ${withCard.has(word) ? 'done' : ''}`} title={withCard.has(word) ? 'Has a card' : 'Remove'}
                onClick={() => choose(word, sentenceOf(word), 'none')}>
                {word}{withCard.has(word) ? <Icon name="check" size={12} /> : <Icon name="close" size={12} />}
              </button>
            ))}
          </div>
        </div>
        {ignore.length > 0 && (
          <div className="chips-block">
            <p className="label">Ignored <span>{ignore.length}</span></p>
            <div className="chips">
              {ignore.map((word) => (
                <button key={word} className="chip ignore" title="Remove" onClick={() => choose(word, sentenceOf(word), 'none')}>
                  {word}<Icon name="close" size={12} />
                </button>
              ))}
            </div>
          </div>
        )}
        <label>Generate into
          <select value={deckId ?? ''} onChange={(e) => pickDeck(e.target.value)}>
            {decks.map((d) => <option key={d.id} value={d.id}>{d.name} ({LANGUAGES[d.target_language]})</option>)}
            <option value="new">+ New deck…</option>
          </select>
        </label>
        <button className="btn primary wide" disabled={busy || pending === 0 || deckId === null} onClick={generate}>
          {busy ? 'Writing sentences…' : pending === 0 ? 'No new words to generate' : `Generate ${pending} card${pending === 1 ? '' : 's'}`}
        </button>
        {made && (
          <a className="toast" href={`#/deck/${made.deck.id}`}>
            <Icon name="check" size={16} /> {made.count} {made.count === 1 ? 'card' : 'cards'} added to {made.deck.name} →
          </a>
        )}
        {error && <p className="error">{error}</p>}
      </aside>

      {editing && (
        <Drawer title="Edit text" onClose={() => setEditing(false)}>
          <TextForm initial={{ title: text.title, body: text.body, source_url: text.source_url, notes: text.notes }} submit="Save text"
            onSave={async (fields) => { setText(await api.updateText(text.id, fields)); setEditing(false) }} />
        </Drawer>
      )}
    </div>
  )
}

import { useEffect, useState } from 'react'
import { api, type TextSummary } from '../api'
import { coverStyle, initial } from '../components/Cover'
import { Drawer } from '../components/Drawer'
import { Icon } from '../components/Icon'

export function Library() {
  const [texts, setTexts] = useState<TextSummary[]>([])
  const [adding, setAdding] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)

  const load = () => api.texts().then((t) => { setTexts(t); setLoaded(true) }, (e) => setError(e.message))
  useEffect(() => { load() }, [])

  const add = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const text = await api.createText(title, body)
      location.hash = `/text/${text.id}`
    } catch (e) {
      setError((e as Error).message)
    }
  }

  const remove = async (event: React.MouseEvent, text: TextSummary) => {
    event.preventDefault()
    event.stopPropagation()
    if (!confirm(`Delete “${text.title}”? Its cards stay in their decks.`)) return
    await api.deleteText(text.id)
    load()
  }

  return (
    <div className="page">
      <header className="page-head row-between">
        <div>
          <p className="eyebrow">{texts.length} {texts.length === 1 ? 'text' : 'texts'}</p>
          <h1>Texts</h1>
        </div>
        <button className="btn primary" onClick={() => setAdding(true)}><Icon name="plus" size={16} /> Add text</button>
      </header>
      <p className="muted">A text is where you find words: paste one, mark the words you want to learn, and generate their cards into a deck. Cards stay in their decks even if you edit or delete the text.</p>
      {error && <p className="error">{error}</p>}

      {loaded && texts.length === 0 && (
        <div className="empty glass">
          <strong>Your library is empty</strong>
          <span className="muted">Add a text in the language you are learning.</span>
        </div>
      )}

      <div className="covers">
        {texts.map((text) => (
          <a key={text.id} href={`#/text/${text.id}`} className="cover" style={coverStyle(text.title)}>
            <button className="cover-remove" onClick={(e) => remove(e, text)} aria-label={`Delete ${text.title}`}>
              <Icon name="close" size={14} />
            </button>
            <span className="cover-initial">{initial(text.title)}</span>
            <span className="cover-title">{text.title}</span>
            <span className="cover-meta">{text.to_learn} to learn · {text.cards} cards</span>
          </a>
        ))}
      </div>

      {adding && (
        <Drawer title="Add a text" onClose={() => setAdding(false)}>
          <form className="stack" onSubmit={add}>
            <label>Title<input required autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Chapter 5" /></label>
            <label>Text
              <textarea required rows={12} value={body} onChange={(e) => setBody(e.target.value)}
                placeholder="Paste a song, an article, or a chapter in the language you are learning." />
            </label>
            <button className="btn primary" type="submit">Add and pick words</button>
          </form>
        </Drawer>
      )}
    </div>
  )
}

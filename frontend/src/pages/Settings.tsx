import { useEffect, useState } from 'react'
import { api, LANGUAGES, type Language, type Level, type Profile, type Usage, type User } from '../api'
import { MODELS, ownKey } from '../llm'
import { Icon } from '../components/Icon'

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const LEVEL_NOTES: Record<Level, string> = {
  A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate', B2: 'Upper intermediate', C1: 'Advanced', C2: 'Proficient',
}

export function Settings({ user, onSignedOut }: { user: User; onSignedOut: () => void }) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [saved, setSaved] = useState<string>('')
  const [dirty, setDirty] = useState(false)
  const [error, setError] = useState('')
  const [usage, setUsage] = useState<Usage | null>(null)
  const [firstSave, setFirstSave] = useState(false)

  useEffect(() => {
    api.profile().then(setProfile, (e) => setError(e.message))
    api.usage().then(setUsage)
  }, [])
  if (!profile) return <p className="muted">{error || 'Loading…'}</p>

  const set = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    setProfile({ ...profile, [key]: value })
    setDirty(true)
    setSaved('')
  }

  const save = async () => {
    try {
      if (!profile.set_up) setFirstSave(true)
      setProfile(await api.saveProfile(profile))
      setDirty(false)
      setSaved('Saved')
      setError('')
    } catch (e) {
      setError((e as Error).message)
    }
  }

  const swap = () => {
    setProfile({ ...profile, known_language: profile.target_language, target_language: profile.known_language })
    setDirty(true)
  }

  const test = profile.placement_tests?.[profile.target_language]

  return (
    <div className="page narrow">
      {!profile.set_up && (
        <section className="glass block welcome">
          <h2>Welcome, {user.full_name.split(' ')[0]}.</h2>
          <p>Before your first cards, tell us which language you speak, which one you are learning, and your level. Every sentence is written for them. Save, and you can start.</p>
        </section>
      )}
      {profile.set_up && saved && firstSave && (
        <section className="glass block welcome">
          <h2>You are set up.</h2>
          <p>Next, add a text and mark the words you want to learn.</p>
          <a className="btn primary" href="#/texts">Add your first text</a>
        </section>
      )}
      <header className="page-head">
        <p className="eyebrow">Settings</p>
        <h1>Your languages</h1>
        <p className="muted">Sentences are written for your level, from words you already know. Topics come from each deck's instructions.</p>
      </header>

      <section className="glass block">
        <h3>Languages</h3>
        <div className="lang-row">
          <label>I speak
            <select value={profile.known_language} onChange={(e) => set('known_language', e.target.value as Language)}>
              {Object.entries(LANGUAGES).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
            </select>
          </label>
          <button className="ghost icon-btn" onClick={swap} aria-label="Swap languages" title="Swap"><Icon name="swap" /></button>
          <label>I am learning
            <select value={profile.target_language} onChange={(e) => set('target_language', e.target.value as Language)}>
              {Object.entries(LANGUAGES).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
            </select>
          </label>
        </div>
      </section>

      <section className="glass block">
        <h3>Your level</h3>
        <div className="segmented" role="radiogroup">
          {LEVELS.map((level) => (
            <button key={level} role="radio" aria-checked={profile.level === level}
              className={profile.level === level ? 'on' : ''} onClick={() => set('level', level)}>
              <strong>{level}</strong><small>{LEVEL_NOTES[level]}</small>
            </button>
          ))}
        </div>
        <p className="muted small">
          Not sure?{' '}
          {test ? <><a href={test} target="_blank" rel="noreferrer">Take a free placement test ↗</a>{profile.target_language === 'ru' ? ' (it asks for your email to send the result)' : ''}</>
            : `No placement test is linked for ${LANGUAGES[profile.target_language]} yet.`}
        </p>
      </section>

      <section className="glass block">
        <h3>Sentence length</h3>
        <div className="lang-row">
          <label>Shortest (words)<input type="number" min={3} max={30} value={profile.sentence_min_words} onChange={(e) => set('sentence_min_words', Number(e.target.value))} /></label>
          <span className="muted">to</span>
          <label>Longest (words)<input type="number" min={3} max={30} value={profile.sentence_max_words} onChange={(e) => set('sentence_max_words', Number(e.target.value))} /></label>
        </div>
        <label className="spaced">At most (characters)
          <input type="number" min={0} max={500} step={10} value={profile.sentence_max_chars || ''} placeholder="No limit"
            onChange={(e) => set('sentence_max_chars', Number(e.target.value) || 0)} />
        </label>
        <p className="muted small">German words can be long, so a limit in characters keeps a study session predictable.</p>
      </section>

      <OwnKey />

      <section className="glass block">
        <h3>LLM usage</h3>
        {usage ? (
          <div className="usage">
            <div><strong>{usage.requests}</strong><span>requests</span></div>
            <div><strong>{(usage.input_tokens + usage.output_tokens).toLocaleString()}</strong><span>tokens</span></div>
            <div><strong>{usage.cards}</strong><span>cards</span></div>
          </div>
        ) : <p className="muted">Loading…</p>}
      </section>

      <section className="glass block row-between center-y">
        <div><h3>Account</h3><p>{user.full_name}</p><p className="muted small">{user.email}</p></div>
        <button className="btn" onClick={async () => { await api.logout(); onSignedOut() }}>Sign out</button>
      </section>

      <div className={`savebar ${dirty || !profile.set_up ? 'show' : ''}`}>
        <span>{error ? <span className="error">{error}</span> : profile.set_up ? 'You have unsaved changes' : 'Check your languages and level, then save'}</span>
        <button className="btn primary" onClick={save}>Save changes</button>
      </div>
      {saved && !dirty && <p className="toast"><Icon name="check" size={16} /> {saved}</p>}
    </div>
  )
}

/** The learner's own Anthropic API key, kept in this browser only. */
function OwnKey() {
  const [key, setKey] = useState(ownKey.get())
  const [model, setModel] = useState(ownKey.model())
  const [saved, setSaved] = useState(false)
  const has = ownKey.get() !== ''

  const save = () => {
    ownKey.set(key.trim())
    ownKey.setModel(model)
    setSaved(true)
  }
  const remove = () => {
    ownKey.set('')
    setKey('')
    setSaved(false)
  }

  return (
    <section className="glass block stack">
      <h3>Your own API key</h3>
      <p className="muted small">
        Sentences are written with your own Anthropic API key, and you pay Anthropic for what you use.
        The key stays in this browser: it goes straight to Anthropic and is never sent to our server, so
        we and your teacher cannot read it. A teacher who rewrites your cards uses their own key.
      </p>
      <label>API key
        <input type="password" autoComplete="off" spellCheck={false} placeholder="sk-ant-…" value={key}
          onChange={(e) => { setKey(e.target.value); setSaved(false) }} />
      </label>
      <label>Model
        <select value={model} onChange={(e) => { setModel(e.target.value); setSaved(false) }}>
          {MODELS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
        </select>
      </label>
      <div className="row-gap">
        <button className="btn primary" disabled={!key.trim()} onClick={save}>Save in this browser</button>
        {has && <button className="btn" onClick={remove}>Remove key</button>}
      </div>
      <p className="muted small">
        {saved ? 'Saved. New sentences will be written with your key.'
          : has ? 'Your key is set in this browser.' : 'No key in this browser: sentences use the service, if it has one.'}
      </p>
    </section>
  )
}

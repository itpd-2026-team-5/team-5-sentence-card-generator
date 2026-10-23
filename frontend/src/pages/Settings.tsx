import { useEffect, useState } from 'react'
import { api, LANGUAGES, LEVELS, local, type Language, type Level, type Profile, type Stats, type User } from '../api'
import { Icon } from '../components/Icon'
import { ownKey, PROVIDERS, type ProviderKind } from '../llm'

const LEVEL_NOTES: Record<Level, string> = {
  A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate', B2: 'Upper intermediate', C1: 'Advanced', C2: 'Proficient',
}

export function Settings({ user, onSignedOut }: { user: User; onSignedOut: () => void }) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [saved, setSaved] = useState<string>('')
  const [dirty, setDirty] = useState(false)
  const [error, setError] = useState('')
  const [stats, setStats] = useState<Stats | null>(null)
  const [firstSave, setFirstSave] = useState(false)

  useEffect(() => {
    api.profile().then(setProfile, (e) => setError(e.message))
    api.stats().then(setStats)
  }, [])
  if (!profile) return <p className="muted">{error || 'Loading…'}</p>

  const set = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    setProfile({ ...profile, [key]: value })
    setDirty(true)
    setSaved('')
  }

  const setLevel = (language: Language, level: Level | '') => {
    const levels = { ...profile.levels }
    if (level) levels[language] = level
    else delete levels[language]
    set('levels', levels)
  }

  const save = async () => {
    try {
      if (!profile.set_up) setFirstSave(true)
      // A learner who never picked a level for the language they learn starts at A2.
      const levels = { ...profile.levels }
      if (!levels[profile.target_language]) levels[profile.target_language] = 'A2'
      setProfile(await api.saveProfile({ ...profile, levels }))
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

  // The language for new decks has the big picker above; the table holds the others.
  const others = (Object.keys(LANGUAGES) as Language[]).filter((l) => l !== profile.known_language && l !== profile.target_language)
  const mainTest = profile.placement_tests?.[profile.target_language]

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
        <p className="muted">Sentences are written for your level, from words you already know. Each deck has its own language pair and instructions.</p>
      </header>

      <section className="glass block">
        <h3>Languages for new decks</h3>
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
        <p className="muted small spaced">Learning more than one language? Give each deck its own pair when you create it.</p>
      </section>

      <section className="glass block">
        <h3>Your level in each language</h3>
        <div className="segmented" role="radiogroup" aria-label={`Level in ${LANGUAGES[profile.target_language]}`}>
          {LEVELS.map((level) => (
            <button key={level} role="radio" aria-checked={(profile.levels[profile.target_language] ?? 'A2') === level}
              className={(profile.levels[profile.target_language] ?? 'A2') === level ? 'on' : ''} onClick={() => setLevel(profile.target_language, level)}>
              <strong>{level}</strong><small>{LEVEL_NOTES[level]}</small>
            </button>
          ))}
        </div>
        <p className="muted small">
          That is {LANGUAGES[profile.target_language]}. A deck can use a different level of its own.{' '}
          {mainTest && <>Not sure? <a href={mainTest} target="_blank" rel="noreferrer">Take a free placement test ↗</a>{profile.target_language === 'ru' ? ' (it asks for your email)' : ''}</>}
        </p>
        {others.length > 0 && <p className="muted small spaced">Other languages you learn:</p>}
        <table className="level-table">
          <tbody>
            {others.map((language) => {
              const test = profile.placement_tests?.[language]
              return (
                <tr key={language}>
                  <th>{LANGUAGES[language]}</th>
                  <td>
                    <select value={profile.levels[language] ?? ''} onChange={(e) => setLevel(language, e.target.value as Level | '')} aria-label={`Level in ${LANGUAGES[language]}`}>
                      <option value="">Not learning</option>
                      {LEVELS.map((level) => <option key={level} value={level}>{level}, {LEVEL_NOTES[level]}</option>)}
                    </select>
                  </td>
                  <td className="muted small">
                    {test ? <a href={test} target="_blank" rel="noreferrer">Free placement test ↗</a> : 'No test linked yet'}
                    {language === 'ru' && test ? ' (asks for your email)' : ''}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>

      <section className="glass block">
        <h3>Sentence length</h3>
        <div className="lang-row">
          <label>Shortest (words)<input type="number" min={3} max={30} value={profile.sentence_min_words} onChange={(e) => set('sentence_min_words', Number(e.target.value))} /></label>
          <span className="muted">to</span>
          <label>Longest (words)<input type="number" min={3} max={30} value={profile.sentence_max_words} onChange={(e) => set('sentence_max_words', Number(e.target.value))} /></label>
        </div>
        <div className="lang-row spaced">
          <label>Shortest (characters)
            <input type="number" min={0} max={500} step={10} value={profile.sentence_min_chars || ''} placeholder="No minimum"
              onChange={(e) => set('sentence_min_chars', Number(e.target.value) || 0)} />
          </label>
          <span className="muted">to</span>
          <label>Longest (characters)
            <input type="number" min={0} max={500} step={10} value={profile.sentence_max_chars || ''} placeholder="No maximum"
              onChange={(e) => set('sentence_max_chars', Number(e.target.value) || 0)} />
          </label>
        </div>
        <p className="muted small">German words can be long, so bounds in characters keep a session predictable, and a minimum keeps sentences from being too simple.</p>
      </section>

      <ReadAloud />
      <WhoWrites />

      <section className="glass block">
        <h3>Statistics</h3>
        {stats ? (
          <>
            <div className="usage">
              <div><strong>{stats.cards}</strong><span>cards</span></div>
              <div><strong>{stats.kept_as_generated}</strong><span>kept as written</span></div>
              <div><strong>{stats.edited}</strong><span>edited by hand</span></div>
              <div><strong>{stats.regenerated}</strong><span>rewritten ({stats.regenerations} times)</span></div>
              <div><strong>{stats.archived}</strong><span>archived</span></div>
              <div><strong>{stats.deleted}</strong><span>deleted</span></div>
            </div>
            <p className="muted small spaced">
              Tokens, as the provider reported them: {stats.input_tokens.toLocaleString()} in, {stats.output_tokens.toLocaleString()} out.
              {stats.failed_checks > 0 && ` ${stats.failed_checks} cards still failed a check after the retries.`}
              {' '}Your provider's own dashboard shows what you were billed.
            </p>
          </>
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

/** Reading sentences aloud, switched in the app so the device need not be muted. */
function ReadAloud() {
  const [on, setOn] = useState(local.get('autoplay', 'on') === 'on')
  return (
    <section className="glass block">
      <h3>Sound</h3>
      <label className="switch big-switch">
        <input type="checkbox" checked={on} onChange={(e) => { setOn(e.target.checked); local.set('autoplay', e.target.checked ? 'on' : 'off') }} />
        Read each sentence aloud when a card appears
      </label>
      <p className="muted small">You can also switch it during study, with the speaker button.</p>
    </section>
  )
}

/** Who writes the sentences: the service's key, or the learner's own key with any provider. */
function WhoWrites() {
  const [source, setSource] = useState(ownKey.source())
  const [kind, setKind] = useState<ProviderKind>(ownKey.kind())
  const [baseUrl, setBaseUrl] = useState(ownKey.baseUrl())
  const [model, setModel] = useState(ownKey.model())
  const [key, setKey] = useState(ownKey.get())
  const [saved, setSaved] = useState(false)

  const changeKind = (next: ProviderKind) => {
    setKind(next)
    setBaseUrl(PROVIDERS[next].defaultUrl)
    setModel(PROVIDERS[next].models[0] ?? '')
    setSaved(false)
  }
  const save = () => {
    ownKey.setSource(source)
    ownKey.setKind(kind)
    ownKey.setBaseUrl(baseUrl.trim())
    ownKey.setModel(model.trim())
    ownKey.set(key.trim())
    setSaved(true)
  }
  const ready = source === 'service' || (key.trim() && model.trim() && baseUrl.trim())

  return (
    <section className="glass block stack">
      <h3>Who writes the sentences</h3>
      <div className="segmented two" role="radiogroup" aria-label="Key">
        <button role="radio" aria-checked={source === 'service'} className={source === 'service' ? 'on' : ''} onClick={() => { setSource('service'); setSaved(false) }}>
          <strong>The service</strong><small>Its key and model</small>
        </button>
        <button role="radio" aria-checked={source === 'own'} className={source === 'own' ? 'on' : ''} onClick={() => { setSource('own'); setSaved(false) }}>
          <strong>My own key</strong><small>Any provider, paid by you</small>
        </button>
      </div>
      {source === 'own' && (
        <>
          <label>Provider
            <select value={kind} onChange={(e) => changeKind(e.target.value as ProviderKind)}>
              {(Object.keys(PROVIDERS) as ProviderKind[]).map((k) => <option key={k} value={k}>{PROVIDERS[k].label}</option>)}
            </select>
          </label>
          <label>Address<input value={baseUrl} spellCheck={false} onChange={(e) => { setBaseUrl(e.target.value); setSaved(false) }} /></label>
          <label>Model
            <input value={model} list="model-suggestions" spellCheck={false} placeholder={kind === 'openai' ? 'e.g. the name your provider lists' : 'claude-opus-5-5'}
              onChange={(e) => { setModel(e.target.value); setSaved(false) }} />
            <datalist id="model-suggestions">{PROVIDERS[kind].models.map((m) => <option key={m} value={m} />)}</datalist>
          </label>
          <label>API key
            <input type="password" autoComplete="off" spellCheck={false} placeholder="Your key" value={key}
              onChange={(e) => { setKey(e.target.value); setSaved(false) }} />
          </label>
          <p className="muted small">{PROVIDERS[kind].hint} The key stays in this browser: it goes straight to the provider and is never sent to our server, so we and your teacher cannot read it.</p>
        </>
      )}
      <div className="row-gap">
        <button className="btn primary" disabled={!ready} onClick={save}>Save in this browser</button>
        {ownKey.get() && <button className="btn" onClick={() => { ownKey.set(''); setKey(''); setSource('service'); ownKey.setSource('service'); setSaved(true) }}>Forget my key</button>}
      </div>
      {saved && <p className="toast"><Icon name="check" size={16} /> {source === 'own' ? `New sentences will be written with your key, by ${model}.` : 'New sentences will be written by the service.'}</p>}
    </section>
  )
}

import { useCallback, useEffect, useState } from 'react'
import { api, local, speak, type Language, type Rating, type Study as StudyData } from '../api'
import { Icon } from '../components/Icon'

const RATINGS: { rating: Rating; label: string; key: string }[] = [
  { rating: 'again', label: 'Again', key: '1' },
  { rating: 'hard', label: 'Hard', key: '2' },
  { rating: 'good', label: 'Good', key: '3' },
  { rating: 'easy', label: 'Easy', key: '4' },
]

function when(iso: string) {
  const minutes = Math.round((new Date(iso).getTime() - Date.now()) / 60000)
  if (minutes < 1) return 'in a moment'
  if (minutes < 60) return `in ${minutes} min`
  if (minutes < 1440) return `in ${Math.round(minutes / 60)} h`
  return `on ${new Date(iso).toLocaleDateString()}`
}

/** A study session over the chosen decks. The sentence stays where it is: revealing the
 *  answer adds the word's meaning above it and the translation below it, as on an Anki card. */
export function Study({ deckIds, language, onExit }: { deckIds: number[]; language: Language; onExit: () => void }) {
  const [study, setStudy] = useState<StudyData | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [tooHard, setTooHard] = useState(false)
  const [autoplay, setAutoplay] = useState(local.get('autoplay', 'on') === 'on')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const decks = deckIds.join(',')

  const load = useCallback(async () => {
    try {
      setStudy(await api.study(decks ? decks.split(',').map(Number) : []))
      setRevealed(false)
      setTooHard(false)
    } catch (e) {
      setError((e as Error).message)
    }
  }, [decks])
  useEffect(() => { load() }, [load])

  // Read each new card aloud as it appears, for learners who review on the go.
  const cardId = study?.card?.id
  useEffect(() => {
    if (autoplay && study?.card) speak(study.card.sentence, language)
  }, [cardId]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleAutoplay = () => {
    local.set('autoplay', autoplay ? 'off' : 'on')
    if (autoplay) speechSynthesis.cancel()
    setAutoplay(!autoplay)
  }

  const rate = useCallback(async (rating: Rating) => {
    if (!study?.card || busy) return
    setBusy(true)
    try {
      await api.review(study.card.id, rating, tooHard)
      await load()
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(false)
    }
  }, [study, busy, tooHard, load])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') return onExit()
      if (!study?.card) return
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        setRevealed(true)
      } else if (revealed) {
        const match = RATINGS.find((r) => r.key === event.key)
        if (match) rate(match.rating)
        if (event.key.toLowerCase() === 't') setTooHard((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [study, revealed, rate, onExit])

  if (!study) return <div className="focus"><p className="muted">{error || 'Loading…'}</p></div>

  const card = study.card
  const done = study.new_done + study.reviews_done
  const total = done + study.due + study.new

  return (
    <div className="focus">
      <header className="focus-bar">
        <button className="ghost icon-btn" onClick={onExit} aria-label="Leave session"><Icon name="close" /></button>
        <div className="progress" aria-label={`${done} of ${total} done today`}>
          <span style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
        </div>
        <span className="muted small">{study.new} new · {study.due} review</span>
        <button className={`ghost icon-btn ${autoplay ? '' : 'muted-off'}`} onClick={toggleAutoplay}
          aria-pressed={autoplay} title={autoplay ? 'Sentences play aloud' : 'Sentences are silent'}
          aria-label="Play sentences aloud"><Icon name={autoplay ? 'sound' : 'mute'} /></button>
      </header>

      {!card ? (
        <div className="focus-done">
          <div className="burst"><Icon name="check" size={40} /></div>
          <h1>{done > 0 ? 'Session complete' : 'Nothing to study'}</h1>
          <p className="muted">
            {done > 0 ? `You studied ${done} card${done === 1 ? '' : 's'} today. ` : ''}
            {study.next_due ? `The next card returns ${when(study.next_due)}.` : 'Generate cards into these decks to begin.'}
          </p>
          <div className="row-gap center">
            <button className="btn" onClick={load}>Check again</button>
            <button className="btn primary" onClick={onExit}>Back to Today</button>
          </div>
        </div>
      ) : (
        <>
          <div className="stage-card">
            <div className={`study-card ${revealed ? 'revealed' : ''}`} role="button" tabIndex={0}
              onClick={() => setRevealed(true)} aria-label={revealed ? 'Card' : 'Show the answer'}>
              <span className="kind">{study.is_new ? 'New' : 'Review'}</span>
              <p className="card-word">
                {card.word}
                <span className="card-word-meaning">{revealed ? card.word_translation : ''}</span>
              </p>
              <p className="card-sentence">{highlight(card.sentence, card.word_form)}</p>
              <p className="card-translation">{revealed ? card.translation : ''}</p>
              {revealed ? (
                <details className="source-note" onClick={(e) => e.stopPropagation()}>
                  <summary>Where the word came from</summary>
                  <p>{card.text_title ? <><strong>{card.text_title}</strong>: </> : null}{card.source_sentence}</p>
                </details>
              ) : <span className="hint">Tap to show the answer</span>}
              <button className="ghost icon-btn listen" onClick={(e) => { e.stopPropagation(); speak(card.sentence, language) }} aria-label="Listen again"><Icon name="sound" /></button>
            </div>
          </div>

          <footer className={`focus-actions ${revealed ? 'show' : ''}`}>
            <button className={`flag ${tooHard ? 'on' : ''}`} onClick={() => setTooHard(!tooHard)} aria-pressed={tooHard}>
              <Icon name="flag" size={16} /> Too hard <kbd>T</kbd>
            </button>
            <div className="rate-row">
              {RATINGS.map(({ rating, label, key }) => (
                <button key={rating} className={`rate ${rating}`} disabled={busy || !revealed} onClick={() => rate(rating)}>
                  <strong>{label}</strong>
                  <small>in {study.intervals?.[rating]}</small>
                  <kbd>{key}</kbd>
                </button>
              ))}
            </div>
          </footer>
        </>
      )}
      {error && <p className="error center-text">{error}</p>}
    </div>
  )
}

function highlight(sentence: string, form: string) {
  const index = sentence.toLowerCase().indexOf(form.toLowerCase())
  if (!form || index < 0) return sentence
  return (
    <>
      {sentence.slice(0, index)}
      <mark>{sentence.slice(index, index + form.length)}</mark>
      {sentence.slice(index + form.length)}
    </>
  )
}

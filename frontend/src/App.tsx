import { useEffect, useState } from 'react'
import { api, session, type Language, type User } from './api'
import { Icon } from './components/Icon'
import { DeckPage } from './pages/DeckPage'
import { Decks } from './pages/Decks'
import { Home } from './pages/Home'
import { Library } from './pages/Library'
import { Reader } from './pages/Reader'
import { Settings } from './pages/Settings'
import { SignIn } from './pages/SignIn'
import { Study } from './pages/Study'
import { CheckInbox, VerifyLink } from './pages/VerifyEmail'
import { TeachDeck, Teaching } from './pages/Teaching'
import { useRoute } from './router'

const NAV = [
  { path: '/', label: 'Today', icon: 'today' },
  { path: '/decks', label: 'Decks', icon: 'cards' },
  { path: '/texts', label: 'Texts', icon: 'library' },
  { path: '/teaching', label: 'Teaching', icon: 'teach' },
  { path: '/settings', label: 'Settings', icon: 'settings' },
]

export default function App() {
  const [path, query, go] = useRoute()
  const [language, setLanguage] = useState<Language>('de')
  const [known, setKnown] = useState<Language>('en')
  // undefined while checking the session, null when nobody is signed in.
  const [user, setUser] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    session.onSignedOut = () => setUser(null)
    session.onUnverified = () => setUser((u) => (u ? { ...u, verified: false } : u))
    api.me().then(setUser, () => setUser(null))
  }, [])

  // The target language decides which voice reads sentences aloud. A learner who has not
  // saved their settings yet starts on Settings: level and languages shape every sentence.
  const ready = !!user && user.verified
  useEffect(() => {
    if (!ready) return
    api.profile().then((p) => {
      setLanguage(p.target_language)
      setKnown(p.known_language)
      // A teacher can open their students' decks without setting up their own learning first.
      const teaching = path === '/teaching' || path.startsWith('/teach/')
      if (!p.set_up && path !== '/settings' && !teaching) go('/settings')
    }).catch(() => {})
  }, [path, ready, go])

  // The link in the verification email; it works whether or not this browser is signed in.
  if (path === '/verify') {
    return <VerifyLink token={query.get('token') ?? ''} onDone={(u) => { setUser(u); go(u ? '/settings' : '/') }} />
  }
  if (user === undefined) return null
  if (user === null) return <SignIn onSignedIn={(u) => { setUser(u); go('/') }} />
  if (!user.verified) {
    return <CheckInbox user={user} onVerified={(u) => { setUser(u); go('/settings') }} onSignedOut={() => setUser(null)} />
  }

  if (path === '/study') {
    const deckIds = (query.get('decks') ?? '').split(',').filter(Boolean).map(Number)
    return <Study deckIds={deckIds} language={language} onExit={() => go('/')} />
  }

  const text = path.match(/^\/text\/(\d+)$/)
  const deck = path.match(/^\/deck\/(\d+)$/)
  const teach = path.match(/^\/teach\/(\d+)$/)
  const active = text ? '/texts' : deck ? '/decks' : teach ? '/teaching' : path

  return (
    <div className="shell">
      <nav className="rail">
        <a className="brand" href="#/" aria-label="Sentence Cards">
          <span className="logo" />
          <span className="brand-name">Sentences</span>
        </a>
        <div className="rail-links">
          {NAV.map((item) => (
            <a key={item.path} href={`#${item.path}`} className={active === item.path ? 'active' : ''}>
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
      <main className="stage">
        {text ? (
          <Reader key={text[1]} textId={Number(text[1])} />
        ) : deck ? (
          <DeckPage key={deck[1]} deckId={Number(deck[1])} language={language} known={known} />
        ) : teach ? (
          <TeachDeck key={teach[1]} deckId={Number(teach[1])} language={language} />
        ) : path === '/teaching' ? (
          <Teaching />
        ) : path === '/decks' ? (
          <Decks />
        ) : path === '/texts' ? (
          <Library />
        ) : path === '/settings' ? (
          <Settings user={user} onSignedOut={() => setUser(null)} />
        ) : (
          <Home />
        )}
      </main>
    </div>
  )
}

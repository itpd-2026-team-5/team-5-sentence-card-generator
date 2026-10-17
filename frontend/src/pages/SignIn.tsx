import { useState } from 'react'
import { api, type User } from '../api'

export function SignIn({ onSignedIn }: { onSignedIn: (user: User) => void }) {
  const [mode, setMode] = useState<'in' | 'up'>('in')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      onSignedIn(mode === 'in' ? await api.login(email, password) : await api.register(fullName, email, password))
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="signin">
      <form className="glass block stack signin-card" onSubmit={submit}>
        <a className="brand" href="#/"><span className="logo" /><span className="brand-name">Sentences</span></a>
        <h1>{mode === 'in' ? 'Welcome back.' : 'Create your account.'}</h1>
        <p className="muted">
          {mode === 'in' ? 'Sign in to study your decks, or to check the decks your students shared with you.'
            : 'Learners and teachers use the same account: a teacher sees only the decks a student shares.'}
        </p>
        {mode === 'up' && (
          <label>Full name<input required autoFocus minLength={2} autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Anna Schmidt" /></label>
        )}
        <label>Email<input type="email" required autoFocus={mode === 'in'} autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Password<input type="password" required minLength={8} autoComplete={mode === 'in' ? 'current-password' : 'new-password'}
          value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {mode === 'up' && <p className="muted small">At least 8 characters. We will email you a link to confirm your address.</p>}
        <button className="btn primary" type="submit" disabled={busy}>{mode === 'in' ? 'Sign in' : 'Create account'}</button>
        {error && <p className="error">{error}</p>}
        <button type="button" className="ghost link" onClick={() => { setMode(mode === 'in' ? 'up' : 'in'); setError('') }}>
          {mode === 'in' ? 'New here? Create an account' : 'Have an account? Sign in'}
        </button>
      </form>
    </div>
  )
}

import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Mode = 'login' | 'register'

type User = {
  id: number
  username: string
}

type AuthResponse = {
  access_token: string
  user: User | null
}

type ApiError = {
  message?: string
}

async function readError(response: Response) {
  const body = (await response.json().catch(() => null)) as ApiError | null
  return body?.message ?? `Request failed (${response.status})`
}

function App() {
  const [mode, setMode] = useState<Mode>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const clearFeedback = () => {
    setMessage('')
    setError('')
  }

  const changeMode = (nextMode: Mode) => {
    setMode(nextMode)
    clearFeedback()
  }

  const authenticate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    clearFeedback()
    setLoading(true)

    try {
      const response = await fetch(`/auth/${mode}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) throw new Error(await readError(response))

      const data = (await response.json()) as AuthResponse
      setAccessToken(data.access_token)
      setUser(data.user)
      setPassword('')
      setMessage(mode === 'login' ? 'Welcome back.' : 'Your account is ready.')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const refreshAccessToken = async () => {
    const response = await fetch('/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    })

    if (!response.ok) throw new Error(await readError(response))

    const data = (await response.json()) as AuthResponse
    setAccessToken(data.access_token)
    return data.access_token
  }

  const loadProtectedContent = async () => {
    clearFeedback()
    setLoading(true)

    try {
      let token = accessToken

      if (!token) token = await refreshAccessToken()

      let response = await fetch('/api/me', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.status === 401) {
        token = await refreshAccessToken()
        response = await fetch('/api/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
      }

      if (!response.ok) throw new Error(await readError(response))
      setMessage(await response.text())
    } catch (caught) {
      setAccessToken(null)
      setUser(null)
      setError(caught instanceof Error ? caught.message : 'Could not load content')
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    clearFeedback()
    setLoading(true)

    try {
      const response = await fetch('/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })

      if (!response.ok) throw new Error(await readError(response))
      setAccessToken(null)
      setUser(null)
      setMessage('You are signed out.')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not sign out')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="shell">
      <section className="intro" aria-labelledby="page-title">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>Secure App</span>
        </div>
        <div>
          <p className="eyebrow">Simple Authentication</p>
          <h1 id="page-title">A small, secure place to sign in.</h1>
          <p className="lead">
            Create an account, sign in, and open content protected by the Rust API.
          </p>
        </div>
        <p className="footnote">React frontend · Rust backend</p>
      </section>

      <section className="panel" aria-label="Authentication">
        {accessToken ? (
          <div className="account">
            <div className="success-icon" aria-hidden="true">✓</div>
            <p className="eyebrow">Signed in</p>
            <h2>{user ? `Hello, ${user.username}` : 'Session restored'}</h2>
            <p className="muted">Your session is active and ready to use.</p>

            <button className="primary" type="button" onClick={loadProtectedContent} disabled={loading}>
              {loading ? 'Loading…' : 'Open protected content'}
            </button>
            <button className="secondary" type="button" onClick={logout} disabled={loading}>
              Sign out
            </button>
          </div>
        ) : (
          <>
            <div className="tabs" role="tablist" aria-label="Authentication method">
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'login'}
                className={mode === 'login' ? 'active' : ''}
                onClick={() => changeMode('login')}
              >
                Sign in
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'register'}
                className={mode === 'register' ? 'active' : ''}
                onClick={() => changeMode('register')}
              >
                Create account
              </button>
            </div>

            <div className="form-heading">
              <h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
              <p className="muted">
                {mode === 'login'
                  ? 'Enter your details to continue.'
                  : 'Choose a username and a secure password.'}
              </p>
            </div>

            <form onSubmit={authenticate}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                placeholder="yourname"
                required
              />

              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                placeholder="At least 8 characters"
                minLength={mode === 'register' ? 8 : undefined}
                required
              />

              <button className="primary" type="submit" disabled={loading}>
                {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
              </button>
            </form>

            <button className="text-button" type="button" onClick={loadProtectedContent} disabled={loading}>
              Already have a session? Restore it
            </button>
          </>
        )}

        <div className="feedback" aria-live="polite">
          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}
        </div>
      </section>
    </main>
  )
}

export default App

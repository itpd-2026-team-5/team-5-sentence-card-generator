import { callClaude, ownKey, type LLMRequest } from './llm'

export type Language = 'en' | 'de' | 'ru'
export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
export type Mark = 'learn' | 'ignore'

export interface Profile {
  known_language: Language
  target_language: Language
  level: Level
  sentence_min_words: number
  sentence_max_words: number
  sentence_max_chars: number
  placement_tests?: Record<string, string>
  set_up?: boolean
}

export interface Deck {
  id: number
  name: string
  instructions: string
  cards: number
  due: number
  new: number
  needs_check: number
}

export interface TextSummary {
  id: number
  title: string
  position: number
  to_learn: number
  cards: number
}

export interface TextDetail {
  id: number
  title: string
  body: string
  sentences: { text: string; words: string[]; tokens: { text: string; word: boolean }[] }[]
  marks: Record<string, Mark>
}

export interface Card {
  id: number
  text_id: number | null
  text_title: string
  word: string
  word_form: string
  word_translation: string
  source_sentence: string
  sentence: string
  translation: string
  status: 'active' | 'flagged' | 'bad'
  problems: string[]
  position: number
  edited: boolean
  needs_check: boolean
  note: string
  deck_ids: number[]
}

export type CardChanges = Partial<
  Pick<Card, 'sentence' | 'translation' | 'word_form' | 'word_translation' | 'needs_check' | 'note'>
> & { status?: 'active' | 'bad' }

export interface Usage {
  cards: number
  requests: number
  input_tokens: number
  output_tokens: number
}

export type Rating = 'again' | 'hard' | 'good' | 'easy'

export interface Study {
  card: Card | null
  intervals: Record<Rating, string> | null
  is_new: boolean
  due: number
  new: number
  next_due: string | null
  new_done: number
  reviews_done: number
}

export interface User {
  id: number
  email: string
  full_name: string
  verified: boolean
}

export interface Share {
  email: string
  created_at: string
}

export interface TaughtDeck {
  id: number
  name: string
  instructions: string
  student: string
  cards: number
  needs_check: number
  bad: number
}

export const LANGUAGES: Record<Language, string> = {
  en: 'English',
  de: 'German',
  ru: 'Russian',
}

/** Called when the server says nobody is signed in, so the app can show the sign-in page. */
export const session = { onSignedOut: () => {}, onUnverified: () => {} }

async function request<T>(method: string, path: string, body?: unknown, headers: Record<string, string> = {}): Promise<T> {
  const response = await fetch(`/api${path}`, {
    method,
    headers: { ...headers, ...(body === undefined ? {} : { 'Content-Type': 'application/json' }) },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  if (response.status === 401 && !path.startsWith('/auth/')) session.onSignedOut()
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    if (response.status === 409 && error.detail === 'needs_llm') throw new NeedsLLM(error.llm_request)
    if (response.status === 403 && error.detail === 'verify_email') session.onUnverified()
    const detail = typeof error.detail === 'string' ? error.detail : response.statusText
    throw new Error(detail)
  }
  return response.status === 204 ? (undefined as T) : response.json()
}

/** The server built an LLM request for the browser to send with the learner's own key. */
class NeedsLLM extends Error {
  llmRequest: LLMRequest
  constructor(llmRequest: LLMRequest) {
    super('needs_llm')
    this.llmRequest = llmRequest
  }
}

/** Every call that writes sentences. With the learner's own key, the server hands the request
 *  to the browser, which sends it to Claude and repeats the call with the answer. */
async function withLLM<T>(method: string, path: string, body: Record<string, unknown>): Promise<T> {
  if (!ownKey.get()) return request<T>(method, path, body)
  const browser = { 'X-LLM': 'browser' }
  try {
    return await request<T>(method, path, body, browser)
  } catch (error) {
    if (!(error instanceof NeedsLLM)) throw error
    const output = await callClaude(error.llmRequest)
    return request<T>(method, path, { ...body, llm_output: output }, browser)
  }
}

export const api = {
  me: () => request<User>('GET', '/auth/me'),
  register: (fullName: string, email: string, password: string) =>
    request<User>('POST', '/auth/register', { full_name: fullName, email, password }),
  verify: (token: string) => request<User>('POST', '/auth/verify', { token }),
  resend: () => request<void>('POST', '/auth/resend'),
  login: (email: string, password: string) => request<User>('POST', '/auth/login', { email, password }),
  logout: () => request<void>('POST', '/auth/logout'),

  shares: (deckId: number) => request<Share[]>('GET', `/decks/${deckId}/shares`),
  share: (deckId: number, email: string) => request<Share>('POST', `/decks/${deckId}/shares`, { email }),
  unshare: (deckId: number, email: string) =>
    request<void>('DELETE', `/decks/${deckId}/shares/${encodeURIComponent(email)}`),
  teaching: () => request<TaughtDeck[]>('GET', '/teaching'),
  taughtCards: (deckId: number) => request<Card[]>('GET', `/teaching/${deckId}/cards`),

  profile: () => request<Profile>('GET', '/profile'),
  saveProfile: (profile: Profile) => request<Profile>('PUT', '/profile', profile),

  decks: () => request<Deck[]>('GET', '/decks'),
  createDeck: (name: string, instructions: string) =>
    request<Deck>('POST', '/decks', { name, instructions }),
  updateDeck: (id: number, changes: Partial<Pick<Deck, 'name' | 'instructions'>>) =>
    request<Deck>('PATCH', `/decks/${id}`, changes),
  deleteDeck: (id: number) => request<void>('DELETE', `/decks/${id}`),

  texts: () => request<TextSummary[]>('GET', '/texts'),
  createText: (title: string, body: string) =>
    request<TextSummary>('POST', '/texts', { title, body }),
  updateText: (id: number, title: string, body: string) =>
    request<TextDetail>('PUT', `/texts/${id}`, { title, body }),
  deleteText: (id: number) => request<void>('DELETE', `/texts/${id}`),
  text: (id: number) => request<TextDetail>('GET', `/texts/${id}`),
  find: (id: number, word: string) =>
    request<string[]>('GET', `/texts/${id}/find?word=${encodeURIComponent(word)}`),
  mark: (id: number, word: string, sentence: string, status: Mark | 'none') =>
    request<void>('PUT', `/texts/${id}/marks`, { word, sentence, status }),
  generate: (id: number, deckId: number) =>
    withLLM<{ created: Card[] }>('POST', `/texts/${id}/generate`, { deck_id: deckId }),

  cards: (filter: { deckId?: number; textId?: number; status?: string; needsCheck?: boolean } = {}) => {
    const query = new URLSearchParams()
    if (filter.deckId !== undefined) query.set('deck_id', String(filter.deckId))
    if (filter.textId !== undefined) query.set('text_id', String(filter.textId))
    if (filter.status) query.set('status', filter.status)
    if (filter.needsCheck !== undefined) query.set('needs_check', String(filter.needsCheck))
    return request<Card[]>('GET', `/cards${query.size ? `?${query}` : ''}`)
  },
  updateCard: (id: number, changes: CardChanges) => request<Card>('PATCH', `/cards/${id}`, changes),
  setCardDecks: (id: number, deckIds: number[]) =>
    request<Card>('PUT', `/cards/${id}/decks`, { deck_ids: deckIds }),
  regenerateCard: (id: number, feedback: string) =>
    withLLM<Card>('POST', `/cards/${id}/regenerate`, { feedback }),
  moreCards: (id: number, count: number) =>
    withLLM<{ created: Card[] }>('POST', `/cards/${id}/more`, { count }),
  reorderCards: (ids: number[]) => request<void>('PUT', '/cards/order', { ids }),
  deleteCard: (id: number) => request<void>('DELETE', `/cards/${id}`),
  usage: () => request<Usage>('GET', '/usage'),

  study: (deckIds: number[]) => request<Study>('GET', `/study?decks=${deckIds.join(',')}`),
  review: (id: number, rating: Rating, tooHard: boolean) =>
    request<{ card_id: number; due: string; reps: number }>('POST', `/cards/${id}/review`, {
      rating,
      too_hard: tooHard,
    }),
}

const VOICES: Record<Language, string> = { en: 'en-US', de: 'de-DE', ru: 'ru-RU' }

/** Read a sentence aloud with the browser's own voice. */
export function speak(text: string, language: Language) {
  if (!('speechSynthesis' in window)) return
  speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = VOICES[language]
  speechSynthesis.speak(utterance)
}

export { local } from './storage'

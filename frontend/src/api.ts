import { callLLM, ownKey, type LLMRequest } from './llm'

export type Language = 'en' | 'de' | 'ru'
export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
export type Mark = 'learn' | 'ignore'

/** A word marked in one sentence; the word and its sentence are the mark's identity. */
export interface WordMark {
  word: string
  sentence: string
  status: Mark
  gloss: string
  decks: string[]
}

export interface Profile {
  known_language: Language
  target_language: Language
  levels: Partial<Record<Language, Level>>
  sentence_min_words: number
  sentence_max_words: number
  sentence_min_chars: number
  sentence_max_chars: number
  placement_tests?: Record<string, string>
  set_up?: boolean
  study_deck_ids?: number[]
}

export interface Deck {
  id: number
  name: string
  description: string
  instructions: string
  known_language: Language
  target_language: Language
  level: Level | ''
  effective_level: Level
  new_per_day: number
  reviews_per_day: number
  cards: number
  due: number
  new: number
  needs_check: number
  archived: number
  to_regenerate: number
  teachers: string[]
}

export type DeckFields = Pick<Deck, 'name' | 'description' | 'instructions' | 'known_language' | 'target_language' | 'level' | 'new_per_day' | 'reviews_per_day'>

export interface TextSummary {
  id: number
  title: string
  source_url: string
  position: number
  to_learn: number
  cards: number
}

export interface TextDetail {
  id: number
  title: string
  source_url: string
  notes: string
  body: string
  sentences: { text: string; words: string[]; tokens: { text: string; word: boolean }[] }[]
  marks: WordMark[]
}

export interface Card {
  id: number
  text_id: number | null
  text_title: string
  word: string
  word_form: string
  word_translation: string
  highlight: string
  instructions: string
  source_sentence: string
  sentence: string
  translation: string
  status: 'active' | 'flagged' | 'archived'
  problems: string[]
  position: number
  edited: boolean
  needs_check: boolean
  note: string
  needs_regeneration: boolean
  regenerations: number
  teacher_checked_at: string | null
  deck_ids: number[]
  text_exists: boolean
  can_ask_teacher: boolean
}

export type CardChanges = Partial<
  Pick<Card, 'sentence' | 'translation' | 'word_form' | 'word_translation' | 'needs_check' | 'note' | 'needs_regeneration'>
> & { status?: 'active' | 'archived'; teacher_checked?: boolean }

export interface Stats {
  input_tokens: number
  output_tokens: number
  cards: number
  kept_as_generated: number
  edited: number
  regenerated: number
  regenerations: number
  archived: number
  deleted: number
  failed_checks: number
}

export type Rating = 'again' | 'hard' | 'good' | 'easy'

export interface Study {
  card: Card | null
  intervals: Record<Rating, string> | null
  is_new: boolean
  new: number
  review: number
  again: number
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
  description: string
  instructions: string
  known_language: Language
  target_language: Language
  student: string
  student_name: string
  cards: number
  needs_check: number
  to_check: number
  archived: number
}

export interface TextFields {
  title: string
  body: string
  source_url: string
  notes: string
}

export const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

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
  if (!ownKey.inUse()) return request<T>(method, path, body)
  const browser = { 'X-LLM': 'browser' }
  try {
    return await request<T>(method, path, body, browser)
  } catch (error) {
    if (!(error instanceof NeedsLLM)) throw error
    const output = await callLLM(error.llmRequest)
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
  saveStudyDecks: (deckIds: number[]) => request<Profile>('PUT', '/profile/study-decks', { deck_ids: deckIds }),

  decks: () => request<Deck[]>('GET', '/decks'),
  createDeck: (fields: Partial<DeckFields> & { name: string }) => request<Deck>('POST', '/decks', fields),
  updateDeck: (id: number, changes: Partial<DeckFields>) => request<Deck>('PATCH', `/decks/${id}`, changes),
  regenerateMarked: (id: number) =>
    withLLM<{ regenerated: Card[]; remaining: number }>('POST', `/decks/${id}/regenerate-marked`, {}),
  deleteDeck: (id: number) => request<void>('DELETE', `/decks/${id}`),

  texts: () => request<TextSummary[]>('GET', '/texts'),
  createText: (fields: TextFields) => request<TextSummary>('POST', '/texts', fields),
  updateText: (id: number, fields: TextFields) => request<TextDetail>('PUT', `/texts/${id}`, fields),
  reorderTexts: (ids: number[]) => request<void>('PUT', '/texts/order', { ids }),
  reorderDecks: (ids: number[]) => request<void>('PUT', '/decks/order', { ids }),
  deleteText: (id: number) => request<void>('DELETE', `/texts/${id}`),
  text: (id: number) => request<TextDetail>('GET', `/texts/${id}`),
  find: (id: number, word: string) =>
    request<string[]>('GET', `/texts/${id}/find?word=${encodeURIComponent(word)}`),
  mark: (id: number, word: string, sentence: string, status: Mark | 'none') =>
    request<void>('PUT', `/texts/${id}/marks`, { word, sentence, status }),
  generate: (id: number, deckId: number) =>
    withLLM<{ created: Card[]; rewritten: number; warning: string }>('POST', `/texts/${id}/generate`, { deck_id: deckId }),
  gloss: (id: number) => withLLM<TextDetail>('POST', `/texts/${id}/glosses`, {}),

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
  regenerateCard: (id: number, feedback: string, instructions?: string) =>
    withLLM<Card>('POST', `/cards/${id}/regenerate`, instructions === undefined ? { feedback } : { feedback, instructions }),
  moreCards: (id: number, count: number) =>
    withLLM<{ created: Card[] }>('POST', `/cards/${id}/more`, { count }),
  reorderCards: (ids: number[]) => request<void>('PUT', '/cards/order', { ids }),
  deleteCard: (id: number) => request<void>('DELETE', `/cards/${id}`),
  stats: () => request<Stats>('GET', '/stats'),

  study: (deckIds: number[]) => request<Study>('GET', `/study?decks=${deckIds.join(',')}`),
  review: (id: number, rating: Rating, tooHard: boolean) =>
    request<{ card_id: number; due: string; reps: number }>('POST', `/cards/${id}/review`, {
      rating,
      too_hard: tooHard,
    }),
}

const VOICES: Record<Language, string> = { en: 'en-US', de: 'de-DE', ru: 'ru-RU' }

/** Read a sentence aloud with the browser's own voice; onFail runs when it cannot, such as when
 *  the browser has no voice for the language. */
export function speak(text: string, language: Language, onFail?: () => void) {
  if (!('speechSynthesis' in window)) return onFail?.()
  const voices = speechSynthesis.getVoices()
  // An empty list means the voices are still loading, so only a full list without one is a failure.
  if (voices.length && !voices.some((v) => v.lang.toLowerCase().startsWith(language))) return onFail?.()
  speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = VOICES[language]
  utterance.onerror = (e) => { if (e.error !== 'canceled' && e.error !== 'interrupted') onFail?.() }
  speechSynthesis.speak(utterance)
}

export { local } from './storage'

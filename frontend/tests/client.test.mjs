import assert from 'node:assert/strict'
import { after, beforeEach, test } from 'node:test'
import { mkdtempSync, rmSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { join } from 'node:path'
import { buildSync } from 'esbuild'

// Compile the real TypeScript modules; Node's runner needs no browser or test framework.
const root = fileURLToPath(new URL('../', import.meta.url))
const output = mkdtempSync(join(root, 'node_modules/.client-tests-'))
buildSync({
  stdin: {
    contents: "export * from './api'; export * from './llm'",
    resolveDir: join(root, 'src'),
    loader: 'ts',
  },
  bundle: true,
  packages: 'external',
  platform: 'node',
  format: 'esm',
  outfile: join(output, 'client.mjs'),
})
after(() => rmSync(output, { recursive: true, force: true }))

const saved = new Map()
const storage = {
  getItem: (key) => saved.get(key) ?? null,
  setItem: (key, value) => saved.set(key, value),
}
globalThis.localStorage = storage
globalThis.document = { documentElement: { lang: 'en' } }
const { api, session, local, ownKey, parseJson, callLLM, listModels } =
  await import(pathToFileURL(join(output, 'client.mjs')).href)

let calls
let responses
beforeEach(() => {
  saved.clear()
  globalThis.localStorage = storage
  calls = []
  responses = []
  session.onSignedOut = () => {}
  session.onUnverified = () => {}
  globalThis.fetch = async (url, options) => {
    calls.push({ url, ...options })
    assert.ok(responses.length, `Unexpected network call: ${url}`)
    const next = responses.shift()
    if (next instanceof Error) throw next
    return next
  }
})
const json = (value, status = 200) => new Response(JSON.stringify(value), { status })
const request = { system: 'Write a sentence', prompt: 'Haus', schema: { type: 'object' } }
function browserKey() {
  ownKey.set('test-key-only')
  ownKey.setKind('openai')
  ownKey.setBaseUrl('https://provider.invalid/v1/')
  ownKey.setModel('test-model')
}

test('preferences survive unavailable or full browser storage', () => {
  assert.equal(local.get('missing', 'fallback'), 'fallback')
  local.set('empty', '')
  assert.equal(local.get('empty', 'fallback'), '')
  globalThis.localStorage = {
    getItem() { throw new Error('blocked') },
    setItem() { throw new Error('quota') },
  }
  assert.equal(local.get('missing', 'fallback'), 'fallback')
  assert.doesNotThrow(() => local.set('key', 'value'))
})

test('saving a key does not force its use when the service is selected', () => {
  assert.equal(ownKey.inUse(), false)
  browserKey()
  assert.equal(ownKey.inUse(), true)
  ownKey.setSource('service')
  assert.equal(ownKey.inUse(), false)
  assert.equal(ownKey.get(), 'test-key-only')
})

for (const text of ['{"cards":[]}', '```json\n{"cards":[]}\n```', 'Here are the cards: {"cards":[]} Done.']) {
  test(`model output accepts JSON wrapper: ${text.slice(0, 20)}`, () => {
    assert.deepEqual(parseJson(text), { cards: [] })
  })
}
for (const [text, message] of [['No cards', /held no cards/], ['{broken}', /not valid JSON/]]) {
  test(`model output rejects ${text}`, () => assert.throws(() => parseJson(text), message))
}

test('API sends JSON changes and accepts an empty deletion response', async () => {
  responses.push(json({ id: 2, note: 'Keep this' }), new Response(null, { status: 204 }))
  await api.updateCard(2, { note: 'Keep this' })
  assert.equal(calls[0].url, '/api/cards/2')
  assert.equal(calls[0].method, 'PATCH')
  assert.deepEqual(JSON.parse(calls[0].body), { note: 'Keep this' })
  assert.equal(calls[0].headers['Content-Type'], 'application/json')
  assert.equal(await api.deleteCard(2), undefined)
})

test('card filters preserve explicit false and zero values', async () => {
  responses.push(json([]))
  await api.cards({ deckId: 0, needsCheck: false })
  assert.equal(calls[0].url, '/api/cards?deck_id=0&needs_check=false')
})

test('expired sessions request sign-in, but failed login does not', async () => {
  let signedOut = 0
  session.onSignedOut = () => signedOut++
  responses.push(json({ detail: 'Expired' }, 401), json({ detail: 'Wrong password' }, 401))
  await assert.rejects(api.decks(), /Expired/)
  await assert.rejects(api.login('test@example.invalid', 'wrong'), /Wrong password/)
  assert.equal(signedOut, 1)
})

test('unverified accounts request the verification screen', async () => {
  let unverified = 0
  session.onUnverified = () => unverified++
  responses.push(json({ detail: 'verify_email' }, 403))
  await assert.rejects(api.decks(), /verify_email/)
  assert.equal(unverified, 1)
})

test('non-JSON API errors retain the HTTP error message', async () => {
  responses.push(new Response('upstream unavailable', { status: 502, statusText: 'Bad Gateway' }))
  await assert.rejects(api.decks(), /Bad Gateway/)
})

test('service generation makes no browser LLM request', async () => {
  responses.push(json({ created: [] }))
  await api.generate(1, 2)
  assert.equal(calls.length, 1)
  assert.equal(calls[0].headers['X-LLM'], undefined)
})

test('own-key generation sends the key only to the provider and returns checked output to the API', async () => {
  browserKey()
  responses.push(
    json({ detail: 'needs_llm', llm_request: request }, 409),
    json({ choices: [{ message: { content: '{"cards":[]}' } }], usage: { prompt_tokens: 7, completion_tokens: 4 } }),
    json({ created: [{ id: 1 }] }),
  )
  assert.deepEqual(await api.generate(1, 2), { created: [{ id: 1 }] })
  assert.equal(calls[1].url, 'https://provider.invalid/v1/chat/completions')
  assert.equal(calls[1].headers.Authorization, 'Bearer test-key-only')
  assert.equal(JSON.parse(calls[1].body).response_format.json_schema.strict, true)
  for (const call of [calls[0], calls[2]]) {
    assert.equal(call.url, '/api/texts/1/generate')
    assert.equal(call.headers['X-LLM'], 'browser')
    assert.equal(JSON.stringify(call).includes('test-key-only'), false)
  }
  assert.deepEqual(JSON.parse(calls[2].body).llm_output, {
    data: { cards: [] }, model: 'test-model', input_tokens: 7, output_tokens: 4,
  })
})

for (const [status, message] of [[401, /not accepted/], [403, /not accepted/], [429, /rate limiting/], [503, /error \(503\)/]]) {
  test(`provider HTTP ${status} is actionable and does not submit a failed answer`, async () => {
    browserKey()
    responses.push(json({ detail: 'needs_llm', llm_request: request }, 409), json({}, status))
    await assert.rejects(api.generate(1, 2), message)
    assert.equal(calls.length, 2)
  })
}

test('provider network failure reports connection trouble', async () => {
  browserKey()
  responses.push(new TypeError('offline'))
  await assert.rejects(callLLM(request), /Could not reach the provider/)
})

for (const [choice, message] of [
  [{ finish_reason: 'length', message: { content: '{' } }, /cut off/],
  [{ message: { content: '' } }, /no sentences/],
  [{ message: { content: '{broken}' } }, /not valid JSON/],
]) {
  test(`provider answer failure: ${message}`, async () => {
    browserKey()
    responses.push(json({ choices: [choice] }))
    await assert.rejects(callLLM(request), message)
  })
}

test('model lookup normalizes the base URL and returns available model IDs', async () => {
  responses.push(json({ data: [{ id: 'one' }, { id: 'two' }] }))
  assert.deepEqual(await listModels('openai', ' https://provider.invalid/v1/// ', 'test-key'), ['one', 'two'])
  assert.equal(calls[0].url, 'https://provider.invalid/v1/models')
})

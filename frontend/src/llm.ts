import Anthropic from '@anthropic-ai/sdk'
import { local } from './storage'

/** What the server asks the browser to send to the LLM when the learner uses their own key. */
export interface LLMRequest {
  system: string
  prompt: string
  schema: Record<string, unknown>
}

/** The model's answer, passed back to the server, which checks it and makes the cards. */
export interface LLMOutput {
  data: Record<string, unknown>
  model: string
  input_tokens: number
  output_tokens: number
}

/** The two kinds of API a learner's key can be for. A gateway that speaks one of them, such as
 *  an aggregator or a proxy, is the same kind with its own address. */
export type ProviderKind = 'anthropic' | 'openai'

export const PROVIDERS: Record<ProviderKind, { label: string; defaultUrl: string; models: string[]; hint: string }> = {
  anthropic: {
    label: 'Anthropic (Claude), or a gateway that speaks its API',
    defaultUrl: 'https://api.anthropic.com',
    models: ['claude-opus-5-5', 'claude-sonnet-5-5', 'claude-haiku-5-5'],
    hint: 'Leave the address as it is for a key from Anthropic; change it for a gateway.',
  },
  openai: {
    label: 'OpenRouter, or another OpenAI-compatible provider',
    defaultUrl: 'https://openrouter.ai/api/v1',
    // Model names differ per provider; the learner types the one their provider lists.
    models: [],
    hint: 'Any provider with an OpenAI-style /chat/completions endpoint and JSON-schema output. Type the model name exactly as your provider lists it.',
  },
}

/** The learner's own key and provider live only in this browser. The key is sent straight to
 *  the provider, never to our server, so neither we nor a teacher can read it. */
export const ownKey = {
  get: () => local.get('llm-key', local.get('anthropic-key', '')),
  set: (key: string) => local.set('llm-key', key),
  kind: () => local.get('llm-kind', 'anthropic') as ProviderKind,
  setKind: (kind: ProviderKind) => local.set('llm-kind', kind),
  baseUrl: () => local.get('llm-url', PROVIDERS[ownKey.kind()].defaultUrl),
  setBaseUrl: (url: string) => local.set('llm-url', url),
  model: () => local.get('llm-model', local.get('anthropic-model', PROVIDERS[ownKey.kind()].models[0] ?? '')),
  setModel: (model: string) => local.set('llm-model', model),
  /** Which key writes sentences: the learner's own, or the service's. A saved key can stay
   *  saved while the learner uses the service. */
  source: () => local.get('llm-source', ownKey.get() ? 'own' : 'service') as 'own' | 'service',
  setSource: (source: 'own' | 'service') => local.set('llm-source', source),
  inUse: () => ownKey.source() === 'own' && ownKey.get() !== '',
}

/** Effort and the server-side refusal fallback exist on the Claude 5 family only. */
const newClaude = (model: string) => /claude-(opus|sonnet|haiku|fable)-5/.test(model)

export async function callLLM(request: LLMRequest): Promise<LLMOutput> {
  return ownKey.kind() === 'openai' ? callOpenAICompatible(request) : callAnthropic(request)
}

async function callAnthropic(request: LLMRequest): Promise<LLMOutput> {
  const baseURL = ownKey.baseUrl().replace(/\/+$/, '')
  const gateway = baseURL !== PROVIDERS.anthropic.defaultUrl
  const client = new Anthropic({
    apiKey: ownKey.get(),
    // A gateway often takes the key as a bearer token instead of an API key; send both.
    authToken: gateway ? ownKey.get() : null,
    baseURL,
    dangerouslyAllowBrowser: true,
  })
  const model = ownKey.model()
  let response
  try {
    response = newClaude(model)
      ? await client.beta.messages.create({
          model,
          max_tokens: 16000,
          system: request.system,
          messages: [{ role: 'user', content: request.prompt }],
          output_config: { effort: 'low', format: { type: 'json_schema', schema: request.schema } },
          // On a policy decline, the API re-runs the request on its recommended fallback model.
          betas: ['server-side-fallback-2026-07-01'],
          fallbacks: 'default',
        })
      : await client.beta.messages.create({
          model,
          max_tokens: 16000,
          system: request.system,
          messages: [{ role: 'user', content: request.prompt }],
          output_config: { format: { type: 'json_schema', schema: request.schema } },
        })
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) throw new Error('Your API key was not accepted. Check it in Settings.')
    if (error instanceof Anthropic.PermissionDeniedError) throw new Error('Your API key may not use this model.')
    if (error instanceof Anthropic.NotFoundError) throw new Error(`The provider does not know the model “${model}”.`)
    if (error instanceof Anthropic.RateLimitError) throw new Error('The provider is rate limiting your key; try again in a minute.')
    if (error instanceof Anthropic.APIConnectionError) throw new Error('Could not reach the provider from this browser.')
    if (error instanceof Anthropic.APIError) throw new Error(`The provider returned an error (${error.status}).`)
    throw error
  }
  if (response.stop_reason === 'refusal') throw new Error('The model declined to write these sentences.')
  if (response.stop_reason === 'max_tokens') throw new Error('The answer was cut off; try fewer words at once.')
  const texts = response.content.flatMap((block) => (block.type === 'text' ? [block.text] : []))
  if (texts.length === 0) throw new Error('The model returned no sentences.')
  return {
    data: JSON.parse(texts[texts.length - 1]),
    model: response.model,
    input_tokens: response.usage.input_tokens,
    output_tokens: response.usage.output_tokens,
  }
}

/** OpenRouter and other providers with an OpenAI-style chat completions endpoint. */
async function callOpenAICompatible(request: LLMRequest): Promise<LLMOutput> {
  const base = ownKey.baseUrl().replace(/\/+$/, '')
  let response: Response
  try {
    response = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ownKey.get()}` },
      body: JSON.stringify({
        model: ownKey.model(),
        max_tokens: 16000,
        messages: [
          { role: 'system', content: request.system },
          { role: 'user', content: request.prompt },
        ],
        response_format: { type: 'json_schema', json_schema: { name: 'cards', strict: true, schema: request.schema } },
      }),
    })
  } catch {
    throw new Error('Could not reach the provider from this browser.')
  }
  if (response.status === 401 || response.status === 403) throw new Error('Your API key was not accepted. Check it in Settings.')
  if (response.status === 429) throw new Error('The provider is rate limiting your key; try again in a minute.')
  if (!response.ok) throw new Error(`The provider returned an error (${response.status}).`)
  const body = await response.json()
  const choice = body.choices?.[0]
  if (choice?.finish_reason === 'length') throw new Error('The answer was cut off; try fewer words at once.')
  const content = choice?.message?.content
  if (!content) throw new Error('The model returned no sentences.')
  return {
    data: JSON.parse(content),
    model: body.model ?? ownKey.model(),
    input_tokens: body.usage?.prompt_tokens ?? 0,
    output_tokens: body.usage?.completion_tokens ?? 0,
  }
}

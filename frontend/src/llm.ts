import Anthropic from '@anthropic-ai/sdk'
import { local } from './storage'

/** What the server asks the browser to send to Claude when the learner uses their own key. */
export interface LLMRequest {
  system: string
  prompt: string
  schema: Record<string, unknown>
}

/** Claude's answer, passed back to the server, which checks it and makes the cards. */
export interface LLMOutput {
  data: Record<string, unknown>
  model: string
  input_tokens: number
  output_tokens: number
}

export const MODELS = [
  { id: 'claude-opus-5-5', label: 'Claude Opus 5.5 (best sentences)' },
  { id: 'claude-sonnet-5-5', label: 'Claude Sonnet 5.5 (cheaper)' },
  { id: 'claude-haiku-5-5', label: 'Claude Haiku 5.5 (cheapest)' },
]

/** The learner's own API key lives only in this browser. It is sent straight to Anthropic,
 *  never to our server, so neither we nor a teacher can read it. */
export const ownKey = {
  get: () => local.get('anthropic-key', ''),
  set: (key: string) => local.set('anthropic-key', key),
  model: () => local.get('anthropic-model', MODELS[0].id),
  setModel: (model: string) => local.set('anthropic-model', model),
}

export async function callClaude(request: LLMRequest): Promise<LLMOutput> {
  const client = new Anthropic({ apiKey: ownKey.get(), dangerouslyAllowBrowser: true })
  let response
  try {
    response = await client.beta.messages.create({
      model: ownKey.model(),
      max_tokens: 16000,
      system: request.system,
      messages: [{ role: 'user', content: request.prompt }],
      output_config: { effort: 'low', format: { type: 'json_schema', schema: request.schema } },
      // On a policy decline, the API re-runs the request on its recommended fallback model.
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
    })
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) throw new Error('Your API key was not accepted. Check it in Settings.')
    if (error instanceof Anthropic.PermissionDeniedError) throw new Error('Your API key may not use this model.')
    if (error instanceof Anthropic.RateLimitError) throw new Error('Claude is rate limiting your key; try again in a minute.')
    if (error instanceof Anthropic.APIConnectionError) throw new Error('Could not reach Claude from this browser.')
    if (error instanceof Anthropic.APIError) throw new Error(`Claude returned an error (${error.status}).`)
    throw error
  }
  if (response.stop_reason === 'refusal') throw new Error('Claude declined to write these sentences.')
  if (response.stop_reason === 'max_tokens') throw new Error('The answer was cut off; try fewer words at once.')
  const texts = response.content.flatMap((block) => (block.type === 'text' ? [block.text] : []))
  if (texts.length === 0) throw new Error('Claude returned no sentences.')
  return {
    data: JSON.parse(texts[texts.length - 1]),
    model: response.model,
    input_tokens: response.usage.input_tokens,
    output_tokens: response.usage.output_tokens,
  }
}

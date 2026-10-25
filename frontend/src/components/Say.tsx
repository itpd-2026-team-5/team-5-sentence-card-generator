import { speak, type Language } from '../api'
import { Icon } from './Icon'

/** A small speaker button that reads one part of a card aloud, in that part's language. */
export function Say({ text, language, label, onFail }: {
  text: string
  language: Language
  label: string
  onFail?: () => void
}) {
  return (
    <button type="button" className="say" title={`Listen to ${label}`} aria-label={`Listen to ${label}`}
      onClick={(e) => { e.stopPropagation(); speak(text, language, onFail) }}>
      <Icon name="sound" size={15} />
    </button>
  )
}

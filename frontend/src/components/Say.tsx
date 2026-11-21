import { t } from "../i18n";
import { speak, speakCard, type AudioPart, type Language } from "../api";
import { Icon } from "./Icon";

/** A small speaker button that reads one part of a card aloud, in that part's language. */
export function Say({
  text,
  language,
  label,
  onFail,
  cardId,
  part,
  savedText,
}: {
  text: string;
  language: Language;
  label: string;
  onFail?: () => void;
  cardId?: number;
  part?: AudioPart;
  savedText?: string;
}) {
  return (
    <button
      type="button"
      className="say"
      title={t("Listen to {v0}", { v0: label })}
      aria-label={t("Listen to {v0}", { v0: label })}
      onClick={(e) => {
        e.stopPropagation();
        if (cardId && part && text === savedText)
          speakCard(cardId, part, text, language, onFail);
        else speak(text, language, onFail);
      }}
    >
      <Icon name="sound" size={15} />
    </button>
  );
}

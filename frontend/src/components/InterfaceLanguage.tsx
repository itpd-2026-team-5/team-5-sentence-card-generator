import { useEffect, useId, useRef, useState } from "react";
import {
  INTERFACE_LANGUAGES,
  setLocale,
  t,
  useLocale,
  type Locale,
} from "../i18n";
import { Icon } from "./Icon";

export function InterfaceLanguage({ compact = false }: { compact?: boolean }) {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const optionsId = useId();

  useEffect(() => {
    if (!open) return;
    container.current
      ?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')
      ?.focus();
    const outside = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  if (compact)
    return (
      <div
        className="language-switcher"
        ref={container}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setOpen(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            setOpen(false);
            trigger.current?.focus();
          }
        }}
      >
        <button
          ref={trigger}
          type="button"
          className="language-trigger"
          title={t("Interface language")}
          aria-label={`${t("Interface language")}: ${INTERFACE_LANGUAGES[locale]}`}
          aria-expanded={open}
          aria-controls={optionsId}
          onClick={() => setOpen(!open)}
        >
          <Icon name="globe" size={20} />
        </button>
        {open && (
          <div
            id={optionsId}
            className="language-options"
            role="group"
            aria-label={t("Interface language")}
          >
            {Object.entries(INTERFACE_LANGUAGES).map(([code, name]) => (
              <button
                key={code}
                type="button"
                lang={code}
                aria-pressed={locale === code}
                onClick={() => {
                  setLocale(code as Locale);
                  setOpen(false);
                  trigger.current?.focus();
                }}
              >
                <span>{name}</span>
                {locale === code && <Icon name="check" size={16} />}
              </button>
            ))}
          </div>
        )}
      </div>
    );

  return (
    <label>
      {t("Interface language")}
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
      >
        {Object.entries(INTERFACE_LANGUAGES).map(([code, name]) => (
          <option key={code} value={code} lang={code}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}

import { useSyncExternalStore } from "react";
import translations from "./translations.json";
import { local } from "./storage";

export type Locale = "en" | "de" | "ru";
export const INTERFACE_LANGUAGES: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  ru: "Русский",
};
const listeners = new Set<() => void>();
const saved = local.get("interface-language", "en");
let locale: Locale = saved === "de" || saved === "ru" ? saved : "en";

const catalog: Record<string, { de: string; ru: string }> = translations;

/** Only interface copy passes through this function, never learner or generated content. */
export function t(
  message: string,
  values: Record<string, string | number> = {},
): string {
  const translated =
    locale === "en" ? message : (catalog[message]?.[locale] ?? message);
  return translated.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    String(values[name] ?? placeholder),
  );
}

export function setLocale(next: Locale) {
  if (!Object.hasOwn(INTERFACE_LANGUAGES, next)) return;
  locale = next;
  local.set("interface-language", next);
  document.documentElement.lang = next;
  listeners.forEach((listener) => listener());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export function useLocale() {
  return useSyncExternalStore(subscribe, () => locale);
}

document.documentElement.lang = locale;

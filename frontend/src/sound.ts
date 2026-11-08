import { local } from "./storage";

const CHANGE = "sentence-cards-sound-change";

export function soundEnabled() {
  return local.get("autoplay", "on") === "on";
}

export function setSoundEnabled(enabled: boolean) {
  local.set("autoplay", enabled ? "on" : "off");
  window.dispatchEvent(new Event(CHANGE));
}

export function onSoundChange(listener: () => void) {
  window.addEventListener(CHANGE, listener);
  return () => window.removeEventListener(CHANGE, listener);
}

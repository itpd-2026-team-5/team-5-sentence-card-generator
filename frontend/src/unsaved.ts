import { useEffect } from "react";
import { t } from "./i18n";

const drafts = new Set<symbol>();

export function confirmDiscardChanges() {
  return drafts.size === 0 || window.confirm(t("Discard unsaved changes?"));
}

/** Keep editor drafts when navigation or a reload is cancelled. */
export function useUnsavedChanges(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return;
    const draft = Symbol("draft");
    drafts.add(draft);
    const unload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", unload);
    return () => {
      drafts.delete(draft);
      window.removeEventListener("beforeunload", unload);
    };
  }, [dirty]);
}

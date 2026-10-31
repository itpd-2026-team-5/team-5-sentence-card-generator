/** A small preference kept in this browser only; reads and writes never throw. */
export const local = {
  get(key: string, fallback: string) {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* private mode: the preference just is not remembered */
    }
  },
};

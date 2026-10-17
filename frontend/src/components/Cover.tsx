/** A book-cover style tile whose colours come from the title, so each text is recognisable. */
export function coverStyle(title: string): React.CSSProperties {
  let hash = 0
  for (const char of title) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  const hue = hash % 360
  return {
    background: `linear-gradient(145deg, hsl(${hue} 70% 46%), hsl(${(hue + 50) % 360} 65% 28%))`,
  }
}

export function initial(title: string) {
  return (title.trim()[0] ?? '·').toUpperCase()
}

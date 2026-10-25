/** One bar in four parts: new cards studied and left, reviews done and left. */
export function Progress({ newDone, newLeft, reviewsDone, reviewsLeft }: {
  newDone: number
  newLeft: number
  reviewsDone: number
  reviewsLeft: number
}) {
  const total = newDone + newLeft + reviewsDone + reviewsLeft
  const parts = [
    { key: 'new-done', value: newDone, label: 'new studied today' },
    { key: 'review-done', value: reviewsDone, label: 'reviews done today' },
    { key: 'new-left', value: newLeft, label: 'new left' },
    { key: 'review-left', value: reviewsLeft, label: 'reviews left' },
  ]
  return (
    <div className="segments">
      <div className="segment-bar" role="img"
        aria-label={parts.map((p) => `${p.value} ${p.label}`).join(', ')}>
        {total === 0 ? <span className="seg empty" style={{ flex: 1 }} />
          : parts.filter((p) => p.value > 0).map((p) => (
            <span key={p.key} className={`seg ${p.key}`} style={{ flex: p.value }} />
          ))}
      </div>
      <ul className="legend">
        {parts.map((p) => (
          <li key={p.key}><span className={`dot ${p.key}`} />{p.value} {p.label}</li>
        ))}
      </ul>
    </div>
  )
}

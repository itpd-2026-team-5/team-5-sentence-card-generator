/** Move selected decks as one ordered group; a non-selected deck moves alone. */
export function moveDecksTogether<T extends { id: number }>(
  decks: T[],
  selected: number[],
  draggedId: number,
  targetId: number,
  placement: "before" | "after",
): T[] {
  const movingIds = selected.includes(draggedId) ? selected : [draggedId];
  const moving = decks.filter((deck) => movingIds.includes(deck.id));
  if (!moving.length || movingIds.includes(targetId)) return decks;
  const remaining = decks.filter((deck) => !movingIds.includes(deck.id));
  const position = remaining.findIndex((deck) => deck.id === targetId);
  if (position < 0) return decks;
  const next = [...remaining];
  next.splice(position + (placement === "after" ? 1 : 0), 0, ...moving);
  return next;
}

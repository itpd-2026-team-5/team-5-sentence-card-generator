import { useState } from 'react'

/**
 * Drag and drop reordering for a list of items with ids.
 * `save` receives the ids in their new order.
 */
export function useDragReorder<T extends { id: number }>(
  items: T[],
  setItems: (items: T[]) => void,
  save: (ids: number[]) => Promise<unknown>,
) {
  const [dragging, setDragging] = useState<number | null>(null)
  const [over, setOver] = useState<number | null>(null)

  const move = async (id: number, beforeId: number) => {
    if (id === beforeId) return
    const next = items.filter((item) => item.id !== id)
    const moved = items.find((item) => item.id === id)
    if (!moved) return
    next.splice(next.findIndex((item) => item.id === beforeId), 0, moved)
    setItems(next)
    await save(next.map((item) => item.id))
  }

  const props = (id: number) => ({
    draggable: true,
    onDragStart: () => setDragging(id),
    onDragEnd: () => {
      setDragging(null)
      setOver(null)
    },
    onDragOver: (event: React.DragEvent) => {
      event.preventDefault()
      setOver(id)
    },
    onDrop: (event: React.DragEvent) => {
      event.preventDefault()
      if (dragging !== null) move(dragging, id)
      setDragging(null)
      setOver(null)
    },
  })

  return { props, dragging, over, move }
}

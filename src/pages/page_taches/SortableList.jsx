/* =========================================================
   SortableList — liste réordonnable à la souris ou au doigt.
   Utilise les Pointer Events (souris, tactile, stylet).
   Les éléments glissent visuellement, puis l'ordre est
   validé au relâchement via onReorder(nouveauxIds).
   Accessible au clavier : flèches haut / bas sur la poignée.
   ========================================================= */

import { useRef, useState } from 'react'
import { arrayMove } from '../../utils/taskGroups'

/** Icône « poignée » : six points, pour indiquer qu'on peut glisser. */
export function GripIcon() {
  return (
    <svg
      className="sortable-grip-icon"
      viewBox="0 0 10 16"
      width="10"
      height="16"
      aria-hidden="true"
    >
      <circle cx="2" cy="2" r="1.5" />
      <circle cx="8" cy="2" r="1.5" />
      <circle cx="2" cy="8" r="1.5" />
      <circle cx="8" cy="8" r="1.5" />
      <circle cx="2" cy="14" r="1.5" />
      <circle cx="8" cy="14" r="1.5" />
    </svg>
  )
}

export default function SortableList({
  items,
  onReorder,
  renderItem,
  className = '',
  label = 'Déplacer',
}) {
  const containerRef = useRef(null)
  // Données du glisser en cours (lues à chaque mouvement, sans re-rendu)
  const dragRef = useRef(null)
  // État visuel du glisser (déclenche le rendu)
  const [drag, setDrag] = useState(null)

  function handlePointerDown(event, index) {
    // Seul le bouton principal (ou le doigt) démarre un glisser
    if (event.button !== 0) return

    const rects = Array.from(containerRef.current?.children ?? []).map(
      (element) => element.getBoundingClientRect(),
    )

    if (!rects[index]) return

    // Distance entre deux éléments = hauteur + espace entre eux
    const step =
      rects.length > 1
        ? Math.abs(rects[1].top - rects[0].top)
        : rects[index].height

    dragRef.current = {
      index,
      startY: event.clientY,
      rects,
      target: index,
      step,
    }

    event.currentTarget.setPointerCapture?.(event.pointerId)

    setDrag({
      index,
      offset: 0,
      target: index,
      step,
    })
  }

  function handlePointerMove(event) {
    const current = dragRef.current
    if (!current) return

    const offset = event.clientY - current.startY
    const own = current.rects[current.index]
    const center = (own.top + own.bottom) / 2 + offset

    // Nouvelle position = nombre d'autres éléments situés au-dessus du centre
    let target = 0
    current.rects.forEach((rect, i) => {
      if (i !== current.index && (rect.top + rect.bottom) / 2 < center) {
        target += 1
      }
    })

    current.target = target
    setDrag((previous) =>
      previous ? { ...previous, offset, target } : previous,
    )
  }

  function finishDrag() {
    const current = dragRef.current
    dragRef.current = null

    if (current && current.target !== current.index) {
      onReorder?.(arrayMove(items, current.index, current.target))
    }

    setDrag(null)
  }

  function handleKeyDown(event, index) {
    if (event.key === 'ArrowUp' && index > 0) {
      event.preventDefault()
      onReorder?.(arrayMove(items, index, index - 1))
    }

    if (event.key === 'ArrowDown' && index < items.length - 1) {
      event.preventDefault()
      onReorder?.(arrayMove(items, index, index + 1))
    }
  }

  return (
    <div ref={containerRef} className={`sortable-list ${className}`}>
      {items.map((id, index) => {
        const isDragging = drag?.index === index

        // Les autres éléments se décalent pour faire de la place
        let shift = 0
        if (drag && !isDragging) {
          if (index > drag.index && index <= drag.target) {
            shift = -drag.step
          }
          if (index < drag.index && index >= drag.target) {
            shift = drag.step
          }
        }

        let style
        if (isDragging) {
          style = {
            transform: `translateY(${drag.offset}px)`,
            zIndex: 30,
          }
        } else if (shift) {
          style = { transform: `translateY(${shift}px)` }
        }

        const handleProps = {
          role: 'button',
          tabIndex: 0,
          'aria-label': label,
          title: label,
          onPointerDown: (event) => handlePointerDown(event, index),
          onPointerMove: handlePointerMove,
          onPointerUp: finishDrag,
          onPointerCancel: finishDrag,
          onKeyDown: (event) => handleKeyDown(event, index),
        }

        return (
          <div
            key={id}
            className={`sortable-item${isDragging ? ' is-dragging' : ''}`}
            style={style}
          >
            {renderItem(id, handleProps)}
          </div>
        )
      })}
    </div>
  )
}

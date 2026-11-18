import { useState } from 'react'

const STORAGE_KEY = 'epsilon.ui.collapsed.v1'

function loadStates() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

// Lecture / écriture de l'état d'un bloc, pour les blocs gérés hors de ce composant
export function readCollapsedState(id, fallback) {
  const saved = loadStates()
  return typeof saved[id] === 'boolean' ? saved[id] : fallback
}

export function writeCollapsedState(id, open) {
  try {
    const saved = loadStates()
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...saved, [id]: open }))
  } catch {
    // Stockage indisponible : l'état reste valable pour la session.
  }
}

/*
  Bloc repliable. Quand il est fermé, son titre et un résumé restent visibles
  pour retrouver l'information sans dérouler toute la page.
  Le contenu reste monté (utile pour ne pas perdre une saisie en cours).
  L'état ouvert/fermé est mémorisé par identifiant.
*/
export default function CollapsibleSection({
  id,
  title,
  summary = null,
  defaultOpen = true,
  children,
}) {
  const [open, setOpen] = useState(() => {
    const saved = loadStates()
    return typeof saved[id] === 'boolean' ? saved[id] : defaultOpen
  })

  function toggle() {
    setOpen((current) => {
      const next = !current
      try {
        const saved = loadStates()
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...saved, [id]: next }))
      } catch {
        // Stockage indisponible : l'état reste valable pour la session.
      }
      return next
    })
  }

  const bodyId = `collapsible-${id}`

  return (
    <div className={`collapsible ${open ? 'is-open' : 'is-closed'}`}>
      <button
        type="button"
        className="collapsible__toggle"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={toggle}
      >
        <span className="collapsible__text">
          <span className="collapsible__title">{title}</span>
          {summary && !open && <span className="collapsible__summary">{summary}</span>}
        </span>
        <span className="collapsible__chevron" aria-hidden="true">
          {open ? '▲' : '▼'}
        </span>
        <span className="sr-only">{open ? 'Replier' : 'Déplier'}</span>
      </button>

      <div id={bodyId} className="collapsible__body" hidden={!open}>
        {children}
      </div>
    </div>
  )
}

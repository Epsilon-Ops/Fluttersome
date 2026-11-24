/* =========================================================
   DetailModal — coque commune des popups de détail. Chaque
   module fournit son contenu (infos, actions) ; la coque gère
   le fond, la fermeture (clic à l'extérieur, Échap) et le titre.
   ========================================================= */

import { useEffect } from 'react'
import '../styles/components/detail-modal.css'

export default function DetailModal({
  eyebrow,
  title,
  accent = '#1CB0F6',
  onClose,
  children,
  footer,
}) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="detail-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-modal-title"
        style={{ '--detail-accent': accent }}
      >
        <header className="detail-modal-header">
          <div>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h2 id="detail-modal-title">{title}</h2>
          </div>

          <button
            type="button"
            className="detail-modal-close"
            onClick={onClose}
            aria-label="Fermer"
          >
            ×
          </button>
        </header>

        <div className="detail-modal-body">{children}</div>

        {footer && <footer className="detail-modal-footer">{footer}</footer>}
      </section>
    </div>
  )
}

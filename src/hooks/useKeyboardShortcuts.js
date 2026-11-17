import { useEffect } from 'react'

/* Raccourcis : Alt + chiffre pour aller à la page correspondante (1 à 9). */
export default function useKeyboardShortcuts(pages, onNavigate) {
  useEffect(() => {
    function handleKey(event) {
      if (!event.altKey || event.ctrlKey || event.metaKey) return

      const index = Number(event.key) - 1
      if (!Number.isInteger(index) || index < 0 || index >= pages.length) return

      event.preventDefault()
      onNavigate(pages[index].id)
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [pages, onNavigate])
}

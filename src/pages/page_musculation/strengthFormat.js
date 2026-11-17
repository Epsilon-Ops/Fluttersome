export function formatShortDateLabel(date) {
  if (!date) return 'date inconnue'

  const parsed = new Date(`${date}T12:00:00`)

  if (Number.isNaN(parsed.getTime())) return 'date inconnue'

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsed)
}

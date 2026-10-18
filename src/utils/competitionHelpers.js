
export const STORAGE_KEY = 'epsilon.performances.v1'

export const sections = [
  'Vue d’ensemble',
  'Évolution',
  'Forme',
  'Régularité',
  'Objectifs',
  'Historique',
]

export const distances = [
  { value: '60', label: '60 m' },
  { value: '100', label: '100 m' },
  { value: '200', label: '200 m' },
  { value: '400', label: '400 m' },
]

export function makeId() {
  return typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function getToday() {
  const now = new Date()
  const localDate = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000,
  )

  return localDate.toISOString().slice(0, 10)
}

export function loadPerformances() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (!saved) return []

    const parsed = JSON.parse(saved)

    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (item) =>
        item &&
        typeof item.id === 'string' &&
        typeof item.distance === 'string' &&
        Number.isFinite(item.time) &&
        typeof item.date === 'string',
    )
  } catch {
    return []
  }
}

export function formatTime(time) {
  return `${Number(time).toFixed(2)} s`
}

export function formatDate(date) {
  if (!date) return 'Date inconnue'

  const parsedDate = new Date(`${date}T12:00:00`)

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Date inconnue'
  }

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate)
}

export function getDistanceLabel(distance) {
  return (
    distances.find((item) => item.value === distance)?.label ??
    `${distance} m`
  )
}

export function sortPerformancesNewestFirst(performances) {
  return [...performances].sort((a, b) => {
    if (a.date !== b.date) {
      return b.date.localeCompare(a.date)
    }

    return (b.createdAt ?? 0) - (a.createdAt ?? 0)
  })
}

export function getOfficialPerformances(performances) {
  return performances.filter(
    (item) =>
      item.type === 'competition' &&
      item.timing === 'electronic',
  )
}

export function getBestTime(performances) {
  if (performances.length === 0) return null

  return Math.min(...performances.map((item) => item.time))
}

export function getConditionLabel(condition) {
  const labels = {
    outdoor: 'Piste extérieure',
    indoor: 'Piste couverte',
    wet: 'Piste humide',
    windy: 'Conditions venteuses',
    other: 'Autres conditions',
  }

  return labels[condition] || ''
}

export function getWindDirectionLabel(direction) {
  const labels = {
    tailwind: 'Arrière',
    headwind: 'Face',
    crosswind: 'Latéral',
    variable: 'Variable',
  }

  return labels[direction] || ''
}

export function getPerformanceTypeLabel(type) {
  return type === 'competition' ? 'Compétition' : 'Entraînement'
}

export function getTimingLabel(timing) {
  return timing === 'electronic' ? 'Électronique' : 'Manuel'
}


export const TRAINING_STORAGE_KEY = 'epsilon.training.sessions.v1'

export const sessionTypes = [
  'Sprint — Accélération',
  'Sprint — Vitesse maximale',
  'Sprint — Endurance de vitesse',
  'Sprint — Tempo',
  'Technique de course',
  'Pliométrie',
  'Mobilité',
  'Conditionnement',
]

export const runningConditions = [
  'Course classique',
  'Départ arrêté',
  'Départ start',
  'Départ trépieds',
  'Départ lancé',
  'Vite – relâché – vite',
  'Lent – moyen – vite',
  'Progressif',
  'Côtes',
  'Condition personnalisée',
]

export const recordDistances = [
  'none',
  '10',
  '20',
  '30',
  '40',
  '50',
  '60',
  '100',
  '150',
  '200',
  '300',
  '400',
]

export function makeId() {
  return (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  )
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function createEmptyBlock(overrides = {}) {
  return {
    id: makeId(),
    name: 'Nouveau bloc',
    distances: '30, 30, 30',
    condition: 'Départ trépieds',
    customCondition: '',
    recoveryBetweenReps: '2 min',
    recoveryAfterBlock: '4 min',
    targetIntensity: '',
    referenceDistance: 'none',
    results: '',
    notes: '',
    ...overrides,
  }
}

export function loadTrainingSessions() {
  try {
    const saved = localStorage.getItem(TRAINING_STORAGE_KEY)

    if (!saved) return []

    const parsed = JSON.parse(saved)

    if (!Array.isArray(parsed)) return []

    return parsed.map((session) => {
      if (Array.isArray(session.blocks)) {
        return session
      }

      // Migration des séances enregistrées dans l'ancienne version.
      const legacyDistances = Array.isArray(session.distanceSequence)
        ? session.distanceSequence
        : []

      const legacyBlock = createEmptyBlock({
        name: 'Bloc importé',
        distances: legacyDistances.join(', '),
        condition: 'Course classique',
        recoveryBetweenReps: session.recoveryBetweenReps || '',
        recoveryAfterBlock: session.recoveryBetweenBlocks || '',
        targetIntensity:
          session.targetIntensity == null
            ? ''
            : String(session.targetIntensity),
        referenceDistance: session.referenceRecord || 'none',
        results: session.results || '',
      })

      return {
        ...session,
        blocks: legacyDistances.length > 0 ? [legacyBlock] : [],
        plannedDistance:
          session.plannedDistance ??
          legacyDistances.reduce((sum, distance) => sum + distance, 0) *
            Number(session.blockCount || 1),
        plannedRepetitions:
          session.plannedRepetitions ??
          legacyDistances.length * Number(session.blockCount || 1),
      }
    })
  } catch {
    return []
  }
}

export function getLocalDate(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function getMonday(date) {
  const monday = new Date(date)

  monday.setHours(12, 0, 0, 0)
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7))

  return monday
}

export function addDays(date, amount) {
  const result = new Date(date)

  result.setDate(result.getDate() + amount)

  return result
}

export function formatDay(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'short',
  })
    .format(date)
    .replace('.', '')
    .toUpperCase()
}

export function formatShortDate(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
  })
    .format(date)
    .replace('.', '')
}

export function formatWeekRange(monday) {
  const sunday = addDays(monday, 6)

  const start = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
  }).format(monday)

  const end = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(sunday)

  return `${start} – ${end}`
}

export function parseDistances(value = '') {
  if (!value.trim()) return []

  return value
    .split(/[;,]/)
    .map((part) => Number(part.trim()))
}

export function getBlockStats(blocks = []) {
  return blocks.reduce(
    (total, block) => {
      const distances = parseDistances(block.distances || '')

      const validDistances = distances.filter(
        (distance) =>
          Number.isFinite(distance) &&
          distance > 0 &&
          distance <= 10000,
      )

      return {
        distance:
          total.distance +
          validDistances.reduce((sum, distance) => sum + distance, 0),
        repetitions: total.repetitions + validDistances.length,
      }
    },
    {
      distance: 0,
      repetitions: 0,
    },
  )
}

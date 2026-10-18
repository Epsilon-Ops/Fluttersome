
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

export function createEmptyCourse(overrides = {}) {
  return {
    id: makeId(),
    distance: '30',
    condition: 'Départ trépieds',
    customCondition: '',
    recoveryAfter: '2 min',
    targetIntensity: '',
    referenceDistance: 'none',
    result: '',
    notes: '',
    ...overrides,
  }
}

export function createEmptyBlock(overrides = {}) {
  const defaultCourses = [
    createEmptyCourse({ distance: '30' }),
    createEmptyCourse({ distance: '30' }),
    createEmptyCourse({ distance: '30' }),
  ]

  return {
    id: makeId(),
    name: 'Nouveau bloc',
    courses: defaultCourses,
    recoveryAfterBlock: '4 min',
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
      const legacyDistances = Array.isArray(session.distanceSequence)
        ? session.distanceSequence
        : []

      let blocks

      if (Array.isArray(session.blocks)) {
        blocks = session.blocks.map((block) => {
          if (Array.isArray(block.courses)) {
            return {
              ...block,
              courses: block.courses.map((course) => ({
                ...course,
                id: course.id || makeId(),
              })),
            }
          }

          const distances = parseDistances(block.distances || '')

          const oldResults = String(block.results || '')
            .split(/[;,\n]/)
            .map((result) => result.trim())

          const courses = distances.map((distance, index) =>
            createEmptyCourse({
              distance: String(distance),
              condition: block.condition || 'Course classique',
              customCondition: block.customCondition || '',
              recoveryAfter: block.recoveryBetweenReps || '',
              targetIntensity:
                block.targetIntensity == null
                  ? ''
                  : String(block.targetIntensity),
              referenceDistance: block.referenceDistance || 'none',
              result: oldResults[index] || '',
              notes: '',
            }),
          )

          return {
            ...block,
            courses,
            recoveryAfterBlock: block.recoveryAfterBlock || '',
            notes: block.notes || '',
          }
        })
      } else {
        const distances = legacyDistances.length
          ? legacyDistances
          : []

        blocks = distances.length
          ? [
              {
                ...createEmptyBlock({
                  name: 'Bloc importé',
                  recoveryAfterBlock:
                    session.recoveryBetweenBlocks || '',
                  notes: session.notes || '',
                }),
                courses: distances.map((distance, index) =>
                  createEmptyCourse({
                    distance: String(distance),
                    condition: 'Course classique',
                    recoveryAfter:
                      session.recoveryBetweenReps || '',
                    targetIntensity:
                      session.targetIntensity == null
                        ? ''
                        : String(session.targetIntensity),
                    referenceDistance:
                      session.referenceRecord || 'none',
                    result:
                      String(session.results || '')
                        .split(/[;,\n]/)
                        .map((result) => result.trim())[index] || '',
                  }),
                ),
              },
            ]
          : []
      }

      const stats = getBlockStats(blocks)

      return {
        ...session,
        blocks,
        plannedDistance:
          session.plannedDistance ?? stats.distance,
        plannedRepetitions:
          session.plannedRepetitions ?? stats.repetitions,
      }
    })
  } catch (error) {
    console.error('Impossible de charger les séances EPSILON :', error)
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
  if (typeof value !== 'string' || !value.trim()) return []

  return value
    .split(/[;,\n]/)
    .map((part) => Number(part.trim()))
    .filter((distance) => Number.isFinite(distance))
}

export function getBlockStats(blocks = []) {
  return blocks.reduce(
    (total, block) => {
      let distances

      if (Array.isArray(block.courses)) {
        distances = block.courses.map((course) =>
          Number(course.distance),
        )
      } else {
        distances = parseDistances(block.distances || '')
      }

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
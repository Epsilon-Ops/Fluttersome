
export const STRENGTH_STORAGE_KEY = 'epsilon.strength.sessions.v1'

export const strengthFocuses = [
  'Fullbody',
  'Haut du corps',
  'Bas du corps',
  'Jambes',
  'Force maximale',
  'Hypertrophie',
  'Puissance',
  'Pliométrie',
  'Conditionnement',
  'Mobilité / Récupération',
  'Personnalisé',
]

export const strengthCategories = [
  'Force',
  'Pliométrie',
  'Technique',
  'Conditionnement',
  'Mobilité / Récupération',
  'Cardio',
  'Autre',
]

export const muscleGroups = [
  'Quadriceps',
  'Ischio-jambiers',
  'Fessiers',
  'Mollets',
  'Pectoraux',
  'Dos',
  'Épaules',
  'Biceps',
  'Triceps',
  'Abdominaux',
  'Corps entier',
  'Autre',
]

export const strengthEquipment = [
  'Barre',
  'Haltères',
  'Machine',
  'Poids du corps',
  'Élastique',
  'Kettlebell',
  'Poulie',
  'Médecine-ball',
  'Corde à sauter',
  'Tapis de course',
  'Autre',
]

export function makeStrengthId() {
  return (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  )
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function createEmptySet(overrides = {}) {
  return {
    id: makeStrengthId(),
    targetReps: '8',
    targetLoad: '',
    targetDuration: '',
    reps: '',
    load: '',
    duration: '',
    rpe: '',
    rir: '',
    notes: '',
    completed: false,
    ...overrides,
  }
}

export function createEmptyExercise(overrides = {}) {
  return {
    id: makeStrengthId(),
    name: '',
    category: 'Force',
    muscleGroup: 'Corps entier',
    equipment: 'Barre',
    targetSets: '3',
    targetRepRange: '6-8',
    targetLoad: '',
    targetIntensity: '',
    restAfterSet: '2 min',
    restAfterExercise: '2 min',
    notes: '',
    sets: [
      createEmptySet(),
      createEmptySet(),
      createEmptySet(),
    ],
    ...overrides,
  }
}

export function createEmptyBlock(overrides = {}) {
  return {
    id: makeStrengthId(),
    name: 'Nouveau bloc',
    category: 'Force',
    restAfterBlock: '3 min',
    notes: '',
    exercises: [createEmptyExercise()],
    ...overrides,
  }
}

export function createEmptyStrengthSession(overrides = {}) {
  return {
    id: makeStrengthId(),
    date: getLocalDate(),
    title: '',
    focus: 'Fullbody',
    customFocus: '',
    notes: '',
    status: 'planned',
    plannedDuration: '',
    actualDuration: '',
    rpe: '',
    feeling: '',
    blocks: [createEmptyBlock()],
    createdAt: Date.now(),
    ...overrides,
  }
}

export function getLocalDate(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function getStrengthMonday(date = new Date()) {
  const monday = new Date(date)

  monday.setHours(12, 0, 0, 0)
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7))

  return monday
}

export function addStrengthDays(date, amount) {
  const result = new Date(date)
  result.setDate(result.getDate() + amount)
  return result
}

export function formatStrengthDay(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'short',
  })
    .format(date)
    .replace('.', '')
    .toUpperCase()
}

export function formatStrengthShortDate(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
  })
    .format(date)
    .replace('.', '')
}

export function getStrengthSessionStats(blocks = []) {
  return blocks.reduce(
    (total, block) => {
      const exercises = Array.isArray(block.exercises)
        ? block.exercises
        : []

      for (const exercise of exercises) {
        const sets = Array.isArray(exercise.sets) ? exercise.sets : []

        total.exercises += 1

        for (const set of sets) {
          const reps = Number(set.reps)
          const load = Number(set.load)

          if (
            set.completed &&
            Number.isFinite(reps) &&
            reps > 0 &&
            Number.isFinite(load) &&
            load >= 0
          ) {
            total.completedSets += 1
            total.completedReps += reps
            total.liftedVolume += reps * load
          }

          if (set.completed && set.duration !== '') {
            const duration = Number(set.duration)

            if (Number.isFinite(duration) && duration > 0) {
              total.durationSeconds += duration
            }
          }
        }
      }

      return total
    },
    {
      exercises: 0,
      completedSets: 0,
      completedReps: 0,
      liftedVolume: 0,
      durationSeconds: 0,
    },
  )
}

export function estimateOneRepMax(load, reps) {
  const weight = Number(load)
  const repetitions = Number(reps)

  if (
    !Number.isFinite(weight) ||
    !Number.isFinite(repetitions) ||
    weight <= 0 ||
    repetitions < 1 ||
    repetitions > 12
  ) {
    return null
  }

  return Math.round(weight * (1 + repetitions / 30) * 10) / 10
}

export function getSessionRpeLoad(durationMinutes, rpe) {
  const duration = Number(durationMinutes)
  const effort = Number(rpe)

  if (
    !Number.isFinite(duration) ||
    !Number.isFinite(effort) ||
    duration <= 0 ||
    effort < 1 ||
    effort > 10
  ) {
    return null
  }

  return Math.round(duration * effort)
}

export function loadStrengthSessions() {
  try {
    const saved = localStorage.getItem(STRENGTH_STORAGE_KEY)

    if (!saved) return []

    const parsed = JSON.parse(saved)

    if (!Array.isArray(parsed)) return []

    return parsed.map((session) => ({
      ...session,
      blocks: Array.isArray(session.blocks)
        ? session.blocks.map((block) => ({
            ...block,
            exercises: Array.isArray(block.exercises)
              ? block.exercises.map((exercise) => ({
                  ...exercise,
                  sets: Array.isArray(exercise.sets)
                    ? exercise.sets.map((set) => ({
                        ...set,
                        id: set.id || makeStrengthId(),
                      }))
                    : [],
                  id: exercise.id || makeStrengthId(),
                }))
              : [],
            id: block.id || makeStrengthId(),
          }))
        : [],
      id: session.id || makeStrengthId(),
    }))
  } catch (error) {
    console.error('Impossible de charger les séances de musculation :', error)
    return []
  }
}

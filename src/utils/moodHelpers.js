
import {
  getMoodById,
  getMoodCategory,
} from '../constants/moods'

export const MOOD_STORAGE_KEY = 'epsilon_mood_entries_v1'

export function makeMoodId() {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID()
  }

  return `mood-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export function getLocalDateString(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function loadMoodEntries() {
  try {
    if (typeof localStorage === 'undefined') {
      return []
    }

    const stored = localStorage.getItem(MOOD_STORAGE_KEY)

    if (!stored) {
      return []
    }

    const parsed = JSON.parse(stored)

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed
      .filter((entry) => entry && typeof entry === 'object')
      .sort((a, b) => {
        const dateComparison = String(b.date || '').localeCompare(
          String(a.date || '')
        )

        if (dateComparison !== 0) {
          return dateComparison
        }

        return String(b.time || '').localeCompare(
          String(a.time || '')
        )
      })
  } catch {
    return []
  }
}

export function validateMoodEntry(data) {
  if (!data || typeof data !== 'object') {
    return 'Les informations de cette émotion sont invalides.'
  }

  if (typeof data.moodId !== 'string' || !getMoodById(data.moodId)) {
    return 'Choisis une émotion valide.'
  }

  if (
    !Number.isFinite(data.valence) ||
    data.valence < -5 ||
    data.valence > 5
  ) {
    return 'La valence doit être comprise entre -5 et +5.'
  }

  if (
    !Number.isInteger(data.intensity) ||
    data.intensity < 1 ||
    data.intensity > 5
  ) {
    return 'L’intensité doit être comprise entre 1 et 5.'
  }

  if (typeof data.date !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    return 'Choisis une date valide.'
  }

  const [year, month, day] = data.date.split('-').map(Number)
  const parsedDate = new Date(year, month - 1, day)

  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return 'La date choisie n’existe pas.'
  }

  if (
    data.time !== undefined &&
    data.time !== '' &&
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(data.time)
  ) {
    return 'Choisis une heure valide.'
  }

  if (
    data.note !== undefined &&
    typeof data.note !== 'string'
  ) {
    return 'Le commentaire doit être du texte.'
  }

  if (
    data.activities !== undefined &&
    (
      !Array.isArray(data.activities) ||
      !data.activities.every((activity) => typeof activity === 'string')
    )
  ) {
    return 'Les activités sélectionnées sont invalides.'
  }

  return null
}

export function createMoodEntry(data, mood) {
  const validationError = validateMoodEntry(data)

  if (validationError) {
    throw new Error(validationError)
  }

  const validMood = getMoodById(mood?.id)

  if (!validMood || validMood.id !== data.moodId) {
    throw new Error('L’émotion choisie ne correspond pas aux données.')
  }

  const category = getMoodCategory(validMood.category)
  const now = new Date()

  return {
    id: makeMoodId(),
    date: data.date,
    time: data.time || `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
    moodId: validMood.id,
    moodLabel: validMood.label,
    icon: validMood.icon,
    category: validMood.category,
    categoryColor: category?.color || null,
    valence: data.valence,
    intensity: data.intensity,
    activities: [...new Set(data.activities || [])],
    note: (data.note || '').trim(),
    createdAt: Date.now(),
  }
}

export function getMoodEntriesForDate(entries, date) {
  return entries.filter((entry) => entry.date === date)
}

export function getWeeklyMoodEntries(entries, referenceDate = new Date()) {
  const start = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate() - 6
  )

  const startString = getLocalDateString(start)
  const endString = getLocalDateString(referenceDate)

  return entries.filter(
    (entry) => entry.date >= startString && entry.date <= endString
  )
}

export function getMonthlyMoodEntries(entries, referenceDate = new Date()) {
  const year = referenceDate.getFullYear()
  const month = referenceDate.getMonth()

  return entries.filter((entry) => {
    const [entryYear, entryMonth] = entry.date.split('-').map(Number)

    return entryYear === year && entryMonth === month + 1
  })
}

export function getMoodMetrics(entries) {
  const validEntries = entries.filter(
    (entry) =>
      Number.isFinite(entry.valence) &&
      entry.valence >= -5 &&
      entry.valence <= 5 &&
      Number.isFinite(entry.intensity) &&
      entry.intensity >= 1 &&
      entry.intensity <= 5
  )

  if (validEntries.length === 0) {
    return {
      entryCount: 0,
      averageValence: null,
      averageIntensity: null,
      mostFrequentMood: null,
      activityCounts: {},
    }
  }

  const valenceTotal = validEntries.reduce(
    (total, entry) => total + entry.valence,
    0
  )

  const intensityTotal = validEntries.reduce(
    (total, entry) => total + entry.intensity,
    0
  )

  const moodCounts = {}
  const activityCounts = {}

  validEntries.forEach((entry) => {
    moodCounts[entry.moodId] = (moodCounts[entry.moodId] || 0) + 1

    ;(entry.activities || []).forEach((activityId) => {
      activityCounts[activityId] =
        (activityCounts[activityId] || 0) + 1
    })
  })

  const mostFrequentMoodId = Object.keys(moodCounts).sort(
    (a, b) => moodCounts[b] - moodCounts[a]
  )[0]

  return {
    entryCount: validEntries.length,
    averageValence: Number(
      (valenceTotal / validEntries.length).toFixed(1)
    ),
    averageIntensity: Number(
      (intensityTotal / validEntries.length).toFixed(1)
    ),
    mostFrequentMood: {
      id: mostFrequentMoodId,
      count: moodCounts[mostFrequentMoodId],
    },
    activityCounts,
  }
}

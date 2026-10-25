
export const MOOD_STORAGE_KEY = 'epsilon_mood_entries_v1'

export function makeMoodId() {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

/**
 * Renvoie la date locale au format YYYY-MM-DD.
 * Évite le décalage de date que peut provoquer toISOString()
 * dans les fuseaux horaires autres que UTC.
 */
export function getLocalDateString(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

/**
 * Lit les entrées enregistrées.
 * Retourne un tableau vide si le stockage est absent ou invalide.
 */
export function loadMoodEntries() {
  try {
    if (typeof localStorage === 'undefined') return []

    const stored = localStorage.getItem(MOOD_STORAGE_KEY)

    if (!stored) return []

    const parsed = JSON.parse(stored)

    if (!Array.isArray(parsed)) return []

    return parsed
      .filter(
        (entry) =>
          entry &&
          typeof entry.id === 'string' &&
          typeof entry.date === 'string' &&
          typeof entry.moodId === 'string',
      )
      .sort((a, b) => {
        const dateComparison = b.date.localeCompare(a.date)

        if (dateComparison !== 0) return dateComparison

        return Number(b.createdAt || 0) - Number(a.createdAt || 0)
      })
  } catch {
    return []
  }
}

/**
 * Vérifie les valeurs d'une entrée avant enregistrement.
 */
export function validateMoodEntry(data) {
  if (!data || typeof data !== 'object') {
    return 'Les données de l’entrée sont invalides.'
  }

  if (typeof data.moodId !== 'string' || !data.moodId.trim()) {
    return 'Choisis une émotion avant d’enregistrer.'
  }

  if (
    typeof data.valence !== 'number' ||
    !Number.isFinite(data.valence) ||
    data.valence < -5 ||
    data.valence > 5
  ) {
    return 'La valence doit être comprise entre -5 et +5.'
  }

  if (
    typeof data.intensity !== 'number' ||
    !Number.isInteger(data.intensity) ||
    data.intensity < 1 ||
    data.intensity > 5
  ) {
    return 'L’intensité doit être comprise entre 1 et 5.'
  }

  if (
    typeof data.date !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
    Number.isNaN(new Date(`${data.date}T12:00:00`).getTime())
  ) {
    return 'La date de l’entrée est invalide.'
  }

  if (
    data.activities !== undefined &&
    (!Array.isArray(data.activities) ||
      !data.activities.every((activity) => typeof activity === 'string'))
  ) {
    return 'La liste des activités est invalide.'
  }

  if (
    data.note !== undefined &&
    typeof data.note !== 'string'
  ) {
    return 'La note doit être du texte.'
  }

  return ''
}

/**
 * Retourne une copie normalisée d'une entrée.
 * Les informations de l'émotion sont conservées en instantané
 * pour préserver l'historique si la banque d'émotions évolue.
 */
export function createMoodEntry(data, mood) {
  const validationError = validateMoodEntry(data)

  if (validationError) {
    throw new Error(validationError)
  }

  if (!mood || mood.id !== data.moodId) {
    throw new Error('L’émotion choisie est introuvable.')
  }

  return {
    id: makeMoodId(),
    date: data.date,
    time:
      typeof data.time === 'string' &&
      /^([01]\d|2[0-3]):([0-5]\d)$/.test(data.time)
        ? data.time
        : `${String(new Date().getHours()).padStart(2, '0')}:${String(
            new Date().getMinutes(),
          ).padStart(2, '0')}`,
    moodId: mood.id,
    moodLabel: mood.label,
    category: mood.category,
    categoryColor: mood.color || null,
    valence: data.valence,
    intensity: data.intensity,
    activities: [...new Set(data.activities || [])],
    note: (data.note || '').trim(),
    createdAt: Date.now(),
  }
}

/**
 * Renvoie les entrées d'une date donnée.
 */
export function getMoodEntriesForDate(entries, date) {
  return entries.filter((entry) => entry.date === date)
}

/**
 * Renvoie les entrées des sept derniers jours calendaires,
 * aujourd'hui inclus, sans inclure les dates futures.
 */
export function getWeeklyMoodEntries(entries, referenceDate = new Date()) {
  const today = getLocalDateString(referenceDate)
  const firstDay = new Date(referenceDate)

  firstDay.setHours(12, 0, 0, 0)
  firstDay.setDate(firstDay.getDate() - 6)

  const firstDate = getLocalDateString(firstDay)

  return entries.filter(
    (entry) => entry.date >= firstDate && entry.date <= today,
  )
}

/**
 * Renvoie les entrées du mois de la date de référence.
 */
export function getMonthlyMoodEntries(entries, referenceDate = new Date()) {
  const year = referenceDate.getFullYear()
  const month = String(referenceDate.getMonth() + 1).padStart(2, '0')
  const prefix = `${year}-${month}-`

  return entries.filter((entry) => entry.date.startsWith(prefix))
}

/**
 * Calcule des indicateurs simples pour une série d'entrées.
 */
export function getMoodMetrics(entries = []) {
  const validEntries = entries.filter(
    (entry) =>
      Number.isFinite(entry.valence) &&
      entry.valence >= -5 &&
      entry.valence <= 5 &&
      Number.isFinite(entry.intensity) &&
      entry.intensity >= 1 &&
      entry.intensity <= 5,
  )

  if (validEntries.length === 0) {
    return {
      entryCount: 0,
      averageValence: null,
      averageIntensity: null,
      mostFrequentMood: null,
      activityCounts: [],
    }
  }

  const average = (values) =>
    Math.round(
      (values.reduce((sum, value) => sum + value, 0) / values.length) * 10,
    ) / 10

  const moodCounts = new Map()
  const activityCounts = new Map()

  for (const entry of validEntries) {
    moodCounts.set(
      entry.moodId,
      (moodCounts.get(entry.moodId) || 0) + 1,
    )

    for (const activity of new Set(entry.activities || [])) {
      activityCounts.set(
        activity,
        (activityCounts.get(activity) || 0) + 1,
      )
    }
  }

  const mostFrequentMood = [...moodCounts.entries()].sort(
    (a, b) => b[1] - a[1],
  )[0]

  return {
    entryCount: validEntries.length,
    averageValence: average(validEntries.map((entry) => entry.valence)),
    averageIntensity: average(validEntries.map((entry) => entry.intensity)),
    mostFrequentMood: mostFrequentMood
      ? {
          id: mostFrequentMood[0],
          count: mostFrequentMood[1],
        }
      : null,
    activityCounts: [...activityCounts.entries()]
      .map(([id, count]) => ({ id, count }))
      .sort((a, b) => b.count - a.count),
  }
}


export const SLEEP_STORAGE_KEY = 'epsilon_sleep_nights_v1'

export function makeSleepId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export function loadSleepNights() {
  try {
    const stored = localStorage.getItem(SLEEP_STORAGE_KEY)

    if (!stored) return []

    const parsed = JSON.parse(stored)

    if (!Array.isArray(parsed)) return []

    return parsed.sort((a, b) =>
      String(b.date).localeCompare(String(a.date)),
    )
  } catch {
    return []
  }
}

/**
 * Calcule la durée entre l'endormissement estimé et le réveil.
 * Si le réveil est après minuit, on considère qu'il a lieu le lendemain.
 * Retourne une durée en minutes, ou null si les horaires sont invalides.
 */
export function getSleepDuration(fallAsleep, wakeTime) {
  if (!fallAsleep || !wakeTime) return null

  const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/

  if (
    !timePattern.test(fallAsleep) ||
    !timePattern.test(wakeTime)
  ) {
    return null
  }

  const [sleepHours, sleepMinutes] = fallAsleep
    .split(':')
    .map(Number)

  const [wakeHours, wakeMinutes] = wakeTime
    .split(':')
    .map(Number)

  const sleepTotal = sleepHours * 60 + sleepMinutes
  let wakeTotal = wakeHours * 60 + wakeMinutes

  if (wakeTotal <= sleepTotal) {
    wakeTotal += 24 * 60
  }

  const duration = wakeTotal - sleepTotal

  // Une durée de 24 heures ou plus indique probablement une saisie erronée.
  if (duration >= 24 * 60) return null

  return duration
}

export function formatSleepDuration(minutes) {
  if (!Number.isFinite(minutes) || minutes < 0) {
    return '—'
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) return `${remainingMinutes} min`
  if (remainingMinutes === 0) return `${hours} h`

  return `${hours} h ${remainingMinutes.toString().padStart(2, '0')} min`
}

/**
 * Calcule les statistiques sur les sept derniers jours calendaires,
 * en excluant les dates futures.
 */
export function getSleepMetrics(nights = []) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const firstDay = new Date(today)
  firstDay.setDate(firstDay.getDate() - 6)

  const recentNights = nights.filter((night) => {
    if (!night?.date) return false

    const date = new Date(`${night.date}T00:00:00`)

    if (Number.isNaN(date.getTime())) return false

    return date >= firstDay && date <= today
  })

  const validDurations = recentNights
    .map((night) =>
      getSleepDuration(night.fallAsleep, night.wakeTime),
    )
    .filter((duration) => duration !== null)

  const validQualities = recentNights
    .map((night) => Number(night.quality))
    .filter((quality) =>
      Number.isFinite(quality) && quality >= 1 && quality <= 10,
    )

  const averageDuration = validDurations.length
    ? Math.round(
        validDurations.reduce((total, duration) => total + duration, 0) /
          validDurations.length,
      )
    : null

  const averageQuality = validQualities.length
    ? Math.round(
        (validQualities.reduce((total, quality) => total + quality, 0) /
          validQualities.length) *
          10,
      ) / 10
    : null

  return {
    nightCount: recentNights.length,
    averageDuration,
    averageQuality,
  }
}

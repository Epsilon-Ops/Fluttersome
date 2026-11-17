/* Conversion des durées saisies librement en secondes. */

export function parseDurationToSeconds(value) {
  if (value === null || value === undefined) return 0

  if (typeof value === 'number') {
    return Number.isFinite(value) && value > 0 ? Math.round(value) : 0
  }

  const text = String(value).toLowerCase().trim().replace(',', '.')

  if (!text) return 0

  // Format mm:ss
  const clock = text.match(/^(\d+):(\d{1,2})$/)
  if (clock) return Number(clock[1]) * 60 + Number(clock[2])

  // Format « 1 min 30 », « 2 min », « 1min30 », « 45 s »
  const minutesMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:min|m)(?![a-z])/)
  const secondsMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:sec|s)(?![a-z])/)
  const minutesAfter = text.match(/min\s*(\d+)/)

  let total = 0

  if (minutesMatch) total += Number(minutesMatch[1]) * 60
  if (secondsMatch) total += Number(secondsMatch[1])
  if (!secondsMatch && minutesAfter) total += Number(minutesAfter[1])

  if (!minutesMatch && !secondsMatch && !minutesAfter) {
    const plain = text.match(/^\d+(?:\.\d+)?$/)
    if (plain) total = Number(plain[0])
  }

  return Number.isFinite(total) && total > 0 ? Math.round(total) : 0
}

export function formatSeconds(totalSeconds) {
  const seconds = Math.max(0, Math.round(Number(totalSeconds) || 0))
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60

  return `${minutes}:${String(rest).padStart(2, '0')}`
}

/* Temps de course : 12.34 s, ou 1:02.50 pour les longues distances. */
export function formatRaceTime(seconds) {
  const value = Number(seconds)

  if (!Number.isFinite(value) || value <= 0) return '—'

  if (value < 60) return `${value.toFixed(2)} s`

  const minutes = Math.floor(value / 60)
  const rest = (value - minutes * 60).toFixed(2).padStart(5, '0')

  return `${minutes}:${rest}`
}

/* Accepte « 10.72 », « 10,72 », « 1:02.50 ». Renvoie des secondes ou null. */
export function parseRaceTime(value) {
  const text = String(value ?? '').trim().replace(',', '.')

  if (!text) return null

  const clock = text.match(/^(\d+):(\d{1,2}(?:\.\d+)?)$/)

  if (clock) {
    const result = Number(clock[1]) * 60 + Number(clock[2])
    return Number.isFinite(result) && result > 0 ? result : null
  }

  const plain = Number(text)

  return Number.isFinite(plain) && plain > 0 ? plain : null
}

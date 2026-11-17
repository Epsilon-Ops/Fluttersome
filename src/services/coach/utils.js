/* Petites fonctions partagées par les analyses du Coach. */

export const DAY_MS = 24 * 60 * 60 * 1000

export function dateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/* Nombre de jours entre une date « AAAA-MM-JJ » et aujourd'hui (0 = aujourd'hui). */
export function daysAgo(dateString, now = new Date()) {
  if (!dateString) return null
  const from = Date.parse(`${dateString}T12:00:00`)
  const to = Date.parse(`${dateKey(now)}T12:00:00`)
  if (!Number.isFinite(from)) return null
  return Math.round((to - from) / DAY_MS)
}

export function within(dateString, days, now = new Date()) {
  const ago = daysAgo(dateString, now)
  return ago !== null && ago >= 0 && ago < days
}

export function mean(values) {
  const valid = values.filter((value) => Number.isFinite(value))
  if (valid.length === 0) return null
  return valid.reduce((total, value) => total + value, 0) / valid.length
}

export function stdDev(values) {
  const valid = values.filter((value) => Number.isFinite(value))
  if (valid.length < 2) return null
  const avg = mean(valid)
  return Math.sqrt(mean(valid.map((value) => (value - avg) ** 2)))
}

export function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value))
}

export function round(value, digits = 0) {
  if (!Number.isFinite(value)) return null
  const factor = 10 ** digits
  return Math.round(value * factor) / factor
}

/* Minutes depuis minuit, en ramenant les heures de coucher du soir
   (ex. 23:30) et du matin (ex. 00:45) sur une même échelle. */
export function bedtimeToMinutes(hhmm) {
  const match = String(hhmm || '').match(/^(\d{2}):(\d{2})$/)
  if (!match) return null
  let minutes = Number(match[1]) * 60 + Number(match[2])
  if (minutes < 12 * 60) minutes += 24 * 60
  return minutes
}

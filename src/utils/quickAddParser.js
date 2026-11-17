/* =========================================================
   Saisie rapide en français : « Appeler Paul demain à 14h »
   Extrait le titre, la date, l'heure et la priorité.
   ========================================================= */

const WEEKDAYS = {
  dimanche: 0,
  lundi: 1,
  mardi: 2,
  mercredi: 3,
  jeudi: 4,
  vendredi: 5,
  samedi: 6,
}

function toKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function addDays(date, amount) {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + amount)
  return copy
}

export function parseQuickAdd(input, now = new Date()) {
  let text = String(input ?? '').trim()
  const result = {
    title: '',
    due: '',
    dueTime: '',
    priority: '',
    reminderBefore: '',
  }

  if (!text) return result

  const take = (pattern) => {
    const match = text.match(pattern)
    if (match) text = text.replace(match[0], ' ')
    return match
  }

  // Priorité
  if (take(/\b(urgent|urgente)\b/i)) result.priority = 'urgent'
  else if (take(/\b(important|importante)\b/i)) result.priority = 'high'

  // Heure : 14h, 14h30, 9:15
  const time =
    take(/(?:^|\s)(?:à\s+)?(\d{1,2})\s*h\s*(\d{2})?(?=\s|$)/i) ||
    take(/(?:^|\s)(?:à\s+)?(\d{1,2}):(\d{2})(?=\s|$)/)
  if (time) {
    const hour = Number(time[1])
    const minute = Number(time[2] || 0)
    if (hour <= 23 && minute <= 59) {
      result.dueTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
    }
  }

  // Date
  if (take(/\b(aujourd['’]hui|ce soir|ce matin)\b/i)) {
    result.due = toKey(now)
  } else if (take(/\baprès-demain\b|\bapres-demain\b/i)) {
    result.due = toKey(addDays(now, 2))
  } else if (take(/\bdemain\b/i)) {
    result.due = toKey(addDays(now, 1))
  } else {
    const inDays = take(/\bdans\s+(\d{1,2})\s+jours?\b/i)
    const weekday = take(/\b(dimanche|lundi|mardi|mercredi|jeudi|vendredi|samedi)\b/i)
    const numeric = take(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?\b/)

    if (inDays) {
      result.due = toKey(addDays(now, Number(inDays[1])))
    } else if (weekday) {
      const target = WEEKDAYS[weekday[1].toLowerCase()]
      let delta = (target - now.getDay() + 7) % 7
      if (delta === 0) delta = 7
      result.due = toKey(addDays(now, delta))
    } else if (numeric) {
      const day = Number(numeric[1])
      const month = Number(numeric[2]) - 1
      const year = numeric[3] ? Number(numeric[3]) : now.getFullYear()
      const candidate = new Date(year, month, day, 12)
      if (!Number.isNaN(candidate.getTime())) result.due = toKey(candidate)
    }
  }

  // Un rappel est proposé par défaut quand une heure est donnée
  if (result.dueTime && result.due) result.reminderBefore = '10'

  result.title = text
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim()

  result.title = result.title.charAt(0).toUpperCase() + result.title.slice(1)

  return result
}

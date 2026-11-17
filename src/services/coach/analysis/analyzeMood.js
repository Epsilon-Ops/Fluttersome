/* Humeur : tendance sur 7 jours et lien avec la qualité du sommeil. */

import { within, mean, round, daysAgo } from '../utils'
import { getSleepDuration } from '../../../utils/sleepHelpers'

function dailyAverages(entries) {
  const byDay = {}
  for (const entry of entries) {
    if (!Number.isFinite(entry.valence)) continue
    if (!byDay[entry.date]) byDay[entry.date] = []
    byDay[entry.date].push(entry.valence)
  }
  return Object.fromEntries(
    Object.entries(byDay).map(([date, values]) => [date, mean(values)]),
  )
}

export function analyzeMood(context) {
  const { moodEntries, sleepNights, sleepTargetMinutes, now } = context

  const recent = moodEntries.filter((entry) => within(entry.date, 7, now))
  const previous = moodEntries.filter((entry) => {
    const ago = daysAgo(entry.date, now)
    return ago !== null && ago >= 7 && ago < 14
  })

  if (recent.length < 3) {
    return {
      available: false,
      message: 'Note ton humeur au moins 3 fois sur 7 jours pour voir une tendance.',
    }
  }

  const avgRecent = mean(recent.map((entry) => entry.valence))
  const avgPrevious = previous.length >= 3 ? mean(previous.map((entry) => entry.valence)) : null

  // Lien sommeil / humeur : humeur moyenne les jours où la nuit précédente a été suffisante
  const nightByDate = {}
  for (const night of sleepNights) {
    const duration = getSleepDuration(night.fallAsleep, night.wakeTime)
    if (duration !== null) nightByDate[night.date] = duration
  }

  const daily = dailyAverages(moodEntries)
  const goodSleepDays = []
  const shortSleepDays = []

  for (const [date, valence] of Object.entries(daily)) {
    if (!within(date, 30, now)) continue
    const nightDate = new Date(`${date}T12:00:00`)
    nightDate.setDate(nightDate.getDate() - 1)
    const key = `${nightDate.getFullYear()}-${String(nightDate.getMonth() + 1).padStart(2, '0')}-${String(nightDate.getDate()).padStart(2, '0')}`
    const duration = nightByDate[key]
    if (duration === undefined) continue
    if (duration >= sleepTargetMinutes * 0.9) goodSleepDays.push(valence)
    else shortSleepDays.push(valence)
  }

  const sleepLink =
    goodSleepDays.length >= 3 && shortSleepDays.length >= 3
      ? {
          afterGoodSleep: round(mean(goodSleepDays), 1),
          afterShortSleep: round(mean(shortSleepDays), 1),
        }
      : null

  let trend = 'stable'
  if (avgPrevious !== null) {
    const diff = avgRecent - avgPrevious
    if (diff > 0.7) trend = 'hausse'
    else if (diff < -0.7) trend = 'baisse'
  }

  return {
    available: true,
    avgValence: round(avgRecent, 1),
    previousValence: avgPrevious === null ? null : round(avgPrevious, 1),
    trend,
    sleepLink,
    lowRecent: avgRecent < -2,
  }
}

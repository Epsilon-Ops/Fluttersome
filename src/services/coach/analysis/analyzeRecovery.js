/* =========================================================
   Récupération : durée, qualité, dette et régularité du sommeil
   sur les 7 derniers jours.
   ========================================================= */

import { getSleepDuration } from '../../../utils/sleepHelpers'
import { within, mean, stdDev, clamp, round, bedtimeToMinutes } from '../utils'
import { MIN_NIGHTS } from '../readiness/readinessThresholds'

export function analyzeRecovery(context) {
  const { sleepNights, sleepTargetMinutes, now } = context

  const nights = sleepNights.filter((night) => within(night.date, 7, now))

  const durations = nights
    .map((night) => getSleepDuration(night.fallAsleep, night.wakeTime))
    .filter((value) => value !== null)

  if (nights.length < MIN_NIGHTS || durations.length < MIN_NIGHTS) {
    return {
      available: false,
      count: nights.length,
      message: `Enregistre au moins ${MIN_NIGHTS} nuits sur les 7 derniers jours pour analyser ta récupération.`,
    }
  }

  const avgDuration = mean(durations)
  const ratio = avgDuration / sleepTargetMinutes
  const qualities = nights.map((night) => Number(night.quality)).filter((q) => q >= 1 && q <= 10)
  const avgQuality = mean(qualities)

  const bedtimes = nights
    .map((night) => bedtimeToMinutes(night.fallAsleep))
    .filter((value) => value !== null)
  const bedtimeSd = bedtimes.length >= MIN_NIGHTS ? stdDev(bedtimes) : null

  // Dette : écart cumulé à la cible (positif = manque de sommeil)
  const debtMinutes = durations.reduce(
    (total, value) => total + (sleepTargetMinutes - value),
    0,
  )

  const durationScore = clamp(((ratio - 0.6) / 0.4) * 100)
  const qualityScore = avgQuality === null ? null : clamp(avgQuality * 10)
  const regularityScore = bedtimeSd === null ? null : clamp(((90 - bedtimeSd) / 60) * 100)

  const parts = [
    [durationScore, 0.45],
    [qualityScore, 0.35],
    [regularityScore, 0.2],
  ].filter(([value]) => value !== null)

  const weightSum = parts.reduce((total, [, weight]) => total + weight, 0)
  const score = Math.round(parts.reduce((total, [value, weight]) => total + value * weight, 0) / weightSum)

  let label = 'correcte'
  if (score >= 75) label = 'bonne'
  else if (score < 55) label = 'insuffisante'

  return {
    available: true,
    count: nights.length,
    avgDurationMinutes: round(avgDuration),
    targetMinutes: sleepTargetMinutes,
    ratio,
    avgQuality: round(avgQuality, 1),
    debtMinutes: round(debtMinutes),
    bedtimeSdMinutes: round(bedtimeSd),
    score,
    label,
  }
}

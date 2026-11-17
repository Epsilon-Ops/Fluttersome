/* =========================================================
   Charge d'entraînement : volume de sprint (distance) et charge
   de musculation (durée × RPE). Ratio aiguë / chronique sur
   7 jours comparé à la moyenne hebdomadaire des 4 dernières semaines.
   Indicatif : ce n'est pas une mesure physiologique validée.
   ========================================================= */

import { getBlockStats } from '../../../utils/trainingHelpers'
import { getStrengthSessionStats } from '../../../utils/strengthHelpers'
import { within, round } from '../utils'
import { ACWR_OPTIMAL, ACWR_HIGH } from '../readiness/readinessThresholds'

function sprintDistanceOf(session) {
  return getBlockStats(session.blocks || []).distance
}

function strengthLoadOf(session) {
  const stats = getStrengthSessionStats(session.blocks || [])
  const minutes = Number(session.actualDuration) || Math.round(stats.durationSeconds / 60)
  const rpe = Number(session.rpe)

  if (!Number.isFinite(rpe) || rpe < 1 || minutes <= 0) return 0
  return minutes * rpe
}

function ratioFor(items, valueOf, now) {
  const acute = items
    .filter((item) => within(item.date, 7, now))
    .reduce((total, item) => total + valueOf(item), 0)

  const chronic = items
    .filter((item) => within(item.date, 28, now))
    .reduce((total, item) => total + valueOf(item), 0) / 4

  if (chronic <= 0) return { available: false, acute, chronic }

  return {
    available: true,
    acute,
    chronic,
    ratio: acute / chronic,
  }
}

export function analyzeTrainingLoad(context) {
  const { trainingSessions, strengthSessions, now } = context

  const sprint = ratioFor(trainingSessions, sprintDistanceOf, now)
  const strength = ratioFor(strengthSessions, strengthLoadOf, now)

  const usable = [sprint, strength].filter((item) => item.available)

  if (usable.length === 0) {
    return {
      available: false,
      message: 'Il faut des séances enregistrées sur plusieurs semaines pour mesurer ta charge.',
    }
  }

  // On retient le ratio le plus élevé : c'est lui qui signale un risque de surcharge.
  const worst = usable.reduce((max, item) => (item.ratio > max.ratio ? item : max))

  let status = 'optimal'
  if (worst.ratio > ACWR_HIGH) status = 'eleve'
  else if (worst.ratio > ACWR_OPTIMAL[1]) status = 'en_hausse'
  else if (worst.ratio < ACWR_OPTIMAL[0]) status = 'faible'

  return {
    available: true,
    ratio: round(worst.ratio, 2),
    status,
    sprint: sprint.available ? { ratio: round(sprint.ratio, 2), acute: round(sprint.acute) } : null,
    strength: strength.available ? { ratio: round(strength.ratio, 2), acute: round(strength.acute) } : null,
  }
}

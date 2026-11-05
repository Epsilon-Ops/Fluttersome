/* =========================================================
   buildDiagnostics — repères calculés à partir du sommeil et
   des performances (compétition et entraînement).

   Ce sont des observations statistiques prudentes, à partir de
   tes saisies. Ce ne sont jamais des diagnostics médicaux.
   Aucune conclusion n'est produite sans un minimum de données.
   ========================================================= */

import { getSleepDuration, formatSleepDuration } from '../../../utils/sleepHelpers'
import { toDateKey } from '../../../utils/recurrenceHelpers'

const DAY_MS = 24 * 60 * 60 * 1000
const MIN_NIGHTS = 5            // nuits minimum sur 7 jours
const MIN_PERFORMANCES = 3      // performances minimum par groupe comparé
const MIN_TREND_SAMPLES = 6     // performances minimum pour une tendance
const SHORT_NIGHT_MARGIN = 60   // une nuit « courte » = 1 h de moins que la cible
const SPRINT_DISTANCES = ['60', '100', '200', '400']

function daysAgo(dateKey, todayKey) {
  const from = Date.parse(`${dateKey}T12:00:00`)
  const to = Date.parse(`${todayKey}T12:00:00`)

  if (!Number.isFinite(from) || !Number.isFinite(to)) return null

  return Math.round((to - from) / DAY_MS)
}

function average(values) {
  if (values.length === 0) return null
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

function standardDeviation(values) {
  if (values.length < 2) return null
  const mean = average(values)
  return Math.sqrt(average(values.map((value) => (value - mean) ** 2)))
}

// Heure de coucher en minutes ; après minuit, on ajoute 24 h pour que 00:30 suive 23:30
function bedtimeMinutes(time) {
  const match = /^(\d{2}):(\d{2})$/.exec(time ?? '')

  if (!match) return null

  let minutes = Number(match[1]) * 60 + Number(match[2])

  if (minutes < 12 * 60) minutes += 24 * 60

  return minutes
}

function percentChange(from, to) {
  return ((to - from) / from) * 100
}

function analyzeSleep(nights, target, todayKey) {
  const valid = nights
    .map((night) => ({
      ...night,
      duration: getSleepDuration(night.fallAsleep, night.wakeTime),
      ago: night.date ? daysAgo(night.date, todayKey) : null,
    }))
    .filter(
      (night) =>
        night.duration !== null &&
        night.ago !== null &&
        night.ago >= 0 &&
        night.ago <= 13,
    )

  const lastWeek = valid.filter((night) => night.ago <= 6)

  if (lastWeek.length < MIN_NIGHTS) {
    return {
      available: false,
      nightsCount: lastWeek.length,
      averageDuration: null,
      averageQuality: null,
      findings: [
        {
          id: 'sleep-data',
          area: 'sleep',
          level: 'insufficient',
          title: 'Pas encore assez de nuits',
          detail: `Il faut au moins ${MIN_NIGHTS} nuits enregistrées sur les 7 derniers jours pour dégager un repère (tu en as ${lastWeek.length}).`,
        },
      ],
    }
  }

  const findings = []
  const averageDuration = average(lastWeek.map((night) => night.duration))
  const gap = averageDuration - target

  if (gap <= -30) {
    findings.push({
      id: 'sleep-duration-low',
      area: 'sleep',
      level: 'attention',
      title: 'Sommeil en dessous de ta cible',
      detail: `Tu dors en moyenne ${formatSleepDuration(Math.round(averageDuration))} par nuit sur 7 jours, soit environ ${formatSleepDuration(Math.round(-gap))} de moins que ta cible de ${formatSleepDuration(target)}.`,
    })
  } else {
    findings.push({
      id: 'sleep-duration-ok',
      area: 'sleep',
      level: 'positive',
      title: 'Durée proche de ta cible',
      detail: `Tu dors en moyenne ${formatSleepDuration(Math.round(averageDuration))} par nuit sur 7 jours, pour une cible de ${formatSleepDuration(target)}.`,
    })
  }

  const qualities = lastWeek
    .map((night) => Number(night.quality))
    .filter((quality) => Number.isFinite(quality))
  const averageQuality = average(qualities)

  if (averageQuality !== null) {
    if (averageQuality < 6) {
      findings.push({
        id: 'sleep-quality-low',
        area: 'sleep',
        level: 'attention',
        title: 'Qualité de sommeil ressentie basse',
        detail: `Ta qualité de sommeil ressentie est en moyenne de ${averageQuality.toFixed(1)}/10 sur 7 jours.`,
      })
    } else if (averageQuality >= 8) {
      findings.push({
        id: 'sleep-quality-good',
        area: 'sleep',
        level: 'positive',
        title: 'Bonne qualité ressentie',
        detail: `Ta qualité de sommeil ressentie est en moyenne de ${averageQuality.toFixed(1)}/10.`,
      })
    }
  }

  // Régularité des heures de coucher sur 14 jours
  const bedtimes = valid
    .map((night) => bedtimeMinutes(night.fallAsleep))
    .filter((value) => value !== null)
  const spread = bedtimes.length >= MIN_NIGHTS ? standardDeviation(bedtimes) : null

  if (spread !== null) {
    if (spread > 60) {
      findings.push({
        id: 'sleep-bedtime-irregular',
        area: 'sleep',
        level: 'attention',
        title: 'Heure de coucher irrégulière',
        detail: `Tes heures d'endormissement varient d'environ ${Math.round(spread)} min d'un jour à l'autre. Un coucher plus régulier aide souvent la récupération.`,
      })
    } else if (spread <= 30) {
      findings.push({
        id: 'sleep-bedtime-regular',
        area: 'sleep',
        level: 'positive',
        title: 'Coucher régulier',
        detail: `Tes heures d'endormissement ne varient que d'environ ${Math.round(spread)} min.`,
      })
    }
  }

  const shortNights = lastWeek.filter(
    (night) => night.duration < target - SHORT_NIGHT_MARGIN,
  ).length

  if (shortNights >= 3) {
    findings.push({
      id: 'sleep-short-nights',
      area: 'sleep',
      level: 'attention',
      title: 'Nuits courtes répétées',
      detail: `${shortNights} nuits sur 7 se sont terminées avec plus d'une heure de moins que ta cible.`,
    })
  }

  return {
    available: true,
    nightsCount: lastWeek.length,
    averageDuration,
    averageQuality,
    findings,
  }
}

function analyzePerformances(performances, nights, target, todayKey) {
  const valid = performances
    .map((performance) => ({
      ...performance,
      type: performance.type === 'competition' ? 'competition' : 'training',
      distance: String(performance.distance),
      time: Number(performance.time),
    }))
    .filter(
      (performance) =>
        SPRINT_DISTANCES.includes(performance.distance) &&
        Number.isFinite(performance.time) &&
        performance.time > 0 &&
        performance.date,
    )

  const counts = {
    competition: valid.filter((item) => item.type === 'competition').length,
    training: valid.filter((item) => item.type === 'training').length,
  }

  if (valid.length === 0) {
    return {
      available: false,
      counts,
      findings: [
        {
          id: 'performance-data',
          area: 'performance',
          level: 'insufficient',
          title: 'Aucune performance exploitable',
          detail: 'Enregistre tes chronos en compétition et à l\'entraînement pour voir apparaître des repères.',
        },
      ],
    }
  }

  const findings = []
  const groupOf = (distance, type) =>
    valid.filter((item) => item.distance === distance && item.type === type)

  // 1) Compétition vs entraînement, par distance
  const comparisons = []

  SPRINT_DISTANCES.forEach((distance) => {
    const competition = groupOf(distance, 'competition')
    const training = groupOf(distance, 'training')

    if (competition.length < MIN_PERFORMANCES || training.length < MIN_PERFORMANCES) return

    const competitionAverage = average(competition.map((item) => item.time))
    const trainingAverage = average(training.map((item) => item.time))
    const diff = percentChange(trainingAverage, competitionAverage)

    comparisons.push({ distance, diff, competitionCount: competition.length, trainingCount: training.length })

    findings.push({
      id: `performance-compare-${distance}`,
      area: 'performance',
      level: 'info',
      title: `${distance} m : compétition et entraînement`,
      detail: `En moyenne, ton ${distance} m est ${Math.abs(diff).toFixed(1)} % ${diff < 0 ? 'plus rapide' : 'plus lent'} en compétition qu'à l'entraînement (${competition.length} compétition(s), ${training.length} entraînement(s)).`,
    })
  })

  // 2) Tendance récente, par type et distance
  const trends = []

  ;['competition', 'training'].forEach((type) => {
    SPRINT_DISTANCES.forEach((distance) => {
      const group = groupOf(distance, type).sort((a, b) => a.date.localeCompare(b.date))

      if (group.length < MIN_TREND_SAMPLES) return

      const recent = average(group.slice(-3).map((item) => item.time))
      const previous = average(group.slice(-6, -3).map((item) => item.time))
      const change = percentChange(previous, recent)

      trends.push({ type, distance, change })

      if (change <= -1.5) {
        findings.push({
          id: `performance-trend-up-${type}-${distance}`,
          area: 'performance',
          level: 'positive',
          title: `${distance} m en progression`,
          detail: `Tes 3 derniers ${distance} m ${type === 'competition' ? 'en compétition' : 'à l\'entraînement'} sont en moyenne ${Math.abs(change).toFixed(1)} % plus rapides que les 3 précédents.`,
        })
      } else if (change >= 1.5) {
        findings.push({
          id: `performance-trend-down-${type}-${distance}`,
          area: 'performance',
          level: 'attention',
          title: `${distance} m en ralentissement`,
          detail: `Tes 3 derniers ${distance} m ${type === 'competition' ? 'en compétition' : 'à l\'entraînement'} sont en moyenne ${change.toFixed(1)} % plus lents que les 3 précédents. Regarde la charge et le sommeil de ces jours-là.`,
        })
      }
    })
  })

  // 3) Lien avec le sommeil : nuit précédant la performance (même date de réveil)
  const sleepByDate = new Map(
    nights
      .map((night) => ({
        ...night,
        duration: getSleepDuration(night.fallAsleep, night.wakeTime),
      }))
      .filter((night) => night.date && night.duration !== null)
      .map((night) => [night.date, night.duration]),
  )

  let sleepLink = null

  const linked = valid
    .map((performance) => {
      const sameGroup = groupOf(performance.distance, performance.type)
      const groupMean = average(sameGroup.map((item) => item.time))
      const sleep = sleepByDate.get(performance.date)

      return sleep === undefined || sameGroup.length < 2
        ? null
        : { ratio: performance.time / groupMean, sleep }
    })
    .filter(Boolean)

  const shortGroup = linked.filter((item) => item.sleep < target - SHORT_NIGHT_MARGIN)
  const okGroup = linked.filter((item) => item.sleep >= target - SHORT_NIGHT_MARGIN)

  if (shortGroup.length >= MIN_PERFORMANCES && okGroup.length >= MIN_PERFORMANCES) {
    const diff = percentChange(average(okGroup.map((item) => item.ratio)), average(shortGroup.map((item) => item.ratio)))

    sleepLink = { diff, shortCount: shortGroup.length, okCount: okGroup.length }

    if (diff >= 1.5) {
      findings.push({
        id: 'performance-after-short-sleep',
        area: 'performance',
        level: 'attention',
        title: 'Chronos moins bons après les nuits courtes',
        detail: `Après une nuit d'au moins 1 h plus courte que ta cible, tes temps sont en moyenne ${diff.toFixed(1)} % plus lents que d'habitude (${shortGroup.length} performances concernées). C'est une corrélation observée, pas une preuve.`,
      })
    } else {
      findings.push({
        id: 'performance-sleep-no-gap',
        area: 'performance',
        level: 'info',
        title: 'Pas d\'écart net lié au sommeil',
        detail: `Tes performances après une nuit courte ne se distinguent pas nettement de celles après une nuit suffisante (${shortGroup.length} contre ${okGroup.length}).`,
      })
    }
  }

  if (findings.length === 0) {
    findings.push({
      id: 'performance-more-data',
      area: 'performance',
      level: 'insufficient',
      title: 'Encore peu de comparaisons possibles',
      detail: `Il faut au moins ${MIN_PERFORMANCES} performances par groupe (compétition, entraînement, nuit courte ou non) pour comparer. Tu as ${counts.competition} compétition(s) et ${counts.training} entraînement(s).`,
    })
  }

  return {
    available: true,
    counts,
    comparisons,
    trends,
    sleepLink,
    findings,
  }
}

/**
 * Point d'entrée : sommeil, performances et leurs liens.
 * `todayKey` est injectable pour les tests.
 */
export function buildDiagnostics({
  nights = [],
  performances = [],
  sleepTargetMinutes = 480,
  todayKey = toDateKey(),
} = {}) {
  const sleep = analyzeSleep(nights, sleepTargetMinutes, todayKey)
  const performance = analyzePerformances(performances, nights, sleepTargetMinutes, todayKey)

  return {
    sleep,
    performance,
    findings: [...sleep.findings, ...performance.findings],
  }
}

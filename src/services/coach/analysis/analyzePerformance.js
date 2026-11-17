/* =========================================================
   Performances en compétition : forme, régularité et évolution
   par distance, à partir des chronos officiels.
   ========================================================= */

import { getOfficialPerformances, getDistanceLabel } from '../../../utils/competitionHelpers'
import { getForm, getRegularity } from '../../../utils/competitionInsights'
import { daysAgo, mean } from '../utils'

function byDistance(performances) {
  const groups = {}
  for (const item of performances) {
    if (!groups[item.distance]) groups[item.distance] = []
    groups[item.distance].push(item)
  }
  return groups
}

/* Compare la moyenne des chronos des 90 derniers jours à celle des 90 jours précédents. */
function periodComparison(official, now) {
  const recent = official.filter((item) => {
    const ago = daysAgo(item.date, now)
    return ago !== null && ago >= 0 && ago < 90
  })
  const previous = official.filter((item) => {
    const ago = daysAgo(item.date, now)
    return ago !== null && ago >= 90 && ago < 180
  })

  if (recent.length < 2 || previous.length < 2) return null

  const recentAvg = mean(recent.map((item) => Number(item.time)))
  const previousAvg = mean(previous.map((item) => Number(item.time)))

  return { recentAvg, previousAvg, diffPct: ((recentAvg - previousAvg) / previousAvg) * 100 }
}

export function analyzePerformance(context) {
  const official = getOfficialPerformances(context.performances)
  const groups = byDistance(official)

  const distances = Object.entries(groups).map(([distance, items]) => ({
    distance,
    label: getDistanceLabel(distance),
    count: items.length,
    form: getForm(items),
    regularity: getRegularity(items),
    comparison: periodComparison(items, context.now),
  }))

  if (distances.length === 0) {
    return {
      available: false,
      message: 'Aucun chrono officiel (compétition chronométrée électroniquement, vent réglementaire) enregistré.',
      distances: [],
    }
  }

  // La distance la plus suivie sert de référence pour la comparaison de périodes.
  const main = [...distances].sort((a, b) => b.count - a.count)[0]

  return {
    available: true,
    distances,
    main,
  }
}

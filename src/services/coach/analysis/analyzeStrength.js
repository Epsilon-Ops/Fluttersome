/* Musculation : progression du 1RM estimé sur les exercices suivis. */

import { getExerciseSeries, listExercises } from '../../../utils/strengthProgress'
import { round } from '../utils'

export function analyzeStrength(context) {
  const series = getExerciseSeries(context.strengthSessions)
  const exercises = listExercises(series)
    .map((item) => {
      const entries = series.get(item.key).filter((entry) => entry.bestE1rm !== null)
      if (entries.length < 3) return null

      const first = entries[0].bestE1rm
      const last = entries[entries.length - 1].bestE1rm

      return {
        label: item.label,
        count: entries.length,
        firstE1rm: round(first, 1),
        lastE1rm: round(last, 1),
        changePct: round(((last - first) / first) * 100, 1),
      }
    })
    .filter(Boolean)

  if (exercises.length === 0) {
    return {
      available: false,
      message: 'Il faut au moins 3 séries chargées sur un même exercice pour mesurer sa progression.',
    }
  }

  return { available: true, exercises }
}

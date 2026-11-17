/* =========================================================
   Point d'entrée du Coach : lance toutes les analyses à partir
   du contexte et renvoie un objet unique consommé par l'interface.
   ========================================================= */

import { buildCoachContext } from './context/buildCoachContext'
import { calculateReadiness } from './readiness/calculateReadiness'
import { analyzeRecovery } from './analysis/analyzeRecovery'
import { analyzeTrainingLoad } from './analysis/analyzeTrainingLoad'
import { analyzePerformance } from './analysis/analyzePerformance'
import { analyzeMood } from './analysis/analyzeMood'
import { analyzeNutrition } from './analysis/analyzeNutrition'
import { analyzeStrength } from './analysis/analyzeStrength'
import { detectAlerts } from './alerts/detectAlerts'
import { compareSessionOptions } from './decisions/compareSessionOptions'
import { buildCoachSummary } from './insights/buildCoachSummary'
import { buildDiagnostics } from './diagnostics/buildDiagnostics'

export function runCoachAnalysis(now = new Date()) {
  const context = buildCoachContext(now)

  const recovery = analyzeRecovery(context)
  const load = analyzeTrainingLoad(context)
  const performance = analyzePerformance(context)
  const mood = analyzeMood(context)
  const nutrition = analyzeNutrition(context)
  const strength = analyzeStrength(context)
  const readiness = calculateReadiness(context)

  const alerts = detectAlerts(context, { readiness, recovery, load, mood, nutrition })
  const decision = compareSessionOptions(readiness, context)
  const summary = buildCoachSummary({ readiness, alerts, recovery, load, performance })

  const diagnostics = buildDiagnostics({
    nights: context.sleepNights,
    performances: context.performances,
    sleepTargetMinutes: context.sleepTargetMinutes,
  })

  return {
    context,
    recovery,
    load,
    performance,
    mood,
    nutrition,
    strength,
    readiness,
    alerts,
    decision,
    summary,
    diagnostics,
  }
}

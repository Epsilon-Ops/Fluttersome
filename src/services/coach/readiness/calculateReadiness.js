/* =========================================================
   Score de préparation : moyenne pondérée de cinq dimensions,
   calculées uniquement à partir des données saisies.
   Il n'est affiché que si assez de dimensions sont disponibles.
   ========================================================= */

import { within, mean, clamp, round } from '../utils'
import { READINESS_WEIGHTS } from './readinessWeights'
import { READINESS_LEVELS, MIN_DIMENSIONS, PAIN_ALERT } from './readinessThresholds'
import { validateReadinessInputs } from './validateReadinessInputs'
import { analyzeRecovery } from '../analysis/analyzeRecovery'
import { analyzeTrainingLoad } from '../analysis/analyzeTrainingLoad'
import { analyzeMood } from '../analysis/analyzeMood'

const FATIGUE_TYPES = ['fatigue', 'soreness', 'stiffness']

function fatigueDimension(context) {
  const recent = context.feelings.filter((feeling) => within(feeling.recordedAt?.slice(0, 10), 7, context.now))
  if (recent.length === 0) return null

  const fatigue = recent.filter(
    (feeling) => FATIGUE_TYPES.includes(feeling.sensationType) && Number.isFinite(feeling.intensity),
  )

  if (fatigue.length === 0) return 90

  return clamp(100 - mean(fatigue.map((feeling) => feeling.intensity)) * 10)
}

function availabilityDimension(context) {
  const recent = context.feelings.filter((feeling) => within(feeling.recordedAt?.slice(0, 10), 7, context.now))
  if (recent.length === 0) return null

  const intensities = recent
    .filter((feeling) => feeling.sensationType === 'pain' && Number.isFinite(feeling.intensity))
    .map((feeling) => feeling.intensity)

  if (intensities.length === 0) return 100

  return clamp(100 - Math.max(...intensities) * 10)
}

function loadDimension(load) {
  if (!load.available) return null

  const ratio = load.ratio
  if (ratio >= 0.8 && ratio <= 1.3) return 100
  if (ratio < 0.8) return 80
  if (ratio <= 1.5) return 60
  return 30
}

export function calculateReadiness(rawContext) {
  const check = validateReadinessInputs(rawContext)

  if (!check.valid) {
    return unavailable('Les données ne sont pas exploitables pour le moment.')
  }

  const context = rawContext
  const recovery = analyzeRecovery(context)
  const load = analyzeTrainingLoad(context)
  const mood = analyzeMood(context)

  const breakdown = {
    recovery: recovery.available ? recovery.score : null,
    fatigue: fatigueDimension(context),
    load: loadDimension(load),
    form: mood.available ? clamp(((mood.avgValence + 5) / 10) * 100) : null,
    availability: availabilityDimension(context),
  }

  const available = Object.entries(breakdown).filter(([, value]) => value !== null)

  if (available.length < MIN_DIMENSIONS) {
    return {
      ...unavailable('Enregistre davantage de données (sommeil, sensations, charge, humeur) pour obtenir un score.'),
      breakdown: roundBreakdown(breakdown),
      reliability: available.length === 1 ? 'faible' : null,
    }
  }

  const weightSum = available.reduce((total, [key]) => total + READINESS_WEIGHTS[key], 0)
  const score = Math.round(
    available.reduce((total, [key, value]) => total + value * READINESS_WEIGHTS[key], 0) / weightSum,
  )

  let level = 'reduire'
  if (score >= READINESS_LEVELS.favorable) level = 'favorable'
  else if (score >= READINESS_LEVELS.vigilance) level = 'vigilance'

  const reliability =
    available.length >= 4 ? 'bonne' : available.length === 3 ? 'moyenne' : 'faible'

  const explanation = buildExplanation({ score, level, breakdown, recovery, load, mood })

  return {
    status: 'available',
    score,
    level,
    reliability,
    breakdown: roundBreakdown(breakdown),
    explanation,
    painAlert: context.feelings.some(
      (feeling) => feeling.sensationType === 'pain' && feeling.intensity >= PAIN_ALERT,
    ),
  }
}

function unavailable(explanation) {
  return {
    status: 'insufficient-data',
    score: null,
    level: null,
    reliability: null,
    breakdown: {},
    explanation,
    painAlert: false,
  }
}

function roundBreakdown(breakdown) {
  return Object.fromEntries(
    Object.entries(breakdown).map(([key, value]) => [key, value === null ? null : Math.round(value)]),
  )
}

function buildExplanation({ score, level, breakdown, recovery, load, mood }) {
  const parts = [`Score estimé à ${score}/100 à partir des dimensions disponibles.`]

  if (level === 'favorable') {
    parts.push('Les indicateurs sont dans une zone favorable.')
  } else if (level === 'vigilance') {
    parts.push('Quelques indicateurs demandent de la vigilance.')
  } else {
    parts.push('Plusieurs indicateurs suggèrent de privilégier la récupération.')
  }

  const weakest = Object.entries(breakdown)
    .filter(([, value]) => value !== null)
    .sort((a, b) => a[1] - b[1])[0]

  if (weakest && weakest[1] < 70) {
    const labels = {
      recovery: 'la récupération',
      fatigue: 'la fatigue ressentie',
      load: 'la charge d’entraînement',
      form: 'l’humeur récente',
      availability: 'les douleurs signalées',
    }
    parts.push(`Le point le plus bas est ${labels[weakest[0]]}.`)
  }

  if (recovery.available && recovery.debtMinutes > 60) {
    parts.push(`Tu accumules environ ${Math.round(recovery.debtMinutes / 60)} h de sommeil en dessous de ta cible.`)
  }

  if (load.available && load.status === 'eleve') {
    parts.push('Ta charge récente est nettement supérieure à ta moyenne habituelle.')
  }

  if (mood.available && mood.lowRecent) {
    parts.push('Ton humeur récente est basse : tiens-en compte dans tes choix.')
  }

  parts.push('Ce score est indicatif et ne remplace pas l’avis d’un professionnel de santé ou de ton entraîneur.')

  return parts.join(' ')
}

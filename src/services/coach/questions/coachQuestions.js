/* =========================================================
   Questions prédéfinies du Coach. Chaque réponse est construite
   à partir des analyses calculées : ce n'est pas un modèle de langage.
   ========================================================= */

import { DIMENSION_LABELS } from '../readiness/readinessWeights'
import { formatRaceTime } from '../../../utils/timeHelpers'
import { getSleepDuration, formatSleepDuration } from '../../../utils/sleepHelpers'
import { getOfficialPerformances } from '../../../utils/competitionHelpers'
import { mean } from '../utils'

const NOT_ENOUGH = 'Pas assez de données pour répondre de façon fiable. '

export const COACH_QUESTIONS = [
  { id: 'readiness', label: 'Comment interpréter mon score de préparation ?', answer: answerReadiness },
  { id: 'session', label: 'Dois-je maintenir ma séance prévue ?', answer: answerSession },
  { id: 'performance', label: 'Comment évoluent mes performances en compétition ?', answer: answerPerformance },
  { id: 'regularity', label: 'Mes chronos sont-ils réguliers ?', answer: answerRegularity },
  { id: 'load', label: 'Mon entraînement est-il trop chargé ?', answer: answerLoad },
  { id: 'recovery', label: 'Comment est ma récupération cette semaine ?', answer: answerRecovery },
  { id: 'sleep-regularity', label: 'Mon sommeil est-il régulier ?', answer: answerSleepRegularity },
  { id: 'sleep-performance', label: 'Mon sommeil influence-t-il mes chronos ?', answer: answerSleepPerformance },
  { id: 'nutrition', label: 'Comment est ma nutrition cette semaine ?', answer: answerNutrition },
  { id: 'mood', label: 'Comment évolue mon humeur ?', answer: answerMood },
  { id: 'strength', label: 'Quelle progression en musculation ?', answer: answerStrength },
  { id: 'alerts', label: 'Quelles alertes dois-je regarder ?', answer: answerAlerts },
]

function answerReadiness(a) {
  const { readiness } = a
  if (readiness.score === null) return NOT_ENOUGH + readiness.explanation

  const lines = Object.entries(readiness.breakdown)
    .filter(([, value]) => value !== null)
    .map(([key, value]) => `${DIMENSION_LABELS[key]} : ${value}/100`)

  return [readiness.explanation, lines.length ? `Détail — ${lines.join(' · ')}.` : '', `Fiabilité : ${readiness.reliability}.`]
    .filter(Boolean)
    .join('\n')
}

function answerSession(a) {
  const { decision } = a
  const sessionText = decision.session ? `Séance prévue : ${decision.session.title}. ` : ''
  const selected = decision.selected ? decision.options[decision.selected] : ''

  return `${sessionText}${decision.recommendation}${selected ? `\n${selected}` : ''}\n${decision.rationale}`
}

function answerPerformance(a) {
  const { performance } = a
  if (!performance.available) return NOT_ENOUGH + performance.message

  return performance.distances
    .map((item) => {
      if (!item.form.available) return `${item.label} : ${item.form.message}`
      const trend = { progress: 'en progression', recul: 'en léger recul', stable: 'stable' }[item.form.trend]
      const comparison = item.comparison
        ? ` Sur 90 jours, ta moyenne est ${formatPct(item.comparison.diffPct)} par rapport aux 90 jours précédents.`
        : ''
      return `${item.label} : forme ${trend}, dernier chrono ${formatRaceTime(item.form.last)} (${item.form.lastVsBestPct.toFixed(1)} % par rapport à ton record ${formatRaceTime(item.form.best)}).${comparison}`
    })
    .join('\n')
}

function formatPct(diffPct) {
  const sign = diffPct > 0 ? '+' : ''
  return `${sign}${diffPct.toFixed(1)} %`
}

function answerRegularity(a) {
  const { performance } = a
  if (!performance.available) return NOT_ENOUGH + performance.message

  return performance.distances
    .map((item) => {
      if (!item.regularity.available) return `${item.label} : ${item.regularity.message}`
      const r = item.regularity
      return `${item.label} : ${r.stability} (variabilité ${r.cv.toFixed(2)} %) sur ${r.count} chronos officiels.`
    })
    .join('\n')
}

function answerLoad(a) {
  const { load } = a
  if (!load.available) return NOT_ENOUGH + load.message

  const messages = {
    optimal: 'Ta charge récente est dans une zone habituelle par rapport à tes 4 dernières semaines.',
    en_hausse: 'Ta charge récente augmente. Surveille tes sensations pendant quelques jours.',
    eleve: 'Ta charge récente est nettement au-dessus de ta moyenne : c’est le moment de prévoir un allègement.',
    faible: 'Ta charge récente est en dessous de ta moyenne : si ce n’est pas voulu, tu peux progresser graduellement.',
  }

  return `${messages[load.status]} Ratio aiguë / chronique : ${load.ratio} (indicatif).`
}

function answerRecovery(a) {
  const { recovery } = a
  if (!recovery.available) return NOT_ENOUGH + recovery.message

  const debt = recovery.debtMinutes > 0
    ? `Tu es en dessous de ta cible d’environ ${formatSleepDuration(recovery.debtMinutes)} cumulées sur la semaine.`
    : 'Tu atteins en moyenne ta cible de sommeil sur la semaine.'

  return `Récupération ${recovery.label} (score ${recovery.score}/100). Durée moyenne ${formatSleepDuration(recovery.avgDurationMinutes)} pour une cible de ${formatSleepDuration(recovery.targetMinutes)}. Qualité moyenne ${recovery.avgQuality ?? '—'}/10. ${debt}`
}

function answerSleepRegularity(a) {
  const { recovery } = a
  if (!recovery.available) return NOT_ENOUGH + recovery.message
  if (recovery.bedtimeSdMinutes === null) return NOT_ENOUGH + 'Il faut des heures de coucher sur au moins 3 nuits.'

  const sd = recovery.bedtimeSdMinutes
  const verdict = sd < 30 ? 'très régulier' : sd < 60 ? 'assez régulier' : 'irrégulier'

  return `Ton coucher est ${verdict} : écart moyen d’environ ${Math.round(sd)} min d’une nuit à l’autre. Des horaires réguliers aident souvent la récupération.`
}

function answerSleepPerformance(a) {
  const { context, performance } = a
  if (!performance.available) return NOT_ENOUGH + performance.message

  const nights = context.sleepNights
  const target = context.sleepTargetMinutes
  const good = []
  const short = []

  for (const item of getOfficialPerformances(context.performances)) {
    const previous = previousDate(item.date)
    const night = nights.find((n) => n.date === previous)
    const duration = night ? getSleepDuration(night.fallAsleep, night.wakeTime) : null
    if (duration === null) continue
    if (duration >= target * 0.9) good.push(Number(item.time))
    else short.push(Number(item.time))
  }

  if (good.length < 3 || short.length < 3) {
    return NOT_ENOUGH + 'Il faut au moins 3 chronos suivis d’une nuit suffisante et 3 suivis d’une nuit courte.'
  }

  const diff = mean(short) - mean(good)

  return `Après une nuit suffisante, tes chronos moyens sont de ${formatRaceTime(mean(good))} ; après une nuit courte, ${formatRaceTime(mean(short))}. ${Math.abs(diff) < 0.1 ? 'L’écart est faible : le sommeil ne semble pas faire une différence nette à ce stade.' : `Écart d’environ ${diff.toFixed(2)} s. C’est une corrélation observée, pas une preuve de cause.`}`
}

function previousDate(dateString) {
  const d = new Date(`${dateString}T12:00:00`)
  d.setDate(d.getDate() - 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function answerNutrition(a) {
  const { nutrition } = a
  if (!nutrition.available) return NOT_ENOUGH + nutrition.message

  const kcalPct = Math.round(nutrition.kcalRatio * 100)
  const kcalText =
    kcalPct > 110 ? 'au-dessus de ta cible' : kcalPct < 90 ? 'en dessous de ta cible' : 'proche de ta cible'

  const water = nutrition.avgWaterMl === null ? '' : ` Hydratation moyenne ${nutrition.avgWaterMl} ml par jour.`

  return `Sur ${nutrition.daysLogged} jours saisis : ${nutrition.avgKcal} kcal en moyenne, ${kcalText} (cible moyenne ${nutrition.avgTarget} kcal). Protéines moyennes ${nutrition.avgProtein} g, objectif ${nutrition.proteinTarget} g atteint ${nutrition.proteinDays} jour(s).${water}`
}

function answerMood(a) {
  const { mood } = a
  if (!mood.available) return NOT_ENOUGH + mood.message

  const trend = { hausse: 'en hausse', baisse: 'en baisse', stable: 'stable' }[mood.trend]
  const link = mood.sleepLink
    ? ` Les jours suivant une bonne nuit, ton humeur moyenne est ${mood.sleepLink.afterGoodSleep}, contre ${mood.sleepLink.afterShortSleep} après une nuit courte (corrélation observée).`
    : ''

  return `Humeur moyenne de la semaine : ${mood.avgValence} sur une échelle de -5 à +5, ${trend}.${link}`
}

function answerStrength(a) {
  const { strength } = a
  if (!strength.available) return NOT_ENOUGH + strength.message

  return strength.exercises
    .map((item) => `${item.label} : 1RM estimé de ${item.firstE1rm} kg à ${item.lastE1rm} kg (${item.changePct >= 0 ? '+' : ''}${item.changePct} %).`)
    .join('\n')
}

function answerAlerts(a) {
  if (a.alerts.length === 0) return 'Aucune alerte active avec les données actuelles.'

  return a.alerts.map((alert) => `${alert.title} : ${alert.message} ${alert.recommendation}`).join('\n')
}

/* Alertes déclenchées par des règles simples et explicites. */

import { within, mean } from '../utils'
import { PAIN_ALERT, ACWR_HIGH, MIN_NIGHTS } from '../readiness/readinessThresholds'
import { getSleepDuration } from '../../../utils/sleepHelpers'

export function detectAlerts(context, { readiness, recovery, load, mood, nutrition }) {
  const alerts = []

  const pains = context.feelings.filter(
    (feeling) =>
      feeling.sensationType === 'pain' &&
      Number.isFinite(feeling.intensity) &&
      within(feeling.recordedAt?.slice(0, 10), 7, context.now),
  )
  const strongPain = pains.filter((feeling) => feeling.intensity >= PAIN_ALERT)

  if (strongPain.length > 0) {
    const worst = strongPain.sort((a, b) => b.intensity - a.intensity)[0]
    alerts.push({
      id: 'pain',
      level: 'warning',
      title: 'Douleur signalée',
      message: `${worst.bodyPart} — intensité ${worst.intensity}/10 cette semaine.`,
      recommendation:
        'Évite de forcer sur cette zone. Si la douleur est forte, inhabituelle ou persistante, demande l’avis d’un professionnel de santé.',
    })
  }

  if (recovery.available) {
    const recent = context.sleepNights
      .filter((night) => within(night.date, 5, context.now))
      .map((night) => getSleepDuration(night.fallAsleep, night.wakeTime))
      .filter((value) => value !== null)
    const short = recent.filter((value) => value < context.sleepTargetMinutes - 60)

    if (recent.length >= MIN_NIGHTS && short.length >= 3) {
      alerts.push({
        id: 'sleep',
        level: 'info',
        title: 'Sommeil court',
        message: `${short.length} nuits sur les 5 derniers jours sont plus courtes d’au moins 1 h que ta cible.`,
        recommendation: 'Essaie d’avancer légèrement l’heure du coucher pendant quelques jours.',
      })
    }
  }

  if (load.available && load.ratio > ACWR_HIGH) {
    alerts.push({
      id: 'load',
      level: 'warning',
      title: 'Charge en forte hausse',
      message: `Ta charge de cette semaine est ${load.ratio} fois ta moyenne des 4 dernières semaines.`,
      recommendation:
        'Une hausse rapide augmente le risque de blessure. Envisage une séance plus légère ou une journée de récupération.',
    })
  }

  if (readiness.level === 'reduire') {
    alerts.push({
      id: 'readiness',
      level: 'warning',
      title: 'Récupération à privilégier',
      message: 'Plusieurs indicateurs sont bas aujourd’hui.',
      recommendation: 'Privilégie une séance plus légère ou une récupération active.',
    })
  }

  if (mood.available && mood.lowRecent) {
    alerts.push({
      id: 'mood',
      level: 'info',
      title: 'Humeur basse',
      message: 'Ton humeur moyenne de la semaine est basse.',
      recommendation:
        'Si cela dure, parles-en à une personne de confiance. Le suivi n’est pas un diagnostic.',
    })
  }

  if (nutrition.available && nutrition.proteinDays <= 2 && nutrition.daysLogged >= 4) {
    alerts.push({
      id: 'protein',
      level: 'info',
      title: 'Apports en protéines faibles',
      message: `Ton objectif de protéines (${nutrition.proteinTarget} g) n’est atteint qu’${nutrition.proteinDays === 1 ? 'un jour' : 'quelques jours'} sur les ${nutrition.daysLogged} jours saisis.`,
      recommendation: 'Ajoute une source de protéines à chaque repas principal.',
    })
  }

  return alerts
}

/* Résumé de la situation du jour et priorités d'action. */

export function buildCoachSummary({ readiness, alerts, recovery, load, performance }) {
  const sources = [
    recovery.available,
    readiness.score !== null,
    performance.available,
    load.available,
  ].filter(Boolean).length

  const summary =
    sources === 0
      ? 'Enregistre tes nuits, tes séances et tes chronos : le Coach pourra alors résumer ta situation.'
      : `Résumé calculé à partir de ${sources} source(s) de données. Il s’agit d’un repère d’analyse, pas d’un diagnostic.`

  const priorities = []

  if (!recovery.available) priorities.push('Enregistrer au moins 3 nuits de sommeil sur 7 jours.')
  if (!readiness.breakdown || Object.keys(readiness.breakdown).length === 0) {
    priorities.push('Ajouter une observation corporelle ou une humeur pour compléter le score.')
  }
  if (!performance.available) priorities.push('Enregistrer des chronos officiels pour suivre ta forme.')
  if (!load.available) priorities.push('Enregistrer des séances sur plusieurs semaines pour mesurer ta charge.')

  alerts.slice(0, 2).forEach((alert) => priorities.push(alert.recommendation))

  if (priorities.length === 0) priorities.push('Continue de saisir tes données : elles améliorent la fiabilité des analyses.')

  return { summary, priorities }
}

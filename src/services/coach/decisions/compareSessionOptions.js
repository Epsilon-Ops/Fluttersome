/* =========================================================
   Trois options pour la séance du jour, selon le niveau de
   préparation calculé. Aucune décision n'est prise à la place
   de l'athlète ou de son entraîneur.
   ========================================================= */

export function compareSessionOptions(readiness, context) {
  const next = nextPlannedSession(context)

  const sessionLabel = next ? next.title : 'ta séance prévue'

  const options = {
    maintain: `Conserver ${sessionLabel} telle que prévue.`,
    adapt: `Garder ${sessionLabel} mais réduire le volume ou l’intensité (une série ou une répétition en moins, distance raccourcie).`,
    recover: 'Remplacer par une récupération : mobilité, marche, étirements légers ou repos complet.',
  }

  let selected = null
  if (readiness.level === 'favorable') selected = 'maintain'
  else if (readiness.level === 'vigilance') selected = 'adapt'
  else if (readiness.level === 'reduire') selected = 'recover'

  const recommendation = selected
    ? {
        maintain: 'Les indicateurs sont favorables : la séance prévue peut être conservée.',
        adapt: 'Les indicateurs demandent de la vigilance : adapter la séance est plus prudent.',
        recover: 'Les indicateurs suggèrent de privilégier la récupération aujourd’hui.',
      }[selected]
    : 'Pas assez de données pour recommander une option. Décide avec tes sensations et ton entraîneur.'

  return {
    session: next,
    options,
    selected,
    recommendation,
    rationale:
      'La décision doit tenir compte du programme prévu, du ressenti personnel et des conseils de l’entraîneur.',
  }
}

function nextPlannedSession(context) {
  const today = `${context.now.getFullYear()}-${String(context.now.getMonth() + 1).padStart(2, '0')}-${String(context.now.getDate()).padStart(2, '0')}`

  const candidates = [
    ...context.strengthSessions.map((session) => ({
      date: session.date,
      title: session.title || 'Séance de musculation',
      status: session.status,
    })),
    ...context.trainingSessions.map((session) => ({
      date: session.date,
      title: session.title || session.type || 'Séance de sprint',
      status: session.status,
    })),
  ]
    .filter((session) => session.date === today && session.status !== 'completed')

  if (candidates.length === 0) return null

  return { title: candidates[0].title }
}

/* Écarte les entrées invalides avant tout calcul. */
export function validateReadinessInputs(context) {
  const errors = []

  if (!context || typeof context !== 'object') {
    errors.push('Contexte absent.')
    return { valid: false, errors }
  }

  for (const key of ['sleepNights', 'feelings', 'moodEntries', 'trainingSessions', 'strengthSessions']) {
    if (!Array.isArray(context[key])) errors.push(`${key} doit être une liste.`)
  }

  if (!Number.isFinite(context.sleepTargetMinutes)) {
    errors.push('Objectif de sommeil invalide.')
  }

  return { valid: errors.length === 0, errors }
}

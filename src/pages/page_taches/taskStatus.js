/* =========================================================
   taskStatus.js — textes de statut d'une tâche (timer,
   compteur, périodes, sous-tâches), partagés par la carte
   et la popup de détail. Sans horloge en direct : les textes
   se mettent à jour au rythme de la page.
   ========================================================= */

import {
  getCounterGoal,
  getCounterUnit,
  getTimerConfig,
  isCounterBehavior,
  isNegative,
  isTimerBehavior,
} from '../../utils/recurrenceHelpers'
import {
  getSubtaskProgress,
  hasPeriods,
  isPeriodChecked,
} from '../../utils/taskHelpers'

export function getTimerStatus(task) {
  if (task.completed) return 'Terminé'

  const timer = task.timer ?? {}
  const { repeatCount, targetSec } = getTimerConfig(task)

  if (timer.runningSince != null) return 'En cours'
  if (timer.phase === 'rest') return 'En récupération'

  if (repeatCount > 1) {
    return `${timer.repsDone ?? 0}/${repeatCount} faites · ${targetSec / 60} min chacune`
  }

  return (timer.elapsedSec ?? 0) > 0
    ? `En pause · ${targetSec / 60} min`
    : `${targetSec / 60} min à compléter`
}

/** Une ligne résumant l'avancement, ou une chaîne vide. */
export function getStatusLine(task) {
  if (hasPeriods(task)) {
    const done = task.periods.filter((period) =>
      isPeriodChecked(task, period),
    ).length

    return `${done}/${task.periods.length} période(s) faite(s)`
  }

  if (isTimerBehavior(task)) {
    return getTimerStatus(task)
  }

  if (isCounterBehavior(task)) {
    const unit = getCounterUnit(task)
    return `${Number(task.counterValue) || 0} / ${getCounterGoal(task)} ${unit.shortLabel}`
  }

  const subtasks = getSubtaskProgress(task)
  if (subtasks.total > 0) {
    return `${subtasks.completed}/${subtasks.total} sous-tâche(s)`
  }

  if (isNegative(task) && !task.completed) {
    return 'Tu vas y arriver !'
  }

  return ''
}

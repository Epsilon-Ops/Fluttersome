/* =========================================================
   recurrenceHelpers.js — récurrences des tâches, remise à zéro
   automatique par période, états des timers et des compteurs.

   Toutes les fonctions sont pures : elles ne modifient jamais
   l'objet reçu et reçoivent l'heure en paramètre (ce qui rend
   le comportement testable et stable).
   ========================================================= */

export const RECURRENCES = [
  { value: 'none', label: 'Aucune' },
  { value: 'daily', label: 'Quotidienne' },
  { value: 'weekly', label: 'Hebdomadaire' },
  { value: 'monthly', label: 'Mensuelle' },
  { value: 'yearly', label: 'Annuelle' },
  { value: 'everyXDays', label: 'Tous les X jours' },
]

export const BEHAVIORS = [
  {
    value: 'check',
    label: 'Classique',
    hint: 'Une simple case à cocher.',
  },
  {
    value: 'timer',
    label: 'Timer',
    hint: 'Un chronomètre circulaire à compléter. Tu peux ajouter du temps ou terminer à la main.',
  },
  {
    value: 'repeatTimer',
    label: 'X fois timer',
    hint: 'Un timer répété un nombre donné de fois, avec un repos automatique entre chaque passage.',
  },
  {
    value: 'counter',
    label: 'Compteur',
    hint: 'Des boutons + et − : la tâche est complétée quand la valeur objectif est atteinte.',
  },
]

const DAY_MS = 24 * 60 * 60 * 1000

function pad(value) {
  return String(value).padStart(2, '0')
}

/** Date locale au format AAAA-MM-JJ. */
export function toDateKey(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** Date de midi (évite les soucis d'heure d'été) à partir d'une clé AAAA-MM-JJ. */
function dateFromKey(key) {
  const [year, month, day] = String(key).split('-').map(Number)
  return new Date(year, month - 1, day, 12)
}

export function isRecurring(task) {
  return Boolean(task?.recurrence) && task.recurrence !== 'none'
}

export function isNegative(task) {
  return task?.kind === 'negative'
}

/** Une « routine » apparaît chaque jour dans la vue d'ensemble. */
export function isRoutine(task) {
  return isRecurring(task) || isNegative(task)
}

export function isTimerBehavior(task) {
  return task?.behavior === 'timer' || task?.behavior === 'repeatTimer'
}

export function isCounterBehavior(task) {
  return task?.behavior === 'counter'
}

export function getRecurrenceLabel(task) {
  if (!isRecurring(task)) return ''

  if (task.recurrence === 'everyXDays') {
    return `Tous les ${Math.max(1, Number(task.recurrenceInterval) || 1)} jours`
  }

  return RECURRENCES.find((item) => item.value === task.recurrence)?.label ?? ''
}

export function getBehaviorLabel(task) {
  return BEHAVIORS.find((item) => item.value === task.behavior)?.label ?? 'Classique'
}

/**
 * Identifiant de la période en cours. Quand il change, la tâche
 * repart de zéro (cases, timer, compteur).
 */
export function getPeriodKey(task, now = new Date()) {
  switch (task.recurrence) {
    case 'daily':
      return `D:${toDateKey(now)}`

    case 'weekly': {
      // Semaine ISO : elle commence le lundi
      const day = dateFromKey(toDateKey(now))
      day.setDate(day.getDate() - ((day.getDay() + 6) % 7))
      return `W:${toDateKey(day)}`
    }

    case 'monthly':
      return `M:${now.getFullYear()}-${pad(now.getMonth() + 1)}`

    case 'yearly':
      return `Y:${now.getFullYear()}`

    case 'everyXDays': {
      const interval = Math.max(1, Number(task.recurrenceInterval) || 1)
      const anchor =
        task.recurrenceAnchor ?? toDateKey(new Date(task.createdAt ?? now))
      // Math.round : neutralise le décalage de l'heure d'été
      const elapsed = Math.round(
        (dateFromKey(toDateKey(now)) - dateFromKey(anchor)) / DAY_MS,
      )
      return `X:${Math.floor(elapsed / interval)}`
    }

    default:
      return 'none'
  }
}

/* ---------------------------------------------------------
   Timers
   --------------------------------------------------------- */

export function createTimerState() {
  return {
    repsDone: 0,
    elapsedSec: 0,
    runningSince: null,
    phase: 'work', // 'work' | 'rest'
    restEndsAt: null,
  }
}

export function getTimerConfig(task) {
  const repeat = task.behavior === 'repeatTimer'

  return {
    targetSec: Math.max(1, Number(task.timerMinutes) || 1) * 60,
    repeatCount: repeat
      ? Math.max(1, Number(task.repeatCount) || 1)
      : 1,
    restSec: repeat
      ? Math.max(0, Number(task.restMinutes) || 0) * 60
      : 0,
  }
}

/** Met la tâche « terminée » si toutes les répétitions sont faites. */
export function syncTimerCompletion(task, nowMs = Date.now()) {
  if (!isTimerBehavior(task)) return task

  const { repeatCount } = getTimerConfig(task)
  const done = (task.timer?.repsDone ?? 0) >= repeatCount

  if (done === Boolean(task.completed)) return task

  return {
    ...task,
    completed: done,
    completedAt: done ? new Date(nowMs).toISOString() : null,
  }
}

/**
 * Fait avancer le timer jusqu'à l'instant `nowMs` : fin de répétition,
 * repos automatique, reprise de la répétition suivante.
 * Si le repos est à 0, le timer se met en pause à la fin de la
 * répétition et attend l'utilisateur pour reprendre la suivante.
 * Renvoie le même objet si rien n'a changé.
 */
export function advanceTimer(task, nowMs = Date.now()) {
  if (!isTimerBehavior(task)) return task

  const config = getTimerConfig(task)
  let timer = { ...createTimerState(), ...(task.timer ?? {}) }
  let changed = false

  for (let guard = 0; guard < 500; guard++) {
    if (timer.phase === 'rest') {
      if (nowMs < timer.restEndsAt) break

      // Fin du repos : la répétition suivante démarre toute seule
      timer = {
        ...timer,
        phase: 'work',
        elapsedSec: 0,
        runningSince: timer.restEndsAt,
        restEndsAt: null,
      }
      changed = true
      continue
    }

    if (timer.runningSince === null) break

    const endAt =
      timer.runningSince +
      Math.max(0, config.targetSec - timer.elapsedSec) * 1000

    if (nowMs < endAt) break

    const repsDone = timer.repsDone + 1
    changed = true

    if (repsDone >= config.repeatCount) {
      timer = {
        ...timer,
        repsDone,
        elapsedSec: 0,
        runningSince: null,
        phase: 'work',
        restEndsAt: null,
      }
      break
    }

    if (config.restSec > 0) {
      timer = {
        ...timer,
        repsDone,
        elapsedSec: 0,
        runningSince: null,
        phase: 'rest',
        restEndsAt: endAt + config.restSec * 1000,
      }
      continue
    }

    // Repos à 0 : pause à la fin, la répétition suivante attend l'utilisateur
    timer = {
      ...timer,
      repsDone,
      elapsedSec: 0,
      runningSince: null,
      phase: 'work',
      restEndsAt: null,
    }
    break
  }

  if (!changed) return task

  return syncTimerCompletion({ ...task, timer }, nowMs)
}

/**
 * Vue calculée du timer, pour l'affichage.
 * phase : 'running' | 'paused' | 'rest' | 'done'
 */
export function getTimerView(task, nowMs = Date.now()) {
  const current = advanceTimer(task, nowMs)
  const config = getTimerConfig(current)
  const timer = { ...createTimerState(), ...(current.timer ?? {}) }
  const completed = Boolean(current.completed)

  if (completed) {
    return {
      phase: 'done',
      completed,
      running: false,
      remainingSec: 0,
      progress: 1,
      elapsedSec: 0,
      repsDone: timer.repsDone,
      repeatCount: config.repeatCount,
    }
  }

  if (timer.phase === 'rest') {
    const remainingMs = Math.max(0, timer.restEndsAt - nowMs)
    const total = config.restSec || 1

    return {
      phase: 'rest',
      completed,
      running: false,
      remainingSec: Math.ceil(remainingMs / 1000),
      progress: Math.min(1, 1 - remainingMs / 1000 / total),
      elapsedSec: 0,
      repsDone: timer.repsDone,
      repeatCount: config.repeatCount,
    }
  }

  const running = timer.runningSince !== null
  const elapsedSec =
    timer.elapsedSec +
    (running ? Math.max(0, (nowMs - timer.runningSince) / 1000) : 0)

  return {
    phase: running ? 'running' : 'paused',
    completed,
    running,
    remainingSec: Math.max(0, Math.ceil(config.targetSec - elapsedSec)),
    progress: Math.min(1, elapsedSec / config.targetSec),
    elapsedSec: timer.elapsedSec,
    repsDone: timer.repsDone,
    repeatCount: config.repeatCount,
  }
}

/* ---------------------------------------------------------
   Compteurs
   --------------------------------------------------------- */

export const COUNTER_UNITS = [
  {
    value: 'seconds',
    label: 'Secondes',
    shortLabel: 's',
  },
  {
    value: 'minutes',
    label: 'Minutes',
    shortLabel: 'min',
  },
  {
    value: 'hours',
    label: 'Heures',
    shortLabel: 'h',
  },
]

export function getCounterUnit(task) {
  return (
    COUNTER_UNITS.find(
      (unit) => unit.value === task?.counterUnit,
    ) ?? COUNTER_UNITS[1]
  )
}

export function formatCounterValue(value, task) {
  const unit = getCounterUnit(task)

  return `${value} ${unit.shortLabel}`
}

export function getCounterGoal(task) {
  return Math.max(0, Number(task.counterGoal) || 0)
}

export function getCounterStep(task) {
  return Math.max(1, Number(task.counterStep) || 1)
}

export function applyCounterDelta(task, delta, now = new Date()) {
  const nowIso = now.toISOString()
  const goal = getCounterGoal(task)
  const value = Math.max(
    0,
    (Number(task.counterValue) || 0) + delta * getCounterStep(task),
  )
  const completed = goal > 0 && value >= goal

  return {
    ...task,
    counterValue: value,
    completed,
    completedAt: completed
      ? task.completed
        ? task.completedAt ?? nowIso
        : nowIso
      : null,
    updatedAt: nowIso,
  }
}

/* ---------------------------------------------------------
   Périodes et normalisation
   --------------------------------------------------------- */

/**
 * Remet à zéro une tâche récurrente quand sa période a changé.
 * Une tâche négative repart « complétée » (tenue) par défaut.
 */
export function resetForPeriod(task, now = new Date()) {
  if (!isRecurring(task)) return task

  const key = getPeriodKey(task, now)

  if (task.periodKey === key) return task

  const completed = isNegative(task)

  return {
    ...task,
    periodKey: key,
    completed,
    completedAt: completed ? now.toISOString() : null,
    counterValue: 0,
    timer: createTimerState(),
  }
}

/** Applique à la fois la remise à zéro par période et l'avancement des timers. */
export function normalizeTask(task, now = new Date()) {
  const reset = resetForPeriod(task, now)
  return advanceTimer(reset, now.getTime())
}

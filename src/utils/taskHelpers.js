import {
  createTimerState,
  getCounterGoal,
  getPeriodKey,
  getTimerView,
  isCounterBehavior,
  isRoutine,
  isTimerBehavior,
  RECURRENCES,
  BEHAVIORS,
  toDateKey,
} from './recurrenceHelpers'
import {
  DEFAULT_TASK_ICON,
  DEFAULT_TASK_COLOR,
  TASK_COLOR_PALETTES,
} from '../components/icons/icon-utils/icon-colors'


export const TASK_CATEGORIES = [
  // Quotidien
  { value: 'personnel', label: 'Personnel' },
  { value: 'maison', label: 'Maison' },
  { value: 'menage', label: 'Ménage' },
  { value: 'chambre', label: 'Chambre' },
  { value: 'courses', label: 'Courses' },
  { value: 'repas', label: 'Repas' },

  // Santé et bien-être
  { value: 'hygiene', label: 'Hygiène' },
  { value: 'sante', label: 'Santé' },
  { value: 'sport', label: 'Sport' },
  { value: 'bien_etre', label: 'Bien-être' },
  { value: 'mental', label: 'Santé mentale' },
  { value: 'matin', label: 'Matin' },

  // Travail et études
  { value: 'travail', label: 'Travail' },
  { value: 'etudes', label: 'Études' },
  { value: 'projets', label: 'Projets' },

  // Gestion et obligations
  { value: 'finance', label: 'Finances' },

  // Relations sociales
  { value: 'famille', label: 'Famille' },
  { value: 'amis', label: 'Amis' },
  { value: 'couple', label: 'Couple' },

  // Plaisir et loisirs
  { value: 'plaisir', label: 'Plaisir' },
  { value: 'loisirs', label: 'Loisirs' },
  { value: 'voyages', label: 'Voyages' },
  { value: 'vacances', label: 'Vacances' },
  { value: 'musique', label: 'Musique' },
  { value: 'films_series', label: 'Films & Séries' },

  // Développement personnel
  { value: 'creativite', label: 'Créativité' },
  { value: 'apprentissage', label: 'Apprentissage' },
  { value: 'spiritualite', label: 'Spiritualité' },

  // Organisation et logistique
  { value: 'organisation', label: 'Organisation' },
  { value: 'numerique', label: 'Numérique & Informatique' },

  // Autres
  { value: 'ecologie', label: 'Écologie' },
  { value: 'animaux', label: 'Animaux' },
  { value: 'jardinage', label: 'Jardinage' },
  { value: 'benevolat', label: 'Bénévolat' },
  { value: 'autre', label: 'Autre' },
];

  
export const TASK_PRIORITIES = [
  {
    value: 'lowest',
    label: 'Très basse',
    icon: 'chevrons-down',
  },
  {
    value: 'low',
    label: 'Basse',
    icon: 'arrow-down',
  },
  {
    value: 'normal',
    label: 'Normale',
    icon: 'minus',
  },
  {
    value: 'medium',
    label: 'Modérée',
    icon: 'arrow-right',
  },
  {
    value: 'high',
    label: 'Haute',
    icon: 'arrow-up',
  },
  {
    value: 'urgent',
    label: 'Urgente',
    icon: 'alert-circle',
  },
  {
    value: 'critical',
    label: 'Critique',
    icon: 'alert-triangle',
  },
];
  
  // Périodes de la journée : une tâche peut en avoir plusieurs, cochées une à une
  export const TASK_PERIODS = [
    { value: 'matin', label: 'Matin' },
    { value: 'aprem', label: 'Aprem' },
    { value: 'soir', label: 'Soir' },
  ]

  // Types de tâches : un bloc par type dans chaque catégorie, dans cet ordre
  export const TASK_TYPE_SECTIONS = [
    { key: 'none', label: 'Uniques' },
    { key: 'daily', label: 'Quotidiennes' },
    { key: 'weekly', label: 'Hebdomadaires' },
    { key: 'monthly', label: 'Mensuelles' },
    { key: 'yearly', label: 'Annuelles' },
    { key: 'everyXDays', label: 'Tous les X jours' },
  ]

  export const TASK_VIEWS = [
    'Vue d’ensemble',
    'Toutes les tâches',
    'À venir',
    'Terminées',
  ]
  
  export function getToday() {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
  
    return `${year}-${month}-${day}`
  }
  
  export function createTaskId() {
    return `task-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 9)}`
  }
  
  export function isTaskCompleted(task) {
    return Boolean(task.completed)
  }
  
  export function isTaskOverdue(task, today = getToday()) {
    return Boolean(
      task.due &&
        task.due < today &&
        !isTaskCompleted(task),
    )
  }
  
  export function isTaskDueToday(task, today = getToday()) {
    return Boolean(
      task.due === today &&
        !isTaskCompleted(task),
    )
  }
  
  export function isTaskUpcoming(task, today = getToday()) {
    return Boolean(
      task.due &&
        task.due > today &&
        !isTaskCompleted(task),
    )
  }
  
  export function getCategoryLabel(value) {
    return (
      TASK_CATEGORIES.find(
        (category) => category.value === value,
      )?.label ?? 'Autre'
    )
  }
  
  export function getPriority(value) {
    return (
      TASK_PRIORITIES.find(
        (priority) => priority.value === value,
      ) ?? TASK_PRIORITIES[1]
    )
  }
  
  export function getSubtaskProgress(task) {
    const subtasks = Array.isArray(task.subtasks)
      ? task.subtasks
      : []
  
    const total = subtasks.length
    const completed = subtasks.filter(
      (subtask) => subtask.completed,
    ).length
  
    return {
      total,
      completed,
      percentage:
        total === 0 ? 0 : Math.round((completed / total) * 100),
    }
  }
  
  export function filterTasks(
    tasks,
    {
      search = '',
      category = 'all',
      priority = 'all',
      status = 'all',
    } = {},
  ) {
    const normalizedSearch = search.trim().toLowerCase()
  
    return tasks.filter((task) => {
      const matchesSearch =
        !normalizedSearch ||
        task.title.toLowerCase().includes(normalizedSearch)
  
      const matchesCategory =
        category === 'all' || task.category === category
  
      const matchesPriority =
        priority === 'all' || task.priority === priority
  
      const matchesStatus =
        status === 'all' ||
        (status === 'active' && isTaskOpen(task)) ||
        (status === 'completed' && task.completed) ||
        (status === 'overdue' && isTaskOverdue(task))
  
      return (
        matchesSearch &&
        matchesCategory &&
        matchesPriority &&
        matchesStatus
      )
    })
  }
  
  export function sortTasksByManualOrder(tasks) {
    return [...tasks].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0),
    )
  }
  
/* ---------------------------------------------------------
   Périodes (matin / aprem / soir)
   --------------------------------------------------------- */

export function hasPeriods(task) {
  return Array.isArray(task?.periods) && task.periods.length > 0
}

/** Ne garde que les périodes connues, dans l'ordre de la journée. */
export function normalizePeriods(values) {
  if (!Array.isArray(values)) return []
  return TASK_PERIODS.map((period) => period.value).filter((value) =>
    values.includes(value),
  )
}

export function isPeriodChecked(task, period) {
  return Array.isArray(task.periodsDone) && task.periodsDone.includes(period)
}

function allPeriodsDone(task, periodsDone) {
  return task.periods.every((period) => periodsDone.includes(period))
}

/* ---------------------------------------------------------
   Points d'expérience (XP) attribués par tâche
   Une même action ne rapporte jamais deux fois dans la même
   période : décocher puis recocher ne fait pas de la « farine ».
   --------------------------------------------------------- */

const XP_KEYS_LIMIT = 120

export function rewardTaskXp(task, key) {
  const keys = Array.isArray(task.xpKeys) ? task.xpKeys : []

  if (keys.includes(key)) return task

  return {
    ...task,
    xpCount: (Number(task.xpCount) || 0) + 1,
    xpKeys: [...keys, key].slice(-XP_KEYS_LIMIT),
  }
}

/** Clé de récompense d'une tâche complétée (une fois par période). */
export function getCompletionKey(task) {
  return task.periodKey ?? 'once'
}

/** Coche ou décoche une période. Renvoie la tâche mise à jour. */
export function setPeriodChecked(task, period, now = new Date()) {
  if (!hasPeriods(task) || !task.periods.includes(period)) return task

  const nowIso = now.toISOString()
  const current = Array.isArray(task.periodsDone) ? task.periodsDone : []
  const checked = current.includes(period)

  const periodsDone = checked
    ? current.filter((value) => value !== period)
    : [...current, period]

  const completed = allPeriodsDone(task, periodsDone)

  const next = {
    ...task,
    periodsDone,
    completed,
    completedAt: completed ? task.completedAt ?? nowIso : null,
    updatedAt: nowIso,
  }

  return checked
    ? next
    : rewardTaskXp(next, `${getCompletionKey(task)}:${period}`)
}

/** Coche toutes les périodes, ou les décoche toutes. */
export function setAllPeriods(task, checkAll, now = new Date()) {
  if (!hasPeriods(task)) return task

  const nowIso = now.toISOString()

  if (!checkAll) {
    return {
      ...task,
      periodsDone: [],
      completed: false,
      completedAt: null,
      updatedAt: nowIso,
    }
  }

  let next = {
    ...task,
    periodsDone: [...task.periods],
    completed: true,
    completedAt: task.completedAt ?? nowIso,
    updatedAt: nowIso,
  }

  task.periods.forEach((period) => {
    if (!isPeriodChecked(task, period)) {
      next = rewardTaskXp(next, `${getCompletionKey(task)}:${period}`)
    }
  })

  return next
}

/* ---------------------------------------------------------
   Progression en pourcentage
   --------------------------------------------------------- */

/**
 * Pourcentage d'avancement d'une tâche, selon son mode :
 * périodes cochées, répétitions de timer, valeur du compteur,
 * sous-tâches, sinon 0 % ou 100 % (case cochée).
 */
export function getTaskProgress(task, nowMs = Date.now()) {
  if (task.completed) return 100

  if (hasPeriods(task)) {
    const done = task.periods.filter((period) =>
      isPeriodChecked(task, period),
    ).length

    return Math.round((done / task.periods.length) * 100)
  }

  if (isTimerBehavior(task)) {
    const view = getTimerView(task, nowMs)
    const fraction =
      view.phase === 'rest' ? 0 : view.progress ?? 0
    const ratio = (view.repsDone + fraction) / view.repeatCount

    return Math.min(100, Math.round(ratio * 100))
  }

  if (isCounterBehavior(task)) {
    const goal = getCounterGoal(task)
    if (goal <= 0) return 0

    return Math.min(
      100,
      Math.round(((Number(task.counterValue) || 0) / goal) * 100),
    )
  }

  const subtasks = getSubtaskProgress(task)
  if (subtasks.total > 0) return subtasks.percentage

  return 0
}

/** Moyenne des pourcentages d'un ensemble de tâches. */
export function getAverageProgress(tasks, nowMs = Date.now()) {
  if (tasks.length === 0) return 0

  const total = tasks.reduce(
    (sum, task) => sum + getTaskProgress(task, nowMs),
    0,
  )

  return Math.round(total / tasks.length)
}

/** Identifiant du type d'une tâche : unique, daily, weekly, etc. */
export function getTaskTypeKey(task) {
  return task.recurrence || 'none'
}

function clampInt(value, min, max, fallback) {
  const number = Number(value)
  if (value === '' || value == null || !Number.isFinite(number)) return fallback
  return Math.min(max, Math.max(min, Math.round(number)))
}

/**
 * Une tâche « ouverte » reste visible dans la liste du jour :
 * les routines (récurrentes ou négatives) apparaissent toujours,
 * les autres disparaissent une fois terminées.
 */
export function isTaskOpen(task) {
  return !task.completed || isRoutine(task)
}

export const COUNTER_UNITS = [
  { value: 'seconds', label: 'Secondes', shortLabel: 's' },
  { value: 'minutes', label: 'Minutes', shortLabel: 'min' },
  { value: 'hours', label: 'Heures', shortLabel: 'h' },
]

export function getCounterUnit(unit) {
  return COUNTER_UNITS.find((item) => item.value === unit)
    ?? COUNTER_UNITS[1]
}

export function createTaskData(values, existingTask = null) {
  const now = new Date()
  const nowIso = now.toISOString()

  const kind = values.kind === 'negative' ? 'negative' : 'normal'

  const recurrence = RECURRENCES.some((item) => item.value === values.recurrence)
    ? values.recurrence
    : 'none'

  const behavior =
    kind === 'negative'
      ? 'check'
      : BEHAVIORS.some((item) => item.value === values.behavior)
        ? values.behavior
        : 'check'

  const recurrenceInterval = clampInt(values.recurrenceInterval, 1, 365, 2)

  const recurrenceAnchor =
    existingTask?.recurrenceAnchor ?? toDateKey(now)

  // Périodes : seulement pour une case à cocher classique
  const periods =
    kind === 'normal' && behavior === 'check'
      ? normalizePeriods(values.periods)
      : []

  // Si la cadence change, la progression repart de zéro
  const cadenceChanged =
    Boolean(existingTask) &&
    (existingTask.recurrence !== recurrence ||
      Number(existingTask.recurrenceInterval) !== recurrenceInterval ||
      existingTask.kind !== kind ||
      existingTask.behavior !== behavior)

  const draft = { recurrence, recurrenceInterval, recurrenceAnchor, createdAt: existingTask?.createdAt ?? nowIso }

  const completedBase = cadenceChanged
    ? kind === 'negative'
    : existingTask
      ? existingTask.completed
      : kind === 'negative'

  // Périodes déjà cochées (repartent de zéro si la cadence change)
  const periodsDone = (
    cadenceChanged ? [] : existingTask?.periodsDone ?? []
  ).filter((period) => periods.includes(period))

  // Avec des périodes, la tâche est terminée quand toutes sont faites
  const completed =
    periods.length > 0 ? allPeriodsDone({ periods }, periodsDone) : completedBase

  return {
    id: existingTask?.id ?? createTaskId(),
    title: String(values.title ?? '').trim(),
    icon: values.icon || existingTask?.icon || DEFAULT_TASK_ICON,
    color: TASK_COLOR_PALETTES.some((palette) => palette.id === values.color)
      ? values.color
      : TASK_COLOR_PALETTES.some((palette) => palette.id === existingTask?.color)
        ? existingTask.color
        : DEFAULT_TASK_COLOR,
    // Une tâche répétée n'a pas d'échéance unique
    due: recurrence === 'none' ? values.due || '' : '',
    // Heure d'échéance (HH:MM) et rappel en minutes avant l'échéance
    dueTime: recurrence === 'none' && values.due ? values.dueTime || '' : '',
    reminderBefore:
      recurrence === 'none' && values.dueTime && values.reminderBefore !== '' && values.reminderBefore != null
        ? String(values.reminderBefore)
        : '',
    priority: values.priority || 'normal',
    category: values.category || 'personnel',
    duration:
      values.duration === '' || values.duration == null
        ? ''
        : Number(values.duration),
    notes: String(values.notes ?? '').trim(),
    subtasks: Array.isArray(values.subtasks)
      ? values.subtasks.map((subtask) => ({
          id: subtask.id || createTaskId(),
          title: String(subtask.title ?? '').trim(),
          completed: Boolean(subtask.completed),
        }))
      : [],

    // Nature et répétition
    kind,
    recurrence,
    recurrenceInterval,
    recurrenceAnchor,
    periodKey: cadenceChanged
      ? null
      : existingTask?.periodKey ?? getPeriodKey(draft, now),

    // Mode de la tâche : classique, timer, X fois timer, compteur
    behavior,
    timerMinutes:
      values.timerMinutes === '' || values.timerMinutes == null
        ? ''
        : Number(values.timerMinutes),
    repeatCount: clampInt(values.repeatCount, 1, 99, 1),
    restMinutes: clampInt(values.restMinutes, 0, 1440, 0),
    counterGoal: clampInt(values.counterGoal, 0, 100000, 0),
    counterStep: clampInt(values.counterStep, 1, 1000, 1),
    counterUnit: getCounterUnit(values.counterUnit).value,

    // Périodes de la journée et leur avancement
    periods,
    periodsDone,

    // Progression courante
    timer: cadenceChanged
      ? createTimerState()
      : existingTask?.timer ?? createTimerState(),
    counterValue: cadenceChanged ? 0 : existingTask?.counterValue ?? 0,

    completed,

    // Points d'expérience gagnés par cette tâche (conservés à l'édition)
    xpCount: existingTask?.xpCount ?? 0,
    xpKeys: existingTask?.xpKeys ?? [],

    createdAt: existingTask?.createdAt ?? nowIso,
    completedAt: existingTask?.completedAt ?? (completed && !existingTask ? nowIso : null),
    updatedAt: nowIso,
    order: existingTask?.order ?? 0,
  }
}

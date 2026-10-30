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
  { value: 'courses', label: 'Courses' },
  { value: 'repas', label: 'Repas' },

  // Santé et bien-être
  { value: 'hygiene', label: 'Hygiène' },
  { value: 'sante', label: 'Santé' },
  { value: 'sport', label: 'Sport' },
  { value: 'bien_etre', label: 'Bien-être' },
  { value: 'mental', label: 'Santé mentale' },

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
        (status === 'active' && !task.completed) ||
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
  
  export function createTaskData(values, existingTask = null) {
    const now = new Date().toISOString()
  
    return {
      id: existingTask?.id ?? createTaskId(),
      title: String(values.title ?? '').trim(),
      icon: values.icon || existingTask?.icon || DEFAULT_TASK_ICON,
      color: TASK_COLOR_PALETTES.some(
        (palette) => palette.id === values.color
      )
        ? values.color
        : TASK_COLOR_PALETTES.some(
              (palette) => palette.id === existingTask?.color
            )
          ? existingTask.color
          : DEFAULT_TASK_COLOR,
      due: values.due || '',
      priority: values.priority || 'normal',
      category: values.category || 'personnel',
      duration:
        values.duration === '' ||
        values.duration == null
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
      completed: existingTask?.completed ?? false,
      createdAt: existingTask?.createdAt ?? now,
      completedAt: existingTask?.completedAt ?? null,
      updatedAt: now,
      order: existingTask?.order ?? 0,
    }
  }
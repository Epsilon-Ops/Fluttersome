export const TASK_CATEGORIES = [
    { value: 'etudes', label: 'Études' },
    { value: 'maison', label: 'Maison' },
    { value: 'administratif', label: 'Administratif' },
    { value: 'personnel', label: 'Personnel' },
    { value: 'loisirs', label: 'Loisirs' },
    { value: 'courses', label: 'Courses' },
    { value: 'autre', label: 'Autre' },
  ]
  
  export const TASK_PRIORITIES = [
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
      value: 'high',
      label: 'Haute',
      icon: 'arrow-up',
    },
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
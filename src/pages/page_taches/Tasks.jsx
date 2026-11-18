
import { useMemo, useState } from 'react'
import '../../styles/main_pages/page_taches/index.css'

import useTasks from '../../hooks/useTasks'
import {
  filterTasks,
  isTaskUpcoming,
} from '../../utils/taskHelpers'

import TasksHeader from './TasksHeader'
import '../../styles/main_pages/page_taches/routines-timers.css'
import TasksTabs from './TasksTabs'
import TasksOverview from './TasksOverview'
import TasksToolbar from './TasksToolbar'
import TasksList from './TasksList'
import TasksFormModal from './TasksFormModal'
import TasksQuickAdd from './TasksQuickAdd'
import '../../styles/main_pages/page_taches/quick-add.css'
import TasksStorageNote from './TasksStorageNote'
import useTaskLayout from '../../hooks/useTaskLayout'
import { TaskLayoutContext, TaskActionsContext } from './TaskLayoutContext'
import TaskTimerScreen from './TaskTimerScreen'
import { isTaskOpen } from '../../utils/taskHelpers'

// Par défaut on n'affiche que les tâches à faire (« À faire »).
// Les tâches terminées apparaissent dans l'onglet « Terminées »
// ou si l'on choisit « Tous » dans le filtre Statut.
const INITIAL_FILTERS = {
  search: '',
  category: 'all',
  priority: 'all',
  status: 'active',
}

const TAB_TITLES = {
  overview: 'Vue d’ensemble',
  all: 'Toutes les tâches',
  upcoming: 'À venir',
  completed: 'Terminées',
}

export default function Tasks() {
  const {
    tasks,
    storageError,
    addTask,
    updateTask,
    deleteTask,
    deleteTasks,
    toggleTaskCompleted,
    toggleSubtask,
    changeCounter,
    timerAction,
  } = useTasks()

  const [activeTab, setActiveTab] = useState('overview')
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [timerTaskId, setTimerTaskId] = useState(null)
  const layoutApi = useTaskLayout()
  const timerTask = tasks.find((task) => task.id === timerTaskId) ?? null

  const actionsApi = {
    openTimer: (id) => setTimerTaskId(id),
    changeCounter,
  }

  const todayLabel = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())

  const counts = useMemo(
    () => ({
      overview: tasks.filter(isTaskOpen).length,
      all: tasks.length,
      upcoming: tasks.filter(
        (task) => !task.completed && isTaskUpcoming(task),
      ).length,
      completed: tasks.filter((task) => task.completed).length,
    }),
    [tasks],
  )

  const filteredTasks = useMemo(
    () => filterTasks(tasks, filters),
    [tasks, filters],
  )

  const visibleTasks = useMemo(() => {
    if (activeTab === 'completed') {
      return filteredTasks.filter((task) => task.completed)
    }

    if (activeTab === 'upcoming') {
      return filteredTasks.filter(
        (task) => !task.completed && isTaskUpcoming(task),
      )
    }

    if (activeTab === 'all') {
      return filteredTasks
    }

    return filteredTasks.filter(isTaskOpen)
  }, [activeTab, filteredTasks])

  const activeFilterCount = [
    filters.search.trim() !== '',
    filters.category !== 'all',
    filters.priority !== 'all',
    filters.status !== 'active',
  ].filter(Boolean).length

  function updateFilter(field, value) {
    setFilters((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function resetFilters() {
    setFilters(INITIAL_FILTERS)
  }

  function openCreateForm() {
    setEditingTask(null)
    setFormOpen(true)
  }

  function openEditForm(task) {
    setEditingTask(task)
    setFormOpen(true)
  }

  function closeForm() {
    setFormOpen(false)
    setEditingTask(null)
  }

  function handleSave(values) {
    if (editingTask) {
      updateTask(editingTask.id, values)
    } else {
      addTask(values)
    }

    closeForm()
  }

  // Supprime les tâches terminées actuellement affichées (les filtres sont respectés)
  function clearVisibleCompleted() {
    const ids = visibleTasks
      .filter((task) => task.completed)
      .map((task) => task.id)

    if (ids.length === 0) return

    const confirmed = window.confirm(
      `Supprimer définitivement ${ids.length} tâche(s) terminée(s) ?`,
    )

    if (confirmed) {
      deleteTasks(ids)
    }
  }

  function changeTab(tab) {
    setActiveTab(tab)

    setFilters((current) => ({
      ...current,
      status:
        tab === 'completed'
          ? 'completed'
          : current.status === 'completed'
            ? 'active'
            : current.status,
    }))
  }

  return (
    <TaskLayoutContext.Provider value={layoutApi}>
    <TaskActionsContext.Provider value={actionsApi}>
    <div className="dashboard tasks-page">
      <TasksHeader />

      <TasksQuickAdd onAdd={addTask} />

      <section className="tasks-page-heading">
        <div>
          <span className="eyebrow">ESPACE PERSONNEL</span>
          <h2>{TAB_TITLES[activeTab] ?? 'Mes tâches'}</h2>
          <p className="tasks-date">{todayLabel}</p>
        </div>

        <button
          type="button"
          className="tasks-primary-button"
          onClick={openCreateForm}
        >
          <span aria-hidden="true">+</span>
          Nouvelle tâche
        </button>
      </section>

      <TasksTabs
        activeTab={activeTab}
        onChange={changeTab}
        counts={counts}
      />

      <details
        className="tasks-filter-panel"
        open={filtersOpen}
        onToggle={(event) => setFiltersOpen(event.currentTarget.open)}
      >
        <summary className="tasks-filter-summary">
          <span className="tasks-filter-summary-label">
            <span aria-hidden="true">☷</span>
            Recherche et filtres
            {activeFilterCount > 0 && (
              <span className="tasks-filter-count">
                {activeFilterCount}
              </span>
            )}
          </span>

          <span className="tasks-filter-summary-action">
            {filtersOpen ? 'Réduire' : 'Afficher'}
            <span aria-hidden="true">
              {filtersOpen ? '−' : '+'}
            </span>
          </span>
        </summary>

        <div className="tasks-filter-content">
          <TasksToolbar
            search={filters.search}
            onSearchChange={(value) =>
              updateFilter('search', value)
            }
            category={filters.category}
            onCategoryChange={(value) =>
              updateFilter('category', value)
            }
            priority={filters.priority}
            onPriorityChange={(value) =>
              updateFilter('priority', value)
            }
            status={filters.status}
            onStatusChange={(value) =>
              updateFilter('status', value)
            }
            onCreate={openCreateForm}
          />

          {activeFilterCount > 0 && (
            <button
              type="button"
              className="tasks-reset-filters"
              onClick={resetFilters}
            >
              Effacer les filtres
            </button>
          )}
        </div>
      </details>

      {activeTab === 'overview' ? (
        <TasksOverview
          tasks={visibleTasks}
          onToggleCompleted={toggleTaskCompleted}
          onEdit={openEditForm}
          onDelete={deleteTask}
          onToggleSubtask={toggleSubtask}
          onCreate={openCreateForm}
        />
      ) : (
        <section className="tasks-section">
          <div className="tasks-section-heading">
            <div>
              <span className="eyebrow">
                {activeTab === 'completed'
                  ? 'HISTORIQUE'
                  : activeTab === 'upcoming'
                    ? 'ÉCHÉANCES FUTURES'
                    : 'LISTE COMPLÈTE'}
              </span>
              <h2>
                {visibleTasks.length}{' '}
                {visibleTasks.length > 1 ? 'tâches' : 'tâche'}
              </h2>
            </div>

            {activeTab === 'completed' &&
              visibleTasks.some((task) => task.completed) && (
                <button
                  type="button"
                  className="tasks-bulk-delete"
                  onClick={clearVisibleCompleted}
                >
                  Supprimer les terminées
                </button>
              )}
          </div>

          <TasksList
            tasks={visibleTasks}
            onToggleCompleted={toggleTaskCompleted}
            onEdit={openEditForm}
            onDelete={deleteTask}
            onToggleSubtask={toggleSubtask}
            showBulkToggle
          />

          {visibleTasks.length === 0 && (
            <div className="tasks-empty">
              <span className="tasks-empty-icon">✓</span>
              <h3>
                {activeTab === 'completed'
                  ? 'Aucune tâche terminée'
                  : activeTab === 'upcoming'
                    ? 'Rien de prévu pour la suite'
                    : 'Aucune tâche trouvée'}
              </h3>
              <p>
                Modifie tes filtres ou ajoute une nouvelle tâche.
              </p>

              {activeFilterCount > 0 && (
                <button
                  type="button"
                  className="tasks-secondary-button"
                  onClick={resetFilters}
                >
                  Effacer les filtres
                </button>
              )}

              <button
                type="button"
                className="tasks-primary-button"
                onClick={openCreateForm}
              >
                + Nouvelle tâche
              </button>
            </div>
          )}
        </section>
      )}

      <TasksStorageNote error={storageError} />

      <TasksFormModal
        open={formOpen}
        task={editingTask}
        onClose={closeForm}
        onSave={handleSave}
      />
      {timerTask && (
        <TaskTimerScreen
          task={timerTask}
          onClose={() => setTimerTaskId(null)}
          onAction={timerAction}
        />
      )}
    </div>
    </TaskActionsContext.Provider>
    </TaskLayoutContext.Provider>
  )
}

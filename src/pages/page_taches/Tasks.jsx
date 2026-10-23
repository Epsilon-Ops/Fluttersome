import { useMemo, useState } from 'react'
import '../../styles/Tasks.css'

import useTasks from '../../hooks/useTasks'
import {
  filterTasks,
  isTaskUpcoming,
} from '../../utils/taskHelpers'

import TasksHeader from './TasksHeader'
import TasksTabs from './TasksTabs'
import TasksOverview from './TasksOverview'
import TasksToolbar from './TasksToolbar'
import TasksList from './TasksList'
import TasksFormModal from './TasksFormModal'
import TasksStorageNote from './TasksStorageNote'

const INITIAL_FILTERS = {
  search: '',
  category: 'all',
  priority: 'all',
  status: 'all',
}

export default function Tasks() {
  const {
    tasks,
    storageError,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompleted,
    toggleSubtask,
  } = useTasks()

  const [activeTab, setActiveTab] = useState('overview')
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [formOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const today = new Date()
  const todayLabel = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(today)

  const counts = useMemo(
    () => ({
      overview: tasks.filter((task) => !task.completed).length,
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

    return filteredTasks.filter((task) => !task.completed)
  }, [activeTab, filteredTasks])

  function updateFilter(field, value) {
    setFilters((current) => ({
      ...current,
      [field]: value,
    }))
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

  function changeTab(tab) {
    setActiveTab(tab)

    if (tab === 'completed') {
      setFilters((current) => ({
        ...current,
        status: 'completed',
      }))
    } else if (filters.status === 'completed') {
      setFilters((current) => ({
        ...current,
        status: 'all',
      }))
    }
  }

  return (
    <div className="dashboard tasks-page">
      <TasksHeader />

      <section className="tasks-page-heading">
        <div>
          <span className="eyebrow">ESPACE PERSONNEL</span>
          <h2>
            {activeTab === 'overview'
              ? 'Vue d’ensemble'
              : activeTab === 'all'
                ? 'Toutes les tâches'
                : activeTab === 'upcoming'
                  ? 'À venir'
                  : 'Terminées'}
          </h2>
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
              <h2>{visibleTasks.length} tâche(s)</h2>
            </div>
          </div>

          <TasksList
            tasks={visibleTasks}
            onToggleCompleted={toggleTaskCompleted}
            onEdit={openEditForm}
            onDelete={deleteTask}
            onToggleSubtask={toggleSubtask}
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
                Essaie de modifier tes filtres ou ajoute une
                nouvelle tâche.
              </p>
              <button
                type="button"
                className="tasks-secondary-button"
                onClick={() => setFilters(INITIAL_FILTERS)}
              >
                Réinitialiser les filtres
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
    </div>
  )
}
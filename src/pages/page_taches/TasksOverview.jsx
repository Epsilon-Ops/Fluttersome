import { useState } from 'react'
import CollapsibleBlock, {
  readCollapsedState,
  writeCollapsedState,
} from '../../components/CollapsibleSection'

import {
  getToday,
  isTaskDueToday,
  isTaskOpen,
  isTaskOverdue,
  isTaskUpcoming,
} from '../../utils/taskHelpers'
import { isRoutine } from '../../utils/recurrenceHelpers'

import TasksList from './TasksList'

// Section repliable dont l'état est mémorisé (comme les autres blocs de l'appli)
function TaskSection({
  id,
  eyebrow,
  title,
  count,
  children,
  defaultOpen = false,
  variant = '',
}) {
  const [open, setOpen] = useState(() =>
    readCollapsedState(id, defaultOpen),
  )

  function toggle() {
    setOpen((current) => {
      const next = !current
      writeCollapsedState(id, next)
      return next
    })
  }

  return (
    <section className={`tasks-section ${variant}`}>
      <button
        type="button"
        className="tasks-collapsible-heading"
        onClick={toggle}
        aria-expanded={open}
      >
        <span className="tasks-collapsible-title">
          <span className="eyebrow">{eyebrow}</span>
          <span className="tasks-collapsible-name">{title}</span>
        </span>

        <span className="tasks-collapsible-actions">
          <span className={`tasks-count ${variant === 'overdue' ? 'danger' : ''}`}>
            {count}
          </span>
          <span className="tasks-chevron" aria-hidden="true">
            {open ? '−' : '+'}
          </span>
        </span>
      </button>

      {open && (
        <div className="tasks-collapsible-content">{children}</div>
      )}
    </section>
  )
}

export default function TasksOverview({
  tasks,
  onToggleCompleted,
  onEdit,
  onDelete,
  onToggleSubtask,
  onCreate,
}) {
  const openTasks = tasks.filter(isTaskOpen)

  const activeTasks = openTasks.filter((task) => !task.completed)

  // Routines (récurrentes ou négatives) apparaissent chaque jour, cochées ou non
  const todayTasks = openTasks.filter(
    (task) => isRoutine(task) || isTaskDueToday(task),
  )

  // Fonctions fléchées : filter() transmettrait l'index comme « today »
  const overdueTasks = activeTasks.filter((task) => isTaskOverdue(task))

  const upcomingTasks = activeTasks
    .filter((task) => isTaskUpcoming(task))
    .sort((a, b) => a.due.localeCompare(b.due))
    .slice(0, 5)

  const completedToday = tasks.filter(
    (task) =>
      task.completed &&
      task.completedAt?.slice(0, 10) === getToday(),
  ).length

  const listProps = {
    onToggleCompleted,
    onEdit,
    onDelete,
    onToggleSubtask,
  }

  return (
    <div className="tasks-overview">
      <CollapsibleBlock
        id="task-stats"
        title="Statistiques"
        summary={`${activeTasks.length} tâche(s) active(s)`}
        defaultOpen={false}
      >
        <section className="tasks-stats-panel">
          <div className="tasks-stats-grid">
            <article className="tasks-stat-card">
              <span className="tasks-stat-label">Tâches actives</span>
              <strong>{activeTasks.length}</strong>
            </article>

            <article className="tasks-stat-card">
              <span className="tasks-stat-label">Aujourd'hui</span>
              <strong>{todayTasks.length}</strong>
            </article>

            <article className="tasks-stat-card overdue">
              <span className="tasks-stat-label">En retard</span>
              <strong>{overdueTasks.length}</strong>
            </article>

            <article className="tasks-stat-card">
              <span className="tasks-stat-label">
                Terminées aujourd'hui
              </span>
              <strong>{completedToday}</strong>
            </article>
          </div>
        </section>
      </CollapsibleBlock>

      {overdueTasks.length > 0 && (
        <TaskSection
          id="tasks-overdue"
          eyebrow="À TRAITER"
          title="En retard"
          count={overdueTasks.length}
          variant="overdue"
          defaultOpen
        >
          <TasksList tasks={overdueTasks} {...listProps} />
        </TaskSection>
      )}

      <TaskSection
        id="tasks-today"
        eyebrow="TA JOURNÉE"
        title="Aujourd'hui"
        count={todayTasks.length}
        defaultOpen
      >
        {todayTasks.length > 0 ? (
          <TasksList tasks={todayTasks} {...listProps} />
        ) : (
          <div className="tasks-empty">
            <span className="tasks-empty-icon">✓</span>
            <h3>Une journée qui commence bien !</h3>
            <p>
              Aucune tâche prévue aujourd'hui. Tu peux profiter
              de cette tranquillité ou planifier la suite.
            </p>
            <button
              type="button"
              className="tasks-primary-button"
              onClick={onCreate}
            >
              + Nouvelle tâche
            </button>
          </div>
        )}
      </TaskSection>

      <TaskSection
        id="tasks-upcoming"
        eyebrow="PROCHAINEMENT"
        title="À venir"
        count={upcomingTasks.length}
      >
        {upcomingTasks.length > 0 ? (
          <TasksList tasks={upcomingTasks} {...listProps} />
        ) : (
          <p className="tasks-muted">
            Aucune échéance à venir pour le moment.
          </p>
        )}
      </TaskSection>
    </div>
  )
}

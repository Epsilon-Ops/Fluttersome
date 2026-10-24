
import { useState } from 'react'

import {
  getToday,
  isTaskDueToday,
  isTaskOverdue,
  isTaskUpcoming,
} from '../../utils/taskHelpers'

import TasksList from './TasksList'

function CollapsibleSection({
  eyebrow,
  title,
  count,
  children,
  defaultOpen = false,
  variant = '',
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className={`tasks-section ${variant}`}>
      <button
        type="button"
        className="tasks-collapsible-heading"
        onClick={() => setOpen((current) => !current)}
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
        <div className="tasks-collapsible-content">
          {children}
        </div>
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
  const [statsOpen, setStatsOpen] = useState(false)

  const activeTasks = tasks.filter((task) => !task.completed)

  const todayTasks = activeTasks.filter(isTaskDueToday)

  const overdueTasks = activeTasks.filter(isTaskOverdue)

  const upcomingTasks = activeTasks
    .filter(isTaskUpcoming)
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
      <section className="tasks-stats-panel">
        <button
          type="button"
          className="tasks-collapsible-heading"
          onClick={() => setStatsOpen((current) => !current)}
          aria-expanded={statsOpen}
        >
          <span className="tasks-collapsible-title">
            <span className="tasks-collapsible-name">
              Résumé de ton activité
            </span>
            <span className="tasks-muted">
              {activeTasks.length} tâche(s) active(s)
            </span>
          </span>

          <span className="tasks-chevron" aria-hidden="true">
            {statsOpen ? '−' : '+'}
          </span>
        </button>

        {statsOpen && (
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
        )}
      </section>

      {overdueTasks.length > 0 && (
        <CollapsibleSection
          eyebrow="À TRAITER"
          title="En retard"
          count={overdueTasks.length}
          variant="overdue"
        >
          <TasksList tasks={overdueTasks} {...listProps} />
        </CollapsibleSection>
      )}

      <CollapsibleSection
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
      </CollapsibleSection>

      <CollapsibleSection
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
      </CollapsibleSection>
    </div>
  )
}

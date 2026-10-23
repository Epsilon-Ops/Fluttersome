import {
    getCategoryLabel,
    getPriority,
    isTaskOverdue,
  } from '../../utils/taskHelpers'
  
  import TasksSubtasks from './TasksSubtasks'
  
  function formatDueDate(date) {
    if (!date) return ''
  
    const parsed = new Date(`${date}T12:00:00`)
  
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year:
        parsed.getFullYear() !== new Date().getFullYear()
          ? 'numeric'
          : undefined,
    }).format(parsed)
  }
  
  export default function TasksCard({
    task,
    onToggleCompleted,
    onEdit,
    onDelete,
    onToggleSubtask,
  }) {
    const priority = getPriority(task.priority)
    const overdue = isTaskOverdue(task)
  
    function handleDelete() {
      const confirmed = window.confirm(
        `Supprimer définitivement « ${task.title} » ?`,
      )
  
      if (confirmed) {
        onDelete?.(task.id)
      }
    }
  
    return (
      <article
        className={`task-card ${
          task.completed ? 'is-completed' : ''
        } ${overdue ? 'is-overdue' : ''}`}
      >
        <label
          className="task-card-checkbox"
          aria-label={
            task.completed
              ? 'Marquer comme non terminée'
              : 'Terminer cette tâche'
          }
        >
          <input
            type="checkbox"
            checked={Boolean(task.completed)}
            onChange={() => onToggleCompleted?.(task.id)}
          />
          <span />
        </label>
  
        <div className="task-card-main">
          <button
            type="button"
            className="task-card-title-button"
            onClick={() => onEdit?.(task)}
            disabled={task.completed}
          >
            <span className="task-card-title">
              {task.title}
            </span>
          </button>
  
          <div className="task-card-meta">
            <span className="task-category">
              {getCategoryLabel(task.category)}
            </span>
  
            <span
              className={`task-priority priority-${task.priority}`}
            >
              <span aria-hidden="true">
                {task.priority === 'high'
                  ? '↑'
                  : task.priority === 'low'
                    ? '↓'
                    : '−'}
              </span>
              {priority.label}
            </span>
  
            {task.due && (
              <span
                className={`task-due ${
                  overdue ? 'overdue' : ''
                }`}
              >
                <span aria-hidden="true">◷</span>
                {overdue
                  ? `En retard · ${formatDueDate(task.due)}`
                  : formatDueDate(task.due)}
              </span>
            )}
  
            {task.duration !== '' &&
              task.duration != null && (
                <span className="task-duration">
                  ◷ {task.duration} min
                </span>
              )}
          </div>
  
          {task.notes && (
            <p className="task-card-notes">{task.notes}</p>
          )}
  
          <TasksSubtasks
            task={task}
            onToggleSubtask={onToggleSubtask}
          />
        </div>
  
        <div className="task-card-actions">
          {!task.completed && (
            <button
              type="button"
              className="task-action-button"
              onClick={() => onEdit?.(task)}
              aria-label={`Modifier ${task.title}`}
              title="Modifier"
            >
              ✎
            </button>
          )}
  
          <button
            type="button"
            className="task-action-button delete"
            onClick={handleDelete}
            aria-label={`Supprimer ${task.title}`}
            title="Supprimer"
          >
            ×
          </button>
        </div>
      </article>
    )
  }
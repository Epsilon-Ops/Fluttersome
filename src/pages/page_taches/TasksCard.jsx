
import { AppIcon } from '../../components/icons/icon-utils/index'
import { getTaskColorPalette } from '../../components/icons/icon-utils/icon-colors'
import TasksSubtasks from './TasksSubtasks'
import { getCategoryLabel } from '../../utils/taskHelpers'

// Couleur d'icône lisible : sombre sur fond clair, blanche sur fond foncé.
function getReadableInk(hex = '#000000') {
  const value = hex.replace('#', '')
  const r = parseInt(value.slice(0, 2), 16) / 255
  const g = parseInt(value.slice(2, 4), 16) / 255
  const b = parseInt(value.slice(4, 6), 16) / 255
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance > 0.6 ? '#1A1400' : '#FFFFFF'
}

export default function TasksCard({
  task,
  dragHandleProps,
  onToggleCompleted,
  onEdit,
  onDelete,
  onToggleSubtask,
}) {
  const palette = getTaskColorPalette(task.color)

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
      }`}
      style={{
        '--task-primary': palette.primary,
        '--task-accent': palette.accent,
        '--task-ink': getReadableInk(palette.primary),
      }}
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

      {/* L'icône sert de poignée : on la glisse pour réordonner */}
      <div className="task-card-icon sortable-handle" {...dragHandleProps}>
        <AppIcon
          name={task.icon || 'check'}
          size={36}
          strokeWidth={1.4}
        />
      </div>

      <div className="task-card-main">
        <button
          type="button"
          className="task-card-title-button"
          onClick={() => onEdit?.(task)}
          disabled={task.completed}
        >
          <span className="task-card-title">{task.title}</span>
        </button>

        {task.category && (
          <span className="task-card-category">
            {getCategoryLabel(task.category)}
          </span>
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

import { useContext } from 'react'
import { AppIcon } from '../../components/icons/icon-utils/index'
import { getTaskColorPalette } from '../../components/icons/icon-utils/icon-colors'
import TasksSubtasks from './TasksSubtasks'
import { TaskActionsContext } from './TaskLayoutContext'
import {
  getCategoryLabel,
} from '../../utils/taskHelpers'
import {
  getBehaviorLabel,
  getCounterGoal,
  getCounterUnit,
  getRecurrenceLabel,
  getTimerConfig,
  isCounterBehavior,
  isNegative,
  isRecurring,
  isTimerBehavior,
} from '../../utils/recurrenceHelpers'

// Couleur d'icône lisible : sombre sur fond clair, blanche sur fond foncé.
function getReadableInk(hex = '#000000') {
  const value = hex.replace('#', '')
  const r = parseInt(value.slice(0, 2), 16) / 255
  const g = parseInt(value.slice(2, 4), 16) / 255
  const b = parseInt(value.slice(4, 6), 16) / 255
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance > 0.6 ? '#1A1400' : '#FFFFFF'
}

// Statut d'un timer, sans horloge en direct (la carte ne se met pas à jour seconde par seconde)
function getTimerStatus(task) {
  if (task.completed) return 'Terminé'

  const timer = task.timer ?? {}
  const { repeatCount, targetSec } = getTimerConfig(task)

  if (timer.runningSince != null) return 'En cours'
  if (timer.phase === 'rest') return 'En récupération'

  if (repeatCount > 1) {
    return `${timer.repsDone ?? 0}/${repeatCount} faites · ${targetSec / 60} min chacune`
  }

  return (timer.elapsedSec ?? 0) > 0
    ? `En pause · ${targetSec / 60} min`
    : `${targetSec / 60} min à compléter`
}

export default function TasksCard({
  task,
  dragHandleProps,
  onToggleCompleted,
  onEdit,
  onDelete,
  onToggleSubtask,
}) {
  const actions = useContext(TaskActionsContext)
  const palette = getTaskColorPalette(task.color)

  const negative = isNegative(task)
  const routine = isRecurring(task)
  const timer = isTimerBehavior(task)
  const counter = isCounterBehavior(task)
  const canEdit = !task.completed || routine || negative

  function handleDelete() {
    const confirmed = window.confirm(
      `Supprimer définitivement « ${task.title} » ?`,
    )

    if (confirmed) {
      onDelete?.(task.id)
    }
  }

  let checkboxLabel = task.completed
    ? 'Marquer comme non terminée'
    : 'Terminer cette tâche'

  if (negative) {
    checkboxLabel = task.completed
      ? 'Signaler une rechute'
      : 'Marquer comme tenu'
  }

  const counterGoal = getCounterGoal(task)
  const counterValue = Number(task.counterValue) || 0
  const counterUnit = getCounterUnit(task)
  const counterRatio =
    counterGoal > 0 ? Math.min(100, (counterValue / counterGoal) * 100) : 0

  return (
    <article
      className={`task-card ${task.completed ? 'is-completed' : ''} ${
        negative ? 'is-negative' : ''
      }`}
      style={{
        '--task-primary': palette.primary,
        '--task-accent': palette.accent,
        '--task-ink': getReadableInk(palette.primary),
      }}
    >
      <label className="task-card-checkbox" aria-label={checkboxLabel}>
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
          disabled={!canEdit}
        >
          <span className="task-card-title">{task.title}</span>
        </button>

        <div className="task-card-badges">
          {task.category && (
            <span className="task-card-category">
              {getCategoryLabel(task.category)}
            </span>
          )}
          {routine && (
            <span className="task-badge task-badge-routine">
              {getRecurrenceLabel(task)}
            </span>
          )}
          {negative && (
            <span className="task-badge task-badge-negative">
              À éviter
            </span>
          )}
          {timer && (
            <span className="task-badge">{getBehaviorLabel(task)}</span>
          )}
          {counter && (
            <span className="task-badge">{getBehaviorLabel(task)}</span>
          )}
        </div>

        {negative && !task.completed && (
          <p className="task-relapse-message">Tu vas y arriver !</p>
        )}

        {timer && (
          <div className="task-behavior">
            <span className="task-behavior-status">
              {getTimerStatus(task)}
            </span>
            <button
              type="button"
              className="task-timer-open"
              onClick={() => actions?.openTimer(task.id)}
            >
              {task.completed ? 'Voir le timer' : 'Ouvrir le timer'}
            </button>
          </div>
        )}

        {counter && (
          <div
            className="task-counter"
            role="group"
            aria-label={`Compteur en ${counterUnit.label.toLowerCase()}`}
          >
            <button
              type="button"
              onClick={() => actions?.changeCounter(task.id, -1)}
              disabled={counterValue <= 0}
              aria-label="Diminuer"
            >
              −
            </button>

            <span className="task-counter-value">
              <strong>{counterValue}</strong>
              <span> / {counterGoal} {counterUnit.shortLabel}</span>
            </span>

            <button
              type="button"
              onClick={() => actions?.changeCounter(task.id, 1)}
              aria-label="Augmenter"
            >
              +
            </button>

            <span className="task-counter-bar" aria-hidden="true">
              <span style={{ width: `${counterRatio}%` }} />
            </span>
          </div>
        )}

        <TasksSubtasks task={task} onToggleSubtask={onToggleSubtask} />
      </div>

      <div className="task-card-actions">
        {canEdit && (
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

/* =========================================================
   TasksCard — une tâche dans sa liste : case, icône, titre,
   barre de progression en pourcentage. Un clic sur la carte
   ouvre la popup de détail (modifier, supprimer, périodes,
   timer, compteur, sous-tâches).
   ========================================================= */

import { useContext } from 'react'
import { AppIcon } from '../../components/icons/icon-utils/index'
import { getTaskColorPalette } from '../../components/icons/icon-utils/icon-colors'
import { TaskActionsContext } from './TaskLayoutContext'
import {
  getCategoryLabel,
  getTaskProgress,
  hasPeriods,
} from '../../utils/taskHelpers'
import {
  getBehaviorLabel,
  getRecurrenceLabel,
  isCounterBehavior,
  isNegative,
  isRecurring,
  isTimerBehavior,
} from '../../utils/recurrenceHelpers'
import { getStatusLine } from './taskStatus'

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
}) {
  const actions = useContext(TaskActionsContext)
  const palette = getTaskColorPalette(task.color)

  const negative = isNegative(task)
  const routine = isRecurring(task)
  const progress = getTaskProgress(task)
  const statusLine = getStatusLine(task)

  let checkboxLabel = task.completed
    ? 'Marquer comme non terminée'
    : 'Terminer cette tâche'

  if (negative) {
    checkboxLabel = task.completed
      ? 'Signaler une rechute'
      : 'Marquer comme tenu'
  }

  if (hasPeriods(task)) {
    checkboxLabel = task.completed
      ? 'Décocher toutes les périodes'
      : 'Cocher toutes les périodes'
  }

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
          size={30}
          strokeWidth={1.4}
        />
      </div>

      <button
        type="button"
        className="task-card-open"
        onClick={() => actions?.openDetail(task.id)}
        aria-label={`Ouvrir le détail de ${task.title}`}
      >
        <span className="task-card-title">{task.title}</span>

        <span className="task-card-badges">
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
          {(isTimerBehavior(task) || isCounterBehavior(task)) && (
            <span className="task-badge">{getBehaviorLabel(task)}</span>
          )}
          {hasPeriods(task) && (
            <span className="task-badge task-badge-periods">
              {task.periods.length} période{task.periods.length > 1 ? 's' : ''}
            </span>
          )}
        </span>

        <span className="task-progress-row">
          <span className="task-progress-bar" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </span>
          <span className="task-progress-value">{progress}&nbsp;%</span>
        </span>

        {statusLine && (
          <span className="task-card-status">{statusLine}</span>
        )}
      </button>

      <span className="task-card-chevron" aria-hidden="true">
        ›
      </span>
    </article>
  )
}

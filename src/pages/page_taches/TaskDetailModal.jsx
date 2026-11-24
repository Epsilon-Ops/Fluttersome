/* =========================================================
   TaskDetailModal — popup de détail d'une tâche. Toutes les
   actions sont ici : cocher, périodes, timer, compteur,
   sous-tâches, modifier, supprimer.
   ========================================================= */

import { useEffect } from 'react'
import { AppIcon } from '../../components/icons/icon-utils/index'
import { getTaskColorPalette } from '../../components/icons/icon-utils/icon-colors'
import {
  getCounterGoal,
  getCounterUnit,
  getRecurrenceLabel,
  getBehaviorLabel,
  isCounterBehavior,
  isNegative,
  isRecurring,
  isTimerBehavior,
} from '../../utils/recurrenceHelpers'
import {
  TASK_PERIODS,
  getCategoryLabel,
  getPriority,
  getTaskProgress,
  hasPeriods,
  isPeriodChecked,
} from '../../utils/taskHelpers'
import { getStatusLine, getTimerStatus } from './taskStatus'

function getReadableInk(hex = '#000000') {
  const value = hex.replace('#', '')
  const r = parseInt(value.slice(0, 2), 16) / 255
  const g = parseInt(value.slice(2, 4), 16) / 255
  const b = parseInt(value.slice(4, 6), 16) / 255
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance > 0.6 ? '#1A1400' : '#FFFFFF'
}

function getToggleLabel(task) {
  if (hasPeriods(task)) {
    return task.completed ? 'Tout décocher' : 'Tout cocher'
  }

  if (isNegative(task)) {
    return task.completed ? 'Signaler une rechute' : 'Marquer comme tenu'
  }

  return task.completed ? 'Marquer comme non terminée' : 'Terminer cette tâche'
}

function formatDue(task) {
  if (isRecurring(task)) return 'Répétée, pas d’échéance unique'
  if (!task.due) return 'Aucune'

  const [year, month, day] = task.due.split('-')
  const date = `${day}/${month}/${year}`

  return task.dueTime ? `${date} à ${task.dueTime}` : date
}

export default function TaskDetailModal({
  task,
  onClose,
  onToggleCompleted,
  onTogglePeriod,
  onToggleSubtask,
  onChangeCounter,
  onOpenTimer,
  onEdit,
  onDelete,
}) {
  // Échap ferme la popup
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const palette = getTaskColorPalette(task.color)
  const progress = getTaskProgress(task)
  const statusLine = getStatusLine(task)
  const counterGoal = getCounterGoal(task)
  const counterValue = Number(task.counterValue) || 0
  const counterUnit = getCounterUnit(task)
  const subtasks = task.subtasks ?? []
  const periods = hasPeriods(task)

  return (
    <div
      className="tasks-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="tasks-modal task-detail"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-detail-title"
        style={{
          '--task-primary': palette.primary,
          '--task-accent': palette.accent,
          '--task-ink': getReadableInk(palette.primary),
        }}
      >
        <header className="task-detail-header">
          <div className="task-detail-icon" aria-hidden="true">
            <AppIcon name={task.icon || 'check'} size={32} strokeWidth={1.4} />
          </div>

          <div className="task-detail-heading">
            <span className="eyebrow">{getCategoryLabel(task.category)}</span>
            <h2 id="task-detail-title">{task.title}</h2>
            <span className="task-card-badges">
              {isRecurring(task) && (
                <span className="task-badge task-badge-routine">
                  {getRecurrenceLabel(task)}
                </span>
              )}
              {isNegative(task) && (
                <span className="task-badge task-badge-negative">À éviter</span>
              )}
              {(isTimerBehavior(task) || isCounterBehavior(task)) && (
                <span className="task-badge">{getBehaviorLabel(task)}</span>
              )}
            </span>
          </div>

          <button
            type="button"
            className="tasks-modal-close"
            onClick={onClose}
            aria-label="Fermer"
          >
            ×
          </button>
        </header>

        <div className="task-detail-progress">
          <div className="task-detail-progress-head">
            <span>Progression</span>
            <strong>{progress}&nbsp;%</strong>
          </div>
          <div className="task-progress-bar is-large" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
          {statusLine && <p className="task-detail-status">{statusLine}</p>}
        </div>

        {periods && (
          <section className="task-detail-section" aria-label="Périodes">
            <h3>Périodes de la journée</h3>
            <div className="task-period-grid">
              {TASK_PERIODS.filter((period) =>
                task.periods.includes(period.value),
              ).map((period) => {
                const checked = isPeriodChecked(task, period.value)

                return (
                  <button
                    key={period.value}
                    type="button"
                    className={`task-period-chip ${checked ? 'is-checked' : ''}`}
                    aria-pressed={checked}
                    onClick={() => onTogglePeriod?.(task.id, period.value)}
                  >
                    <span className="task-period-box" aria-hidden="true">
                      {checked ? '✓' : ''}
                    </span>
                    {period.label}
                  </button>
                )
              })}
            </div>
          </section>
        )}

        {isTimerBehavior(task) && (
          <section className="task-detail-section">
            <h3>Timer</h3>
            <p className="task-detail-status">{getTimerStatus(task)}</p>
            <button
              type="button"
              className="tasks-primary-button"
              onClick={() => onOpenTimer?.(task.id)}
            >
              {task.completed ? 'Voir le timer' : 'Ouvrir le timer'}
            </button>
          </section>
        )}

        {isCounterBehavior(task) && (
          <section className="task-detail-section">
            <h3>Compteur</h3>
            <div
              className="task-counter"
              role="group"
              aria-label={`Compteur en ${counterUnit.label.toLowerCase()}`}
            >
              <button
                type="button"
                onClick={() => onChangeCounter?.(task.id, -1)}
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
                onClick={() => onChangeCounter?.(task.id, 1)}
                aria-label="Augmenter"
              >
                +
              </button>
            </div>
          </section>
        )}

        {subtasks.length > 0 && (
          <section className="task-detail-section">
            <h3>Sous-tâches</h3>
            <div className="task-detail-subtasks">
              {subtasks.map((subtask) => (
                <label className="task-subtask" key={subtask.id}>
                  <input
                    type="checkbox"
                    checked={Boolean(subtask.completed)}
                    onChange={() => onToggleSubtask?.(task.id, subtask.id)}
                  />
                  <span
                    className={
                      subtask.completed
                        ? 'task-subtask-title completed'
                        : 'task-subtask-title'
                    }
                  >
                    {subtask.title}
                  </span>
                </label>
              ))}
            </div>
          </section>
        )}

        {task.notes && (
          <section className="task-detail-section">
            <h3>Notes</h3>
            <p className="task-detail-notes">{task.notes}</p>
          </section>
        )}

        <dl className="task-detail-facts">
          <div>
            <dt>Échéance</dt>
            <dd>{formatDue(task)}</dd>
          </div>
          <div>
            <dt>Priorité</dt>
            <dd>{getPriority(task.priority).label}</dd>
          </div>
          <div>
            <dt>Durée estimée</dt>
            <dd>{task.duration ? `${task.duration} min` : 'Non précisée'}</dd>
          </div>
        </dl>

        <footer className="task-detail-actions">
          <button
            type="button"
            className="tasks-primary-button"
            onClick={() => onToggleCompleted?.(task.id)}
          >
            {getToggleLabel(task)}
          </button>

          <button
            type="button"
            className="tasks-secondary-button"
            onClick={() => onEdit?.(task)}
          >
            Modifier
          </button>

          <button
            type="button"
            className="task-detail-delete"
            onClick={() => onDelete?.(task)}
          >
            Supprimer
          </button>
        </footer>
      </section>
    </div>
  )
}

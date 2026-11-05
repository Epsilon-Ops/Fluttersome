import { useEffect, useState } from 'react'
import { getTaskColorPalette } from '../../components/icons/icon-utils/icon-colors'
import {
  getTimerConfig,
  getTimerView,
} from '../../utils/recurrenceHelpers'

const RADIUS = 110
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function formatClock(totalSeconds) {
  const safe = Math.max(0, Math.round(totalSeconds))
  const hours = Math.floor(safe / 3600)
  const minutes = Math.floor((safe % 3600) / 60)
  const seconds = safe % 60
  const mm = String(minutes).padStart(2, '0')
  const ss = String(seconds).padStart(2, '0')

  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`
}

/**
 * Page dédiée à un timer : un anneau qui se vide au centre duquel
 * s'affiche le temps restant. L'anneau montre le temps écoulé en
 * couleur de fond, le reste est l'arc visible.
 */
export default function TaskTimerScreen({ task, onClose, onAction }) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(Date.now()), 250)
    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const palette = getTaskColorPalette(task.color)
  const view = getTimerView(task, now)
  const config = getTimerConfig(task)
  const isRepeat = task.behavior === 'repeatTimer'
  const isRest = view.phase === 'rest'
  const isDone = view.phase === 'done'

  const startLabel =
    view.repsDone > 0 && view.elapsedSec === 0
      ? 'Lancer la suivante'
      : view.elapsedSec > 0
        ? 'Reprendre'
        : 'Démarrer'

  const statusLabel = isDone
    ? 'Terminé'
    : isRest
      ? 'Récupération'
      : view.running
        ? 'Temps restant'
        : 'En pause'

  // Arc visible = temps restant ; le décalage cache la partie écoulée
  const dashOffset = CIRCUMFERENCE * view.progress

  return (
    <div
      className="task-timer-screen"
      style={{
        '--task-primary': palette.primary,
        '--task-accent': palette.accent,
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Timer : ${task.title}`}
    >
      <header className="task-timer-header">
        <button type="button" className="task-timer-back" onClick={onClose} style={{color:'black'}}>
          ← Retour
        </button>
        <span className="eyebrow" style={{color:'black'}}>
          {isRepeat ? 'X FOIS TIMER' : 'TIMER'}
        </span>
      </header>

      <div className="task-timer-body">
        <h2 className="task-timer-title" style={{color:'black'}}>{task.title}</h2>

        <div className={`task-timer-ring ${isRest ? 'is-rest' : ''}`}>
          <svg viewBox="0 0 260 260" aria-hidden="true">
            <circle className="task-timer-track" cx="130" cy="130" r={RADIUS} />
            <circle
              className="task-timer-progress"
              cx="130"
              cy="130"
              r={RADIUS}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
            />
          </svg>

          <div className="task-timer-center" style={{color:'black'}}>
            <strong>
              {isDone ? '✓' : formatClock(view.remainingSec)}
            </strong>
            <span>{statusLabel}</span>
          </div>
        </div>

        {isRepeat && (
          <p className="task-timer-reps">
            {isDone
              ? `${config.repeatCount} / ${config.repeatCount} répétitions faites`
              : `Répétition ${Math.min(view.repsDone + 1, config.repeatCount)} / ${config.repeatCount}`}
            {config.restSec > 0 &&
              ` · repos automatique de ${config.restSec / 60} min`}
          </p>
        )}

        <div className="task-timer-controls">
          {!isDone && (view.running ? (
            <button
              type="button"
              className="task-timer-primary"
              onClick={() => onAction(task.id, 'pause')}
            >
              Pause
            </button>
          ) : (
            <button
              type="button"
              className="task-timer-primary"
              disabled={isRest}
              onClick={() => onAction(task.id, 'start')}
            >
              {startLabel}
            </button>
          ))}

          {!isDone && !isRest && (
            <>
              <button
                type="button"
                className="task-timer-secondary"
                style={{color:'black'}}
                onClick={() => onAction(task.id, 'add', 60)}
              >
                +1 min
              </button>
              <button
                type="button"
                className="task-timer-secondary"
                style={{color:'black'}}
                onClick={() => onAction(task.id, 'add', 300)}
              >
                +5 min
              </button>
            </>
          )}

          {!isDone && (
            <button
              type="button"
              className="task-timer-secondary"
              style={{color:'black'}}
              onClick={() => onAction(task.id, 'complete')}
            >
              Terminer
            </button>
          )}

          <button
            type="button"
            className="task-timer-ghost"
            style={{color:'black'}}
            onClick={() => onAction(task.id, 'reset')}
          >
            Réinitialiser
          </button>
        </div>

        <p className="task-timer-hint" style={{color:'black'}}>
          {isRest
            ? 'La répétition suivante démarrera automatiquement.'
            : isDone
              ? 'Bravo, tu as terminé cette tâche.'
              : view.repsDone > 0 && view.elapsedSec === 0
                ? 'Repos à 0 : reprends quand tu es prêt(e).'
                : 'Tu peux ajouter du temps ou terminer manuellement.'}
        </p>
      </div>
    </div>
  )
}

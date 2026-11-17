import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { playBeep, vibrate, notify, requestNotificationPermission } from '../../utils/notifications'
import { getExerciseSeries } from '../../utils/strengthProgress'
import '../../styles/main_pages/page_musculation/timer.css'

const StrengthContext = createContext(null)

export function useStrengthContext() {
  const value = useContext(StrengthContext)

  // Valeur de repli si le composant est utilisé hors du fournisseur.
  return (
    value ?? {
      series: new Map(),
      startTimer: () => {},
      stopTimer: () => {},
      timer: null,
    }
  )
}

/* Fournit le chrono de récupération et l'historique des exercices. */
export function StrengthContextProvider({ sessions = [], children }) {
  const [timer, setTimer] = useState(null)
  const [now, setNow] = useState(() => Date.now())

  const series = useMemo(() => getExerciseSeries(sessions), [sessions])

  const stopTimer = useCallback(() => setTimer(null), [])

  const startTimer = useCallback(({ seconds, label, kind = 'rest', next = null }) => {
    const duration = Math.round(Number(seconds))

    if (!Number.isFinite(duration) || duration <= 0) return

    // Demande d'autorisation au premier clic (geste utilisateur requis).
    requestNotificationPermission()

    const startedAt = Date.now()

    setNow(startedAt)
    setTimer({
      label,
      kind,
      total: duration,
      endsAt: startedAt + duration * 1000,
      next,
    })
  }, [])

  useEffect(() => {
    if (!timer) return undefined

    const id = window.setInterval(() => {
      const current = Date.now()
      setNow(current)

      if (current >= timer.endsAt) {
        window.clearInterval(id)
        playBeep()
        vibrate()

        const label = timer.kind === 'work' ? 'Fin de l’effort' : 'Fin de la récupération'
        notify(label, timer.label)

        if (timer.next) {
          startTimer(timer.next)
        } else {
          setTimer(null)
        }
      }
    }, 250)

    return () => window.clearInterval(id)
  }, [timer, startTimer])

  const remaining = timer
    ? Math.max(0, Math.ceil((timer.endsAt - now) / 1000))
    : 0

  const addSeconds = useCallback((extra) => {
    setTimer((current) =>
      current ? { ...current, endsAt: current.endsAt + extra * 1000, total: current.total + extra } : current,
    )
  }, [])

  const value = useMemo(
    () => ({ series, startTimer, stopTimer, timer, remaining }),
    [series, startTimer, stopTimer, timer, remaining],
  )

  return (
    <StrengthContext.Provider value={value}>
      {children}

      {timer && (
        <div className={`rest-timer rest-timer--${timer.kind}`} role="timer" aria-live="polite">
          <div className="rest-timer__info">
            <span className="rest-timer__kind">
              {timer.kind === 'work' ? 'Effort' : 'Récupération'}
            </span>
            <strong className="rest-timer__label">{timer.label}</strong>
          </div>

          <span className="rest-timer__clock">{formatClock(remaining)}</span>

          <div className="rest-timer__actions">
            <button type="button" onClick={() => addSeconds(15)}>+15 s</button>
            <button type="button" onClick={stopTimer}>Arrêter</button>
          </div>
        </div>
      )}
    </StrengthContext.Provider>
  )
}

function formatClock(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

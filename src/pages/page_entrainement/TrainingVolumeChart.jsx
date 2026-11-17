import { useMemo } from 'react'
import { getBlockStats, getMonday, addDays, getLocalDate } from '../../utils/trainingHelpers'

/* Distance totale par semaine sur les 8 dernières semaines. */
export default function TrainingVolumeChart({ sessions = [] }) {
  const weeks = useMemo(() => {
    const thisMonday = getMonday(new Date())
    const result = Array.from({ length: 8 }, (_, i) => {
      const start = addDays(thisMonday, -(7 - i) * 1)
      const startKey = getLocalDate(start)
      const endKey = getLocalDate(addDays(start, 6))
      const inWeek = sessions.filter((s) => s.date >= startKey && s.date <= endKey)
      const distance = inWeek.reduce(
        (total, s) => total + getBlockStats(s.blocks || []).distance,
        0,
      )
      return { key: startKey, distance, count: inWeek.length }
    })
    return result
  }, [sessions])

  const max = Math.max(1, ...weeks.map((w) => w.distance))
  const hasData = weeks.some((w) => w.distance > 0)

  return (
    <section className="training-panel training-volume">
      <span className="eyebrow">VOLUME</span>
      <h3>Distance par semaine (8 dernières semaines)</h3>

      {!hasData ? (
        <p className="welcome-description">Les distances de tes séances apparaîtront ici.</p>
      ) : (
        <div className="training-volume__chart">
          {weeks.map((w) => (
            <div className="training-volume__col" key={w.key} title={`${w.count} séance(s), ${w.distance} m`}>
              <span className="training-volume__value">{w.distance ? `${Math.round(w.distance)} m` : ''}</span>
              <div className="training-volume__track">
                <span style={{ height: `${(w.distance / max) * 100}%` }} />
              </div>
              <small>{w.key.slice(5)}</small>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

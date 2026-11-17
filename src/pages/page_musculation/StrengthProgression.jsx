import { useMemo, useState } from 'react'
import { getExerciseSeries, listExercises, getLastPerformance } from '../../utils/strengthProgress'
import { formatShortDateLabel } from './strengthFormat'

const WIDTH = 520
const HEIGHT = 180
const PAD = 28

export default function StrengthProgression({ sessions = [] }) {
  const series = useMemo(() => getExerciseSeries(sessions), [sessions])
  const exercises = useMemo(() => listExercises(series), [series])
  const [selected, setSelected] = useState('')

  const activeKey = selected || exercises[0]?.key || ''
  const entries = (series.get(activeKey) || []).filter((item) => item.bestE1rm !== null)

  if (exercises.length === 0) {
    return (
      <section className="strength-panel">
        <span className="eyebrow">PROGRESSION</span>
        <h2>Progression par exercice</h2>
        <p className="strength-empty-state">
          Coche des séries réalisées avec une charge et des répétitions : la progression
          (1RM estimé) apparaîtra ici.
        </p>
      </section>
    )
  }

  const last = getLastPerformance(series, activeKey)
  const values = entries.map((item) => item.bestE1rm)
  const max = values.length ? Math.max(...values) * 1.05 : 1
  const min = values.length ? Math.min(...values) * 0.95 : 0

  const x = (i) =>
    entries.length <= 1 ? WIDTH / 2 : PAD + (i * (WIDTH - PAD * 2)) / (entries.length - 1)
  const y = (v) => HEIGHT - PAD - ((v - min) / (max - min || 1)) * (HEIGHT - PAD * 2)

  const path = entries.map((item, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(item.bestE1rm)}`).join(' ')
  const totalVolume = entries.reduce((total, item) => total + item.volume, 0)

  return (
    <section className="strength-panel strength-progression">
      <div className="strength-panel-heading">
        <div>
          <span className="eyebrow">PROGRESSION</span>
          <h2>1RM estimé par exercice</h2>
        </div>

        <select value={activeKey} onChange={(event) => setSelected(event.target.value)} aria-label="Exercice">
          {exercises.map((exercise) => (
            <option key={exercise.key} value={exercise.key}>
              {exercise.label} ({exercise.count})
            </option>
          ))}
        </select>
      </div>

      {entries.length === 0 ? (
        <p className="strength-empty-state">Pas encore assez de données pour cet exercice.</p>
      ) : (
        <>
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="strength-progression__chart" role="img"
            aria-label="Évolution du 1RM estimé">
            <line x1={PAD} y1={HEIGHT - PAD} x2={WIDTH - PAD} y2={HEIGHT - PAD} stroke="currentColor" opacity="0.2" />
            <path d={path} fill="none" stroke="#7652B5" strokeWidth="2.5" />
            {entries.map((item, i) => (
              <g key={`${item.date}-${i}`}>
                <circle cx={x(i)} cy={y(item.bestE1rm)} r="4" fill="#7652B5">
                  <title>{`${formatShortDateLabel(item.date)} : ${item.bestE1rm} kg`}</title>
                </circle>
              </g>
            ))}
            <text x={PAD} y={16} fontSize="11" fill="currentColor" opacity="0.7">{Math.round(max / 1.05)} kg</text>
            <text x={PAD} y={HEIGHT - 8} fontSize="11" fill="currentColor" opacity="0.7">{Math.round(min / 0.95)} kg</text>
          </svg>

          <ul className="strength-progression__stats">
            <li><span>Dernier 1RM estimé</span><strong>{last?.bestE1rm ?? '—'} kg</strong></li>
            <li><span>Record estimé</span><strong>{last?.recordE1rm ?? '—'} kg</strong></li>
            <li><span>Séances suivies</span><strong>{entries.length}</strong></li>
            <li><span>Volume cumulé</span><strong>{Math.round(totalVolume)} kg</strong></li>
          </ul>
        </>
      )}
    </section>
  )
}

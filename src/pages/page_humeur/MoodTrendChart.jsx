import { useMemo } from 'react'
import { loadMoodEntries } from '../../utils/moodHelpers'
import { analyzeMood } from '../../services/coach/analysis/analyzeMood'
import { buildCoachContext } from '../../services/coach/context/buildCoachContext'

const W = 560
const H = 180
const P = 26

/* Courbe de l'humeur moyenne par jour sur 30 jours (valence -5 à +5). */
export default function MoodTrendChart() {
  const data = useMemo(() => {
    const entries = loadMoodEntries()
    const now = new Date()
    const days = []

    for (let i = 29; i >= 0; i -= 1) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      const dayEntries = entries.filter((entry) => entry.date === key && Number.isFinite(entry.valence))
      const avg = dayEntries.length
        ? dayEntries.reduce((t, e) => t + e.valence, 0) / dayEntries.length
        : null
      days.push({ key, avg })
    }

    return { days, analysis: analyzeMood(buildCoachContext(now)) }
  }, [])

  const points = data.days.filter((day) => day.avg !== null)
  const x = (i) => P + (i * (W - P * 2)) / 29
  const y = (v) => H - P - ((v + 5) / 10) * (H - P * 2)

  const path = data.days
    .map((day, i) => (day.avg === null ? null : `${i === 0 ? 'M' : 'L'}${x(i)},${y(day.avg)}`))
    .filter(Boolean)
    .join(' ')

  const { analysis } = data

  return (
    <section className="panel mood-trend">
      <span className="eyebrow">TENDANCE</span>
      <h3>Humeur sur 30 jours</h3>

      {points.length < 2 ? (
        <p className="welcome-description">Note ton humeur sur plusieurs jours pour voir la courbe.</p>
      ) : (
        <svg viewBox={`0 0 ${W} ${H}`} className="mood-trend__chart" role="img" aria-label="Humeur moyenne par jour">
          <line x1={P} x2={W - P} y1={y(0)} y2={y(0)} stroke="currentColor" opacity="0.2" strokeDasharray="4 4" />
          <path d={path} fill="none" stroke="#C05287" strokeWidth="2.5" />
          {data.days.map((day, i) =>
            day.avg === null ? null : (
              <circle key={day.key} cx={x(i)} cy={y(day.avg)} r="3.5" fill="#C05287">
                <title>{`${day.key} : ${day.avg.toFixed(1)}`}</title>
              </circle>
            ),
          )}
          <text x={P} y={14} fontSize="11" fill="currentColor" opacity="0.7">+5 (bien)</text>
          <text x={P} y={H - 6} fontSize="11" fill="currentColor" opacity="0.7">-5 (difficile)</text>
        </svg>
      )}

      {analysis.available && (
        <p className="mood-trend__summary">
          Moyenne de la semaine : {analysis.avgValence} · tendance {{ hausse: 'en hausse', baisse: 'en baisse', stable: 'stable' }[analysis.trend]}
          {analysis.sleepLink
            ? ` · après une bonne nuit : ${analysis.sleepLink.afterGoodSleep}, après une nuit courte : ${analysis.sleepLink.afterShortSleep}`
            : ''}
        </p>
      )}
      <p className="mood-trend__note">Les liens observés entre sommeil et humeur sont des corrélations, pas des causes.</p>
    </section>
  )
}

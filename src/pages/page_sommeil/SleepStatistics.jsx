import { useMemo } from 'react'
import { getSleepMetrics } from '../../utils/sleepHelpers'

function formatDuration(minutes) {
  if (minutes == null) return '—'

  return `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, '0')}`
}

export default function SleepStatistics({ nights }) {
  const metrics = useMemo(
    () => getSleepMetrics(nights),
    [nights],
  )

  return (
    <section className="panel sleep-statistics-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">ANALYSE DU SOMMEIL</span>
          <h3>Statistiques des 7 derniers jours</h3>
        </div>
      </div>

      <div className="sleep-metric-grid">
        <article className="sleep-metric-card">
          <span className="eyebrow">DURÉE MOYENNE</span>
          <strong>{formatDuration(metrics.averageDuration)}</strong>
          <span>Sur les nuits renseignées</span>
        </article>

        <article className="sleep-metric-card">
          <span className="eyebrow">QUALITÉ MOYENNE</span>
          <strong>
            {metrics.averageQuality == null
              ? '—'
              : `${metrics.averageQuality}/10`}
          </strong>
          <span>Note subjective</span>
        </article>

        <article className="sleep-metric-card">
          <span className="eyebrow">NUITS RENSEIGNÉES</span>
          <strong>{metrics.nightCount}/7</strong>
          <span>Sur la période</span>
        </article>
      </div>
    </section>
  )
}
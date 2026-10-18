
import MetricCard from './MetricCard'
import {
  formatDate,
  formatTime,
  getDistanceLabel,
  getPerformanceTypeLabel,
  getTimingLabel,
} from '../../utils/competitionHelpers'

export default function PerformanceOverview({
  personalRecord,
  seasonBest,
  bestTraining,
  distance,
  currentYear,
  distancePerformances,
  latestPerformance,
}) {
  return (
    <>
      <section className="metrics-grid">
        <MetricCard
          label="RECORD PERSONNEL"
          value={
            personalRecord === null
              ? '—'
              : formatTime(personalRecord)
          }
          note={
            personalRecord === null
              ? 'Aucun chrono électronique en compétition'
              : `${getDistanceLabel(distance)} · compétition électronique`
          }
        />

        <MetricCard
          label="MEILLEUR DE LA SAISON"
          value={
            seasonBest === null ? '—' : formatTime(seasonBest)
          }
          note={
            seasonBest === null
              ? `Aucun résultat officiel en ${currentYear}`
              : `Saison ${currentYear}`
          }
        />

        <MetricCard
          label="MEILLEUR À L’ENTRAÎNEMENT"
          value={
            bestTraining === null ? '—' : formatTime(bestTraining)
          }
          note={
            bestTraining === null
              ? 'Aucun chrono manuel saisi'
              : 'Chronométrage manuel · non officiel'
          }
        />

        <MetricCard
          label="PERFORMANCES"
          value={String(distancePerformances.length)}
          note={`${getDistanceLabel(distance)} · tous types`}
        />
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">
              DERNIÈRE PERFORMANCE
            </span>

            <h3>
              {latestPerformance
                ? getDistanceLabel(latestPerformance.distance)
                : 'Ton historique commence ici'}
            </h3>
          </div>

          <span className="panel-symbol">↗</span>
        </div>

        {latestPerformance ? (
          <div className="competition-history-row">
            <div className="competition-history-main">
              <span className="competition-history-title">
                {formatDate(latestPerformance.date)}
              </span>

              <span className="competition-history-subtitle">
                {latestPerformance.venue || 'Lieu non renseigné'}
              </span>
            </div>

            <div className="competition-history-time-wrap">
              <span className="competition-time">
                {formatTime(latestPerformance.time)}
              </span>
            </div>

            <div className="competition-history-meta">
              <span
                className={`competition-type-badge ${
                  latestPerformance.type === 'training'
                    ? 'training'
                    : ''
                }`}
              >
                {getPerformanceTypeLabel(latestPerformance.type)}
              </span>

              <span className="competition-history-subtitle">
                {getTimingLabel(latestPerformance.timing)}
              </span>
            </div>
          </div>
        ) : (
          <div className="competition-empty-state">
            <h3>Aucune performance pour le moment</h3>

            <p>
              Enregistre ton premier chrono pour commencer
              à construire un historique fiable.
            </p>
          </div>
        )}
      </section>
    </>
  )
}

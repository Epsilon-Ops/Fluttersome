
import {
  getConditionLabel,
  getPerformanceTypeLabel,
  getTimingLabel,
  getWindDirectionLabel,
} from '../../utils/competitionHelpers'

const SPRINT_DISTANCES = [60, 100, 200, 400]

function formatDate(date) {
  if (!date) return 'Date non renseignée'

  const parsed = new Date(`${date}T12:00:00`)

  if (Number.isNaN(parsed.getTime())) {
    return 'Date non renseignée'
  }

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsed)
}

export default function PerformanceAnalysis({
  performances = [],
}) {
  const validPerformances = performances
    .filter(
      (performance) =>
        SPRINT_DISTANCES.includes(Number(performance.distance)) &&
        Number.isFinite(Number(performance.time)) &&
        Number(performance.time) > 0,
    )
    .sort((a, b) => {
      const dateDifference = String(b.date).localeCompare(
        String(a.date),
      )

      return dateDifference ||
        (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0)
    })

  return (
    <section className="coach-performance-analysis panel">
      <div className="panel-header">
        <div>
          <span className="eyebrow">ANALYSE DES PERFORMANCES</span>
          <h2>Ce que montrent tes chronos</h2>
        </div>
      </div>

      {validPerformances.length > 0 ? (
        <div className="coach-performance-analysis__list">
          {validPerformances.map((performance) => (
            <article
              className="coach-performance-analysis__item"
              key={performance.id}
            >
              <div>
                <h3>{performance.distance} m</h3>
                <p>
                  <strong>Chrono :</strong>{' '}
                  {Number(performance.time).toFixed(2)} s
                </p>
              </div>

              <p>
                <strong>Date :</strong> {formatDate(performance.date)}
              </p>

              <p>
                <strong>Type :</strong>{' '}
                {getPerformanceTypeLabel(performance.type)}
              </p>

              <p>
                <strong>Chronométrage :</strong>{' '}
                {getTimingLabel(performance.timing)}
              </p>

              {performance.conditions && (
                <p>
                  <strong>Conditions :</strong>{' '}
                  {getConditionLabel(performance.conditions)}
                </p>
              )}

              {performance.windSpeed !== '' &&
                performance.windSpeed != null &&
                Number.isFinite(Number(performance.windSpeed)) && (
                  <p>
                    <strong>Vent :</strong>{' '}
                    {Number(performance.windSpeed) > 0 ? '+' : ''}
                    {Number(performance.windSpeed)} m/s
                  </p>
                )}

              {performance.windDirection && (
                <p>
                  <strong>Direction du vent :</strong>{' '}
                  {getWindDirectionLabel(performance.windDirection)}
                </p>
              )}

              {Number.isFinite(Number(performance.feeling)) &&
                performance.feeling != null && (
                  <p>
                    <strong>Ressenti :</strong>{' '}
                    {performance.feeling}/10
                  </p>
                )}

              {performance.venue && (
                <p>
                  <strong>Lieu :</strong> {performance.venue}
                </p>
              )}

              {performance.conditionDetails && (
                <p>
                  <strong>Précisions :</strong>{' '}
                  {performance.conditionDetails}
                </p>
              )}

              {performance.feelingNote && (
                <p>
                  <strong>Commentaire sur le ressenti :</strong>{' '}
                  {performance.feelingNote}
                </p>
              )}

              {performance.notes && (
                <p>
                  <strong>Notes :</strong> {performance.notes}
                </p>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p>
          Aucune performance exploitable n’est disponible pour cette
          période.
        </p>
      )}

      <p className="coach-performance-analysis__note">
        Compare en priorité les mêmes distances et tiens compte du
        chronométrage, du vent et des conditions de mesure. Les données
        affichées décrivent les performances enregistrées ; elles ne
        suffisent pas, à elles seules, à expliquer leur évolution.
      </p>
    </section>
  )
}

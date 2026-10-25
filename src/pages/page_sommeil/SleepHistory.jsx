import { getSleepDuration } from '../../utils/sleepHelpers'

function formatDuration(minutes) {
  if (minutes == null) return '—'

  return `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, '0')}`
}

function formatDate(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(new Date(`${date}T12:00:00`))
}

export default function SleepHistory({
  nights,
  onEdit,
  onDelete,
}) {
  const sortedNights = [...nights]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 7)

  return (
    <section className="panel sleep-history-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">TES DONNÉES</span>
          <h3>Les 7 derniers jours</h3>
        </div>
      </div>

      {sortedNights.length === 0 ? (
        <p className="welcome-description">
          Ton historique apparaîtra ici après l’enregistrement de tes nuits.
        </p>
      ) : (
        <div className="sleep-history-list">
          {sortedNights.map((night) => {
            const duration = getSleepDuration(
              night.fallAsleep,
              night.wakeTime,
            )

            return (
              <article className="sleep-history-item" key={night.id}>
                <div className="sleep-history-main">
                  <strong>{formatDate(night.date)}</strong>
                  <span>{formatDuration(duration)}</span>
                  <span>Qualité : {night.quality}/10</span>
                  <span>
                    Réveils : {night.hadAwakenings ? 'Oui' : 'Non'}
                  </span>
                  <span>
                    Sieste : {night.hadNap
                      ? `${night.napDuration ?? 'Durée inconnue'} min`
                      : 'Non'}
                  </span>
                </div>

                <div className="sleep-history-actions">
                  <button
                    type="button"
                    className="sleep-secondary-button"
                    onClick={() => onEdit(night)}
                  >
                    Modifier
                  </button>

                  <button
                    type="button"
                    className="sleep-secondary-button"
                    onClick={() => {
                      if (
                        window.confirm(
                          'Supprimer cette nuit de ton historique ?',
                        )
                      ) {
                        onDelete(night.id)
                      }
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
function formatDate(dateString) {
  if (!dateString) return 'Date inconnue'

  const date = new Date(`${dateString}T12:00:00`)

  if (Number.isNaN(date.getTime())) return 'Date inconnue'

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export default function MoodHistoryItem({ entry }) {
  if (!entry) return null

  const intensity = Number(entry.intensity)
  const valence = Number(entry.valence)

  return (
    <article className="mood-history-item">
      <div className="mood-history-item__main">
        <div className="mood-history-item__heading">
          <h3 className="mood-history-item__title">
            {entry.moodLabel || 'Humeur enregistrée'}
          </h3>

          <time
            className="mood-history-item__date"
            dateTime={entry.date || undefined}
          >
            {formatDate(entry.date)}
            {entry.time ? ` · ${entry.time}` : ''}
          </time>
        </div>

        {Number.isFinite(valence) && (
          <p className="mood-history-item__valence">
            Ressenti : {valence > 0 ? '+' : ''}{valence}
          </p>
        )}

        {Number.isFinite(intensity) && (
          <p className="mood-history-item__intensity">
            Intensité : {intensity}/5
          </p>
        )}

        {Array.isArray(entry.activities) && entry.activities.length > 0 && (
          <div className="mood-history-item__activities">
            {entry.activities.map((activity) => (
              <span
                className="mood-history-item__activity"
                key={activity}
              >
                {activity}
              </span>
            ))}
          </div>
        )}

        {entry.note && (
          <p className="mood-history-item__note">{entry.note}</p>
        )}
      </div>
    </article>
  )
}
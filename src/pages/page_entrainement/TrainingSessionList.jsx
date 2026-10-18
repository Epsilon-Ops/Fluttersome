
import { getBlockStats } from '../../utils/trainingHelpers'

export default function TrainingSessionList({
  sessions,
  selectedDay,
  today,
  onEdit,
  onDelete,
  onUpdateStatus,
  onAdd,
}) {
  const selectedDateLabel = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
  }).format(new Date(`${selectedDay}T12:00:00`))

  return (
    <section className="training-panel">
      <div className="training-panel-heading">
        <div>
          <span className="eyebrow">ORGANISATION</span>

          <h2>
            {selectedDay === today
              ? 'Séances du jour'
              : `Séances du ${selectedDateLabel}`}
          </h2>
        </div>

        <button
          type="button"
          className="training-primary-button"
          onClick={onAdd}
        >
          + Ajouter
        </button>
      </div>

      {sessions.length > 0 ? (
        <div className="training-session-list">
          {sessions.map((session) => {
            const summary = getBlockStats(session.blocks || [])

            return (
              <article
                className="training-session-card"
                key={session.id}
              >
                <div className="training-session-marker" />

                <div className="training-session-content">
                  <span className="training-session-type">
                    {session.type}
                  </span>

                  <h3>{session.title}</h3>

                  {session.notes && (
                    <p className="training-session-notes">
                      {session.notes}
                    </p>
                  )}

                  <p className="training-field-help">
                    {session.blocks
                      ? `${session.blocks.length} bloc(s) · ${summary.repetitions} répétitions configurées · ${summary.distance.toLocaleString('fr-FR')} m prévus`
                      : `${session.plannedRepetitions || 0} répétitions prévues · ${(session.plannedDistance || 0).toLocaleString('fr-FR')} m prévus`}
                  </p>

                  {session.blocks?.map((block, index) => (
                    <p
                      className="training-field-help"
                      key={block.id || index}
                    >
                      Bloc {index + 1} : {block.name} — {block.distances} m
                      {block.condition ? ` · ${block.condition}` : ''}
                    </p>
                  ))}

                  <span
                    className={`training-status training-status-${session.status}`}
                  >
                    {session.status === 'completed'
                      ? 'Réalisée'
                      : session.status === 'cancelled'
                        ? 'Annulée'
                        : 'Planifiée'}
                  </span>
                </div>

                <div className="training-session-actions">
                  {session.status === 'planned' && (
                    <>
                      <button
                        type="button"
                        className="training-secondary-button"
                        onClick={() =>
                          onUpdateStatus(session.id, 'completed')
                        }
                      >
                        Terminer
                      </button>

                      <button
                        type="button"
                        className="training-text-button"
                        onClick={() =>
                          onUpdateStatus(session.id, 'cancelled')
                        }
                      >
                        Annuler
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    className="training-secondary-button"
                    onClick={() => onEdit(session)}
                  >
                    Modifier
                  </button>

                  <button
                    type="button"
                    className="training-text-button"
                    onClick={() => onDelete(session.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <div className="training-empty-state">
          <span className="training-empty-icon" aria-hidden="true">
            +
          </span>

          <h3>Aucune séance prévue</h3>

          <p>Ajoute une séance puis construis-la bloc par bloc.</p>

          <button
            type="button"
            className="training-primary-button"
            onClick={onAdd}
          >
            Planifier une séance
          </button>
        </div>
      )}
    </section>
  )
}

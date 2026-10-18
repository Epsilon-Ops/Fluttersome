
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
            const blocks = session.blocks || []
            const summary = getBlockStats(blocks)

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
                    {blocks.length} bloc(s) · {summary.repetitions}{' '}
                    courses · {summary.distance.toLocaleString('fr-FR')}{' '}
                    m prévus
                  </p>

                  {blocks.map((block, blockIndex) => {
                    const courses = Array.isArray(block.courses)
                      ? block.courses
                      : []

                    // Compatibilité d'affichage avec les anciens blocs.
                    const legacyDistances = typeof block.distances === 'string'
                      ? block.distances
                          .split(/[;\n,]/)
                          .map((value) => value.trim())
                          .filter(Boolean)
                      : []

                    return (
                      <div
                        className="training-session-block-summary"
                        key={block.id || blockIndex}
                      >
                        <h4>
                          Bloc {blockIndex + 1}
                          {block.name ? ` — ${block.name}` : ''}
                        </h4>

                        {courses.length > 0 ? (
                          <div className="training-session-courses">
                            {courses.map((course, courseIndex) => (
                              <div
                                className="training-session-course"
                                key={course.id || courseIndex}
                              >
                                <div className="training-session-course-main">
                                  <strong>
                                    {course.distance || '—'} m
                                  </strong>

                                  <span>
                                    {course.condition === 'Condition personnalisée'
                                      ? course.customCondition ||
                                        course.condition
                                      : course.condition || 'Départ non précisé'}
                                  </span>
                                </div>

                                <div className="training-session-course-details">
                                  {course.targetIntensity != null &&
                                    course.targetIntensity !== '' && (
                                      <span>
                                        Intensité : {course.targetIntensity} %
                                      </span>
                                    )}

                                  {course.recoveryAfter && (
                                    <span>
                                      Récupération : {course.recoveryAfter}
                                    </span>
                                  )}

                                  {course.result && (
                                    <span>
                                      Chrono : {course.result} s
                                    </span>
                                  )}

                                  {course.referenceDistance &&
                                    course.referenceDistance !== 'none' && (
                                      <span>
                                        Référence : {course.referenceDistance} m
                                      </span>
                                    )}
                                </div>

                                {course.notes && (
                                  <p className="training-session-notes">
                                    {course.notes}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : legacyDistances.length > 0 ? (
                          <p className="training-field-help">
                            Anciennes distances : {legacyDistances.join(', ')} m
                            {block.condition ? ` · ${block.condition}` : ''}
                          </p>
                        ) : (
                          <p className="training-field-help">
                            Aucune course configurée.
                          </p>
                        )}

                        {block.recoveryAfterBlock && (
                          <p className="training-field-help">
                            Récupération après le bloc :{' '}
                            {block.recoveryAfterBlock}
                          </p>
                        )}

                        {block.notes && (
                          <p className="training-session-notes">
                            {block.notes}
                          </p>
                        )}
                      </div>
                    )
                  })}

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

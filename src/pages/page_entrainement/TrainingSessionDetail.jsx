/* =========================================================
   TrainingSessionDetail — popup de détail d'une séance
   d'entraînement : blocs, courses, récupérations, notes.
   Actions : terminer, annuler, modifier, supprimer.
   ========================================================= */

import DetailModal from '../../components/DetailModal'
import '../../styles/main_pages/page_entrainement/session-rows.css'

const ACCENT = '#1CB0F6'

function statusLabel(status) {
  if (status === 'completed') return 'Réalisée'
  if (status === 'cancelled') return 'Annulée'
  return 'Planifiée'
}

function CourseLine({ course }) {
  const start =
    course.condition === 'Condition personnalisée'
      ? course.customCondition || course.condition
      : course.condition || 'Départ non précisé'

  return (
    <div className="training-session-course">
      <div className="training-session-course-main">
        <strong>{course.distance || '—'} m</strong>
        <span>{start}</span>
      </div>

      <div className="training-session-course-details">
        {course.targetIntensity != null && course.targetIntensity !== '' && (
          <span>Intensité : {course.targetIntensity} %</span>
        )}
        {course.recoveryAfter && (
          <span>Récupération : {course.recoveryAfter}</span>
        )}
        {course.result && <span>Chrono : {course.result} s</span>}
        {course.referenceDistance && course.referenceDistance !== 'none' && (
          <span>Référence : {course.referenceDistance} m</span>
        )}
      </div>

      {course.notes && (
        <p className="training-session-notes">{course.notes}</p>
      )}
    </div>
  )
}

export default function TrainingSessionDetail({
  session,
  onClose,
  onEdit,
  onDelete,
  onUpdateStatus,
}) {
  const blocks = session.blocks || []

  function handleDelete() {
    const confirmed = window.confirm(
      `Supprimer définitivement la séance « ${session.title || session.type} » ?`,
    )

    if (confirmed) {
      onDelete(session.id)
    }
  }

  return (
    <DetailModal
      eyebrow={session.type}
      title={session.title || 'Séance sans titre'}
      accent={ACCENT}
      onClose={onClose}
      footer={
        <>
          {session.status === 'planned' && (
            <>
              <button
                type="button"
                className="detail-modal-primary"
                onClick={() => onUpdateStatus(session.id, 'completed')}
              >
                Terminer
              </button>
              <button
                type="button"
                className="detail-modal-secondary"
                onClick={() => onUpdateStatus(session.id, 'cancelled')}
              >
                Annuler
              </button>
            </>
          )}
          <button
            type="button"
            className="detail-modal-secondary"
            onClick={() => onEdit(session)}
          >
            Modifier
          </button>
          <button
            type="button"
            className="detail-modal-danger"
            onClick={handleDelete}
          >
            Supprimer
          </button>
        </>
      }
    >
      <p className="training-session-status-line">
        <span className={`training-status training-status-${session.status}`}>
          {statusLabel(session.status)}
        </span>
      </p>

      {session.notes && (
        <p className="training-session-notes">{session.notes}</p>
      )}

      {blocks.length === 0 && (
        <p className="training-field-help">Aucun bloc dans cette séance.</p>
      )}

      {blocks.map((block, blockIndex) => {
        const courses = Array.isArray(block.courses) ? block.courses : []

        const legacyDistances =
          typeof block.distances === 'string'
            ? block.distances
                .split(/[;\n,]/)
                .map((value) => value.trim())
                .filter(Boolean)
            : []

        return (
          <section
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
                  <CourseLine key={course.id || courseIndex} course={course} />
                ))}
              </div>
            ) : legacyDistances.length > 0 ? (
              <p className="training-field-help">
                Anciennes distances : {legacyDistances.join(', ')} m
                {block.condition ? ` · ${block.condition}` : ''}
              </p>
            ) : (
              <p className="training-field-help">Aucune course configurée.</p>
            )}

            {block.recoveryAfterBlock && (
              <p className="training-field-help">
                Récupération après le bloc : {block.recoveryAfterBlock}
              </p>
            )}

            {block.notes && (
              <p className="training-session-notes">{block.notes}</p>
            )}
          </section>
        )
      })}
    </DetailModal>
  )
}

/* =========================================================
   TrainingSessionList — liste simple des séances du jour.
   Chaque séance est une ligne ; un clic ouvre la popup de détail
   (TrainingSessionDetail) où se font les actions.
   ========================================================= */

import { useState } from 'react'
import { getBlockStats } from '../../utils/trainingHelpers'
import TrainingSessionDetail from './TrainingSessionDetail'

function statusLabel(status) {
  if (status === 'completed') return 'Réalisée'
  if (status === 'cancelled') return 'Annulée'
  return 'Planifiée'
}

export default function TrainingSessionList({
  sessions,
  selectedDay,
  today,
  onEdit,
  onDelete,
  onUpdateStatus,
  onAdd,
}) {
  const [selectedId, setSelectedId] = useState(null)
  const selectedSession =
    sessions.find((session) => session.id === selectedId) ?? null

  const selectedDateLabel = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
  }).format(new Date(`${selectedDay}T12:00:00`))

  function handleEdit(session) {
    setSelectedId(null)
    onEdit(session)
  }

  function handleDelete(id) {
    setSelectedId(null)
    onDelete(id)
  }

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
        <ul className="training-session-list">
          {sessions.map((session) => {
            const summary = getBlockStats(session.blocks || [])

            return (
              <li key={session.id}>
                <button
                  type="button"
                  className="training-session-row"
                  onClick={() => setSelectedId(session.id)}
                  aria-label={`Détail de la séance ${session.title || session.type}`}
                >
                  <span className="training-session-marker" aria-hidden="true" />

                  <span className="training-session-row-main">
                    <span className="training-session-type">{session.type}</span>
                    <strong>{session.title || 'Séance sans titre'}</strong>
                    <span className="training-field-help">
                      {(session.blocks || []).length} bloc(s) ·{' '}
                      {summary.repetitions} courses ·{' '}
                      {summary.distance.toLocaleString('fr-FR')} m prévus
                    </span>
                  </span>

                  <span
                    className={`training-status training-status-${session.status}`}
                  >
                    {statusLabel(session.status)}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
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

      {selectedSession && (
        <TrainingSessionDetail
          session={selectedSession}
          onClose={() => setSelectedId(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onUpdateStatus={(id, status) => {
            onUpdateStatus(id, status)
          }}
        />
      )}
    </section>
  )
}

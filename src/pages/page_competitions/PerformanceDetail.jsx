/* =========================================================
   PerformanceDetail — popup de détail d'un chrono : toutes les
   informations, avec modifier et supprimer.
   ========================================================= */

import DetailModal from '../../components/DetailModal'
import {
  formatDate,
  formatTime,
  getConditionLabel,
  getDistanceLabel,
  getPerformanceTypeLabel,
  getTimingLabel,
  getWindDirectionLabel,
} from '../../utils/competitionHelpers'

const ACCENT = '#FF4B4B'

function Row({ label, value }) {
  if (value === null || value === undefined || value === '') return null

  return (
    <div className="detail-modal-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

export default function PerformanceDetail({ item, onClose, onEdit, onDelete }) {
  const windSpeed =
    item.windSpeed === null || item.windSpeed === undefined
      ? ''
      : `${item.windSpeed > 0 ? '+' : ''}${item.windSpeed} m/s`

  const conditions = [
    getConditionLabel(item.conditions),
    item.conditionDetails,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <DetailModal
      eyebrow={getPerformanceTypeLabel(item.type)}
      title={`${getDistanceLabel(item.distance)} — ${formatTime(item.time)}`}
      accent={ACCENT}
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            className="detail-modal-primary"
            onClick={() => onEdit(item)}
          >
            Modifier
          </button>
          <button
            type="button"
            className="detail-modal-danger"
            onClick={() => onDelete(item)}
          >
            Supprimer
          </button>
        </>
      }
    >
      <dl className="detail-modal-body">
        <Row label="Date" value={formatDate(item.date)} />
        <Row label="Lieu" value={item.venue} />
        <Row label="Chronométrage" value={getTimingLabel(item.timing)} />
        <Row label="Conditions" value={conditions} />
        <Row label="Vent" value={windSpeed} />
        <Row label="Direction du vent" value={getWindDirectionLabel(item.windDirection)} />
        <Row
          label="Ressenti"
          value={item.feeling ? `${item.feeling}/10` : ''}
        />
        <Row label="Note de ressenti" value={item.feelingNote} />
        <Row label="Notes" value={item.notes} />
      </dl>
    </DetailModal>
  )
}

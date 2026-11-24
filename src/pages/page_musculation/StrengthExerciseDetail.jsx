/* =========================================================
   StrengthExerciseDetail — popup de détail d'un exercice de
   musculation : cible, séries réalisées, repos, notes.
   Modifier renvoie vers le formulaire de la séance ; supprimer
   retire l'exercice de la séance.
   ========================================================= */

import DetailModal from '../../components/DetailModal'
import ExerciseIcon from '../../components/ExerciseIcon'

const ACCENT = '#8B5CF6'

function Row({ label, value }) {
  if (value === null || value === undefined || value === '') return null

  return (
    <div className="detail-modal-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

export default function StrengthExerciseDetail({
  exercise,
  blockName,
  onClose,
  onEdit,
  onDelete,
}) {
  const sets = Array.isArray(exercise.sets) ? exercise.sets : []
  const completed = sets.filter((set) => set.completed).length

  return (
    <DetailModal
      eyebrow={blockName ? `Bloc · ${blockName}` : 'Exercice'}
      title={exercise.name || 'Exercice sans nom'}
      accent={ACCENT}
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            className="detail-modal-primary"
            onClick={onEdit}
          >
            Modifier la séance
          </button>
          <button
            type="button"
            className="detail-modal-danger"
            onClick={onDelete}
          >
            Retirer de la séance
          </button>
        </>
      }
    >
      <div className="strength-exercise-detail-head">
        <ExerciseIcon exercise={exercise} size={40} className="strength-exercise-detail-icon" />
        <span className="strength-session-meta">
          {completed}/{sets.length} série(s) réalisée(s)
        </span>
      </div>

      <dl className="detail-modal-body">
        <Row label="Groupe musculaire" value={exercise.muscleGroup} />
        <Row label="Catégorie" value={exercise.category} />
        <Row label="Matériel" value={exercise.equipment} />
        <Row label="Séries cibles" value={exercise.targetSets} />
        <Row label="Répétitions cibles" value={exercise.targetRepRange} />
        <Row
          label="Charge cible"
          value={exercise.targetLoad ? `${exercise.targetLoad} kg` : ''}
        />
        <Row label="Intensité cible" value={exercise.targetIntensity} />
        <Row label="Repos après série" value={exercise.restAfterSet} />
        <Row label="Repos après exercice" value={exercise.restAfterExercise} />
        <Row label="Notes" value={exercise.notes} />
      </dl>

      {sets.length > 0 && (
        <ul className="strength-preview-sets strength-exercise-detail-sets">
          {sets.map((set, index) => (
            <li key={set.id || index}>
              <span>
                Série {index + 1}
                {set.completed ? ' ✓' : ''}
              </span>
              <span>
                {set.reps !== '' && set.reps != null ? `${set.reps} reps` : '— reps'}
                {' · '}
                {set.load !== '' && set.load != null ? `${set.load} kg` : '— kg'}
                {set.rpe !== '' && set.rpe != null ? ` · RPE ${set.rpe}` : ''}
              </span>
            </li>
          ))}
        </ul>
      )}
    </DetailModal>
  )
}

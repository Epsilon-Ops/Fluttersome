import CollapsibleSection from '../../components/CollapsibleSection'

import { strengthCategories } from '../../utils/strengthHelpers'
import StrengthExerciseForm from './StrengthExerciseForm'
import { createEmptyExercise } from '../../utils/strengthHelpers'
import { parseDurationToSeconds, formatSeconds } from '../../utils/timeHelpers'
import { useStrengthContext } from './StrengthTimerContext'

export default function StrengthBlockForm({
  block,
  index,
  onChange,
  onRemove,
}) {
  const { startTimer } = useStrengthContext()
  const blockRest = parseDurationToSeconds(block.restAfterBlock)
  const timerEnabled = block.timerEnabled !== false

  function finishBlock() {
    startTimer({
      seconds: blockRest,
      label: `Fin du bloc · ${block.name || 'bloc'}`,
      kind: 'rest',
    })
  }
  function updateField(field, value) {
    onChange({
      ...block,
      [field]: value,
    })
  }

  function updateExercise(index, updatedExercise) {
    onChange({
      ...block,
      exercises: block.exercises.map((exercise, exerciseIndex) =>
        exerciseIndex === index ? updatedExercise : exercise,
      ),
    })
  }
  
  function addExercise() {
    onChange({
      ...block,
      exercises: [
        ...block.exercises,
        createEmptyExercise(),
      ],
    })
  }
  
  function removeExercise(index) {
    onChange({
      ...block,
      exercises: block.exercises.filter(
        (_, exerciseIndex) => exerciseIndex !== index,
      ),
    })
  }

  return (
    <section className="strength-block-card">
      <div className="strength-block-heading">
        <div>
          <span className="eyebrow">BLOC {index + 1}</span>
          <h3>{block.name || 'Nouveau bloc'}</h3>
        </div>

        <button
          type="button"
          className="training-secondary-button strength-danger-button"
          onClick={onRemove}
          aria-label={`Supprimer le bloc ${index + 1}`}
        >
          Supprimer
        </button>
      </div>


<CollapsibleSection id={`block-${block.id}`} title="Exercices du bloc" summary={`${block.exercises.length} exercice(s)`} defaultOpen={true}>
<div className="strength-block-exercises">
  <div className="strength-exercise-heading">
    <div>
      <span className="eyebrow">CONTENU DU BLOC</span>
      <h4>Exercices</h4>
    </div>

    <button
      type="button"
      className="training-secondary-button"
      onClick={addExercise}
    >
      + Ajouter un exercice
    </button>
  </div>

  {block.exercises.map((exercise, exerciseIndex) => (
    <StrengthExerciseForm
      key={exercise.id}
      exercise={exercise}
      index={exerciseIndex}
      onChange={(updatedExercise) =>
        updateExercise(exerciseIndex, updatedExercise)
      }
      onRemove={() => removeExercise(exerciseIndex)}
    />
  ))}
</div>
</CollapsibleSection>

      <div className="strength-form-grid">
        <label className="strength-field">
          <span>Nom du bloc</span>
          <input
            type="text"
            value={block.name}
            onChange={(event) => updateField('name', event.target.value)}
            placeholder="Ex. Force maximale"
          />
        </label>

        <label className="strength-field">
          <span>Catégorie</span>
          <select
            value={block.category}
            onChange={(event) => updateField('category', event.target.value)}
          >
            {strengthCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="strength-field">
          <span>Récupération après le bloc</span>
          <input
            type="text"
            value={block.restAfterBlock}
            onChange={(event) =>
              updateField('restAfterBlock', event.target.value)
            }
            placeholder="Ex. 3 min"
          />
        </label>

        <label className="strength-field strength-field-full">
          <span>Notes du bloc</span>
          <textarea
            value={block.notes}
            onChange={(event) => updateField('notes', event.target.value)}
            placeholder="Consignes, objectif ou remarques…"
            rows={2}
          />
        </label>
      </div>
      <div className="strength-timer-config">
        <label className="strength-set-completed">
          <input
            type="checkbox"
            checked={timerEnabled}
            onChange={(event) => updateField('timerEnabled', event.target.checked)}
          />
          Chrono de récupération à la fin du bloc
        </label>

        {timerEnabled && (
          <div className="strength-timer-actions">
            <button type="button" onClick={finishBlock} disabled={blockRest <= 0}>
              ✓ Terminer le bloc ({formatSeconds(blockRest)})
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

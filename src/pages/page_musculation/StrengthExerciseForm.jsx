
import {
  muscleGroups,
  strengthCategories,
  strengthEquipment,
  createEmptySet,
} from '../../utils/strengthHelpers'

export default function StrengthExerciseForm({
  exercise,
  index,
  onChange,
  onRemove,
}) {
  function updateField(field, value) {
    onChange({
      ...exercise,
      [field]: value,
    })
  }

  function updateSet(setIndex, field, value) {
    const sets = exercise.sets.map((set, i) =>
      i === setIndex ? { ...set, [field]: value } : set,
    )

    updateField('sets', sets)
  }

  function addSet() {
    updateField('sets', [...exercise.sets, createEmptySet()])
  }

  function removeSet(setIndex) {
    updateField(
      'sets',
      exercise.sets.filter((_, i) => i !== setIndex),
    )
  }

  return (
    <article className="strength-exercise-card">
      <div className="strength-exercise-heading">
        <div>
          <span className="eyebrow">EXERCICE {index + 1}</span>
          <h4>{exercise.name || 'Nouvel exercice'}</h4>
        </div>

        <button
          type="button"
          className="training-secondary-button strength-danger-button"
          onClick={onRemove}
        >
          Supprimer
        </button>
      </div>

      <div className="strength-form-grid">
        <label className="strength-field strength-field-full">
          <span>Nom de l’exercice</span>
          <input
            value={exercise.name}
            onChange={(event) => updateField('name', event.target.value)}
            placeholder="Ex. Squat, rowing barre, leg curl…"
          />
        </label>

        <label className="strength-field">
          <span>Catégorie</span>
          <select
            value={exercise.category}
            onChange={(event) =>
              updateField('category', event.target.value)
            }
          >
            {strengthCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="strength-field">
          <span>Groupe musculaire</span>
          <select
            value={exercise.muscleGroup}
            onChange={(event) =>
              updateField('muscleGroup', event.target.value)
            }
          >
            {muscleGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </label>

        <label className="strength-field">
          <span>Matériel</span>
          <select
            value={exercise.equipment}
            onChange={(event) =>
              updateField('equipment', event.target.value)
            }
          >
            {strengthEquipment.map((equipment) => (
              <option key={equipment} value={equipment}>
                {equipment}
              </option>
            ))}
          </select>
        </label>

        <label className="strength-field">
          <span>Nombre de séries prévues</span>
          <input
            type="number"
            min="1"
            value={exercise.targetSets}
            onChange={(event) =>
              updateField('targetSets', event.target.value)
            }
          />
        </label>

        <label className="strength-field">
          <span>Répétitions prévues</span>
          <input
            value={exercise.targetRepRange}
            onChange={(event) =>
              updateField('targetRepRange', event.target.value)
            }
            placeholder="Ex. 6-8 ou 10"
          />
        </label>

        <label className="strength-field">
          <span>Charge cible (kg)</span>
          <input
            type="number"
            min="0"
            step="0.5"
            value={exercise.targetLoad}
            onChange={(event) =>
              updateField('targetLoad', event.target.value)
            }
            placeholder="Optionnel"
          />
        </label>

        <label className="strength-field">
          <span>Intensité cible</span>
          <input
            value={exercise.targetIntensity}
            onChange={(event) =>
              updateField('targetIntensity', event.target.value)
            }
            placeholder="Ex. RPE 8 ou RIR 2"
          />
        </label>

        <label className="strength-field">
          <span>Repos entre les séries</span>
          <input
            value={exercise.restAfterSet}
            onChange={(event) =>
              updateField('restAfterSet', event.target.value)
            }
            placeholder="Ex. 2 min"
          />
        </label>

        <label className="strength-field">
          <span>Repos après l’exercice</span>
          <input
            value={exercise.restAfterExercise}
            onChange={(event) =>
              updateField('restAfterExercise', event.target.value)
            }
            placeholder="Ex. 3 min"
          />
        </label>

        <label className="strength-field strength-field-full">
          <span>Notes</span>
          <textarea
            value={exercise.notes}
            onChange={(event) => updateField('notes', event.target.value)}
            rows={2}
            placeholder="Consignes techniques ou remarques…"
          />
        </label>
      </div>

      <div className="strength-sets-section">
        <div className="strength-exercise-heading">
          <div>
            <span className="eyebrow">RÉSULTATS</span>
            <h4>Séries et répétitions</h4>
          </div>

          <button
            type="button"
            className="training-secondary-button"
            onClick={addSet}
          >
            + Ajouter une série
          </button>
        </div>

        {exercise.sets.map((set, setIndex) => (
          <div className="strength-set-card" key={set.id}>
            <div className="strength-set-heading">
              <strong>Série {setIndex + 1}</strong>

              <label className="strength-set-completed">
                <input
                  type="checkbox"
                  checked={Boolean(set.completed)}
                  onChange={(event) =>
                    updateSet(setIndex, 'completed', event.target.checked)
                  }
                />
                Réalisée
              </label>

              <button
                type="button"
                className="strength-set-remove"
                onClick={() => removeSet(setIndex)}
                aria-label={`Supprimer la série ${setIndex + 1}`}
              >
                Retirer
              </button>
            </div>

            <div className="strength-set-grid">
              <label className="strength-field">
                <span>Reps prévues</span>
                <input
                  type="number"
                  min="0"
                  value={set.targetReps}
                  onChange={(event) =>
                    updateSet(setIndex, 'targetReps', event.target.value)
                  }
                />
              </label>

              <label className="strength-field">
                <span>Charge prévue (kg)</span>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={set.targetLoad}
                  onChange={(event) =>
                    updateSet(setIndex, 'targetLoad', event.target.value)
                  }
                />
              </label>

              <label className="strength-field">
                <span>Reps réalisées</span>
                <input
                  type="number"
                  min="0"
                  value={set.reps}
                  onChange={(event) =>
                    updateSet(setIndex, 'reps', event.target.value)
                  }
                />
              </label>

              <label className="strength-field">
                <span>Charge réalisée (kg)</span>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={set.load}
                  onChange={(event) =>
                    updateSet(setIndex, 'load', event.target.value)
                  }
                />
              </label>

              <label className="strength-field">
                <span>RPE (1–10)</span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  step="1"
                  value={set.rpe}
                  onChange={(event) =>
                    updateSet(setIndex, 'rpe', event.target.value)
                  }
                />
              </label>

              <label className="strength-field">
                <span>RIR</span>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="1"
                  value={set.rir}
                  onChange={(event) =>
                    updateSet(setIndex, 'rir', event.target.value)
                  }
                />
              </label>

              <label className="strength-field strength-field-full">
                <span>Notes de la série</span>
                <input
                  value={set.notes}
                  onChange={(event) =>
                    updateSet(setIndex, 'notes', event.target.value)
                  }
                  placeholder="Optionnel"
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

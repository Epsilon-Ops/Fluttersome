import CollapsibleSection from '../../components/CollapsibleSection'

import {
  muscleGroups,
  strengthCategories,
  strengthEquipment,
  createEmptySet,
  createEmptyExerciseTimer,
} from '../../utils/strengthHelpers'
import { parseDurationToSeconds, formatSeconds } from '../../utils/timeHelpers'
import { getLastPerformance } from '../../utils/strengthProgress'
import { useStrengthContext } from './StrengthTimerContext'
import { formatShortDateLabel } from './strengthFormat'

export default function StrengthExerciseForm({
  exercise,
  index,
  onChange,
  onRemove,
}) {
  const { series, startTimer } = useStrengthContext()
  const timer = createEmptyExerciseTimer(exercise.timer || {})
  const restSetSeconds = parseDurationToSeconds(exercise.restAfterSet)
  const restExerciseSeconds = parseDurationToSeconds(exercise.restAfterExercise)
  const lastPerformance = getLastPerformance(series, exercise.name)

  function updateField(field, value) {
    onChange({
      ...exercise,
      [field]: value,
    })
  }

  function updateTimer(field, value) {
    updateField('timer', { ...timer, [field]: value })
  }

  function handleSetCompleted(setIndex, checked) {
    updateSet(setIndex, 'completed', checked)

    if (checked && timer.enabled && timer.onSetEnd && restSetSeconds > 0) {
      startTimer({
        seconds: restSetSeconds,
        label: `Série ${setIndex + 1} · ${exercise.name || 'exercice'}`,
        kind: 'rest',
      })
    }
  }

  function startSeriesEffort() {
    const work = parseDurationToSeconds(timer.workSeconds)
    const next =
      restSetSeconds > 0
        ? {
            seconds: restSetSeconds,
            label: `Après l’effort · ${exercise.name || 'exercice'}`,
            kind: 'rest',
          }
        : null

    startTimer({
      seconds: work,
      label: exercise.name || 'Effort',
      kind: 'work',
      next,
    })
  }

  function finishExercise() {
    startTimer({
      seconds: restExerciseSeconds,
      label: `Fin de ${exercise.name || 'l’exercice'}`,
      kind: 'rest',
    })
  }

  function reuseLastLoad() {
    if (!lastPerformance) return

    const sets = exercise.sets.map((set) =>
      set.load === '' ? { ...set, load: String(lastPerformance.maxLoad) } : set,
    )

    updateField('sets', sets)
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

      <CollapsibleSection
        id={`exercise-${exercise.id}`}
        title={exercise.name || 'Nouvel exercice'}
        summary={`${exercise.sets.length} série(s) · ${exercise.sets.filter((set) => set.completed).length} réalisée(s)`}
        defaultOpen={!exercise.name}
      >
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

      {lastPerformance && (
        <p className="strength-history-hint">
          Dernière fois ({formatShortDateLabel(lastPerformance.date)}) :{' '}
          {lastPerformance.maxLoad} kg · 1RM estimé ≈{' '}
          {lastPerformance.bestE1rm ?? '—'} kg
          {lastPerformance.recordE1rm
            ? ` · record ≈ ${lastPerformance.recordE1rm} kg`
            : ''}
          {' '}
          <button
            type="button"
            className="training-secondary-button"
            onClick={reuseLastLoad}
          >
            Reprendre cette charge
          </button>
        </p>
      )}

      <fieldset className="strength-timer-config">
        <legend className="strength-field-legend">Chronomètre</legend>

        <label className="strength-set-completed">
          <input
            type="checkbox"
            checked={timer.enabled}
            onChange={(event) => updateTimer('enabled', event.target.checked)}
          />
          Utiliser un chrono pour cet exercice
        </label>

        {timer.enabled && (
          <>
            <div className="strength-timer-config__row">
              <label>
                <input
                  type="checkbox"
                  checked={timer.onStart}
                  onChange={(event) => updateTimer('onStart', event.target.checked)}
                />
                Chrono d’effort au début de chaque série
              </label>

              {timer.onStart && (
                <label>
                  Effort
                  <input
                    type="text"
                    value={timer.workSeconds}
                    onChange={(event) => updateTimer('workSeconds', event.target.value)}
                    placeholder="Ex. 1 min"
                  />
                </label>
              )}
            </div>

            <div className="strength-timer-config__row">
              <label>
                <input
                  type="checkbox"
                  checked={timer.onSetEnd}
                  onChange={(event) => updateTimer('onSetEnd', event.target.checked)}
                />
                Récupération après chaque série
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={timer.onExerciseEnd}
                  onChange={(event) => updateTimer('onExerciseEnd', event.target.checked)}
                />
                Récupération après l’exercice
              </label>
            </div>

            <div className="strength-timer-actions">
              {timer.onStart && (
                <button type="button" onClick={startSeriesEffort}>
                  ▶ Lancer une série ({formatSeconds(parseDurationToSeconds(timer.workSeconds))})
                </button>
              )}

              {timer.onExerciseEnd && (
                <button
                  type="button"
                  onClick={finishExercise}
                  disabled={restExerciseSeconds <= 0}
                >
                  ✓ Terminer l’exercice ({formatSeconds(restExerciseSeconds)})
                </button>
              )}
            </div>
          </>
        )}
      </fieldset>

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
                    handleSetCompleted(setIndex, event.target.checked)
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
      </CollapsibleSection>
    </article>
  )
}

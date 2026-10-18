
import { recordDistances, runningConditions } from '../../utils/trainingHelpers'

export default function TrainingCourseForm({
  course,
  index,
  courseCount,
  onUpdate,
  onDuplicate,
  onDelete,
}) {
  function update(field, value) {
    onUpdate(course.id, field, value)
  }

  return (
    <div className="training-course-card">
      <div className="training-course-heading">
        <h4>Course {index + 1}</h4>

        <div className="training-block-actions">
          <button
            type="button"
            className="training-secondary-button"
            onClick={() => onDuplicate(course.id)}
          >
            Dupliquer
          </button>

          <button
            type="button"
            className="training-text-button"
            onClick={() => onDelete(course.id)}
            disabled={courseCount === 1}
          >
            Supprimer
          </button>
        </div>
      </div>

      <div className="training-form-grid">
        <div className="training-field">
          <label htmlFor={`course-distance-${course.id}`}>
            Distance (m)
          </label>
          <input
            id={`course-distance-${course.id}`}
            type="number"
            min="1"
            max="10000"
            step="1"
            value={course.distance}
            onChange={(event) => update('distance', event.target.value)}
            required
          />
        </div>

        <div className="training-field">
          <label htmlFor={`course-condition-${course.id}`}>
            Départ / condition
          </label>
          <select
            id={`course-condition-${course.id}`}
            value={course.condition}
            onChange={(event) => update('condition', event.target.value)}
          >
            {runningConditions.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>

        {course.condition === 'Condition personnalisée' && (
          <div className="training-field training-field-full">
            <label htmlFor={`course-custom-${course.id}`}>
              Condition personnalisée
            </label>
            <input
              id={`course-custom-${course.id}`}
              value={course.customCondition || ''}
              onChange={(event) =>
                update('customCondition', event.target.value)
              }
              placeholder="Décris la consigne"
              maxLength={200}
            />
          </div>
        )}

        <div className="training-field">
          <label htmlFor={`course-recovery-${course.id}`}>
            Récupération après cette course
          </label>
          <input
            id={`course-recovery-${course.id}`}
            value={course.recoveryAfter || ''}
            onChange={(event) => update('recoveryAfter', event.target.value)}
            placeholder="Ex. : 1 min 30"
            maxLength={100}
          />
        </div>

        <div className="training-field">
          <label htmlFor={`course-intensity-${course.id}`}>
            Intensité cible (%)
          </label>
          <input
            id={`course-intensity-${course.id}`}
            type="number"
            min="1"
            max="100"
            step="1"
            value={course.targetIntensity ?? ''}
            onChange={(event) =>
              update('targetIntensity', event.target.value)
            }
            placeholder="Facultatif"
          />
        </div>

        <div className="training-field">
          <label htmlFor={`course-reference-${course.id}`}>
            Record de référence
          </label>
          <select
            id={`course-reference-${course.id}`}
            value={course.referenceDistance || 'none'}
            onChange={(event) =>
              update('referenceDistance', event.target.value)
            }
          >
            {recordDistances.map((distance) => (
              <option key={distance} value={distance}>
                {distance === 'none' ? 'Aucune référence' : `${distance} m`}
              </option>
            ))}
          </select>
        </div>

        <div className="training-field">
          <label htmlFor={`course-result-${course.id}`}>
            Chrono réalisé (secondes)
          </label>
          <input
            id={`course-result-${course.id}`}
            type="text"
            inputMode="decimal"
            value={course.result || ''}
            onChange={(event) => update('result', event.target.value)}
            placeholder="Ex. : 7,42"
            maxLength={30}
          />
        </div>

        <div className="training-field training-field-full">
          <label htmlFor={`course-notes-${course.id}`}>
            Notes de la course
          </label>
          <textarea
            id={`course-notes-${course.id}`}
            rows={2}
            value={course.notes || ''}
            onChange={(event) => update('notes', event.target.value)}
            placeholder="Sensations, technique, vent, surface…"
            maxLength={500}
          />
        </div>
      </div>
    </div>
  )
}

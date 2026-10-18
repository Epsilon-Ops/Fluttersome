
import { createEmptyCourse } from '../../utils/trainingHelpers'
import TrainingCourseForm from './TrainingCourseForm'

export default function TrainingBlockForm({
  block,
  index,
  blockCount,
  onUpdate,
  onDuplicate,
  onDelete,
}) {
  const courses = Array.isArray(block.courses) ? block.courses : []

  function updateBlock(field, value) {
    onUpdate(block.id, field, value)
  }

  function updateCourse(courseId, field, value) {
    const updatedCourses = courses.map((course) =>
      course.id === courseId
        ? { ...course, [field]: value }
        : course,
    )

    updateBlock('courses', updatedCourses)
  }

  function addCourse() {
    updateBlock('courses', [
      ...courses,
      createEmptyCourse(),
    ])
  }

  function duplicateCourse(courseId) {
    const courseIndex = courses.findIndex(
      (course) => course.id === courseId,
    )

    if (courseIndex === -1) return

    const source = courses[courseIndex]
    const copy = {
      ...source,
      id: crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    }

    const updatedCourses = [...courses]
    updatedCourses.splice(courseIndex + 1, 0, copy)

    updateBlock('courses', updatedCourses)
  }

  function deleteCourse(courseId) {
    updateBlock(
      'courses',
      courses.filter((course) => course.id !== courseId),
    )
  }

  return (
    <div className="training-block-card training-field-full">
      <div className="training-block-heading">
        <h3>Bloc {index + 1}</h3>

        <div className="training-block-actions">
          <button
            type="button"
            className="training-secondary-button"
            onClick={() => onDuplicate(block.id)}
            title="Dupliquer ce bloc"
          >
            Dupliquer le bloc
          </button>

          <button
            type="button"
            className="training-text-button"
            onClick={() => onDelete(block.id)}
            disabled={blockCount === 1}
            title="Supprimer ce bloc"
          >
            Supprimer
          </button>
        </div>
      </div>

      <div className="training-form-grid">
        <div className="training-field training-field-full">
          <label htmlFor={`block-name-${block.id}`}>
            Nom du bloc
          </label>

          <input
            id={`block-name-${block.id}`}
            value={block.name || ''}
            onChange={(event) =>
              updateBlock('name', event.target.value)
            }
            placeholder="Ex. : Accélérations"
            maxLength={100}
          />
        </div>

        <div className="training-field training-field-full">
          <label>Courses du bloc</label>

          <p className="training-field-help">
            Chaque course possède sa propre distance, son départ,
            sa récupération, son chrono et ses notes.
          </p>
        </div>

        {courses.map((course, courseIndex) => (
          <TrainingCourseForm
            key={course.id}
            course={course}
            index={courseIndex}
            courseCount={courses.length}
            onUpdate={updateCourse}
            onDuplicate={duplicateCourse}
            onDelete={deleteCourse}
          />
        ))}

        <div className="training-field training-field-full">
          <button
            type="button"
            className="training-secondary-button"
            onClick={addCourse}
          >
            + Ajouter une course
          </button>
        </div>

        <div className="training-field">
          <label htmlFor={`block-recovery-${block.id}`}>
            Récupération après le bloc
          </label>

          <input
            id={`block-recovery-${block.id}`}
            value={block.recoveryAfterBlock || ''}
            onChange={(event) =>
              updateBlock('recoveryAfterBlock', event.target.value)
            }
            placeholder="Ex. : 5 min"
            maxLength={100}
          />
        </div>

        <div className="training-field training-field-full">
          <label htmlFor={`block-notes-${block.id}`}>
            Notes du bloc
          </label>

          <textarea
            id={`block-notes-${block.id}`}
            rows={2}
            value={block.notes || ''}
            onChange={(event) =>
              updateBlock('notes', event.target.value)
            }
            placeholder="Consignes techniques, sensations…"
            maxLength={1000}
          />
        </div>
      </div>
    </div>
  )
}

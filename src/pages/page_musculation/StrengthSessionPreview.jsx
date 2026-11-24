import { useState } from 'react'
import ExerciseIcon from '../../components/ExerciseIcon'
import StrengthExerciseDetail from './StrengthExerciseDetail'

export default function StrengthSessionPreview({ session, onEdit, onSessionChange }) {
    const blocks = Array.isArray(session.blocks) ? session.blocks : []

    // Exercice ouvert dans la popup : identifiants du bloc et de l'exercice
    const [openExercise, setOpenExercise] = useState(null)

    const openedBlock = openExercise
      ? blocks.find((block) => block.id === openExercise.blockId) ?? null
      : null
    const openedExercise = openedBlock
      ? (openedBlock.exercises ?? []).find(
          (exercise) => exercise.id === openExercise.exerciseId,
        ) ?? null
      : null

    // Retire un exercice de la séance, après confirmation
    function deleteExercise(blockId, exerciseId) {
      const confirmed = window.confirm('Retirer cet exercice de la séance ?')
      if (!confirmed) return

      onSessionChange?.({
        ...session,
        blocks: blocks.map((block) =>
          block.id === blockId
            ? {
                ...block,
                exercises: (block.exercises ?? []).filter(
                  (exercise) => exercise.id !== exerciseId,
                ),
              }
            : block,
        ),
      })
      setOpenExercise(null)
    }
  
    const exercises = blocks.flatMap((block) =>
      Array.isArray(block.exercises) ? block.exercises : [],
    )
  
    const sets = exercises.flatMap((exercise) =>
      Array.isArray(exercise.sets) ? exercise.sets : [],
    )
  
    const completedSets = sets.filter((set) => set.completed).length
  
    const dateLabel = session.date
      ? new Intl.DateTimeFormat('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).format(new Date(`${session.date}T12:00:00`))
      : 'Date non renseignée'
  
    return (
      <article className="strength-session-card">
        <details className="strength-session-details">
          <summary className="strength-session-summary">
            <div className="strength-session-summary-main">
              <strong>
                {session.title || 'Séance de musculation'}
              </strong>
  
              <span className="strength-session-meta">
                {dateLabel} · {session.customFocus || session.focus}
              </span>
  
              <span className="strength-session-meta">
                {blocks.length} bloc(s) · {exercises.length} exercice(s)
                {' · '}
                {completedSets}/{sets.length} série(s) réalisée(s)
              </span>
            </div>
  
            <span
              className={`strength-status ${
                session.status === 'completed'
                  ? 'is-completed'
                  : 'is-planned'
              }`}
            >
              {session.status === 'completed' ? 'Réalisée' : 'Planifiée'}
            </span>
          </summary>
  
          <div className="strength-session-preview">
            {session.actualDuration && (
              <p>
                <strong>Durée réelle :</strong> {session.actualDuration} min
              </p>
            )}
  
            {session.rpe && (
              <p>
                <strong>RPE de la séance :</strong> {session.rpe}/10
              </p>
            )}
  
            {blocks.length === 0 ? (
              <p>Aucun bloc ajouté à cette séance.</p>
            ) : (
              blocks.map((block, blockIndex) => (
                <section className="strength-preview-block" key={block.id}>
                  <h4>
                    Bloc {blockIndex + 1} — {block.name || 'Sans nom'}
                  </h4>
  
                  <p className="strength-session-meta">
                    {block.category}
                    {block.restAfterBlock
                      ? ` · Récupération : ${block.restAfterBlock}`
                      : ''}
                  </p>
  
                  {block.exercises?.length ? (
                    <ul className="strength-preview-exercises">
                      {block.exercises.map((exercise) => {
                        const exerciseSets = Array.isArray(exercise.sets)
                          ? exercise.sets
                          : []
  
                        return (
                          <li key={exercise.id}>
                            <button
                              type="button"
                              className="strength-preview-exercise-button"
                              onClick={() =>
                                setOpenExercise({
                                  blockId: block.id,
                                  exerciseId: exercise.id,
                                })
                              }
                            >
                            <strong className="strength-preview-exercise-name">
                              <ExerciseIcon exercise={exercise} size={18} />
                              <span>{exercise.name || 'Exercice sans nom'}</span>
                            </strong>
  
                            <p className="strength-session-meta">
                              {exercise.muscleGroup}
                              {' · '}
                              {exerciseSets.length} série(s)
                            </p>
                            </button>
  
                            {exerciseSets.length > 0 && (
                              <ul className="strength-preview-sets">
                                {exerciseSets.map((set, setIndex) => (
                                  <li key={set.id || setIndex}>
                                    <span>
                                      Série {setIndex + 1}
                                      {set.completed ? ' ✓' : ''}
                                    </span>
  
                                    <span>
                                      {set.reps !== ''
                                        ? `${set.reps} reps`
                                        : '— reps'}
                                      {' · '}
                                      {set.load !== ''
                                        ? `${set.load} kg`
                                        : '— kg'}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  ) : (
                    <p>Aucun exercice dans ce bloc.</p>
                  )}
                </section>
              ))
            )}
  
            {session.notes && (
              <div className="strength-preview-notes">
                <strong>Notes</strong>
                <p>{session.notes}</p>
              </div>
            )}
  
            <button
              type="button"
              className="training-secondary-button"
              onClick={onEdit}
            >
              Modifier la séance
            </button>
          </div>
        </details>
        {openedExercise && (
          <StrengthExerciseDetail
            exercise={openedExercise}
            blockName={openedBlock.name}
            onClose={() => setOpenExercise(null)}
            onEdit={() => {
              setOpenExercise(null)
              onEdit?.()
            }}
            onDelete={() =>
              deleteExercise(openedBlock.id, openedExercise.id)
            }
          />
        )}
      </article>
    )
  }
  
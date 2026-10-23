import { useEffect, useState } from 'react'
import {
  TASK_CATEGORIES,
  TASK_PRIORITIES,
} from '../../utils/taskHelpers'

const EMPTY_FORM = {
  title: '',
  due: '',
  priority: 'normal',
  category: 'personnel',
  duration: '',
  notes: '',
  subtasks: [],
}

export default function TasksFormModal({
  open,
  task,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [newSubtask, setNewSubtask] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return

    setForm(
      task
        ? {
            title: task.title ?? '',
            due: task.due ?? '',
            priority: task.priority ?? 'normal',
            category: task.category ?? 'personnel',
            duration: task.duration ?? '',
            notes: task.notes ?? '',
            subtasks: (task.subtasks ?? []).map(
              (subtask) => ({ ...subtask }),
            ),
          }
        : {
            ...EMPTY_FORM,
            subtasks: [],
          },
    )

    setNewSubtask('')
    setError('')
  }, [open, task])

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function addSubtask(event) {
    event.preventDefault()

    const title = newSubtask.trim()
    if (!title) return

    setForm((current) => ({
      ...current,
      subtasks: [
        ...current.subtasks,
        {
          id: `subtask-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 7)}`,
          title,
          completed: false,
        },
      ],
    }))

    setNewSubtask('')
  }

  function removeSubtask(id) {
    setForm((current) => ({
      ...current,
      subtasks: current.subtasks.filter(
        (subtask) => subtask.id !== id,
      ),
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const title = form.title.trim()
    const duration =
      form.duration === '' ? '' : Number(form.duration)

    if (!title) {
      setError('Le titre de la tâche est obligatoire.')
      return
    }

    if (
      form.duration !== '' &&
      (!Number.isFinite(duration) ||
        duration <= 0 ||
        duration > 1440)
    ) {
      setError(
        'La durée doit être comprise entre 1 et 1440 minutes.',
      )
      return
    }

    onSave({
      ...form,
      title,
      duration,
      notes: form.notes.trim(),
      subtasks: form.subtasks.filter(
        (subtask) => subtask.title.trim(),
      ),
    })
  }

  return (
    <div
      className="tasks-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <section
        className="tasks-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tasks-modal-title"
      >
        <header className="tasks-modal-header">
          <div>
            <span className="eyebrow">
              ORGANISATION PERSONNELLE
            </span>
            <h2 id="tasks-modal-title">
              {task ? 'Modifier la tâche' : 'Nouvelle tâche'}
            </h2>
            <p>
              {task
                ? 'Modifie les informations de ta tâche.'
                : 'Ajoute une action à ton organisation quotidienne.'}
            </p>
          </div>

          <button
            type="button"
            className="tasks-modal-close"
            onClick={onClose}
            aria-label="Fermer"
          >
            ×
          </button>
        </header>

        <form className="tasks-form" onSubmit={handleSubmit}>
          <label className="tasks-form-field">
            <span>
              Titre <span className="required">*</span>
            </span>
            <input
              autoFocus
              required
              maxLength={160}
              value={form.title}
              onChange={(event) =>
                updateField('title', event.target.value)
              }
              placeholder="Ex. Réviser les maths"
            />
          </label>

          <div className="tasks-form-grid">
            <label className="tasks-form-field">
              <span>Échéance</span>
              <input
                type="date"
                value={form.due}
                onChange={(event) =>
                  updateField('due', event.target.value)
                }
              />
            </label>

            <label className="tasks-form-field">
              <span>Durée estimée (minutes)</span>
              <input
                type="number"
                min="1"
                max="1440"
                step="1"
                value={form.duration}
                onChange={(event) =>
                  updateField('duration', event.target.value)
                }
                placeholder="Ex. 30"
              />
            </label>
          </div>

          <div className="tasks-form-grid">
            <label className="tasks-form-field">
              <span>Priorité</span>
              <select
                value={form.priority}
                onChange={(event) =>
                  updateField('priority', event.target.value)
                }
              >
                {TASK_PRIORITIES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="tasks-form-field">
              <span>Catégorie</span>
              <select
                value={form.category}
                onChange={(event) =>
                  updateField('category', event.target.value)
                }
              >
                {TASK_CATEGORIES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="tasks-form-field">
            <span>Notes</span>
            <textarea
              rows={3}
              maxLength={3000}
              value={form.notes}
              onChange={(event) =>
                updateField('notes', event.target.value)
              }
              placeholder="Détails ou informations utiles..."
            />
          </label>

          <section className="tasks-form-subtasks">
            <div className="tasks-form-section-heading">
              <div>
                <h3>Sous-tâches</h3>
                <p>Découpe ta tâche en petites étapes.</p>
              </div>
              <span>{form.subtasks.length}</span>
            </div>

            {form.subtasks.map((subtask) => (
              <div
                className="tasks-form-subtask-row"
                key={subtask.id}
              >
                <span>{subtask.title}</span>
                <button
                  type="button"
                  onClick={() => removeSubtask(subtask.id)}
                  aria-label={`Retirer ${subtask.title}`}
                >
                  ×
                </button>
              </div>
            ))}

            <div className="tasks-add-subtask">
              <input
                value={newSubtask}
                maxLength={160}
                onChange={(event) =>
                  setNewSubtask(event.target.value)
                }
                placeholder="Ajouter une étape..."
                aria-label="Nouvelle sous-tâche"
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    addSubtask(event)
                  }
                }}
              />
              <button
                type="button"
                onClick={addSubtask}
                disabled={!newSubtask.trim()}
              >
                Ajouter
              </button>
            </div>
          </section>

          {error && (
            <p className="tasks-form-error" role="alert">
              {error}
            </p>
          )}

          <footer className="tasks-form-actions">
            <button
              type="button"
              className="tasks-secondary-button"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="tasks-primary-button"
            >
              {task ? 'Enregistrer' : 'Créer la tâche'}
            </button>
          </footer>
        </form>
      </section>
    </div>
  )
}
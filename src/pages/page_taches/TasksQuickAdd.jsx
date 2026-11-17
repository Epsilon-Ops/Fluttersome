import { useState } from 'react'
import { parseQuickAdd } from '../../utils/quickAddParser'

const EXAMPLES = ['Appeler Paul demain à 14h', 'Dossier urgent vendredi', 'Sport dans 2 jours 18h30']

export default function TasksQuickAdd({ onAdd }) {
  const [value, setValue] = useState('')
  const [feedback, setFeedback] = useState('')

  const preview = parseQuickAdd(value)

  function handleSubmit(event) {
    event.preventDefault()

    if (!preview.title) return

    const id = onAdd({
      title: preview.title,
      due: preview.due,
      dueTime: preview.dueTime,
      reminderBefore: preview.reminderBefore,
      priority: preview.priority || 'normal',
    })

    if (id) {
      const parts = [preview.due && `le ${preview.due}`, preview.dueTime && `à ${preview.dueTime}`]
        .filter(Boolean)
        .join(' ')
      setFeedback(`Tâche ajoutée${parts ? ` (${parts})` : ''}.`)
      setValue('')
    }
  }

  return (
    <form className="tasks-quick-add" onSubmit={handleSubmit}>
      <label className="tasks-quick-add__label">
        <span>Ajout rapide</span>
        <input
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
            setFeedback('')
          }}
          placeholder={`Ex. : ${EXAMPLES[0]}`}
          aria-describedby="quick-add-hint"
        />
      </label>

      <button type="submit" disabled={!preview.title}>Ajouter</button>

      <p id="quick-add-hint" className="tasks-quick-add__hint">
        {value && preview.title
          ? `→ « ${preview.title} »${preview.due ? ` · ${preview.due}` : ''}${preview.dueTime ? ` à ${preview.dueTime}` : ''}${preview.priority ? ` · ${preview.priority}` : ''}`
          : feedback || `Tu peux écrire la date et l’heure dans la phrase, par exemple « ${EXAMPLES[1]} ».`}
      </p>
    </form>
  )
}


import { useEffect, useState } from 'react'
import { strengthFocuses } from '../../utils/strengthHelpers'
import StrengthBlockForm from './StrengthBlockForm'
import { createEmptyBlock, } from '../../utils/strengthHelpers'

const defaultSession = {
  title: '',
  date: '',
  focus: 'Fullbody',
  customFocus: '',
  plannedDuration: '',
  actualDuration: '',
  rpe: '',
  feeling: '',
  status: 'planned',
  notes: '',
  blocks: [createEmptyBlock()],
}

export default function StrengthForm({
  session,
  onSave,
  onCancel,
}) {
  const [form, setForm] = useState(() => ({
    ...defaultSession,
    ...session,
  }))

  useEffect(() => {
    setForm({
      ...defaultSession,
      ...session,
    })
  }, [session])

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function updateBlock(index, updatedBlock) {
    setForm((current) => ({
      ...current,
      blocks: current.blocks.map((block, blockIndex) =>
        blockIndex === index ? updatedBlock : block,
      ),
    }))
  }
  
  function addBlock() {
    setForm((current) => ({
      ...current,
      blocks: [
        ...current.blocks,
        createEmptyBlock({
          name: `Bloc ${current.blocks.length + 1}`,
        }),
      ],
    }))
  }
  
  function removeBlock(index) {
    setForm((current) => ({
      ...current,
      blocks: current.blocks.filter(
        (_, blockIndex) => blockIndex !== index,
      ),
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    onSave({
      ...session,
      ...form,
      title: form.title.trim() || 'Séance de musculation',
      plannedDuration: form.plannedDuration,
      actualDuration: form.actualDuration,
      rpe: form.rpe,
    })
  }

  return (
    <form className="strength-form" onSubmit={handleSubmit}>
      <div className="strength-form-heading">
        <div>
          <span className="eyebrow">SÉANCE</span>
          <h2>
            {session?.id ? 'Modifier la séance' : 'Nouvelle séance'}
          </h2>
          <p>Renseigne les informations principales de ton entraînement.</p>
        </div>
      </div>

      <div className="strength-form-grid">
        <label className="strength-field strength-field-full">
          <span>Nom de la séance</span>
          <input
            type="text"
            value={form.title}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="Ex. Force du bas du corps"
          />
        </label>

        <label className="strength-field">
          <span>Date</span>
          <input
            type="date"
            value={form.date}
            onChange={(event) => updateField('date', event.target.value)}
            required
          />
        </label>

        <label className="strength-field">
          <span>Objectif</span>
          <select
            value={form.focus}
            onChange={(event) => updateField('focus', event.target.value)}
          >
            {strengthFocuses.map((focus) => (
              <option key={focus} value={focus}>
                {focus}
              </option>
            ))}
          </select>
        </label>

        {form.focus === 'Personnalisé' && (
          <label className="strength-field strength-field-full">
            <span>Objectif personnalisé</span>
            <input
              type="text"
              value={form.customFocus}
              onChange={(event) =>
                updateField('customFocus', event.target.value)
              }
              placeholder="Précise ton objectif"
            />
          </label>
        )}

        <label className="strength-field">
          <span>Durée prévue (min)</span>
          <input
            type="number"
            min="0"
            value={form.plannedDuration}
            onChange={(event) =>
              updateField('plannedDuration', event.target.value)
            }
            placeholder="Ex. 60"
          />
        </label>

        <label className="strength-field">
          <span>Durée réelle (min)</span>
          <input
            type="number"
            min="0"
            value={form.actualDuration}
            onChange={(event) =>
              updateField('actualDuration', event.target.value)
            }
            placeholder="À compléter après la séance"
          />
        </label>

        <label className="strength-field">
          <span>RPE de la séance (1–10)</span>
          <select
            value={form.rpe}
            onChange={(event) => updateField('rpe', event.target.value)}
          >
            <option value="">Non renseigné</option>
            {Array.from({ length: 10 }, (_, index) => index + 1).map(
              (value) => (
                <option key={value} value={String(value)}>
                  {value}/10
                </option>
              ),
            )}
          </select>
        </label>

        <label className="strength-field">
          <span>Ressenti général</span>
          <select
            value={form.feeling}
            onChange={(event) => updateField('feeling', event.target.value)}
          >
            <option value="">Non renseigné</option>
            <option value="Très facile">Très facile</option>
            <option value="Facile">Facile</option>
            <option value="Normal">Normal</option>
            <option value="Difficile">Difficile</option>
            <option value="Très difficile">Très difficile</option>
          </select>
        </label>

        <label className="strength-field">
          <span>Statut</span>
          <select
            value={form.status}
            onChange={(event) => updateField('status', event.target.value)}
          >
            <option value="planned">Planifiée</option>
            <option value="completed">Réalisée</option>
          </select>
        </label>

        <label className="strength-field strength-field-full">
          <span>Notes générales</span>
          <textarea
            value={form.notes}
            onChange={(event) => updateField('notes', event.target.value)}
            placeholder="Sensations, objectif du jour, remarques…"
            rows={4}
          />
        </label>
      </div>


      <section className="strength-blocks-section">
        <div className="strength-panel-heading">
          <div>
            <span className="eyebrow">STRUCTURE</span>
            <h2>Blocs de travail</h2>
          </div>

          <button
            type="button"
            className="training-secondary-button"
            onClick={addBlock}
          >
            + Ajouter un bloc
          </button>
        </div>

        <div className="strength-blocks-list">
          {form.blocks.map((block, index) => (
            <StrengthBlockForm
              key={block.id}
              block={block}
              index={index}
              onChange={(updatedBlock) => updateBlock(index, updatedBlock)}
              onRemove={() => removeBlock(index)}
            />
          ))}
        </div>
      </section>


      <div className="strength-form-actions">
        <button
          type="button"
          className="training-secondary-button"
          onClick={onCancel}
        >
          Annuler
        </button>

        <button type="submit" className="training-primary-button">
          Enregistrer la séance
        </button>
      </div>
    </form>
  )
}


import { useState } from 'react'
import {
  bodyParts,
  bodySides,
  bodySensationTypes,
} from '../../utils/bodyFeelingHelpers'

const initialForm = {
  bodyPart: '',
  side: 'general',
  sensationType: '',
  intensity: 5,
  notes: '',
}

export default function BodyFeelingForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: name === 'intensity' ? Number(value) : value,
    }))

    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }))

    setSubmitError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    setErrors({})
    setSubmitError('')

    if (!form.bodyPart || !form.sensationType) {
      setErrors({
        ...(!form.bodyPart && {
          bodyPart: 'Choisis une partie du corps.',
        }),
        ...(!form.sensationType && {
          sensationType: 'Choisis un type de sensation.',
        }),
      })
      return
    }

    if (
      !Number.isInteger(form.intensity) ||
      form.intensity < 1 ||
      form.intensity > 10
    ) {
      setErrors({
        intensity: 'Choisis une intensité entre 1 et 10.',
      })
      return
    }

    const result = onSubmit?.({
      ...form,
      notes: form.notes.trim(),
    })

    if (result?.success === false) {
      setErrors(result.errors || {})
      setSubmitError(
        result.error || 'Impossible d’enregistrer cette observation.',
      )
      return
    }

    setForm(initialForm)
  }

  return (
    <form className="body-feeling-form" onSubmit={handleSubmit}>
      <div className="body-feeling-form-header">
        <div>
          <span className="eyebrow">SUIVI CORPOREL</span>
          <h3>Nouvelle observation</h3>
          <p>
            Note ce que tu ressens maintenant, après l’entraînement
            ou à tout autre moment.
          </p>
        </div>
      </div>

      <div className="body-feeling-form-grid">
        <div className="body-feeling-field">
          <label htmlFor="body-feeling-part">
            Partie du corps
          </label>
          <select
            id="body-feeling-part"
            name="bodyPart"
            value={form.bodyPart}
            onChange={handleChange}
            aria-invalid={Boolean(errors.bodyPart)}
            required
          >
            <option value="">Choisir une zone</option>
            {bodyParts.map((part) => (
              <option key={part.value} value={part.value}>
                {part.label}
              </option>
            ))}
          </select>
          {errors.bodyPart && (
            <p className="body-feeling-field-error">
              {errors.bodyPart}
            </p>
          )}
        </div>

        <div className="body-feeling-field">
          <label htmlFor="body-feeling-side">
            Côté concerné
          </label>
          <select
            id="body-feeling-side"
            name="side"
            value={form.side}
            onChange={handleChange}
          >
            {bodySides.map((side) => (
              <option key={side.value} value={side.value}>
                {side.label}
              </option>
            ))}
          </select>
        </div>

        <div className="body-feeling-field">
          <label htmlFor="body-feeling-type">
            Type de sensation
          </label>
          <select
            id="body-feeling-type"
            name="sensationType"
            value={form.sensationType}
            onChange={handleChange}
            aria-invalid={Boolean(errors.sensationType)}
            required
          >
            <option value="">Choisir une sensation</option>
            {bodySensationTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.sensationType && (
            <p className="body-feeling-field-error">
              {errors.sensationType}
            </p>
          )}
        </div>

        <div className="body-feeling-field">
          <label htmlFor="body-feeling-intensity">
            Intensité : {form.intensity}/10
          </label>
          <input
            id="body-feeling-intensity"
            type="range"
            name="intensity"
            min="1"
            max="10"
            step="1"
            value={form.intensity}
            onChange={handleChange}
            aria-valuetext={`${form.intensity} sur 10`}
          />
          <div className="body-feeling-range-labels">
            <span>1 · Faible</span>
            <span>10 · Très forte</span>
          </div>
          {errors.intensity && (
            <p className="body-feeling-field-error">
              {errors.intensity}
            </p>
          )}
        </div>
      </div>

      <div className="body-feeling-field">
        <label htmlFor="body-feeling-notes">
          Notes complémentaires (facultatif)
        </label>
        <textarea
          id="body-feeling-notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Ex. : sensation apparue après les accélérations…"
          rows={3}
        />
      </div>

      {submitError && (
        <p className="body-feeling-field-error" role="alert">
          {submitError}
        </p>
      )}

      <div className="body-feeling-form-actions">
        <button type="submit" className="sleep-primary-button">
          Enregistrer l’observation
        </button>
        {onCancel && (
          <button
            type="button"
            className="body-feeling-cancel-button"
            onClick={onCancel}
          >
            Annuler
          </button>
        )}
      </div>

      <p className="body-feeling-form-note">
        Ce suivi décrit ton ressenti personnel ; il ne remplace
        pas un avis médical.
      </p>
    </form>
  )
}

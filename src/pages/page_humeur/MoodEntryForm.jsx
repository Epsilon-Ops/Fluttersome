
import { useState } from 'react'
import { getLocalDateString } from '../../utils/moodHelpers'

export default function MoodEntryForm({
  mood,
  onSave,
  onCancel,
}) {
  const [date, setDate] = useState(getLocalDateString())
  const [time, setTime] = useState(() => {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')

    return `${hours}:${minutes}`
  })
  const [intensity, setIntensity] = useState(
    mood?.defaultIntensity ?? 3
  )
  const [valence, setValence] = useState(mood?.valence ?? 0)
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const result = onSave?.({
      moodId: mood.id,
      date,
      time,
      intensity: Number(intensity),
      valence: Number(valence),
      note,
    })

    if (result === false) {
      setError('L’enregistrement a échoué. Vérifie les informations saisies.')
    }
  }

  return (
    <form
      className="mood-entry-form"
      onSubmit={handleSubmit}
    >
      <div className="mood-entry-form__header">
        <div>
          <p className="mood-entry-form__eyebrow">
            ÉMOTION SÉLECTIONNÉE
          </p>
          <h3 className="mood-entry-form__title">
            {mood.label}
          </h3>
        </div>
      </div>

      <div className="mood-entry-form__field">
        <label htmlFor="mood-entry-date">
          Date
        </label>
        <input
          id="mood-entry-date"
          name="date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </div>

      <div className="mood-entry-form__field">
        <label htmlFor="mood-entry-time">
          Heure
        </label>
        <input
          id="mood-entry-time"
          name="time"
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          required
        />
      </div>

      <fieldset className="mood-entry-form__field">
        <legend>Intensité ressentie</legend>
        <p className="mood-entry-form__help">
          De 1 (légère) à 5 (très forte).
        </p>

        <div className="mood-entry-form__scale">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className={`mood-entry-form__scale-button ${
                intensity === value ? 'is-selected' : ''
              }`}
              aria-pressed={intensity === value}
              onClick={() => setIntensity(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mood-entry-form__field">
        <legend>Valence de l’émotion</legend>
        <p className="mood-entry-form__help">
          Indique comment cette émotion est vécue : de -5 (très désagréable)
          à +5 (très agréable). Une émotion désagréable reste une émotion
          valable à noter.
        </p>

        <div className="mood-entry-form__valence">
          <label htmlFor="mood-entry-valence">
            Valeur : {valence > 0 ? '+' : ''}{valence}
          </label>
          <input
            id="mood-entry-valence"
            name="valence"
            type="range"
            min="-5"
            max="5"
            step="1"
            value={valence}
            onChange={(event) => setValence(Number(event.target.value))}
          />
          <div className="mood-entry-form__range-labels">
            <span>-5</span>
            <span>0</span>
            <span>+5</span>
          </div>
        </div>
      </fieldset>

      <div className="mood-entry-form__field">
        <label htmlFor="mood-entry-note">
          Note personnelle (facultatif)
        </label>
        <textarea
          id="mood-entry-note"
          name="note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={3}
          maxLength={1000}
          placeholder="Tu peux noter ce qui a contribué à ce ressenti..."
        />
      </div>

      {error && (
        <p className="mood-feedback mood-feedback--error" role="alert">
          {error}
        </p>
      )}

      <div className="mood-entry-form__actions">
        <button
          type="button"
          className="mood-secondary-button"
          onClick={onCancel}
        >
          Annuler
        </button>

        <button
          type="submit"
          className="mood-primary-button"
        >
          Enregistrer cette émotion
        </button>
      </div>
    </form>
  )
}

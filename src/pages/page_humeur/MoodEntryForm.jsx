
import { useEffect, useState } from 'react'
import ActivitySelector from './ActivitySelector'

function getToday() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getCurrentTime() {
  const now = new Date()

  return `${String(now.getHours()).padStart(2, '0')}:${String(
    now.getMinutes(),
  ).padStart(2, '0')}`
}

export default function MoodEntryForm({
  mood,
  onSave,
  onCancel,
  saving = false,
}) {
  const [intensity, setIntensity] = useState(mood?.defaultIntensity ?? 3)
  const [activities, setActivities] = useState([])
  const [note, setNote] = useState('')
  const [date, setDate] = useState(getToday)
  const [time, setTime] = useState(getCurrentTime)
  const [error, setError] = useState('')

  useEffect(() => {
    setIntensity(mood?.defaultIntensity ?? 3)
    setActivities([])
    setNote('')
    setDate(getToday())
    setTime(getCurrentTime())
    setError('')
  }, [mood?.id])

  if (!mood) {
    return null
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const entry = {
      moodId: mood.id,
      valence: mood.valence,
      intensity,
      activities,
      note,
      date,
      time,
    }

    if (typeof onSave !== 'function') {
      setError("L'enregistrement n'est pas encore configuré.")
      return
    }

    const result = onSave(entry)

    if (result === false) {
      setError("L'entrée n'a pas pu être enregistrée.")
    }
  }

  return (
    <form className="mood-entry-form" onSubmit={handleSubmit}>
      <div className="mood-entry-form__heading">
        <div>
          <p className="mood-entry-form__eyebrow">ÉMOTION SÉLECTIONNÉE</p>
          <h3>{mood.label}</h3>
        </div>

        <span
          className="mood-entry-form__valence"
          aria-label={`Valence ${mood.valence} sur 5`}
        >
          {mood.valence > 0 ? '+' : ''}
          {mood.valence}/5
        </span>
      </div>

      <div className="mood-entry-form__field">
        <div className="mood-entry-form__label-row">
          <label htmlFor="mood-intensity">Intensité ressentie</label>
          <output htmlFor="mood-intensity">{intensity}/5</output>
        </div>

        <input
          id="mood-intensity"
          type="range"
          min="1"
          max="5"
          step="1"
          value={intensity}
          onChange={(event) => setIntensity(Number(event.target.value))}
        />

        <div className="mood-entry-form__range-labels">
          <span>Légère</span>
          <span>Modérée</span>
          <span>Forte</span>
        </div>
      </div>

      <div className="mood-entry-form__field">
        <label>Qu'as-tu fait aujourd'hui ?</label>
        <ActivitySelector
          selectedActivities={activities}
          onChange={setActivities}
        />
      </div>

      <div className="mood-entry-form__field">
        <label htmlFor="mood-note">Une note personnelle (facultatif)</label>
        <textarea
          id="mood-note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Qu'est-ce qui a contribué à cette émotion ?"
          rows={3}
          maxLength={1000}
        />
      </div>

      <div className="mood-entry-form__datetime">
        <div className="mood-entry-form__field">
          <label htmlFor="mood-date">Date</label>
          <input
            id="mood-date"
            type="date"
            value={date}
            max={getToday()}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>

        <div className="mood-entry-form__field">
          <label htmlFor="mood-time">Heure</label>
          <input
            id="mood-time"
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            required
          />
        </div>
      </div>

      {error && (
        <p className="mood-entry-form__error" role="alert">
          {error}
        </p>
      )}

      <div className="mood-entry-form__actions">
        {onCancel && (
          <button
            type="button"
            className="mood-entry-form__cancel"
            onClick={onCancel}
            disabled={saving}
          >
            Annuler
          </button>
        )}

        <button
          type="submit"
          className="mood-entry-form__submit"
          disabled={saving}
        >
          {saving ? 'Enregistrement…' : 'Enregistrer mon humeur'}
        </button>
      </div>
    </form>
  )
}

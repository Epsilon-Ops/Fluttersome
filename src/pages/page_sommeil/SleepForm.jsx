import { useEffect, useState } from 'react'

function getToday() {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60000

  return new Date(now.getTime() - offset)
    .toISOString()
    .slice(0, 10)
}

const EMPTY_FORM = {
  date: getToday(),
  bedtime: '23:00',
  fallAsleep: '23:15',
  wakeTime: '07:00',
  quality: '7',
  hadAwakenings: false,
  awakeningCount: '',
  hadNap: false,
  napDuration: '',
}

export default function SleepForm({
  initialNight,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => {
    if (!initialNight) {
      setForm(EMPTY_FORM)
      return
    }

    setForm({
      ...EMPTY_FORM,
      ...initialNight,
      quality: String(initialNight.quality ?? 7),
      awakeningCount:
        initialNight.awakeningCount == null
          ? ''
          : String(initialNight.awakeningCount),
      napDuration:
        initialNight.napDuration == null
          ? ''
          : String(initialNight.napDuration),
    })
  }, [initialNight])

  function update(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    onSubmit({
      ...form,
      quality: Number(form.quality),
      awakeningCount:
        form.hadAwakenings && form.awakeningCount !== ''
          ? Number(form.awakeningCount)
          : null,
      napDuration:
        form.hadNap && form.napDuration !== ''
          ? Number(form.napDuration)
          : null,
    })
  }

  return (
    <section className="panel sleep-form-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">JOURNAL DE SOMMEIL</span>
          <h3>
            {initialNight ? 'Modifier une nuit' : 'Enregistrer une nuit'}
          </h3>
        </div>
      </div>

      <form className="sleep-form" onSubmit={handleSubmit}>
        <label className="sleep-field">
          Date du réveil
          <input
            type="date"
            value={form.date}
            onChange={(event) => update('date', event.target.value)}
            required
          />
        </label>

        <div className="sleep-form-grid">
          <label className="sleep-field">
            Heure de coucher
            <input
              type="time"
              value={form.bedtime}
              onChange={(event) => update('bedtime', event.target.value)}
              required
            />
          </label>

          <label className="sleep-field">
            Heure d’endormissement
            <input
              type="time"
              value={form.fallAsleep}
              onChange={(event) => update('fallAsleep', event.target.value)}
              required
            />
          </label>

          <label className="sleep-field">
            Heure de réveil
            <input
              type="time"
              value={form.wakeTime}
              onChange={(event) => update('wakeTime', event.target.value)}
              required
            />
          </label>

          <label className="sleep-field">
            Qualité du sommeil : {form.quality}/10
            <input
              type="range"
              min="1"
              max="10"
              value={form.quality}
              onChange={(event) => update('quality', event.target.value)}
            />
          </label>
        </div>

        <fieldset className="sleep-fieldset">
          <legend>Réveils nocturnes</legend>

          <label className="sleep-checkbox">
            <input
              type="checkbox"
              checked={form.hadAwakenings}
              onChange={(event) => {
                const checked = event.target.checked
                update('hadAwakenings', checked)

                if (!checked) {
                  update('awakeningCount', '')
                }
              }}
            />
            Je me suis réveillé pendant la nuit
          </label>

          {form.hadAwakenings && (
            <label className="sleep-field">
              Nombre de réveils (facultatif)
              <input
                type="number"
                min="1"
                max="50"
                value={form.awakeningCount}
                onChange={(event) =>
                  update('awakeningCount', event.target.value)
                }
              />
            </label>
          )}
        </fieldset>

        <fieldset className="sleep-fieldset">
          <legend>Sieste</legend>

          <label className="sleep-checkbox">
            <input
              type="checkbox"
              checked={form.hadNap}
              onChange={(event) => {
                const checked = event.target.checked
                update('hadNap', checked)

                if (!checked) {
                  update('napDuration', '')
                }
              }}
            />
            J’ai fait une sieste
          </label>

          {form.hadNap && (
            <label className="sleep-field">
              Durée de la sieste (minutes)
              <input
                type="number"
                min="1"
                max="600"
                value={form.napDuration}
                onChange={(event) =>
                  update('napDuration', event.target.value)
                }
              />
            </label>
          )}
        </fieldset>

        <div className="sleep-form-actions">
          <button type="submit" className="sleep-primary-button">
            Enregistrer
          </button>

          <button
            type="button"
            className="sleep-secondary-button"
            onClick={onCancel}
          >
            Annuler
          </button>
        </div>
      </form>
    </section>
  )
}
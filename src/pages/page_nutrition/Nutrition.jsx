
import { useEffect, useState } from 'react'
import {
  DEFAULT_DAILY_WATER_GOAL,
  getNutritionLocalDate,
  getDailyWaterTotal,
  createWaterEntry,
  loadHydrationData,
  saveHydrationData,
} from '../../utils/nutritionHelpers'
import '../../styles/Nutrition.css'

function formatWater(amount) {
  const liters = amount / 1000
  return `${liters.toLocaleString('fr-FR', {
    maximumFractionDigits: 2,
  })} L`
}

function formatWaterTime(timestamp) {
  const date = new Date(timestamp)

  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function Hydration() {
  const [data, setData] = useState(() => loadHydrationData())
  const [selectedDate, setSelectedDate] = useState(() => getNutritionLocalDate())
  const [customAmount, setCustomAmount] = useState('250')
  const [goalInput, setGoalInput] = useState(() =>
    String(loadHydrationData().goal)
  )
  const [message, setMessage] = useState('')

  const dailyTotal = getDailyWaterTotal(data.entries, selectedDate)
  const progress = data.goal > 0
    ? Math.min((dailyTotal / data.goal) * 100, 100)
    : 0
  const remaining = Math.max(data.goal - dailyTotal, 0)

  useEffect(() => {
    const saved = saveHydrationData(data)

    if (!saved) {
      setMessage('Sauvegarde impossible. Vérifie le stockage de ton navigateur.')
    }
  }, [data])

  function addWater(amount) {
    const quantity = Number(amount)

    if (!Number.isFinite(quantity) || quantity <= 0) {
      setMessage('Entre une quantité valide en millilitres.')
      return
    }

    const now = new Date()
    const entry = createWaterEntry(quantity, now)
    const entryForSelectedDay = {
      ...entry,
      date: selectedDate,
    }

    setData((current) => ({
      ...current,
      entries: [entryForSelectedDay, ...current.entries],
    }))

    setMessage(`${Math.round(quantity)} ml ajoutés.`)
  }

  function updateGoal() {
    const goal = Number(goalInput)

    if (!Number.isFinite(goal) || goal <= 0) {
      setMessage('Entre un objectif supérieur à zéro.')
      return
    }

    setData((current) => ({
      ...current,
      goal: Math.round(goal),
    }))

    setMessage('Objectif quotidien mis à jour.')
  }

  function deleteEntry(entryId) {
    setData((current) => ({
      ...current,
      entries: current.entries.filter((entry) => entry.id !== entryId),
    }))

    setMessage('Prise supprimée.')
  }

  const today = getNutritionLocalDate()

  return (
    <section className="hydration-page">
      <header className="hydration-header">
        <div>
          <span className="eyebrow">NUTRITION · HYDRATATION</span>
          <h1>Hydratation</h1>
          <p>Garde un œil sur tes prises d’eau au fil de la journée.</p>
        </div>
      </header>

      <section className="hydration-card hydration-summary">
        <div className="hydration-summary-top">
          <div>
            <span className="hydration-label">EAU CONSOMMÉE</span>
            <p className="hydration-total">{formatWater(dailyTotal)}</p>
            <p className="hydration-muted">
              Objectif : {formatWater(data.goal)}
            </p>
          </div>

          <div
            className="hydration-progress-ring"
            style={{ '--hydration-progress': `${progress}%` }}
            role="img"
            aria-label={`${Math.round(progress)} % de l’objectif`}
          >
            <strong>{Math.round(progress)}%</strong>
          </div>
        </div>

        <div
          className="hydration-progress-track"
          role="progressbar"
          aria-label="Progression de l’hydratation"
          aria-valuemin={0}
          aria-valuemax={data.goal}
          aria-valuenow={Math.min(dailyTotal, data.goal)}
        >
          <div
            className="hydration-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="hydration-remaining">
          {remaining > 0
            ? `Il te reste ${formatWater(remaining)} pour atteindre ton objectif.`
            : 'Objectif quotidien atteint !'}
        </p>
      </section>

      <section className="hydration-card">
        <h2>Ajouter de l’eau</h2>
        <p className="hydration-muted">
          Choisis une quantité pour enregistrer une prise.
        </p>

        <div className="hydration-quick-actions">
          {[250, 500, 750].map((amount) => (
            <button
              key={amount}
              type="button"
              className="hydration-quick-button"
              onClick={() => addWater(amount)}
            >
              <span>💧</span>
              <strong>{amount}</strong>
              <small>ml</small>
            </button>
          ))}
        </div>

        <form
          className="hydration-custom-form"
          onSubmit={(event) => {
            event.preventDefault()
            addWater(customAmount)
          }}
        >
          <label htmlFor="hydration-custom-amount">
            Quantité personnalisée (ml)
          </label>
          <div className="hydration-custom-row">
            <input
              id="hydration-custom-amount"
              type="number"
              min="1"
              step="1"
              value={customAmount}
              onChange={(event) => setCustomAmount(event.target.value)}
              required
            />
            <button type="submit" className="training-primary-button">
              + Ajouter
            </button>
          </div>
        </form>
      </section>

      <section className="hydration-card">
        <h2>Objectif quotidien</h2>
        <p className="hydration-muted">
          Ajuste ton objectif personnel en millilitres.
        </p>

        <form
          className="hydration-custom-form"
          onSubmit={(event) => {
            event.preventDefault()
            updateGoal()
          }}
        >
          <label htmlFor="hydration-goal">Objectif (ml)</label>
          <div className="hydration-custom-row">
            <input
              id="hydration-goal"
              type="number"
              min="1"
              step="50"
              value={goalInput}
              onChange={(event) => setGoalInput(event.target.value)}
              required
            />
            <button type="submit" className="training-secondary-button">
              Enregistrer
            </button>
          </div>
          <small className="hydration-muted">
            L’objectif est un repère personnalisable, pas une prescription médicale.
          </small>
        </form>
      </section>

      <section className="hydration-card">
        <div className="hydration-history-heading">
          <div>
            <h2>Journal des prises</h2>
            <p className="hydration-muted">
              {selectedDate === today ? 'Aujourd’hui' : 'Journée sélectionnée'}
            </p>
          </div>

          <input
            aria-label="Choisir une date"
            type="date"
            value={selectedDate}
            max={today}
            onChange={(event) => setSelectedDate(event.target.value)}
          />
        </div>

        {data.entries.filter((entry) => entry.date === selectedDate).length === 0 ? (
          <p className="hydration-empty">
            Aucune prise enregistrée pour cette journée.
          </p>
        ) : (
          <div className="hydration-entry-list">
            {data.entries
              .filter((entry) => entry.date === selectedDate)
              .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
              .map((entry) => (
                <div className="hydration-entry" key={entry.id}>
                  <div className="hydration-entry-icon">💧</div>
                  <div className="hydration-entry-info">
                    <strong>{entry.amount} ml</strong>
                    <span>{formatWaterTime(entry.timestamp)}</span>
                  </div>
                  <button
                    type="button"
                    className="hydration-delete-button"
                    aria-label={`Supprimer la prise de ${entry.amount} ml`}
                    onClick={() => deleteEntry(entry.id)}
                  >
                    Supprimer
                  </button>
                </div>
              ))}
          </div>
        )}
      </section>

      {message && (
        <p className="hydration-message" role="status">
          {message}
        </p>
      )}
    </section>
  )
}

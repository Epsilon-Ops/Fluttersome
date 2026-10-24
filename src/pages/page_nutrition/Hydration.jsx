
import { useEffect, useState } from 'react'
import {
  DEFAULT_DAILY_WATER_GOAL,
  getNutritionLocalDate,
  getDailyWaterTotal,
  createWaterEntry,
  loadHydrationData,
  saveHydrationData,
} from '../../utils/nutritionHelpers'
import '../../styles/main_pages/page_nutrition/index.css'

function formatWater(amount) {
  return `${(amount / 1000).toLocaleString('fr-FR', {
    maximumFractionDigits: 2,
  })} L`
}

function formatWaterTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function Hydration() {
  const [data, setData] = useState(() => loadHydrationData())
  const [selectedDate, setSelectedDate] = useState(() => getNutritionLocalDate())
  const [customAmount, setCustomAmount] = useState('250')
  const [goalInput, setGoalInput] = useState(() =>
    String(loadHydrationData().goal || DEFAULT_DAILY_WATER_GOAL)
  )
  const [message, setMessage] = useState('')

  const dailyTotal = getDailyWaterTotal(data.entries, selectedDate)
  const progress = data.goal > 0
    ? Math.min((dailyTotal / data.goal) * 100, 100)
    : 0
  const remaining = Math.max(data.goal - dailyTotal, 0)
  const today = getNutritionLocalDate()

  useEffect(() => {
    if (!saveHydrationData(data)) {
      setMessage('Sauvegarde impossible. Vérifie le stockage du navigateur.')
    }
  }, [data])

  function addWater(amount) {
    const quantity = Number(amount)

    if (!Number.isFinite(quantity) || quantity <= 0) {
      setMessage('Entre une quantité valide en millilitres.')
      return
    }

    const entry = {
      ...createWaterEntry(quantity),
      date: selectedDate,
    }

    setData((current) => ({
      ...current,
      entries: [entry, ...current.entries],
    }))
    setMessage(`${Math.round(quantity)} ml ajoutés.`)
  }

  function updateGoal(event) {
    event.preventDefault()
    const goal = Number(goalInput)

    if (!Number.isFinite(goal) || goal <= 0) {
      setMessage('Entre un objectif supérieur à zéro.')
      return
    }

    setData((current) => ({ ...current, goal: Math.round(goal) }))
    setMessage('Objectif quotidien mis à jour.')
  }

  function deleteEntry(id) {
    setData((current) => ({
      ...current,
      entries: current.entries.filter((entry) => entry.id !== id),
    }))
    setMessage('Prise supprimée.')
  }

  const dayEntries = data.entries
    .filter((entry) => entry.date === selectedDate)
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))

  return (
    <section className="hydration-page">
      <header className="hydration-header">
        <div>
          <span className="eyebrow">NUTRITION · HYDRATATION</span>
          <h2>Hydratation</h2>
          <p>Garde un œil sur tes prises d’eau au fil de la journée.</p>
        </div>
      </header>

      <section className="hydration-card hydration-summary">
        <div className="hydration-summary-top">
          <div>
            <span className="hydration-label">EAU CONSOMMÉE</span>
            <p className="hydration-total">{formatWater(dailyTotal)}</p>
            <p className="hydration-muted">Objectif : {formatWater(data.goal)}</p>
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
            ? `Il te reste ${formatWater(remaining)} pour atteindre ton repère.`
            : 'Repère quotidien atteint !'}
        </p>
      </section>

      <section className="hydration-card">
        <h3>Ajouter de l’eau</h3>
        <p className="hydration-muted">Choisis une quantité pour enregistrer une prise.</p>

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
          <label htmlFor="hydration-custom-amount">Quantité personnalisée (ml)</label>
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
            <button type="submit" className="training-primary-button">+ Ajouter</button>
          </div>
        </form>
      </section>

      <section className="hydration-card">
        <h3>Repère quotidien</h3>
        <p className="hydration-muted">
          Personnalise ce repère selon tes besoins et les conseils de ton professionnel de santé.
        </p>

        <form className="hydration-custom-form" onSubmit={updateGoal}>
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
            <button type="submit" className="training-secondary-button">Enregistrer</button>
          </div>
        </form>
      </section>

      <section className="hydration-card">
        <div className="hydration-history-heading">
          <div>
            <h3>Journal des prises</h3>
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

        {dayEntries.length === 0 ? (
          <p className="hydration-empty">Aucune prise enregistrée pour cette journée.</p>
        ) : (
          <div className="hydration-entry-list">
            {dayEntries.map((entry) => (
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

      {message && <p className="hydration-message" role="status">{message}</p>}
    </section>
  )
}

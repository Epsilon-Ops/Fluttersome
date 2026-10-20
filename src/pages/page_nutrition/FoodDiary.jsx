
import { useEffect, useState } from 'react'
import {
  MEAL_TYPES,
  createFoodEntry,
  getFoodDayTotals,
  getFoodLocalDate,
  loadFoodEntries,
  saveFoodEntries,
} from '../../utils/foodHelpers'
import '../../styles/FoodDiary.css'

const initialForm = () => createFoodEntry({
  date: getFoodLocalDate(),
})

function formatNumber(value) {
  return Math.round(value * 10) / 10
}

export default function FoodDiary() {
  const [entries, setEntries] = useState(() => loadFoodEntries())
  const [selectedDate, setSelectedDate] = useState(() => getFoodLocalDate())
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState('')

  const totals = getFoodDayTotals(entries, selectedDate)
  const dayEntries = entries
    .filter((entry) => entry.date === selectedDate)
    .sort((a, b) => (b.time || '').localeCompare(a.time || ''))

  useEffect(() => {
    const saved = saveFoodEntries(entries)

    if (!saved) {
      setMessage('Sauvegarde impossible. Vérifie le stockage du navigateur.')
    }
  }, [entries])

  function updateField(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function addMeal(event) {
    event.preventDefault()

    const name = form.name.trim()
    const quantity = Number(form.quantity)

    if (!name) {
      setMessage('Indique le nom du repas ou de l’aliment.')
      return
    }

    if (!Number.isFinite(quantity) || quantity <= 0) {
      setMessage('Indique une quantité supérieure à zéro.')
      return
    }

    const entry = createFoodEntry({
      ...form,
      name,
      quantity: String(quantity),
      date: selectedDate,
      waterMl: Math.max(0, Number(form.waterMl) || 0),
    })

    setEntries((current) => [entry, ...current])
    setForm(() => createFoodEntry({ date: selectedDate }))
    setMessage('Repas ajouté au journal.')
  }

  function deleteMeal(id) {
    setEntries((current) => current.filter((entry) => entry.id !== id))
    setMessage('Repas supprimé du journal.')
  }

  function mealLabel(value) {
    return MEAL_TYPES.find((meal) => meal.value === value)?.label ?? value
  }

  return (
    <section className="food-diary">
      <header className="food-diary-header">
        <div>
          <span className="eyebrow">NUTRITION · JOURNAL</span>
          <h2>Journal alimentaire</h2>
          <p>
            Garde une trace de tes repas et de ce qui t’aide à te sentir
            bien pendant tes entraînements et ta récupération.
          </p>
        </div>

        <label className="food-date-field">
          <span>Journée</span>
          <input
            type="date"
            value={selectedDate}
            max={getFoodLocalDate()}
            onChange={(event) => setSelectedDate(event.target.value)}
          />
        </label>
      </header>

      <section className="food-summary-grid" aria-label="Résumé de la journée">
        <article className="food-summary-card">
          <span>Repas enregistrés</span>
          <strong>{totals.entries}</strong>
        </article>
        <article className="food-summary-card">
          <span>Protéines renseignées</span>
          <strong>{formatNumber(totals.protein)} g</strong>
        </article>
        <article className="food-summary-card">
          <span>Glucides renseignés</span>
          <strong>{formatNumber(totals.carbohydrates)} g</strong>
        </article>
        <article className="food-summary-card">
          <span>Eau associée aux repas</span>
          <strong>{formatNumber(totals.waterMl)} ml</strong>
        </article>
      </section>

      <section className="food-diary-card">
        <h3>Ajouter un repas</h3>
        <p className="food-muted">
          Les informations nutritionnelles sont facultatives. Tu peux
          simplement noter ce que tu as mangé.
        </p>

        <form className="food-form" onSubmit={addMeal}>
          <div className="food-form-grid">
            <label>
              Type de repas
              <select
                name="mealType"
                value={form.mealType}
                onChange={updateField}
              >
                {MEAL_TYPES.map((meal) => (
                  <option key={meal.value} value={meal.value}>
                    {meal.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Aliment ou repas
              <input
                name="name"
                value={form.name}
                onChange={updateField}
                placeholder="Ex. : pâtes, légumes et œufs"
                maxLength={120}
                required
              />
            </label>

            <label>
              Quantité
              <input
                name="quantity"
                type="number"
                min="0.1"
                step="0.1"
                value={form.quantity}
                onChange={updateField}
                required
              />
            </label>

            <label>
              Unité
              <select name="unit" value={form.unit} onChange={updateField}>
                <option value="portion">Portion(s)</option>
                <option value="g">Grammes (g)</option>
                <option value="ml">Millilitres (ml)</option>
                <option value="unité">Unité(s)</option>
              </select>
            </label>

            <label>
              Heure
              <input
                name="time"
                type="time"
                value={form.time}
                onChange={updateField}
                required
              />
            </label>

            <label>
              Eau associée (ml)
              <input
                name="waterMl"
                type="number"
                min="0"
                step="50"
                value={form.waterMl}
                onChange={updateField}
              />
            </label>
          </div>

          <details className="food-optional-fields">
            <summary>Informations nutritionnelles facultatives</summary>
            <p className="food-muted">
              Si tu les connais, renseigne les valeurs pour la quantité
              correspondant à une unité choisie.
            </p>

            <div className="food-form-grid">
              <label>
                Énergie (kcal)
                <input
                  name="calories"
                  type="number"
                  min="0"
                  step="any"
                  value={form.calories}
                  onChange={updateField}
                  placeholder="Facultatif"
                />
              </label>

              <label>
                Protéines (g)
                <input
                  name="protein"
                  type="number"
                  min="0"
                  step="any"
                  value={form.protein}
                  onChange={updateField}
                  placeholder="Facultatif"
                />
              </label>

              <label>
                Glucides (g)
                <input
                  name="carbohydrates"
                  type="number"
                  min="0"
                  step="any"
                  value={form.carbohydrates}
                  onChange={updateField}
                  placeholder="Facultatif"
                />
              </label>

              <label>
                Lipides (g)
                <input
                  name="fat"
                  type="number"
                  min="0"
                  step="any"
                  value={form.fat}
                  onChange={updateField}
                  placeholder="Facultatif"
                />
              </label>
            </div>
          </details>

          <label>
            Notes personnelles
            <textarea
              name="notes"
              value={form.notes}
              onChange={updateField}
              placeholder="Faim, satiété, sensations ou récupération…"
              rows={3}
              maxLength={500}
            />
          </label>

          <button className="food-primary-button" type="submit">
            + Ajouter au journal
          </button>
        </form>
      </section>

      <section className="food-diary-card">
        <div className="food-list-heading">
          <div>
            <h3>Mes repas</h3>
            <p className="food-muted">
              {dayEntries.length} entrée(s) pour cette journée
            </p>
          </div>
        </div>

        {dayEntries.length === 0 ? (
          <p className="food-empty">
            Aucun repas enregistré pour cette date. Tu peux ajouter ta
            première entrée avec le formulaire ci-dessus.
          </p>
        ) : (
          <div className="food-entry-list">
            {dayEntries.map((entry) => (
              <article className="food-entry" key={entry.id}>
                <div className="food-entry-time">{entry.time || '—'}</div>

                <div className="food-entry-content">
                  <span className="food-meal-type">
                    {mealLabel(entry.mealType)}
                  </span>
                  <h4>{entry.name}</h4>
                  <p>
                    Quantité : {entry.quantity} {entry.unit}
                  </p>

                  {entry.calories !== '' && (
                    <p>{formatNumber(Number(entry.calories) * Number(entry.quantity || 0))} kcal renseignées</p>
                  )}

                  {entry.notes && (
                    <p className="food-entry-notes">{entry.notes}</p>
                  )}
                </div>

                <button
                  type="button"
                  className="food-delete-button"
                  onClick={() => deleteMeal(entry.id)}
                  aria-label={`Supprimer ${entry.name}`}
                >
                  Supprimer
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      {message && (
        <p className="food-message" role="status">
          {message}
        </p>
      )}
    </section>
  )
}
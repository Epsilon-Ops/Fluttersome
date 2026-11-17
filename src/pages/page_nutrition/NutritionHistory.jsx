import { useMemo } from 'react'
import { loadFoodEntries, getFoodDayTotals } from '../../utils/foodHelpers'
import { loadSettings } from '../../utils/settingsHelpers'
import { loadTrainingSessions } from '../../utils/trainingHelpers'
import { loadStrengthSessions } from '../../utils/strengthHelpers'

function keyOf(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/* Calories des 14 derniers jours, comparées à l'objectif de chaque jour. */
export default function NutritionHistory() {
  const days = useMemo(() => {
    const entries = loadFoodEntries()
    const sprint = loadTrainingSessions()
    const strength = loadStrengthSessions()
    const { nutrition } = loadSettings()
    const now = new Date()

    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date(now)
      d.setDate(d.getDate() - (13 - i))
      const key = keyOf(d)
      const trained =
        sprint.some((s) => s.date === key) || strength.some((s) => s.date === key)
      const totals = getFoodDayTotals(entries, key)
      return {
        key,
        label: d.getDate(),
        kcal: totals.entries > 0 ? totals.calories : null,
        target: trained ? nutrition.kcalTraining : nutrition.kcalRest,
      }
    })
  }, [])

  const logged = days.filter((d) => d.kcal !== null)
  const maxValue = Math.max(1, ...days.map((d) => Math.max(d.kcal || 0, d.target)))

  return (
    <section className="nutrition-history panel">
      <span className="eyebrow">HISTORIQUE</span>
      <h3>14 derniers jours</h3>

      {logged.length === 0 ? (
        <p className="welcome-description">Les jours où tu as saisi des repas apparaîtront ici.</p>
      ) : (
        <div className="nutrition-history__chart" role="img" aria-label="Calories par jour sur 14 jours">
          {days.map((d) => (
            <div className="nutrition-history__col" key={d.key} title={`${d.key} : ${d.kcal ?? '—'} kcal, objectif ${d.target}`}>
              <div className="nutrition-history__track">
                <span className="nutrition-history__target" style={{ bottom: `${(d.target / maxValue) * 100}%` }} />
                <span
                  className={`nutrition-history__bar ${d.kcal !== null && d.kcal > d.target * 1.1 ? 'is-over' : ''}`}
                  style={{ height: `${d.kcal ? (d.kcal / maxValue) * 100 : 0}%` }}
                />
              </div>
              <small>{d.label}</small>
            </div>
          ))}
        </div>
      )}
      <p className="welcome-description">Trait : objectif du jour. Barre rouge : au-delà de l’objectif de plus de 10 %.</p>
    </section>
  )
}

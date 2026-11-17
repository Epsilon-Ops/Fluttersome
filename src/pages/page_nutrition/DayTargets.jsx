import { loadSettings } from '../../utils/settingsHelpers'

/* Progression du jour par rapport aux objectifs (jour d'entraînement ou de repos). */
export default function DayTargets({ totals, isTrainingDay }) {
  const { nutrition } = loadSettings()
  const kcalTarget = isTrainingDay ? nutrition.kcalTraining : nutrition.kcalRest
  const proteinTarget = nutrition.protein

  const rows = [
    { label: 'Calories', value: totals.calories, target: kcalTarget, unit: 'kcal' },
    { label: 'Protéines', value: totals.protein, target: proteinTarget, unit: 'g' },
  ]

  return (
    <div className="day-targets">
      <p className="day-targets__kind">
        {isTrainingDay ? 'Jour d’entraînement' : 'Jour de repos'} · objectifs modifiables dans les réglages
      </p>
      {rows.map((row) => {
        const pct = row.target > 0 ? Math.min(100, Math.round((row.value / row.target) * 100)) : 0
        return (
          <div className="day-targets__row" key={row.label}>
            <span>{row.label}</span>
            <div className="day-targets__bar"><span style={{ width: `${pct}%` }} /></div>
            <strong>{Math.round(row.value)} / {row.target} {row.unit}</strong>
          </div>
        )
      })}
    </div>
  )
}

import { useMemo, useState } from 'react'
import MoodEmptyState from './MoodEmptyState'
import { loadMoodEntries } from '../../utils/moodHelpers'
import { getMoodById } from '../../constants/moods'

function formatAverage(value) {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return '—'
  }

  return value.toLocaleString('fr-FR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })
}

export default function MoodStatistics() {
  const [period, setPeriod] = useState('month')
  const [entries] = useState(() => loadMoodEntries())

  const statistics = useMemo(() => {
    const now = new Date()
    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    )

    const startDate = period === 'week'
      ? new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6)
      : new Date(today.getFullYear(), today.getMonth(), 1)

    function toDateString(date) {
      return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0'),
      ].join('-')
    }

    const start = toDateString(startDate)
    const end = toDateString(today)

    const filtered = entries.filter(
      (entry) => entry.date >= start && entry.date <= end,
    )

    if (filtered.length === 0) {
      return {
        count: 0,
        averageValence: null,
        averageIntensity: null,
        mostFrequentMood: null,
        activityCounts: [],
      }
    }

    const validValences = filtered
      .map((entry) => Number(entry.valence))
      .filter((value) => Number.isFinite(value))

    const validIntensities = filtered
      .map((entry) => Number(entry.intensity))
      .filter((value) => Number.isFinite(value))

    const moodCounts = {}
    const activityCounts = {}

    filtered.forEach((entry) => {
      moodCounts[entry.moodId] = (moodCounts[entry.moodId] || 0) + 1

      if (Array.isArray(entry.activities)) {
        entry.activities.forEach((activity) => {
          activityCounts[activity] = (activityCounts[activity] || 0) + 1
        })
      }
    })

    const mostFrequentId = Object.keys(moodCounts).sort(
      (a, b) => moodCounts[b] - moodCounts[a],
    )[0]

    const mostFrequentEntry = filtered.find(
      (entry) => entry.moodId === mostFrequentId,
    )

    const mostFrequentMood = getMoodById(mostFrequentId)

    return {
      count: filtered.length,
      averageValence: validValences.length
        ? validValences.reduce((sum, value) => sum + value, 0) / validValences.length
        : null,
      averageIntensity: validIntensities.length
        ? validIntensities.reduce((sum, value) => sum + value, 0) / validIntensities.length
        : null,
      mostFrequentMood: {
        label: mostFrequentMood?.label || mostFrequentEntry?.moodLabel || 'Non précisée',
        count: moodCounts[mostFrequentId],
      },
      activityCounts: Object.entries(activityCounts)
        .map(([id, count]) => ({ id, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5),
    }
  }, [entries, period])

  return (
    <section className="mood-statistics">
      <div className="mood-statistics__header">
        <div>
          <h3 className="mood-statistics__title">Tes statistiques</h3>
          <p className="mood-statistics__description">
            Observe les tendances de ton ressenti au fil du temps.
          </p>
        </div>

        <div className="mood-statistics__period" aria-label="Période des statistiques">
          <button
            type="button"
            className={`mood-statistics__period-button ${
              period === 'week' ? 'is-active' : ''
            }`}
            aria-pressed={period === 'week'}
            onClick={() => setPeriod('week')}
          >
            Semaine
          </button>

          <button
            type="button"
            className={`mood-statistics__period-button ${
              period === 'month' ? 'is-active' : ''
            }`}
            aria-pressed={period === 'month'}
            onClick={() => setPeriod('month')}
          >
            Mois
          </button>
        </div>
      </div>

      {statistics.count === 0 ? (
        <MoodEmptyState
          title="Pas encore de statistiques"
          description="Enregistre quelques humeurs pour voir apparaître tes tendances."
        />
      ) : (
        <>
          <div className="mood-statistics__grid">
            <article className="mood-stat-card">
              <span className="mood-stat-card__label">Entrées</span>
              <strong className="mood-stat-card__value">
                {statistics.count}
              </strong>
            </article>

            <article className="mood-stat-card">
              <span className="mood-stat-card__label">Ressenti moyen</span>
              <strong className="mood-stat-card__value">
                {formatAverage(statistics.averageValence)}
              </strong>
              <span className="mood-stat-card__hint">Échelle de −5 à +5</span>
            </article>

            <article className="mood-stat-card">
              <span className="mood-stat-card__label">Intensité moyenne</span>
              <strong className="mood-stat-card__value">
                {formatAverage(statistics.averageIntensity)}/5
              </strong>
            </article>

            <article className="mood-stat-card">
              <span className="mood-stat-card__label">Humeur fréquente</span>
              <strong className="mood-stat-card__value mood-stat-card__value--text">
                {statistics.mostFrequentMood.label}
              </strong>
              <span className="mood-stat-card__hint">
                {statistics.mostFrequentMood.count}{' '}
                {statistics.mostFrequentMood.count > 1 ? 'fois' : 'fois'}
              </span>
            </article>
          </div>

          {statistics.activityCounts.length > 0 && (
            <section className="mood-statistics__activities">
              <h4 className="mood-statistics__subtitle">
                Activités les plus associées
              </h4>

              <ul className="mood-statistics__activity-list">
                {statistics.activityCounts.map((activity) => (
                  <li
                    key={activity.id}
                    className="mood-statistics__activity"
                  >
                    <span>{activity.id}</span>
                    <strong>{activity.count}</strong>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </section>
  )
}
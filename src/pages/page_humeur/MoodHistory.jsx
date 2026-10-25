import { useMemo, useState } from 'react'
import MoodHistoryItem from './MoodHistoryItem'
import MoodEmptyState from './MoodEmptyState'
import { loadMoodEntries } from '../../utils/moodHelpers'

export default function MoodHistory() {
  const [period, setPeriod] = useState('week')
  const [entries] = useState(() => loadMoodEntries())

  const filteredEntries = useMemo(() => {
    const now = new Date()
    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    )

    let startDate

    if (period === 'week') {
      startDate = new Date(today)
      startDate.setDate(today.getDate() - 6)
    } else {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1)
    }

    const startString = [
      startDate.getFullYear(),
      String(startDate.getMonth() + 1).padStart(2, '0'),
      String(startDate.getDate()).padStart(2, '0'),
    ].join('-')

    const todayString = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, '0'),
      String(today.getDate()).padStart(2, '0'),
    ].join('-')

    return entries
      .filter((entry) => entry.date >= startString && entry.date <= todayString)
      .sort((a, b) => {
        const dateComparison = b.date.localeCompare(a.date)
        if (dateComparison !== 0) return dateComparison
        return (b.time || '').localeCompare(a.time || '')
      })
  }, [entries, period])

  return (
    <section className="mood-history">
      <div className="mood-history__toolbar">
        <div>
          <h3 className="mood-history__title">Ton historique</h3>
          <p className="mood-history__description">
            Retrouve les humeurs que tu as enregistrées.
          </p>
        </div>

        <div className="mood-history__period" aria-label="Période de l'historique">
          <button
            type="button"
            className={`mood-history__period-button ${
              period === 'week' ? 'is-active' : ''
            }`}
            aria-pressed={period === 'week'}
            onClick={() => setPeriod('week')}
          >
            Semaine
          </button>

          <button
            type="button"
            className={`mood-history__period-button ${
              period === 'month' ? 'is-active' : ''
            }`}
            aria-pressed={period === 'month'}
            onClick={() => setPeriod('month')}
          >
            Mois
          </button>
        </div>
      </div>

      <p className="mood-history__count">
        {filteredEntries.length}{' '}
        {filteredEntries.length > 1 ? 'entrées' : 'entrée'}
      </p>

      {filteredEntries.length === 0 ? (
        <MoodEmptyState
          title="Aucune humeur pour cette période"
          description="Lorsque tu enregistreras une humeur, elle apparaîtra ici."
        />
      ) : (
        <div className="mood-history__list">
          {filteredEntries.map((entry) => (
            <MoodHistoryItem key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </section>
  )
}
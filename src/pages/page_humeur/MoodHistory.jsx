
import { useMemo, useState } from 'react'
import MoodHistoryItem from './MoodHistoryItem'
import MoodEmptyState from './MoodEmptyState'
import {
  getLocalDateString,
  getWeeklyMoodEntries,
  getMonthlyMoodEntries,
} from '../../utils/moodHelpers'

export default function MoodHistory({
  entries = [],
  onDelete,
}) {
  const [period, setPeriod] = useState('all')

  const filteredEntries = useMemo(() => {
    const referenceDate = new Date()

    if (period === 'week') {
      return getWeeklyMoodEntries(entries, referenceDate)
    }

    if (period === 'month') {
      return getMonthlyMoodEntries(entries, referenceDate)
    }

    return [...entries]
  }, [entries, period])

  const today = getLocalDateString()

  return (
    <div className="mood-history">
      <div className="mood-history__toolbar">
        <p className="mood-history__count">
          {filteredEntries.length}{' '}
          {filteredEntries.length > 1 ? 'entrées' : 'entrée'}
        </p>

        <div
          className="mood-history__filters"
          role="group"
          aria-label="Filtrer l’historique"
        >
          <button
            type="button"
            className={`mood-history__filter ${
              period === 'all' ? 'is-active' : ''
            }`}
            aria-pressed={period === 'all'}
            onClick={() => setPeriod('all')}
          >
            Tout
          </button>

          <button
            type="button"
            className={`mood-history__filter ${
              period === 'week' ? 'is-active' : ''
            }`}
            aria-pressed={period === 'week'}
            onClick={() => setPeriod('week')}
          >
            7 derniers jours
          </button>

          <button
            type="button"
            className={`mood-history__filter ${
              period === 'month' ? 'is-active' : ''
            }`}
            aria-pressed={period === 'month'}
            onClick={() => setPeriod('month')}
          >
            Ce mois-ci
          </button>
        </div>
      </div>

      {filteredEntries.length === 0 ? (
        <MoodEmptyState
          title="Aucune émotion pour cette période"
          description="Les émotions que tu enregistres apparaîtront ici. Tu peux noter plusieurs ressentis dans une même journée."
        />
      ) : (
        <div className="mood-history__list">
          {filteredEntries.map((entry) => (
            <MoodHistoryItem
              key={entry.id}
              entry={entry}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

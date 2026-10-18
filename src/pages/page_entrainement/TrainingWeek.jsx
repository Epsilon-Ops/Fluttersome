
import { formatWeekRange } from '../../utils/trainingHelpers'

export default function TrainingWeek({
  days,
  weekSessions,
  selectedDay,
  onSelectDay,
  weekOffset,
  onChangeWeek,
  selectedMonday,
}) {
  return (
    <section className="training-week-panel">
      <div className="training-week-heading">
        <div>
          <span className="eyebrow">PLANNING HEBDOMADAIRE</span>
          <h2>{formatWeekRange(selectedMonday)}</h2>
        </div>

        <div className="training-week-actions">
          <button
            type="button"
            className="training-icon-button"
            onClick={() => onChangeWeek((value) => value - 1)}
            aria-label="Semaine précédente"
          >
            ←
          </button>

          <button
            type="button"
            className="training-today-button"
            onClick={() => onChangeWeek(0)}
            disabled={weekOffset === 0}
          >
            Aujourd’hui
          </button>

          <button
            type="button"
            className="training-icon-button"
            onClick={() => onChangeWeek((value) => value + 1)}
            aria-label="Semaine suivante"
          >
            →
          </button>
        </div>
      </div>

      <div className="training-week-days">
        {days.map((day) => {
          const count = weekSessions.filter(
            (session) => session.date === day.dateString,
          ).length

          return (
            <button
              type="button"
              key={day.dateString}
              className={[
                'training-day-button',
                selectedDay === day.dateString ? 'is-selected' : '',
                day.isToday ? 'is-today' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onSelectDay(day.dateString)}
              aria-pressed={selectedDay === day.dateString}
            >
              <span className="training-day-name">
                {day.label}
              </span>

              <span className="training-day-number">
                {day.date.getDate()}
              </span>

              <span className="training-day-indicator">
                {count > 0
                  ? `${count} séance${count > 1 ? 's' : ''}`
                  : '—'}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

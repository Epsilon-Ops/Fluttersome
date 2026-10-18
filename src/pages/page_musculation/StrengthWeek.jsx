
import {
    addStrengthDays,
    formatStrengthDay,
    formatStrengthShortDate,
    getLocalDate,
  } from '../../utils/strengthHelpers'
  
  export default function StrengthWeek({
    days,
    weekSessions,
    selectedDay,
    onSelectDay,
    weekOffset,
    onChangeWeek,
  }) {
    return (
      <section className="strength-panel">
        <div className="strength-panel-heading">
          <div>
            <span className="eyebrow">PLANNING</span>
            <h2>Ta semaine</h2>
          </div>
  
          <div className="strength-week-navigation">
            <button
              type="button"
              className="training-secondary-button"
              onClick={() => onChangeWeek((value) => value - 1)}
              aria-label="Semaine précédente"
            >
              ←
            </button>
  
            <button
              type="button"
              className="training-secondary-button"
              onClick={() => onChangeWeek(0)}
            >
              Aujourd’hui
            </button>
  
            <button
              type="button"
              className="training-secondary-button"
              onClick={() => onChangeWeek((value) => value + 1)}
              aria-label="Semaine suivante"
            >
              →
            </button>
          </div>
        </div>
  
        <div className="strength-week-grid">
          {days.map((day) => {
            const daySessions = weekSessions.filter(
              (session) => session.date === day.dateString,
            )
  
            const completedCount = daySessions.filter(
              (session) => session.status === 'completed',
            ).length
  
            const isSelected = selectedDay === day.dateString
  
            return (
              <button
                type="button"
                key={day.dateString}
                className={[
                  'strength-week-day',
                  isSelected ? 'is-selected' : '',
                  day.isToday ? 'is-today' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => onSelectDay(day.dateString)}
                aria-pressed={isSelected}
              >
                <span className="strength-week-day-name">
                  {formatStrengthDay(day.date)}
                </span>
  
                <strong className="strength-week-day-number">
                  {day.date.getDate()}
                </strong>
  
                <span className="strength-week-day-month">
                  {formatStrengthShortDate(day.date).split(' ').slice(-1)}
                </span>
  
                <span className="strength-week-day-count">
                  {daySessions.length > 0
                    ? `${completedCount}/${daySessions.length} réalisée(s)`
                    : 'Repos'}
                </span>
              </button>
            )
          })}
        </div>
      </section>
    )
  }
  
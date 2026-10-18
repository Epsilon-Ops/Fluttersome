
import {
    formatDate,
    formatTime,
    getConditionLabel,
    getDistanceLabel,
    getPerformanceTypeLabel,
    getTimingLabel,
    getWindDirectionLabel,
  } from '../../utils/competitionHelpers'
  
  export default function PerformanceHistory({
    performances,
    historyTypeFilter,
    onFilterChange,
    onDelete,
  }) {
    const filteredHistory = performances.filter((item) => {
      if (historyTypeFilter === 'all') return true
      return item.type === historyTypeFilter
    })
  
    function handleDelete(id) {
      const confirmed = window.confirm(
        'Supprimer définitivement cette performance de ce navigateur ?',
      )
  
      if (confirmed) {
        onDelete(id)
      }
    }
  
    return (
      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">TES DONNÉES</span>
            <h3>Historique des chronos</h3>
          </div>
  
          <span className="panel-symbol">
            {filteredHistory.length}
          </span>
        </div>
  
        <div className="competition-toolbar">
          <div
            className="competition-field"
            style={{ width: '200px' }}
          >
            <label htmlFor="history-type-filter">
              Type de performance
            </label>
  
            <select
              id="history-type-filter"
              value={historyTypeFilter}
              onChange={(event) =>
                onFilterChange(event.target.value)
              }
            >
              <option value="all">Toutes</option>
              <option value="competition">Compétitions</option>
              <option value="training">Entraînements</option>
            </select>
          </div>
        </div>
  
        {filteredHistory.length > 0 ? (
          <div className="competition-history-list">
            {filteredHistory.map((item) => {
              const conditionLabel = getConditionLabel(item.conditions)
              const windDirectionLabel = getWindDirectionLabel(
                item.windDirection,
              )
  
              const hasConditions =
                conditionLabel ||
                item.conditionDetails ||
                (item.windSpeed !== null &&
                  item.windSpeed !== undefined) ||
                windDirectionLabel ||
                item.feeling ||
                item.feelingNote
  
              return (
                <div className="competition-history-row" key={item.id}>
                  <div className="competition-history-main">
                    <span className="competition-history-title">
                      {getDistanceLabel(item.distance)}
                    </span>
  
                    <span className="competition-history-subtitle">
                      {formatDate(item.date)}
                      {item.venue ? ` · ${item.venue}` : ''}
                    </span>
  
                    {item.notes && (
                      <span className="competition-history-subtitle">
                        {item.notes}
                      </span>
                    )}
  
                    {hasConditions && (
                      <span className="competition-history-subtitle">
                        {conditionLabel}
                        {item.conditionDetails
                          ? ` · ${item.conditionDetails}`
                          : ''}
                        {item.windSpeed !== null &&
                        item.windSpeed !== undefined
                          ? ` · Vent ${
                              item.windSpeed > 0 ? '+' : ''
                            }${item.windSpeed} m/s`
                          : ''}
                        {windDirectionLabel
                          ? ` · ${windDirectionLabel}`
                          : ''}
                        {item.feeling
                          ? ` · Ressenti ${item.feeling}/10`
                          : ''}
                        {item.feelingNote
                          ? ` · ${item.feelingNote}`
                          : ''}
                      </span>
                    )}
                  </div>
  
                  <div className="competition-history-time-wrap">
                    <span className="competition-time">
                      {formatTime(item.time)}
                    </span>
                  </div>
  
                  <div className="competition-history-meta">
                    <span
                      className={`competition-type-badge ${
                        item.type === 'training' ? 'training' : ''
                      }`}
                    >
                      {getPerformanceTypeLabel(item.type)}
                    </span>
  
                    <span className="competition-history-subtitle">
                      {getTimingLabel(item.timing)}
                    </span>
                  </div>
  
                  <div className="competition-history-actions">
                    <button
                      type="button"
                      className="competition-delete-button"
                      aria-label={`Supprimer le chrono du ${formatDate(item.date)}`}
                      title="Supprimer"
                      onClick={() => handleDelete(item.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="competition-empty-state">
            <h3>Aucun chrono correspondant</h3>
  
            <p>
              Choisis un autre filtre ou enregistre une nouvelle
              performance.
            </p>
          </div>
        )}
      </section>
    )
  }
  
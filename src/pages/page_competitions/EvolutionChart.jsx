
export default function EvolutionChart({ performances, distance }) {
    if (performances.length === 0) {
      return (
        <div className="evolution-empty">
          <p>
            Aucune compétition chronométrée électroniquement
            pour le moment.
          </p>
  
          <span>
            Ajoute une performance officielle pour commencer
            à suivre ton évolution.
          </span>
        </div>
      )
    }
  
    const width = 640
    const height = 280
    const padding = {
      top: 24,
      right: 28,
      bottom: 52,
      left: 58,
    }
  
    const values = performances.map((item) => Number(item.time))
    const minTime = Math.min(...values)
    const maxTime = Math.max(...values)
    const range = maxTime - minTime
  
    const margin =
      range === 0
        ? Math.max(minTime * 0.02, 0.1)
        : range * 0.2
  
    const minY = minTime - margin
    const maxY = maxTime + margin
    const plotWidth = width - padding.left - padding.right
    const plotHeight = height - padding.top - padding.bottom
  
    const points = performances.map((item, index) => {
      const x =
        performances.length === 1
          ? padding.left + plotWidth / 2
          : padding.left +
            (index / (performances.length - 1)) * plotWidth
  
      const y =
        padding.top +
        ((maxY - Number(item.time)) / (maxY - minY)) *
          plotHeight
  
      return { ...item, x, y }
    })
  
    const linePoints = points
      .map((point) => `${point.x},${point.y}`)
      .join(' ')
  
    function dateLabel(date) {
      const parsedDate = new Date(`${date}T12:00:00`)
  
      return Number.isNaN(parsedDate.getTime())
        ? date
        : parsedDate.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
          })
    }
  
    function timeLabel(time) {
      return `${Number(time).toFixed(2)} s`
    }
  
    const labelIndexes = [
      ...new Set([
        0,
        Math.floor((points.length - 1) / 2),
        points.length - 1,
      ]),
    ]
  
    return (
      <div className="evolution-chart">
        <div className="evolution-chart-summary">
          <span>{performances.length} compétition(s)</span>
          <span>Chronométrage électronique</span>
        </div>
  
        <div className="evolution-chart-scroll">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label={`Évolution des chronos électroniques sur ${distance} mètres`}
            preserveAspectRatio="xMidYMid meet"
          >
            {[0, 1, 2, 3, 4].map((step) => {
              const y = padding.top + (step / 4) * plotHeight
  
              const time =
                maxY - (step / 4) * (maxY - minY)
  
              return (
                <g key={step}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={width - padding.right}
                    y2={y}
                    className="evolution-grid-line"
                  />
  
                  <text
                    x={padding.left - 10}
                    y={y + 4}
                    textAnchor="end"
                    className="evolution-axis-label"
                  >
                    {time.toFixed(2)}
                  </text>
                </g>
              )
            })}
  
            {points.length > 1 && (
              <polyline
                points={linePoints}
                className="evolution-line"
                fill="none"
              />
            )}
  
            {points.map((point) => (
              <circle
                key={point.id}
                cx={point.x}
                cy={point.y}
                r="5"
                className="evolution-point"
              >
                <title>
                  {dateLabel(point.date)} — {timeLabel(point.time)}
                </title>
              </circle>
            ))}
  
            {labelIndexes.map((index) => {
              const point = points[index]
  
              return (
                <text
                  key={`${point.id}-date`}
                  x={point.x}
                  y={height - 20}
                  textAnchor="middle"
                  className="evolution-axis-label"
                >
                  {dateLabel(point.date)}
                </text>
              )
            })}
          </svg>
        </div>
  
        <p className="evolution-chart-caption">
          Temps en secondes · Plus le point est bas sur l’axe
          des temps, plus le chrono est rapide.
        </p>
      </div>
    )
  }
  
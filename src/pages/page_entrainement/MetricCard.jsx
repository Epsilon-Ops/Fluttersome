
export default function MetricCard({ label, value, unit, note }) {
    return (
      <article className="training-metric-card">
        <span className="training-metric-label">{label}</span>
  
        <div className="training-metric-number">
          <strong>{value}</strong>
          <span>{unit}</span>
        </div>
  
        <p>{note}</p>
      </article>
    )
  }
  
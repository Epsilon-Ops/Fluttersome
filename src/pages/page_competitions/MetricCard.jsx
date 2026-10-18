
export default function MetricCard({
    label,
    value,
    note,
  }) {
    return (
      <article
        className="competition-metric-card"
        style={{ '--category-color': '#39E58C' }}
      >
        <div className="competition-metric-label">
          {label}
        </div>
  
        <span className="competition-metric-value">
          {value}
        </span>
  
        <p className="competition-metric-note">
          {note}
        </p>
      </article>
    )
  }
  
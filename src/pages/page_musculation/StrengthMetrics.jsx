
export default function StrengthMetrics({ stats }) {
    const metrics = [
      {
        label: 'Séances réalisées',
        value: stats.completedSessions,
        detail: 'Cette semaine',
      },
      {
        label: 'Volume soulevé',
        value: `${Math.round(stats.liftedVolume).toLocaleString('fr-FR')} kg`,
        detail: 'Séries réalisées',
      },
      {
        label: 'Séries réalisées',
        value: stats.completedSets,
        detail: 'Cette semaine',
      },
      {
        label: 'Durée totale',
        value: `${Math.floor(stats.durationMinutes / 60)} h ${String(
          stats.durationMinutes % 60,
        ).padStart(2, '0')} min`,
        detail: 'Durée renseignée',
      },
    ]
  
    return (
      <section className="strength-metrics-grid" aria-label="Bilan hebdomadaire">
        {metrics.map((metric) => (
          <article className="strength-metric-card" key={metric.label}>
            <span className="strength-metric-label">{metric.label}</span>
            <strong className="strength-metric-value">{metric.value}</strong>
            <span className="strength-metric-detail">{metric.detail}</span>
          </article>
        ))}
      </section>
    )
  }
  
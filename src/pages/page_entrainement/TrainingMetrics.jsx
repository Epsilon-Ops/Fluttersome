
import MetricCard from './MetricCard'

export default function TrainingMetrics({ stats }) {
  return (
    <>
      <section className="training-section-heading">
        <div>
          <span className="eyebrow">CHARGE DE TRAVAIL</span>
          <h2>Volume de la semaine</h2>
        </div>

        <span className="training-local-badge">
          <span /> MODE LOCAL
        </span>
      </section>

      <section className="training-metrics-grid">
        <MetricCard
          label="DISTANCE TOTALE"
          value={stats.totalDistance.toLocaleString('fr-FR')}
          unit="m"
          note="Résultats renseignés"
        />

        <MetricCard
          label="HAUTE INTENSITÉ"
          value={stats.highIntensityDistance.toLocaleString('fr-FR')}
          unit="m"
          note="À calculer à partir des données réelles"
        />

        <MetricCard
          label="RÉPÉTITIONS"
          value={String(stats.repetitions)}
          unit="rép."
          note="Résultats renseignés"
        />

        <MetricCard
          label="TEMPS D’ENTRAÎNEMENT"
          value={String(Math.floor(stats.totalDuration / 60))}
          unit="min"
          note="Durée réelle à renseigner"
        />
      </section>
    </>
  )
}

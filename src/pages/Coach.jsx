import { AppIcon } from '../components/icons'

export default function Coach() {
  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <span className="eyebrow">ACCOMPAGNEMENT</span>
          <h1>Coach</h1>
          <p className="page-description">
            Ton espace de conseils et de progression personnalisée.
          </p>
        </div>
        <div className="metric-icon" style={{ color: '#45566D' }}>
          <AppIcon name="sparkles" size={24} />
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h2>Ton coach personnel</h2>
          <span className="status-pill">BIENTÔT DISPONIBLE</span>
        </div>
        <p>
          Cet espace accueillera tes recommandations, tes bilans et tes
          prochaines pistes de progression.
        </p>
      </div>
    </section>
  )
}
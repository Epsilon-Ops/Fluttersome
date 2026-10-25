
import MoodSelector from './MoodSelector'
import MoodHistory from './MoodHistory'
import MoodStatistics from './MoodStatistics'

export default function MoodDashboard({ activeTab = 'today' }) {
  if (activeTab === 'history') {
    return (
      <section className="mood-section" aria-labelledby="mood-history-title">
        <div className="mood-section__heading">
          <h2 id="mood-history-title">Mon historique</h2>
          <p>Retrouve les émotions que tu as enregistrées.</p>
        </div>

        <MoodHistory />
      </section>
    )
  }

  if (activeTab === 'statistics') {
    return (
      <section
        className="mood-section"
        aria-labelledby="mood-statistics-title"
      >
        <div className="mood-section__heading">
          <h2 id="mood-statistics-title">Mes statistiques</h2>
          <p>Observe les tendances de ton ressenti.</p>
        </div>

        <MoodStatistics />
      </section>
    )
  }

  return (
    <section className="mood-section" aria-labelledby="mood-today-title">
      <div className="mood-section__heading">
        <h2 id="mood-today-title">Comment te sens-tu aujourd'hui ?</h2>
        <p>
          Il n'y a pas de bonne ou de mauvaise émotion. Choisis simplement
          celle qui correspond le mieux à ton ressenti.
        </p>
      </div>

      <MoodSelector />
    </section>
  )
}

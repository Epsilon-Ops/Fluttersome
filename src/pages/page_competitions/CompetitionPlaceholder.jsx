
export default function CompetitionPlaceholder({ section }) {
    return (
      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">ANALYSE SPORTIVE</span>
            <h3>{section}</h3>
          </div>
        </div>
  
        <p className="welcome-description">
          Cette analyse sera activée lorsque les données
          nécessaires seront disponibles. Aucun résultat ni
          aucune projection ne sera inventé.
        </p>
      </section>
    )
  }
  
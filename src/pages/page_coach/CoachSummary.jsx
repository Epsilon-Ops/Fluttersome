export default function CoachSummary({
    summary = null,
    priorities = [],
  }) {
    return (
      <section className="coach-summary panel">
        <div className="panel-header">
          <div>
            <span className="eyebrow">SYNTHÈSE DU JOUR</span>
            <h2>Où en es-tu aujourd’hui ?</h2>
          </div>
        </div>
  
        <p>
          {summary ||
            "La synthèse sera disponible lorsque les données d’entraînement et de récupération seront analysables."}
        </p>
  
        <div className="coach-summary__priorities">
          <h3>Points à examiner</h3>
  
          {priorities.length > 0 ? (
            <ul>
              {priorities.map((priority, index) => (
                <li key={`${priority}-${index}`}>{priority}</li>
              ))}
            </ul>
          ) : (
            <p>
              Les priorités seront déterminées à partir des données
              disponibles. Aucune conclusion n’est formulée pour le moment.
            </p>
          )}
        </div>
      </section>
    )
  }
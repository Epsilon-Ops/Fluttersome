export default function SessionDecision({
    session = null,
    recommendation = null,
    rationale = null,
  }) {
    return (
      <section className="coach-session-decision panel">
        <div className="panel-header">
          <div>
            <span className="eyebrow">DÉCISION DU JOUR</span>
            <h2>Quelle séance privilégier ?</h2>
          </div>
        </div>
  
        {session ? (
          <div className="coach-session-decision__session">
            <h3>{session.title}</h3>
  
            {session.description && <p>{session.description}</p>}
  
            {session.distance && (
              <p>Distance : {session.distance}</p>
            )}
          </div>
        ) : (
          <p>
            Aucune séance planifiée n’est disponible pour le moment.
            Le Coach devra récupérer la séance depuis le module
            Entraînement.
          </p>
        )}
  
        {recommendation && (
          <div className="coach-session-decision__recommendation">
            <h3>Orientation proposée</h3>
            <p>{recommendation}</p>
          </div>
        )}
  
        {rationale && <p>{rationale}</p>}
  
        <p className="coach-session-decision__note">
          La décision sera fondée sur la séance prévue, les données
          disponibles et les signaux de récupération. Le score seul
          ne déterminera pas la décision.
        </p>
      </section>
    )
  }
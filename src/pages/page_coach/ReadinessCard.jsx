export default function ReadinessCard({
    score = null,
    status = "insufficient-data",
    reliability = null,
    explanation = null,
  }) {
    const hasValidScore =
      Number.isFinite(score) &&
      score >= 0 &&
      score <= 100 &&
      status === "available"
  
    return (
      <section className="coach-readiness panel">
        <div className="panel-header">
          <div>
            <span className="eyebrow">DISPONIBILITÉ DU JOUR</span>
            <h2>Readiness</h2>
          </div>
  
          <span className="status-pill">
            {hasValidScore ? "ANALYSÉ" : "NON CALCULABLE"}
          </span>
        </div>
  
        {hasValidScore ? (
          <div className="coach-readiness__result">
            <p className="coach-readiness__score">
              {score}
              <span>/100</span>
            </p>
  
            {reliability && (
              <p className="coach-readiness__reliability">
                Fiabilité : {reliability}
              </p>
            )}
          </div>
        ) : (
          <div className="coach-readiness__unavailable">
            <p>Score indisponible</p>
            <p>
              Les données essentielles doivent être vérifiées avant
              de calculer le readiness.
            </p>
          </div>
        )}
  
        {explanation && (
          <p className="coach-readiness__explanation">
            {explanation}
          </p>
        )}
      </section>
    )
  }
export default function ProgressionTrends({
    currentPeriod = null,
    previousPeriod = null,
    comparison = null,
  }) {
    const hasComparison =
      currentPeriod != null &&
      previousPeriod != null &&
      comparison != null
  
    return (
      <section className="coach-progression-trends panel">
        <div className="panel-header">
          <div>
            <span className="eyebrow">ÉVOLUTION</span>
            <h2>Ta progression</h2>
          </div>
        </div>
  
        {hasComparison ? (
          <>
            <div className="coach-progression-trends__periods">
              <article>
                <h3>Période actuelle</h3>
                <p>{currentPeriod.label}</p>
              </article>
  
              <article>
                <h3>Période précédente</h3>
                <p>{previousPeriod.label}</p>
              </article>
            </div>
  
            <p>{comparison.summary}</p>
  
            {comparison.limitations && (
              <p>{comparison.limitations}</p>
            )}
          </>
        ) : (
          <p>
            Les tendances seront présentées lorsqu’il existera
            suffisamment de données comparables entre deux périodes.
          </p>
        )}
      </section>
    )
  }
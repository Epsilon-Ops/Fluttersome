export default function CoachAlerts({
    alerts = [],
  }) {
    return (
      <section className="coach-alerts panel">
        <div className="panel-header">
          <div>
            <span className="eyebrow">SIGNAUX À SURVEILLER</span>
            <h2>Alertes du Coach</h2>
          </div>
  
          <span className="status-pill">
            {alerts.length} signal{alerts.length > 1 ? "x" : ""}
          </span>
        </div>
  
        {alerts.length > 0 ? (
          <div className="coach-alerts__list">
            {alerts.map((alert) => (
              <article
                className={`coach-alert coach-alert--${
                  alert.level || "info"
                }`}
                key={alert.id}
              >
                <h3>{alert.title}</h3>
                <p>{alert.message}</p>
  
                {alert.scoreImpact && (
                  <p>
                    <strong>Impact sur la synthèse :</strong>{" "}
                    {alert.scoreImpact}
                  </p>
                )}
  
                {alert.recommendation && (
                  <p>
                    <strong>Point de vigilance :</strong>{" "}
                    {alert.recommendation}
                  </p>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p>
            Les alertes seront évaluées à partir des données disponibles.
            L’absence d’alerte affichée ne signifie pas que tous les
            paramètres sont favorables.
          </p>
        )}
      </section>
    )
  }
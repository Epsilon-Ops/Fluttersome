const DIMENSIONS = [
    { key: "recovery", label: "Récupération" },
    { key: "fatigue", label: "Fatigue" },
    { key: "load", label: "Charge d’entraînement" },
    { key: "form", label: "Forme récente" },
    { key: "availability", label: "Disponibilité physique" },
  ]
  
  export default function ReadinessBreakdown({
    breakdown = {},
  }) {
    return (
      <section className="coach-readiness-breakdown panel">
        <div className="panel-header">
          <div>
            <span className="eyebrow">DÉTAIL DU SCORE</span>
            <h2>Facteurs du readiness</h2>
          </div>
        </div>
  
        <div className="coach-readiness-breakdown__list">
          {DIMENSIONS.map((dimension) => {
            const value = breakdown[dimension.key]
            const validValue =
              Number.isFinite(value) && value >= 0 && value <= 100
  
            return (
              <div
                className="coach-readiness-breakdown__item"
                key={dimension.key}
              >
                <div className="coach-readiness-breakdown__heading">
                  <span>{dimension.label}</span>
                  <strong>
                    {validValue ? `${value}/100` : "Non disponible"}
                  </strong>
                </div>
  
                {validValue && (
                  <div
                    className="coach-readiness-breakdown__track"
                    role="progressbar"
                    aria-label={dimension.label}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={value}
                  >
                    <div
                      className="coach-readiness-breakdown__fill"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
  
        <p className="coach-readiness-breakdown__note">
          Les dimensions et leurs pondérations devront être définies et
          validées avant d’interpréter le score global.
        </p>
      </section>
    )
  }
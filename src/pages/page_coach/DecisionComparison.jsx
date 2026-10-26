const OPTIONS = [
    {
      key: "maintain",
      title: "Maintenir",
      description: "Conserver la séance prévue.",
    },
    {
      key: "adapt",
      title: "Adapter",
      description: "Modifier certains paramètres de la séance.",
    },
    {
      key: "recover",
      title: "Récupérer",
      description: "Privilégier une option de récupération.",
    },
  ]
  
  export default function DecisionComparison({
    options = {},
    selectedOption = null,
  }) {
    return (
      <section className="coach-decision-comparison panel">
        <div className="panel-header">
          <div>
            <span className="eyebrow">COMPARAISON DES OPTIONS</span>
            <h2>Trois possibilités</h2>
          </div>
        </div>
  
        <div className="coach-decision-comparison__grid">
          {OPTIONS.map((option) => {
            const details = options[option.key]
  
            return (
              <article
                className={`coach-decision-option ${
                  selectedOption === option.key
                    ? "coach-decision-option--selected"
                    : ""
                }`}
                key={option.key}
              >
                <h3>{option.title}</h3>
                <p>{option.description}</p>
  
                {details ? (
                  <>
                    {details.session && (
                      <p>
                        <strong>Séance :</strong> {details.session}
                      </p>
                    )}
  
                    {details.benefit && (
                      <p>
                        <strong>Bénéfice :</strong> {details.benefit}
                      </p>
                    )}
  
                    {details.risk && (
                      <p>
                        <strong>Risque ou limite :</strong> {details.risk}
                      </p>
                    )}
  
                    {details.reasoning && (
                      <p>{details.reasoning}</p>
                    )}
                  </>
                ) : (
                  <p>
                    Cette option sera évaluée lorsque les données
                    nécessaires seront disponibles.
                  </p>
                )}
              </article>
            )
          })}
        </div>
      </section>
    )
  }
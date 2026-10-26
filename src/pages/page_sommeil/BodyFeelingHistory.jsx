
import {
    bodyParts,
    bodySides,
    bodySensationTypes,
  } from '../../utils/bodyFeelingHelpers'
  
  function getLabel(options, value) {
    return options.find((option) => option.value === value)?.label
      || value
      || 'Non renseigné'
  }
  
  function formatRecordedAt(value) {
    const date = new Date(value)
  
    if (Number.isNaN(date.getTime())) {
      return 'Date inconnue'
    }
  
    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date)
  }
  
  export default function BodyFeelingHistory({
    feelings = [],
    onDelete,
  }) {
    const sortedFeelings = [...feelings].sort(
      (a, b) => Date.parse(b.recordedAt) - Date.parse(a.recordedAt),
    )
  
    return (
      <section className="body-feeling-history">
        <div className="body-feeling-history-header">
          <div>
            <span className="eyebrow">JOURNAL CORPOREL</span>
            <h3>Historique des ressentis</h3>
            <p>
              Compare tes observations au fil des jours et des séances.
            </p>
          </div>
  
          <span className="body-feeling-count">
            {sortedFeelings.length}{' '}
            {sortedFeelings.length > 1
              ? 'observations'
              : 'observation'}
          </span>
        </div>
  
        {sortedFeelings.length === 0 ? (
          <div className="body-feeling-empty">
            <h4>Aucune observation pour le moment</h4>
            <p>
              Ajoute un ressenti pour commencer à suivre l’évolution
              de tes sensations corporelles.
            </p>
          </div>
        ) : (
          <div className="body-feeling-list">
            {sortedFeelings.map((feeling) => (
              <article
                className="body-feeling-entry"
                key={feeling.id}
              >
                <div className="body-feeling-entry-top">
                  <div>
                    <h4>
                      {getLabel(bodyParts, feeling.bodyPart)}
                    </h4>
                    <p className="body-feeling-entry-date">
                      {formatRecordedAt(feeling.recordedAt)}
                    </p>
                  </div>
  
                  <span className="body-feeling-intensity">
                    {Number.isFinite(feeling.intensity)
                      ? `${feeling.intensity}/10`
                      : '—/10'}
                  </span>
                </div>
  
                <div className="body-feeling-entry-details">
                  <span>
                    {getLabel(bodySides, feeling.side)}
                  </span>
                  <span>
                    {getLabel(
                      bodySensationTypes,
                      feeling.sensationType,
                    )}
                  </span>
                </div>
  
                {feeling.notes && (
                  <p className="body-feeling-entry-notes">
                    {feeling.notes}
                  </p>
                )}
  
                {feeling.sensationType === 'pain' &&
                  feeling.intensity >= 7 && (
                    <p className="body-feeling-caution" role="note">
                      Douleur signalée avec une intensité élevée.
                      Évite de forcer sur cette zone et parles-en à
                      un adulte de confiance ou à un professionnel
                      de santé, particulièrement si elle est inhabituelle
                      ou persiste.
                    </p>
                  )}
  
                {onDelete && (
                  <div className="body-feeling-entry-actions">
                    <button
                      type="button"
                      className="body-feeling-delete-button"
                      onClick={() => onDelete(feeling.id)}
                      aria-label={`Supprimer l’observation : ${getLabel(
                        bodyParts,
                        feeling.bodyPart,
                      )}, ${formatRecordedAt(feeling.recordedAt)}`}
                    >
                      Supprimer
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    )
  }
  
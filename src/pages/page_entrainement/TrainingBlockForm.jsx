
import {
    recordDistances,
    runningConditions,
  } from '../../utils/trainingHelpers'
  
  export default function TrainingBlockForm({
    block,
    index,
    blockCount,
    onUpdate,
    onDuplicate,
    onDelete,
  }) {
    function update(field, value) {
      onUpdate(block.id, field, value)
    }
  
    return (
      <div className="training-block-card training-field-full">
        <div className="training-block-heading">
          <h3>Bloc {index + 1}</h3>
  
          <div className="training-block-actions">
            <button
              type="button"
              className="training-secondary-button"
              onClick={() => onDuplicate(block.id)}
              title="Dupliquer ce bloc"
            >
              Dupliquer
            </button>
  
            <button
              type="button"
              className="training-text-button"
              onClick={() => onDelete(block.id)}
              disabled={blockCount === 1}
              title="Supprimer ce bloc"
            >
              Supprimer
            </button>
          </div>
        </div>
  
        <div className="training-form-grid">
          <div className="training-field training-field-full">
            <label htmlFor={`block-name-${block.id}`}>
              Nom du bloc
            </label>
  
            <input
              id={`block-name-${block.id}`}
              value={block.name}
              onChange={(event) => update('name', event.target.value)}
              placeholder="Ex. : Accélérations"
              maxLength={100}
            />
          </div>
  
          <div className="training-field training-field-full">
            <label htmlFor={`block-distances-${block.id}`}>
              Distances des répétitions (m)
            </label>
  
            <input
              id={`block-distances-${block.id}`}
              value={block.distances}
              onChange={(event) => update('distances', event.target.value)}
              placeholder="Ex. : 100, 150, 100, 200"
              required
            />
  
            <span className="training-field-help">
              Une valeur par répétition. Les séquences peuvent être
              différentes d'un bloc à l'autre.
            </span>
          </div>
  
          <div className="training-field">
            <label htmlFor={`block-condition-${block.id}`}>
              Condition de course
            </label>
  
            <select
              id={`block-condition-${block.id}`}
              value={block.condition}
              onChange={(event) => update('condition', event.target.value)}
            >
              {runningConditions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
          </div>
  
          <div className="training-field">
            <label htmlFor={`block-intensity-${block.id}`}>
              Intensité cible (%)
            </label>
  
            <input
              id={`block-intensity-${block.id}`}
              type="number"
              min="1"
              max="100"
              step="1"
              value={block.targetIntensity}
              onChange={(event) =>
                update('targetIntensity', event.target.value)
              }
              placeholder="Facultatif"
            />
          </div>
  
          {block.condition === 'Condition personnalisée' && (
            <div className="training-field training-field-full">
              <label htmlFor={`block-custom-${block.id}`}>
                Description de la condition
              </label>
  
              <input
                id={`block-custom-${block.id}`}
                value={block.customCondition}
                onChange={(event) =>
                  update('customCondition', event.target.value)
                }
                placeholder="Décris précisément la consigne"
                maxLength={200}
              />
            </div>
          )}
  
          <div className="training-field">
            <label htmlFor={`block-recovery-reps-${block.id}`}>
              Récupération entre répétitions
            </label>
  
            <input
              id={`block-recovery-reps-${block.id}`}
              value={block.recoveryBetweenReps}
              onChange={(event) =>
                update('recoveryBetweenReps', event.target.value)
              }
              placeholder="Ex. : 50 m marche, 1 min 30"
              maxLength={100}
            />
          </div>
  
          <div className="training-field">
            <label htmlFor={`block-recovery-after-${block.id}`}>
              Récupération après le bloc
            </label>
  
            <input
              id={`block-recovery-after-${block.id}`}
              value={block.recoveryAfterBlock}
              onChange={(event) =>
                update('recoveryAfterBlock', event.target.value)
              }
              placeholder="Ex. : 5 min"
              maxLength={100}
            />
          </div>
  
          <div className="training-field">
            <label htmlFor={`block-reference-${block.id}`}>
              Distance du record de référence
            </label>
  
            <select
              id={`block-reference-${block.id}`}
              value={block.referenceDistance}
              onChange={(event) =>
                update('referenceDistance', event.target.value)
              }
            >
              <option value="none">Aucune référence</option>
  
              {recordDistances
                .filter((distance) => distance !== 'none')
                .map((distance) => (
                  <option key={distance} value={distance}>
                    {distance} m
                  </option>
                ))}
            </select>
  
            <span className="training-field-help">
              La valeur du record sera reliée à tes records personnels
              dans une prochaine étape.
            </span>
          </div>
  
          <div className="training-field">
            <label htmlFor={`block-results-${block.id}`}>
              Chronos réalisés
            </label>
  
            <textarea
              id={`block-results-${block.id}`}
              rows={3}
              value={block.results}
              onChange={(event) => update('results', event.target.value)}
              placeholder={'Un chrono par répétition, par exemple :\n3.42, 3.39, 3.45'}
            />
          </div>
  
          <div className="training-field training-field-full">
            <label htmlFor={`block-notes-${block.id}`}>
              Notes du bloc
            </label>
  
            <textarea
              id={`block-notes-${block.id}`}
              rows={2}
              value={block.notes}
              onChange={(event) => update('notes', event.target.value)}
              placeholder="Consignes techniques, vent, surface, sensations…"
              maxLength={1000}
            />
          </div>
        </div>
      </div>
    )
  }
  

import { distances } from '../../utils/competitionHelpers'

export default function PerformanceForm({
  formOpen,
  setFormOpen,
  date,
  setDate,
  distance,
  setDistance,
  time,
  setTime,
  type,
  setType,
  timing,
  setTiming,
  venue,
  setVenue,
  notes,
  setNotes,
  conditions,
  setConditions,
  conditionDetails,
  setConditionDetails,
  windSpeed,
  setWindSpeed,
  windDirection,
  setWindDirection,
  feeling,
  setFeeling,
  feelingNote,
  setFeelingNote,
  error,
  onSubmit,
}) {
  function handleTypeChange(nextType) {
    setType(nextType)
    setTiming(
      nextType === 'competition' ? 'electronic' : 'manual',
    )
  }

  return (
    <section className="panel competition-form-panel">
      <button
        type="button"
        className="competition-form-toggle"
        aria-expanded={formOpen}
        onClick={() => setFormOpen((open) => !open)}
      >
        <span>
          <span className="eyebrow">NOUVELLE ENTRÉE</span>

          <strong>Enregistrer un chrono</strong>

          <span className="competition-toggle-hint">
            {formOpen
              ? 'Masquer le formulaire'
              : 'Ajouter une performance et ses conditions'}
          </span>
        </span>

        <span
          className="competition-toggle-icon"
          aria-hidden="true"
        >
          {formOpen ? '−' : '+'}
        </span>
      </button>

      {formOpen && (
        <form onSubmit={onSubmit}>
          <div className="competition-form-grid">
            <div className="competition-field">
              <label htmlFor="performance-date">Date</label>

              <input
                id="performance-date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </div>

            <div className="competition-field">
              <label htmlFor="performance-distance">
                Distance
              </label>

              <select
                id="performance-distance"
                value={distance}
                onChange={(event) => setDistance(event.target.value)}
                required
              >
                {distances.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="competition-field">
              <label htmlFor="performance-time">
                Chrono (secondes)
              </label>

              <input
                id="performance-time"
                type="number"
                inputMode="decimal"
                min="0.01"
                max="999"
                step="0.01"
                placeholder="Ex. : 10.72"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                required
              />
            </div>

            <div className="competition-field">
              <label htmlFor="performance-type">Type</label>

              <select
                id="performance-type"
                value={type}
                onChange={(event) =>
                  handleTypeChange(event.target.value)
                }
              >
                <option value="competition">Compétition</option>
                <option value="training">Entraînement</option>
              </select>
            </div>

            <div className="competition-field">
              <label htmlFor="performance-timing">
                Chronométrage
              </label>

              <select
                id="performance-timing"
                value={timing}
                onChange={(event) => setTiming(event.target.value)}
              >
                <option value="electronic">Électronique</option>
                <option value="manual">Manuel</option>
              </select>
            </div>

            <div className="competition-field">
              <label htmlFor="performance-venue">
                Lieu (facultatif)
              </label>

              <input
                id="performance-venue"
                type="text"
                maxLength={100}
                placeholder="Stade, compétition…"
                value={venue}
                onChange={(event) => setVenue(event.target.value)}
              />
            </div>

            <div className="competition-field field-full">
              <label htmlFor="performance-notes">
                Notes (facultatif)
              </label>

              <textarea
                id="performance-notes"
                rows={2}
                maxLength={500}
                placeholder="Conditions, ressenti, vent…"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </div>
          </div>

          <div className="competition-field">
            <label htmlFor="performance-conditions">
              Conditions
            </label>

            <select
              id="performance-conditions"
              value={conditions}
              onChange={(event) =>
                setConditions(event.target.value)
              }
            >
              <option value="outdoor">Piste extérieure</option>
              <option value="indoor">Piste couverte</option>
              <option value="wet">Piste humide</option>
              <option value="windy">Conditions venteuses</option>
              <option value="other">Autres conditions</option>
            </select>
          </div>

          <div className="competition-field">
            <label htmlFor="performance-condition-details">
              Précisions (facultatif)
            </label>

            <input
              id="performance-condition-details"
              type="text"
              maxLength={150}
              placeholder="Température, piste, météo…"
              value={conditionDetails}
              onChange={(event) =>
                setConditionDetails(event.target.value)
              }
            />
          </div>

          <div className="competition-field">
            <label htmlFor="performance-wind">
              Vent (m/s)
            </label>

            <input
              id="performance-wind"
              type="number"
              inputMode="decimal"
              min="-20"
              max="20"
              step="0.1"
              placeholder="Ex. : +1.2 ou -0.5"
              value={windSpeed}
              onChange={(event) =>
                setWindSpeed(event.target.value)
              }
            />

            <span className="competition-hint">
              Valeur positive : vent arrière. Négative : vent de face.
            </span>
          </div>

          <div className="competition-field">
            <label htmlFor="performance-wind-direction">
              Direction du vent (facultatif)
            </label>

            <select
              id="performance-wind-direction"
              value={windDirection}
              onChange={(event) =>
                setWindDirection(event.target.value)
              }
            >
              <option value="">Non renseignée</option>
              <option value="tailwind">Arrière</option>
              <option value="headwind">Face</option>
              <option value="crosswind">Latéral</option>
              <option value="variable">Variable</option>
            </select>
          </div>

          <div className="competition-field">
            <label htmlFor="performance-feeling">
              Ressenti : {feeling}/10
            </label>

            <input
              id="performance-feeling"
              type="range"
              min="1"
              max="10"
              step="1"
              value={feeling}
              onChange={(event) => setFeeling(event.target.value)}
            />

            <span className="competition-hint">
              1 = très difficile · 10 = excellent
            </span>
          </div>

          <div className="competition-field field-wide">
            <label htmlFor="performance-feeling-note">
              Commentaire sur le ressenti (facultatif)
            </label>

            <input
              id="performance-feeling-note"
              type="text"
              maxLength={250}
              placeholder="Départ, relâchement, fatigue, sensations…"
              value={feelingNote}
              onChange={(event) =>
                setFeelingNote(event.target.value)
              }
            />
          </div>

          <p className="competition-hint">
            Par défaut : électronique en compétition, manuel à
            l’entraînement. Les records officiels excluent les
            chronos manuels.
          </p>

          {error && (
            <div className="competition-error" role="alert">
              {error}
            </div>
          )}

          <div className="competition-form-actions">
            <button
              className="competition-primary-button"
              type="submit"
            >
              Enregistrer la performance
            </button>
          </div>
        </form>
      )}
    </section>
  )
}

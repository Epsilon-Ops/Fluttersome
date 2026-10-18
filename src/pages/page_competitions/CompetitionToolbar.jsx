
import { distances } from '../../utils/competitionHelpers'

export default function CompetitionToolbar({
  selectedDistance,
  onDistanceChange,
  currentYear,
}) {
  return (
    <div className="competition-toolbar">
      <div
        className="competition-field"
        style={{ width: '160px' }}
      >
        <label htmlFor="performance-distance-filter">
          Distance analysée
        </label>

        <select
          id="performance-distance-filter"
          value={selectedDistance}
          onChange={(event) =>
            onDistanceChange(event.target.value)
          }
        >
          {distances.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <p className="competition-hint">
        Saison actuelle : {currentYear}. Les statistiques
        se calculent à partir de tes saisies.
      </p>
    </div>
  )
}

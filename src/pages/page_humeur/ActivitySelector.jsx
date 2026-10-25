import { ACTIVITES } from '../../constants/activites'

export default function ActivitySelector({
  selectedActivities = [],
  onChange,
}) {
  function toggleActivity(activityId) {
    const isSelected = selectedActivities.includes(activityId)

    const nextActivities = isSelected
      ? selectedActivities.filter((id) => id !== activityId)
      : [...selectedActivities, activityId]

    onChange?.(nextActivities)
  }

  return (
    <fieldset className="activity-selector">
      <legend className="activity-selector__title">
        Qu’est-ce qui a marqué ta journée ?
      </legend>

      <p className="activity-selector__description">
        Choisis une ou plusieurs activités, si tu le souhaites.
      </p>

      <div className="activity-selector__list">
        {ACTIVITES.map((activity) => {
          const isSelected = selectedActivities.includes(activity.id)

          return (
            <button
              key={activity.id}
              type="button"
              className={`activity-selector__option ${
                isSelected ? 'is-selected' : ''
              }`}
              aria-pressed={isSelected}
              onClick={() => toggleActivity(activity.id)}
            >
              <span className="activity-selector__option-label">
                {activity.label}
              </span>

              <span
                className="activity-selector__check"
                aria-hidden="true"
              >
                {isSelected ? '✓' : '+'}
              </span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
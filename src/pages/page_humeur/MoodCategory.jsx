
export default function MoodCategory({
    category,
    moods = [],
    selectedMoodId,
    onSelect,
  }) {
    return (
      <section
        className="mood-category"
        style={{ '--mood-category-color': category.color }}
        aria-labelledby={`mood-category-${category.id}`}
      >
        <h4
          id={`mood-category-${category.id}`}
          className="mood-category__title"
        >
          <span
            className="mood-category__dot"
            aria-hidden="true"
          />
          {category.label}
        </h4>
  
        <div className="mood-category__list">
          {moods.map((mood) => {
            const isSelected = mood.id === selectedMoodId
  
            return (
              <button
                key={mood.id}
                type="button"
                className={`mood-option ${
                  isSelected ? 'is-selected' : ''
                }`}
                onClick={() => onSelect?.(mood)}
                aria-pressed={isSelected}
                style={{ '--mood-option-color': category.color }}
              >
                <span className="mood-option__label">
                  {mood.label}
                </span>
  
                <span className="mood-option__score">
                  {mood.valence > 0 ? '+' : ''}
                  {mood.valence}
                </span>
              </button>
            )
          })}
        </div>
      </section>
    )
  }
  
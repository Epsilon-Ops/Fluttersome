
import { useState } from 'react'
import {
  moods,
  MOOD_CATEGORIES,
} from '../../constants/moods'
import MoodCategory from './MoodCategory'

export default function MoodSelector({ onSelect, selectedMoodId = null }) {
  const [internalSelectedId, setInternalSelectedId] =
    useState(selectedMoodId)

  const activeMoodId = selectedMoodId ?? internalSelectedId

  function handleSelect(mood) {
    setInternalSelectedId(mood.id)

    if (typeof onSelect === 'function') {
      onSelect(mood)
    }
  }

  return (
    <div className="mood-selector">
      <div className="mood-selector__intro">
        <h3 className="mood-selector__title">Choisis ton émotion</h3>
        <p className="mood-selector__description">
          Sélectionne celle qui correspond le mieux à ton ressenti.
        </p>
      </div>

      <div className="mood-selector__categories">
        {MOOD_CATEGORIES.map((category) => {
          const categoryMoods = moods.filter(
            (mood) => mood.category === category.id,
          )

          return (
            <MoodCategory
              key={category.id}
              category={category}
              moods={categoryMoods}
              selectedMoodId={activeMoodId}
              onSelect={handleSelect}
            />
          )
        })}
      </div>
    </div>
  )
}

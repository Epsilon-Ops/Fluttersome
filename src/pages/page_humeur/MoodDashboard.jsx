
import { useState } from 'react'
import useMood from '../../hooks/useMood'
import MoodSelector from './MoodSelector'
import MoodEntryForm from './MoodEntryForm'
import MoodHistory from './MoodHistory'
import MoodStatistics from './MoodStatistics'
import MoodEmptyState from './MoodEmptyState'
import MoodHistoryItem from './MoodHistoryItem'
import { getLocalDateString } from '../../utils/moodHelpers'

export default function MoodDashboard({ activeTab = 'today' }) {
  const {
    entries,
    addMoodEntry,
    deleteMoodEntry,
    storageError,
  } = useMood()

  const [isAdding, setIsAdding] = useState(false)
  const [selectedMood, setSelectedMood] = useState(null)
  const [saveError, setSaveError] = useState('')

  const today = getLocalDateString()
  const todayEntries = entries.filter((entry) => entry.date === today)

  function handleMoodSelect(mood) {
    setSelectedMood(mood)
    setSaveError('')
  }

  function handleSave(data) {
    if (!selectedMood) {
      setSaveError('Choisis une émotion avant de continuer.')
      return false
    }

    const result = addMoodEntry({
      ...data,
      moodId: selectedMood.id,
    })

    if (!result.success) {
      setSaveError(result.error)
      return false
    }

    setSelectedMood(null)
    setIsAdding(false)
    setSaveError('')
    return true
  }

  function handleCancel() {
    setSelectedMood(null)
    setIsAdding(false)
    setSaveError('')
  }

  if (activeTab === 'history') {
    return (
      <section className="mood-section" aria-labelledby="mood-history-title">
        <div className="mood-section__heading">
          <h2 id="mood-history-title">Mon historique</h2>
          <p>Retrouve les émotions que tu as enregistrées.</p>
        </div>

        <MoodHistory
          entries={entries}
          onDelete={deleteMoodEntry}
        />
      </section>
    )
  }

  if (activeTab === 'statistics') {
    return (
      <section className="mood-section" aria-labelledby="mood-statistics-title">
        <div className="mood-section__heading">
          <h2 id="mood-statistics-title">Mes statistiques</h2>
          <p>Observe les tendances de ton ressenti.</p>
        </div>

        <MoodStatistics entries={entries} />
      </section>
    )
  }

  return (
    <section className="mood-section" aria-labelledby="mood-today-title">
      <div className="mood-section__heading">
        <h2 id="mood-today-title">Comment te sens-tu aujourd'hui ?</h2>
        <p>
          Il n'y a pas de bonne ou de mauvaise émotion. Tu peux en
          enregistrer plusieurs au cours d'une même journée.
        </p>
      </div>

      {storageError && (
        <p className="mood-feedback mood-feedback--error" role="alert">
          {storageError}
        </p>
      )}

      {!isAdding ? (
        <button
          type="button"
          className="mood-add-button"
          onClick={() => setIsAdding(true)}
        >
          <span aria-hidden="true">＋</span>
          Ajouter une émotion
        </button>
      ) : (
        <div className="mood-add-flow">
          <MoodSelector
            selectedMoodId={selectedMood?.id ?? null}
            onSelect={handleMoodSelect}
          />

          {selectedMood && (
            <MoodEntryForm
              key={selectedMood.id}
              mood={selectedMood}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}

          {saveError && (
            <p className="mood-feedback mood-feedback--error" role="alert">
              {saveError}
            </p>
          )}

          <button
            type="button"
            className="mood-secondary-button"
            onClick={handleCancel}
          >
            Annuler
          </button>
        </div>
      )}

      <section className="mood-today-entries" aria-labelledby="mood-today-entries-title">
        <div className="mood-section__heading">
          <h3 id="mood-today-entries-title">Mes émotions du jour</h3>
          <p>
            {todayEntries.length === 0
              ? 'Tes émotions enregistrées apparaîtront ici.'
              : `${todayEntries.length} entrée${todayEntries.length > 1 ? 's' : ''} enregistrée${todayEntries.length > 1 ? 's' : ''} aujourd'hui.`}
          </p>
        </div>

        {todayEntries.length === 0 ? (
          <MoodEmptyState
            title="Aucune émotion enregistrée aujourd'hui"
            description="Utilise le bouton « Ajouter une émotion » lorsque tu souhaites noter ton ressenti."
          />
        ) : (
          <div className="mood-history__list">
            {todayEntries.map((entry) => (
              <MoodHistoryItem
                key={entry.id}
                entry={entry}
                onDelete={deleteMoodEntry}
              />
            ))}
          </div>
        )}
      </section>
    </section>
  )
}

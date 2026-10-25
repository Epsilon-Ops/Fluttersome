
import { useState } from 'react'
import '../../styles/main_pages/page_sommeil/index.css'

import SleepHeader from './SleepHeader'
import SleepTabs from './SleepTabs'
import SleepOverview from './SleepOverview'
import SleepHistory from './SleepHistory'
import SleepStatistics from './SleepStatistics'
import SleepReadinessPlaceholder from './SleepReadinessPlaceholder'
import SleepForm from './SleepForm'

import useSleep from '../../hooks/useSleep'

export default function Sleep() {
  const {
    nights,
    addNight,
    updateNight,
    deleteNight,
    storageError,
    sleepTargetMinutes,
    updateSleepTarget,
  } = useSleep()

  const [activeSection, setActiveSection] =
    useState('Vue d’ensemble')
  const [formOpen, setFormOpen] = useState(false)
  const [editingNight, setEditingNight] = useState(null)
  const [error, setError] = useState('')

  function handleSave(nightData) {
    setError('')

    if (
      !nightData.date ||
      !nightData.bedtime ||
      !nightData.fallAsleep ||
      !nightData.wakeTime
    ) {
      setError('Renseigne la date et les trois horaires de sommeil.')
      return
    }

    if (
      !Number.isFinite(Number(nightData.quality)) ||
      Number(nightData.quality) < 1 ||
      Number(nightData.quality) > 10
    ) {
      setError('La qualité du sommeil doit être comprise entre 1 et 10.')
      return
    }

    const result = editingNight
      ? updateNight(editingNight.id, nightData)
      : addNight(nightData)

    if (result === false) {
      setError('Impossible d’enregistrer cette nuit.')
      return
    }

    setEditingNight(null)
    setFormOpen(false)
    setActiveSection('Vue d’ensemble')
  }

  function handleEdit(night) {
    setEditingNight(night)
    setFormOpen(true)
    setError('')
  }

  function handleNewNight() {
    if (formOpen) {
      setFormOpen(false)
      setEditingNight(null)
      setError('')
      return
    }

    setEditingNight(null)
    setError('')
    setFormOpen(true)
  }

  function handleSectionChange(section) {
    setActiveSection(section)
    setError('')
    setFormOpen(false)
    setEditingNight(null)
  }

  return (
    <div className="dashboard sleep-page">
      <SleepHeader />

      <section className="section-heading">
        <div>
          <span className="eyebrow">SUIVI DU SOMMEIL</span>
          <h2>{activeSection}</h2>
        </div>

        <span className="section-tag">
          <span className="section-tag-dot" />
          MODE LOCAL
        </span>
      </section>

      <SleepTabs
        activeSection={activeSection}
        onChange={handleSectionChange}
      />

      {(error || storageError) && (
        <div className="sleep-error" role="alert">
          {error || storageError}
        </div>
      )}

      {(activeSection === 'Vue d’ensemble' ||
        activeSection === 'Historique') && (
        <>
          <div className="sleep-primary-action">
            <button
              type="button"
              className="sleep-primary-button"
              onClick={handleNewNight}
            >
              {formOpen
                ? 'Fermer le formulaire'
                : '＋ Enregistrer une nuit'}
            </button>
          </div>

          {formOpen && (
            <SleepForm
              initialNight={editingNight}
              onSubmit={handleSave}
              onCancel={() => {
                setFormOpen(false)
                setEditingNight(null)
                setError('')
              }}
            />
          )}
        </>
      )}

      {activeSection === 'Vue d’ensemble' && (
        <>
          <SleepOverview
            nights={nights}
            sleepTargetMinutes={sleepTargetMinutes}
            onSleepTargetChange={updateSleepTarget}
          />
          <SleepReadinessPlaceholder />
        </>
      )}

      {activeSection === 'Historique' && (
        <SleepHistory
          nights={nights}
          onEdit={handleEdit}
          onDelete={deleteNight}
        />
      )}

      {activeSection === 'Statistiques' && (
        <SleepStatistics nights={nights} />
      )}
    </div>
  )
}

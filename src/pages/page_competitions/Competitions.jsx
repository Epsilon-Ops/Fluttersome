
import { useMemo, useState } from 'react'
import '../../styles/Competitions.css'

import CompetitionHeader from './CompetitionHeader'
import CompetitionTabs from './CompetitionTabs'
import CompetitionToolbar from './CompetitionToolbar'
import PerformanceForm from './PerformanceForm'
import PerformanceOverview from './PerformanceOverview'
import PerformanceHistory from './PerformanceHistory'
import EvolutionChart from './EvolutionChart'
import CompetitionPlaceholder from './CompetitionPlaceholder'
import CompetitionStorageNote from './CompetitionStorageNote'

import usePerformances from '../../hooks/usePerformances'

import {
  getToday,
  getBestTime,
  getOfficialPerformances,
  sortPerformancesNewestFirst,
} from '../../utils/competitionHelpers'

export default function Competitions() {
  const {
    performances,
    addPerformance,
    deletePerformance,
    storageError,
  } = usePerformances()

  const [activeSection, setActiveSection] =
    useState('Vue d’ensemble')

  const [selectedDistance, setSelectedDistance] = useState('100')
  const [historyTypeFilter, setHistoryTypeFilter] = useState('all')
  const [error, setError] = useState('')

  const [date, setDate] = useState(getToday)
  const [distance, setDistance] = useState('100')
  const [time, setTime] = useState('')
  const [type, setType] = useState('competition')
  const [timing, setTiming] = useState('electronic')
  const [venue, setVenue] = useState('')
  const [notes, setNotes] = useState('')
  const [formOpen, setFormOpen] = useState(false)

  const [conditions, setConditions] = useState('outdoor')
  const [conditionDetails, setConditionDetails] = useState('')
  const [windSpeed, setWindSpeed] = useState('')
  const [windDirection, setWindDirection] = useState('')
  const [feeling, setFeeling] = useState('5')
  const [feelingNote, setFeelingNote] = useState('')

  const currentYear = String(new Date().getFullYear())

  const distancePerformances = useMemo(
    () =>
      sortPerformancesNewestFirst(
        performances.filter(
          (item) => item.distance === selectedDistance,
        ),
      ),
    [performances, selectedDistance],
  )

  // Les records officiels utilisent uniquement les compétitions
  // chronométrées électroniquement.
  const officialPerformances = useMemo(
    () => getOfficialPerformances(distancePerformances),
    [distancePerformances],
  )

  const personalRecord = getBestTime(officialPerformances)

  const seasonPerformances = officialPerformances.filter(
    (item) => item.date.slice(0, 4) === currentYear,
  )

  const seasonBest = getBestTime(seasonPerformances)

  const trainingPerformances = distancePerformances.filter(
    (item) =>
      item.type === 'training' &&
      item.timing === 'manual',
  )

  const bestTraining = getBestTime(trainingPerformances)

  const latestPerformance = distancePerformances[0] ?? null

  // Le graphique présente les performances de la plus ancienne
  // à la plus récente.
  const chartPerformances = useMemo(
    () =>
      officialPerformances.slice().sort((a, b) => {
        if (a.date !== b.date) {
          return a.date.localeCompare(b.date)
        }

        return (a.createdAt ?? 0) - (b.createdAt ?? 0)
      }),
    [officialPerformances],
  )

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const numericTime = Number(time)
    const numericWind =
      windSpeed === '' ? null : Number(windSpeed)

    if (
      !date ||
      !Number.isFinite(numericTime) ||
      numericTime <= 0 ||
      numericTime > 999
    ) {
      setError(
        'Saisis une date et un chrono valide, compris entre 0,01 et 999 secondes.',
      )
      return
    }

    if (
      type === 'competition' &&
      timing !== 'electronic'
    ) {
      setError(
        'Pour une compétition, utilise le chronométrage électronique. Si le temps est manuel, enregistre-le comme entraînement.',
      )
      return
    }

    if (type === 'training' && timing !== 'manual') {
      setError(
        'Pour cette première version, les entraînements sont enregistrés en chronométrage manuel.',
      )
      return
    }

    if (
      windSpeed !== '' &&
      (!Number.isFinite(numericWind) ||
        numericWind < -20 ||
        numericWind > 20)
    ) {
      setError(
        'La vitesse du vent doit être comprise entre -20 et 20 m/s.',
      )
      return
    }

    addPerformance({
      date,
      distance,
      time: numericTime,
      type,
      timing,
      venue: venue.trim(),
      notes: notes.trim(),
      conditions,
      conditionDetails: conditionDetails.trim(),
      windSpeed: numericWind,
      windDirection,
      feeling: Number(feeling),
      feelingNote: feelingNote.trim(),
    })

    setSelectedDistance(distance)
    setHistoryTypeFilter('all')
    setTime('')
    setVenue('')
    setNotes('')
    setActiveSection('Historique')
    setConditions('outdoor')
    setConditionDetails('')
    setWindSpeed('')
    setWindDirection('')
    setFeeling('5')
    setFeelingNote('')
    setFormOpen(false)
    setError('')
  }

  const showForm =
    activeSection === 'Vue d’ensemble' ||
    activeSection === 'Historique'

  return (
    <div className="dashboard competitions-page">
      <CompetitionHeader />

      <section className="section-heading">
        <div>
          <span className="eyebrow">CENTRE DE PERFORMANCE</span>
          <h2>{activeSection}</h2>
        </div>

        <span className="section-tag">
          <span className="section-tag-dot" />
          MODE LOCAL
        </span>
      </section>

      <CompetitionTabs
        activeSection={activeSection}
        onChange={setActiveSection}
      />

      <CompetitionToolbar
        selectedDistance={selectedDistance}
        onDistanceChange={setSelectedDistance}
        currentYear={currentYear}
      />

      {(error || storageError) && (
        <div className="competition-error" role="alert">
          {error || storageError}
        </div>
      )}

      {showForm && (
        <PerformanceForm
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          date={date}
          setDate={setDate}
          distance={distance}
          setDistance={setDistance}
          time={time}
          setTime={setTime}
          type={type}
          setType={setType}
          timing={timing}
          setTiming={setTiming}
          venue={venue}
          setVenue={setVenue}
          notes={notes}
          setNotes={setNotes}
          conditions={conditions}
          setConditions={setConditions}
          conditionDetails={conditionDetails}
          setConditionDetails={setConditionDetails}
          windSpeed={windSpeed}
          setWindSpeed={setWindSpeed}
          windDirection={windDirection}
          setWindDirection={setWindDirection}
          feeling={feeling}
          setFeeling={setFeeling}
          feelingNote={feelingNote}
          setFeelingNote={setFeelingNote}
          error={error}
          onSubmit={handleSubmit}
        />
      )}

      {activeSection === 'Vue d’ensemble' && (
        <PerformanceOverview
          personalRecord={personalRecord}
          seasonBest={seasonBest}
          bestTraining={bestTraining}
          distance={selectedDistance}
          currentYear={currentYear}
          distancePerformances={distancePerformances}
          latestPerformance={latestPerformance}
        />
      )}

      {activeSection === 'Historique' && (
        <PerformanceHistory
          performances={distancePerformances}
          historyTypeFilter={historyTypeFilter}
          onFilterChange={setHistoryTypeFilter}
          onDelete={deletePerformance}
        />
      )}

      {activeSection === 'Évolution' && (
        <section className="panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">ANALYSE SPORTIVE</span>
              <h3>Évolution</h3>
            </div>
          </div>

          <p className="welcome-description">
            Suis l’évolution de tes chronos officiels sur
            la distance sélectionnée.
          </p>

          <EvolutionChart
            performances={chartPerformances}
            distance={selectedDistance}
          />
        </section>
      )}

      {['Forme', 'Régularité', 'Objectifs'].includes(
        activeSection,
      ) && (
        <CompetitionPlaceholder section={activeSection} />
      )}

      <CompetitionStorageNote />
    </div>
  )
}


import { useEffect, useMemo, useState } from 'react'
import '../styles/Competitions.css'

const STORAGE_KEY = 'epsilon.performances.v1'

const sections = [
  'Vue d’ensemble',
  'Évolution',
  'Forme',
  'Régularité',
  'Objectifs',
  'Historique',
]

const distances = [
  { value: '60', label: '60 m' },
  { value: '100', label: '100 m' },
  { value: '200', label: '200 m' },
  { value: '400', label: '400 m' },
]

function getToday() {
  const now = new Date()
  const localDate = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000,
  )
  return localDate.toISOString().slice(0, 10)
}

function loadPerformances() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return []

    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (item) =>
        item &&
        typeof item.id === 'string' &&
        typeof item.distance === 'string' &&
        Number.isFinite(item.time) &&
        typeof item.date === 'string',
    )
  } catch {
    return []
  }
}

function formatTime(time) {
  return `${time.toFixed(2)} s`
}

function formatDate(date) {
  if (!date) return 'Date inconnue'

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`))
}

function getDistanceLabel(distance) {
  return distances.find((item) => item.value === distance)?.label
    ?? `${distance} m`
}

export default function Competitions() {
  const [activeSection, setActiveSection] = useState('Vue d’ensemble')
  const [performances, setPerformances] = useState(loadPerformances)
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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(performances))
    } catch {
      setError(
        'Le navigateur ne permet pas de sauvegarder les données. Vérifie son espace de stockage.',
      )
    }
  }, [performances])

  const currentYear = String(new Date().getFullYear())

  const distancePerformances = useMemo(
    () =>
      performances
        .filter((item) => item.distance === selectedDistance)
        .sort((a, b) => {
          if (a.date !== b.date) return b.date.localeCompare(a.date)
          return (b.createdAt ?? 0) - (a.createdAt ?? 0)
        }),
    [performances, selectedDistance],
  )

  // Les RP et SB officiels utilisent uniquement les chronos
  // électroniques réalisés en compétition.
  const officialPerformances = distancePerformances.filter(
    (item) =>
      item.type === 'competition' &&
      item.timing === 'electronic',
  )

  const personalRecord = officialPerformances.length
    ? Math.min(...officialPerformances.map((item) => item.time))
    : null

  const seasonBestRecords = officialPerformances.filter(
    (item) => item.date.slice(0, 4) === currentYear,
  )

  const seasonBest = seasonBestRecords.length
    ? Math.min(...seasonBestRecords.map((item) => item.time))
    : null

  const trainingPerformances = distancePerformances.filter(
    (item) =>
      item.type === 'training' &&
      item.timing === 'manual',
  )

  const bestTraining = trainingPerformances.length
    ? Math.min(...trainingPerformances.map((item) => item.time))
    : null

  const latestPerformance = distancePerformances[0] ?? null

  const filteredHistory = distancePerformances.filter((item) => {
    if (historyTypeFilter === 'all') return true
    return item.type === historyTypeFilter
  })

  function handleTypeChange(nextType) {
    setType(nextType)
    setTiming(
      nextType === 'competition' ? 'electronic' : 'manual',
    )
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const numericTime = Number(time)

    if (!date || !Number.isFinite(numericTime) || numericTime <= 0) {
      setError('Saisis une date et un chrono valide, supérieur à zéro.')
      return
    }

    if (type === 'competition' && timing !== 'electronic') {
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

    const newPerformance = {
      id:
        typeof crypto !== 'undefined' &&
        typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      date,
      distance,
      time: numericTime,
      type,
      timing,
      venue: venue.trim(),
      notes: notes.trim(),
      createdAt: Date.now(),
      conditions,
      conditionDetails: conditionDetails.trim(),
      windSpeed: windSpeed === '' ? null : Number(windSpeed),
      windDirection,
      feeling: Number(feeling),
      feelingNote: feelingNote.trim(),
    }

    setPerformances((previous) => [...previous, newPerformance])
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
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      'Supprimer définitivement cette performance de ce navigateur ?',
    )

    if (!confirmed) return

    setPerformances((previous) =>
      previous.filter((item) => item.id !== id),
    )
  }

  return (
    <div className="dashboard competitions-page">
      <section className="welcome-section">
        <div>
          <div className="eyebrow welcome-eyebrow">
            SUIVI SPORTIF
          </div>
          <h1>
            Tes <span>compétitions.</span>
          </h1>
          <p className="welcome-description">
            Tes chronos, tes records et ta progression, réunis dans un seul espace.
          </p>
        </div>
      </section>

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

      <nav
        className="competition-tabs"
        aria-label="Sections des compétitions"
      >
        {sections.map((section) => (
          <button
            key={section}
            type="button"
            className={`competition-tab ${
              activeSection === section ? 'is-active' : ''
            }`}
            aria-pressed={activeSection === section}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </button>
        ))}
      </nav>

      <div className="competition-toolbar">
        <div className="competition-field" style={{ width: '160px' }}>
          <label htmlFor="performance-distance-filter">
            Distance analysée
          </label>
          <select
            id="performance-distance-filter"
            value={selectedDistance}
            onChange={(event) => setSelectedDistance(event.target.value)}
          >
            {distances.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <p className="competition-hint">
          Saison actuelle : {currentYear}. Les statistiques se calculent à partir de tes saisies.
        </p>
      </div>

      {error && (
        <div className="competition-error" role="alert">
          {error}
        </div>
      )}

      {(activeSection === 'Vue d’ensemble' ||
        activeSection === 'Historique') && (
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

            <span className="competition-toggle-icon" aria-hidden="true">
              {formOpen ? '−' : '+'}
            </span>
          </button>

          {formOpen && (
          <form onSubmit={handleSubmit}>
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
                <label htmlFor="performance-distance">Distance</label>
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
                <label htmlFor="performance-time">Chrono (secondes)</label>
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
                  onChange={(event) => handleTypeChange(event.target.value)}
                >
                  <option value="competition">Compétition</option>
                  <option value="training">Entraînement</option>
                </select>
              </div>

              <div className="competition-field">
                <label htmlFor="performance-timing">Chronométrage</label>
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
                <label htmlFor="performance-venue">Lieu (facultatif)</label>
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
                <label htmlFor="performance-notes">Notes (facultatif)</label>
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
              <label htmlFor="performance-conditions">Conditions</label>
              <select
                id="performance-conditions"
                value={conditions}
                onChange={(event) => setConditions(event.target.value)}
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
                onChange={(event) => setConditionDetails(event.target.value)}
              />
            </div>

            <div className="competition-field">
              <label htmlFor="performance-wind">Vent (m/s)</label>
              <input
                id="performance-wind"
                type="number"
                inputMode="decimal"
                min="-20"
                max="20"
                step="0.1"
                placeholder="Ex. : +1.2 ou -0.5"
                value={windSpeed}
                onChange={(event) => setWindSpeed(event.target.value)}
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
                onChange={(event) => setWindDirection(event.target.value)}
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
                onChange={(event) => setFeelingNote(event.target.value)}
              />
            </div>

            <p className="competition-hint">
              Par défaut : électronique en compétition, manuel à l’entraînement.
              Pour cette version, les records officiels excluent les chronos manuels.
            </p>

            <div className="competition-form-actions">
              <button className="competition-primary-button" type="submit">
                Enregistrer la performance
              </button>
            </div>
          </form>
          )}
        </section>
      )}

      {activeSection === 'Vue d’ensemble' && (
        <>
          <section className="metrics-grid">
            <MetricCard
              label="RECORD PERSONNEL"
              value={personalRecord === null ? '—' : formatTime(personalRecord)}
              note={
                personalRecord === null
                  ? 'Aucun chrono électronique en compétition'
                  : `${getDistanceLabel(selectedDistance)} · compétition électronique`
              }
            />
            <MetricCard
              label="MEILLEUR DE LA SAISON"
              value={seasonBest === null ? '—' : formatTime(seasonBest)}
              note={
                seasonBest === null
                  ? `Aucun résultat officiel en ${currentYear}`
                  : `Saison ${currentYear}`
              }
            />
            <MetricCard
              label="MEILLEUR À L’ENTRAÎNEMENT"
              value={bestTraining === null ? '—' : formatTime(bestTraining)}
              note={
                bestTraining === null
                  ? 'Aucun chrono manuel saisi'
                  : 'Chronométrage manuel · non officiel'
              }
            />
            <MetricCard
              label="PERFORMANCES"
              value={String(distancePerformances.length)}
              note={`${getDistanceLabel(selectedDistance)} · tous types`}
            />
          </section>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">DERNIÈRE PERFORMANCE</span>
                <h3>
                  {latestPerformance
                    ? getDistanceLabel(latestPerformance.distance)
                    : 'Ton historique commence ici'}
                </h3>
              </div>
              <span className="panel-symbol">↗</span>
            </div>

            {latestPerformance ? (
              <div className="competition-history-row">
                <div className="competition-history-main">
                  <span className="competition-history-title">
                    {formatDate(latestPerformance.date)}
                  </span>
                  <span className="competition-history-subtitle">
                    {latestPerformance.venue || 'Lieu non renseigné'}
                  </span>
                </div>
                <div className="competition-history-time-wrap">
                  <span className="competition-time">
                    {formatTime(latestPerformance.time)}
                  </span>
                </div>
                <div className="competition-history-meta">
                  <span
                    className={`competition-type-badge ${
                      latestPerformance.type === 'training' ? 'training' : ''
                    }`}
                  >
                    {latestPerformance.type === 'competition'
                      ? 'Compétition'
                      : 'Entraînement'}
                  </span>
                  <span className="competition-history-subtitle">
                    {latestPerformance.timing === 'electronic'
                      ? 'Électronique'
                      : 'Manuel'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="competition-empty-state">
                <h3>Aucune performance pour le moment</h3>
                <p>
                  Enregistre ton premier chrono pour commencer à construire
                  un historique fiable.
                </p>
              </div>
            )}
          </section>
        </>
      )}

      {activeSection === 'Historique' && (
        <section className="panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">TES DONNÉES</span>
              <h3>Historique des chronos</h3>
            </div>
            <span className="panel-symbol">{filteredHistory.length}</span>
          </div>

          <div className="competition-toolbar">
            <div className="competition-field" style={{ width: '200px' }}>
              <label htmlFor="history-type-filter">Type de performance</label>
              <select
                id="history-type-filter"
                value={historyTypeFilter}
                onChange={(event) => setHistoryTypeFilter(event.target.value)}
              >
                <option value="all">Toutes</option>
                <option value="competition">Compétitions</option>
                <option value="training">Entraînements</option>
              </select>
            </div>
          </div>

          {filteredHistory.length > 0 ? (
            <div className="competition-history-list">
              {filteredHistory.map((item) => (
                <div className="competition-history-row" key={item.id}>
                  <div className="competition-history-main">
                    <span className="competition-history-title">
                      {getDistanceLabel(item.distance)}
                    </span>
                    <span className="competition-history-subtitle">
                      {formatDate(item.date)}
                      {item.venue ? ` · ${item.venue}` : ''}
                    </span>
                    {item.notes && (
                      <span className="competition-history-subtitle">
                        {item.notes}
                      </span>
                    )}
                    {(item.conditions ||
                      item.conditionDetails ||
                      item.windSpeed !== null && item.windSpeed !== undefined ||
                      item.feeling ||
                      item.feelingNote) && (
                      <span className="competition-history-subtitle">
                        {item.conditions === 'outdoor' && 'Piste extérieure'}
                        {item.conditions === 'indoor' && 'Piste couverte'}
                        {item.conditions === 'wet' && 'Piste humide'}
                        {item.conditions === 'windy' && 'Conditions venteuses'}
                        {item.conditions === 'other' && 'Autres conditions'}
                        {item.conditionDetails ? ` · ${item.conditionDetails}` : ''}
                        {item.windSpeed !== null && item.windSpeed !== undefined
                          ? ` · Vent ${item.windSpeed > 0 ? '+' : ''}${item.windSpeed} m/s`
                          : ''}
                        {item.feeling ? ` · Ressenti ${item.feeling}/10` : ''}
                        {item.feelingNote ? ` · ${item.feelingNote}` : ''}
                      </span>
                    )}
                  </div>

                  <div className="competition-history-time-wrap">
                    <span className="competition-time">
                      {formatTime(item.time)}
                    </span>
                  </div>

                  <div className="competition-history-meta">
                    <span
                      className={`competition-type-badge ${
                        item.type === 'training' ? 'training' : ''
                      }`}
                    >
                      {item.type === 'competition'
                        ? 'Compétition'
                        : 'Entraînement'}
                    </span>
                    <span className="competition-history-subtitle">
                      {item.timing === 'electronic'
                        ? 'Électronique'
                        : 'Manuel'}
                    </span>
                  </div>

                  <div className="competition-history-actions">
                    <button
                      type="button"
                      className="competition-delete-button"
                      aria-label={`Supprimer le chrono du ${formatDate(item.date)}`}
                      title="Supprimer"
                      onClick={() => handleDelete(item.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="competition-empty-state">
              <h3>Aucun chrono correspondant</h3>
              <p>
                Choisis un autre filtre ou enregistre une nouvelle performance.
              </p>
            </div>
          )}
        </section>
      )}

      {!['Vue d’ensemble', 'Historique'].includes(activeSection) && (
        <section className="panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">ANALYSE SPORTIVE</span>
              <h3>{activeSection}</h3>
            </div>
          </div>
          <p className="welcome-description">
            Cette analyse sera activée lorsque les données nécessaires seront
            disponibles. Aucun résultat ni aucune projection ne sera inventé.
          </p>
        </section>
      )}

      <div className="competition-storage-note">
        <span aria-hidden="true">ⓘ</span>
        <span>
          Sauvegarde locale sur cet appareil et dans ce navigateur. Ces données
          ne sont pas encore synchronisées avec ton autre appareil. Évite
          d’effacer les données du navigateur avant la mise en place d’une
          sauvegarde ou de la synchronisation.
        </span>
      </div>
    </div>
  )
}

function MetricCard({ label, value, note }) {
  return (
    <article
      className="competition-metric-card"
      style={{ '--category-color': '#39E58C' }}
    >
      <div className="competition-metric-label">{label}</div>
      <span className="competition-metric-value">{value}</span>
      <p className="competition-metric-note">{note}</p>
    </article>
  )
}


import { useEffect, useMemo, useState } from 'react'
import '../../styles/main_pages/page_entrainement/index.css'

import TrainingHeader from './TrainingHeader'
import TrainingWeek from './TrainingWeek'
import TrainingMetrics from './TrainingMetrics'
import TrainingSessionList from './TrainingSessionList'
import TrainingForm from './TrainingForm'

import {
  TRAINING_STORAGE_KEY,
  sessionTypes,
  createEmptyBlock,
  loadTrainingSessions,
  getLocalDate,
  getMonday,
  addDays,
  formatDay,
  formatShortDate,
  parseDistances,
  getBlockStats,
  makeId,
} from '../../utils/trainingHelpers'

export default function Training() {
  const [weekOffset, setWeekOffset] = useState(0)
  const [sessions, setSessions] = useState(loadTrainingSessions)

  const [showForm, setShowForm] = useState(false)
  const [editingSessionId, setEditingSessionId] = useState(null)

  const [selectedDay, setSelectedDay] = useState(getLocalDate())
  const [sessionType, setSessionType] = useState(sessionTypes[0])
  const [sessionTitle, setSessionTitle] = useState('')
  const [sessionNotes, setSessionNotes] = useState('')
  const [blocks, setBlocks] = useState([createEmptyBlock()])
  const [rpe, setRpe] = useState('')
  const [error, setError] = useState('')

  // Sauvegarde locale des séances.
  useEffect(() => {
    try {
      localStorage.setItem(
        TRAINING_STORAGE_KEY,
        JSON.stringify(sessions),
      )
    } catch {
      // La page reste utilisable si le stockage est indisponible.
    }
  }, [sessions])

  const currentMonday = useMemo(
    () => getMonday(new Date()),
    [],
  )

  const selectedMonday = useMemo(
    () => addDays(currentMonday, weekOffset * 7),
    [currentMonday, weekOffset],
  )

  const today = getLocalDate()

  // Construction des sept jours de la semaine affichée.
  const days = useMemo(
    () =>
      Array.from({ length: 7 }, (_, index) => {
        const date = addDays(selectedMonday, index)
        const dateString = getLocalDate(date)

        return {
          date,
          dateString,
          label: formatDay(date),
          shortDate: formatShortDate(date),
          isToday: dateString === today,
        }
      }),
    [selectedMonday, today],
  )

  const weekSessions = useMemo(
    () =>
      sessions.filter((session) =>
        days.some((day) => day.dateString === session.date),
      ),
    [sessions, days],
  )

  // Statistiques calculées uniquement sur les séances réalisées.
  const stats = useMemo(
    () =>
      weekSessions.reduce(
        (total, session) => {
          if (session.status !== 'completed') return total

          return {
            totalDistance:
              total.totalDistance + (session.distance || 0),

            highIntensityDistance:
              total.highIntensityDistance +
              (session.highIntensityDistance || 0),

            repetitions:
              total.repetitions + (session.repetitions || 0),

            totalDuration:
              total.totalDuration + (session.duration || 0),
          }
        },
        {
          totalDistance: 0,
          highIntensityDistance: 0,
          repetitions: 0,
          totalDuration: 0,
        },
      ),
    [weekSessions],
  )

  const completedSessions = weekSessions.filter(
    (session) => session.status === 'completed',
  ).length

  const daySessions = weekSessions.filter(
    (session) => session.date === selectedDay,
  )

  const plannedSessions = weekSessions.length

  function openNewSession(date) {
    setSelectedDay(date)
    setSessionType(sessionTypes[0])
    setSessionTitle('')
    setSessionNotes('')
    setBlocks([createEmptyBlock()])
    setRpe('')
    setError('')
    setEditingSessionId(null)
    setShowForm(true)
  }

  function updateBlock(blockId, field, value) {
    setBlocks((previous) =>
      previous.map((block) =>
        block.id === blockId
          ? { ...block, [field]: value }
          : block,
      ),
    )
  }

  function addBlock() {
    setBlocks((previous) => [
      ...previous,
      createEmptyBlock({
        name: `Bloc ${previous.length + 1}`,
      }),
    ])
  }

  function duplicateBlock(blockId) {
    setBlocks((previous) => {
      const index = previous.findIndex(
        (block) => block.id === blockId,
      )
  
      if (index === -1) return previous
  
      const source = previous[index]
  
      const copy = {
        ...source,
        id: makeId(),
        name: `${source.name || 'Bloc'} (copie)`,
        courses: (source.courses || []).map((course) => ({
          ...course,
          id: makeId(),
        })),
      }
  
      const next = [...previous]
      next.splice(index + 1, 0, copy)
  
      return next
    })
  }

  function deleteBlock(blockId) {
    setBlocks((previous) =>
      previous.filter((block) => block.id !== blockId),
    )
  }


  function handleSubmit(event) {
    event.preventDefault()
    setError('')
  
    if (!selectedDay || !sessionTitle.trim()) {
      setError('Choisis une date et indique le nom de la séance.')
      return
    }
  
    if (blocks.length === 0) {
      setError('Ajoute au moins un bloc à ta séance.')
      return
    }
  
    for (let blockIndex = 0; blockIndex < blocks.length; blockIndex += 1) {
      const block = blocks[blockIndex]
      const courses = Array.isArray(block.courses) ? block.courses : []
  
      if (courses.length === 0) {
        setError(`Ajoute au moins une course au bloc ${blockIndex + 1}.`)
        return
      }
  
      for (let courseIndex = 0; courseIndex < courses.length; courseIndex += 1) {
        const course = courses[courseIndex]
        const distance = Number(course.distance)
  
        if (
          !Number.isFinite(distance) ||
          distance <= 0 ||
          distance > 10000
        ) {
          setError(
            `Vérifie la distance de la course ${courseIndex + 1} du bloc ${blockIndex + 1}. Elle doit être comprise entre 1 et 10 000 mètres.`,
          )
          return
        }
  
        if (
          course.targetIntensity !== '' &&
          course.targetIntensity != null &&
          (
            !Number.isFinite(Number(course.targetIntensity)) ||
            Number(course.targetIntensity) < 1 ||
            Number(course.targetIntensity) > 100
          )
        ) {
          setError(
            `L'intensité de la course ${courseIndex + 1} du bloc ${blockIndex + 1} doit être comprise entre 1 et 100 %.`,
          )
          return
        }
      }
    }
  
    if (
      rpe !== '' &&
      (
        !Number.isFinite(Number(rpe)) ||
        Number(rpe) < 1 ||
        Number(rpe) > 10
      )
    ) {
      setError('Le RPE doit être compris entre 1 et 10.')
      return
    }
  
    const normalizedBlocks = blocks.map((block) => ({
      ...block,
      courses: block.courses.map((course) => ({
        ...course,
        distance: String(Number(course.distance)),
        targetIntensity:
          course.targetIntensity === '' || course.targetIntensity == null
            ? null
            : Number(course.targetIntensity),
        recoveryAfter: course.recoveryAfter || '',
        result: course.result || '',
        notes: course.notes || '',
      })),
    }))
  
    const blockStats = getBlockStats(normalizedBlocks)
  
    const newSession = {
      id: editingSessionId || makeId(),
      date: selectedDay,
      type: sessionType,
      title: sessionTitle.trim(),
      notes: sessionNotes.trim(),
      status: 'planned',
      blocks: normalizedBlocks,
      plannedDistance: blockStats.distance,
      plannedRepetitions: blockStats.repetitions,
      rpe: rpe === '' ? null : Number(rpe),
      distance: 0,
      highIntensityDistance: 0,
      repetitions: 0,
      duration: 0,
      createdAt: Date.now(),
    }
  
    if (editingSessionId) {
      setSessions((previous) =>
        previous.map((session) =>
          session.id === editingSessionId
            ? {
                ...session,
                ...newSession,
                id: session.id,
                status: session.status,
                createdAt: session.createdAt,
                distance: session.distance || 0,
                highIntensityDistance: session.highIntensityDistance || 0,
                repetitions: session.repetitions || 0,
                duration: session.duration || 0,
              }
            : session,
        ),
      )
    } else {
      setSessions((previous) => [...previous, newSession])
    }
  
    setEditingSessionId(null)
    setSessionTitle('')
    setSessionNotes('')
    setShowForm(false)
  }
  

  function updateSessionStatus(id, status) {
    setSessions((previous) =>
      previous.map((session) => {
        if (session.id !== id) return session

        return {
          ...session,
          status,
        }
      }),
    )
  }

  function editSession(session) {
    setEditingSessionId(session.id)
    setSelectedDay(session.date)
    setSessionType(session.type)
    setSessionTitle(session.title || '')
    setSessionNotes(session.notes || '')
    setRpe(session.rpe == null ? '' : String(session.rpe))

    setBlocks(
      (session.blocks || []).map((block) => ({
        ...block,
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      })),
    )

    setError('')
    setShowForm(true)
  }

  function deleteSession(id) {
    setSessions((previous) =>
      previous.filter((session) => session.id !== id),
    )
  }

  return (
    <div className="dashboard training-page">
      <TrainingHeader />

      <TrainingWeek
        days={days}
        weekSessions={weekSessions}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
        weekOffset={weekOffset}
        onChangeWeek={setWeekOffset}
        selectedMonday={selectedMonday}
      />

      <TrainingMetrics stats={stats} />

      <TrainingSessionList
        sessions={daySessions}
        selectedDay={selectedDay}
        today={today}
        onEdit={editSession}
        onDelete={deleteSession}
        onUpdateStatus={updateSessionStatus}
        onAdd={() => openNewSession(selectedDay)}
      />

      {showForm && (
        <TrainingForm
          selectedDay={selectedDay}
          sessionType={sessionType}
          sessionTitle={sessionTitle}
          sessionNotes={sessionNotes}
          blocks={blocks}
          rpe={rpe}
          error={error}
          editingSessionId={editingSessionId}
          onChangeDay={setSelectedDay}
          onChangeType={setSessionType}
          onChangeTitle={setSessionTitle}
          onChangeNotes={setSessionNotes}
          onChangeRpe={setRpe}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
          onUpdateBlock={updateBlock}
          onAddBlock={addBlock}
          onDuplicateBlock={duplicateBlock}
          onDeleteBlock={deleteBlock}
        />
      )}

      <section className="training-panel training-week-summary">
        <div>
          <span className="eyebrow">BILAN HEBDOMADAIRE</span>
          <h2>Ta régularité</h2>
        </div>

        <div className="training-summary-grid">
          <div>
            <span className="training-summary-value">
              {plannedSessions}
            </span>
            <span className="training-summary-label">
              Séances planifiées
            </span>
          </div>

          <div>
            <span className="training-summary-value">
              {completedSessions}
            </span>
            <span className="training-summary-label">
              Séances réalisées
            </span>
          </div>

          <div>
            <span className="training-summary-value">
              {
                weekSessions.filter(
                  (session) => session.status === 'cancelled',
                ).length
              }
            </span>
            <span className="training-summary-label">
              Séances annulées
            </span>
          </div>
        </div>
      </section>

      <p className="training-storage-note">
        Les séances sont conservées dans le stockage local de ce
        navigateur. Elles ne sont pas encore synchronisées entre
        appareils.
      </p>
    </div>
  )
}

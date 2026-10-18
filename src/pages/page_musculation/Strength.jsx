
import { useEffect, useMemo, useState } from 'react'

import StrengthHeader from './StrengthHeader'
import StrengthMetrics from './StrengthMetrics'
import StrengthWeek from './StrengthWeek'
import StrengthForm from './StrengthForm'
import StrengthSessionPreview from './StrengthSessionPreview'

import '../../styles/Strength.css'

import {
  STRENGTH_STORAGE_KEY,
  loadStrengthSessions,
  createEmptyStrengthSession,
  getStrengthSessionStats,
  getLocalDate,
  getStrengthMonday,
  addStrengthDays,
} from '../../utils/strengthHelpers'

function getWeekDays(monday) {
  const today = getLocalDate()

  return Array.from({ length: 7 }, (_, index) => {
    const date = addStrengthDays(monday, index)
    const dateString = getLocalDate(date)

    return {
      date,
      dateString,
      isToday: dateString === today,
    }
  })
}

function getSessionDuration(session) {
  const actual = Number(session.actualDuration)

  if (Number.isFinite(actual) && actual > 0) {
    return actual
  }

  const stats = getStrengthSessionStats(session.blocks)
  return Math.round(stats.durationSeconds / 60)
}

export default function Strength() {
  const [sessions, setSessions] = useState(() => loadStrengthSessions())
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedDay, setSelectedDay] = useState(() => getLocalDate())
  const [editingSession, setEditingSession] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STRENGTH_STORAGE_KEY, JSON.stringify(sessions))
    } catch (error) {
      console.error(
        'Impossible de sauvegarder les séances de musculation :',
        error,
      )
    }
  }, [sessions])

  const monday = useMemo(() => {
    const date = getStrengthMonday()
    date.setDate(date.getDate() + weekOffset * 7)
    return date
  }, [weekOffset])

  const days = useMemo(() => getWeekDays(monday), [monday])

  const weekSessions = useMemo(() => {
    const start = getLocalDate(monday)
    const end = getLocalDate(addStrengthDays(monday, 6))

    return sessions
      .filter((session) => session.date >= start && session.date <= end)
      .sort((a, b) => a.date.localeCompare(b.date))
  }, [sessions, monday])

  const stats = useMemo(() => {
    const today = getLocalDate()
    const mondayThisWeek = getStrengthMonday()
    const mondayString = getLocalDate(mondayThisWeek)

    const completedThisWeek = sessions.filter(
      (session) =>
        session.status === 'completed' &&
        session.date >= mondayString &&
        session.date <= today,
    )

    return completedThisWeek.reduce(
      (total, session) => {
        const sessionStats = getStrengthSessionStats(session.blocks)

        total.completedSessions += 1
        total.completedSets += sessionStats.completedSets
        total.liftedVolume += sessionStats.liftedVolume
        total.durationMinutes += getSessionDuration(session)

        return total
      },
      {
        completedSessions: 0,
        completedSets: 0,
        liftedVolume: 0,
        durationMinutes: 0,
      },
    )
  }, [sessions])

  function handleAddSession() {
    setEditingSession(
      createEmptyStrengthSession({
        date: selectedDay,
        title: '',
      }),
    )
    setIsFormOpen(true)
  }
  
  function handleSaveSession(formData) {
    setSessions((current) => {
      const exists = current.some(
        (session) => session.id === formData.id,
      )
  
      if (exists) {
        return current.map((session) =>
          session.id === formData.id ? formData : session,
        )
      }
  
      return [...current, formData]
    })
  
    setSelectedDay(formData.date)
    setEditingSession(null)
    setIsFormOpen(false)
  }
  
  function handleCancelForm() {
    setEditingSession(null)
    setIsFormOpen(false)
  }

  return (
    <main className="strength-page">
      <StrengthHeader onAdd={handleAddSession} />
      {isFormOpen && (
        <section className="strength-panel">
          <StrengthForm
            session={editingSession}
            onSave={handleSaveSession}
            onCancel={handleCancelForm}
          />
        </section>
      )}

      <StrengthMetrics stats={stats} />

      <StrengthWeek
        days={days}
        weekSessions={weekSessions}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
        weekOffset={weekOffset}
        onChangeWeek={(next) => {
          setWeekOffset(next)
          if (next === 0) setSelectedDay(getLocalDate())
        }}
      />

      <section className="strength-panel">
        <div className="strength-panel-heading">
          <div>
            <span className="eyebrow">SÉANCES</span>
            <h2>
              {days.find((day) => day.dateString === selectedDay)
                ? `Le ${new Intl.DateTimeFormat('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  }).format(new Date(`${selectedDay}T12:00:00`))}`
                : 'Jour sélectionné'}
            </h2>
          </div>
        </div>

        {sessions.filter((session) => session.date === selectedDay).length ===
        0 ? (
          <p className="strength-empty-state">
            Aucune séance pour ce jour. Clique sur « Nouvelle séance » pour
            commencer à en planifier une.
          </p>
        ) : (
          <div className="strength-session-list">
            {sessions
              .filter((session) => session.date === selectedDay)
              .sort((a, b) => a.date.localeCompare(b.date))
              .map((session) => (
                <StrengthSessionPreview
                  key={session.id}
                  session={session}
                  onEdit={() => {
                    setEditingSession(session)
                    setIsFormOpen(true)
                  }}
                />
              ))}
          </div>
        )}
      </section>
    </main>
  )
}

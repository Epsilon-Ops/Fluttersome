import { useMemo } from 'react'
import { loadTrainingSessions, getBlockStats } from '../utils/trainingHelpers'
import { loadStrengthSessions, getLocalDate } from '../utils/strengthHelpers'
import { loadHydrationData, getDailyWaterTotal, getNutritionLocalDate } from '../utils/nutritionHelpers'
import { loadSleepNights, getSleepDuration, formatSleepDuration } from '../utils/sleepHelpers'
import { loadMoodEntries } from '../utils/moodHelpers'

function readTasks() {
  try {
    const parsed = JSON.parse(localStorage.getItem('epsilon-tasks-v1') || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/* Vue d'ensemble de la journée, uniquement à partir des données saisies. */
export default function TodayPanel() {
  const data = useMemo(() => {
    const today = getLocalDate()
    const hydration = loadHydrationData()
    const sprint = loadTrainingSessions().filter((s) => s.date === today)
    const strength = loadStrengthSessions().filter((s) => s.date === today)
    const tasks = readTasks()

    const dueToday = tasks.filter((t) => !t.completed && t.due && t.due <= today)
    const lastNight = [...loadSleepNights()]
      .sort((a, b) => String(b.date).localeCompare(String(a.date)))[0]
    const lastNightMinutes = lastNight
      ? getSleepDuration(lastNight.fallAsleep, lastNight.wakeTime)
      : null
    const mood = loadMoodEntries().filter((e) => e.date === today)

    return {
      sprint,
      strength,
      dueToday,
      water: getDailyWaterTotal(hydration.entries || [], getNutritionLocalDate()),
      waterGoal: hydration.goal || 2400,
      lastNightMinutes,
      mood,
      sprintDistance: sprint.reduce((t, s) => t + getBlockStats(s.blocks || []).distance, 0),
    }
  }, [])

  const plannedSessions = data.sprint.length + data.strength.length

  return (
    <section className="dashboard-home__section today-panel">
      <div className="dashboard-home__section-heading">
        <div>
          <span className="eyebrow">AUJOURD’HUI</span>
          <h2>Ta journée</h2>
        </div>
      </div>

      <div className="today-panel__grid">
        <article className="today-panel__card">
          <span>Entraînement</span>
          <strong>{plannedSessions === 0 ? 'Aucune séance' : `${plannedSessions} séance(s)`}</strong>
          <small>
            {data.sprintDistance > 0 ? `${Math.round(data.sprintDistance)} m de sprint · ` : ''}
            {data.strength.length > 0 ? `${data.strength.length} musculation` : ''}
          </small>
        </article>

        <article className="today-panel__card">
          <span>Tâches à faire</span>
          <strong>{data.dueToday.length}</strong>
          <small>échues ou prévues aujourd’hui</small>
        </article>

        <article className="today-panel__card">
          <span>Hydratation</span>
          <strong>{Math.round(data.water)} / {data.waterGoal} ml</strong>
          <small>{data.water >= data.waterGoal ? 'objectif atteint' : 'continue à boire'}</small>
        </article>

        <article className="today-panel__card">
          <span>Dernière nuit</span>
          <strong>{data.lastNightMinutes === null ? '—' : formatSleepDuration(data.lastNightMinutes)}</strong>
          <small>{data.lastNightMinutes === null ? 'aucune nuit saisie' : 'durée enregistrée'}</small>
        </article>

        <article className="today-panel__card">
          <span>Humeur</span>
          <strong>{data.mood.length ? `${data.mood.length} saisie(s)` : 'Non saisie'}</strong>
          <small>{data.mood.length ? 'merci d’avoir noté' : 'comment tu te sens ?'}</small>
        </article>
      </div>
    </section>
  )
}


import { getSleepDuration } from '../utils/sleepHelpers'
import { getDistanceLabel } from '../utils/competitionHelpers'

function getValidDate(date) {
  if (typeof date !== 'string' || !date) return null

  const timestamp = Date.parse(`${date}T12:00:00`)

  return Number.isFinite(timestamp) ? timestamp : null
}

function getLatestByDate(items, dateKey) {
  return [...items]
    .filter((item) => getValidDate(item[dateKey]) !== null)
    .sort(
      (a, b) =>
        getValidDate(b[dateKey]) - getValidDate(a[dateKey]),
    )[0] ?? null
}

export function getAthleteDashboardData({
  nights = [],
  performances = [],
  feelings = [],
  tasks = [],
  trainings = [],
} = {}) {
  const latestNight = getLatestByDate(nights, 'date')
  const latestPerformance = getLatestByDate(
    performances,
    'date',
  )

  const latestFeeling = [...feelings]
    .filter(
      (feeling) =>
        feeling.recordedAt &&
        Number.isFinite(Date.parse(feeling.recordedAt)),
    )
    .sort(
      (a, b) =>
        Date.parse(b.recordedAt) - Date.parse(a.recordedAt),
    )[0] ?? null

  const sleepMinutes = latestNight
    ? getSleepDuration(
        latestNight.fallAsleep,
        latestNight.wakeTime,
      )
    : null

  const pendingTasks = tasks.filter(
    (task) =>
      !task.completed &&
      !task.done &&
      task.status !== 'completed',
  )

  return {
    sleep: {
      available: sleepMinutes !== null,
      latestNight,
      durationMinutes: sleepMinutes,
    },

    performance: {
      available: Boolean(latestPerformance),
      latest: latestPerformance,
      distanceLabel: latestPerformance
        ? getDistanceLabel(latestPerformance.distance)
        : null,
    },

    bodyFeeling: {
      available: Boolean(latestFeeling),
      latest: latestFeeling,
    },

    tasks: {
      available: tasks.length > 0,
      total: tasks.length,
      pending: pendingTasks.length,
    },

    trainings: {
      available: trainings.length > 0,
      total: trainings.length,
    },
  }
}

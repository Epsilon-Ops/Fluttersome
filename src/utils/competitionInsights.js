/* =========================================================
   Analyses sportives : forme récente, régularité et objectifs.
   Toutes les valeurs sont calculées à partir des chronos saisis.
   ========================================================= */

const GOALS_KEY = 'epsilon.competition.goals.v1'

export function loadGoals() {
  try {
    const saved = JSON.parse(localStorage.getItem(GOALS_KEY) || '{}')
    return saved && typeof saved === 'object' ? saved : {}
  } catch {
    return {}
  }
}

export function saveGoal(distance, seconds) {
  const goals = loadGoals()

  if (seconds === null) delete goals[distance]
  else goals[distance] = { seconds, setAt: new Date().toISOString().slice(0, 10) }

  try {
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals))
  } catch {
    // Stockage indisponible : l'objectif n'est pas gardé.
  }

  return goals
}

/* Trie du plus ancien au plus récent. */
function chronological(performances) {
  return [...performances].sort((a, b) => String(a.date).localeCompare(String(b.date)))
}

function mean(values) {
  return values.reduce((total, value) => total + value, 0) / values.length
}

function stdDev(values) {
  const avg = mean(values)
  return Math.sqrt(mean(values.map((value) => (value - avg) ** 2)))
}

export function getForm(officialPerformances) {
  const sorted = chronological(officialPerformances)

  if (sorted.length < 3) {
    return { available: false, message: 'Il faut au moins 3 chronos officiels pour analyser ta forme.' }
  }

  const times = sorted.map((item) => Number(item.time))
  const last = times[times.length - 1]
  const best = Math.min(...times)
  const recent = times.slice(-3)
  const previous = times.slice(-6, -3)
  const recentAvg = mean(recent)
  const previousAvg = previous.length >= 2 ? mean(previous) : null

  let trend = 'stable'
  if (previousAvg !== null) {
    const diff = recentAvg - previousAvg
    if (diff < -0.05) trend = 'progress'
    else if (diff > 0.05) trend = 'recul'
  }

  return {
    available: true,
    last,
    best,
    lastVsBestPct: ((last - best) / best) * 100,
    recentAvg,
    trend,
    trendDiff: previousAvg === null ? null : recentAvg - previousAvg,
  }
}

export function getRegularity(officialPerformances) {
  const sorted = chronological(officialPerformances)

  if (sorted.length < 3) {
    return { available: false, message: 'Il faut au moins 3 chronos officiels pour mesurer ta régularité.' }
  }

  const times = sorted.map((item) => Number(item.time))
  const avg = mean(times)
  const cv = (stdDev(times) / avg) * 100

  const byMonth = {}
  for (const item of sorted) {
    const key = String(item.date).slice(0, 7)
    byMonth[key] = (byMonth[key] || 0) + 1
  }

  const dates = sorted.map((item) => Date.parse(`${item.date}T12:00:00`)).filter(Number.isFinite)
  const gaps = dates.slice(1).map((value, i) => Math.round((value - dates[i]) / 86400000))

  return {
    available: true,
    count: sorted.length,
    average: avg,
    cv,
    stability: cv < 1 ? 'très stable' : cv < 2.5 ? 'stable' : 'variable',
    byMonth,
    averageGapDays: gaps.length ? Math.round(mean(gaps)) : null,
    longestGapDays: gaps.length ? Math.max(...gaps) : null,
  }
}

export function getGoalProgress(officialPerformances, goalSeconds) {
  const sorted = chronological(officialPerformances)

  if (!goalSeconds || sorted.length === 0) {
    return { available: false }
  }

  const times = sorted.map((item) => Number(item.time))
  const best = Math.min(...times)
  const first = times[0]
  const reached = best <= goalSeconds

  let progress = 0
  if (first > goalSeconds) {
    progress = Math.max(0, Math.min(1, (first - best) / (first - goalSeconds)))
  }
  if (reached) progress = 1

  return {
    available: true,
    goal: goalSeconds,
    best,
    gap: best - goalSeconds,
    reached,
    progress,
  }
}

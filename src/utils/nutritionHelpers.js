
export const HYDRATION_STORAGE_KEY = 'epsilon.nutrition.hydration.v1'

export const DEFAULT_DAILY_WATER_GOAL = 2400

export function getNutritionLocalDate(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function createWaterEntry(amount, date = new Date()) {
  const quantity = Number(amount)

  if (!Number.isFinite(quantity) || quantity <= 0) {
    throw new Error('La quantité doit être supérieure à zéro.')
  }

  return {
    id: makeWaterEntryId(),
    amount: Math.round(quantity),
    date: getNutritionLocalDate(date),
    timestamp: date.toISOString(),
  }
}

function makeWaterEntryId() {
  return typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function getDailyWaterTotal(entries = [], date = getNutritionLocalDate()) {
  return entries
    .filter((entry) => entry.date === date)
    .reduce((total, entry) => total + (Number(entry.amount) || 0), 0)
}

export function loadHydrationData() {
  try {
    const saved = localStorage.getItem(HYDRATION_STORAGE_KEY)

    if (!saved) {
      return {
        goal: DEFAULT_DAILY_WATER_GOAL,
        entries: [],
      }
    }

    const parsed = JSON.parse(saved)

    return {
      goal: Number(parsed.goal) > 0
        ? Number(parsed.goal)
        : DEFAULT_DAILY_WATER_GOAL,
      entries: Array.isArray(parsed.entries)
        ? parsed.entries.filter((entry) =>
            entry &&
            typeof entry.date === 'string' &&
            Number.isFinite(Number(entry.amount)) &&
            Number(entry.amount) > 0
          )
        : [],
    }
  } catch (error) {
    console.error('Impossible de charger les données d’hydratation :', error)

    return {
      goal: DEFAULT_DAILY_WATER_GOAL,
      entries: [],
    }
  }
}

export function saveHydrationData(data) {
  try {
    localStorage.setItem(HYDRATION_STORAGE_KEY, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('Impossible de sauvegarder l’hydratation :', error)
    return false
  }
}

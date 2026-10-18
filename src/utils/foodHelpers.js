
export const FOOD_STORAGE_KEY = 'epsilon.nutrition.food.v1'

export const MEAL_TYPES = [
  { value: 'breakfast', label: 'Petit-déjeuner' },
  { value: 'lunch', label: 'Déjeuner' },
  { value: 'dinner', label: 'Dîner' },
  { value: 'snack', label: 'Collation' },
]

export const HUNGER_LEVELS = [
  { value: 1, label: 'Pas faim' },
  { value: 2, label: 'Un peu faim' },
  { value: 3, label: 'Faim modérée' },
  { value: 4, label: 'Très faim' },
  { value: 5, label: 'Affamé' },
]

export const SATIETY_LEVELS = [
  { value: 1, label: 'Encore faim' },
  { value: 2, label: 'Pas totalement rassasié' },
  { value: 3, label: 'Satisfait' },
  { value: 4, label: 'Bien rassasié' },
  { value: 5, label: 'Trop rassasié' },
]

export const FOOD_QUALITY_OPTIONS = [
  { value: 'poor', label: 'À améliorer' },
  { value: 'okay', label: 'Correcte' },
  { value: 'good', label: 'Bonne' },
  { value: 'excellent', label: 'Très bonne' },
]

export function getFoodLocalDate(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function createFoodEntry(overrides = {}) {
  return {
    id: makeFoodEntryId(),
    date: getFoodLocalDate(),
    time: getLocalTime(),
    mealType: 'lunch',
    name: '',
    quantity: '1',
    unit: 'portion',
    calories: '',
    protein: '',
    carbohydrates: '',
    fat: '',
    hunger: '',
    satiety: '',
    quality: '',
    waterMl: 0,
    notes: '',
    createdAt: new Date().toISOString(),
    ...overrides,
  }
}

export function getLocalTime(date = new Date()) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes(),
  ).padStart(2, '0')}`
}

function makeFoodEntryId() {
  return typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function loadFoodEntries() {
  try {
    const saved = localStorage.getItem(FOOD_STORAGE_KEY)

    if (!saved) return []

    const parsed = JSON.parse(saved)

    if (!Array.isArray(parsed)) return []

    return parsed.filter((entry) =>
      entry &&
      typeof entry.id === 'string' &&
      typeof entry.date === 'string' &&
      typeof entry.name === 'string'
    )
  } catch (error) {
    console.error('Impossible de charger le journal alimentaire :', error)
    return []
  }
}

export function saveFoodEntries(entries) {
  try {
    localStorage.setItem(FOOD_STORAGE_KEY, JSON.stringify(entries))
    return true
  } catch (error) {
    console.error('Impossible de sauvegarder le journal alimentaire :', error)
    return false
  }
}

export function getFoodDayTotals(entries = [], date = getFoodLocalDate()) {
  return entries
    .filter((entry) => entry.date === date)
    .reduce(
      (totals, entry) => {
        const quantity = Number(entry.quantity)
        const multiplier = Number.isFinite(quantity) && quantity > 0
          ? quantity
          : 0

        totals.entries += 1

        for (const nutrient of [
          'calories',
          'protein',
          'carbohydrates',
          'fat',
        ]) {
          const value = Number(entry[nutrient])

          if (entry[nutrient] !== '' && Number.isFinite(value) && value >= 0) {
            totals[nutrient] += value * multiplier
          }
        }

        totals.waterMl += Math.max(0, Number(entry.waterMl) || 0)
        return totals
      },
      {
        entries: 0,
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0,
        waterMl: 0,
      },
    )
}

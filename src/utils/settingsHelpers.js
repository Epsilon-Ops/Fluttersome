/* =========================================================
   Réglages de l'application : objectifs nutritionnels et rappels.
   ========================================================= */

export const SETTINGS_STORAGE_KEY = 'epsilon.settings.v1'

export const DEFAULT_SETTINGS = {
  nutrition: {
    kcalTraining: 2600,
    kcalRest: 2200,
    protein: 140,
  },
  reminders: {
    tasks: true,
    moodTime: '',      // HH:MM, vide = désactivé
    bedtimeTime: '',   // HH:MM, vide = désactivé
    hydrationMinutes: 0, // 0 = désactivé
  },
}

function mergeDeep(base, patch) {
  const result = { ...base }

  for (const key of Object.keys(patch || {})) {
    const value = patch[key]

    result[key] =
      value && typeof value === 'object' && !Array.isArray(value)
        ? mergeDeep(base[key] || {}, value)
        : value
  }

  return result
}

export function loadSettings() {
  try {
    const saved = localStorage.getItem(SETTINGS_STORAGE_KEY)

    if (!saved) return DEFAULT_SETTINGS

    return mergeDeep(DEFAULT_SETTINGS, JSON.parse(saved))
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
    return true
  } catch {
    return false
  }
}

export function updateSettings(patch) {
  const next = mergeDeep(loadSettings(), patch)
  saveSettings(next)
  return next
}

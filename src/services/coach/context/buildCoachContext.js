/* =========================================================
   Rassemble toutes les données saisies dans l'application.
   Le Coach ne lit rien d'autre que ce contexte.
   ========================================================= */

import { loadSleepNights } from '../../../utils/sleepHelpers'
import { loadBodyFeelings } from '../../../utils/bodyFeelingHelpers'
import { loadPerformances } from '../../../utils/competitionHelpers'
import { loadTrainingSessions } from '../../../utils/trainingHelpers'
import { loadStrengthSessions } from '../../../utils/strengthHelpers'
import { loadMoodEntries } from '../../../utils/moodHelpers'
import { loadFoodEntries } from '../../../utils/foodHelpers'
import { loadHydrationData } from '../../../utils/nutritionHelpers'
import { loadSettings } from '../../../utils/settingsHelpers'

const SLEEP_TARGET_KEY = 'epsilon_sleep_target_minutes_v1'

function loadSleepTarget() {
  try {
    const value = Number(localStorage.getItem(SLEEP_TARGET_KEY))
    return Number.isFinite(value) && value >= 240 && value <= 720 ? value : 480
  } catch {
    return 480
  }
}

export function buildCoachContext(now = new Date()) {
  return {
    now,
    sleepNights: safeArray(loadSleepNights),
    sleepTargetMinutes: loadSleepTarget(),
    feelings: safeArray(loadBodyFeelings),
    performances: safeArray(loadPerformances),
    trainingSessions: safeArray(loadTrainingSessions),
    strengthSessions: safeArray(loadStrengthSessions),
    moodEntries: safeArray(loadMoodEntries),
    foodEntries: safeArray(loadFoodEntries),
    hydration: safeObject(loadHydrationData),
    settings: loadSettings(),
  }
}

function safeArray(loader) {
  try {
    const value = loader()
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

function safeObject(loader) {
  try {
    return loader() || {}
  } catch {
    return {}
  }
}

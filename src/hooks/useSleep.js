
import { useEffect, useState } from 'react'
import {
  SLEEP_STORAGE_KEY,
  loadSleepNights,
  makeSleepId,
} from '../utils/sleepHelpers'

const SLEEP_TARGET_KEY = 'epsilon_sleep_target_minutes_v1'
const DEFAULT_SLEEP_TARGET = 480

function loadSleepTarget() {
  try {
    const stored = localStorage.getItem(SLEEP_TARGET_KEY)

    if (stored === null) return DEFAULT_SLEEP_TARGET

    const target = Number(stored)

    return Number.isFinite(target) && target >= 240 && target <= 720
      ? target
      : DEFAULT_SLEEP_TARGET
  } catch {
    return DEFAULT_SLEEP_TARGET
  }
}

export default function useSleep() {
  const [nights, setNights] = useState(loadSleepNights)
  const [sleepTargetMinutes, setSleepTargetMinutes] =
    useState(loadSleepTarget)
  const [storageError, setStorageError] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(SLEEP_STORAGE_KEY, JSON.stringify(nights))
      localStorage.setItem(
        SLEEP_TARGET_KEY,
        String(sleepTargetMinutes),
      )
      setStorageError('')
    } catch {
      setStorageError(
        'Le navigateur ne permet pas de sauvegarder les données. Vérifie son espace de stockage.',
      )
    }
  }, [nights, sleepTargetMinutes])

  function addNight(data) {
    const night = {
      ...data,
      id: makeSleepId(),
      createdAt: Date.now(),
    }

    setNights((previous) =>
      [...previous, night].sort((a, b) =>
        String(b.date).localeCompare(String(a.date)),
      ),
    )

    return night
  }

  function updateNight(id, data) {
    if (!nights.some((night) => night.id === id)) {
      return false
    }

    setNights((previous) =>
      previous
        .map((night) =>
          night.id === id ? { ...night, ...data, id } : night,
        )
        .sort((a, b) =>
          String(b.date).localeCompare(String(a.date)),
        ),
    )

    return true
  }

  function deleteNight(id) {
    setNights((previous) =>
      previous.filter((night) => night.id !== id),
    )
  }

  function updateSleepTarget(value) {
    const target = Number(value)

    if (!Number.isFinite(target)) return false
    if (target < 240 || target > 720) return false

    setSleepTargetMinutes(target)
    return true
  }

  return {
    nights,
    addNight,
    updateNight,
    deleteNight,
    storageError,
    sleepTargetMinutes,
    updateSleepTarget,
  }
}

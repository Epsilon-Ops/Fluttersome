
import { useCallback, useEffect, useState } from 'react'
import {
  MOOD_STORAGE_KEY,
  loadMoodEntries,
  createMoodEntry,
} from '../utils/moodHelpers'
import { getMoodById } from '../constants/moods'

export default function useMood() {
  const [entries, setEntries] = useState(() => loadMoodEntries())
  const [storageError, setStorageError] = useState('')

  useEffect(() => {
    try {
      if (typeof localStorage === 'undefined') {
        setStorageError(
          'Le stockage local n’est pas disponible dans ce navigateur.'
        )
        return
      }

      localStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(entries))
      setStorageError('')
    } catch {
      setStorageError(
        'Impossible de sauvegarder les émotions dans ce navigateur.'
      )
    }
  }, [entries])

  const addMoodEntry = useCallback((data) => {
    const mood = getMoodById(data?.moodId)

    if (!mood) {
      return {
        success: false,
        error: 'L’émotion choisie est introuvable.',
      }
    }

    try {
      const entry = createMoodEntry(data, mood)

      setEntries((currentEntries) => [entry, ...currentEntries])

      return {
        success: true,
        entry,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Impossible de créer cette entrée.',
      }
    }
  }, [])

  const deleteMoodEntry = useCallback((entryId) => {
    setEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== entryId)
    )
  }, [])

  const getEntriesForDate = useCallback(
    (date) => entries.filter((entry) => entry.date === date),
    [entries]
  )

  return {
    entries,
    addMoodEntry,
    deleteMoodEntry,
    getEntriesForDate,
    storageError,
  }
}


import { useEffect, useState } from 'react'
import {
  STORAGE_KEY,
  loadPerformances,
  makeId,
} from '../utils/competitionHelpers'

export default function usePerformances() {
  const [performances, setPerformances] = useState(loadPerformances)
  const [storageError, setStorageError] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(performances),
      )

      setStorageError('')
    } catch {
      setStorageError(
        'Le navigateur ne permet pas de sauvegarder les données. Vérifie son espace de stockage.',
      )
    }
  }, [performances])

  function addPerformance(data) {
    const performance = {
      ...data,
      id: makeId(),
      createdAt: Date.now(),
    }

    setPerformances((previous) => [...previous, performance])

    return performance
  }

  function deletePerformance(id) {
    setPerformances((previous) =>
      previous.filter((item) => item.id !== id),
    )
  }

  return {
    performances,
    setPerformances,
    addPerformance,
    deletePerformance,
    storageError,
  }
}


import { useCallback, useEffect, useState } from 'react'
import {
  createBodyFeeling,
  loadBodyFeelings,
  saveBodyFeelings,
  validateBodyFeeling,
} from '../utils/bodyFeelingHelpers'

export default function useBodyFeelings() {
  const [feelings, setFeelings] = useState(loadBodyFeelings)
  const [storageError, setStorageError] = useState('')
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (!isInitialized) return

    const result = saveBodyFeelings(feelings)

    setStorageError(result.success ? '' : result.error)
  }, [feelings, isInitialized])

  const addFeeling = useCallback((data) => {
    const validation = validateBodyFeeling(data)

    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors,
        feeling: null,
      }
    }

    const feeling = createBodyFeeling(data)

    setFeelings((previous) =>
      [feeling, ...previous].sort(
        (a, b) =>
          Date.parse(b.recordedAt) - Date.parse(a.recordedAt),
      ),
    )

    return {
      success: true,
      errors: {},
      feeling,
    }
  }, [])

  const deleteFeeling = useCallback((id) => {
    setFeelings((previous) =>
      previous.filter((feeling) => feeling.id !== id),
    )
  }, [])

  return {
    feelings,
    addFeeling,
    deleteFeeling,
    storageError,
  }
}

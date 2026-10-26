
import { useMemo } from 'react'
import useSleep from './useSleep'
import useBodyFeelings from './useBodyFeelings'
import usePerformances from './usePerformances'

export default function useCoachReadiness() {
  const { nights, sleepTargetMinutes } = useSleep()
  const { feelings } = useBodyFeelings()
  const { performances } = usePerformances()

  const latestNight = useMemo(() => {
    return [...nights]
      .filter(
        (night) =>
          night.date &&
          Number.isFinite(Date.parse(night.date)),
      )
      .sort(
        (a, b) => Date.parse(b.date) - Date.parse(a.date),
      )[0] ?? null
  }, [nights])

  const recentFeelings = useMemo(() => {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000

    return feelings
      .filter(
        (feeling) =>
          Number.isFinite(Date.parse(feeling.recordedAt)) &&
          Date.parse(feeling.recordedAt) >= cutoff,
      )
      .sort(
        (a, b) =>
          Date.parse(b.recordedAt) - Date.parse(a.recordedAt),
      )
  }, [feelings])

  const recentPerformances = useMemo(() => {
    const cutoff = Date.now() - 28 * 24 * 60 * 60 * 1000

    return performances.filter((performance) => {
      const date = performance.date ?? performance.createdAt

      if (!date) return false

      const timestamp =
        typeof date === 'number' ? date : Date.parse(date)

      return Number.isFinite(timestamp) && timestamp >= cutoff
    })
  }, [performances])

  const hasSleepData = latestNight !== null
  const hasBodyFeelingData = recentFeelings.length > 0
  const hasPerformanceData = recentPerformances.length > 0

  return {
    status: 'insufficient-data',
    score: null,
    reliability: null,
    explanation:
      'Le score de préparation reste indisponible tant que sa méthode de calcul n’est pas définie et validée.',
    sleep: {
      latestNight,
      targetMinutes: sleepTargetMinutes,
      available: hasSleepData,
    },
    bodyFeelings: {
      recent: recentFeelings,
      available: hasBodyFeelingData,
    },
    performances: {
      recent: recentPerformances,
      available: hasPerformanceData,
    },
  }
}

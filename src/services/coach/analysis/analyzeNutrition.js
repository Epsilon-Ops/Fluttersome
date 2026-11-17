/* Nutrition : moyenne des apports sur les 7 derniers jours saisis,
   comparée aux objectifs (jour d'entraînement ou de repos). */

import { within, mean, round } from '../utils'
import { getDailyWaterTotal } from '../../../utils/nutritionHelpers'

function hadTraining(context, date) {
  const sprint = context.trainingSessions.some((session) => session.date === date)
  const strength = context.strengthSessions.some((session) => session.date === date)
  return sprint || strength
}

export function analyzeNutrition(context) {
  const { foodEntries, settings, now, hydration } = context
  const targets = settings.nutrition

  const recentEntries = foodEntries.filter((entry) => within(entry.date, 7, now))
  const dates = [...new Set(recentEntries.map((entry) => entry.date))]

  if (dates.length < 2) {
    return {
      available: false,
      message: 'Enregistre tes repas sur au moins 2 jours pour analyser ta nutrition.',
    }
  }

  const days = dates.map((date) => {
    const items = recentEntries.filter((entry) => entry.date === date)
    const kcal = items.reduce((total, item) => total + (Number(item.calories) || 0), 0)
    const protein = items.reduce((total, item) => total + (Number(item.protein) || 0), 0)
    const target = hadTraining(context, date) ? targets.kcalTraining : targets.kcalRest
    return { date, kcal, protein, target }
  })

  const avgKcal = mean(days.map((day) => day.kcal))
  const avgTarget = mean(days.map((day) => day.target))
  const avgProtein = mean(days.map((day) => day.protein))
  const proteinDays = days.filter((day) => day.protein >= targets.protein * 0.8).length

  const waterDays = Array.isArray(hydration.entries)
    ? mean(
        [...new Set(hydration.entries.filter((entry) => within(entry.date, 7, now)).map((entry) => entry.date))].map(
          (date) => getDailyWaterTotal(hydration.entries, date),
        ),
      )
    : null

  return {
    available: true,
    daysLogged: days.length,
    avgKcal: Math.round(avgKcal),
    avgTarget: Math.round(avgTarget),
    kcalRatio: avgKcal / avgTarget,
    avgProtein: round(avgProtein),
    proteinTarget: targets.protein,
    proteinDays,
    avgWaterMl: waterDays === null ? null : Math.round(waterDays),
  }
}

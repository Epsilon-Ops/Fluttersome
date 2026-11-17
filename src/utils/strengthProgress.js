/* =========================================================
   Progression en musculation : 1RM estimé par exercice et
   historique des charges. Formule d'Epley (répétitions 1 à 12).
   ========================================================= */

import { estimateOneRepMax } from './strengthHelpers'

export function normalizeExerciseName(name = '') {
  return String(name).trim().replace(/\s+/g, ' ').toLowerCase()
}

/* Regroupe les séries réalisées par exercice, triées par date. */
export function getExerciseSeries(sessions = []) {
  const byExercise = new Map()

  for (const session of sessions) {
    for (const block of session.blocks || []) {
      for (const exercise of block.exercises || []) {
        const key = normalizeExerciseName(exercise.name)
        if (!key) continue

        const completedSets = (exercise.sets || []).filter((set) => {
          const reps = Number(set.reps)
          const load = Number(set.load)

          return (
            set.completed &&
            Number.isFinite(reps) && reps > 0 &&
            Number.isFinite(load) && load > 0
          )
        })

        if (completedSets.length === 0) continue

        const estimates = completedSets
          .map((set) => estimateOneRepMax(set.load, set.reps))
          .filter((value) => value !== null)

        const entry = {
          date: session.date,
          name: exercise.name.trim(),
          bestE1rm: estimates.length ? Math.max(...estimates) : null,
          maxLoad: Math.max(...completedSets.map((set) => Number(set.load))),
          volume: completedSets.reduce(
            (total, set) => total + Number(set.reps) * Number(set.load),
            0,
          ),
          sets: completedSets.length,
        }

        if (!byExercise.has(key)) byExercise.set(key, [])
        byExercise.get(key).push(entry)
      }
    }
  }

  for (const list of byExercise.values()) {
    list.sort((a, b) => String(a.date).localeCompare(String(b.date)))
  }

  return byExercise
}

/* Liste des exercices utilisés, du plus fréquent au moins fréquent. */
export function listExercises(series) {
  return [...series.entries()]
    .map(([key, entries]) => ({
      key,
      label: entries[entries.length - 1].name,
      count: entries.length,
    }))
    .sort((a, b) => b.count - a.count)
}

/* Dernière performance connue pour un exercice (pour pré-remplir). */
export function getLastPerformance(series, name) {
  const entries = series.get(normalizeExerciseName(name))
  if (!entries || entries.length === 0) return null

  const last = entries[entries.length - 1]
  const best = entries.reduce(
    (max, entry) =>
      entry.bestE1rm !== null && (max === null || entry.bestE1rm > max)
        ? entry.bestE1rm
        : max,
    null,
  )

  return { ...last, recordE1rm: best }
}

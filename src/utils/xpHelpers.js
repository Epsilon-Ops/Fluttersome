/* =========================================================
   xpHelpers.js — expérience (XP) et niveaux par module.

   Chaque module a sa couleur et sa valeur d'XP par action :
   - compétition (rouge)      : 50 XP par performance enregistrée
   - entraînement (bleu)      : 30 XP par séance
   - nutrition (vert)         : 5 XP par aliment journalisé
   - tâches (jaune)           : 10 XP par tâche accomplie (une fois par période)
   - sommeil (indigo)         : 25 XP par nuit enregistrée
   - musculation (violet)     : 40 XP par séance

   Niveau logarithmique : le niveau L demande 100 × (2^(L−1) − 1) XP.
   Chaque niveau coûte donc deux fois plus d'XP que le précédent :
   le niveau croît comme le logarithme de l'XP totale.
   ========================================================= */

import { useEffect, useState } from 'react'
import { STORAGE_KEY as PERFORMANCES_KEY } from './competitionHelpers'
import { TRAINING_STORAGE_KEY } from './trainingHelpers'
import { FOOD_STORAGE_KEY } from './foodHelpers'
import { SLEEP_STORAGE_KEY } from './sleepHelpers'
import { STRENGTH_STORAGE_KEY } from './strengthHelpers'
import { STORAGE_KEY as TASKS_KEY } from '../hooks/useTasks'

export const XP_BASE = 100

export const XP_MODULES = [
  { id: 'competition', label: 'Compétition', color: '#FF4B4B', xpPerUnit: 50 },
  { id: 'training', label: 'Entraînement', color: '#1CB0F6', xpPerUnit: 30 },
  { id: 'nutrition', label: 'Nutrition', color: '#58CC02', xpPerUnit: 5 },
  { id: 'tasks', label: 'Tâches', color: '#FFC800', xpPerUnit: 10 },
  { id: 'sleep', label: 'Sommeil', color: '#5B5BD6', xpPerUnit: 25 },
  { id: 'strength', label: 'Musculation', color: '#8B5CF6', xpPerUnit: 40 },
]

/**
 * Niveau, progression et XP restante pour un total d'XP donné.
 * percent : avancement dans le niveau courant (0 à 99).
 * remaining : XP manquantes pour atteindre le niveau suivant.
 */
export function getLevelInfo(xp) {
  const total = Math.max(0, Math.floor(Number(xp) || 0))

  const level = Math.floor(Math.log2(total / XP_BASE + 1)) + 1
  const start = XP_BASE * (2 ** (level - 1) - 1)
  const end = XP_BASE * (2 ** level - 1)

  const percent = Math.min(
    99,
    Math.floor(((total - start) / (end - start)) * 100),
  )

  return {
    level,
    xp: total,
    percent,
    remaining: end - total,
  }
}

function countEntries(storageKey) {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) ?? 'null')
    return Array.isArray(parsed) ? parsed.length : 0
  } catch {
    return 0
  }
}

function sumTaskXp() {
  try {
    const parsed = JSON.parse(localStorage.getItem(TASKS_KEY) ?? 'null')

    if (!Array.isArray(parsed)) return 0

    return parsed.reduce(
      (sum, task) => sum + (Number(task?.xpCount) || 0),
      0,
    )
  } catch {
    return 0
  }
}

/** Total d'XP par module, calculé à partir des données enregistrées. */
export function readXpTotals() {
  const units = {
    competition: countEntries(PERFORMANCES_KEY),
    training: countEntries(TRAINING_STORAGE_KEY),
    nutrition: countEntries(FOOD_STORAGE_KEY),
    tasks: sumTaskXp(),
    sleep: countEntries(SLEEP_STORAGE_KEY),
    strength: countEntries(STRENGTH_STORAGE_KEY),
  }

  return Object.fromEntries(
    XP_MODULES.map((module) => [
      module.id,
      units[module.id] * module.xpPerUnit,
    ]),
  )
}

function sameTotals(a, b) {
  return XP_MODULES.every((module) => a[module.id] === b[module.id])
}

/** Totaux d'XP, rafraîchis régulièrement et à chaque changement de stockage. */
export function useXpTotals() {
  const [totals, setTotals] = useState(readXpTotals)

  useEffect(() => {
    function refresh() {
      const next = readXpTotals()
      setTotals((current) => (sameTotals(current, next) ? current : next))
    }

    const intervalId = window.setInterval(refresh, 1500)
    window.addEventListener('storage', refresh)

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  return totals
}

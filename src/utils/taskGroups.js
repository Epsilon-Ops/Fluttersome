/* =========================================================
   taskGroups.js — regroupement des tâches par catégorie,
   couleur dominante de chaque bloc, et utilitaires d'ordre.
   ========================================================= */

import { TASK_CATEGORIES, getCategoryLabel } from './taskHelpers'
import {
  DEFAULT_TASK_COLOR,
  getTaskColorPalette,
} from '../components/icons/icon-utils/icon-colors'

// Clé de stockage de l'ordre choisi par l'utilisateur (blocs + tâches)
export const TASK_LAYOUT_STORAGE_KEY = 'epsilon-tasks-layout-v1'

// Couleur d'un bloc sans couleur dominante (« blanc par défaut »)
export const NEUTRAL_GROUP_COLOR = '#F5F7FB'

const OTHER_KEY = 'autre'
// Rang très élevé = « pas encore classé » (passe après les éléments classés)
const UNRANKED = 1e9

/** Déplace un élément d'une position à une autre (sans muter le tableau). */
export function arrayMove(list, from, to) {
  const next = [...list]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

/**
 * Fusionne un nouvel ordre partiel avec l'ordre sauvegardé :
 * les éléments affichés passent devant, les autres gardent leur place après.
 */
export function mergeOrder(orderedIds, saved = []) {
  return [...orderedIds, ...saved.filter((id) => !orderedIds.includes(id))]
}

function rankOf(list, value) {
  const index = list.indexOf(value)
  return index === -1 ? UNRANKED : index
}

function hexLuminance(hex) {
  const value = hex.replace('#', '')
  const [r, g, b] = [0, 2, 4].map(
    (i) => parseInt(value.slice(i, i + 2), 16) / 255,
  )
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Couleurs dominantes d'une catégorie.
 * - La couleur « noir » (défaut, aucune couleur choisie) ne compte pas.
 * - Si aucune couleur n'est choisie : blanc (NEUTRAL_GROUP_COLOR).
 * - Les couleurs les plus fréquentes sont retenues ; en cas d'égalité,
 *   elles sont toutes retenues et le bloc affiche un dégradé.
 */
export function getDominantColors(tasks) {
  const counts = new Map()

  tasks.forEach((task) => {
    if (!task.color || task.color === DEFAULT_TASK_COLOR) return
    counts.set(task.color, (counts.get(task.color) ?? 0) + 1)
  })

  if (counts.size === 0) return [NEUTRAL_GROUP_COLOR]

  const max = Math.max(...counts.values())

  return [...counts.entries()]
    .filter(([, count]) => count === max)
    .map(([id]) => getTaskColorPalette(id).primary)
}

/** Fond d'en-tête : couleur unie, ou dégradé si plusieurs dominantes. */
export function getGroupBackground(colors) {
  if (colors.length === 1) return colors[0]
  return `linear-gradient(90deg, ${colors.join(', ')})`
}

/** Couleur du texte : sombre sur fond clair, blanche sur fond foncé. */
export function getGroupInk(colors) {
  const average =
    colors.reduce((sum, color) => sum + hexLuminance(color), 0) /
    colors.length
  return average > 0.6 ? '#1A1400' : '#FFFFFF'
}

function getCategoryKey(task) {
  return TASK_CATEGORIES.some((category) => category.value === task.category)
    ? task.category
    : OTHER_KEY
}

/**
 * Construit les blocs à afficher.
 * Ordre des blocs : ordre sauvegardé, sinon ordre par défaut des catégories.
 * Ordre des tâches dans un bloc : ordre sauvegardé, sinon ordre d'ajout.
 */
export function buildTaskGroups(tasks, layout) {
  const categoryOrder = layout?.categoryOrder ?? []
  const taskOrder = layout?.taskOrder ?? {}
  const defaultOrder = TASK_CATEGORIES.map((category) => category.value)

  const byKey = new Map()

  tasks.forEach((task) => {
    const key = getCategoryKey(task)
    if (!byKey.has(key)) byKey.set(key, [])
    byKey.get(key).push(task)
  })

  return [...byKey.keys()]
    .sort(
      (a, b) =>
        rankOf(categoryOrder, a) - rankOf(categoryOrder, b) ||
        rankOf(defaultOrder, a) - rankOf(defaultOrder, b),
    )
    .map((key) => {
      const items = byKey.get(key)
      const saved = taskOrder[key] ?? []

      const sorted = [...items].sort(
        (a, b) =>
          rankOf(saved, a.id) - rankOf(saved, b.id) ||
          (a.order ?? 0) - (b.order ?? 0),
      )

      return {
        id: key,
        label: key === OTHER_KEY ? 'Autre' : getCategoryLabel(key),
        tasks: sorted,
        colors: getDominantColors(items),
      }
    })
}

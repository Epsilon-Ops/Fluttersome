/* =========================================================
   useTaskLayout — ordre des blocs et des tâches, sauvegardé
   dans le navigateur pour survivre à la fermeture de l'appli.
   ========================================================= */

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  TASK_LAYOUT_STORAGE_KEY,
  mergeOrder,
} from '../utils/taskGroups'

const EMPTY_LAYOUT = { categoryOrder: [], taskOrder: {} }

function readLayout() {
  try {
    const stored = JSON.parse(
      localStorage.getItem(TASK_LAYOUT_STORAGE_KEY),
    )

    if (!stored || typeof stored !== 'object') {
      return EMPTY_LAYOUT
    }

    return {
      categoryOrder: Array.isArray(stored.categoryOrder)
        ? stored.categoryOrder
        : [],
      taskOrder:
        stored.taskOrder && typeof stored.taskOrder === 'object'
          ? stored.taskOrder
          : {},
    }
  } catch {
    return EMPTY_LAYOUT
  }
}

export default function useTaskLayout() {
  const [layout, setLayout] = useState(readLayout)

  useEffect(() => {
    try {
      localStorage.setItem(
        TASK_LAYOUT_STORAGE_KEY,
        JSON.stringify(layout),
      )
    } catch {
      // Stockage indisponible : l'ordre reste actif pendant la session.
    }
  }, [layout])

  // Nouvel ordre des blocs (liste d'identifiants de catégories)
  const setCategoryOrder = useCallback((orderedIds) => {
    setLayout((current) => ({
      ...current,
      categoryOrder: mergeOrder(orderedIds, current.categoryOrder),
    }))
  }, [])

  // Nouvel ordre des tâches d'un bloc donné
  const setTaskOrder = useCallback((category, orderedIds) => {
    setLayout((current) => ({
      ...current,
      taskOrder: {
        ...current.taskOrder,
        [category]: mergeOrder(
          orderedIds,
          current.taskOrder[category] ?? [],
        ),
      },
    }))
  }, [])

  return useMemo(
    () => ({ layout, setCategoryOrder, setTaskOrder }),
    [layout, setCategoryOrder, setTaskOrder],
  )
}

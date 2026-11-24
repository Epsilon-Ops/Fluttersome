import { useCallback, useEffect, useState } from 'react'
import {
  createTaskData,
  createTaskId,
  getCompletionKey,
  hasPeriods,
  rewardTaskXp,
  setAllPeriods,
  setPeriodChecked,
  sortTasksByManualOrder,
} from '../utils/taskHelpers'
import {
  applyCounterDelta,
  createTimerState,
  getCounterGoal,
  getTimerConfig,
  isCounterBehavior,
  isTimerBehavior,
  normalizeTask,
  syncTimerCompletion,
  advanceTimer,
} from '../utils/recurrenceHelpers'

export const STORAGE_KEY = 'epsilon-tasks-v1'

function readTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (!stored) {
      return []
    }

    const parsed = JSON.parse(stored)

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(
      (task) =>
        task &&
        typeof task.id === 'string' &&
        typeof task.title === 'string',
    )
  } catch {
    return []
  }
}

/**
 * Applique remise à zéro par période et avancement des timers.
 * Renvoie le même tableau si rien n'a changé (évite les rendus inutiles).
 */
function refreshTasks(list, now = new Date()) {
  let changed = false

  const next = list.map((task) => {
    const updated = normalizeTask(task, now)

    if (updated !== task) {
      changed = true
    }

    return updated
  })

  return changed ? next : list
}

export default function useTasks() {
  const [tasks, setTasks] = useState(() => refreshTasks(readTasks()))
  const [storageError, setStorageError] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
      setStorageError('')
    } catch {
      setStorageError(
        'Impossible de sauvegarder les tâches sur cet appareil.',
      )
    }
  }, [tasks])

  // Vérifie chaque seconde les changements de période et les timers
  useEffect(() => {
    const tick = () => setTasks((current) => refreshTasks(current))

    tick()

    const intervalId = window.setInterval(tick, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  // Met à jour une tâche. Toute transition vers « terminée » rapporte des XP
  // (une seule fois par période, voir rewardTaskXp). Les tâches à périodes
  // gèrent leurs propres récompenses.
  const updateOne = useCallback((id, updater) => {
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== id) return task

        const base = normalizeTask(task, new Date())
        const next = updater(base)

        if (!base.completed && next.completed && !hasPeriods(next)) {
          return rewardTaskXp(next, getCompletionKey(next))
        }

        return next
      }),
    )
  }, [])

  const addTask = useCallback((values) => {
    const task = createTaskData(values)

    if (!task.title) {
      return null
    }

    setTasks((current) => [
      ...current,
      {
        ...task,
        order: current.length,
      },
    ])

    return task.id
  }, [])

  const updateTask = useCallback((id, values) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? createTaskData(values, task)
          : task,
      ),
    )
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks((current) =>
      current.filter((task) => task.id !== id),
    )
  }, [])

  // Suppression groupée : une seule mise à jour (et une seule sauvegarde)
  const deleteTasks = useCallback((ids) => {
    const toDelete = new Set(ids)
    setTasks((current) =>
      current.filter((task) => !toDelete.has(task.id)),
    )
  }, [])

  const toggleTaskCompleted = useCallback(
    (id) => {
      updateOne(id, (task) => {
        const now = new Date()
        const nowIso = now.toISOString()

        // Tâche à périodes : la case coche ou décoche toutes les périodes
        if (hasPeriods(task)) {
          return setAllPeriods(task, !task.completed, now)
        }

        // Décocher : pour un timer, la progression repart de zéro
        if (task.completed) {
          const reset = {
            ...task,
            completed: false,
            completedAt: null,
            updatedAt: nowIso,
          }

          if (isTimerBehavior(task)) {
            reset.timer = createTimerState()
          }

          if (isCounterBehavior(task)) {
            reset.counterValue = Math.max(
              0,
              Math.min(
                Number(task.counterValue) || 0,
                getCounterGoal(task) - 1,
              ),
            )
          }

          return reset
        }

        // Cocher : complète la tâche manuellement
        const next = {
          ...task,
          completed: true,
          completedAt: nowIso,
          updatedAt: nowIso,
        }

        if (isTimerBehavior(task)) {
          next.timer = {
            ...createTimerState(),
            repsDone: getTimerConfig(task).repeatCount,
          }
        }

        if (isCounterBehavior(task)) {
          next.counterValue = Math.max(
            getCounterGoal(task),
            Number(task.counterValue) || 0,
          )
        }

        return next
      })
    },
    [updateOne],
  )

  // Coche ou décoche une période (matin, aprem, soir) d'une tâche
  const togglePeriod = useCallback(
    (id, period) => {
      updateOne(id, (task) => setPeriodChecked(task, period, new Date()))
    },
    [updateOne],
  )

  const changeCounter = useCallback(
    (id, delta) => {
      updateOne(id, (task) =>
        isCounterBehavior(task)
          ? applyCounterDelta(task, delta, new Date())
          : task,
      )
    },
    [updateOne],
  )

  /**
   * Actions du timer : start, pause, add (secondes ajoutées),
   * complete (terminer à la main), reset.
   */
  const timerAction = useCallback(
    (id, action, seconds = 0) => {
      updateOne(id, (task) => {
        if (!isTimerBehavior(task)) return task

        const nowMs = Date.now()
        const nowIso = new Date(nowMs).toISOString()
        const config = getTimerConfig(task)
        let timer = { ...createTimerState(), ...(task.timer ?? {}) }

        // Banque le temps écoulé de la répétition en cours
        const bank = (state) =>
          state.runningSince !== null
            ? {
                ...state,
                elapsedSec:
                  state.elapsedSec +
                  Math.max(0, (nowMs - state.runningSince) / 1000),
                runningSince: nowMs,
              }
            : state

        if (action === 'reset') {
          return {
            ...task,
            timer: createTimerState(),
            completed: false,
            completedAt: null,
            updatedAt: nowIso,
          }
        }

        if (action === 'complete') {
          timer = {
            ...createTimerState(),
            repsDone: config.repeatCount,
          }
        }

        if (action === 'start') {
          if (
            timer.phase === 'work' &&
            timer.runningSince === null &&
            !task.completed
          ) {
            timer = { ...timer, runningSince: nowMs }
          }
        }

        if (action === 'pause') {
          timer = bank(timer)
          timer = { ...timer, runningSince: null }
        }

        if (action === 'add' && timer.phase === 'work') {
          timer = bank(timer)
          timer = {
            ...timer,
            elapsedSec: timer.elapsedSec + seconds,
          }
        }

        const next = advanceTimer(
          { ...task, timer, updatedAt: nowIso },
          nowMs,
        )

        return syncTimerCompletion(next, nowMs)
      })
    },
    [updateOne],
  )

  const toggleSubtask = useCallback(
    (taskId, subtaskId) => {
      setTasks((current) =>
        current.map((task) => {
          if (task.id !== taskId) {
            return task
          }

          return {
            ...task,
            updatedAt: new Date().toISOString(),
            subtasks: task.subtasks.map((subtask) =>
              subtask.id === subtaskId
                ? {
                    ...subtask,
                    completed: !subtask.completed,
                  }
                : subtask,
            ),
          }
        }),
      )
    },
    [],
  )

  const reorderTasks = useCallback((orderedIds) => {
    setTasks((current) => {
      const positions = new Map(
        orderedIds.map((id, index) => [id, index]),
      )

      return current.map((task) => ({
        ...task,
        order: positions.has(task.id)
          ? positions.get(task.id)
          : task.order,
      }))
    })
  }, [])

  return {
    tasks: sortTasksByManualOrder(tasks),
    storageError,
    addTask,
    updateTask,
    deleteTask,
    deleteTasks,
    toggleTaskCompleted,
    togglePeriod,
    changeCounter,
    timerAction,
    toggleSubtask,
    reorderTasks,
  }
}

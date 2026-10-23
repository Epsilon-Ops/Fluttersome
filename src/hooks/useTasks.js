import { useCallback, useEffect, useState } from 'react'
import {
  createTaskData,
  createTaskId,
  sortTasksByManualOrder,
} from '../utils/taskHelpers'

const STORAGE_KEY = 'epsilon-tasks-v1'

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

export default function useTasks() {
  const [tasks, setTasks] = useState(readTasks)
  const [storageError, setStorageError] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks),
      )
      setStorageError('')
    } catch {
      setStorageError(
        'Impossible de sauvegarder les tâches sur cet appareil.',
      )
    }
  }, [tasks])

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

  const toggleTaskCompleted = useCallback((id) => {
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== id) {
          return task
        }

        const completed = !task.completed

        return {
          ...task,
          completed,
          completedAt: completed
            ? new Date().toISOString()
            : null,
          updatedAt: new Date().toISOString(),
        }
      }),
    )
  }, [])

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
    toggleTaskCompleted,
    toggleSubtask,
    reorderTasks,
  }
}
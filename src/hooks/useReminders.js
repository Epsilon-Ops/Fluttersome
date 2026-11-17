import { useEffect } from 'react'
import { loadSettings } from '../utils/settingsHelpers'
import { notify } from '../utils/notifications'
import {
  collectDueReminders,
  loadFired,
  saveFired,
} from '../utils/reminderHelpers'

const TASKS_KEY = 'epsilon-tasks-v1'

function readTasks() {
  try {
    const parsed = JSON.parse(localStorage.getItem(TASKS_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/* Vérifie toutes les 30 secondes si un rappel doit partir. */
export default function useReminders() {
  useEffect(() => {
    const check = () => {
      const settings = loadSettings()
      const { due, fired } = collectDueReminders({
        now: new Date(),
        settings,
        tasks: readTasks(),
        fired: loadFired(),
      })

      saveFired(fired)
      due.forEach((reminder) => notify(reminder.title, reminder.body))
    }

    check()
    const id = window.setInterval(check, 30000)

    return () => window.clearInterval(id)
  }, [])
}

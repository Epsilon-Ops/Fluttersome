/* =========================================================
   Logique pure des rappels : quels rappels doivent partir
   maintenant, sachant ce qui a déjà été envoyé aujourd'hui.
   ========================================================= */

export const FIRED_STORAGE_KEY = 'epsilon.reminders.fired.v1'

export function getLocalDateKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')

  return `${y}-${m}-${d}`
}

export function getHHMM(date = new Date()) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes(),
  ).padStart(2, '0')}`
}

export function loadFired() {
  try {
    const saved = JSON.parse(localStorage.getItem(FIRED_STORAGE_KEY) || '{}')
    return saved && typeof saved === 'object' ? saved : {}
  } catch {
    return {}
  }
}

export function saveFired(fired) {
  // On ne garde que les rappels d'aujourd'hui pour rester léger.
  const today = getLocalDateKey()
  const pruned = Object.fromEntries(
    Object.entries(fired).filter(([key]) => key.includes(today)),
  )

  try {
    localStorage.setItem(FIRED_STORAGE_KEY, JSON.stringify(pruned))
  } catch {
    // Stockage plein : le rappel pourra être renvoyé, sans gravité.
  }

  return pruned
}

/* Renvoie la liste des rappels à déclencher, en mettant à jour `fired`. */
export function collectDueReminders({
  now = new Date(),
  settings,
  tasks = [],
  fired = {},
}) {
  const today = getLocalDateKey(now)
  const hhmm = getHHMM(now)
  const due = []
  const next = { ...fired }

  const fireOnce = (key, payload) => {
    if (next[key]) return
    next[key] = true
    due.push(payload)
  }

  if (settings.reminders.tasks) {
    for (const task of tasks) {
      if (!task || task.completed || !task.due || !task.dueTime) continue
      if (task.reminderBefore === '' || task.reminderBefore == null) continue

      const dueAt = new Date(`${task.due}T${task.dueTime}:00`)
      if (Number.isNaN(dueAt.getTime())) continue

      const remindAt = new Date(
        dueAt.getTime() - Number(task.reminderBefore) * 60000,
      )

      if (now >= remindAt && now < dueAt) {
        fireOnce(`task:${task.id}:${task.due}:${task.dueTime}`, {
          title: 'Rappel de tâche',
          body: task.title,
        })
      }
    }
  }

  const { moodTime, bedtimeTime, hydrationMinutes } = settings.reminders

  if (moodTime && hhmm === moodTime) {
    fireOnce(`mood:${today}`, {
      title: 'Comment tu te sens ?',
      body: 'Prends une minute pour noter ton humeur.',
    })
  }

  if (bedtimeTime && hhmm === bedtimeTime) {
    fireOnce(`bedtime:${today}`, {
      title: 'Heure du coucher',
      body: 'Pense à te préparer pour une bonne nuit de sommeil.',
    })
  }

  const hour = now.getHours()

  if (hydrationMinutes > 0 && hour >= 8 && hour < 22) {
    const slot = Math.floor(
      (now.getHours() * 60 + now.getMinutes()) / hydrationMinutes,
    )
    fireOnce(`hydration:${today}:${slot}`, {
      title: 'Pense à boire',
      body: 'Un verre d’eau pour rester hydraté.',
    })
  }

  return { due, fired: next }
}

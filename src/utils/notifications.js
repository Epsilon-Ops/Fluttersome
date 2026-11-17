/* =========================================================
   Notifications, vibrations et bip sonore.
   Tout est facultatif : si le navigateur ne le permet pas,
   les fonctions ne font rien sans provoquer d'erreur.
   ========================================================= */

export function canNotify() {
  return typeof window !== 'undefined' && 'Notification' in window
}

export function getNotificationPermission() {
  return canNotify() ? Notification.permission : 'unsupported'
}

export async function requestNotificationPermission() {
  if (!canNotify()) return 'unsupported'
  if (Notification.permission !== 'default') return Notification.permission

  try {
    return await Notification.requestPermission()
  } catch {
    return 'denied'
  }
}

export function notify(title, body = '') {
  if (!canNotify() || Notification.permission !== 'granted') return false

  try {
    new Notification(title, { body, tag: `epsilon-${title}` })
    return true
  } catch {
    return false
  }
}

export function vibrate(pattern = [200, 100, 200]) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern)
  }
}

let audioContext = null

/* Trois bips courts : fin de chrono. */
export function playBeep() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return

    audioContext = audioContext || new Ctx()

    const start = audioContext.currentTime

    for (let index = 0; index < 3; index += 1) {
      const oscillator = audioContext.createOscillator()
      const gain = audioContext.createGain()

      oscillator.frequency.value = 880
      gain.gain.value = 0.15

      oscillator.connect(gain)
      gain.connect(audioContext.destination)

      oscillator.start(start + index * 0.35)
      oscillator.stop(start + index * 0.35 + 0.18)
    }
  } catch {
    // Son indisponible : on ignore.
  }
}

/* =========================================================
   Export et import de toutes les données de l'application.
   Toutes les clés de stockage de l'application commencent par
   « epsilon », ce qui permet de les sauvegarder sans en oublier.
   ========================================================= */

const APP_ID = 'epsilon'
const BACKUP_VERSION = 1

function getAppKeys() {
  const keys = []

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index)

    if (key && key.startsWith(APP_ID)) keys.push(key)
  }

  return keys.sort()
}

export function buildBackup() {
  const data = {}

  for (const key of getAppKeys()) {
    data[key] = localStorage.getItem(key)
  }

  return {
    app: APP_ID,
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data,
  }
}

export function downloadBackup() {
  const backup = buildBackup()
  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: 'application/json',
  })

  const stamp = new Date().toISOString().slice(0, 10)
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = `epsilon-sauvegarde-${stamp}.json`
  document.body.appendChild(link)
  link.click()
  link.remove()

  setTimeout(() => URL.revokeObjectURL(url), 1000)

  return Object.keys(backup.data).length
}

/* Vérifie puis restaure une sauvegarde. Renvoie le nombre de clés restaurées. */
export function restoreBackup(jsonText) {
  let parsed

  try {
    parsed = JSON.parse(jsonText)
  } catch {
    throw new Error('Ce fichier n’est pas un JSON valide.')
  }

  if (!parsed || parsed.app !== APP_ID || typeof parsed.data !== 'object') {
    throw new Error('Ce fichier ne correspond pas à une sauvegarde EPSILON.')
  }

  const entries = Object.entries(parsed.data).filter(
    ([key, value]) =>
      key.startsWith(APP_ID) && (typeof value === 'string' || value === null),
  )

  if (entries.length === 0) {
    throw new Error('La sauvegarde ne contient aucune donnée.')
  }

  for (const [key, value] of entries) {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, value)
  }

  return entries.length
}

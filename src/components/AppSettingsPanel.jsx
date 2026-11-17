import { useRef, useState } from 'react'
import { downloadBackup, restoreBackup } from '../utils/backupHelpers'
import { loadSettings, updateSettings } from '../utils/settingsHelpers'
import { requestNotificationPermission, getNotificationPermission } from '../utils/notifications'

/* Sauvegarde, objectifs nutritionnels et rappels. */
export default function AppSettingsPanel() {
  const fileRef = useRef(null)
  const [settings, setSettings] = useState(() => loadSettings())
  const [message, setMessage] = useState('')
  const [permission, setPermission] = useState(() => getNotificationPermission())

  function save(patch) {
    setSettings(updateSettings(patch))
  }

  function handleExport() {
    const count = downloadBackup()
    setMessage(`Sauvegarde téléchargée (${count} jeux de données).`)
  }

  async function handleImport(event) {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const count = restoreBackup(text)
      setMessage(`${count} éléments restaurés. Rechargement…`)
      setTimeout(() => window.location.reload(), 600)
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function enableNotifications() {
    setPermission(await requestNotificationPermission())
  }

  return (
    <section className="panel app-settings">
      <span className="eyebrow">RÉGLAGES</span>
      <h3>Sauvegarde et objectifs</h3>

      <div className="app-settings__group">
        <strong>Données</strong>
        <p>Tes données sont stockées sur cet appareil. Exporte une sauvegarde régulièrement.</p>
        <div className="app-settings__row">
          <button type="button" onClick={handleExport}>Exporter</button>
          <button type="button" onClick={() => fileRef.current?.click()}>Importer</button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={handleImport} />
        </div>
      </div>

      <div className="app-settings__group">
        <strong>Objectifs nutritionnels</strong>
        <div className="app-settings__row">
          <label>Kcal jour d’entraînement
            <input type="number" value={settings.nutrition.kcalTraining}
              onChange={(e) => save({ nutrition: { kcalTraining: Number(e.target.value) } })} />
          </label>
          <label>Kcal jour de repos
            <input type="number" value={settings.nutrition.kcalRest}
              onChange={(e) => save({ nutrition: { kcalRest: Number(e.target.value) } })} />
          </label>
          <label>Protéines (g)
            <input type="number" value={settings.nutrition.protein}
              onChange={(e) => save({ nutrition: { protein: Number(e.target.value) } })} />
          </label>
        </div>
      </div>

      <div className="app-settings__group">
        <strong>Rappels</strong>
        <p>Notifications : {permission === 'granted' ? 'activées' : permission === 'unsupported' ? 'non supportées ici' : 'non activées'}</p>
        {permission === 'default' && (
          <button type="button" onClick={enableNotifications}>Autoriser les notifications</button>
        )}
        <div className="app-settings__row">
          <label>Humeur à
            <input type="time" value={settings.reminders.moodTime}
              onChange={(e) => save({ reminders: { moodTime: e.target.value } })} />
          </label>
          <label>Coucher à
            <input type="time" value={settings.reminders.bedtimeTime}
              onChange={(e) => save({ reminders: { bedtimeTime: e.target.value } })} />
          </label>
          <label>Eau toutes les (min, 0 = off)
            <input type="number" min="0" value={settings.reminders.hydrationMinutes}
              onChange={(e) => save({ reminders: { hydrationMinutes: Number(e.target.value) } })} />
          </label>
        </div>
      </div>

      {message && <p role="status" className="app-settings__message">{message}</p>}
    </section>
  )
}

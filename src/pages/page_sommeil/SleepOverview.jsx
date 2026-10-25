
import { useMemo } from 'react'
import {
  getSleepDuration,
  getSleepMetrics,
} from '../../utils/sleepHelpers'

function formatDuration(minutes) {
  if (minutes == null) return '—'

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (remainingMinutes === 0) return `${hours} h`

  return `${hours} h ${String(remainingMinutes).padStart(2, '0')} min`
}

export default function SleepOverview({
  nights,
  sleepTargetMinutes,
  onSleepTargetChange,
}) {
  const metrics = useMemo(
    () => getSleepMetrics(nights),
    [nights],
  )

  const latestNight = nights[0] ?? null

  const duration = latestNight
    ? getSleepDuration(latestNight.fallAsleep, latestNight.wakeTime)
    : null

  return (
    <div className="sleep-overview">
      <section className="panel sleep-main-card">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">DERNIÈRE NUIT</span>
            <h3>Ton sommeil</h3>
          </div>
        </div>

        {latestNight ? (
          <>
            <div className="sleep-duration-display">
              {formatDuration(duration)}
            </div>

            <p className="welcome-description">
              Qualité ressentie : {latestNight.quality}/10
            </p>

            <div className="sleep-night-details">
              <span>Coucher : {latestNight.bedtime}</span>
              <span>Endormissement : {latestNight.fallAsleep}</span>
              <span>Réveil : {latestNight.wakeTime}</span>
            </div>
          </>
        ) : (
          <p className="welcome-description">
            Aucune nuit enregistrée pour le moment. Ajoute ta première nuit
            pour commencer à suivre tes habitudes.
          </p>
        )}
      </section>

      <div className="sleep-metric-grid">
        <article className="sleep-metric-card">
          <span className="eyebrow">MOYENNE · 7 JOURS</span>
          <strong>{formatDuration(metrics.averageDuration)}</strong>
          <span>{metrics.nightCount} nuit(s) renseignée(s)</span>
        </article>

        <article className="sleep-metric-card">
          <span className="eyebrow">QUALITÉ MOYENNE</span>
          <strong>
            {metrics.averageQuality == null
              ? '—'
              : `${metrics.averageQuality}/10`}
          </strong>
          <span>Sur les 7 derniers jours</span>
        </article>
      </div>

      <section className="panel sleep-target-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">TON OBJECTIF</span>
            <h3>Durée de sommeil visée</h3>
          </div>
        </div>

        <p className="welcome-description">
          Choisis la durée que tu souhaites viser chaque nuit.
        </p>

        <label className="sleep-field" htmlFor="sleep-target">
          <span>Objectif quotidien (heures)</span>
          <input
            id="sleep-target"
            type="number"
            min="4"
            max="12"
            step="0.25"
            value={sleepTargetMinutes / 60}
            onChange={(event) => {
              const hours = Number(event.target.value)

              if (Number.isFinite(hours)) {
                onSleepTargetChange(Math.round(hours * 60))
              }
            }}
          />
        </label>

        <p className="sleep-target-summary">
          Objectif actuel : <strong>{formatDuration(sleepTargetMinutes)}</strong>
        </p>
      </section>
    </div>
  )
}

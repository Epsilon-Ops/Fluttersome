import { useMemo } from 'react'
import { analyzeRecovery } from '../../services/coach/analysis/analyzeRecovery'
import { formatSleepDuration } from '../../utils/sleepHelpers'

export default function SleepRecoveryCard({ nights, sleepTargetMinutes }) {
  const recovery = useMemo(
    () => analyzeRecovery({ sleepNights: nights, sleepTargetMinutes, now: new Date() }),
    [nights, sleepTargetMinutes],
  )

  return (
    <section className="panel sleep-readiness-placeholder">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">RÉCUPÉRATION</span>
          <h3>Récupération sur 7 jours</h3>
        </div>
        {recovery.available && (
          <span className="sleep-coming-soon">Score {recovery.score}/100 · {recovery.label}</span>
        )}
      </div>

      {!recovery.available ? (
        <p className="welcome-description">{recovery.message}</p>
      ) : (
        <>
          <ul className="sleep-recovery-stats">
            <li><span>Durée moyenne</span><strong>{formatSleepDuration(recovery.avgDurationMinutes)}</strong></li>
            <li><span>Cible</span><strong>{formatSleepDuration(recovery.targetMinutes)}</strong></li>
            <li><span>Qualité moyenne</span><strong>{recovery.avgQuality ?? '—'}/10</strong></li>
            <li>
              <span>Dette cumulée</span>
              <strong>{recovery.debtMinutes > 0 ? formatSleepDuration(recovery.debtMinutes) : 'aucune'}</strong>
            </li>
            <li>
              <span>Régularité du coucher</span>
              <strong>
                {recovery.bedtimeSdMinutes === null
                  ? '—'
                  : `±${Math.round(recovery.bedtimeSdMinutes)} min`}
              </strong>
            </li>
          </ul>
          <p className="sleep-readiness-note">
            Score calculé à partir de la durée par rapport à ta cible, de la qualité déclarée et de la
            régularité de tes horaires. Repère indicatif, pas un diagnostic.
          </p>
        </>
      )}
    </section>
  )
}

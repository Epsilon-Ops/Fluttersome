import { formatSleepDuration } from '../../utils/sleepHelpers'
import '../../styles/main_pages/page_coach/diagnostics.css'

const LEVEL_LABELS = {
  positive: 'Bien',
  attention: 'À surveiller',
  info: 'Repère',
  insufficient: 'Données insuffisantes',
}

function DiagnosticBlock({ title, stats, findings }) {
  return (
    <section className="coach-diagnostics__block">
      <h3>{title}</h3>

      {stats.length > 0 && (
        <dl className="coach-diagnostics__stats">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <ul className="coach-diagnostics__list">
        {findings.map((finding) => (
          <li
            key={finding.id}
            className={`coach-diagnostics__item is-${finding.level}`}
          >
            <div className="coach-diagnostics__item-head">
              <strong>{finding.title}</strong>
              <span className="coach-diagnostics__pill">
                {LEVEL_LABELS[finding.level]}
              </span>
            </div>
            <p>{finding.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function CoachDiagnostics({ diagnostics }) {
  const { sleep, performance } = diagnostics

  const sleepStats = sleep.available
    ? [
        {
          label: 'Durée moyenne (7 j)',
          value: formatMinutes(sleep.averageDuration),
        },
        {
          label: 'Qualité ressentie',
          value:
            sleep.averageQuality === null
              ? '—'
              : `${sleep.averageQuality.toFixed(1)}/10`,
        },
      ]
    : []

  const performanceStats = [
    { label: 'Compétitions', value: String(performance.counts.competition) },
    { label: 'Entraînements', value: String(performance.counts.training) },
  ]

  return (
    <section className="coach-diagnostics panel">
      <div className="panel-header">
        <div>
          <span className="eyebrow">DIAGNOSTICS</span>
          <h2>Ce que ton sommeil et tes performances montrent</h2>
        </div>
      </div>

      <p className="coach-diagnostics__disclaimer">
        Repères statistiques à partir de tes saisies. Ce ne sont ni des
        diagnostics médicaux ni des décisions d’entraînement : en cas de doute,
        parle à ton entraîneur ou à un professionnel de santé.
      </p>

      <div className="coach-diagnostics__grid">
        <DiagnosticBlock
          title="Sommeil"
          stats={sleepStats}
          findings={sleep.findings}
        />

        <DiagnosticBlock
          title="Performances"
          stats={performanceStats}
          findings={performance.findings}
        />
      </div>
    </section>
  )
}

function formatMinutes(minutes) {
  return minutes === null ? '—' : formatSleepDuration(Math.round(minutes))
}

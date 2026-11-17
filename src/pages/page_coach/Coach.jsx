import CollapsibleSection from '../../components/CollapsibleSection'
import { useMemo } from 'react'
import { AppIcon } from '../../components/icons/icon-utils/index'

import CoachDiagnostics from './CoachDiagnostics'
import CoachSummary from './CoachSummary'
import CoachAlerts from './CoachAlerts'
import CoachChat from './CoachChat'
import DecisionComparison from './DecisionComparison'
import PerformanceAnalysis from './PerformanceAnalysis'
import ProgressionTrends from './ProgressionTrends'
import ReadinessBreakdown from './ReadinessBreakdown'
import ReadinessCard from './ReadinessCard'
import SessionDecision from './SessionDecision'

import { runCoachAnalysis } from '../../services/coach/runCoachAnalysis'
import { COACH_QUESTIONS } from '../../services/coach/questions/coachQuestions'
import '../../styles/main_pages/page_coach/index.css'

function buildProgression(performance) {
  const main = performance.main
  if (!main?.comparison) return {}

  const { recentAvg, previousAvg, diffPct } = main.comparison
  const direction = diffPct < -0.3 ? 'plus rapide' : diffPct > 0.3 ? 'plus lent' : 'similaire'

  return {
    currentPeriod: { label: `90 derniers jours · ${main.label}` },
    previousPeriod: { label: `90 jours précédents · ${main.label}` },
    comparison: {
      summary: `Ta moyenne récente (${recentAvg.toFixed(2)} s) est ${direction} que la période précédente (${previousAvg.toFixed(2)} s), soit ${diffPct > 0 ? '+' : ''}${diffPct.toFixed(1)} %.`,
      limitations: 'Comparaison de moyennes sur peu de chronos : elle reste indicative.',
    },
  }
}

export default function Coach() {
  const analysis = useMemo(() => runCoachAnalysis(new Date()), [])

  const { context, readiness, alerts, decision, summary, performance, diagnostics } = analysis

  const progression = buildProgression(performance)

  const answerFor = (id) => {
    const question = COACH_QUESTIONS.find((item) => item.id === id)
    return question ? question.answer(analysis) : ''
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <span className="eyebrow">ACCOMPAGNEMENT</span>
          <h1>Coach</h1>
          <p className="page-description">
            Une analyse calculée à partir de tes sommeils, de tes séances, de tes chronos,
            de ton humeur et de ta nutrition. Aucun diagnostic médical.
          </p>
        </div>

        <div className="metric-icon" style={{ color: '#45566D' }}>
          <AppIcon name="sparkles" size={24} />
        </div>
      </div>

      <div className="coach-dashboard">
        <CoachSummary summary={summary.summary} priorities={summary.priorities} />

        <ReadinessCard
          score={readiness.score}
          status={readiness.status}
          reliability={readiness.reliability}
          explanation={readiness.explanation}
        />

        <CollapsibleSection id="readiness-breakdown" title="Facteurs du score" summary={readiness.score !== null ? `${readiness.score}/100` : 'indisponible'} defaultOpen={false}><ReadinessBreakdown breakdown={readiness.breakdown} /></CollapsibleSection>

        <CoachAlerts alerts={alerts} />

        <CollapsibleSection id="diagnostics" title="Repères statistiques" defaultOpen={false}><CoachDiagnostics diagnostics={diagnostics} /></CollapsibleSection>

        <CollapsibleSection id="session-decision" title="Décision du jour" defaultOpen={true}><SessionDecision
          session={decision.session}
          recommendation={decision.recommendation}
          rationale={decision.rationale}
        /></CollapsibleSection>

        <CollapsibleSection id="decision-options" title="Trois options" defaultOpen={false}><DecisionComparison
          options={decision.options}
          selectedOption={decision.selected}
        /></CollapsibleSection>

        <CollapsibleSection id="performance-analysis" title="Analyse des performances" summary={`${context.performances.length} performance(s)`} defaultOpen={false}><PerformanceAnalysis performances={context.performances} /></CollapsibleSection>

        <CollapsibleSection id="progression" title="Ta progression" defaultOpen={false}><ProgressionTrends {...progression} /></CollapsibleSection>

        <CoachChat questions={COACH_QUESTIONS} getAnswer={answerFor} />
      </div>
    </section>
  )
}

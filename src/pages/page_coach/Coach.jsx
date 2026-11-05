
import { useMemo } from 'react'
import { AppIcon } from '../../components/icons/icon-utils/index'
import CoachDiagnostics from './CoachDiagnostics'
import { buildDiagnostics } from '../../services/coach/diagnostics/buildDiagnostics'

import CoachSummary from './CoachSummary'
import CoachAlerts from './CoachAlerts'
import CoachChat from './CoachChat'
import DecisionComparison from './DecisionComparison'
import PerformanceAnalysis from './PerformanceAnalysis'
import ProgressionTrends from './ProgressionTrends'
import ReadinessBreakdown from './ReadinessBreakdown'
import ReadinessCard from './ReadinessCard'
import SessionDecision from './SessionDecision'

import useCoachReadiness from '../../hooks/useCoachReadiness'
import '../../styles/main_pages/page_coach/index.css'

// Résume les repères en quelques phrases pour le chat du coach
function summarizeFindings(findings, emptyText) {
  const useful = findings.filter((finding) => finding.level !== 'insufficient')

  if (useful.length === 0) return findings[0]?.detail ?? emptyText

  return useful
    .slice(0, 3)
    .map((finding) => finding.detail)
    .join(' ')
}

export default function Coach() {
  const coachData = useCoachReadiness()

  const diagnostics = useMemo(
    () =>
      buildDiagnostics({
        nights: coachData.allNights,
        performances: coachData.allPerformances,
        sleepTargetMinutes: coachData.sleep.targetMinutes,
      }),
    [coachData.allNights, coachData.allPerformances, coachData.sleep.targetMinutes],
  )

  const {
    sleep,
    bodyFeelings,
    performances,
    status,
    score,
    reliability,
    explanation,
  } = coachData

  const recentPain = bodyFeelings.recent.filter(
    (feeling) => feeling.sensationType === 'pain',
  )

  const alerts = recentPain.map((feeling) => ({
    id: feeling.id,
    level: feeling.intensity >= 7 ? 'warning' : 'info',
    title: 'Douleur signalée',
    message: `${feeling.bodyPart} — intensité ${feeling.intensity}/10.`,
    recommendation:
      'Évite de forcer sur une zone douloureuse et demande conseil à un adulte de confiance ou à un professionnel de santé si la douleur est forte, inhabituelle ou persistante.',
  }))

  const priorities = []

  if (!sleep.available) {
    priorities.push('Enregistrer une nuit de sommeil pour enrichir le suivi.')
  }

  if (!bodyFeelings.available) {
    priorities.push('Ajouter une observation corporelle si tu ressens quelque chose à noter.')
  }

  if (!performances.available) {
    priorities.push('Enregistrer des performances pour permettre leur analyse.')
  }

  const summary =
    sleep.available || bodyFeelings.available || performances.available
      ? 'Les données disponibles sont regroupées ci-dessous. Elles permettent de consulter le suivi, mais ne suffisent pas à elles seules à établir un diagnostic ou un score de préparation validé.'
      : 'Les données de sommeil, de ressenti corporel et de performance apparaîtront ici au fur et à mesure de leur enregistrement.'

  const answers = {
    readiness: explanation,
    session:
      'Aucune décision automatique n’est prise. Vérifie les sensations corporelles, la récupération et les objectifs de la séance avec ton entraîneur.',
    performance: summarizeFindings(
      diagnostics.performance.findings,
      'Aucune performance exploitable pour l’instant.',
    ),
    recovery: summarizeFindings(
      diagnostics.sleep.findings,
      'Enregistre tes nuits pour que le coach puisse examiner ta récupération. Une douleur forte ou inhabituelle mérite une attention particulière, indépendamment de tout repère.',
    ),
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <span className="eyebrow">ACCOMPAGNEMENT</span>
          <h1>Coach</h1>
          <p className="page-description">
            Tes données de sommeil, tes sensations corporelles et tes
            performances réunies pour suivre ta progression.
          </p>
        </div>

        <div className="metric-icon" style={{ color: '#45566D' }}>
          <AppIcon name="sparkles" size={24} />
        </div>
      </div>

      <div className="coach-dashboard">
        <CoachSummary summary={summary} priorities={priorities} />

        <ReadinessCard
          score={score}
          status={status}
          reliability={reliability}
          explanation={explanation}
        />

        <ReadinessBreakdown breakdown={{}} />

        <CoachAlerts alerts={alerts} />

        <CoachDiagnostics diagnostics={diagnostics} />

        <SessionDecision
          rationale="La décision doit tenir compte du programme prévu, du ressenti personnel et des conseils de l’entraîneur."
        />

        <DecisionComparison />

        <PerformanceAnalysis
          performances={performances.recent}
        />

        <ProgressionTrends />

        <CoachChat answers={answers} />
      </div>
    </section>
  )
}

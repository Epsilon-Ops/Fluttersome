
import { useMemo } from 'react'

import { AppIcon } from '../components/icons/icon-utils/index.jsx'
import StatCard from '../components/StatCard'

import useSleep from '../hooks/useSleep'
import usePerformances from '../hooks/usePerformances'
import useBodyFeelings from '../hooks/useBodyFeelings'

import { formatSleepDuration } from '../utils/sleepHelpers'
import { getAthleteDashboardData } from '../services/athleteData'

function formatPerformanceTime(time) {
  const value = Number(time)

  return Number.isFinite(value) && value > 0
    ? `${value.toFixed(2)} s`
    : '—'
}

function formatDate(date) {
  if (!date) return ''

  const parsed = new Date(`${date}T12:00:00`)

  if (Number.isNaN(parsed.getTime())) return ''

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parsed)
}

export default function Dashboard({ onNavigate }) {
  const { nights } = useSleep()
  const { performances } = usePerformances()
  const { feelings } = useBodyFeelings()

  const data = useMemo(
    () =>
      getAthleteDashboardData({
        nights,
        performances,
        feelings,
      }),
    [nights, performances, feelings],
  )

  const today = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <section className="dashboard-home">
      <header className="dashboard-welcome">
        <div className="dashboard-welcome__content">
          <span className="eyebrow">TON ESPACE ATHLÈTE</span>
          <h1>Bienvenue sur EPSILON</h1>
          <p>
            Retrouve ici les repères essentiels de ton suivi
            sportif et de ta progression.
          </p>
          <span className="dashboard-welcome__date">{today}</span>
        </div>

        <div
          className="dashboard-welcome__icon"
          aria-hidden="true"
        >
          <AppIcon name="sparkles" size={30} />
        </div>
      </header>

      <section className="dashboard-home__section">
        <div className="dashboard-home__section-heading">
          <div>
            <span className="eyebrow">VUE D’ENSEMBLE</span>
            <h2>Tes indicateurs</h2>
          </div>
          <p>Basés sur les données enregistrées</p>
        </div>

        <div className="dashboard-home__metrics">
          <StatCard
            title="Sommeil"
            value={
              data.sleep.available
                ? formatSleepDuration(data.sleep.durationMinutes)
                : '—'
            }
            subtitle={
              data.sleep.latestNight
                ? `Nuit du ${formatDate(data.sleep.latestNight.date)}`
                : 'Aucune nuit enregistrée'
            }
            icon="moon"
            accent="#8B7BD8"
            onClick={
              onNavigate
                ? () => onNavigate('sleep')
                : undefined
            }
          />

          <StatCard
            title="Dernier chrono"
            value={
              data.performance.available
                ? formatPerformanceTime(data.performance.latest.time)
                : '—'
            }
            subtitle={
              data.performance.latest
                ? `${data.performance.distanceLabel} · ${formatDate(data.performance.latest.date)}`
                : 'Aucune performance enregistrée'
            }
            icon="timer"
            accent="#4785C5"
            onClick={
              onNavigate
                ? () => onNavigate('competitions')
                : undefined
            }
          />

          <StatCard
            title="Ressenti corporel"
            value={
              data.bodyFeeling.available
                ? `${data.bodyFeeling.latest.intensity}/10`
                : '—'
            }
            subtitle={
              data.bodyFeeling.latest
                ? `${data.bodyFeeling.latest.bodyPart} · ${data.bodyFeeling.latest.sensationType}`
                : 'Aucune observation enregistrée'
            }
            icon="activity"
            accent="#D08B45"
            onClick={
              onNavigate
                ? () => onNavigate('sleep')
                : undefined
            }
          />

          <StatCard
            title="Performances enregistrées"
            value={performances.length}
            subtitle="Toutes distances confondues"
            icon="chart-no-axes-combined"
            accent="#369B84"
            onClick={
              onNavigate
                ? () => onNavigate('competitions')
                : undefined
            }
          />
        </div>
      </section>

      <section className="dashboard-home__section">
        <div className="dashboard-home__section-heading">
          <div>
            <span className="eyebrow">NAVIGATION</span>
            <h2>Accès rapides</h2>
          </div>
          <p>Continue ton suivi</p>
        </div>

        <div className="dashboard-home__quick-links">
          {[
            {
              id: 'training',
              title: 'Entraînement',
              description: 'Retrouver tes séances',
              icon: 'footprints',
            },
            {
              id: 'strength',
              title: 'Musculation',
              description: 'Consulter ton suivi de force',
              icon: 'dumbbell',
            },
            {
              id: 'nutrition',
              title: 'Nutrition',
              description: 'Retrouver ton suivi alimentaire',
              icon: 'utensils',
            },
            {
              id: 'mood',
              title: 'Humeur',
              description: 'Consulter tes ressentis',
              icon: 'heart',
            },
            {
              id: 'tasks',
              title: 'Tâches',
              description: 'Organiser tes priorités',
              icon: 'list-check',
            },
            {
              id: 'coach',
              title: 'Coach',
              description: 'Consulter ta vue de suivi',
              icon: 'sparkles',
            },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              className="dashboard-home__quick-link"
              onClick={() => onNavigate?.(item.id)}
              disabled={!onNavigate}
            >
              <span className="dashboard-home__quick-icon">
                <AppIcon name={item.icon} size={21} />
              </span>

              <span className="dashboard-home__quick-text">
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </span>

              <AppIcon name="arrow-up-right" size={18} />
            </button>
          ))}
        </div>
      </section>

      <section className="dashboard-home__footer-note">
        <AppIcon name="info" size={19} />
        <p>
          Ces indicateurs résument les données que tu as enregistrées.
          Ils ne constituent pas un diagnostic médical ni une mesure
          validée de ton état de préparation.
        </p>
      </section>
    </section>
  )
}

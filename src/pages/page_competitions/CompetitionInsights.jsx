import { useMemo, useState } from 'react'
import {
  getForm,
  getRegularity,
  getGoalProgress,
  loadGoals,
  saveGoal,
} from '../../utils/competitionInsights'
import { formatRaceTime, parseRaceTime } from '../../utils/timeHelpers'
import { getDistanceLabel } from '../../utils/competitionHelpers'

function Empty({ message }) {
  return <p className="welcome-description">{message}</p>
}

function Stat({ label, value }) {
  return (
    <div className="competition-insight__stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function FormSection({ form }) {
  if (!form.available) return <Empty message={form.message} />

  const trendLabel = {
    progress: 'En progression : tes 3 derniers chronos sont meilleurs que les 3 précédents.',
    recul: 'En léger recul par rapport aux 3 chronos précédents.',
    stable: 'Forme stable sur tes derniers chronos.',
  }[form.trend]

  return (
    <>
      <div className="competition-insight__stats">
        <Stat label="Dernier chrono" value={formatRaceTime(form.last)} />
        <Stat label="Moyenne des 3 derniers" value={formatRaceTime(form.recentAvg)} />
        <Stat label="Record de la distance" value={formatRaceTime(form.best)} />
        <Stat
          label="Dernier vs record"
          value={`${form.lastVsBestPct >= 0 ? '+' : ''}${form.lastVsBestPct.toFixed(1)} %`}
        />
      </div>
      <p>{trendLabel}</p>
    </>
  )
}

function RegularitySection({ regularity }) {
  if (!regularity.available) return <Empty message={regularity.message} />

  const months = Object.entries(regularity.byMonth).slice(-6)

  return (
    <>
      <div className="competition-insight__stats">
        <Stat label="Chronos officiels" value={regularity.count} />
        <Stat label="Temps moyen" value={formatRaceTime(regularity.average)} />
        <Stat label="Variabilité" value={`${regularity.cv.toFixed(2)} %`} />
        <Stat label="Stabilité" value={regularity.stability} />
        <Stat
          label="Intervalle moyen"
          value={regularity.averageGapDays ? `${regularity.averageGapDays} j` : '—'}
        />
      </div>

      <h4 className="competition-insight__subtitle">Compétitions par mois (6 derniers mois affichés)</h4>
      <ul className="competition-insight__months">
        {months.map(([month, count]) => (
          <li key={month}>
            <span>{month}</span>
            <span className="competition-insight__bar" style={{ width: `${count * 28}px` }} />
            <strong>{count}</strong>
          </li>
        ))}
      </ul>
    </>
  )
}

function GoalsSection({ distance, officialPerformances }) {
  const [goals, setGoals] = useState(() => loadGoals())
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const goal = goals[distance]
  const progress = useMemo(
    () => getGoalProgress(officialPerformances, goal?.seconds),
    [officialPerformances, goal],
  )

  function handleSubmit(event) {
    event.preventDefault()
    const seconds = parseRaceTime(input)

    if (!seconds) {
      setError('Entre un temps valide, par exemple 10.72 ou 1:02.50.')
      return
    }

    setGoals(saveGoal(distance, seconds))
    setInput('')
    setError('')
  }

  function removeGoal() {
    setGoals(saveGoal(distance, null))
  }

  return (
    <>
      <form className="competition-insight__goal-form" onSubmit={handleSubmit}>
        <label>
          Objectif sur {getDistanceLabel(distance)}
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={goal ? `Actuel : ${formatRaceTime(goal.seconds)}` : 'Ex. 10.72'}
          />
        </label>
        <button type="submit">Enregistrer</button>
        {goal && (
          <button type="button" onClick={removeGoal}>Supprimer</button>
        )}
      </form>

      {error && <p className="competition-insight__error">{error}</p>}

      {!goal && <Empty message="Définis un temps cible pour suivre ton écart au record." />}

      {goal && !progress.available && (
        <Empty message="Enregistre un chrono officiel pour mesurer ta progression vers cet objectif." />
      )}

      {goal && progress.available && (
        <>
          <div className="competition-insight__stats">
            <Stat label="Objectif" value={formatRaceTime(progress.goal)} />
            <Stat label="Meilleur chrono" value={formatRaceTime(progress.best)} />
            <Stat
              label="Écart"
              value={progress.reached ? 'Objectif atteint' : `${progress.gap.toFixed(2)} s`}
            />
          </div>

          <div className="competition-insight__progress" aria-label={`${Math.round(progress.progress * 100)} % de l’objectif`}>
            <span style={{ width: `${Math.round(progress.progress * 100)}%` }} />
          </div>
          <p className="welcome-description">
            Progression vers l’objectif : {Math.round(progress.progress * 100)} %, calculée depuis ton premier
            chrono officiel enregistré sur cette distance.
          </p>
        </>
      )}
    </>
  )
}

export default function CompetitionInsights({ section, distance, officialPerformances = [] }) {
  const form = useMemo(() => getForm(officialPerformances), [officialPerformances])
  const regularity = useMemo(() => getRegularity(officialPerformances), [officialPerformances])

  const titles = {
    Forme: 'Forme récente',
    Régularité: 'Régularité',
    Objectifs: 'Objectifs',
  }

  return (
    <section className="panel competition-insight">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">ANALYSE SPORTIVE · {getDistanceLabel(distance)}</span>
          <h3>{titles[section]}</h3>
        </div>
      </div>

      {section === 'Forme' && <FormSection form={form} />}
      {section === 'Régularité' && <RegularitySection regularity={regularity} />}
      {section === 'Objectifs' && (
        <GoalsSection distance={distance} officialPerformances={officialPerformances} />
      )}

      <p className="competition-insight__note">
        Analyses calculées uniquement à partir des chronos officiels (compétitions chronométrées
        électroniquement, vent réglementaire). Ce ne sont pas des prédictions.
      </p>
    </section>
  )
}

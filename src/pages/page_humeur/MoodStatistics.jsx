
import { useMemo, useState } from 'react'
import MoodEmptyState from './MoodEmptyState'
import {
  getWeeklyMoodEntries,
  getMonthlyMoodEntries,
  getMoodMetrics,
} from '../../utils/moodHelpers'
import { getMoodById } from '../../constants/moods'
import {
  HappyMoodIcon,
  EnthusiasticMoodIcon,
  SereneMoodIcon,
  ProudMoodIcon,
  GratefulMoodIcon,
  AstonishedMoodIcon,
  AmazedMoodIcon,
  ConfusedMoodIcon,
  IntriguedMoodIcon,
  DeterminedMoodIcon,
  FocusedMoodIcon,
  ConfidentMoodIcon,
  InspiredMoodIcon,
  IrritatedMoodIcon,
  FrustratedMoodIcon,
  AnnoyedMoodIcon,
  OutragedMoodIcon,
  DisappointedMoodIcon,
  DiscouragedMoodIcon,
  MelancholicMoodIcon,
  LonelyMoodIcon,
} from '../../components/icons/icon-list/Mood-Icons'

const MOOD_ICONS = {
  happy: HappyMoodIcon,
  enthusiastic: EnthusiasticMoodIcon,
  serene: SereneMoodIcon,
  proud: ProudMoodIcon,
  grateful: GratefulMoodIcon,
  astonished: AstonishedMoodIcon,
  amazed: AmazedMoodIcon,
  confused: ConfusedMoodIcon,
  intrigued: IntriguedMoodIcon,
  determined: DeterminedMoodIcon,
  focused: FocusedMoodIcon,
  confident: ConfidentMoodIcon,
  inspired: InspiredMoodIcon,
  irritated: IrritatedMoodIcon,
  frustrated: FrustratedMoodIcon,
  annoyed: AnnoyedMoodIcon,
  outraged: OutragedMoodIcon,
  disappointed: DisappointedMoodIcon,
  discouraged: DiscouragedMoodIcon,
  melancholic: MelancholicMoodIcon,
  lonely: LonelyMoodIcon,
}

export default function MoodStatistics({ entries = [] }) {
  const [period, setPeriod] = useState('week')

  const filteredEntries = useMemo(() => {
    const referenceDate = new Date()

    if (period === 'month') {
      return getMonthlyMoodEntries(entries, referenceDate)
    }

    return getWeeklyMoodEntries(entries, referenceDate)
  }, [entries, period])

  const metrics = useMemo(
    () => getMoodMetrics(filteredEntries),
    [filteredEntries]
  )

  const moodBreakdown = useMemo(() => {
    const counts = {}

    filteredEntries.forEach((entry) => {
      counts[entry.moodId] = (counts[entry.moodId] || 0) + 1
    })

    return Object.entries(counts)
      .map(([moodId, count]) => ({
        mood: getMoodById(moodId),
        count,
      }))
      .filter((item) => item.mood)
      .sort((a, b) => b.count - a.count)
  }, [filteredEntries])

  if (filteredEntries.length === 0) {
    return (
      <div className="mood-statistics">
        <div
          className="mood-history__filters"
          role="group"
          aria-label="Période des statistiques"
        >
          <button
            type="button"
            className={`mood-history__filter ${
              period === 'week' ? 'is-active' : ''
            }`}
            aria-pressed={period === 'week'}
            onClick={() => setPeriod('week')}
          >
            7 derniers jours
          </button>

          <button
            type="button"
            className={`mood-history__filter ${
              period === 'month' ? 'is-active' : ''
            }`}
            aria-pressed={period === 'month'}
            onClick={() => setPeriod('month')}
          >
            Ce mois-ci
          </button>
        </div>

        <MoodEmptyState
          title="Pas encore de statistiques"
          description="Enregistre quelques émotions pour commencer à observer tes tendances."
        />
      </div>
    )
  }

  const frequentMood = metrics.mostFrequentMood
    ? getMoodById(metrics.mostFrequentMood.id)
    : null

  const FrequentIcon = frequentMood
    ? MOOD_ICONS[frequentMood.icon]
    : null

  return (
    <div className="mood-statistics">
      <div
        className="mood-history__filters"
        role="group"
        aria-label="Période des statistiques"
      >
        <button
          type="button"
          className={`mood-history__filter ${
            period === 'week' ? 'is-active' : ''
          }`}
          aria-pressed={period === 'week'}
          onClick={() => setPeriod('week')}
        >
          7 derniers jours
        </button>

        <button
          type="button"
          className={`mood-history__filter ${
            period === 'month' ? 'is-active' : ''
          }`}
          aria-pressed={period === 'month'}
          onClick={() => setPeriod('month')}
        >
          Ce mois-ci
        </button>
      </div>

      <div className="mood-statistics__grid">
        <article className="mood-stat-card">
          <span className="mood-stat-card__label">
            Émotions enregistrées
          </span>
          <strong className="mood-stat-card__value">
            {metrics.entryCount}
          </strong>
        </article>

        <article className="mood-stat-card">
          <span className="mood-stat-card__label">
            Valence moyenne
          </span>
          <strong className="mood-stat-card__value">
            {metrics.averageValence > 0 ? '+' : ''}
            {metrics.averageValence}
          </strong>
          <span className="mood-stat-card__hint">
            Sur une échelle de -5 à +5
          </span>
        </article>

        <article className="mood-stat-card">
          <span className="mood-stat-card__label">
            Intensité moyenne
          </span>
          <strong className="mood-stat-card__value">
            {metrics.averageIntensity}/5
          </strong>
        </article>

        <article className="mood-stat-card">
          <span className="mood-stat-card__label">
            Émotion la plus fréquente
          </span>

          {frequentMood && (
            <div className="mood-stat-card__frequent">
              {FrequentIcon && <FrequentIcon size={28} />}
              <strong className="mood-stat-card__value">
                {frequentMood.label}
              </strong>
              <span className="mood-stat-card__hint">
                {metrics.mostFrequentMood.count}{' '}
                {metrics.mostFrequentMood.count > 1
                  ? 'enregistrements'
                  : 'enregistrement'}
              </span>
            </div>
          )}
        </article>
      </div>

      <section className="mood-statistics__breakdown">
        <h3 className="mood-statistics__title">
          Répartition des émotions
        </h3>

        <div className="mood-statistics__mood-list">
          {moodBreakdown.map(({ mood, count }) => {
            const Icon = MOOD_ICONS[mood.icon]
            const percentage = Math.round(
              (count / filteredEntries.length) * 100
            )

            return (
              <div className="mood-statistics__mood" key={mood.id}>
                <div className="mood-statistics__mood-heading">
                  <span className="mood-statistics__mood-name">
                    {Icon && <Icon size={22} />}
                    {mood.label}
                  </span>

                  <span className="mood-statistics__mood-count">
                    {count} · {percentage} %
                  </span>
                </div>

                <div
                  className="mood-statistics__bar"
                  role="progressbar"
                  aria-label={`Fréquence de ${mood.label}`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={percentage}
                >
                  <div
                    className="mood-statistics__bar-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

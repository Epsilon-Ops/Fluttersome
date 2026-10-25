
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
import { getMoodCategory } from '../../constants/moods'

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

function formatDate(dateString) {
  if (!dateString) return 'Date inconnue'

  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return 'Date inconnue'
  }

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export default function MoodHistoryItem({ entry, onDelete }) {
  if (!entry) return null

  const category = getMoodCategory(entry.category)
  const Icon = MOOD_ICONS[entry.icon] || HappyMoodIcon
  const categoryColor =
    entry.categoryColor || category?.color || '#64748b'

  function handleDelete() {
    const confirmed = window.confirm(
      `Supprimer l’entrée « ${entry.moodLabel} » du ${formatDate(entry.date)} ?`
    )

    if (confirmed) {
      onDelete?.(entry.id)
    }
  }

  return (
    <article
      className="mood-history-item"
      style={{ '--mood-category-color': categoryColor }}
    >
      <div className="mood-history-item__icon" aria-hidden="true">
        <Icon size={28} />
      </div>

      <div className="mood-history-item__content">
        <div className="mood-history-item__header">
          <div>
            <h3 className="mood-history-item__title">
              {entry.moodLabel || 'Émotion'}
            </h3>

            <p className="mood-history-item__date">
              {formatDate(entry.date)}
              {entry.time ? ` · ${entry.time}` : ''}
            </p>
          </div>

          {category && (
            <span className="mood-history-item__category">
              {category.label}
            </span>
          )}
        </div>

        <div className="mood-history-item__metrics">
          <span className="mood-history-item__metric">
            Intensité : {entry.intensity}/5
          </span>

          <span className="mood-history-item__metric">
            Valence : {entry.valence > 0 ? '+' : ''}{entry.valence}
          </span>
        </div>

        {entry.note && (
          <p className="mood-history-item__note">
            {entry.note}
          </p>
        )}
      </div>

      {onDelete && (
        <button
          type="button"
          className="mood-history-item__delete"
          onClick={handleDelete}
          aria-label={`Supprimer l’entrée ${entry.moodLabel || 'émotion'}`}
          title="Supprimer cette entrée"
        >
          Supprimer
        </button>
      )}
    </article>
  )
}

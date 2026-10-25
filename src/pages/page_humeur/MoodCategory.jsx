
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

export default function MoodCategory({
  category,
  moods = [],
  selectedMoodId,
  onSelect,
}) {
  return (
    <section
      className="mood-category"
      style={{ '--mood-category-color': category.color }}
      aria-labelledby={`mood-category-${category.id}`}
    >
      <h4
        id={`mood-category-${category.id}`}
        className="mood-category__title"
      >
        <span className="mood-category__dot" aria-hidden="true" />
        {category.label}
      </h4>

      <div className="mood-category__list">
        {moods.map((mood) => {
          const isSelected = mood.id === selectedMoodId
          const Icon = MOOD_ICONS[mood.icon] || HappyMoodIcon

          return (
            <button
              key={mood.id}
              type="button"
              className={`mood-option ${isSelected ? 'is-selected' : ''}`}
              onClick={() => onSelect?.(mood)}
              aria-pressed={isSelected}
              style={{ '--mood-option-color': category.color }}
            >
              <span className="mood-option__icon">
                <Icon size={25} />
              </span>

              <span className="mood-option__label">
                {mood.label}
              </span>

              <span className="mood-option__score">
                {mood.valence > 0 ? '+' : ''}
                {mood.valence}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

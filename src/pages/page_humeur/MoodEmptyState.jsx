export default function MoodEmptyState({
  title = 'Pas encore de données',
  description = 'Tes entrées apparaîtront ici lorsque tu commenceras à suivre ton humeur.',
}) {
  return (
    <div className="mood-empty-state" role="status">
      <div className="mood-empty-state__icon" aria-hidden="true">
        <span>○</span>
      </div>

      <h3 className="mood-empty-state__title">{title}</h3>

      <p className="mood-empty-state__description">{description}</p>
    </div>
  )
}
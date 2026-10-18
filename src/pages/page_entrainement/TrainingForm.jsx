
import { sessionTypes, createEmptyBlock } from '../../utils/trainingHelpers'
import TrainingBlockForm from './TrainingBlockForm'

export default function TrainingForm({
  selectedDay,
  sessionType,
  sessionTitle,
  sessionNotes,
  blocks,
  rpe,
  error,
  editingSessionId,
  onChangeDay,
  onChangeType,
  onChangeTitle,
  onChangeNotes,
  onChangeRpe,
  onSubmit,
  onClose,
  onUpdateBlock,
  onAddBlock,
  onDuplicateBlock,
  onDeleteBlock,
}) {
  return (
    <section className="training-panel training-form-panel">
      <div className="training-panel-heading">
        <div>
          <span className="eyebrow">PLANIFICATION</span>

          <h2>
            {editingSessionId
              ? 'Modifier la séance'
              : 'Nouvelle séance'}
          </h2>
        </div>

        <button
          type="button"
          className="training-icon-button"
          onClick={onClose}
          aria-label="Fermer le formulaire"
        >
          ×
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <div className="training-form-grid">
          <div className="training-field">
            <label htmlFor="training-date">Date</label>

            <input
              id="training-date"
              type="date"
              value={selectedDay}
              onChange={(event) => onChangeDay(event.target.value)}
              required
            />
          </div>

          <div className="training-field">
            <label htmlFor="training-type">Type de séance</label>

            <select
              id="training-type"
              value={sessionType}
              onChange={(event) => onChangeType(event.target.value)}
              required
            >
              {sessionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="training-field training-field-full">
            <label htmlFor="training-title">Nom de la séance</label>

            <input
              id="training-title"
              type="text"
              value={sessionTitle}
              onChange={(event) => onChangeTitle(event.target.value)}
              maxLength={100}
              placeholder="Ex. : Accélérations et vitesse maximale"
              required
            />
          </div>

          <div className="training-field training-field-full">
            <label>Blocs de la séance</label>

            <p className="training-field-help">
              Chaque bloc possède ses propres distances, conditions,
              récupérations et objectifs. Tu peux en ajouter autant
              que nécessaire.
            </p>
          </div>

          {blocks.map((block, index) => (
            <TrainingBlockForm
              key={block.id}
              block={block}
              index={index}
              blockCount={blocks.length}
              onUpdate={onUpdateBlock}
              onDuplicate={onDuplicateBlock}
              onDelete={onDeleteBlock}
            />
          ))}

          <div className="training-field training-field-full">
            <button
              type="button"
              className="training-secondary-button"
              onClick={onAddBlock}
            >
              + Ajouter un bloc
            </button>
          </div>

          <div className="training-field">
            <label htmlFor="training-rpe">
              RPE de la séance (effort perçu sur 10)
            </label>

            <select
              id="training-rpe"
              value={rpe}
              onChange={(event) => onChangeRpe(event.target.value)}
            >
              <option value="">Non renseigné</option>

              {Array.from({ length: 10 }, (_, index) => index + 1).map(
                (value) => (
                  <option key={value} value={String(value)}>
                    {value}/10
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="training-field training-field-full">
            <label htmlFor="training-notes">
              Notes générales (facultatif)
            </label>

            <textarea
              id="training-notes"
              rows={3}
              maxLength={1000}
              value={sessionNotes}
              onChange={(event) => onChangeNotes(event.target.value)}
              placeholder="Échauffement, objectif global, sensations…"
            />
          </div>
        </div>

        {error && (
          <p className="training-error" role="alert">
            {error}
          </p>
        )}

        <div className="training-form-actions">
          <button
            type="button"
            className="training-secondary-button"
            onClick={onClose}
          >
            Fermer
          </button>

          <button
            type="submit"
            className="training-primary-button"
          >
            {editingSessionId
              ? 'Enregistrer les modifications'
              : 'Ajouter au planning'}
          </button>
        </div>
      </form>
    </section>
  )
}

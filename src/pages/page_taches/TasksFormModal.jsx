import CollapsibleSection from '../../components/CollapsibleSection'
import {
  ICON_CATEGORIES,
  ICON_SEARCHER,
} from '../../components/icons/icon-utils/icon-searcher'
import { useEffect, useState } from 'react'
import {
  BEHAVIORS,
  RECURRENCES,
} from '../../utils/recurrenceHelpers'
import {
  TASK_CATEGORIES,
  TASK_PERIODS,
  TASK_PRIORITIES,
} from '../../utils/taskHelpers'
import {
  AppIcon,
  iconMap,
} from '../../components/icons/icon-utils/index'
import {
  TASK_COLOR_PALETTES,
  DEFAULT_TASK_ICON,
  DEFAULT_TASK_COLOR,
} from '../../components/icons/icon-utils/icon-colors'

const EMPTY_FORM = {
  title: '',
  due: '',
  dueTime: '',
  reminderBefore: '',
  priority: 'normal',
  category: 'personnel',
  duration: '',
  notes: '',
  subtasks: [],
  icon: DEFAULT_TASK_ICON,
  color: DEFAULT_TASK_COLOR,
  kind: 'normal',
  recurrence: 'none',
  recurrenceInterval: '2',
  behavior: 'check',
  timerMinutes: '',
  repeatCount: '3',
  restMinutes: '0',
  counterGoal: '',
  counterStep: '1',
  counterUnit: 'minutes',
  periods: [],
}

function isIntegerInRange(value, min, max) {
  if (value === '' || value == null) return false
  const number = Number(value)
  return Number.isInteger(number) && number >= min && number <= max
}

export default function TasksFormModal({
  open,
  task,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [newSubtask, setNewSubtask] = useState('')
  const [error, setError] = useState('')
  const [iconCategory, setIconCategory] = useState('all')
  const [iconSearch, setIconSearch] = useState('')

  const normalizedSearch = iconSearch
  .trim()
  .toLocaleLowerCase('fr')

const filteredIcons = ICON_SEARCHER.filter((item) => {
  const matchesCategory =
    iconCategory === 'all' ||
    item.category === iconCategory

  const searchableText = [
    item.name,
    item.label,
    ...item.keywords,
    ICON_CATEGORIES.find(
      (category) => category.value === item.category,
    )?.label ?? '',
  ]
    .join(' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('fr')

  const normalizedQuery = normalizedSearch
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  return (
    matchesCategory &&
    searchableText.includes(normalizedQuery)
  )
})

const groupedIcons = ICON_CATEGORIES
  .filter((category) => category.value !== 'all')
  .filter(
    (category) =>
      iconCategory === 'all' ||
      category.value === iconCategory,
  )
  .map((category) => ({
    ...category,
    icons: filteredIcons.filter(
      (item) => item.category === category.value,
    ),
  }))
  .filter((category) => category.icons.length > 0)

  useEffect(() => {
    if (!open) return

    setForm(
      task
        ? {
            title: task.title ?? '',
            due: task.due ?? '',
            dueTime: task.dueTime ?? '',
            reminderBefore: task.reminderBefore ?? '',
            priority: task.priority ?? 'normal',
            category: task.category ?? 'personnel',
            duration: task.duration ?? '',
            notes: task.notes ?? '',
            subtasks: (task.subtasks ?? []).map(
              (subtask) => ({ ...subtask }),
            ),
            icon: task.icon ?? DEFAULT_TASK_ICON,
            color: task.color ?? DEFAULT_TASK_COLOR,
            kind: task.kind ?? 'normal',
            recurrence: task.recurrence ?? 'none',
            recurrenceInterval: String(task.recurrenceInterval ?? 2),
            behavior: task.behavior ?? 'check',
            timerMinutes: String(task.timerMinutes ?? ''),
            repeatCount: String(task.repeatCount ?? 3),
            restMinutes: String(task.restMinutes ?? 0),
            counterGoal: String(task.counterGoal ?? ''),
            counterStep: String(task.counterStep ?? 1),
            counterUnit: task.counterUnit ?? 'minutes',
            periods: Array.isArray(task.periods) ? [...task.periods] : [],
          }
        : {
            ...EMPTY_FORM,
            subtasks: [],
          },
    )

    setNewSubtask('')
    setError('')
  }, [open, task])

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function setKind(kind) {
    setForm((current) => ({
      ...current,
      kind,
      behavior: kind === 'negative' ? 'check' : current.behavior,
    }))
  }

  function addSubtask(event) {
    event.preventDefault()

    const title = newSubtask.trim()
    if (!title) return

    setForm((current) => ({
      ...current,
      subtasks: [
        ...current.subtasks,
        {
          id: `subtask-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 7)}`,
          title,
          completed: false,
        },
      ],
    }))

    setNewSubtask('')
  }

  // Coche ou décoche une période proposée (matin, aprem, soir)
  function togglePeriodOption(value) {
    setForm((current) => ({
      ...current,
      periods: current.periods.includes(value)
        ? current.periods.filter((period) => period !== value)
        : [...current.periods, value],
    }))
  }

  function removeSubtask(id) {
    setForm((current) => ({
      ...current,
      subtasks: current.subtasks.filter(
        (subtask) => subtask.id !== id,
      ),
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const title = form.title.trim()
    const duration =
      form.duration === '' ? '' : Number(form.duration)

    if (!title) {
      setError('Le titre de la tâche est obligatoire.')
      return
    }

    if (
      form.recurrence === 'everyXDays' &&
      !isIntegerInRange(form.recurrenceInterval, 1, 365)
    ) {
      setError('Le nombre de jours doit être compris entre 1 et 365.')
      return
    }

    if (form.kind === 'normal' && (form.behavior === 'timer' || form.behavior === 'repeatTimer')) {
      if (!isIntegerInRange(form.timerMinutes, 1, 1440)) {
        setError('La durée du timer doit être comprise entre 1 et 1440 minutes.')
        return
      }

      if (form.behavior === 'repeatTimer') {
        if (!isIntegerInRange(form.repeatCount, 1, 99)) {
          setError('Le nombre de fois doit être compris entre 1 et 99.')
          return
        }

        if (!isIntegerInRange(form.restMinutes, 0, 1440)) {
          setError('Le repos doit être compris entre 0 et 1440 minutes.')
          return
        }
      }
    }

    if (form.kind === 'normal' && form.behavior === 'counter') {
      if (!isIntegerInRange(form.counterGoal, 1, 100000)) {
        setError('La valeur objectif doit être un entier positif.')
        return
      }

      if (!isIntegerInRange(form.counterStep, 1, 1000)) {
        setError('Le pas doit être un entier compris entre 1 et 1000.')
        return
      }

      if (
        !['seconds', 'minutes', 'hours'].includes(form.counterUnit)
      ) {
        setError('Unité de compteur invalide.')
        return
      }
    }

    if (
      form.duration !== '' &&
      (!Number.isFinite(duration) ||
        duration <= 0 ||
        duration > 1440)
    ) {
      setError(
        'La durée doit être comprise entre 1 et 1440 minutes.',
      )
      return
    }

    onSave({
      ...form,
      title,
      duration,
      notes: form.notes.trim(),
      subtasks: form.subtasks.filter(
        (subtask) => subtask.title.trim(),
      ),
    })
  }

  return (
    <div
      className="tasks-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <section
        className="tasks-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tasks-modal-title"
      >
        <header className="tasks-modal-header">
          <div>
            <span className="eyebrow">
              ORGANISATION PERSONNELLE
            </span>
            <h2 id="tasks-modal-title">
              {task ? 'Modifier la tâche' : 'Nouvelle tâche'}
            </h2>
            <p>
              {task
                ? 'Modifie les informations de ta tâche.'
                : 'Ajoute une action à ton organisation quotidienne.'}
            </p>
          </div>

          <button
            type="button"
            className="tasks-modal-close"
            onClick={onClose}
            aria-label="Fermer"
          >
            ×
          </button>
        </header>

        <form className="tasks-form" onSubmit={handleSubmit}>
          <label className="tasks-form-field">
            <span>
              Titre <span className="required">*</span>
            </span>
            <input
              autoFocus
              required
              maxLength={160}
              value={form.title}
              onChange={(event) =>
                updateField('title', event.target.value)
              }
              placeholder="Ex. Réviser les maths"
            />
          </label>

          <section className="tasks-form-kind">
            <div className="tasks-form-field">
              <span>Nature de la tâche</span>
              <div className="tasks-segmented">
                <button
                  type="button"
                  className={form.kind === 'normal' ? 'is-selected' : ''}
                  aria-pressed={form.kind === 'normal'}
                  onClick={() => setKind('normal')}
                >
                  Normale
                </button>
                <button
                  type="button"
                  className={form.kind === 'negative' ? 'is-selected' : ''}
                  aria-pressed={form.kind === 'negative'}
                  onClick={() => setKind('negative')}
                >
                  Négative (à éviter)
                </button>
              </div>
              <p className="tasks-form-hint">
                {form.kind === 'negative'
                  ? 'Cochée par défaut. Décoche-la en cas de rechute.'
                  : 'Une action à accomplir.'}
              </p>
            </div>

            <div className="tasks-form-grid">
              <label className="tasks-form-field">
                <span>Répétition</span>
                <select
                  value={form.recurrence}
                  onChange={(event) =>
                    updateField('recurrence', event.target.value)
                  }
                >
                  {RECURRENCES.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              {form.recurrence === 'everyXDays' && (
                <label className="tasks-form-field">
                  <span>Tous les (jours)</span>
                  <input
                    type="number"
                    min="1"
                    max="365"
                    step="1"
                    value={form.recurrenceInterval}
                    onChange={(event) =>
                      updateField('recurrenceInterval', event.target.value)
                    }
                  />
                </label>
              )}
            </div>

            {form.kind === 'normal' && (
              <div className="tasks-form-field">
                <span>Fonctionnement</span>
                <div className="tasks-segmented tasks-segmented-wrap">
                  {BEHAVIORS.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      className={form.behavior === item.value ? 'is-selected' : ''}
                      aria-pressed={form.behavior === item.value}
                      onClick={() => updateField('behavior', item.value)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <p className="tasks-form-hint">
                  {BEHAVIORS.find((item) => item.value === form.behavior)?.hint}
                </p>
              </div>
            )}

            {form.kind === 'normal' && form.behavior === 'check' && (
              <div className="tasks-form-field">
                <span>Périodes de la journée</span>
                <div className="tasks-segmented tasks-segmented-wrap">
                  {TASK_PERIODS.map((item) => {
                    const selected = form.periods.includes(item.value)

                    return (
                      <button
                        key={item.value}
                        type="button"
                        className={selected ? 'is-selected' : ''}
                        aria-pressed={selected}
                        onClick={() => togglePeriodOption(item.value)}
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </div>
                <p className="tasks-form-hint">
                  {form.periods.length === 0
                    ? 'Aucune période : une simple case à cocher.'
                    : 'Chaque période se coche séparément. La tâche est terminée quand toutes sont faites.'}
                </p>
              </div>
            )}

            {form.kind === 'normal' &&
              (form.behavior === 'timer' || form.behavior === 'repeatTimer') && (
                <div className="tasks-form-grid">
                  <label className="tasks-form-field">
                    <span>
                      {form.behavior === 'repeatTimer'
                        ? 'Durée par fois (min)'
                        : 'Durée du timer (min)'}
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="1440"
                      step="1"
                      value={form.timerMinutes}
                      onChange={(event) =>
                        updateField('timerMinutes', event.target.value)
                      }
                      placeholder="Ex. 25"
                    />
                  </label>

                  {form.behavior === 'repeatTimer' && (
                    <>
                      <label className="tasks-form-field">
                        <span>Nombre de fois (X)</span>
                        <input
                          type="number"
                          min="1"
                          max="99"
                          step="1"
                          value={form.repeatCount}
                          onChange={(event) =>
                            updateField('repeatCount', event.target.value)
                          }
                        />
                      </label>

                      <label className="tasks-form-field">
                        <span>Repos entre les fois (min)</span>
                        <input
                          type="number"
                          min="0"
                          max="1440"
                          step="1"
                          value={form.restMinutes}
                          onChange={(event) =>
                            updateField('restMinutes', event.target.value)
                          }
                        />
                        <small className="tasks-form-hint">
                          0 = pause à la fin, tu relances la suivante.
                        </small>
                      </label>
                    </>
                  )}
                </div>
              )}

            {form.kind === 'normal' && form.behavior === 'counter' && (
              <div className="tasks-form-grid">

                <label className="tasks-form-field">
                  <span>Valeur objectif</span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={form.counterGoal}
                    onChange={(event) =>
                      updateField('counterGoal', event.target.value)
                    }
                    placeholder="Ex. 8"
                  />
                </label>

                <label className="tasks-form-field">
                  <span>Unité du compteur</span>
                  <select
                    value={form.counterUnit}
                    onChange={(event) =>
                      updateField('counterUnit', event.target.value)
                    }
                  >
                    <option value="seconds">Secondes</option>
                    <option value="minutes">Minutes</option>
                    <option value="hours">Heures</option>
                  </select>
                </label>

                <label className="tasks-form-field">
                  <span>Pas (+ / −)</span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={form.counterStep}
                    onChange={(event) =>
                      updateField('counterStep', event.target.value)
                    }
                  />
                </label>

              </div>
            )}
          </section>

          <CollapsibleSection id="task-appearance" title="Apparence" defaultOpen={false}><section className="tasks-appearance">
          <div className="tasks-form-field">
            <span>Icône</span>

            <div className="tasks-icon-search-controls">
              <input
                type="search"
                value={iconSearch}
                onChange={(event) => setIconSearch(event.target.value)}
                placeholder="Rechercher : cardio, sommeil, objectif..."
                aria-label="Rechercher une icône par nom ou mot-clé"
              />

              <select
                value={iconCategory}
                onChange={(event) => setIconCategory(event.target.value)}
                aria-label="Filtrer les icônes par catégorie"
              >
                {ICON_CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="tasks-icon-results">
              {groupedIcons.length > 0 ? (
                groupedIcons.map((group) => (
                  <section
                    className="tasks-icon-group"
                    key={group.value}
                    aria-label={group.label}
                  >
                    <h4 className="tasks-icon-group-title">
                      {group.label}
                      <span>{group.icons.length}</span>
                    </h4>

                    <div className="tasks-icon-picker">
                      {group.icons.map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          className={`tasks-icon-option ${
                            form.icon === item.name ? 'is-selected' : ''
                          }`}
                          onClick={() => updateField('icon', item.name)}
                          aria-label={`Choisir ${item.label}`}
                          aria-pressed={form.icon === item.name}
                          title={`${item.label} — ${item.keywords.join(', ')}`}
                        >
                          <AppIcon name={item.name} size={22} />
                        </button>
                      ))}
                    </div>
                  </section>
                ))
              ) : (
                <p className="tasks-icon-empty">
                  Aucune icône trouvée. Essaie un autre mot-clé.
                </p>
              )}
            </div>
          </div>

            <div className="tasks-form-field">
              <span>Couleur</span>

              <div className="tasks-color-picker">
                {TASK_COLOR_PALETTES.map((palette) => (
                  <button
                    key={palette.id}
                    type="button"
                    className={`tasks-color-option ${
                      form.color === palette.id
                        ? 'is-selected'
                        : ''
                    }`}
                    onClick={() =>
                      updateField('color', palette.id)
                    }
                    aria-label={`Choisir la couleur ${palette.label}`}
                    aria-pressed={form.color === palette.id}
                    title={palette.label}
                    style={{
                      '--task-primary': palette.primary,
                      '--task-accent': palette.accent,
                    }}
                  >
                    <span />
                  </button>
                ))}
              </div>

              <p className="tasks-form-hint">
                Couleur principale et couleur accentuée
              </p>
            </div>
          </section></CollapsibleSection>

          <div className="tasks-form-grid">
            <label className="tasks-form-field">
              <span>Échéance</span>
              <input
                type="date"
                value={form.due}
                disabled={form.recurrence !== 'none'}
                onChange={(event) =>
                  updateField('due', event.target.value)
                }
              />
            </label>

            <label className="tasks-form-field">
              <span>Heure</span>
              <input
                type="time"
                value={form.dueTime}
                disabled={form.recurrence !== 'none' || !form.due}
                onChange={(event) =>
                  updateField('dueTime', event.target.value)
                }
              />
            </label>

            <label className="tasks-form-field">
              <span>Rappel</span>
              <select
                value={form.reminderBefore}
                disabled={!form.dueTime || form.recurrence !== 'none'}
                onChange={(event) =>
                  updateField('reminderBefore', event.target.value)
                }
              >
                <option value="">Aucun rappel</option>
                <option value="0">Au moment prévu</option>
                <option value="10">10 min avant</option>
                <option value="30">30 min avant</option>
                <option value="60">1 h avant</option>
                <option value="1440">La veille à la même heure</option>
              </select>
            </label>

            <label className="tasks-form-field">
              <span>Durée estimée (minutes)</span>
              <input
                type="number"
                min="1"
                max="1440"
                step="1"
                value={form.duration}
                onChange={(event) =>
                  updateField('duration', event.target.value)
                }
                placeholder="Ex. 30"
              />
            </label>
          </div>

          <div className="tasks-form-grid">
            <label className="tasks-form-field">
              <span>Priorité</span>
              <select
                value={form.priority}
                onChange={(event) =>
                  updateField('priority', event.target.value)
                }
              >
                {TASK_PRIORITIES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="tasks-form-field">
              <span>Catégorie</span>
              <select
                value={form.category}
                onChange={(event) =>
                  updateField('category', event.target.value)
                }
              >
                {TASK_CATEGORIES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="tasks-form-field">
            <span>Notes</span>
            <textarea
              rows={3}
              maxLength={3000}
              value={form.notes}
              onChange={(event) =>
                updateField('notes', event.target.value)
              }
              placeholder="Détails ou informations utiles..."
            />
          </label>

          <CollapsibleSection id="task-subtasks" title="Sous-tâches" defaultOpen={true}><section className="tasks-form-subtasks">
            <div className="tasks-form-section-heading">
              <div>
                <h3>Sous-tâches</h3>
                <p>Découpe ta tâche en petites étapes.</p>
              </div>
              <span>{form.subtasks.length}</span>
            </div>

            {form.subtasks.map((subtask) => (
              <div
                className="tasks-form-subtask-row"
                key={subtask.id}
              >
                <span>{subtask.title}</span>
                <button
                  type="button"
                  onClick={() => removeSubtask(subtask.id)}
                  aria-label={`Retirer ${subtask.title}`}
                >
                  ×
                </button>
              </div>
            ))}

            <div className="tasks-add-subtask">
              <input
                value={newSubtask}
                maxLength={160}
                onChange={(event) =>
                  setNewSubtask(event.target.value)
                }
                placeholder="Ajouter une étape..."
                aria-label="Nouvelle sous-tâche"
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    addSubtask(event)
                  }
                }}
              />
              <button
                type="button"
                onClick={addSubtask}
                disabled={!newSubtask.trim()}
              >
                Ajouter
              </button>
            </div>
          </section></CollapsibleSection>

          {error && (
            <p className="tasks-form-error" role="alert">
              {error}
            </p>
          )}

          <footer className="tasks-form-actions">
            <button
              type="button"
              className="tasks-secondary-button"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="tasks-primary-button"
            >
              {task ? 'Enregistrer' : 'Créer la tâche'}
            </button>
          </footer>
        </form>
      </section>
    </div>
  )
}

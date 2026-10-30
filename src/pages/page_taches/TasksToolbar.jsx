
import { useState } from 'react'
import {
  TASK_CATEGORIES,
  TASK_PRIORITIES,
} from '../../utils/taskHelpers'

export default function TasksToolbar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  priority,
  onPriorityChange,
  status,
  onStatusChange,
}) {
  const [filtersOpen, setFiltersOpen] = useState(false)

  const activeFilterCount = [
    category !== 'all',
    priority !== 'all',
    status !== 'active',
  ].filter(Boolean).length

  function resetFilters() {
    onSearchChange('')
    onCategoryChange('all')
    onPriorityChange('all')
    onStatusChange('active')
  }

  return (
    <section className="tasks-toolbar">
      <label className="tasks-search">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Rechercher une tâche..."
          aria-label="Rechercher par titre"
        />
      </label>

      <details
        className="tasks-toolbar-advanced"
        open={filtersOpen}
        onToggle={(event) =>
          setFiltersOpen(event.currentTarget.open)
        }
      >
        <summary className="tasks-toolbar-summary">
          <span>
            Filtres avancés
            {activeFilterCount > 0 && (
              <span className="tasks-filter-count">
                {activeFilterCount}
              </span>
            )}
          </span>

          <span className="tasks-toolbar-summary-action">
            {filtersOpen ? 'Réduire −' : 'Afficher +'}
          </span>
        </summary>

        <div className="tasks-filters">
          <label className="tasks-filter">
            <span>Catégorie</span>
            <select
              value={category}
              onChange={(event) =>
                onCategoryChange(event.target.value)
              }
            >
              <option value="all">Toutes</option>
              {TASK_CATEGORIES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="tasks-filter">
            <span>Priorité</span>
            <select
              value={priority}
              onChange={(event) =>
                onPriorityChange(event.target.value)
              }
            >
              <option value="all">Toutes</option>
              {TASK_PRIORITIES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="tasks-filter">
            <span>Statut</span>
            <select
              value={status}
              onChange={(event) =>
                onStatusChange(event.target.value)
              }
            >
              <option value="all">Tous</option>
              <option value="active">À faire</option>
              <option value="overdue">En retard</option>
              <option value="completed">Terminées</option>
            </select>
          </label>

          {(activeFilterCount > 0 || search !== '') && (
            <button
              type="button"
              className="tasks-reset-filters"
              onClick={resetFilters}
            >
              Réinitialiser
            </button>
          )}
        </div>
      </details>
    </section>
  )
}

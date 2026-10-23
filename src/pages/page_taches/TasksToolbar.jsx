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
    onCreate,
  }) {
    return (
      <section className="tasks-toolbar">
        <div className="tasks-toolbar-top">
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
  
          <button
            type="button"
            className="tasks-primary-button"
            onClick={onCreate}
          >
            <span aria-hidden="true">+</span>
            Nouvelle tâche
          </button>
        </div>
  
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
  
          <button
            type="button"
            className="tasks-reset-filters"
            onClick={() => {
              onSearchChange('')
              onCategoryChange('all')
              onPriorityChange('all')
              onStatusChange('all')
            }}
          >
            Réinitialiser
          </button>
        </div>
      </section>
    )
  }
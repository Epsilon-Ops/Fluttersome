const TABS = [
    { id: 'overview', label: 'Vue d’ensemble' },
    { id: 'all', label: 'Toutes les tâches' },
    { id: 'upcoming', label: 'À venir' },
    { id: 'completed', label: 'Terminées' },
  ]
  
  export default function TasksTabs({
    activeTab,
    onChange,
    counts = {},
  }) {
    return (
      <nav className="tasks-tabs" aria-label="Vues des tâches">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`tasks-tab ${
              activeTab === tab.id ? 'active' : ''
            }`}
            aria-current={
              activeTab === tab.id ? 'page' : undefined
            }
            onClick={() => onChange(tab.id)}
          >
            <span>{tab.label}</span>
  
            {counts[tab.id] > 0 && (
              <span className="tasks-tab-count">
                {counts[tab.id]}
              </span>
            )}
          </button>
        ))}
      </nav>
    )
  }
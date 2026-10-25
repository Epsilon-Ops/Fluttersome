const sections = [
    'Vue d’ensemble',
    'Historique',
    'Statistiques',
  ]
  
  export default function SleepTabs({
    activeSection,
    onChange,
  }) {
    return (
      <nav
        className="sleep-tabs"
        aria-label="Sections du sommeil"
      >
        {sections.map((section) => (
          <button
            key={section}
            type="button"
            className={`sleep-tab ${
              activeSection === section ? 'is-active' : ''
            }`}
            aria-pressed={activeSection === section}
            onClick={() => onChange(section)}
          >
            {section}
          </button>
        ))}
      </nav>
    )
  }
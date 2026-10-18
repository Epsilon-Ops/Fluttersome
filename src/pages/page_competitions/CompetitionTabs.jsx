
import { sections } from '../../utils/competitionHelpers'

export default function CompetitionTabs({
  activeSection,
  onChange,
}) {
  return (
    <nav
      className="competition-tabs"
      aria-label="Sections des compétitions"
    >
      {sections.map((section) => (
        <button
          key={section}
          type="button"
          className={`competition-tab ${
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

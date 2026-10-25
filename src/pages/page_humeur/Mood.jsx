
import { useState } from 'react'
import MoodHeader from './MoodHeader'
import MoodDashboard from './MoodDashboard'
import '../..//styles/main_pages/page_humeur/index.css'

const MOOD_TABS = [
  { id: 'today', label: "Aujourd'hui" },
  { id: 'history', label: 'Historique' },
  { id: 'statistics', label: 'Statistiques' },
]

export default function Mood() {
  const [activeTab, setActiveTab] = useState('today')

  return (
    <main className="mood-page">
      <MoodHeader />

      <nav className="mood-tabs" aria-label="Navigation Humeur">
        {MOOD_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`mood-tabs__button ${
              activeTab === tab.id ? 'is-active' : ''
            }`}
            aria-current={activeTab === tab.id ? 'page' : undefined}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <section className="mood-page__content">
        <MoodDashboard activeTab={activeTab} />
      </section>
    </main>
  )
}

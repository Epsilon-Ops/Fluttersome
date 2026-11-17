
import useReminders from './hooks/useReminders'
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts'
import { useEffect, useRef, useState } from 'react'

import { categories } from './constants/categories'
import { AppIcon } from './components/icons/icon-utils/index.jsx'

import Sidebar from './components/Sidebar'
import BottomNav from './components/BottomNav'

import Dashboard from './pages/Dashboard'
import Competitions from './pages/page_competitions/Competitions'
import Training from './pages/page_entrainement/Training'
import Strength from './pages/page_musculation/Strength'
import Mood from './pages/page_humeur/Mood'
import Sleep from './pages/page_sommeil/Sleep'
import Nutrition from './pages/page_nutrition/Nutrition'
import Tasks from './pages/page_taches/Tasks'
import Coach from './pages/page_coach/Coach'

import './styles/settings/variables.css'
import './styles/settings/fonts.css'
import './styles/settings/global.css'
import './styles/settings/animations.css'

import './App.css'

import './styles/dashboard/panel.css'
import './styles/dashboard/welcome.css'
import './styles/dashboard/metrics.css'
import './styles/dashboard/marks.css'
import './styles/dashboard/home.css'

import './styles/layout/app-shell.css'
import './styles/layout/sidebar.css'
import './styles/layout/topbar.css'
import './styles/layout/footer.css'
import './styles/layout/bottom-nav.css'

import './styles/loading/status.css'
import './styles/pages/empty-page.css'
import './styles/pages/page-placeholder.css'
import './styles/settings/ux-accessibility.css'



const pageComponents = {
  dashboard: Dashboard,
  competitions: Competitions,
  training: Training,
  strength: Strength,
  mood: Mood,
  sleep: Sleep,
  nutrition: Nutrition,
  tasks: Tasks,
  coach: Coach,
}

export default function App() {
  useReminders()
  const [activePage, setActivePage] = useState('dashboard')
  const firstRender = useRef(true)

  useKeyboardShortcuts(categories, setActivePage)

  // Au changement de page, le focus va au contenu : la navigation au clavier reste fluide.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    document.getElementById('contenu')?.focus({ preventScroll: false })
  }, [activePage])

  const currentPage = categories.find(
    (category) => category.id === activePage,
  )

  const PageComponent = pageComponents[activePage] ?? Dashboard

  return (
    <div className="app-shell" data-page={activePage}>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="main-content" id="contenu" tabIndex={-1}>
        <header className="topbar">
          <div className="topbar-context">
            <span className="eyebrow">ESPACE ATHLÈTE</span>
            <span className="topbar-divider">/</span>
            <span className="topbar-current">
              {currentPage?.label ?? 'Dashboard'}
            </span>
          </div>

          <div className="topbar-right">
            <span className="sync-status">
              <span className="status-indicator" />
              DONNÉES LOCALES
            </span>
            <div className="avatar" aria-label="Profil utilisateur">
              S
            </div>
          </div>
        </header>

        <div className="page-container">
        {activePage === 'dashboard' ? (
          <Dashboard onNavigate={setActivePage} />
        ) : (
          <PageComponent />
        )}
        </div>

        <footer className="app-footer">
          <span>
            EPSILON <span className="footer-separator">/</span>
            SPRINT PERFORMANCE
          </span>
          <span className="shortcut-hint">
            Raccourcis : <kbd>Alt</kbd> + <kbd>1</kbd> à <kbd>9</kbd>
          </span>
          <span>CONÇU POUR PROGRESSER</span>
        </footer>
      </main>

      <BottomNav
        activePage={activePage}
        onNavigate={setActivePage}
      />
    </div>
  )
}
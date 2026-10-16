
import { useState } from 'react'
import { categories } from './constants/categories'
import Sidebar from './components/Sidebar'
import BottomNav from './components/BottomNav'

import Competitions from './pages/Competitions'

import './App.css'

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')

  const currentPage = categories.find(
    (category) => category.id === activePage,
  )

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="main-content">
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
              MODE LOCAL
            </span>
            <div className="avatar">S</div>
          </div>
        </header>

        <div className="page-container">
        {activePage === 'dashboard' ? (
          <Dashboard />
        ) : activePage === 'competitions' ? (
          <Competitions />
        ) : (
          <section className="empty-page">
              <div
                className="empty-page-icon"
                style={{
                  '--category-color': currentPage?.color ?? '#E8F0FF',
                }}
              >
                {currentPage?.icon}
              </div>

              <span className="eyebrow">MODULE EPSILON</span>
              <h1>{currentPage?.label}</h1>
              <p>
                Cet espace est prêt à être construit. Nous ajouterons
                ses fonctionnalités et ses données dans les prochaines
                étapes.
              </p>

              <div className="coming-soon">
                <span className="coming-soon-dot" />
                MODULE EN PRÉPARATION
              </div>
            </section>
          )}
        </div>

        <footer className="app-footer">
          <span>EPSILON <span className="footer-separator">/</span> SPRINT PERFORMANCE</span>
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

function Dashboard() {
  return (
    <div className="dashboard">
      <section className="welcome-section">
        <div>
          <div className="eyebrow welcome-eyebrow">
            TON ESPACE DE PERFORMANCE
          </div>
          <h1>
            Chaque détail.
            <br />
            <span>Chaque dixième.</span>
          </h1>
          <p className="welcome-description">
            Le suivi de ton entraînement, de ta récupération et de ta
            progression, réuni au même endroit.
          </p>
        </div>

        <div className="performance-mark" aria-hidden="true">
          <div className="mark-ring mark-ring-outer" />
          <div className="mark-ring mark-ring-middle" />
          <div className="mark-ring mark-ring-inner">
            <span>ε</span>
          </div>
          <span className="mark-caption">SPRINT / LAB</span>
        </div>
      </section>

      <section className="section-heading">
        <div>
          <span className="eyebrow">VUE D'ENSEMBLE</span>
          <h2>Ton tableau de bord</h2>
        </div>
        <span className="section-tag">
          <span className="section-tag-dot" />
          INITIALISATION
        </span>
      </section>

      <section className="metrics-grid">
        <MetricCard
          label="COMPÉTITIONS"
          value="—"
          unit="course"
          note="Tes prochaines échéances"
          color="#39E58C"
          icon="🏁"
        />
        <MetricCard
          label="ENTRAÎNEMENT"
          value="—"
          unit="séance"
          note="Ton suivi de sprint"
          color="#45A3FF"
          icon="⚡"
        />
        <MetricCard
          label="RÉCUPÉRATION"
          value="—"
          unit="donnée"
          note="Sommeil et ressenti"
          color="#7C83FF"
          icon="☾"
        />
        <MetricCard
          label="OBJECTIFS"
          value="0"
          unit="actif"
          note="Tes objectifs personnels"
          color="#FFD447"
          icon="↗"
        />
      </section>

      <section className="dashboard-lower">
        <div className="panel focus-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">CENTRE DE CONTRÔLE</span>
              <h3>Ta progression commence ici</h3>
            </div>
            <span className="panel-symbol">↗</span>
          </div>

          <div className="focus-content">
            <div className="focus-line" />
            <div>
              <strong>Construis ton historique</strong>
              <p>
                Ajoute tes chronos, tes séances et tes ressentis pour
                faire apparaître tes tendances au fil du temps.
              </p>
            </div>
          </div>

          <div className="panel-bottom">
            <span>60 M</span>
            <span>100 M</span>
            <span>200 M</span>
            <span>400 M</span>
          </div>
        </div>

        <div className="panel status-panel">
          <span className="eyebrow">ÉTAT DU SYSTÈME</span>
          <h3>Ton espace est prêt</h3>

          <div className="system-row">
            <span className="system-dot" />
            <span>Interface</span>
            <span className="system-value">OPÉRATIONNELLE</span>
          </div>

          <div className="system-row">
            <span className="system-dot system-dot-muted" />
            <span>Synchronisation</span>
            <span className="system-value">À CONFIGURER</span>
          </div>

          <div className="system-row">
            <span className="system-dot system-dot-muted" />
            <span>Analyses IA</span>
            <span className="system-value">À CONFIGURER</span>
          </div>
        </div>
      </section>

      <div className="dashboard-note">
        <span className="note-icon">i</span>
        Les tirets indiquent que les données ne sont pas encore renseignées.
        Aucun résultat sportif n'est simulé.
      </div>
    </div>
  )
}

function MetricCard({ label, value, unit, note, color, icon }) {
  return (
    <article
      className="metric-card"
      style={{ '--category-color': color }}
    >
      <div className="metric-card-top">
        <span className="metric-icon">{icon}</span>
        <span className="metric-label">{label}</span>
        <span className="metric-accent" />
      </div>

      <div className="metric-value-row">
        <span className="metric-value">{value}</span>
        <span className="metric-unit">{unit}</span>
      </div>

      <p className="metric-note">{note}</p>
    </article>
  )
}


import { useState } from 'react'
import { categories } from '../constants/categories'
import '../styles/BottomNav.css'
import CategoryIcon from './CategoryIcon'

const primaryIds = [
  'dashboard',
  'competitions',
  'training',
  'tasks',
  'coach',
]

const mobileCategories = categories.filter((category) =>
  primaryIds.includes(category.id),
)

const moreCategories = categories.filter(
  (category) => !primaryIds.includes(category.id),
)

export default function BottomNav({ activePage, onNavigate }) {
  const [moreOpen, setMoreOpen] = useState(false)

  const activeMoreCategory = moreCategories.some(
    (category) => category.id === activePage,
  )

  function navigateTo(categoryId) {
    onNavigate(categoryId)
    setMoreOpen(false)
  }

  return (
    <nav className="bottom-nav" aria-label="Navigation principale">
      {mobileCategories.map((category) => (
        <button
          key={category.id}
          type="button"
          className={`bottom-nav-item ${
            activePage === category.id ? 'active' : ''
          }`}
          style={{ '--category-color': category.color }}
          onClick={() => navigateTo(category.id)}
          aria-current={activePage === category.id ? 'page' : undefined}
        >
          <span className="bottom-nav-icon">
            <CategoryIcon name={category.icon} size={20} />
          </span>
          <span className="bottom-nav-label">
            {category.shortLabel}
          </span>
        </button>
      ))}

      <div className="bottom-nav-more-wrap">
        <button
          type="button"
          className={`bottom-nav-item bottom-nav-more ${
            moreOpen || activeMoreCategory ? 'active' : ''
          }`}
          style={{
            '--category-color': activeMoreCategory
              ? categories.find((category) => category.id === activePage)?.color
              : '#526176',
          }}
          onClick={() => setMoreOpen((open) => !open)}
          aria-expanded={moreOpen}
          aria-haspopup="true"
        >
          <span className="bottom-nav-icon">
            {activeMoreCategory ? (
              <CategoryIcon
                name={
                  categories.find((category) => category.id === activePage)
                    ?.icon
                }
                size={20}
              />
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <circle cx="5" cy="12" r="1.8" />
                <circle cx="12" cy="12" r="1.8" />
                <circle cx="19" cy="12" r="1.8" />
              </svg>
            )}
          </span>
          <span className="bottom-nav-label">
            {activeMoreCategory
              ? categories.find((category) => category.id === activePage)?.shortLabel
              : 'Plus'}
          </span>
        </button>

        {moreOpen && (
          <>
            <button
              type="button"
              className="bottom-nav-backdrop"
              aria-label="Fermer le menu"
              onClick={() => setMoreOpen(false)}
            />

            <div className="bottom-nav-menu" role="menu">
              <div className="bottom-nav-menu-heading">
                AUTRES ESPACES
              </div>

              {moreCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  role="menuitem"
                  className={`bottom-nav-menu-item ${
                    activePage === category.id ? 'active' : ''
                  }`}
                  style={{ '--category-color': category.color }}
                  onClick={() => navigateTo(category.id)}
                >
                  <span className="bottom-nav-menu-icon">
                    <CategoryIcon name={category.icon} size={19} />
                  </span>
                  <span>{category.label}</span>
                  {activePage === category.id && (
                    <span className="bottom-nav-menu-check">✓</span>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

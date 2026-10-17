
import { categories } from '../constants/categories'
import CategoryIcon from './CategoryIcon'
import { AppIcon } from './icons/index.jsx'

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">E</div>
        <div>
          <div className="brand-name">EPSILON</div>
          <div className="brand-caption">SPRINT PERFORMANCE</div>
        </div>
      </div>

      <div className="sidebar-section-label">PERFORMANCE</div>

      <nav className="sidebar-nav">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`nav-item ${
              activePage === category.id ? 'active' : ''
            }`}
            style={{ '--category-color': category.color }}
            onClick={() => onNavigate(category.id)}
          >
            <span className="nav-icon">
              <CategoryIcon name={category.icon} size={19} />
            </span>
            <span>{category.label}</span>
            {activePage === category.id && (
              <span className="nav-active-dot" />
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="status-indicator" />
        <span>ESPACE PERSONNEL</span>
      </div>
    </aside>
  )
}

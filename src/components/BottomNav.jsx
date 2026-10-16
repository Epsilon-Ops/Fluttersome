
import { categories } from '../constants/categories'
import '../styles/BottomNav.css'

const mobileCategories = categories.filter((category) =>
  ['dashboard', 'training', 'competitions', 'tasks', 'coach'].includes(
    category.id,
  ),
)

export default function BottomNav({ activePage, onNavigate }) {
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
          onClick={() => onNavigate(category.id)}
        >
          <span className="bottom-nav-icon">{category.icon}</span>
          <span className="bottom-nav-label">{category.shortLabel}</span>
        </button>
      ))}
    </nav>
  )
}

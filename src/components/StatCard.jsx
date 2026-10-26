
import { AppIcon } from './icons/icon-utils/index.jsx'

export default function StatCard({
  title,
  value,
  subtitle,
  icon = 'activity',
  accent = '#4785C5',
  onClick,
}) {
  const content = (
    <>
      <div className="stat-card__top">
        <span className="stat-card__title">{title}</span>
  
        <span
          className="stat-card__icon"
          style={{ color: accent, '--stat-accent': accent }}
          aria-hidden="true"
        >
          <AppIcon name={icon} size={22} />
        </span>
      </div>

      <div className="stat-card__value">
        {value ?? '—'}
      </div>

      {subtitle && (
        <p className="stat-card__subtitle">{subtitle}</p>
      )}
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        className="stat-card stat-card--interactive"
        onClick={onClick}
      >
        {content}
      </button>
    )
  }

  return <article className="stat-card">{content}</article>
}

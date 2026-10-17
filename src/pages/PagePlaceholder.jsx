import { AppIcon } from '../components/icons'

export default function PagePlaceholder({
  title,
  description,
  icon = 'dashboard',
  color = '#2463A6',
}) {
  return (
    <section className="page-placeholder">
      <div
        className="page-placeholder-icon"
        style={{ color, backgroundColor: `${color}14` }}
      >
        <AppIcon name={icon} size={28} />
      </div>

      <p className="eyebrow">EPSILON OPS</p>
      <h1>{title}</h1>
      <p className="page-placeholder-description">{description}</p>

      <div className="page-placeholder-status">
        <span className="page-placeholder-dot" />
        Espace prêt à être développé
      </div>
    </section>
  )
}
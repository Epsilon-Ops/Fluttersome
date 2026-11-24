/* =========================================================
   TasksTypeSection — sous-bloc d'une catégorie, par type de
   tâche (uniques, quotidiennes, hebdomadaires…). Repliable.
   L'état replié est mémorisé avec le reste de la mise en page
   (voir useTaskLayout) : l'identifiant est « catégorie::type ».
   ========================================================= */

export default function TasksTypeSection({
  section,
  groupId,
  collapsed = false,
  onToggle,
  children,
}) {
  const bodyId = `tasks-type-body-${groupId}-${section.key}`

  return (
    <section className={`tasks-type${collapsed ? ' is-collapsed' : ''}`}>
      <button
        type="button"
        className="tasks-type-toggle"
        aria-expanded={!collapsed}
        aria-controls={bodyId}
        onClick={onToggle}
      >
        <span className="tasks-type-title">{section.label}</span>

        <span className="tasks-type-count">
          {section.done}/{section.total}
        </span>

        <span className="tasks-type-bar" aria-hidden="true">
          <span style={{ width: `${section.progress}%` }} />
        </span>

        <span className="tasks-type-percent">{section.progress}&nbsp;%</span>

        <span className="tasks-type-chevron" aria-hidden="true">
          ▾
        </span>
        <span className="sr-only">
          {collapsed ? 'Déplier' : 'Replier'} {section.label.toLowerCase()}
        </span>
      </button>

      <div id={bodyId} className="tasks-type-body" hidden={collapsed}>
        {children}
      </div>
    </section>
  )
}

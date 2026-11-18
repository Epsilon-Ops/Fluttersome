/* =========================================================
   TasksGroup — un bloc « catégorie » : en-tête coloré,
   liste des tâches dessous, repliable.
   - La poignée (six points) sert à déplacer le bloc.
   - Le reste de l'en-tête replie ou déplie le bloc.
   Les deux sont séparés : un clic sur le titre ne doit pas
   déclencher un glisser-déposer.
   ========================================================= */

import { GripIcon } from './SortableList'
import {
  getGroupBackground,
  getGroupInk,
} from '../../utils/taskGroups'

export default function TasksGroup({
  group,
  handleProps,
  collapsed = false,
  onToggle,
  children,
}) {
  const background = getGroupBackground(group.colors)
  const ink = getGroupInk(group.colors)

  const total = group.tasks.length
  const done = group.tasks.filter((task) => task.completed).length
  const ratio = total > 0 ? Math.round((done / total) * 100) : 0

  const bodyId = `tasks-group-body-${group.id}`

  return (
    <section
      className={`tasks-group${collapsed ? ' is-collapsed' : ''}`}
      style={{
        '--group-main': group.colors[0],
        '--group-bg': background,
        '--group-ink': ink,
      }}
    >
      <header className="tasks-group-header">
        <span
          className="tasks-group-grip sortable-handle"
          {...handleProps}
        >
          <GripIcon />
        </span>

        <button
          type="button"
          className="tasks-group-toggle"
          aria-expanded={!collapsed}
          aria-controls={bodyId}
          onClick={() => onToggle?.(group.id)}
        >
          <span className="tasks-group-title">{group.label}</span>
          <span
            className="tasks-group-count"
            title={`${done} faite(s) sur ${total}`}
          >
            {done}/{total}
          </span>
          <span className="tasks-group-chevron" aria-hidden="true">
            ▾
          </span>
          <span className="sr-only">
            {collapsed ? 'Déplier' : 'Replier'} la catégorie {group.label}
          </span>
        </button>
      </header>

      <div className="tasks-group-progress" aria-hidden="true">
        <span style={{ width: `${ratio}%` }} />
      </div>

      <div id={bodyId} className="tasks-group-body" hidden={collapsed}>
        {children}
      </div>
    </section>
  )
}

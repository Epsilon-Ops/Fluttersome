/* =========================================================
   TasksGroup — un bloc « catégorie » : titre coloré en haut
   (couleur dominante ou dégradé), liste des tâches dessous.
   L'en-tête sert de poignée pour déplacer tout le bloc.
   ========================================================= */

import { GripIcon } from './SortableList'
import {
  getGroupBackground,
  getGroupInk,
} from '../../utils/taskGroups'

export default function TasksGroup({ group, handleProps, children }) {
  const background = getGroupBackground(group.colors)
  const ink = getGroupInk(group.colors)

  return (
    <section
      className="tasks-group"
      style={{
        '--group-main': group.colors[0],
        '--group-bg': background,
        '--group-ink': ink,
      }}
    >
      <header className="tasks-group-header sortable-handle" {...handleProps}>
        <span className="tasks-group-title">{group.label}</span>
        <span className="tasks-group-count">{group.tasks.length}</span>
        <GripIcon />
      </header>

      <div className="tasks-group-body">{children}</div>
    </section>
  )
}

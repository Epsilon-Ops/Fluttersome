/* =========================================================
   TasksList — affiche les tâches regroupées par catégorie.
   Les blocs et les tâches peuvent être réordonnés ; l'ordre
   et les blocs repliés sont sauvegardés via TaskLayoutContext
   (voir useTaskLayout).
   ========================================================= */

import { useContext } from 'react'
import TasksCard from './TasksCard'
import TasksGroup from './TasksGroup'
import SortableList from './SortableList'
import { TaskLayoutContext } from './TaskLayoutContext'
import { buildTaskGroups } from '../../utils/taskGroups'

const EMPTY_LAYOUT = {
  categoryOrder: [],
  taskOrder: {},
  collapsedGroups: [],
}

export default function TasksList({
  tasks = [],
  onToggleCompleted,
  onEdit,
  onDelete,
  onToggleSubtask,
  showBulkToggle = false,
}) {
  const layoutApi = useContext(TaskLayoutContext)

  if (tasks.length === 0) {
    return (
      <div className="tasks-list-empty">
        Aucune tâche à afficher.
      </div>
    )
  }

  const layout = layoutApi?.layout ?? EMPTY_LAYOUT
  const collapsedIds = layout.collapsedGroups ?? []

  const groups = buildTaskGroups(tasks, layout)
  const groupsById = Object.fromEntries(
    groups.map((group) => [group.id, group]),
  )

  const allCollapsed =
    groups.length > 0 &&
    groups.every((group) => collapsedIds.includes(group.id))

  return (
    <>
      {showBulkToggle && groups.length > 1 && (
        <div className="tasks-groups-toolbar">
          <button
            type="button"
            className="tasks-groups-toolbar-button"
            onClick={() =>
              layoutApi?.setGroupsCollapsed(
                groups.map((group) => group.id),
                !allCollapsed,
              )
            }
          >
            {allCollapsed ? 'Tout déplier' : 'Tout replier'}
          </button>
        </div>
      )}

      <SortableList
        className="tasks-groups"
        items={groups.map((group) => group.id)}
        label="Déplacer la catégorie"
        onReorder={(ids) => layoutApi?.setCategoryOrder(ids)}
        renderItem={(groupId, groupHandleProps) => {
          const group = groupsById[groupId]
          const tasksById = Object.fromEntries(
            group.tasks.map((task) => [task.id, task]),
          )

          return (
            <TasksGroup
              group={group}
              handleProps={groupHandleProps}
              collapsed={collapsedIds.includes(groupId)}
              onToggle={(id) => layoutApi?.toggleGroup(id)}
            >
              <SortableList
                className="tasks-list"
                items={group.tasks.map((task) => task.id)}
                label="Déplacer la tâche"
                onReorder={(ids) =>
                  layoutApi?.setTaskOrder(groupId, ids)
                }
                renderItem={(taskId, taskHandleProps) => (
                  <TasksCard
                    task={tasksById[taskId]}
                    dragHandleProps={taskHandleProps}
                    onToggleCompleted={onToggleCompleted}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleSubtask={onToggleSubtask}
                  />
                )}
              />
            </TasksGroup>
          )
        }}
      />
    </>
  )
}

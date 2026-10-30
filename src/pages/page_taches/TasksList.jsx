/* =========================================================
   TasksList — affiche les tâches regroupées par catégorie.
   Les blocs et les tâches peuvent être réordonnés ; l'ordre
   est sauvegardé via TaskLayoutContext (voir useTaskLayout).
   ========================================================= */

import { useContext } from 'react'
import TasksCard from './TasksCard'
import TasksGroup from './TasksGroup'
import SortableList from './SortableList'
import { TaskLayoutContext } from './TaskLayoutContext'
import { buildTaskGroups } from '../../utils/taskGroups'

const EMPTY_LAYOUT = { categoryOrder: [], taskOrder: {} }

export default function TasksList({
  tasks = [],
  onToggleCompleted,
  onEdit,
  onDelete,
  onToggleSubtask,
}) {
  const layoutApi = useContext(TaskLayoutContext)

  if (tasks.length === 0) {
    return (
      <div className="tasks-list-empty">
        Aucune tâche à afficher.
      </div>
    )
  }

  const groups = buildTaskGroups(
    tasks,
    layoutApi?.layout ?? EMPTY_LAYOUT,
  )
  const groupsById = Object.fromEntries(
    groups.map((group) => [group.id, group]),
  )

  return (
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
          <TasksGroup group={group} handleProps={groupHandleProps}>
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
  )
}

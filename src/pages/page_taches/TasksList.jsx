import TasksCard from './TasksCard'

export default function TasksList({
  tasks = [],
  onToggleCompleted,
  onEdit,
  onDelete,
  onToggleSubtask,
}) {
  if (tasks.length === 0) {
    return (
      <div className="tasks-list-empty">
        Aucune tâche à afficher.
      </div>
    )
  }

  return (
    <div className="tasks-list">
      {tasks.map((task) => (
        <TasksCard
          key={task.id}
          task={task}
          onToggleCompleted={onToggleCompleted}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleSubtask={onToggleSubtask}
        />
      ))}
    </div>
  )
}
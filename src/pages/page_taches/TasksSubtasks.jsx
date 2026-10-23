import { useState } from 'react'

export default function TasksSubtasks({
  task,
  onToggleSubtask,
}) {
  const [expanded, setExpanded] = useState(false)
  const subtasks = task.subtasks ?? []
  const completed = subtasks.filter(
    (subtask) => subtask.completed,
  ).length

  if (subtasks.length === 0) return null

  const percentage = Math.round(
    (completed / subtasks.length) * 100,
  )

  return (
    <div className="task-subtasks">
      <button
        type="button"
        className="task-subtasks-toggle"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        <span>{expanded ? '▾' : '▸'}</span>
        <span>Sous-tâches</span>
        <span className="task-subtasks-progress-label">
          {completed}/{subtasks.length}
        </span>
        <span className="task-subtasks-progress">
          <span style={{ width: `${percentage}%` }} />
        </span>
      </button>

      {expanded && (
        <div className="task-subtasks-list">
          {subtasks.map((subtask) => (
            <label
              className="task-subtask"
              key={subtask.id}
            >
              <input
                type="checkbox"
                checked={Boolean(subtask.completed)}
                onChange={() =>
                  onToggleSubtask?.(task.id, subtask.id)
                }
              />
              <span
                className={
                  subtask.completed
                    ? 'task-subtask-title completed'
                    : 'task-subtask-title'
                }
              >
                {subtask.title}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
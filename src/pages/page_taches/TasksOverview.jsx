import {
    getToday,
    isTaskDueToday,
    isTaskOverdue,
    isTaskUpcoming,
  } from '../../utils/taskHelpers'
  
  import TasksList from './TasksList'
  
  export default function TasksOverview({
    tasks,
    onToggleCompleted,
    onEdit,
    onDelete,
    onToggleSubtask,
    onCreate,
  }) {
    const activeTasks = tasks.filter(
      (task) => !task.completed,
    )
  
    const todayTasks = activeTasks.filter(
      (task) => isTaskDueToday(task),
    )
    
    const overdueTasks = activeTasks.filter(
      (task) => isTaskOverdue(task),
    )
  
    const upcomingTasks = activeTasks
      .filter(isTaskUpcoming)
      .sort((a, b) => a.due.localeCompare(b.due))
      .slice(0, 5)
  
    const completedToday = tasks.filter(
        (task) =>
          task.completed &&
          task.completedAt?.slice(0, 10) === getToday(),
      ).length
  
    return (
      <div className="tasks-overview">
        <section className="tasks-stats-grid">
          <article className="tasks-stat-card">
            <span className="tasks-stat-icon">✓</span>
            <span className="tasks-stat-label">
              Tâches actives
            </span>
            <strong>{activeTasks.length}</strong>
          </article>
  
          <article className="tasks-stat-card">
            <span className="tasks-stat-icon">◷</span>
            <span className="tasks-stat-label">
              À faire aujourd’hui
            </span>
            <strong>{todayTasks.length}</strong>
          </article>
  
          <article className="tasks-stat-card overdue">
            <span className="tasks-stat-icon">!</span>
            <span className="tasks-stat-label">
              En retard
            </span>
            <strong>{overdueTasks.length}</strong>
          </article>
  
          <article className="tasks-stat-card">
            <span className="tasks-stat-icon">✓</span>
            <span className="tasks-stat-label">
              Terminées aujourd’hui
            </span>
            <strong>{completedToday}</strong>
          </article>
        </section>
  
        {overdueTasks.length > 0 && (
          <section className="tasks-section">
            <div className="tasks-section-heading">
              <div>
                <span className="eyebrow">À TRAITER</span>
                <h2>En retard</h2>
              </div>
  
              <span className="tasks-count danger">
                {overdueTasks.length}
              </span>
            </div>
  
            <TasksList
              tasks={overdueTasks}
              onToggleCompleted={onToggleCompleted}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleSubtask={onToggleSubtask}
            />
          </section>
        )}
  
        <section className="tasks-section">
          <div className="tasks-section-heading">
            <div>
              <span className="eyebrow">TA JOURNÉE</span>
              <h2>Aujourd’hui</h2>
            </div>
  
            <span className="tasks-count">
              {todayTasks.length}
            </span>
          </div>
  
          {todayTasks.length > 0 ? (
            <TasksList
              tasks={todayTasks}
              onToggleCompleted={onToggleCompleted}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleSubtask={onToggleSubtask}
            />
          ) : (
            <div className="tasks-empty">
              <span className="tasks-empty-icon">✓</span>
              <h3>Une journée qui commence bien !</h3>
              <p>
                Aucune tâche prévue aujourd’hui. Tu peux
                profiter de cette tranquillité ou planifier
                la suite.
              </p>
              <button
                type="button"
                className="tasks-primary-button"
                onClick={onCreate}
              >
                + Nouvelle tâche
              </button>
            </div>
          )}
        </section>
  
        <section className="tasks-section">
          <div className="tasks-section-heading">
            <div>
              <span className="eyebrow">PROCHAINEMENT</span>
              <h2>À venir</h2>
            </div>
  
            <span className="tasks-count">
              {upcomingTasks.length}
            </span>
          </div>
  
          {upcomingTasks.length > 0 ? (
            <TasksList
              tasks={upcomingTasks}
              onToggleCompleted={onToggleCompleted}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleSubtask={onToggleSubtask}
            />
          ) : (
            <p className="tasks-muted">
              Aucune échéance à venir pour le moment.
            </p>
          )}
        </section>
      </div>
    )
  }
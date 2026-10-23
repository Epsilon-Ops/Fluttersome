export default function TasksStorageNote({
    error = '',
  }) {
    if (error) {
      return (
        <div className="tasks-storage-note error" role="alert">
          <span aria-hidden="true">!</span>
          <p>{error}</p>
        </div>
      )
    }
  
    return (
      <div className="tasks-storage-note">
        <span className="tasks-storage-dot" />
        <p>
          Tes tâches sont sauvegardées sur cet appareil.
        </p>
      </div>
    )
  }
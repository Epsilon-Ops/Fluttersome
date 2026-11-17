import { useState } from 'react'

/* Questions prédéfinies : la réponse est calculée à partir des données. */
export default function CoachChat({ questions = [], getAnswer = () => '' }) {
  const [selectedId, setSelectedId] = useState(null)

  const selected = questions.find((question) => question.id === selectedId)
  const answer = selected ? getAnswer(selected.id) : ''

  return (
    <section className="coach-chat panel">
      <div className="panel-header">
        <div>
          <span className="eyebrow">QUESTIONS AU COACH</span>
          <h2>Choisis une question</h2>
        </div>
      </div>

      <p className="coach-chat__intro">
        Le Coach répond à partir de tes données enregistrées, sans inventer de conclusion.
      </p>

      <div className="coach-chat__questions">
        {questions.map((question) => (
          <button
            className={`coach-chat__question ${selectedId === question.id ? 'is-active' : ''}`}
            key={question.id}
            type="button"
            onClick={() => setSelectedId(question.id)}
            aria-pressed={selectedId === question.id}
          >
            {question.label}
          </button>
        ))}
      </div>

      {selected && (
        <div className="coach-chat__answer" aria-live="polite">
          <h3>{selected.label}</h3>
          {answer.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      )}
    </section>
  )
}

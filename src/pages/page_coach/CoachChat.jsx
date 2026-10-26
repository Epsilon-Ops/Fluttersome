import { useState } from "react"

const QUESTIONS = [
  {
    id: "readiness",
    label: "Comment interpréter mon readiness ?",
  },
  {
    id: "session",
    label: "Dois-je maintenir ma séance prévue ?",
  },
  {
    id: "performance",
    label: "Comment évoluent mes performances ?",
  },
  {
    id: "recovery",
    label: "Quels facteurs de récupération examiner ?",
  },
]

export default function CoachChat({
  answers = {},
}) {
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  const answer = selectedQuestion
    ? answers[selectedQuestion]
    : null

  return (
    <section className="coach-chat panel">
      <div className="panel-header">
        <div>
          <span className="eyebrow">ÉCHANGE AVEC LE COACH</span>
          <h2>Une question sur ton entraînement ?</h2>
        </div>
      </div>

      <div className="coach-chat__questions">
        {QUESTIONS.map((question) => (
          <button
            className="coach-chat__question"
            key={question.id}
            type="button"
            onClick={() => setSelectedQuestion(question.id)}
          >
            {question.label}
          </button>
        ))}
      </div>

      {selectedQuestion && (
        <div
          className="coach-chat__answer"
          aria-live="polite"
        >
          <h3>
            {QUESTIONS.find(
              (question) => question.id === selectedQuestion
            )?.label}
          </h3>

          <p>
            {answer ||
              "Cette réponse sera disponible lorsque le moteur analytique pourra exploiter les données nécessaires. Aucune conclusion ne sera inventée."}
          </p>
        </div>
      )}
    </section>
  )
}
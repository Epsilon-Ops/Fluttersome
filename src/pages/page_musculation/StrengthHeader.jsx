
import { DumbbellIcon } from '../../components/icons/Sport-Icons'

export default function StrengthHeader({ onAdd }) {
  return (
    <section className="strength-header">
      <div className="strength-header-main">
        <div className="strength-header-icon" aria-hidden="true">
          <DumbbellIcon size={28} />
        </div>

        <div>
          <span className="eyebrow">PRÉPARATION PHYSIQUE</span>
          <h1>Musculation</h1>
          <p>
            Planifie tes séances, suis tes charges et mesure tes progrès.
          </p>
        </div>
      </div>

      <button
        type="button"
        className="training-primary-button"
        onClick={onAdd}
      >
        + Nouvelle séance
      </button>
    </section>
  )
}

/* =========================================================
   XpStrip — niveaux et XP de chaque module, en haut à gauche.
   Pour chaque module : niveau, barre de progression, pourcentage
   du niveau et XP restante pour passer au suivant.
   ========================================================= */

import { XP_MODULES, getLevelInfo, useXpTotals } from '../utils/xpHelpers'

export default function XpStrip() {
  const totals = useXpTotals()

  return (
    <ul className="xp-strip" aria-label="Niveaux par module">
      {XP_MODULES.map((module) => {
        const xp = totals[module.id] ?? 0
        const info = getLevelInfo(xp)

        return (
          <li
            key={module.id}
            className="xp-chip"
            style={{ '--xp-color': module.color }}
            title={`${module.label} : ${xp} XP — ${info.percent} % vers le niveau ${info.level + 1}, ${info.remaining} XP restants`}
          >
            <span className="xp-chip-head">
              <span className="xp-chip-dot" aria-hidden="true" />
              <span className="xp-chip-label">{module.label}</span>
              <span className="xp-chip-level">Niv. {info.level}</span>
            </span>

            <span className="xp-chip-bar" aria-hidden="true">
              <span style={{ width: `${info.percent}%` }} />
            </span>

            <span className="xp-chip-meta">
              {info.percent} % · {info.remaining} XP restants
            </span>
          </li>
        )
      })}
    </ul>
  )
}

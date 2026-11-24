/* =========================================================
   Strength-Icons — pictogrammes des exercices de musculation.
   Même gabarit que les autres icônes (24 × 24, traits).
   ========================================================= */

function Svg({ size = 20, children, className = '', strokeWidth = 1.8 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

export function BenchPressIcon(props) {
  return (
    <Svg {...props}>
      <path d="M2 7h20M4 5v4M20 5v4" />
      <path d="M5 14h14M7 14v5M17 14v5" />
    </Svg>
  )
}

export function SquatIcon(props) {
  return (
    <Svg {...props}>
      <path d="M3 5h18M3 3v4M21 3v4" />
      <path d="M12 8v5M12 13l-3 4v3M12 13l3 4v3" />
    </Svg>
  )
}

export function DeadliftIcon(props) {
  return (
    <Svg {...props}>
      <path d="M2 18h20M4 16v4M20 16v4" />
      <circle cx="9" cy="8" r="1.5" />
      <path d="M10 10l4 5M14 15v3M14 15l-2 3M14 15l2 3" />
    </Svg>
  )
}

export function ShoulderPressIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 4h16M4 2v4M20 2v4" />
      <path d="M12 8v8M12 11l-4-4M12 11l4-4M10 16l-1 5M14 16l1 5" />
    </Svg>
  )
}

export function RowIcon(props) {
  return (
    <Svg {...props}>
      <path d="M3 18h18" />
      <path d="M5 14l6-5M11 9l4 4M14 13l-3 5" />
    </Svg>
  )
}

export function PushUpIcon(props) {
  return (
    <Svg {...props}>
      <path d="M3 17h18" />
      <path d="M4 13l14 0M7 13v4M17 13v4" />
      <circle cx="20" cy="11" r="1.5" />
    </Svg>
  )
}

export function PlankIcon(props) {
  return (
    <Svg {...props}>
      <path d="M3 17h18" />
      <path d="M4 13l15-2M7 12v5M18 11v6" />
    </Svg>
  )
}

export function LungeIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="4" r="1.5" />
      <path d="M9 7v6M9 9l-3 3M9 13l-3 7M9 13l5 1 1 6" />
    </Svg>
  )
}

export function CurlIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6 7h12M4 5v4M20 5v4" />
      <path d="M8 19c0-4 2-7 6-7M14 12l-2 0M14 12l0 2" />
    </Svg>
  )
}

export function CoreIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 19h16" />
      <path d="M7 17c2-7 8-8 10-1" />
      <circle cx="18" cy="13" r="1.5" />
    </Svg>
  )
}

export function CalfIcon(props) {
  return (
    <Svg {...props}>
      <path d="M7 20h10" />
      <path d="M11 20v-8M11 12l-3 1M11 20l-3-2" />
    </Svg>
  )
}

export function HipThrustIcon(props) {
  return (
    <Svg {...props}>
      <path d="M3 19h18" />
      <path d="M5 15h4M9 15l5-6h4M18 9v6" />
    </Svg>
  )
}

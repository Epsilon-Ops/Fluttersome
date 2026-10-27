function Svg({ size = 20, className = '', children }) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {children}
      </svg>
    )
}

// -------------------------
// Flèches Classiques
// -------------------------

export function ArrowUpIcon(props) {
    return (
      <Svg {...props}>
        <svg viewBox="0 0 24 24"><g id="SVGRepo_iconCarrier"> <path d="M12 5V19M12 5L6 11M12 5L18 11" stroke="CurrentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      </Svg>
    )
}

export function ArrowDownIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 5V19" />
      <path d="M6 13L12 19L18 13" />
    </Svg>
  )
}

export function ArrowLeftIcon(props) {
  return (
    <Svg {...props}>
      <path d="M19 12H5" />
      <path d="M11 6L5 12L11 18" />
    </Svg>
  )
}

export function ArrowRightIcon(props) {
  return (
    <Svg {...props}>
      <path d="M5 12H19" />
      <path d="M13 6L19 12L13 18" />
    </Svg>
  )
}

export function ArrowUpLeftIcon(props) {
  return (
    <Svg {...props}>
      <g transform="rotate(270 12 12)">
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
      </g>
    </Svg>
  )
}

export function ArrowDownRightIcon(props) {
  return (
    <Svg {...props}>
      <g transform="rotate(90 12 12)">
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
      </g>
    </Svg>
  )
}

export function ArrowDownLeftIcon(props) {
  return (
    <Svg {...props}>
      <g transform="rotate(180 12 12)">
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
      </g>
    </Svg>
  )
}

// -------------------------
// Flèches Maigres
// -------------------------

export function ArrowUpNarrowIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 4V20M12 4L8 8M12 4L16 8" />
    </Svg>
  )
}

export function ArrowDownNarrowIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 4V20M12 20L8 16M12 20L16 16" />
    </Svg>
  )
}

export function ArrowLeftNarrowIcon(props) {
  return (
    <Svg {...props}>
      <path d="M20 12H4M4 12L8 8M4 12L8 16" />
    </Svg>
  )
}

export function ArrowRightNarrowIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 12H20M20 12L16 8M20 12L16 16" />
    </Svg>
  )
}

export function ArrowUpRightNarrowIcon(props) {
  return (
    <Svg {...props}>
      <path d="M5 19L19 5M10 5H19V14" />
    </Svg>
  )
}

export function ArrowUpLeftNarrowIcon(props) {
  return (
    <Svg {...props}>
      <path d="M19 19L5 5M14 5H5V14" />
    </Svg>
  )
}

export function ArrowDownRightNarrowIcon(props) {
  return (
    <Svg {...props}>
      <path d="M5 5L19 19M19 10V19H10" />
    </Svg>
  )
}

export function ArrowDownLeftNarrowIcon(props) {
  return (
    <Svg {...props}>
      <path d="M19 5L5 19M5 10V19H14" />
    </Svg>
  )
}
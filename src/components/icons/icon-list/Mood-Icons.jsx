function Svg({ size = 20, children, className = '' }) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
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

export function SmileMoodIcon(props) {
    return (
      <Svg {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" width="49" height="46" viewBox="0 0 49 46">
        <g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
            <rect x="1.8" y="1.7" width="45.4" height="42.5" rx="2.1"/>
            <circle cx="16.0" cy="20.8" r="3.6"/>
            <circle cx="33.0" cy="20.8" r="3.6"/>
            <path d="M19.5 29.5 Q24.5 34.5 29.5 29.5"/>
        </g>
        </svg>
      </Svg>
    )
}

export function HappyMoodIcon(props) {
  return (
    <Svg {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="49" height="46" viewBox="0 0 163 163">
        <g fill="none" stroke="CurrentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2.8" y="2.8" width="157.4" height="157.4" rx="5.5"/>
          <path d="M26.8 55.8 C30.1 43.8 38.3 36.9 47.7 36.9 C57.2 36.9 65.3 43.8 68.7 55.8"/>
          <path d="M94.3 55.8 C97.6 43.8 105.8 36.9 115.2 36.9 C124.7 36.9 132.8 43.8 136.2 55.8"/>
          <path d="M52.8 70.8 H108.8 V95.1 C108.8 113.3 96.2 126.3 80.8 126.3 C65.4 126.3 52.8 113.3 52.8 95.1 Z"/>
          <path d="M54.8 86.7 Q80.8 75.2 106.8 86.7"/>
        </g>
      </svg>
    </Svg>
  )
}
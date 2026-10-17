
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
  
  export function TrophyIcon(props) {
    return (
      <Svg {...props}>
        <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
        <path d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4" />
      </Svg>
    )
  }
  
  export function ActivityIcon(props) {
    return (
      <Svg {...props}>
        <path d="M3 12h4l3-8 4 16 3-8h4" />
      </Svg>
    )
  }
  
  export function DumbbellIcon(props) {
    return (
      <Svg {...props}>
        <path d="M6 9v6M3 10v4M18 9v6M21 10v4M6 12h12" />
      </Svg>
    )
  }
  
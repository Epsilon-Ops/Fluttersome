
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
  
  export function LeafIcon(props) {
    return (
      <Svg {...props}>
        <path d="M20 4C10 3 4 7 4 14a6 6 0 0 0 6 6c7 0 11-8 10-16Z" />
        <path d="M4 21c3-5 7-8 12-11" />
      </Svg>
    )
  }
  
  export function SunIcon(props) {
    return (
      <Svg {...props}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </Svg>
    )
  }
  
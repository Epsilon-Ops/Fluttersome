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
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180 12 12)"><g id="SVGRepo_bgCurrentColorarrier" stroke-width="0"></g><g id="SVGRepo_tracerCurrentColorarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCurrentColorarrier"> <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="CurrentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </Svg>
      )
}

export function ArrowLeftIcon(props) {
    return (
        <Svg {...props}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(270 12 12)"><g id="SVGRepo_bgCurrentColorarrier" stroke-width="0"></g><g id="SVGRepo_tracerCurrentColorarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCurrentColorarrier"> <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="CurrentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </Svg>
      )
}

export function ArrowRightIcon(props) {
    return (
        <Svg {...props}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(90 12 12)"><g id="SVGRepo_bgCurrentColorarrier" stroke-width="0"></g><g id="SVGRepo_tracerCurrentColorarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCurrentColorarrier"> <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="CurrentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
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
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.33199 7.68464C6.94146 8.07517 6.3083 8.07517 5.91777 7.68464C5.52725 7.29412 5.52725 6.66095 5.91777 6.27043L10.5834 1.60483C11.3644 0.823781 12.6308 0.82378 13.4118 1.60483L18.0802 6.27327C18.4707 6.66379 18.4707 7.29696 18.0802 7.68748C17.6897 8.078 17.0565 8.078 16.666 7.68748L13 4.02145V21.9999C13 22.5522 12.5523 22.9999 12 22.9999C11.4477 22.9999 11 22.5522 11 21.9999V4.01666L7.33199 7.68464Z" fill="CurrentColor"></path> </g></svg>
    </Svg>
  )
}
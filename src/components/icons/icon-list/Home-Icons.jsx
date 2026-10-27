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
// Icones Maison
// -------------------------

export function HomeIcon(props) {
    return (
      <Svg {...props}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 10.5 12 3l9 7.5"/>
            <path d="M5 9v12h14V9"/>
            <path d="M9 21v-7h6v7"/>
        </svg>
      </Svg>
    )
}

export function DoorIcon (props) {
    return (
        <Svg {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 21h16"/>
                <path d="M6 21V3l12-1v19"/>
                <path d="M14 12h.01"/>
            </svg>
        </Svg>
    )
}

export function LightbulbIcon (props) {
    return (
        <Svg {...props}>
            <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCurrentColorarrier" stroke-width="0"></g><g id="SVGRepo_tracerCurrentColorarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCurrentColorarrier"><path d="M15,16.372a7.5,7.5,0,1,0-6,0V18h6ZM11.221,6.087a3.5,3.5,0,0,0-2.7,3.023,1,1,0,0,1-.992.89,1.065,1.065,0,0,1-.112-.006,1,1,0,0,1-.884-1.1,5.5,5.5,0,0,1,4.246-4.754,1,1,0,0,1,.442,1.951ZM9,20h6v1a1,1,0,0,1-1,1H10a1,1,0,0,1-1-1Z"></path></g></svg>
        </Svg>
    )
}

export function LightbulbPowerIcon (props) {
    return (
        <Svg {...props}>
            <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCurrentColorarrier" stroke-width="0"></g><g id="SVGRepo_tracerCurrentColorarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCurrentColorarrier"><path d="M15,16.372a7.5,7.5,0,1,0-6,0V18h6ZM14.1,12c-.034,0-.066.005-.1.005a1,1,0,0,1-.707-.293L12,10.414l-1.293,1.293a1,1,0,0,1-1.539-.152l-2-3a1,1,0,1,1,1.664-1.11l1.323,1.986,1.138-1.138a1,1,0,0,1,1.414,0l1.138,1.138,1.323-1.986a1,1,0,0,1,1.664,1.11l-2,3A1,1,0,0,1,14.1,12ZM9,20h6v1a1,1,0,0,1-1,1H10a1,1,0,0,1-1-1Z"></path></g></svg>
        </Svg>
    )
}

export function BathIcon (props) {
    return (
        <Svg {...props}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path fill="currentColor" d="M20 14v-2H4v2c0 1.138.583 3.248 2.745 3.841.37.102.787.159 1.255.159h8a4.71 4.71 0 0 0 1.255-.159C19.417 17.248 20 15.138 20 14z"></path>
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h1m16 0v0a1 1 0 0 0 1-1V7c0-1-.6-3-3-3s-3 2-3 3m5 5v2c0 1.138-.583 3.248-2.745 3.841M20 12H4m0 0v2c0 1.138.583 3.248 2.745 3.841M6 20l.745-2.159m0 0c.37.102.787.159 1.255.159h8a4.71 4.71 0 0 0 1.255-.159M18 20l-.745-2.159M15 7h-2m2 0h2"></path>
            </g>
            </svg>
        </Svg>
    )
}

export function KeyIcon (props) {
    return (
        <Svg {...props}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.3212 10.6852L4 19L6 21M7 16L9 18M20 7.5C20 9.98528 17.9853 12 15.5 12C13.0147 12 11 9.98528 11 7.5C11 5.01472 13.0147 3 15.5 3C17.9853 3 20 5.01472 20 7.5Z" stroke="CurrentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </Svg>
    )
}

export function SofaIcon (props) {
    return (
        <Svg {...props}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.7497 12.75C20.7166 8.86578 21.1456 6.84737 20.134 5.42821C20.0665 5.33345 19.9948 5.24169 19.9193 5.15317C18.7216 3.75 16.4811 3.75 11.9999 3.75C7.5188 3.75 5.27824 3.75 4.08059 5.15317C4.00504 5.24169 3.93339 5.33345 3.86584 5.42821C2.85424 6.84737 3.28329 8.86578 4.25017 12.75H19.7497Z" fill="currentColor"></path> <path d="M4.75 17.75V19.75C4.75 20.1642 4.41421 20.5 4 20.5C3.58579 20.5 3.25 20.1642 3.25 19.75V17.6046C2.51704 17.3079 2 16.5893 2 15.75C2 14.6454 2.89543 13.75 4 13.75H20C21.1046 13.75 22 14.6454 22 15.75C22 16.5893 21.483 17.3079 20.75 17.6046V19.75C20.75 20.1642 20.4142 20.5 20 20.5C19.5858 20.5 19.25 20.1642 19.25 19.75V17.75H4.75Z" fill="CurrentColor"></path> </g></svg>
        </Svg>
    )
}

export function BedIcon (props) {
    return (
        <Svg {...props}>
            <svg fill="currentColor" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 5.2892 21.9935 L 10.9031 21.9935 L 10.9031 18.8154 C 10.9031 16.7507 12.0630 15.6372 14.1508 15.6372 L 22.3861 15.6372 C 24.4739 15.6372 25.6338 16.7507 25.6338 18.8154 L 25.6338 21.9935 L 30.6446 21.9935 L 30.6446 18.8154 C 30.6446 16.7507 31.8045 15.6372 34.0084 15.6372 L 41.7333 15.6372 C 43.9373 15.6372 45.0970 16.7507 45.0970 18.8154 L 45.0970 21.9935 L 50.7108 21.9935 L 50.7108 15.6604 C 50.7108 11.5544 48.5305 9.4665 44.5402 9.4665 L 11.4598 9.4665 C 7.4930 9.4665 5.2892 11.5544 5.2892 15.6604 Z M 0 44.8668 C 0 46.0035 .7423 46.7226 1.9022 46.7226 L 3.2013 46.7226 C 4.3380 46.7226 5.0803 46.0035 5.0803 44.8668 L 5.0803 41.5726 C 5.3355 41.6422 6.0779 41.6886 6.6114 41.6886 L 49.4118 41.6886 C 49.9454 41.6886 50.6647 41.6422 50.9198 41.5726 L 50.9198 44.8668 C 50.9198 46.0035 51.6619 46.7226 52.7988 46.7226 L 54.1210 46.7226 C 55.2579 46.7226 56 46.0035 56 44.8668 L 56 31.6670 C 56 27.4682 53.6573 25.1716 49.4118 25.1716 L 6.5883 25.1716 C 2.3430 25.1716 0 27.4682 0 31.6670 Z"></path></g></svg>
        </Svg>
    )
}


export function BedSleepingIcon(props) {
    return (
        <Svg {...props}>
            <svg
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                role="img"
                focusable="false"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="4.3" cy="5.5" r="1.5" />

                <path d="
                    M 6.4,7.6
                    V 4.9
                    C 6.4,4.73425 6.53425,4.6 6.7,4.6
                    H 10.9
                    C 12.059875,4.6 13,5.54013 13,6.7
                    V 10.3
                " />

                <path d="
                    M 1.6,7.6
                    H 12.1
                    M 1.6,4
                    V 10.3
                    M 1.6,9.7
                    H 12.4
                    M 12.4,9.7
                    V 10.3
                " />
            </svg>
        </Svg>
    )
}




export function BedroomTableIcon (props) {
    return (
        <Svg {...props}>
            <svg
                fill="currentColor"
                viewBox="0 0 512.001 512.001"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <g>
                        <g>
                            <path d="M406.44,27.563C406.44,12.34,394.1,0,378.876,0H133.124C117.9,0,105.56,12.34,105.56,27.563v456.875 c0,15.222,12.34,27.563,27.563,27.563h245.754c15.222,0,27.563-12.34,27.563-27.563V27.563H406.44z M355.872,442.692 c0,11.747-9.522,21.269-21.269,21.269H177.397c-11.747,0-21.269-9.522-21.269-21.269v-58.598c0-11.747,9.522-21.269,21.269-21.269 h157.206c11.747,0,21.269,9.522,21.269,21.269V442.692z M355.872,284.667c0,11.747-9.522,21.269-21.269,21.269H177.397 c-11.747,0-21.269-9.522-21.269-21.269v-58.598c0-11.747,9.522-21.269,21.269-21.269h157.206c11.747,0,21.269,9.522,21.269,21.269 V284.667z M355.872,126.642c0,11.747-9.522,21.269-21.269,21.269H177.397c-11.747,0-21.269-9.522-21.269-21.269V68.044 c0-11.747,9.522-21.269,21.269-21.269h157.206c11.747,0,21.269,9.522,21.269,21.269V126.642z"></path>
                        </g>
                    </g>
                    <g>
                        <g>
                            <circle cx="256" cy="413.772" r="21.037"></circle>
                        </g>
                    </g>
                    <g>
                        <g>
                            <circle cx="256" cy="258.617" r="21.036"></circle>
                        </g>
                    </g>
                    <g>
                        <g>
                            <circle cx="256" cy="103.449" r="21.036"></circle>
                        </g>
                    </g>
                </g>
            </svg>
        </Svg>
    )
}




export function BedroomLampIcon (props) {
    return (
        <Svg {...props}>
            <svg
                fill="currentColor"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="SVGRepo_iconCarrier">
                    <g>
                        <g>
                            <path d="M279.759,438.348h-5.94V275.601h-35.638v162.747h-5.94c-34.062,0-61.773,27.711-61.773,61.773 c0,6.56,5.318,11.879,11.879,11.879h147.304c6.561,0,11.879-5.32,11.879-11.879C341.531,466.059,313.82,438.348,279.759,438.348z"></path>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M181.16,324.331v-48.73h-35.638v47.906c-4.992,3.158-8.316,8.712-8.316,15.055c0,9.841,7.978,17.819,17.819,17.819h15.443 c9.841,0,17.819-7.978,17.819-17.819C188.288,332.737,185.481,327.583,181.16,324.331z"></path>
                        </g>
                    </g>
                    <g>
                        <g>
                            <polygon points="354.1,0 157.9,0 114.492,251.842 397.508,251.842"></polygon>
                        </g>
                    </g>
                </g>
            </svg>
        </Svg>
    )
}


export function MirrorIcon (props) {
    return (
        <Svg {...props}>
            <svg fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>mirror</title> <path d="M25.573 4.026h-1.089c-2.43-2.111-5.308-3.338-8.405-3.338s-5.975 1.226-8.406 3.338h-1.089v24.124h1.071c2.434 2.117 5.323 3.355 8.424 3.355s5.99-1.238 8.424-3.355h1.071v-24.124zM8.269 5.842h9.177l-9.166 7.857v3.936l13.758-11.792h1.857v20.54h-15.626v-20.54zM8.28 26.38h1.931l13.666-11.698v-6.888l-15.597 13.374z"></path> </g></svg>
        </Svg>
    )
}


export function MirrorMakeupIcon (props) {
    return (
        <Svg {...props}>
            <svg
                fill="currentColor"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="SVGRepo_iconCarrier">
                    <g>
                        <g>
                            <path d="M446.877,176.272c-1.592-20.155-6.325-39.438-13.696-57.368L234.103,317.981l-21.508-21.508L418.598,90.47 c-6.86-11.002-14.797-21.265-23.676-30.63L252.053,202.709l-21.508-21.508L372.284,39.463c-4.909-3.765-10.005-7.296-15.272-10.58 L93.404,292.489c33.838,54.272,94.065,90.47,162.597,90.47c100.464,0,183.099-77.772,190.876-176.272h15.265 c-3.576,49.479-24.56,95.512-59.99,130.942c-39.038,39.037-90.942,60.537-146.15,60.537c-55.208,0-107.114-21.499-146.152-60.536 c-10.477-10.477-19.68-21.887-27.554-34.034c-5.78-8.916-10.838-18.23-15.144-27.872c-9.665-21.644-15.551-44.929-17.293-69.036 h15.265c1.592,20.155,6.325,39.438,13.696,57.368L328.577,14.3C306.182,5.093,281.677,0,256.001,0 C155.537,0,72.902,77.772,65.125,176.272h-46.23v15.209c0,63.334,24.663,122.875,69.446,167.658 c41.179,41.18,94.841,65.329,152.45,68.953v53.492H126.22V512h259.56v-30.417H271.209v-53.492 c57.61-3.623,111.271-27.773,152.45-68.953c44.783-44.783,69.446-104.326,69.446-167.658v-15.209H446.877z"></path>
                        </g>
                    </g>
                </g>
            </svg>
        </Svg>
    )
}



export function MirrorBedroomIcon (props) {
    return (
        <Svg {...props}>
            <svg
                fill="currentColor"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="SVGRepo_iconCarrier">
                    <g>
                        <g>
                            <g>
                                <path d="M494.933,435.379V76.621C505.566,68.608,512,56.004,512,42.667C512,19.14,492.86,0,469.333,0 c-13.338,0-25.941,6.434-33.954,17.067H76.621C68.608,6.434,56.004,0,42.667,0C19.14,0,0,19.14,0,42.667 c0,13.338,6.434,25.941,17.067,33.954v358.758C6.434,443.392,0,455.996,0,469.333C0,492.86,19.14,512,42.667,512 c13.338,0,25.941-6.434,33.954-17.067h358.758C443.392,505.566,455.996,512,469.333,512C492.86,512,512,492.86,512,469.333 C512,455.996,505.566,443.392,494.933,435.379z M460.8,452.267c0,4.719-3.814,8.533-8.533,8.533H59.733 c-4.719,0-8.533-3.814-8.533-8.533V59.733c0-4.719,3.814-8.533,8.533-8.533h392.533c4.719,0,8.533,3.814,8.533,8.533V452.267z"></path>
                                <path d="M68.267,443.733h375.467V68.267H68.267V443.733z M207.3,104.9l8.533-8.533c3.337-3.337,8.73-3.337,12.066,0 c3.336,3.337,3.336,8.73,0,12.066l-8.533,8.533c-1.664,1.664-3.849,2.5-6.033,2.5c-2.185,0-4.369-0.836-6.033-2.5 C203.964,113.63,203.964,108.237,207.3,104.9z M173.167,96.367c3.337-3.337,8.73-3.337,12.066,0c3.336,3.337,3.336,8.73,0,12.066 l-25.6,25.6c-1.664,1.664-3.849,2.5-6.033,2.5c-2.185,0-4.369-0.836-6.033-2.5c-3.337-3.337-3.337-8.73,0-12.066L173.167,96.367z M96.367,130.5L130.5,96.367c3.336-3.337,8.73-3.337,12.066,0s3.337,8.73,0,12.066l-34.133,34.133 c-1.664,1.664-3.849,2.5-6.033,2.5c-2.185,0-4.369-0.836-6.033-2.5C93.03,139.23,93.03,133.837,96.367,130.5z M96.367,173.167 l17.067-17.067c3.337-3.337,8.73-3.337,12.066,0c3.336,3.337,3.336,8.73,0,12.066l-17.067,17.067 c-1.664,1.664-3.849,2.5-6.033,2.5c-2.185,0-4.369-0.836-6.033-2.5C93.03,181.897,93.03,176.503,96.367,173.167z M96.367,215.834 l76.8-76.8c3.337-3.337,8.73-3.337,12.066,0c3.336,3.336,3.336,8.73,0,12.066l-76.8,76.8c-1.664,1.664-3.849,2.5-6.033,2.5 c-2.185,0-4.369-0.836-6.033-2.5C93.03,224.563,93.03,219.17,96.367,215.834z"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </Svg>
    )
}



export function MirrorPlateIcon (props) {
    return (
        <Svg {...props}>
            <svg
                fill="currentColor"
                viewBox="0 0 297 297"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="SVGRepo_iconCarrier">
                    <g>
                        <path d="M0,26.671v55.858c0,2.063,1.673,3.736,3.736,3.736h58.408c2.063,0,3.736-1.673,3.736-3.736V19.948 c0-2.063-1.673-3.736-3.736-3.736H10.457C4.68,16.212,0,20.896,0,26.671z"></path>
                        <path d="M0,186.078c0,2.063,1.673,3.736,3.736,3.736h58.408c2.063,0,3.736-1.673,3.736-3.736v-75.157 c0-2.063-1.673-3.736-3.736-3.736H3.736c-2.063,0-3.736,1.673-3.736,3.736V186.078z"></path>
                        <path d="M0,270.329c0,5.775,4.68,10.458,10.457,10.458h51.688c2.063,0,3.736-1.673,3.736-3.736v-62.577 c0-2.064-1.673-3.736-3.736-3.736H3.736c-2.063,0-3.736,1.673-3.736,3.736V270.329z"></path>
                        <path d="M286.542,0.982H96.736c-4.835,0-8.889,3.283-10.089,7.734v279.566c1.2,4.451,5.254,7.734,10.089,7.734h189.806 c5.776,0,10.458-4.686,10.458-10.461V11.445C297,5.668,292.318,0.982,286.542,0.982z M237.855,147.27l-77.648,77.663 c-2.041,2.039-4.72,3.064-7.393,3.064c-2.674,0-5.358-1.024-7.399-3.064c-4.082-4.086-4.082-10.708,0-14.792l77.652-77.667 c4.084-4.084,10.704-4.084,14.789,0C241.939,136.559,241.939,143.183,237.855,147.27z M237.855,86.863l-77.648,77.662 c-2.041,2.042-4.72,3.064-7.393,3.064c-2.674,0-5.358-1.022-7.399-3.064c-4.082-4.085-4.082-10.71,0-14.796l77.652-77.663 c4.084-4.083,10.704-4.083,14.789,0C241.939,76.154,241.939,82.773,237.855,86.863z"></path>
                    </g>
                </g>
            </svg>
        </Svg>
    )
}


/*
    ++ HouseIcon
    ++ DoorIcon
    ++ KeyIcon
    ++ SofaIcon
    ++ BedIcon
    ++ BedroomIcon
    ++ BathIcon
ArmchairIcon
TableIcon
ChairIcon
DeskIcon
WardrobeIcon
CabinetIcon
ShelfIcon
LampIcon
ChandelierIcon
MirrorIcon
DishwasherIcon
RefregiratorIcon
WashingMachineIcon
DryerIcon
OvenIcon
MicrowaveIcon
StoveIcon
ToasterIcon
CoffeeMakerIcon
BlenderIcon
ShowerIcon
BathtubIcon
SinkIcon
FaucetIcon
SoapIcon
BroomIcon
VacuumCleanerIcon
MopIcon
LaundryBasketIcon
ThermostatIcon
AirConditionerIcon
FanIcon
HeaterIcon
    ++ LightbulbIcon
PlugIcon
HammerIcon
FenceIcon
GardenIcon
*/
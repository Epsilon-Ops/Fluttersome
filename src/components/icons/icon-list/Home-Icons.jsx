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
            <svg fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCurrentColorarrier" stroke-width="0"></g><g id="SVGRepo_tracerCurrentColorarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCurrentColorarrier"><path d="M15,16.372a7.5,7.5,0,1,0-6,0V18h6ZM11.221,6.087a3.5,3.5,0,0,0-2.7,3.023,1,1,0,0,1-.992.89,1.065,1.065,0,0,1-.112-.006,1,1,0,0,1-.884-1.1,5.5,5.5,0,0,1,4.246-4.754,1,1,0,0,1,.442,1.951ZM9,20h6v1a1,1,0,0,1-1,1H10a1,1,0,0,1-1-1Z"></path></g></svg>
        </Svg>
    )
}

export function LightbulbPowerIcon (props) {
    return (
        <Svg {...props}>
            <svg fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCurrentColorarrier" stroke-width="0"></g><g id="SVGRepo_tracerCurrentColorarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCurrentColorarrier"><path d="M15,16.372a7.5,7.5,0,1,0-6,0V18h6ZM14.1,12c-.034,0-.066.005-.1.005a1,1,0,0,1-.707-.293L12,10.414l-1.293,1.293a1,1,0,0,1-1.539-.152l-2-3a1,1,0,1,1,1.664-1.11l1.323,1.986,1.138-1.138a1,1,0,0,1,1.414,0l1.138,1.138,1.323-1.986a1,1,0,0,1,1.664,1.11l-2,3A1,1,0,0,1,14.1,12ZM9,20h6v1a1,1,0,0,1-1,1H10a1,1,0,0,1-1-1Z"></path></g></svg>
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

export function SofaShortIcon (props) {
    return (
        <Svg {...props}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.7497 12.75C20.7166 8.86578 21.1456 6.84737 20.134 5.42821C20.0665 5.33345 19.9948 5.24169 19.9193 5.15317C18.7216 3.75 16.4811 3.75 11.9999 3.75C7.5188 3.75 5.27824 3.75 4.08059 5.15317C4.00504 5.24169 3.93339 5.33345 3.86584 5.42821C2.85424 6.84737 3.28329 8.86578 4.25017 12.75H19.7497Z" fill="currentColor"></path> <path d="M4.75 17.75V19.75C4.75 20.1642 4.41421 20.5 4 20.5C3.58579 20.5 3.25 20.1642 3.25 19.75V17.6046C2.51704 17.3079 2 16.5893 2 15.75C2 14.6454 2.89543 13.75 4 13.75H20C21.1046 13.75 22 14.6454 22 15.75C22 16.5893 21.483 17.3079 20.75 17.6046V19.75C20.75 20.1642 20.4142 20.5 20 20.5C19.5858 20.5 19.25 20.1642 19.25 19.75V17.75H4.75Z" fill="CurrentColor"></path> </g></svg>
        </Svg>
    )
}

export function SofaLongIcon (props) {
    return (
        <Svg {...props}>
            <svg fill="currentColor" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <polygon points="93.775,353.794 93.775,405.889 418.225,405.889 418.225,390.681 418.225,353.794 "></polygon> </g> </g> <g> <g> <path d="M80.569,106.111c-26.958,0-48.891,21.932-48.891,48.891v63.653h13.706c26.436,0,47.975,21.31,48.372,47.654h0.01h147.025 V106.111H80.569z"></path> </g> </g> <g> <g> <path d="M431.431,106.111H271.208v160.197h147.025h0.011c0.396-26.342,21.936-47.654,48.372-47.654h13.706v-63.653 C480.321,128.042,458.39,106.111,431.431,106.111z"></path> </g> </g> <g> <g> <rect x="93.776" y="296.72" width="324.45" height="26.653"></rect> </g> </g> <g> <g> <path d="M45.385,249.071H17.974C8.063,249.071,0,257.134,0,267.044v138.844h63.358V267.045 C63.358,257.135,55.295,249.071,45.385,249.071z"></path> </g> </g> <g> <g> <path d="M494.026,249.07h-27.411c-9.91,0-17.974,8.063-17.974,17.974v29.68v14.626v42.444v52.095h63.357V267.044H512 C512,257.134,503.937,249.07,494.026,249.07z"></path> </g> </g> </g></svg>
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


export function SinkIcon({ size = 20, className = '', ...props }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 512 512"
            fill="currentColor"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...props}
        >
            <path d="M454.609,185.027H321.515V166.19h51.591v-30.417h-82.008v49.253h-19.89V50.865c0-11.275,9.173-20.447,20.447-20.447c11.274,0,20.446,9.172,20.446,20.447v30.828h30.417V50.865C342.519,22.817,319.701,0,291.656,0c-28.047,0-50.865,22.817-50.865,50.865v134.162h-19.89v-49.253h-82.008v30.417h51.591v18.836H57.39c-19.567,0-35.487,15.919-35.487,35.487c0,17.28,12.417,31.706,28.796,34.845c6.651,94.654,77.582,171.855,169.307,188.101v32.546c0,19.847,16.146,35.994,35.994,35.994c19.847,0,35.994-16.146,35.994-35.994v-32.546c91.726-16.245,162.656-93.446,169.307-188.101c16.378-3.139,28.796-17.565,28.796-34.845C490.096,200.946,474.177,185.027,454.609,185.027z M344.503,368.138c-26.079,18.174-56.682,27.78-88.504,27.78v-30.417c25.572,0,50.162-7.718,71.113-22.318c20.498-14.285,36.105-34.072,45.136-57.223l28.338,11.053C389.357,325.8,369.965,350.395,344.503,368.138z" />
        </svg>
    )
}

export function ToiletPaperIcon({ size = 20, className = '', ...props }) {
    return (
        <svg fill="currentColor" height={size} width={size} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 297 297" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M290.617,10.009C290.617,4.481,286.136,0,280.61,0H16.391C10.864,0,6.383,4.481,6.383,10.009v181.649 c0,5.527,4.481,10.009,10.008,10.009c5.527,0,10.009-4.482,10.009-10.009v-18.431c0-2.534,2.054-4.588,4.588-4.588h8.102 c2.534,0,4.588,2.054,4.588,4.588v113.764c0,3.327,1.653,6.436,4.411,8.297c1.678,1.132,3.631,1.712,5.599,1.712 c1.266,0,2.538-0.241,3.746-0.728l27.863-11.252l27.857,11.252c2.404,0.972,5.092,0.972,7.496,0l27.857-11.25l27.854,11.25 c2.403,0.972,5.091,0.972,7.496,0l27.855-11.25l27.854,11.25c3.085,1.245,6.588,0.878,9.346-0.983 c2.758-1.86,4.411-4.97,4.411-8.297V168.64h12.69c2.534,0,4.588,2.054,4.588,4.588v18.431c0,5.527,4.481,10.009,10.009,10.009 c5.526,0,10.008-4.482,10.008-10.009V10.009z M73.411,218.181H57.399c-5.528,0-10.009-4.481-10.009-10.009 c0-5.526,4.48-10.008,10.009-10.008h16.013c5.526,0,10.009,4.481,10.009,10.008C83.42,213.699,78.938,218.181,73.411,218.181z M127.509,218.181h-16.013c-5.526,0-10.009-4.481-10.009-10.009c0-5.526,4.482-10.008,10.009-10.008h16.013 c5.528,0,10.009,4.481,10.009,10.008C137.518,213.699,133.037,218.181,127.509,218.181z M183.556,218.181h-16.014 c-5.526,0-10.008-4.481-10.008-10.009c0-5.526,4.481-10.008,10.008-10.008h16.014c5.527,0,10.008,4.481,10.008,10.008 C193.564,213.699,189.083,218.181,183.556,218.181z M239.602,218.181h-16.013c-5.526,0-10.009-4.481-10.009-10.009 c0-5.526,4.482-10.008,10.009-10.008h16.013c5.528,0,10.009,4.481,10.009,10.008C249.611,213.699,245.13,218.181,239.602,218.181z M265.681,119.099c2.717,0,4.919,2.202,4.919,4.919v20.017c0,2.534-2.054,4.588-4.588,4.588h-8.102 c-2.534,0-4.588-2.054-4.588-4.588v-0.332c0-2.534-2.054-4.588-4.588-4.588H48.265c-2.534,0-4.588,2.054-4.588,4.588 c0,2.717-2.202,4.919-4.919,4.919h-7.439c-2.717,0-4.919-2.202-4.919-4.919v-19.686c0-2.717,2.203-4.919,4.919-4.919H265.681z"></path> </g></svg>
    )
}


export function ToiletIcon({ size = 20, className = '', ...props }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 512 512"
            fill="currentColor"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...props}
        >
            <path d="M378.345,481.583v-79.877C346.76,432.603,303.569,451.684,256,451.684s-90.761-19.08-122.345-49.977v79.877h-25.638V512h25.638h244.69h25.638v-30.417H378.345z" />

            <path d="M395.243,0H116.757C97.19,0,81.271,15.919,81.271,35.487c0,16.045,10.707,29.629,25.348,34.003v120.945h298.763v-0.001V69.49c14.641-4.374,25.348-17.958,25.348-34.003C430.729,15.919,414.81,0,395.243,0z M356.039,121.669h-78.697V91.252h78.697V121.669z" />

            <path d="M412.428,220.851H99.572c-19.567,0-35.487,15.919-35.487,35.487c0,12.86,6.876,24.143,17.145,30.369c5.355,3.247,11.635,5.118,18.342,5.118h12.576c7.625,72.638,69.227,129.442,143.852,129.442s136.227-56.803,143.852-129.442h12.576c6.707,0,12.986-1.872,18.342-5.118c10.269-6.225,17.145-17.508,17.145-30.369C447.915,236.77,431.996,220.851,412.428,220.851z" />
        </svg>
    )
}

export function TVIcon({ size = 20, className = '', ...props }) {
    return (
        <svg
            fill="currentColor"
            height={size}
            width={size}
            viewBox="0 0 512 512"
        ><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <polygon points="76.043,116.419 76.043,312.017 271.641,116.419 "></polygon> </g> </g> <g> <g> <polygon points="314.657,116.419 97.551,333.525 197.343,333.525 414.449,116.419 "></polygon> </g> </g> <g> <g> <polygon points="240.359,333.525 435.957,333.525 435.957,137.927 "></polygon> </g> </g> <g> <g> <path d="M512,409.567V40.376H0v369.191h173.282v31.64h-51.393v30.417h51.393h165.435h51.393v-30.417h-51.393v-31.64H512z M45.626,363.942V86.002h420.748v277.94H45.626z"></path> </g> </g> </g></svg>
    )
}

export function SafeboxIcon({ size = 20, className = '', ...props }) {
    return (
<svg fill="currentColor" height={size} width={size} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
  <g id="SVGRepo_bgCarrier" stroke-width="0"/>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
  <g id="SVGRepo_iconCarrier">
    <g>
      <g>
        <path d="M322.598,255.865v-30.417h21.906c-2.304-13.448-7.604-25.886-15.193-36.595l-15.465,15.465l-21.508-21.508l15.465-15.465 c-10.709-7.589-23.146-12.89-36.595-15.193v21.906h-30.417v-21.906c-13.448,2.304-25.886,7.604-36.595,15.193l15.465,15.465 l-21.508,21.508l-15.465-15.465c-7.589,10.709-12.89,23.146-15.193,36.595h21.906v30.417h-21.906 c2.304,13.448,7.604,25.885,15.194,36.594l15.465-15.465l21.508,21.508l-15.465,15.465c10.709,7.589,23.146,12.89,36.594,15.193 v-21.906h30.417v21.906c13.448-2.304,25.885-7.604,36.594-15.193l-15.465-15.465l21.508-21.508l15.465,15.465 c7.589-10.709,12.89-23.146,15.194-36.594H322.598z M256,270.635c-16.556,0-29.978-13.422-29.978-29.978 c0-16.556,13.422-29.978,29.978-29.978c16.557,0,29.978,13.422,29.978,29.978C285.978,257.213,272.556,270.635,256,270.635z"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M99.836,81.112v29.213h16.582v30.417H99.836v184.62h16.582v30.417H99.836v44.421h331.05V81.112H99.836z M399.417,255.865 h-24.159C367.76,314.998,317.136,360.872,256,360.872c-66.287,0-120.216-53.929-120.216-120.216 C135.783,174.369,189.712,120.441,256,120.441c61.136,0,111.76,45.874,119.258,105.007h24.159V255.865z"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M0,0v481.313h30.417V512h30.417v-30.687h390.331V512h30.417v-30.687H512V0H0z M461.304,430.618H69.419v-74.838H52.837 v-30.417h16.582v-184.62H52.837v-30.417h16.582v-59.63h391.885V430.618z"/>
      </g>
    </g>
  </g>
</svg>
    )
}

export function FireplaceIcon({ size = 20, className = '', ...props }) {
    return (
        <svg fill="currentColor" width={size} height={size} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.002 512.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M117.56,228.259V455.53H394.44V228.259H117.56z M255.999,433.224c-41.288,0.001-74.759-33.469-74.759-74.758 c0-64.982,74.759-109.266,74.759-109.266s74.759,44.282,74.759,109.266C330.758,399.754,297.287,433.224,255.999,433.224z"></path> </g> </g> <g> <g> <rect x="424.857" y="228.26" width="75.759" height="55.479"></rect> </g> </g> <g> <g> <rect x="11.386" y="400.056" width="75.759" height="55.479"></rect> </g> </g> <g> <g> <polygon points="11.386,142.363 11.386,197.842 87.143,197.842 87.143,197.841 424.857,197.841 424.857,197.842 500.614,197.842 500.614,142.363 "></polygon> </g> </g> <g> <g> <rect x="11.386" y="314.158" width="75.759" height="55.479"></rect> </g> </g> <g> <g> <rect x="424.857" y="314.158" width="75.759" height="55.479"></rect> </g> </g> <g> <g> <rect x="424.857" y="400.056" width="75.759" height="55.479"></rect> </g> </g> <g> <g> <rect x="11.386" y="228.26" width="75.759" height="55.479"></rect> </g> </g> <g> <g> <rect y="56.467" width="512.002" height="55.479"></rect> </g> </g> <g> <g> <path d="M255.994,313.796c-12.329,12.406-24.059,28.603-24.059,44.671c0,13.268,10.796,24.063,24.065,24.063 s24.064-10.795,24.064-24.063C280.064,342.999,268.718,326.701,255.994,313.796z"></path> </g> </g> </g></svg>
    )
}


export function DuckbuoyIcon({ size = 20, className = '', ...props }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 68.893 68.893"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className={className}
            {...props}
        >
            <path
                fill="currentColor"
                d="M67.857,26.361l-6.393-3.518c-1.131-5.66-6.049-9.723-11.856-9.723c-0.655,0-1.316,0.054-1.967,0.16 c-3.191,0.521-5.989,2.255-7.876,4.881c-1.888,2.625-2.64,5.829-2.118,9.021c0.036,0.221,0.089,0.436,0.137,0.652 c-2.518-0.267-5.108-0.401-7.696-0.401C15.112,27.433,0,31.815,0,41.603s15.112,14.17,30.088,14.17s30.088-4.382,30.088-14.17 c0-2.691-1.148-4.971-3.115-6.866c1.211-0.951,2.253-2.121,3.036-3.486l7.118-1.164c0.842-0.138,1.503-0.794,1.648-1.635 C69.009,27.612,68.604,26.772,67.857,26.361z M30.088,44.773c-8.811,0-15.037-1.73-17.848-3.17c2.811-1.439,9.037-3.17,17.848-3.17 s15.037,1.73,17.848,3.17C45.125,43.042,38.899,44.773,30.088,44.773z M54.44,25.79c-1.477,0.242-2.87-0.76-3.111-2.237 c-0.242-1.477,0.76-2.87,2.237-3.111s2.87,0.76,3.111,2.237S55.916,25.548,54.44,25.79z"
            />
        </svg>
    );
}

export function ShowerIcon({ size = 20, className = '', ...props }) {
    return (
        <svg fill="currentColor" height={size} width={size} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 475.558 475.558" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_136_"> <path id="XMLID_137_" d="M259.988,404.297c0,14.408,11.67,26.079,26.078,26.079s26.078-11.671,26.078-26.079 c0-9.43-9.647-20.494-17.311-31.621c-4.198-6.094-13.164-6.092-17.368-0.001C269.8,383.78,259.988,394.887,259.988,404.297z"></path> <path id="XMLID_138_" d="M331.95,343.465c0,14.408,11.67,26.077,26.078,26.077s26.078-11.669,26.078-26.077 c0-9.425-9.646-20.491-17.312-31.619c-4.198-6.095-13.165-6.093-17.369-0.002C341.761,322.951,331.95,334.06,331.95,343.465z"></path> <path id="XMLID_139_" d="M188.026,343.465c0,14.408,11.67,26.077,26.078,26.077c14.408,0,26.078-11.669,26.078-26.077 c0-9.425-9.646-20.491-17.311-31.619c-4.198-6.095-13.166-6.093-17.369-0.002C197.838,322.951,188.026,334.06,188.026,343.465z"></path> <path id="XMLID_140_" d="M258.763,111.628c-54.178,9.808-95.189,48.058-97.801,94.514c-0.063,1.226,0.365,2.428,1.211,3.319 c0.843,0.892,2.021,1.4,3.247,1.4h241.294c1.225,0,2.404-0.509,3.23-1.4c0.845-0.892,1.29-2.093,1.227-3.319 c-2.69-47.77-45.932-86.887-102.401-95.294C298.931,48.16,244.722,0,179.304,0c-72.36,0-131.22,58.868-131.22,131.219v319.884 c0,13.51,10.954,24.454,24.454,24.454c13.502,0,24.454-10.944,24.454-24.454V131.219c0-45.39,36.921-82.311,82.311-82.311 C217.624,48.908,249.64,75.361,258.763,111.628z"></path> <path id="XMLID_141_" d="M411.171,234.001H160.962c-9.012,0-16.302,7.3-16.302,16.302c0,9.005,7.29,16.303,16.302,16.303h250.209 c9.012,0,16.303-7.298,16.303-16.303C427.474,241.302,420.183,234.001,411.171,234.001z"></path> </g> </g></svg>
    )
}



export function ShowerCurtainIcon({ size = 20, className = '', ...props }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="5.503 4.999 20.994 21.001"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className={className}
            {...props}
        >
            <path d="M23 18V9.922c-.005-1-1.202-2.24-2.406-.936.476 1.047.376 2.211-.305 3.288a1.38 1.38 0 0 1-2.175.212L15.388 9.61a1.44 1.44 0 0 1 .167-2.119c.879-.682 1.874-.829 2.839-.505.679-.759 1.76-1.564 3.29-1.564 1.467 0 2.584.744 3.316 1.715V5.501c0-.669-4.5-.669-4.5 0 0-.669-4.5-.669-4.5 0 0-.669-4.5-.669-4.5 0 0-.669-4.5-.669-4.5 0V18z" />

            <path d="m25.828 19.633-.728 2.998a.5.5 0 0 1-.482.369H7.382a.5.5 0 0 1-.482-.369l-.728-2.998a.5.5 0 0 1 .482-.631h18.691a.5.5 0 0 1 .483.631M26 6h-1v1h1c.663 0 .663-1 0-1m-7.161 5.798a.38.38 0 0 0 .604-.059c.357-.565.802-1.672-.046-2.823 1.75-2.824 4.655-1.153 4.655 1.005V18H25V9.922c0-3.2-4.05-5.107-6.31-1.686-.83-.542-1.719-.578-2.522.045a.44.44 0 0 0-.054.641zM7 6H6c-.663 0-.663 1 0 1h1zm3 18a1 1 0 1 0 0 2 1 1 0 0 0 0-2m12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
        </svg>
    );
}



// ToiletBrushIcon
// https://www.svgrepo.com/svg/174544/toilet-brush?edit=true

// RaddishLightbulbIcon
// https://www.svgrepo.com/svg/286101/light-bulb

// TrashBinRecycleIcon
// https://www.svgrepo.com/svg/286102/recycle-bin-trash

// KitchenKettleIcon
// https://www.svgrepo.com/svg/266636/kettle-food-and-restaurant

// FryingPanIcon
// https://www.svgrepo.com/svg/266637/frying-pan-pan

// KitchenTimerIcon
// https://www.svgrepo.com/svg/266638/timer

// CookingIcon
// https://www.svgrepo.com/svg/266639/ingredients-plate

// CookPotIcon
// https://www.svgrepo.com/svg/266643/pot-cooking

// SpoonIcon
// https://www.svgrepo.com/svg/266654/spoon

// ForkIcon
// https://www.svgrepo.com/svg/266657/fork

// KnifeIcon
// https://www.svgrepo.com/svg/266662/knife

// SpatulaIcon
// https://www.svgrepo.com/svg/266666/spatula

// RollinPinIcon
// https://www.svgrepo.com/svg/266668/rolling-pin

// PizzaCutterIcon
// https://www.svgrepo.com/svg/266671/pizza-cutter-food-and-restaurant

// MixerIcon
// https://www.svgrepo.com/svg/266667/mixer


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

/*
    HomeIcon
    HouseIcon
    HomeOutlineIcon
    HomeFilledIcon
    SmartHomeIcon
    HomeAutomationIcon
    HomeSecurityIcon
    HomeAssistantIcon
    HomeNetworkIcon
    HomeOfficeIcon
    HomeWorkspaceIcon
    HomeInteriorIcon
    HomeExteriorIcon
    HomeDesignIcon
    HomeDecorIcon
    HomeImprovementIcon
    HomeRenovationIcon
    HomeConstructionIcon
    HomeMaintenanceIcon
    HomeRepairIcon
    HomeCleaningIcon
    HomeOrganizationIcon
    HomeMovingIcon
    HomeOwnershipIcon
    HomeRentalIcon
    HomeSaleIcon
    RealEstateIcon
    ApartmentIcon
    BuildingIcon
    HouseBuildingIcon
    VillaIcon
    MansionIcon
    CottageIcon
    CabinIcon
    TinyHouseIcon
    TownhouseIcon
    DuplexIcon
    PenthouseIcon
    BungalowIcon
    FarmhouseIcon
    MobileHomeIcon
    ContainerHomeIcon
    EcoHouseIcon
    SustainableHomeIcon
    EnergyEfficientHomeIcon
    LivingRoomIcon
    BedroomIcon
    MasterBedroomIcon
    GuestRoomIcon
    KidsRoomIcon
    NurseryIcon
    KitchenIcon
    DiningRoomIcon
    BathroomIcon
    ToiletIcon
    ShowerIcon
    BathtubIcon
    LaundryRoomIcon
    UtilityRoomIcon
    HallwayIcon
    CorridorIcon
    EntranceIcon
    StaircaseIcon
    AtticIcon
    BasementIcon
    GarageIcon
    StorageRoomIcon
    ClosetIcon
    WalkInClosetIcon
    PantryIcon
    BalconyIcon
    TerraceIcon
    PatioIcon
    PorchIcon
    VerandaIcon
    GardenIcon
    BackyardIcon
    FrontYardIcon
    CourtyardIcon
    PoolIcon
    SwimmingPoolIcon
    HotTubIcon
    JacuzziIcon
    SaunaIcon
    FireplaceIcon
    ChimneyIcon
    RoofIcon
    WindowIcon
    DoorIcon
    FrontDoorIcon
    GarageDoorIcon
    GateIcon
    FenceIcon
    WallIcon
    FloorIcon
    CeilingIcon
    FloorPlanIcon
    HousePlanIcon
    BlueprintIcon
    ArchitectureIcon
    InteriorDesignIcon
    FurnitureIcon
    SofaIcon
    ArmchairIcon
    ChairIcon
    TableIcon
    CoffeeTableIcon
    DiningTableIcon
    DeskIcon
    BookshelfIcon
    CabinetIcon
    DrawerIcon
    WardrobeIcon
    BedIcon
    BunkBedIcon
    MattressIcon
    PillowIcon
    BlanketIcon
    DuvetIcon
    BedsideTableIcon
    NightstandIcon
    LampIcon
    TableLampIcon
    FloorLampIcon
    CeilingLightIcon
    ChandelierIcon
    PendantLightIcon
    WallLightIcon
    LEDLightIcon
    SmartLightingIcon
    LightSwitchIcon
    PowerOutletIcon
    ElectricalPanelIcon
    ElectricalWiringIcon
    ThermostatIcon
    HeatingIcon
    RadiatorIcon
    UnderfloorHeatingIcon
    AirConditioningIcon
    VentilationIcon
    AirPurifierIcon
    HumidifierIcon
    DehumidifierIcon
    WaterHeaterIcon
    BoilerIcon
    PlumbingIcon
    WaterPipeIcon
    WaterFilterIcon
    WaterSoftenerIcon
    WashingMachineIcon
    DryerIcon
    DishwasherIcon
    RefrigeratorIcon
    FreezerIcon
    OvenIcon
    MicrowaveIcon
    StoveIcon
    CooktopIcon
    RangeHoodIcon
    CoffeeMachineIcon
    ToasterIcon
    BlenderIcon
    VacuumCleanerIcon
    RobotVacuumIcon
    MopIcon
    BroomIcon
    CleaningSuppliesIcon
    LaundryBasketIcon
    IronIcon
    IroningBoardIcon
    ClothesHangerIcon
    TrashCanIcon
    RecyclingBinIcon
    CompostBinIcon
    SecurityCameraIcon
    DoorbellCameraIcon
    SmartDoorbellIcon
    MotionDetectorIcon
    AlarmSystemIcon
    SmokeDetectorIcon
    CarbonMonoxideDetectorIcon
    FireExtinguisherIcon
    FireAlarmIcon
    FirstAidKitIcon
    SmartLockIcon
    DoorLockIcon
    KeyIcon
    HouseKeyIcon
    KeypadLockIcon
    GarageSecurityIcon
    IntercomIcon
    BabyMonitorIcon
    PetDoorIcon
    PetHouseIcon
    DogHouseIcon
    HomeInsuranceIcon
    HomeValueIcon
    PropertyManagementIcon
    HouseholdBudgetIcon
    UtilityBillIcon
    ElectricityBillIcon
    WaterBillIcon
    GasBillIcon
    InternetBillIcon
    HomeEnergyIcon
    SolarRoofIcon
    SolarPanelIcon
    BatteryStorageIcon
    HomeBatteryIcon
    SmartMeterIcon
    EnergyMonitorIcon
    HomeWifiIcon
    HomeRouterIcon
    SmartPlugIcon
    SmartBulbIcon
    SmartSpeakerIcon
    SmartDisplayIcon
    SmartApplianceIcon
    HomeHubIcon
    VoiceAssistantIcon
    FamilyHomeIcon
    FamilyRoomIcon
    WelcomeHomeIcon
    HousewarmingIcon
    MovingBoxIcon
    PackageDeliveryIcon
    MailboxIcon
    DoormatIcon
    WelcomeMatIcon
    HomeSweetHomeIcon
*/
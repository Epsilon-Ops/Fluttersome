
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

export function SprintIcon({ size = 20, className = '', ...props }) {
    return (
        <svg fill="currentColor" size={size} {...props} viewBox="40.134 0.012 380.054 460.309" xml:space="preserve"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><circle cx="337.919" cy="42.972" r="42.96"/><path d="m402.237 198.249-72.702-11.532-33.681-73.593 41.722 51.133 8.427-24.601c4.6-13.43-2.558-28.047-15.988-32.647l-55.236-18.92c-13.4-4.59-27.98 2.528-32.614 15.901l-70.557 10.833a21.28 21.28 0 0 0-16.077 12.083l-35.764 77.132c-4.94 10.652-.314 23.311 10.354 28.257 10.663 4.944 23.313.308 28.257-10.354l30.965-66.781 37.251-5.72-33.465 97.701-37.442 62.949-78.407-42.62c-12.196-6.632-27.46-2.119-34.089 10.079-6.631 12.197-2.118 27.459 10.08 34.089l99.653 54.171c11.875 6.455 26.71 2.364 33.609-9.234l31.273-52.578 107.107 25.187v106c0 13.882 11.255 25.137 25.137 25.137s25.137-11.255 25.137-25.137V309.273c0-11.666-8.026-21.799-19.383-24.47l-55.082-12.953 8.423-24.59-.747-.118c-18.704-2.967-30.773-18.018-32.843-28.308l-17.165-85.297 37.193 81.266a21.34 21.34 0 0 0 16.017 12.162l83.971 13.319c11.488 1.823 22.499-6.006 24.351-17.684 1.84-11.607-6.076-22.51-17.685-24.351"/></svg>
    )
}

export function DualSprintIcon({ size = 20, className = '', ...props }) {
    return (
        <svg fill="currentColor" size={size} {...props} viewBox="0.002 9.848 490.05 470.352" xml:space="preserve"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="M487.652 134.923c-4.818-8.098-15.295-10.749-23.41-5.961l-57.391 34.111-7.147-20.398c5.333-16.806-2.604-35.251-19.119-42.505-7.135-3.149-20.197-9.487-28.36-9.728l-76.96 1.719a17.104 17.104 0 0 0-16.564 14.822l-8.58 64.211 27.717-16.469c3.004-1.798 6.216-2.885 9.461-3.623l3.358-25.096 24.311-.539-11.439 26.052c7.663 2.226 14.541 7.158 18.927 14.549 8.803 14.854 4.368 33.764-9.69 43.381-3.663 2.546-33.258 19.995-37.21 22.349l-12.677 61.834-57.168-17.032c-5.995-1.775-12.052-.617-16.999 2.419l34.076 30.768c5.738 5.183 9.32 12.01 10.926 19.313l39.202 11.68c11.923 3.527 24.263-3.896 26.77-16.026l11.471-55.903 42.626 36.809-20.743 110.418c-2.168 11.496 5.398 22.55 16.87 24.71 11.52 2.153 22.559-5.421 24.712-16.885l22.926-122.076a21.14 21.14 0 0 0-6.619-19.618l-37.29-33.685 26.091-59.432 1.752 4.98c3.632 10.379 15.746 14.476 24.857 9.054l75.353-44.779c8.114-4.827 10.78-15.31 5.96-23.424"/><path d="m175.118 287.574 6.555-14.918 11.393-25.947 8.162-18.582 1.752 5.005c3.598 10.225 15.617 14.516 24.855 9.046l75.354-44.779c8.128-4.829 10.797-15.312 5.961-23.425-4.821-8.098-15.279-10.742-23.409-5.961l-57.407 34.109-7.133-20.398c5.316-16.805-2.604-35.25-19.12-42.504l-13.674-6.01c-3.392-1.494-11.136-3.799-16.743-3.671l-74.887 1.67c-8.435.195-15.457 6.476-16.564 14.823l-10.233 76.59c-1.238 9.358 5.317 17.955 14.683 19.201 9.369 1.276 17.963-5.368 19.201-14.67l8.291-62.098 24.309-.54-35.268 80.327c-3.213 7.327-4.145 15.016-3.406 22.444l-13.432 65.393-57.148-17.03c-11.199-3.311-22.977 3.037-26.32 14.243-3.341 11.19 3.037 22.976 14.236 26.317L94.4 379.828c11.761 3.51 24.26-3.792 26.769-16.027 9.719-47.301 7.309-35.531 11.473-55.904l42.624 36.817-20.728 110.419c-2.15 11.48 5.415 22.533 16.887 24.703 11.535 2.152 22.543-5.456 24.696-16.903l22.911-122.068a21.16 21.16 0 0 0-6.604-19.61zm24.502-160.87c20.423 8.99 44.459-.225 53.521-20.846 9.028-20.541-.324-44.498-20.855-53.519-20.551-9.029-44.49.313-53.52 20.855-9.238 21.015 1.095 44.835 20.854 53.51m178.504-39.049c20.533 9.029 44.506-.298 53.535-20.847 9.029-20.543-.322-44.497-20.855-53.519-20.565-9.023-44.521.313-53.533 20.854-9.032 20.542.318 44.489 20.853 53.512"/></svg>
    )
}

export function SprintLogoIcon({ size = 20, className = '', ...props }) {
    return (
        <svg fill="currentColor" viewBox="2.667 0 26.604 31.995" size={size} {...props}><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="M2.839 31.995c7.323-2.411 17.943-8.026 25.328-13.042.62-.422 1.104-.813 1.104-1.495 0-1.182-2.208-2.771-3.276-3.406-5.813 5.943-17.38 14.849-23.156 17.943m6.796-5.047c4.516-3.073 11.078-8.854 13.297-11.995.526-.74.911-1.167.911-1.943 0-1.271-1.505-2.198-2.589-2.849-2.594 6.016-8.417 13.5-11.62 16.786zm3.454-4.703c3.125-3.958 5.583-8.609 5.583-11.948 0-1.745-1.271-2.958-2.927-3.885.031 3.625-1.245 12.135-2.656 15.833m.661-3.818c.583-3.797.24-8.38-.505-11.255-.406-1.568-1.839-3.333-3.167-3.885 1.74 4.859 3.234 11.776 3.672 15.141zm-1.286-5.328C11.094 9.464 7.683 1.88 2.667 0c3.266 3.547 8.109 10.578 9.797 13.099"/></svg>
    )
}

export function RunningIcon({ size = 20, className = '', ...props }) {
    return (
        <svg viewBox="3 1.5 16 21.5" fill="none" size={size} {...props}><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="M14 22v-5.039a2 2 0 0 0-.75-1.561L11.5 14m0 0L13 7.5M11.5 14 10 13m3-5.5L11 7m2 .5 2.043 3.268a2 2 0 0 0 1.303.901L18 12m-8 1 1-6m-1 6-.6 3.3a2 2 0 0 1-2.542 1.557L4 17m7-10L8.106 8.447A2 2 0 0 0 7 10.237V12m7.5-8.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    )
}

export function Running2Icon({ size = 20, className = '', ...props }) {
    return (
        <svg fill="currentColor" size={size} {...props} viewBox="14.767 0 65.167 94.701" xml:space="preserve" transform="scale(-1 1)"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><circle cx="38.232" cy="10.112" r="10.112"/><path d="M78.686 31.638c-8.871-8.275-20.822-11.452-29.286-12.66-.2-.029-3.549-.535-7.265.793-1.628.703-3.05 1.656-5.123 4.568-1.279 1.822-3.488 2.038-4.678 2.008-3.812-.103-7.859-2.705-10.311-6.63a3.923 3.923 0 0 0-5.409-1.25 3.925 3.925 0 0 0-1.25 5.409c3.867 6.192 10.289 10.146 16.759 10.32q.217.006.433.006c1.595 0 3.11-.252 4.518-.711l8.268 19.103a8 8 0 0 0 1.023 1.729c-2.163 5.939-5.7 16.143-5.8 19.597-.043 1.488.527 2.923 1.604 4.041.82.851 2.986 3.083 15.491 4.044l3.247 9.551a4.64 4.64 0 0 0 5.886 2.897 4.64 4.64 0 0 0 2.899-5.886l-2.088-6.143c.562.01 1.13.018 1.719.021h.037a4.64 4.64 0 0 0 .035-9.281c-1.61-.013-3.294-.054-4.979-.119l-.646-1.899 1.477-23.129c.054-.833-.083-1.889-.908-3.649l-6.742-15.579c5.434 1.653 11.149 4.311 15.734 8.588a3.9 3.9 0 0 0 2.678 1.055 3.924 3.924 0 0 0 2.677-6.794M50.377 71.739c.901-3.308 3.044-8.966 4.938-14.185.092-.012-.864 13.92-.864 13.92-.019.291-.07.871-.07.871s-2.919-.383-4.004-.606m1.71-62.667h17.75v1h-17.75zm6.035 4.043h11.625v1H58.122zm-4.447 3.874H65.3v1H53.675z"/></svg>
    )
}

export function PullUpIcon({ size = 20, className = '', ...props }) {
    return (
        <svg fill="currentColor" size={20} {...props} viewBox="69.693 0 319.149 458.534" xml:space="preserve"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="M182.541 312.391c-7.036 7.735-6.469 19.709 1.266 26.744 7.739 7.039 19.71 6.466 26.744-1.265l14.759-16.225-31.971-21.124z"/><path d="M376.446 8.5h-52.734c-2.306-5.033-7.386-8.5-13.231-8.5q-.22 0-.442.007c-5.718.171-10.553 3.625-12.79 8.493h-50.265a32.53 32.53 0 0 0-17.741-5.238A32.53 32.53 0 0 0 211.502 8.5h-50.217c-2.236-4.869-7.071-8.323-12.79-8.493-6.032-.183-11.314 3.332-13.678 8.493H82.088c-6.845 0-12.395 5.55-12.395 12.395v437.639h24.79V33.29h38.452l-1.542 51.63c-.236 7.893 5.864 14.536 13.748 14.973l42.148 2.334v94.761l-28.254 38.017a18.93 18.93 0 0 0 4.759 27.089l81.791 54.042c8.732 5.767 20.472 3.359 26.233-5.359 5.764-8.724 3.364-20.468-5.359-26.233l-65.098-43.012 23.107-31.092h8.673l8.207 37.304-.741.814 31.971 21.124 3.369-3.703a18.93 18.93 0 0 0 4.485-16.808l-9.576-43.526V102.249l42.537-2.355c7.885-.437 13.984-7.08 13.749-14.973L325.6 33.29h38.452v425.244h24.79V20.895c-.001-6.845-5.55-12.395-12.396-12.395m-78.835 63.102-47.103 3.422h-42.482l-47.103-3.422 1.144-38.312h34.596c-.071.881-.118 1.77-.118 2.67 0 18.059 14.639 32.698 32.698 32.698 18.058 0 32.697-14.639 32.697-32.698 0-.9-.046-1.788-.117-2.67h34.643z"/></svg>
    )
}

export function FitnessIcon({ size = 20, className = '', ...props }) {
    return (
        <svg fill="currentColor" size={20} {...props} viewBox="0.01 26.506 459.003 406" xml:space="preserve"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="m447.76 390.631-43.254-24.867 12.112 29.331c4.054 9.817 3.823 20.331.185 29.478 8.787 5.052 12.49 7.932 19.758 7.932 7.765 0 15.316-4.038 19.464-11.252 6.174-10.739 2.473-24.448-8.265-30.622m-99.2-116.282a22.42 22.42 0 0 0-9.375-10.78c-12.629-7.414-56.577-31.856-56.577-31.856L141.864 170.53l45.109-44.705a16.7 16.7 0 0 0 1.865-2.196l50.201-70.55c5.386-7.569 3.616-18.071-3.953-23.457-7.57-5.385-18.071-3.616-23.457 3.953l-49.363 69.372-51.48 51.667c-3.201 3.609-6.057 7.954-7.803 12.71l-31.827 73.047c-1.986 5.306-2.995 10.298-1.541 18.197l33.679 155.075c1.978 9.107 10.964 14.836 20.007 12.867 9.078-1.971 14.839-10.929 12.867-20.007l-31.163-143.489 126.118 54.95.071-.102 89.967 51.724-28.016-67.846-36.061-20.732 6.923-9.855c1.921 1.531-1.578-.634 45.97 27.281l49.635 120.199c4.732 11.459 17.848 16.892 29.289 12.17 11.449-4.729 16.897-17.841 12.17-29.29z"/><circle cx="38.933" cy="179.972" r="38.923"/></svg>
    )
}

export function IceSkateIcon({ size = 20, className = '', ...props }) {
    return (
        <svg fill="currentColor" size={20} {...props} viewBox="0.01 26.506 459.003 406" xml:space="preserve"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="m447.76 390.631-43.254-24.867 12.112 29.331c4.054 9.817 3.823 20.331.185 29.478 8.787 5.052 12.49 7.932 19.758 7.932 7.765 0 15.316-4.038 19.464-11.252 6.174-10.739 2.473-24.448-8.265-30.622m-99.2-116.282a22.42 22.42 0 0 0-9.375-10.78c-12.629-7.414-56.577-31.856-56.577-31.856L141.864 170.53l45.109-44.705a16.7 16.7 0 0 0 1.865-2.196l50.201-70.55c5.386-7.569 3.616-18.071-3.953-23.457-7.57-5.385-18.071-3.616-23.457 3.953l-49.363 69.372-51.48 51.667c-3.201 3.609-6.057 7.954-7.803 12.71l-31.827 73.047c-1.986 5.306-2.995 10.298-1.541 18.197l33.679 155.075c1.978 9.107 10.964 14.836 20.007 12.867 9.078-1.971 14.839-10.929 12.867-20.007l-31.163-143.489 126.118 54.95.071-.102 89.967 51.724-28.016-67.846-36.061-20.732 6.923-9.855c1.921 1.531-1.578-.634 45.97 27.281l49.635 120.199c4.732 11.459 17.848 16.892 29.289 12.17 11.449-4.729 16.897-17.841 12.17-29.29z"/><circle cx="38.933" cy="179.972" r="38.923"/></svg>
    )
}

export function RunningShoeIcon({ size = 20, className = '', ...props }) {
    return (
        <svg size={size} {...props} viewBox="0 0 29 32" xml:space="preserve" fill="currentColor"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="M27 32h-9.1c-1.5 0-2.8-.6-3.9-1.6L.3 16.7c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L15.4 29c.7.6 1.5 1 2.5 1H27c.6 0 1 .4 1 1s-.4 1-1 1"/><path d="M27.1 23H17c-.6 0-1-.4-1-1s.4-1 1-1h5.8c-.4-.3-.7-.6-1-1H15c-.6 0-1-.4-1-1s.4-1 1-1h5.6c-.4-1.1-.6-2.4-.6-4 0-.3-.1-.5-.3-.7s-.4-.3-.7-.3h-1c-3.3 0-7-3.7-7-7 0-.4-.3-.8-.6-.9-.4-.2-.9-.1-1.2.2l-7 8c-.3.4-.3 1 0 1.4L15 27.4c1 1 2.4 1.6 3.9 1.6H27c.5 0 .9-.3 1-.8l.4-1.8c.2-.9.1-1.8-.4-2.5q-.3-.45-.9-.9m-16.6-5C9.1 18 8 16.9 8 15.5S9.1 13 10.5 13s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5"/><path d="M19 15.7c-.4 0-.8-.3-1-.7-.7-2.6 0-5.5 2-7.4L27.3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4L21.4 9c-1.4 1.4-2 3.5-1.5 5.5.1.5-.2 1.1-.7 1.2zM10 8c-.4 0-.8-.3-.9-.7-.2-.5.1-1.1.6-1.2 1.7-.6 3.2-1.7 4.1-3.3L15.2.5c.2-.5.8-.6 1.3-.4.5.3.6.9.4 1.4l-1.4 2.3c-1.2 2-3 3.4-5.2 4.1-.1.1-.2.1-.3.1"/></svg>
    )
}

// RaceflagIcon
// https://www.svgrepo.com/svg/3532/race-flag

// ShotputIcon
// https://www.svgrepo.com/svg/54615/shot-put

// LongjumpIcon
// https://www.svgrepo.com/svg/28646/long-jump

// AthleticsMedalIcon
// https://www.svgrepo.com/svg/253681/medal-sports-and-competition

// HighjumpIcon
// https://www.svgrepo.com/svg/158691/high-jump

// TrainwathcIcon
// https://www.svgrepo.com/svg/107351/training-watch

// DoubleDumbbellIcon
// https://www.svgrepo.com/svg/525854/dumbbells

// LargeDumbellIcon
// https://www.svgrepo.com/svg/351979/dumbbell

// PunchingBagIcon
// https://www.svgrepo.com/svg/323070/punching-bag

// RunFootIcon
// https://www.svgrepo.com/svg/390336/gym-running-foot-run

// HanddummbellIcon
// https://www.svgrepo.com/svg/256447/gym-dumbbell

// GymMedalIcon
// https://www.svgrepo.com/svg/51431/gym-medal-necklace

// GymLockerIcon
// https://www.svgrepo.com/svg/380940/locker-school-gym-storage-safety

// FitnessIcon
// https://www.svgrepo.com/svg/2084/fitness

// StretchingIcon
// https://www.svgrepo.com/svg/2472/stretching

// PushUpIcon
// https://www.svgrepo.com/svg/9896/push-up

// TractionIcon
// https://www.svgrepo.com/svg/9909/fitness

// WeightLiftIcon
// https://www.svgrepo.com/svg/19026/weight-lifting

// JumpRopeIcon
// https://www.svgrepo.com/svg/20863/jumping-rope

// YogaIcon
// https://www.svgrepo.com/svg/32903/yoga

// CyclingIcon
// https://www.svgrepo.com/svg/66427/cycling

// TennisIcon
// https://www.svgrepo.com/svg/69683/tennis

// IceSkateIcon
// https://www.svgrepo.com/svg/74593/ice-skate

// ExerciseBallIcon
// https://www.svgrepo.com/svg/76084/exercise-ball

// HulaHoopIcon
// https://www.svgrepo.com/svg/76085/hula-hoop

// StepsUpIcon
// https://www.svgrepo.com/svg/65701/steps

// WinnerIcon
// https://www.svgrepo.com/svg/5059/winner

// WinnerMedalIcon
// https://www.svgrepo.com/svg/10378/medal

// MedalIcon
// https://www.svgrepo.com/svg/11536/medal

// OlympicsIcon
// https://www.svgrepo.com/svg/28920/olympia

// GymnastIcon
// https://www.svgrepo.com/svg/29236/gymnast

// BaseballIcon
// https://www.svgrepo.com/svg/30982/baseball

// FencingIcon
// https://www.svgrepo.com/svg/29952/fencing

// BasketballIcon
// https://www.svgrepo.com/svg/68530/basketball

// FinishIcon
// https://www.svgrepo.com/svg/68529/finish

// SwimmingIcon
// https://www.svgrepo.com/svg/69218/swimmer

// BasketballBallIcon
// https://www.svgrepo.com/svg/77074/ball

// VictoryChaliceIcon
// https://www.svgrepo.com/svg/85869/chalice

// OlympicTorchIcon
// https://www.svgrepo.com/svg/87731/olympic-torch

// WrestlingIcon
// https://www.svgrepo.com/svg/98463/wrestling

// PingpongIcon
// https://www.svgrepo.com/svg/117925/pin-pong

// FlagIcon
// https://www.svgrepo.com/svg/123452/flag

// WeightlifterIcon
// https://www.svgrepo.com/svg/133507/weightlifting

// SprintLanesIcon
// https://www.svgrepo.com/svg/134722/lanes

// TrackFieldIcon
// https://www.svgrepo.com/svg/142366/stadium

// VolleyballIcon
// https://www.svgrepo.com/svg/156534/volleyball

// RubgyBallIcon
// https://www.svgrepo.com/svg/352061/football-ball

// FootballBallIcon
// https://www.svgrepo.com/svg/205018/football-soccer

// BowlingBallIcon
// https://www.svgrepo.com/svg/37916/bowling-ball

// FootballIcon
// https://www.svgrepo.com/svg/103289/soccer-player-motion

// PoleVaultIcon
// https://www.svgrepo.com/svg/140776/pole-vault

// FootballFourIcon
// https://www.svgrepo.com/svg/9421/soccer-player-number-four
  
/*
    SprintMusculationIcon
    SprintIcon
    RunningIcon
    RunnerIcon
    SprintRunningIcon
    SpeedRunningIcon
    FastRunningIcon
    TrackRunningIcon
    AthleticsIcon
    TrackAndFieldIcon
    TrackAthleteIcon
    SprinterIcon
    SprintTrainingIcon
    SprintWorkoutIcon
    SprintExerciseIcon
    SprintDrillIcon
    AccelerationIcon
    MaximumSpeedIcon
    ExplosiveSpeedIcon
    RunningSpeedIcon
    SpeedTrainingIcon
    SpeedDevelopmentIcon
    SpeedAndPowerIcon
    SprintTechniqueIcon
    RunningTechniqueIcon
    RunningFormIcon
    SprintMechanicsIcon
    StrideLengthIcon
    StrideFrequencyIcon
    RunningCadenceIcon
    FootStrikeIcon
    GroundContactTimeIcon
    SprintStartIcon
    BlockStartIcon
    StartingBlocksIcon
    ReactionTimeIcon
    StartReactionIcon
    SprintFinishIcon
    FinishLineIcon
    RunningTrackIcon
    AthleticsTrackIcon
    TrackLaneIcon
    RunningShoesIcon
    SprintSpikesIcon
    TrackSpikesIcon
    RunningGearIcon
    StopwatchIcon
    SprintTimerIcon
    LapTimerIcon
    RunningTimerIcon
    SplitTimeIcon
    RaceClockIcon
    SpeedometerIcon
    VelocityIcon
    AccelerationMeterIcon
    DistanceIcon
    RunningDistanceIcon
    SprintDistanceIcon
    10mSprintIcon
    20mSprintIcon
    30mSprintIcon
    40mSprintIcon
    50mSprintIcon
    60mSprintIcon
    100mSprintIcon
    200mSprintIcon
    400mSprintIcon
    IntervalRunningIcon
    IntervalTrainingIcon
    HIITIcon
    HighIntensityTrainingIcon
    FartlekTrainingIcon
    TempoRunningIcon
    EnduranceRunningIcon
    AerobicCapacityIcon
    AnaerobicCapacityIcon
    VO2MaxIcon
    LactateThresholdIcon
    RunningStaminaIcon
    MusculationIcon
    StrengthTrainingIcon
    WeightTrainingIcon
    ResistanceTrainingIcon
    StrengthWorkoutIcon
    MuscleTrainingIcon
    MuscleBuildingIcon
    MuscleGrowthIcon
    HypertrophyIcon
    BodybuildingIcon
    FitnessIcon
    GymIcon
    GymWorkoutIcon
    WorkoutIcon
    ExerciseIcon
    PhysicalTrainingIcon
    AthleticTrainingIcon
    SportsPerformanceIcon
    AthleticPerformanceIcon
    PowerTrainingIcon
    ExplosivePowerIcon
    PlyometricTrainingIcon
    PlyometricsIcon
    JumpTrainingIcon
    JumpSquatIcon
    BoxJumpIcon
    BroadJumpIcon
    VerticalJumpIcon
    DepthJumpIcon
    MedicineBallIcon
    MedicineBallThrowIcon
    ResistanceBandIcon
    ElasticBandIcon
    WeightliftingIcon
    OlympicWeightliftingIcon
    BarbellIcon
    DumbbellIcon
    KettlebellIcon
    WeightPlateIcon
    WeightStackIcon
    BenchPressIcon
    SquatIcon
    BackSquatIcon
    FrontSquatIcon
    DeadliftIcon
    RomanianDeadliftIcon
    LungesIcon
    SplitSquatIcon
    BulgarianSplitSquatIcon
    LegPressIcon
    LegExtensionIcon
    LegCurlIcon
    HamstringCurlIcon
    CalfRaiseIcon
    HipThrustIcon
    GluteBridgeIcon
    GluteTrainingIcon
    HamstringTrainingIcon
    QuadricepsTrainingIcon
    CalfTrainingIcon
    LowerBodyTrainingIcon
    UpperBodyTrainingIcon
    FullBodyWorkoutIcon
    CoreTrainingIcon
    AbdominalTrainingIcon
    PlankIcon
    PushUpIcon
    PullUpIcon
    ChinUpIcon
    DipIcon
    RowingExerciseIcon
    LatPulldownIcon
    ShoulderPressIcon
    OverheadPressIcon
    BicepsCurlIcon
    TricepsExtensionIcon
    ChestPressIcon
    InclineBenchPressIcon
    FunctionalTrainingIcon
    CircuitTrainingIcon
    CrossTrainingIcon
    CrossFitIcon
    CalisthenicsIcon
    BodyweightTrainingIcon
    IsometricTrainingIcon
    EccentricTrainingIcon
    ConcentricTrainingIcon
    IsotonicTrainingIcon
    MuscleActivationIcon
    NeuromuscularTrainingIcon
    MotorControlIcon
    CoordinationIcon
    AgilityIcon
    AgilityTrainingIcon
    LadderDrillIcon
    ConeDrillIcon
    HurdleDrillIcon
    MiniHurdlesIcon
    SprintHurdlesIcon
    ReactionDrillIcon
    ChangeOfDirectionIcon
    DirectionChangeIcon
    LateralMovementIcon
    AccelerationDrillIcon
    DecelerationDrillIcon
    ResistedSprintIcon
    SledSprintIcon
    SledPushIcon
    SledPullIcon
    HillSprintIcon
    UphillRunningIcon
    DownhillRunningIcon
    TreadmillRunningIcon
    ParachuteSprintIcon
    ResistanceSprintIcon
    PartnerSprintIcon
    FlyingSprintIcon
    OverspeedTrainingIcon
    AssistedSprintIcon
    RecoveryRunIcon
    WarmUpIcon
    DynamicWarmUpIcon
    MobilityIcon
    MobilityTrainingIcon
    FlexibilityIcon
    StretchingIcon
    DynamicStretchingIcon
    StaticStretchingIcon
    FoamRollingIcon
    MassageRollerIcon
    MuscleRecoveryIcon
    ActiveRecoveryIcon
    RestDayIcon
    RecoverySessionIcon
    CoolDownIcon
    InjuryPreventionIcon
    InjuryRehabilitationIcon
    SportsPhysiotherapyIcon
    MuscleFatigueIcon
    MuscleSorenessIcon
    DOMSIcon
    MuscleBalanceIcon
    PostureIcon
    StabilityIcon
    BalanceTrainingIcon
    AnkleStabilityIcon
    KneeStabilityIcon
    HipStabilityIcon
    JointMobilityIcon
    TendonTrainingIcon
    AchillesTendonIcon
    HamstringHealthIcon
    SportsNutritionIcon
    NutritionIcon
    ProteinIcon
    ProteinShakeIcon
    HydrationIcon
    WaterBottleIcon
    ElectrolytesIcon
    EnergyIcon
    EnergyBalanceIcon
    CalorieBurnIcon
    BodyCompositionIcon
    BodyFatIcon
    LeanMuscleIcon
    MuscleMassIcon
    WeightScaleIcon
    BodyWeightIcon
    HeartRateIcon
    HeartRateMonitorIcon
    CardioIcon
    CardiovascularTrainingIcon
    HeartRateZoneIcon
    FitnessTrackerIcon
    SmartwatchIcon
    SportsWatchIcon
    GPSRunningIcon
    RunningAppIcon
    TrainingLogIcon
    WorkoutLogIcon
    TrainingPlanIcon
    WorkoutPlanIcon
    TrainingScheduleIcon
    TrainingProgramIcon
    PeriodizationIcon
    TrainingCycleIcon
    TrainingVolumeIcon
    TrainingIntensityIcon
    TrainingLoadIcon
    ProgressiveOverloadIcon
    RepetitionIcon
    SetsIcon
    RestIntervalIcon
    PersonalRecordIcon
    PerformanceTrackingIcon
    ProgressTrackingIcon
    FitnessAssessmentIcon
    StrengthTestIcon
    SpeedTestIcon
    SprintTestIcon
    VerticalJumpTestIcon
    BroadJumpTestIcon
    OneRepMaxIcon
    RMTestIcon
    MaxStrengthIcon
    RelativeStrengthIcon
    PowerOutputIcon
    ForceProductionIcon
    ForceVelocityIcon
    BiomechanicsIcon
    RunningBiomechanicsIcon
    SportsScienceIcon
    ExerciseScienceIcon
    PerformanceAnalysisIcon
    VideoAnalysisIcon
    MotionCaptureIcon
    MovementAnalysisIcon
    AthleteProfileIcon
    AthleteIcon
    CoachIcon
    PersonalTrainerIcon
    StrengthCoachIcon
    SprintCoachIcon
    SportsCoachIcon
    TrainingPartnerIcon
    SportsTeamIcon
    AthleticsClubIcon
    TrackClubIcon
    CompetitionIcon
    RaceIcon
    SprintRaceIcon
    RelayRaceIcon
    RelayBatonIcon
    PodiumIcon
    MedalIcon
    TrophyIcon
    ChampionshipIcon
    PersonalBestIcon
    WorldRecordIcon
    OlympicAthleticsIcon
    SportsMotivationIcon
    FitnessGoalIcon
    TrainingGoalIcon
    DisciplineIcon
    ConsistencyIcon
    DeterminationIcon
    MotivationIcon
    FocusIcon
    MentalPreparationIcon
    SportsPsychologyIcon
    VisualizationIcon
    BreathingExerciseIcon
    MindBodyConnectionIcon
    AthleteLifestyleIcon
    SportsEducationIcon
    TrainingCourseIcon
    CoachingSessionIcon
    TrainingSessionIcon
    SprintSessionIcon
    StrengthSessionIcon
    GymSessionIcon
    WorkoutCalendarIcon
    FitnessCommunityIcon
    SportsCommunityIcon
    FitnessChallengeIcon
    TrainingChallengeIcon
    SportsPerformanceCenterIcon
    AthleticDevelopmentIcon
    YouthAthleticsIcon
    YouthStrengthTrainingIcon
    AmateurAthleticsIcon
    ProfessionalAthleticsIcon
    SportsRehabilitationIcon
    SportsRecoveryIcon
    FitnessTechnologyIcon
    TrainingEquipmentIcon
    GymEquipmentIcon
    WeightliftingPlatformIcon
    SquatRackIcon
    PowerRackIcon
    SmithMachineIcon
    CableMachineIcon
    LegPressMachineIcon
    PlyometricBoxIcon
    AgilityLadderIcon
    TrainingConesIcon
    HurdlesIcon
    SprintSledIcon
    GymBenchIcon
    PullUpBarIcon
    DipStationIcon
    TrainingMatIcon
    BattleRopesIcon
    SuspensionTrainerIcon
    TRXTrainingIcon
    GripStrengthIcon
    HandGripIcon
    ForearmTrainingIcon
    WristStrengthIcon
    SportsWatchIcon
    FitnessSettingsIcon
    TrainingSearchIcon
    WorkoutRecommendationIcon
    ExerciseLibraryIcon
    WorkoutLibraryIcon
    FavoriteWorkoutIcon
    FitnessHistoryIcon
    TrainingStatisticsIcon
    FitnessDashboardIcon
*/
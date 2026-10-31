
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
  
  export function SmileIcon(props) {
    return (
      <Svg {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <path d="M9 9h.01M15 9h.01" />
      </Svg>
    )
  }
  
  export function MoonIcon(props) {
    return (
      <Svg {...props}>
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />
      </Svg>
    )
  }
  
  export function HeartIcon(props) {
    return (
      <Svg {...props}>
        <path d="M20.8 8.8c0 5.1-8.8 10-8.8 10s-8.8-4.9-8.8-10A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.6Z" />
      </Svg>
    )
  }
  
/*
    EmotionIcon
    EmotionsIcon
    FeelingIcon
    FeelingsIcon
    HappyIcon
    HappinessIcon
    JoyIcon
    ExcitedIcon
    ExcitementIcon
    LoveIcon
    HeartIcon
    AffectionIcon
    GratitudeIcon
    ThankfulIcon
    GratefulIcon
    HopeIcon
    OptimismIcon
    ConfidenceIcon
    PrideIcon
    CourageIcon
    BraveryIcon
    PeaceIcon
    CalmIcon
    SerenityIcon
    RelaxationIcon
    ContentmentIcon
    SatisfactionIcon
    SurpriseIcon
    AmazementIcon
    WonderIcon
    CuriosityIcon
    InterestIcon
    AnticipationIcon
    SadIcon
    SadnessIcon
    SorrowIcon
    GriefIcon
    DisappointmentIcon
    LonelinessIcon
    NostalgiaIcon
    MelancholyIcon
    FearIcon
    ScaredIcon
    AnxietyIcon
    NervousnessIcon
    WorryIcon
    StressIcon
    AngerIcon
    AngryIcon
    FrustrationIcon
    AnnoyanceIcon
    IrritationIcon
    RageIcon
    HateIcon
    JealousyIcon
    EnvyIcon
    GuiltIcon
    ShameIcon
    EmbarrassmentIcon
    RegretIcon
    RemorseIcon
    ConfusionIcon
    DoubtIcon
    UncertaintyIcon
    IndifferenceIcon
    BoredomIcon
    TirednessIcon
    ExhaustionIcon
    DisgustIcon
    ContemptIcon
    EmpathyIcon
    CompassionIcon
    SympathyIcon
    KindnessIcon
    GenerosityIcon
    ForgivenessIcon
    TrustIcon
    DistrustIcon
    RespectIcon
    AdmirationIcon
    InspirationIcon
    MotivationIcon
    DeterminationIcon
    ResilienceIcon
    VulnerabilityIcon
    AcceptanceIcon
    MindfulnessIcon
    SelfAwarenessIcon
    EmotionalIntelligenceIcon
    EmotionalBalanceIcon
    EmotionalHealthIcon
    EmotionalSupportIcon
    EmotionalExpressionIcon
    EmotionalRegulationIcon
    EmotionalWellbeingIcon
    EmpathyHeartIcon
    MoodSwingIcon
    MixedEmotionsIcon
    OverwhelmedIcon
    SpeechlessIcon
    ShockedIcon
    FrightenedIcon
    WorriedFaceIcon
    HappyFaceIcon
    SadFaceIcon
    AngryFaceIcon
    SurprisedFaceIcon
    NeutralFaceIcon
    ConfusedFaceIcon
    CryingFaceIcon
    LaughingFaceIcon
    SmilingFaceIcon
    BlushingFaceIcon
    WinkingFaceIcon
    HuggingFaceIcon
    ThinkingFaceIcon
    RelievedFaceIcon
    AnxiousFaceIcon
    HeartEyesIcon
    TearsOfJoyIcon
    EmotionalSpectrumIcon
    EmotionWheelIcon
    EmotionChartIcon
    EmotionTrackerIcon
    EmotionJournalIcon
*/
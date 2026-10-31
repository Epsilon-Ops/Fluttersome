function Svg({
  size = 20,
  children,
  className = '',
  viewBox = '0 0 24 24',
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
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

function MoodIconBase({ size = 20, children, className = '' }) {
  return (
    <Svg size={size} className={className}>
      {children}
    </Svg>
  )
}

export function SmileMoodIcon(props) {
  return (
    <Svg {...props} viewBox="0 0 49 46">
      <svg xmlns="http://www.w3.org/2000/svg" width="49" height="46" viewBox="0 0 49 46">
        <g fill="none" stroke="#91C046" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
          <rect x="1.8" y="1.7" width="45.4" height="42.5" rx="2.1"/>
          <circle cx="16.9" cy="20.8" r="3.6"/>
          <circle cx="33.1" cy="20.8" r="3.6"/>
          <path d="M15.4 29.3 Q24.5 39.1 33.6 29.3"/>
        </g>
      </svg>
    </Svg>
  )
}

export function HappyMoodIcon(props) {
  return (
    <Svg {...props} viewBox="0 0 163 163">
      <svg xmlns="http://www.w3.org/2000/svg" width="163" height="163" viewBox="0 0 163 163">
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

export function EnthusiasticMoodIcon(props) {
  return (
    <MoodIconBase {...props}>
      <path d="M12 2.5l2.2 5.2 5.6.5-4.2 3.7 1.3 5.5-4.9-2.9-4.9 2.9 1.3-5.5-4.2-3.7 5.6-.5L12 2.5z" />
      <path d="M19 17l1 2M21 14l1 .5M4 17l-1 2" />
    </MoodIconBase>
  )
}

export function SereneMoodIcon(props) {
  return (
    <MoodIconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M7.5 10h2M14.5 10h2M8 15h8" />
    </MoodIconBase>
  )
}

export function ProudMoodIcon(props) {
  return (
    <MoodIconBase {...props}>
      <path d="M12 3l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L12 3z" />
      <path d="M9 21h6" />
    </MoodIconBase>
  )
}

export function GratefulMoodIcon(props) {
  return (
    <MoodIconBase {...props}>
      <path d="M20.8 8.8c0 5-8.8 11-8.8 11s-8.8-6-8.8-11A4.8 4.8 0 0 1 12 6.5a4.8 4.8 0 0 1 8.8 2.3z" />
      <path d="M8.5 11.5l2 2 5-5" />
    </MoodIconBase>
  )
}

export function AstonishedMoodIcon(props) {
  return (
    <MoodIconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="8.5" cy="9" r="1.2" />
      <circle cx="15.5" cy="9" r="1.2" />
      <ellipse cx="12" cy="15" rx="2" ry="2.5" />
    </MoodIconBase>
  )
}

export function AmazedMoodIcon(props) {
  return (
    <MoodIconBase {...props}>
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
      <path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z" />
    </MoodIconBase>
  )
}

export function ConfusedMoodIcon(props) {
  return (
    <MoodIconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M7.5 9l2 1M14.5 10l2-1M9 16c1-2 2-2 3-1" />
      <path d="M16 14h.01" />
    </MoodIconBase>
  )
}

export function IntriguedMoodIcon(props) {
  return (
    <MoodIconBase {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
      <path d="M8.5 8.5c.5-1 2.5-1.5 3.5 0s-1 2-1.5 3" />
      <path d="M10.5 13.5h.01" />
    </MoodIconBase>
  )
}

export function DeterminedMoodIcon(props) {
  return (
    <MoodIconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M7 9l4 1M17 9l-4 1M8 15h8" />
      <path d="M12 3v2" />
    </MoodIconBase>
  )
}

export function FocusedMoodIcon(props) {
  return (
    <MoodIconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </MoodIconBase>
  )
}

export function ConfidentMoodIcon(props) {
  return (
    <MoodIconBase {...props}>
      <path d="M12 2.5l7 3v5.2c0 4.8-3 8.3-7 10.8-4-2.5-7-6-7-10.8V5.5l7-3z" />
      <path d="M8.5 12l2.2 2.2 4.8-4.8" />
    </MoodIconBase>
  )
}

export function InspiredMoodIcon(props) {
  return (
    <MoodIconBase {...props}>
      <path d="M9 18h6M10 21h4" />
      <path d="M8.5 14.5a6 6 0 1 1 7 0c-.8.6-1.2 1.5-1.2 2.5h-4.6c0-1-.4-1.9-1.2-2.5z" />
      <path d="M12 1v2M3 11H1M23 11h-2M4.5 4.5L6 6M19.5 4.5L18 6" />
    </MoodIconBase>
  )
}

export function IrritatedMoodIcon(props) {
  return (
    <MoodIconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M7 9l4 2M17 9l-4 2M9 16h6" />
    </MoodIconBase>
  )
}

export function FrustratedMoodIcon(props) {
  return (
    <MoodIconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M7 10l4-2M17 10l-4-2M8 16l2-1M14 15l2 1" />
      <path d="M12 3v2" />
    </MoodIconBase>
  )
}

export function AnnoyedMoodIcon(props) {
  return (
    <MoodIconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M7 9h4M13 9h4M8 16h8" />
      <path d="M4 4l2 2M20 4l-2 2" />
    </MoodIconBase>
  )
}

export function OutragedMoodIcon(props) {
  return (
    <MoodIconBase {...props}>
      <path d="M13 2L5 13h6l-1 9 9-12h-6l1-8z" />
    </MoodIconBase>
  )
}

export function DisappointedMoodIcon(props) {
  return (
    <MoodIconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M7 10h3M14 10h3M8 17c2-3 6-3 8 0" />
    </MoodIconBase>
  )
}

export function DiscouragedMoodIcon(props) {
  return (
    <MoodIconBase {...props}>
      <path d="M4 15a8 8 0 0 1 16 0" />
      <path d="M2 15h20M7 15v3M12 15v3M17 15v3" />
      <path d="M8 21h8" />
    </MoodIconBase>
  )
}

export function MelancholicMoodIcon(props) {
  return (
    <MoodIconBase {...props}>
      <path d="M7 17a5 5 0 0 1 10 0H7z" />
      <path d="M12 3v2M4.5 6l1.5 1.5M19.5 6L18 7.5" />
      <path d="M3 20h18" />
    </MoodIconBase>
  )
}

export function LonelyMoodIcon(props) {
  return (
    <MoodIconBase {...props}>
      <circle cx="12" cy="8" r="3" />
      <path d="M5 21a7 7 0 0 1 14 0" />
      <path d="M2 4l2 2M22 4l-2 2" />
    </MoodIconBase>
  )
}

/*
    MoodIcon
    MoodTrackerIcon
    MoodTrackingIcon
    MoodJournalIcon
    MoodDiaryIcon
    MoodBoardIcon
    MoodCalendarIcon
    MoodChartIcon
    MoodGraphIcon
    MoodScaleIcon
    MoodMeterIcon
    MoodCheckInIcon
    MoodAssessmentIcon
    MoodAnalysisIcon
    MoodHistoryIcon
    MoodOverviewIcon
    MoodInsightsIcon
    MoodStatisticsIcon
    MoodMonitoringIcon
    MoodBalanceIcon
    MoodSwingIcon
    MoodChangeIcon
    MoodPatternIcon
    MoodCycleIcon
    MoodForecastIcon
    DailyMoodIcon
    WeeklyMoodIcon
    MonthlyMoodIcon
    PositiveMoodIcon
    NegativeMoodIcon
    NeutralMoodIcon
    HappyMoodIcon
    SadMoodIcon
    AngryMoodIcon
    CalmMoodIcon
    RelaxedMoodIcon
    ExcitedMoodIcon
    EnergeticMoodIcon
    MotivatedMoodIcon
    ConfidentMoodIcon
    PeacefulMoodIcon
    ContentMoodIcon
    CheerfulMoodIcon
    PlayfulMoodIcon
    RomanticMoodIcon
    OptimisticMoodIcon
    HopefulMoodIcon
    GratefulMoodIcon
    InspiredMoodIcon
    CreativeMoodIcon
    CuriousMoodIcon
    FocusedMoodIcon
    ProductiveMoodIcon
    TiredMoodIcon
    SleepyMoodIcon
    ExhaustedMoodIcon
    BoredMoodIcon
    LazyMoodIcon
    StressedMoodIcon
    AnxiousMoodIcon
    WorriedMoodIcon
    NervousMoodIcon
    OverwhelmedMoodIcon
    FrustratedMoodIcon
    IrritatedMoodIcon
    LonelyMoodIcon
    MelancholicMoodIcon
    DepressedMoodIcon
    DisappointedMoodIcon
    ConfusedMoodIcon
    UncertainMoodIcon
    InsecureMoodIcon
    MoodyMoodIcon
    EmotionalMoodIcon
    MixedMoodIcon
    ChangingMoodIcon
    LowMoodIcon
    HighMoodIcon
    GoodMoodIcon
    BadMoodIcon
    MorningMoodIcon
    EveningMoodIcon
    WeekendMoodIcon
    WorkMoodIcon
    SocialMoodIcon
    MindfulMoodIcon
    BalancedMoodIcon
    WellnessMoodIcon
    MentalWellbeingIcon
    MentalHealthIcon
    SelfCareIcon
    SelfLoveIcon
    InnerPeaceIcon
    MindfulnessIcon
    MeditationIcon
    BreathingExerciseIcon
    RelaxationIcon
    GratitudeJournalIcon
    AffirmationIcon
    PositiveThinkingIcon
    StressReliefIcon
    AnxietyReliefIcon
    MoodBoosterIcon
    HappinessTrackerIcon
    EnergyLevelIcon
    MotivationLevelIcon
    StressLevelIcon
    AnxietyLevelIcon
    SleepQualityIcon
    EmotionalWellnessIcon
    WellnessTrackerIcon
    WellnessDashboardIcon
    MoodFaceIcon
    MoodEmojiIcon
    MoodStickerIcon
    MoodColorIcon
    MoodPaletteIcon
    MoodRingIcon
    MoodCloudIcon
    MoodSunIcon
    MoodRainIcon
    MoodRainbowIcon
    MoodFlowerIcon
    MoodHeartIcon
    MoodStarIcon
    MoodLightIcon
    MoodThermometerIcon
    MoodCompassIcon
    MoodWaveIcon
    MoodSignalIcon
*/
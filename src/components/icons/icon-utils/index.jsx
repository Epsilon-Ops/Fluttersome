import {
  ArrowUpIcon,
  ArrowRightIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
} from '../icon-list/Arrow-Icons'

import {
    SmileIcon,
    MoonIcon,
    HeartIcon,
} from '../icon-list/Emotion-Icons'
  
  import {
    LeafIcon,
    SunIcon,
  } from '../icon-list/Nature-Icons'
  
  import {
    TrophyIcon,
    ActivityIcon,
    DumbbellIcon,
  } from '../icon-list/Sport-Icons'
  
  import {
    DashboardIcon,
    CheckIcon,
    SparklesIcon,
    ArrowUpRightIcon,
    InfoIcon,
  } from '../icon-list/Interface-Icons'
  
  export const iconMap = {
    // -----------------------------
    // Flèches -----------------------------
    // -----------------------------
    // >>> Flèches classiques
    arrow_up: ArrowUpIcon,
    arrow_up_right: ArrowUpRightIcon,
    arrow_right: ArrowRightIcon,
    arrow_down: ArrowDownIcon,
    arrow_left: ArrowLeftIcon,

    dashboard: DashboardIcon,
    trophy: TrophyIcon,
    activity: ActivityIcon,
    dumbbell: DumbbellIcon,
    smile: SmileIcon,
    moon: MoonIcon,
    heart: HeartIcon,
    leaf: LeafIcon,
    sun: SunIcon,
    check: CheckIcon,
    sparkles: SparklesIcon,
    info: InfoIcon,
  }
  
  export function AppIcon({ name, size = 20, className = '' }) {
    const Icon = iconMap[name] ?? DashboardIcon
  
    return <Icon size={size} className={className} />
  }
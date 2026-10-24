
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
    arrowUpRight: ArrowUpRightIcon,
    info: InfoIcon,
  }
  
  export function AppIcon({ name, size = 20, className = '' }) {
    const Icon = iconMap[name] ?? DashboardIcon
  
    return <Icon size={size} className={className} />
  }
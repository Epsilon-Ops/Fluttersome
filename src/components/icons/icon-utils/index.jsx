import {
  ArrowUpIcon,
  ArrowRightIcon,
  ArrowDownRightIcon,
  ArrowDownIcon,
  ArrowDownLeftIcon,
  ArrowLeftIcon,
  ArrowUpLeftIcon,

  ArrowUpNarrowIcon,
  ArrowUpRightNarrowIcon,
  ArrowRightNarrowIcon,
  ArrowDownRightNarrowIcon,
  ArrowDownNarrowIcon,
  ArrowDownLeftNarrowIcon,
  ArrowLeftNarrowIcon,
  ArrowUpLeftNarrowIcon,
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

  import {
    GhostIcon,
    WitchHatIcon,
    EasterEggIcon,
  } from '../icon-list/Celebration-Icons'

  import {
    EggIcon,
  } from '../icon-list/Animal-Icons'

  import {
    HomeIcon,
    DoorIcon,
    KeyIcon,

    SofaIcon,
    BedIcon,
    BedSleepingIcon,
    BedroomTableIcon,
    BedroomLampIcon,

    MirrorIcon,
    MirrorMakeupIcon,
    MirrorBedroomIcon,
    MirrorPlateIcon,

    LightbulbIcon,
    LightbulbPowerIcon,

    BathIcon,
  } from '../icon-list/Home-Icons'
  
  export const iconMap = {
    // -----------------------------
    // Flèches -----------------------------
    // -----------------------------
    // >>> Flèches classiques
    arrow_up: ArrowUpIcon,
    arrow_up_right: ArrowUpRightIcon,
    arrow_right: ArrowRightIcon,
    arrow_down_right: ArrowDownRightIcon,
    arrow_down: ArrowDownIcon,
    arrow_down_left: ArrowDownLeftIcon,
    arrow_left: ArrowLeftIcon,
    arrow_up_left: ArrowUpLeftIcon,

    // >>> Flèches maigres
    arrow_up_narrow: ArrowUpNarrowIcon,
    arrow_up_right_narrow: ArrowUpRightNarrowIcon,
    arrow_right_narrow: ArrowRightNarrowIcon,
    arrow_down_right_narrow: ArrowDownRightNarrowIcon,
    arrow_down_narrow: ArrowDownNarrowIcon,
    arrow_down_left_narrow: ArrowDownLeftNarrowIcon,
    arrow_left_narrow: ArrowLeftNarrowIcon,
    arrow_up_left_narrow: ArrowUpLeftNarrowIcon,

    // -----------------------------
    // Maison -----------------------------
    // -----------------------------
    // >>> Maison Simple
    home: HomeIcon,
    door: DoorIcon,
    key: KeyIcon,

    // >>> Pieces
    sofa: SofaIcon,
    bed: BedIcon,
    sleeping_in_bed: BedSleepingIcon,
    bedroom_table: BedroomTableIcon,
    bedroom_lamp: BedroomLampIcon,

    // >>> Mirroirs
    mirror: MirrorIcon,
    mirror_makeup: MirrorMakeupIcon,
    mirror_bedroom: MirrorBedroomIcon,
    mirror_plate: MirrorPlateIcon,

    // >>> Electricité
    lightbulb: LightbulbIcon,
    lightbulb_power: LightbulbPowerIcon,

    // >>> Bain
    bath: BathIcon,
    key_i: KeyIcon,

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

    // -----------------------------
    // Animaux -----------------------------
    // -----------------------------
    egg: EggIcon,

    // -----------------------------
    // Célébrations -----------------------------
    // -----------------------------
    // >>> Halloween
    ghost: GhostIcon,
    witch_hat: WitchHatIcon,
    easter_egg: EasterEggIcon,
  }
  
  export function AppIcon({
    name,
    size = 20,
    className = '',
    strokeWidth,
  }) {
    const Icon = iconMap[name] ?? DashboardIcon
  
    return (
      <Icon
        size={size}
        className={className}
        {...(strokeWidth != null ? { strokeWidth } : {})}
      />
    )
  }
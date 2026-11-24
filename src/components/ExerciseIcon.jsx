/* =========================================================
   ExerciseIcon — affiche l'icône d'un exercice de musculation.
   Les pictogrammes propres à la musculation viennent de
   Strength-Icons ; les autres (pull_up, running, dumbbell)
   viennent de la bibliothèque générale.
   ========================================================= */

import { AppIcon } from './icons/icon-utils/index.jsx'
import {
  BenchPressIcon,
  CalfIcon,
  CoreIcon,
  CurlIcon,
  DeadliftIcon,
  HipThrustIcon,
  LungeIcon,
  PlankIcon,
  PushUpIcon,
  RowIcon,
  ShoulderPressIcon,
  SquatIcon,
} from './icons/icon-list/Strength-Icons'
import { getExerciseIcon } from '../utils/exerciseIcons'

const STRENGTH_ICONS = {
  bench: BenchPressIcon,
  squat: SquatIcon,
  deadlift: DeadliftIcon,
  shoulder_press: ShoulderPressIcon,
  row: RowIcon,
  pushup: PushUpIcon,
  plank: PlankIcon,
  lunge: LungeIcon,
  curl: CurlIcon,
  core: CoreIcon,
  calf: CalfIcon,
  hip_thrust: HipThrustIcon,
}

/** Icône d'un exercice (choisie ou devinée à partir du nom). */
export default function ExerciseIcon({ exercise, size = 20, className = '' }) {
  const name = getExerciseIcon(exercise)
  const Icon = STRENGTH_ICONS[name]

  if (Icon) {
    return <Icon size={size} className={className} />
  }

  return <AppIcon name={name} size={size} className={className} />
}

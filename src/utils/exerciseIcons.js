/* =========================================================
   exerciseIcons.js — icône de chaque exercice de musculation.
   Par défaut, l'icône est devinée à partir du nom (« Squat » →
   squat, « Tractions » → tractions…). L'utilisateur peut la
   choisir à la main, ce choix prime sur la devinette.
   ========================================================= */

export const EXERCISE_ICON_OPTIONS = [
  { value: 'bench', label: 'Développé couché' },
  { value: 'squat', label: 'Squat' },
  { value: 'deadlift', label: 'Soulevé de terre' },
  { value: 'shoulder_press', label: 'Développé épaules' },
  { value: 'row', label: 'Rowing' },
  { value: 'pull_up', label: 'Tractions' },
  { value: 'pushup', label: 'Pompes' },
  { value: 'plank', label: 'Gainage' },
  { value: 'lunge', label: 'Fente' },
  { value: 'curl', label: 'Curl biceps' },
  { value: 'core', label: 'Abdominaux' },
  { value: 'calf', label: 'Mollets' },
  { value: 'hip_thrust', label: 'Pont fessier' },
  { value: 'running', label: 'Course / cardio' },
  { value: 'dumbbell', label: 'Haltères' },
]

// Mots-clés → icône, testés dans l'ordre (le premier qui correspond gagne)
const KEYWORD_RULES = [
  [/pompe|push[ -]?up|dips?/, 'pushup'],
  [/traction|pull[ -]?up|chin[ -]?up/, 'pull_up'],
  [/couche|bench|pectoral|pec\b/, 'bench'],
  [/epaule|militaire|overhead|shoulder|arnold|developpe assis/, 'shoulder_press'],
  [/soulev|deadlift|roumain|rdl|hip hinge/, 'deadlift'],
  [/hip thrust|pont|fessier|glute/, 'hip_thrust'],
  [/squat|goblet|presse a cuisses|leg press/, 'squat'],
  [/fente|lunge|split|bulgare/, 'lunge'],
  [/rowing|row\b|tirage|rame\b/, 'row'],
  [/curl|biceps|marteau|hammer/, 'curl'],
  [/gainage|planche|plank|core\b/, 'plank'],
  [/abdo|crunch|releve de jambes|russian/, 'core'],
  [/mollet|calf|calves/, 'calf'],
  [/course|sprint|cardio|velo|tapis|running|rameur/, 'running'],
]

/** Met en minuscules et retire les accents, pour comparer les noms. */
function normalize(text = '') {
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

/** Icône devinée à partir du nom de l'exercice. */
export function guessExerciseIcon(name = '') {
  const normalized = normalize(name)

  const rule = KEYWORD_RULES.find(([pattern]) => pattern.test(normalized))

  return rule ? rule[1] : 'dumbbell'
}

/** Icône à afficher : celle choisie, sinon celle devinée. */
export function getExerciseIcon(exercise) {
  return exercise?.icon || guessExerciseIcon(exercise?.name)
}

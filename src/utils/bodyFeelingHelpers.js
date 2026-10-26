
export const BODY_FEELINGS_STORAGE_KEY = 'epsilon.body-feelings.v1'

export const bodyParts = [
  { value: 'feet-ankles', label: 'Pieds et chevilles' },
  { value: 'calves', label: 'Mollets' },
  { value: 'knees', label: 'Genoux' },
  { value: 'quadriceps', label: 'Quadriceps (avant des cuisses)' },
  { value: 'hamstrings', label: 'Ischio-jambiers (arrière des cuisses)' },
  { value: 'hips-glutes', label: 'Hanches et fessiers' },
  { value: 'back', label: 'Dos' },
  { value: 'abdominals', label: 'Abdominaux' },
  { value: 'shoulders-arms', label: 'Épaules et bras' },
  { value: 'other', label: 'Autre zone' },
]

export const bodySides = [
  { value: 'left', label: 'Gauche' },
  { value: 'right', label: 'Droit' },
  { value: 'both', label: 'Les deux' },
  { value: 'general', label: 'Général' },
]

export const bodySensationTypes = [
  { value: 'fatigue', label: 'Fatigue musculaire' },
  { value: 'stiffness', label: 'Raideur' },
  { value: 'discomfort', label: 'Gêne' },
  { value: 'pain', label: 'Douleur' },
  { value: 'soreness', label: 'Courbatures' },
  { value: 'other', label: 'Autre sensation' },
]

export function makeBodyFeelingId() {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export function createBodyFeeling(data = {}) {
  return {
    id: makeBodyFeelingId(),
    recordedAt: new Date().toISOString(),
    bodyPart: data.bodyPart ?? '',
    side: data.side ?? 'general',
    sensationType: data.sensationType ?? '',
    intensity: data.intensity ?? null,
    notes: typeof data.notes === 'string' ? data.notes.trim() : '',
  }
}

export function validateBodyFeeling(data = {}) {
  const errors = {}

  if (!bodyParts.some((part) => part.value === data.bodyPart)) {
    errors.bodyPart = 'Choisis une partie du corps.'
  }

  if (!bodySides.some((side) => side.value === data.side)) {
    errors.side = 'Choisis le côté concerné.'
  }

  if (
    !bodySensationTypes.some(
      (type) => type.value === data.sensationType,
    )
  ) {
    errors.sensationType = 'Choisis un type de ressenti.'
  }

  if (
    !Number.isInteger(data.intensity) ||
    data.intensity < 1 ||
    data.intensity > 10
  ) {
    errors.intensity = 'L’intensité doit être comprise entre 1 et 10.'
  }

  if (data.notes != null && typeof data.notes !== 'string') {
    errors.notes = 'Le commentaire doit être du texte.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function loadBodyFeelings() {
  try {
    const stored = localStorage.getItem(BODY_FEELINGS_STORAGE_KEY)

    if (!stored) return []

    const parsed = JSON.parse(stored)

    if (!Array.isArray(parsed)) return []

    return parsed
      .filter(
        (item) =>
          item &&
          typeof item.id === 'string' &&
          typeof item.recordedAt === 'string' &&
          Number.isFinite(Date.parse(item.recordedAt)),
      )
      .sort(
        (a, b) =>
          Date.parse(b.recordedAt) - Date.parse(a.recordedAt),
      )
  } catch {
    return []
  }
}

export function saveBodyFeelings(feelings) {
  if (!Array.isArray(feelings)) {
    return {
      success: false,
      error: 'Les observations doivent être une liste.',
    }
  }

  try {
    localStorage.setItem(
      BODY_FEELINGS_STORAGE_KEY,
      JSON.stringify(feelings),
    )

    return { success: true, error: '' }
  } catch {
    return {
      success: false,
      error:
        'Impossible de sauvegarder les observations dans ce navigateur.',
    }
  }
}

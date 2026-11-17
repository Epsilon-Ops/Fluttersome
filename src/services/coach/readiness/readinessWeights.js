/* Poids de chaque dimension dans le score de préparation (somme = 1). */
export const READINESS_WEIGHTS = {
  recovery: 0.3,
  fatigue: 0.2,
  load: 0.2,
  form: 0.15,
  availability: 0.15,
}

export const DIMENSION_LABELS = {
  recovery: 'Récupération',
  fatigue: 'Fatigue',
  load: 'Charge d’entraînement',
  form: 'Forme récente',
  availability: 'Disponibilité physique',
}

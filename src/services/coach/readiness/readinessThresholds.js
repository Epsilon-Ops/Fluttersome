/* Seuils du score de préparation (indicatifs, pas des normes médicales). */
export const READINESS_LEVELS = {
  favorable: 75,   // score >= 75 : la séance prévue peut être maintenue
  vigilance: 55,   // 55 <= score < 75 : adapter la séance
  // score < 55 : privilégier la récupération
}

export const MIN_DIMENSIONS = 2         // dimensions minimum pour un score
export const MIN_NIGHTS = 3             // nuits minimum sur 7 jours
export const ACWR_OPTIMAL = [0.8, 1.3]  // ratio charge aiguë / chronique
export const ACWR_HIGH = 1.5
export const PAIN_ALERT = 7             // intensité (sur 10) déclenchant une alerte

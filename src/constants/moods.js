
export const MOOD_CATEGORIES = [
    {
      id: 'joy',
      label: 'Joie',
      color: '#E5A52E',
    },
    {
      id: 'surprise',
      label: 'Surprise',
      color: '#8B6BC1',
    },
    {
      id: 'motivation',
      label: 'Motivation',
      color: '#27855B',
    },
    {
      id: 'anger',
      label: 'Colère',
      color: '#D93446',
    },
    {
      id: 'sadness',
      label: 'Tristesse',
      color: '#5265B8',
    },
  ]
  
  export const moods = [
    // Joie
    {
      id: 'happy',
      label: 'Heureux',
      category: 'joy',
      icon: 'smile-mood',
      valence: 4,
      defaultIntensity: 3,
    },
    {
      id: 'enthusiastic',
      label: 'Enthousiaste',
      category: 'joy',
      icon: 'smile-mood',
      valence: 5,
      defaultIntensity: 4,
    },
    {
      id: 'serene',
      label: 'Serein',
      category: 'joy',
      icon: 'smile-mood',
      valence: 3,
      defaultIntensity: 2,
    },
    {
      id: 'proud',
      label: 'Fier',
      category: 'joy',
      icon: 'smile-mood',
      valence: 4,
      defaultIntensity: 3,
    },
    {
      id: 'grateful',
      label: 'Reconnaissant',
      category: 'joy',
      icon: 'smile-mood',
      valence: 4,
      defaultIntensity: 2,
    },
  
    // Surprise
    {
      id: 'astonished',
      label: 'Étonné',
      category: 'surprise',
      icon: 'smile-mood',
      valence: 1,
      defaultIntensity: 3,
    },
    {
      id: 'amazed',
      label: 'Émerveillé',
      category: 'surprise',
      icon: 'smile-mood',
      valence: 4,
      defaultIntensity: 4,
    },
    {
      id: 'confused',
      label: 'Déconcerté',
      category: 'surprise',
      icon: 'smile-mood',
      valence: -1,
      defaultIntensity: 3,
    },
    {
      id: 'intrigued',
      label: 'Intrigué',
      category: 'surprise',
      icon: 'smile-mood',
      valence: 2,
      defaultIntensity: 2,
    },
  
    // Motivation
    {
      id: 'determined',
      label: 'Déterminé',
      category: 'motivation',
      icon: 'smile-mood',
      valence: 4,
      defaultIntensity: 4,
    },
    {
      id: 'focused',
      label: 'Concentré',
      category: 'motivation',
      icon: 'smile-mood',
      valence: 3,
      defaultIntensity: 3,
    },
    {
      id: 'confident',
      label: 'Confiant',
      category: 'motivation',
      icon: 'smile-mood',
      valence: 4,
      defaultIntensity: 3,
    },
    {
      id: 'inspired',
      label: 'Inspiré',
      category: 'motivation',
      icon: 'smile-mood',
      valence: 5,
      defaultIntensity: 4,
    },
  
    // Colère
    {
      id: 'irritated',
      label: 'Irrité',
      category: 'anger',
      icon: 'smile-mood',
      valence: -2,
      defaultIntensity: 2,
    },
    {
      id: 'frustrated',
      label: 'Frustré',
      category: 'anger',
      icon: 'smile-mood',
      valence: -3,
      defaultIntensity: 4,
    },
    {
      id: 'annoyed',
      label: 'Contrarié',
      category: 'anger',
      icon: 'smile-mood',
      valence: -2,
      defaultIntensity: 2,
    },
    {
      id: 'outraged',
      label: 'Révolté',
      category: 'anger',
      icon: 'smile-mood',
      valence: -4,
      defaultIntensity: 5,
    },
  
    // Tristesse
    {
      id: 'disappointed',
      label: 'Déçu',
      category: 'sadness',
      icon: 'smile-mood',
      valence: -3,
      defaultIntensity: 3,
    },
    {
      id: 'discouraged',
      label: 'Découragé',
      category: 'sadness',
      icon: 'smile-mood',
      valence: -4,
      defaultIntensity: 4,
    },
    {
      id: 'melancholic',
      label: 'Mélancolique',
      category: 'sadness',
      icon: 'smile-mood',
      valence: -2,
      defaultIntensity: 2,
    },
    {
      id: 'lonely',
      label: 'Seul',
      category: 'sadness',
      icon: 'smile-mood',
      valence: -3,
      defaultIntensity: 3,
    },
  ]
  
  export function getMoodById(id) {
    return moods.find((mood) => mood.id === id) ?? null
  }
  
  export function getMoodCategory(categoryId) {
    return MOOD_CATEGORIES.find(
      (category) => category.id === categoryId,
    ) ?? null
  }
  
  export function getMoodsByCategory(categoryId) {
    return moods.filter((mood) => mood.category === categoryId)
  }
  
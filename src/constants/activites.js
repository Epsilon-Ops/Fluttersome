export const ACTIVITES = [
    { id: 'sport', label: 'Sport', icon: 'sport' },
    { id: 'etudes', label: 'Études', icon: 'book' },
    { id: 'travail', label: 'Travail', icon: 'briefcase' },
    { id: 'amis', label: 'Amis', icon: 'users' },
    { id: 'famille', label: 'Famille', icon: 'home' },
    { id: 'repos', label: 'Repos', icon: 'rest' },
    { id: 'sommeil', label: 'Sommeil', icon: 'moon' },
    { id: 'repas', label: 'Repas', icon: 'utensils' },
    { id: 'loisirs', label: 'Loisirs', icon: 'music' },
    { id: 'nature', label: 'Nature', icon: 'leaf' },
    { id: 'solitude', label: 'Temps seul', icon: 'user' },
    { id: 'autre', label: 'Autre', icon: 'plus' },
  ]
  
  export function getActivityById(id) {
    return ACTIVITES.find((activity) => activity.id === id) ?? null
  }
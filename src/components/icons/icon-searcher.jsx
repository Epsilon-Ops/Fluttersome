import { iconMap } from './index'

export const ICON_CATEGORIES = [
  { value: 'all', label: 'Toutes les catégories' },
  { value: 'sport', label: 'Sport' },
  { value: 'emotion', label: 'Émotions & bien-être' },
  { value: 'nature', label: 'Nature' },
  { value: 'interface', label: 'Interface & productivité' },
]

export const ICON_SEARCHER = [
  {
    name: 'dashboard',
    category: 'interface',
    label: 'Tableau de bord',
    keywords: ['accueil', 'organisation', 'dashboard'],
  },
  {
    name: 'trophy',
    category: 'sport',
    label: 'Trophée',
    keywords: ['victoire', 'récompense', 'objectif', 'succès'],
  },
  {
    name: 'activity',
    category: 'sport',
    label: 'Activité',
    keywords: ['cardio', 'mouvement', 'exercice', 'santé'],
  },
  {
    name: 'dumbbell',
    category: 'sport',
    label: 'Musculation',
    keywords: ['poids', 'fitness', 'force', 'entraînement'],
  },
  {
    name: 'smile',
    category: 'emotion',
    label: 'Sourire',
    keywords: ['joie', 'bonheur', 'humeur', 'positif'],
  },
  {
    name: 'moon',
    category: 'emotion',
    label: 'Lune',
    keywords: ['sommeil', 'nuit', 'repos', 'dormir'],
  },
  {
    name: 'heart',
    category: 'emotion',
    label: 'Cœur',
    keywords: ['amour', 'santé', 'bien-être', 'coeur'],
  },
  {
    name: 'leaf',
    category: 'nature',
    label: 'Feuille',
    keywords: ['plante', 'nature', 'écologie', 'environnement'],
  },
  {
    name: 'sun',
    category: 'nature',
    label: 'Soleil',
    keywords: ['énergie', 'journée', 'lumière', 'matin'],
  },
  {
    name: 'check',
    category: 'interface',
    label: 'Validation',
    keywords: ['terminé', 'fait', 'réussi', 'check', 'tâche'],
  },
  {
    name: 'sparkles',
    category: 'interface',
    label: 'Éclat',
    keywords: ['idée', 'inspiration', 'créativité', 'nouveau'],
  },
  {
    name: 'arrowUpRight',
    category: 'interface',
    label: 'Flèche montante',
    keywords: ['progression', 'évolution', 'direction'],
  },
  {
    name: 'info',
    category: 'interface',
    label: 'Information',
    keywords: ['aide', 'détail', 'renseignement'],
  },
].filter((item) => Boolean(iconMap[item.name]))
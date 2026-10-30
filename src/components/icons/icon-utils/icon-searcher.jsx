import { iconMap } from './index'

export const ICON_CATEGORIES = [
  { value: 'all', label: 'Toutes les catégories' },
  { value: 'fleches', label: 'Flèches' },
  { value: 'sport', label: 'Sport' },
  { value: 'maison', label: 'Maison' },
  { value: 'emotion', label: 'Émotions & bien-être' },
  { value: 'nature', label: 'Nature' },
  { value: 'interface', label: 'Interface & productivité' },
  { value: 'celebration', label: 'Fêtes' },
]

export const ICON_SEARCHER = [
  //  --------------------------------------------
  // Flèches --------------------------------------------
  //  --------------------------------------------

      // Flèches Classiques >>>
      {
        name: 'arrow_up',
        category: 'fleches',
        label: 'Flèche vers le haut',
        keywords: [
          'flèche', 'fleche', 'haut', 'monter', 'montée', 'ascension',
          'progression', 'augmentation', 'croissance', 'hausse',
          'direction', 'nord', 'précédent', 'precedent', 'up',
          'vertical', 'développement', 'developpement',
        ],
      },
      {
        name: 'arrow_up_right',
        category: 'fleches',
        label: 'Flèche diagonale vers le haut à droite',
        keywords: [
          'flèche', 'fleche', 'diagonale', 'haut', 'droite',
          'nord-est', 'nord est', 'progression', 'croissance',
          'augmentation', 'hausse', 'tendance positive', 'évolution',
          'evolution', 'ouvrir', 'lien externe', 'redirection',
          'sortie', 'navigation', 'up right',
        ],
      },
      {
        name: 'arrow_right',
        category: 'fleches',
        label: 'Flèche vers la droite',
        keywords: [
          'flèche', 'fleche', 'droite', 'avancer', 'suivant',
          'continuer', 'progression', 'direction', 'est',
          'navigation', 'transférer', 'transferer', 'déplacer',
          'deplacer', 'aller', 'étape suivante', 'etape suivante',
          'next', 'forward', 'right',
        ],
      },
      {
        name: 'arrow_down_right',
        category: 'fleches',
        label: 'Flèche diagonale vers le bas à droite',
        keywords: [
          'flèche', 'fleche', 'diagonale', 'bas', 'droite',
          'sud-est', 'sud est', 'descente', 'baisse',
          'diminution', 'déclin', 'declin', 'direction',
          'déplacement', 'deplacement', 'down right',
        ],
      },
      {
        name: 'arrow_down',
        category: 'fleches',
        label: 'Flèche vers le bas',
        keywords: [
          'flèche', 'fleche', 'bas', 'descendre', 'descente',
          'baisse', 'diminution', 'réduction', 'reduction',
          'télécharger', 'telecharger', 'download', 'dérouler',
          'derouler', 'développer', 'developper', 'suivant',
          'sud', 'vertical', 'down',
        ],
      },
      {
        name: 'arrow_down_left',
        category: 'fleches',
        label: 'Flèche diagonale vers le bas à gauche',
        keywords: [
          'flèche', 'fleche', 'diagonale', 'bas', 'gauche',
          'sud-ouest', 'sud ouest', 'descente', 'recul',
          'retour', 'direction', 'déplacement', 'deplacement',
          'down left',
        ],
      },
      {
        name: 'arrow_left',
        category: 'fleches',
        label: 'Flèche vers la gauche',
        keywords: [
          'flèche', 'fleche', 'gauche', 'retour', 'précédent',
          'precedent', 'revenir', 'annuler', 'navigation',
          'direction', 'ouest', 'back', 'previous', 'left',
          'étape précédente', 'etape precedente',
          'déplacement', 'deplacement',
        ],
      },
      {
        name: 'arrow_up_left',
        category: 'fleches',
        label: 'Flèche diagonale vers le haut à gauche',
        keywords: [
          'flèche', 'fleche', 'diagonale', 'haut', 'gauche',
          'nord-ouest', 'nord ouest', 'remontée', 'remontee',
          'retour', 'direction', 'navigation', 'restaurer',
          'restauration', 'up left',
        ],
      },

      // Flèches Maigres >>>
      {
        name: 'arrow_up_narrow',
        category: 'fleches',
        label: 'Flèche fine vers le haut',
        keywords: [
          'flèche', 'fleche', 'fine', 'mince', 'étroite', 'etroite',
          'haut', 'monter', 'ascension', 'progression', 'hausse',
          'croissance', 'direction', 'vertical', 'minimaliste',
          'contour', 'up narrow',
        ],
      },
      {
        name: 'arrow_up_right_narrow',
        category: 'fleches',
        label: 'Flèche fine diagonale vers le haut à droite',
        keywords: [
          'flèche', 'fleche', 'fine', 'mince', 'diagonale',
          'haut', 'droite', 'progression', 'hausse', 'croissance',
          'tendance positive', 'lien externe', 'navigation',
          'minimaliste', 'contour', 'up right narrow',
        ],
      },
      {
        name: 'arrow_right_narrow',
        category: 'fleches',
        label: 'Flèche fine vers la droite',
        keywords: [
          'flèche', 'fleche', 'fine', 'mince', 'droite',
          'suivant', 'continuer', 'avancer', 'navigation',
          'direction', 'minimaliste', 'contour', 'next',
          'forward', 'right narrow',
        ],
      },
      {
        name: 'arrow_down_right_narrow',
        category: 'fleches',
        label: 'Flèche fine diagonale vers le bas à droite',
        keywords: [
          'flèche', 'fleche', 'fine', 'mince', 'diagonale',
          'bas', 'droite', 'descente', 'baisse', 'diminution',
          'minimaliste', 'contour', 'down right narrow',
        ],
      },
      {
        name: 'arrow_down_narrow',
        category: 'fleches',
        label: 'Flèche fine vers le bas',
        keywords: [
          'flèche', 'fleche', 'fine', 'mince', 'bas',
          'descendre', 'descente', 'télécharger', 'telecharger',
          'dérouler', 'derouler', 'réduction', 'reduction',
          'minimaliste', 'contour', 'down narrow',
        ],
      },
      {
        name: 'arrow_down_left_narrow',
        category: 'fleches',
        label: 'Flèche fine diagonale vers le bas à gauche',
        keywords: [
          'flèche', 'fleche', 'fine', 'mince', 'diagonale',
          'bas', 'gauche', 'retour', 'descente', 'recul',
          'minimaliste', 'contour', 'down left narrow',
        ],
      },
      {
        name: 'arrow_left_narrow',
        category: 'fleches',
        label: 'Flèche fine vers la gauche',
        keywords: [
          'flèche', 'fleche', 'fine', 'mince', 'gauche',
          'retour', 'précédent', 'precedent', 'back',
          'navigation', 'minimaliste', 'contour',
          'previous', 'left narrow',
        ],
      },
      {
        name: 'arrow_up_left_narrow',
        category: 'fleches',
        label: 'Flèche fine diagonale vers le haut à gauche',
        keywords: [
          'flèche', 'fleche', 'fine', 'mince', 'diagonale',
          'haut', 'gauche', 'retour', 'remontée', 'remontee',
          'navigation', 'minimaliste', 'contour', 'up left narrow',
        ],
      },

  //  --------------------------------------------
  // Maison --------------------------------------------
  //  --------------------------------------------

      // Maison Simple >>>
      {
        name: 'home',
        category: 'maison',
        label: 'Maison',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

      {
        name: 'door',
        category: 'maison',
        label: 'Porte',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

      {
        name: 'key_i',
        category: 'maison',
        label: 'Clé',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

      // Pieces >>>
      {
        name: 'sofa',
        category: 'maison',
        label: 'Canapé',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'bed',
        category: 'maison',
        label: 'Lit',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'sleeping_in_bed',
        category: 'maison',
        label: 'Dors dans lit',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'bedroom_table',
        category: 'maison',
        label: 'Dors dans lit',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'bedroom_lamp',
        category: 'maison',
        label: 'Dors dans lit',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

      // Mirroirs >>>
      {
        name: 'mirror',
        category: 'maison',
        label: 'Dors dans lit',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'mirror_makeup',
        category: 'maison',
        label: 'Dors dans lit',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'mirror_bedroom',
        category: 'maison',
        label: 'Dors dans lit',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'mirror_plate',
        category: 'maison',
        label: 'Dors dans lit',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

      // Electricité >>>

      {
        name: 'lightbulb',
        category: 'maison',
        label: 'Lumière',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

      {
        name: 'lightbulb_power',
        category: 'maison',
        label: 'Courant',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

      // Bain >>>

      {
        name: 'bath',
        category: 'maison',
        label: 'Bain',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

  //  --------------------------------------------
  // Célébrations --------------------------------------------
  //  --------------------------------------------

      // Halloween >>>
      {
        name: 'ghost',
        category: 'celebration',
        label: 'Fantôme',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

  // --------------------------------------------------------

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
    name: 'info',
    category: 'interface',
    label: 'Information',
    keywords: ['aide', 'détail', 'renseignement'],
  },
].filter((item) => Boolean(iconMap[item.name]))
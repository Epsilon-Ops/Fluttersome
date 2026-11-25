import { iconMap } from './index'

export const ICON_CATEGORIES = [
  { value: 'all', label: 'Toutes les catégories' },
  { value: 'fleches', label: 'Flèches' },
  { value: 'sport', label: 'Sport' },
  { value: 'maison', label: 'Maison' },
  { value: 'emotion', label: 'Émotions & Bien-Être' },
  { value: 'nature', label: 'Nature' },
  { value: 'interface', label: 'Interface & Productivité' },
  { value: 'animal', label: 'Animaux' },
  { value: 'celebration', label: 'Fêtes' },
  { value: 'finance', label: 'Finance' },
  { value: 'sante', label: 'Santé' },
  { value: 'food', label: 'Nourriture' },
  { value: 'drinks', label: 'Boissons' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'music', label: 'Musique' },
  { value: 'amour', label: 'Amour' },
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

      // Salon >>>
      {
        name: 'sofa_short',
        category: 'maison',
        label: 'Canapé',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'sofa_long',
        category: 'maison',
        label: 'Canapé',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'tv',
        category: 'maison',
        label: 'Télévision',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'fireplace',
        category: 'maison',
        label: 'Cheminée',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'armchair',
        category: 'maison',
        label: 'Canapé 2',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'armchair_chair',
        category: 'maison',
        label: 'Canapé 3',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'sofa',
        category: 'maison',
        label: 'Canapé 4',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'closet',
        category: 'maison',
        label: 'Placard',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'drawer_chest',
        category: 'maison',
        label: 'Placard à Tiroirs',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'drawer_dressing',
        category: 'maison',
        label: 'Placard à Dressing',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'window_curtain',
        category: 'maison',
        label: 'Fenêtre à Rideaux',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'drawer_grid',
        category: 'maison',
        label: 'Placard à Grille',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'window_drag',
        category: 'maison',
        label: 'Fenêtre à Coulisse',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'drawer_table',
        category: 'maison',
        label: 'Table à Tirroirs',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'lamp_table',
        category: 'maison',
        label: 'Lampe de table',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'table',
        category: 'maison',
        label: 'Table',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

      // Chambre >>>
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
      {
        name: 'safebox',
        category: 'maison',
        label: 'Boite Secrète',
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
      {
        name: 'raddish_lightbulb',
        category: 'maison',
        label: 'Lumière 2',
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
      {
        name: 'sink',
        category: 'maison',
        label: 'Evier',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'toilet_paper',
        category: 'maison',
        label: 'Papier Toilette',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'toilet',
        category: 'maison',
        label: 'Toilette',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'toilet_brush',
        category: 'maison',
        label: 'Brosse à Toilette',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'duck_buoy',
        category: 'maison',
        label: 'Canard Bouée',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'shower',
        category: 'maison',
        label: 'Douche',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'shower_curtain',
        category: 'maison',
        label: 'Douche Rideaux',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'washing_machine',
        category: 'maison',
        label: 'Machine à Laver',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'washing_machine_2',
        category: 'maison',
        label: 'Machine à Laver II',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'washing_machine_3',
        category: 'maison',
        label: 'Machine à Laver III',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'washing_machine_4',
        category: 'maison',
        label: 'Machine à Laver IV',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'mixer',
        category: 'maison',
        label: 'Mixeur',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'trashbin_recycle',
        category: 'maison',
        label: 'Poubelle Recyclable',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'kitchen_timer',
        category: 'maison',
        label: 'Chronomètre de Cuisine',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'kitchen_kettle',
        category: 'maison',
        label: 'Bouilloire de Cuisine',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'frying_pan',
        category: 'maison',
        label: 'Poêle',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'cooking_pot',
        category: 'maison',
        label: 'Poêle à Cuisson',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'spoon',
        category: 'maison',
        label: 'Cuillière',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'fork',
        category: 'maison',
        label: 'Fourchette',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'knife',
        category: 'maison',
        label: 'Couteau',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'spatula',
        category: 'maison',
        label: 'Spatule',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'rollinpin',
        category: 'maison',
        label: 'Rouleau à Pâte',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'pizza_cutter',
        category: 'maison',
        label: 'Roulette à Pizza',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

  //  --------------------------------------------
  // Santé --------------------------------------------
  //  --------------------------------------------
      // Visage >>>
      {
        name: 'toothpaste_n_brush',
        category: 'sante',
        label: 'Pâte Dentifrice & Brosse',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'tooth',
        category: 'sante',
        label: 'Dent',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'soap',
        category: 'sante',
        label: 'Savon',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'mouthwas',
        category: 'sante',
        label: 'Bain de Bouche',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'cannula',
        category: 'sante',
        label: 'Cannula',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

  //  --------------------------------------------
  // Animaux --------------------------------------------
  //  --------------------------------------------
      // Oiseaux >>>
      {
        name: 'egg',
        category: 'animal',
        label: 'OEuf',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

  //  --------------------------------------------
  // Nouriturre --------------------------------------------
  //  --------------------------------------------
      // Plateaux >>>
      {
        name: 'restaurant_plate',
        category: 'food',
        label: 'Assiette de Restaurant',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'cooking',
        category: 'food',
        label: 'Cuisiner',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

      // Fruits >>>
      {
        name: 'watermelon',
        category: 'food',
        label: 'Pastèque',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'peach_open',
        category: 'food',
        label: 'Pêche Ouverte',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'peach',
        category: 'food',
        label: 'Pêche',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'raspberry',
        category: 'food',
        label: 'Baie',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'orange',
        category: 'food',
        label: 'Orange',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'lemon',
        category: 'food',
        label: 'Citron',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'pear',
        category: 'food',
        label: 'Poire',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

      // Légumes >>>
      {
        name: 'carrot',
        category: 'food',
        label: 'Carotte',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

      // Patisseries >>>
      {
        name: 'bread',
        category: 'food',
        label: 'Pain',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'loaf',
        category: 'food',
        label: 'Brioche',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

      // Assortments >>>
      {
        name: 'salt',
        category: 'food',
        label: 'Sel',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

      // Sugar >>>
      {
        name: 'popsicle',
        category: 'food',
        label: 'Glace à l eau',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'acorn',
        category: 'food',
        label: 'Noisette',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

      // Repas >>>
      {
        name: 'dish',
        category: 'food',
        label: 'Repas',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

      // Autre >>>
      {
        name: 'chef',
        category: 'food',
        label: 'Chef',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

  //  --------------------------------------------
  // Boissons --------------------------------------------
  //  --------------------------------------------
      // Eau >>>
      {
        name: 'water_i',
        category: 'drinks',
        label: 'Eau',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'water_ii',
        category: 'drinks',
        label: 'Eau 2',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'drop',
        category: 'drinks',
        label: 'Goutte',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'water_power',
        category: 'drinks',
        label: 'Courant par Eau',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'water_pipe',
        category: 'drinks',
        label: 'Tuyeau d\'Eau',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'water_flask',
        category: 'drinks',
        label: 'Gourde',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'whiskey',
        category: 'drinks',
        label: 'Whiskey',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'star_drink',
        category: 'drinks',
        label: 'Boisson Étoilée',
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
      {
        name: 'witch_hat',
        category: 'celebration',
        label: 'Chapeau Sorcière',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'easter_egg',
        category: 'celebration',
        label: 'OEuf de Pâques',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

  //  --------------------------------------------
  // Sport --------------------------------------------
  //  --------------------------------------------
      // ... >>>
      {
        name: 'sprint',
        category: 'sport',
        label: 'Sprint',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'dual_sprint',
        category: 'sport',
        label: 'Sprint Double',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'sprint_logo',
        category: 'sport',
        label: 'Sprint Logo',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'running',
        category: 'sport',
        label: 'Course',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'running2',
        category: 'sport',
        label: 'Course 2',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'pull_up',
        category: 'sport',
        label: 'Traction',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'fitness',
        category: 'sport',
        label: 'Fitness',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'ice_skate',
        category: 'sport',
        label: 'Skate sur Glace',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'running_shoe',
        category: 'sport',
        label: 'Chaussure de Course',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'race_flag',
        category: 'sport',
        label: 'Drapeau de Course',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'shot_put',
        category: 'sport',
        label: 'Lancer de Poids',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'track_n_field',
        category: 'sport',
        label: 'Athlétisme',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'sprint_medal',
        category: 'sport',
        label: 'Médaille de Sprint',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'victory_chalice',
        category: 'sport',
        label: 'Chalice de Victoire',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

  //  --------------------------------------------
  // Finance --------------------------------------------
  //  --------------------------------------------

      // Monnaie >>>
      {
        name: 'money_i',
        category: 'finance',
        label: 'Billet I',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'money_ii',
        category: 'finance',
        label: 'Billet II',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'dollar',
        category: 'finance',
        label: 'Dollar',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

      // Cartes >>>
      {
        name: 'money_card',
        category: 'finance',
        label: 'Billet I',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'mastercard_card',
        category: 'finance',
        label: 'Billet II',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'card_layout',
        category: 'finance',
        label: 'Dollar',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'double_card',
        category: 'finance',
        label: 'Dollar',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
  
      // Pièces >>>
      {
        name: 'double_coin',
        category: 'finance',
        label: 'Billet I',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'clover_coin',
        category: 'finance',
        label: 'Billet II',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

  //  --------------------------------------------
  // Nature --------------------------------------------
  //  --------------------------------------------
      // Végétal >>>
      {
        name: 'twin_branch',
        category: 'nature',
        label: 'Branches Jumelles',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

  //  --------------------------------------------
  // Fashion --------------------------------------------
  //  --------------------------------------------
      // Cheveux >>>
      {
        name: 'comb',
        category: 'fashion',
        label: 'Peigne',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },

  //  --------------------------------------------
  // Musique --------------------------------------------
  //  --------------------------------------------

      // Musique simple >>>
      {
        name: 'music',
        category: 'music',
        label: 'Musique',
        keywords: [
          'flèche', 'fleche', 'haut', 'monter', 'montée', 'ascension',
          'progression', 'augmentation', 'croissance', 'hausse',
          'direction', 'nord', 'précédent', 'precedent', 'up',
          'vertical', 'développement', 'developpement',
        ],
      },
      {
        name: 'headset',
        category: 'music',
        label: 'Casque de Musique',
        keywords: [
          'flèche', 'fleche', 'haut', 'monter', 'montée', 'ascension',
          'progression', 'augmentation', 'croissance', 'hausse',
          'direction', 'nord', 'précédent', 'precedent', 'up',
          'vertical', 'développement', 'developpement',
        ],
      },
      {
        name: 'headset_pro',
        category: 'music',
        label: 'Casque de Musique (Pro)',
        keywords: [
          'flèche', 'fleche', 'haut', 'monter', 'montée', 'ascension',
          'progression', 'augmentation', 'croissance', 'hausse',
          'direction', 'nord', 'précédent', 'precedent', 'up',
          'vertical', 'développement', 'developpement',
        ],
      },
      {
        name: 'headset_chat',
        category: 'music',
        label: 'Casque de Discussion',
        keywords: [
          'flèche', 'fleche', 'haut', 'monter', 'montée', 'ascension',
          'progression', 'augmentation', 'croissance', 'hausse',
          'direction', 'nord', 'précédent', 'precedent', 'up',
          'vertical', 'développement', 'developpement',
        ],
      },
      {
        name: 'note_circle',
        category: 'music',
        label: 'Note de Musique (Cercle)',
        keywords: [
          'flèche', 'fleche', 'haut', 'monter', 'montée', 'ascension',
          'progression', 'augmentation', 'croissance', 'hausse',
          'direction', 'nord', 'précédent', 'precedent', 'up',
          'vertical', 'développement', 'developpement',
        ],
      },

  //  --------------------------------------------
  // Amour --------------------------------------------
  //  --------------------------------------------

      // ... >>>
      {
        name: 'heart_i',
        category: 'amour',
        label: 'Coeur',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'heartbreak',
        category: 'amour',
        label: 'Coeur Brisé',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'heart_ii',
        category: 'amour',
        label: 'Coeur 2',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'heart_tower',
        category: 'amour',
        label: 'Tour de Coeur',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'heart_plus',
        category: 'amour',
        label: 'Coeur +',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'heart_minus',
        category: 'amour',
        label: 'Coeur -',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'heart_electrocardiogram',
        category: 'amour',
        label: 'Électrocardiogramme',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'heart_wolf',
        category: 'amour',
        label: 'Coeur Loup',
        keywords: ['maison','home','acceuil','repos','navigation',
      'homepage','start','house','building','principal','main'],
      },
      {
        name: 'head_love',
        category: 'amour',
        label: 'Tête Amoureuse',
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
    name: 'cross',
    category: 'interface',
    label: 'Croix',
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
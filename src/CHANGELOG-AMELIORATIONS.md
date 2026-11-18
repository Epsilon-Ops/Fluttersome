# Améliorations (cette itération)

## Fait et vérifié (compilation esbuild + tests de logique)
- Nettoyage : suppression des fichiers vides et non utilisés (EmptyState, Topbar, PageHeader, supabase.js vide, PagePlaceholder, StrengthSetForm/SessionList/History, FoodEntryForm, NutritionHeader, BodyState, NutritionOverview, SleepReadinessPlaceholder, CompetitionPlaceholder).
- Sauvegarde : export JSON de toutes les données (clés « epsilon* ») et import avec validation (utils/backupHelpers.js, components/AppSettingsPanel.jsx).
- Réglages : objectifs nutritionnels, rappels (utils/settingsHelpers.js).
- Notifications : rappels de tâches (heure + délai), humeur et coucher à heure fixe, hydratation périodique (hooks/useReminders.js, utils/reminderHelpers.js, utils/notifications.js).
- Tâches : heure d'échéance et rappel dans le formulaire ; saisie rapide en français (« Appeler Paul demain à 14h ») via utils/quickAddParser.js.
- Musculation :
  - chrono manuel par exercice (activable ou non) : effort au début de chaque série (ex. gainage 3 × 1 min) et/ou récupération après chaque série et/ou après l'exercice ;
  - chrono de fin de bloc ;
  - barre de chrono flottante avec bip, vibration et notification ;
  - 1RM estimé (Epley) par exercice, graphique de progression, rappel de la dernière charge.
- Compétition : onglets Forme / Régularité / Objectifs réels ; vent réglementaire (au-delà de +2,0 m/s favorable, le chrono est exclu des records sur 100, 110 et 200 m) ; distance 110 m haies ; format de temps mm:ss pour les longues distances.
- Coach : moteur déterministe (aucun modèle de langage). Score de préparation sur 5 dimensions, alertes par règles explicites, trois options de séance, 12 questions prédéfinies avec réponses calculées à partir des données.
- Sommeil : carte de récupération (score, dette, régularité du coucher) à la place du placeholder.
- Humeur : courbe sur 30 jours et lien observé avec le sommeil (corrélation, pas causalité).

## Ajouté dans la deuxième itération
- Nutrition : recherche dans une base intégrée d'environ 45 aliments (valeurs approximatives) et aliments récents ; objectifs du jour (calories et protéines, selon jour d'entraînement ou de repos) ; historique sur 14 jours.
- Entraînement : graphique de distance par semaine sur 8 semaines.
- Tableau de bord : carte « Aujourd'hui » (séances, tâches échues, hydratation, dernière nuit, humeur).

## Non fait
- Types de séances d'entraînement personnalisables.
- Renommage des clés de stockage : non fait, pour ne pas perdre les données existantes sans migration.
- Base d'aliments limitée et approximative : un vrai catalogue (ex. Open Food Facts) demanderait un accès réseau.
- Pas testé dans un navigateur : la vérification porte sur la compilation et la logique pure. Une passe visuelle reste nécessaire.

## Troisième itération : interface, accessibilité, mobile
- Accessibilité : lien « Aller au contenu », anneau de focus visible au clavier uniquement, cibles tactiles de 44 px au toucher, contraste renforcé et mouvements réduits selon les préférences du système, `aria-current` dans la barre latérale.
- Raccourcis : Alt + 1 à 9 pour changer de page ; indication visible dans le pied de page. Au changement de page, le focus va au contenu.
- Mobile : marges pour la barre de navigation et les zones de sécurité (encoche, barre du bas), grilles qui passent sur 2 ou 1 colonne, champs à 16 px pour éviter le zoom iOS, tableaux et contenus larges défilables, chrono flottant au-dessus de la barre de navigation.
- Corrections : les styles ajoutés précédemment utilisaient des couleurs claires en dur (fonds blancs) incompatibles avec le thème sombre ; ils utilisent maintenant les tokens du thème.
- Vérification : chaque écran est rendu côté serveur avec des données fictives sans erreur ; les feuilles CSS passent la vérification de syntaxe.

## Quatrième itération : blocs repliables
- Nouveau composant `CollapsibleSection` : titre et résumé restent visibles quand le bloc est fermé ; le contenu reste monté (une saisie en cours n'est pas perdue) ; l'état ouvert/fermé est mémorisé par bloc.
- Appliqué aux blocs longs : Entraînement (volume, bilan de semaine), Compétitions (historique), Musculation (progression, exercices d'un bloc, chaque exercice avec son résumé de séries), Coach (facteurs, décision, options, analyse, progression, repères), Sommeil (sensations, objectif), Humeur (historique, statistiques), Nutrition (historique 14 jours), Tâches (apparence, sous-tâches, statistiques).

## Cinquième itération : page Tâches
- Catégories repliables : un clic sur le titre replie ou déplie le bloc. L'en-tête affiche « faites/total », une barre de progression fine et une flèche qui pivote. L'état est mémorisé par catégorie.
- La poignée à six points (à gauche) sert seule à déplacer le bloc, pour que le clic sur le titre ne déclenche plus de glisser-déposer. Le réordonnancement au clavier (flèches) est conservé.
- « Tout replier » / « Tout déplier » au-dessus des blocs, dans les vues en liste.
- « Supprimer les terminées » dans l'onglet Terminées : supprime les tâches terminées affichées (les filtres sont respectés), après confirmation. Une seule écriture de stockage (`deleteTasks`).
- Corrections :
  - « En retard » et « À venir » restaient vides : `filter(isTaskOverdue)` transmettait l'index du tableau comme date de référence. Appels remplacés par des fonctions fléchées. Les compteurs de la vue d'ensemble correspondent maintenant à ceux des onglets.
  - Statistiques : deux boutons de repli empilés, un seul désormais, avec le résumé visible quand le bloc est fermé.
  - Les sections « En retard », « Aujourd'hui » et « À venir » mémorisent leur état d'ouverture. « En retard » est ouverte par défaut.
  - Zone tactile des en-têtes de catégorie portée à 44 px.
- Vérification : compilation esbuild sans avertissement, test dans Chromium (bureau et mobile) des repli, persistance après rechargement, réordonnancement au clavier, suppression groupée et absence d'erreur JavaScript.

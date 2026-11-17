/* =========================================================
   Base d'aliments intégrée (valeurs pour 100 g, approximatives).
   Ce sont des repères courants ; vérifie l'étiquette si besoin.
   ========================================================= */

export const FOOD_BASE = [
  { name: 'Riz blanc cuit', kcal: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { name: 'Pâtes cuites', kcal: 158, protein: 5.8, carbs: 31, fat: 0.9 },
  { name: 'Pain complet', kcal: 247, protein: 9, carbs: 41, fat: 3.4 },
  { name: 'Flocons d’avoine', kcal: 370, protein: 13, carbs: 60, fat: 7 },
  { name: 'Pomme de terre cuite', kcal: 87, protein: 1.9, carbs: 20, fat: 0.1 },
  { name: 'Quinoa cuit', kcal: 120, protein: 4.4, carbs: 21, fat: 1.9 },
  { name: 'Blanc de poulet cuit', kcal: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Steak haché 5 % MG cuit', kcal: 160, protein: 26, carbs: 0, fat: 6 },
  { name: 'Saumon cuit', kcal: 206, protein: 22, carbs: 0, fat: 12 },
  { name: 'Thon en conserve au naturel', kcal: 116, protein: 26, carbs: 0, fat: 1 },
  { name: 'Œuf entier cuit', kcal: 155, protein: 13, carbs: 1.1, fat: 11 },
  { name: 'Blanc d’œuf', kcal: 52, protein: 11, carbs: 0.7, fat: 0.2 },
  { name: 'Tofu ferme', kcal: 144, protein: 17, carbs: 3, fat: 9 },
  { name: 'Lentilles cuites', kcal: 116, protein: 9, carbs: 20, fat: 0.4 },
  { name: 'Pois chiches cuits', kcal: 164, protein: 9, carbs: 27, fat: 2.6 },
  { name: 'Haricots rouges cuits', kcal: 127, protein: 8.7, carbs: 23, fat: 0.5 },
  { name: 'Skyr nature', kcal: 63, protein: 11, carbs: 4, fat: 0.2 },
  { name: 'Yaourt grec 0 %', kcal: 57, protein: 10, carbs: 3.6, fat: 0.4 },
  { name: 'Fromage blanc 0 %', kcal: 46, protein: 8, carbs: 3.5, fat: 0.2 },
  { name: 'Lait demi-écrémé', kcal: 46, protein: 3.3, carbs: 4.8, fat: 1.6 },
  { name: 'Banane', kcal: 89, protein: 1.1, carbs: 23, fat: 0.3 },
  { name: 'Pomme', kcal: 52, protein: 0.3, carbs: 14, fat: 0.2 },
  { name: 'Orange', kcal: 47, protein: 0.9, carbs: 12, fat: 0.1 },
  { name: 'Fraises', kcal: 32, protein: 0.7, carbs: 7.7, fat: 0.3 },
  { name: 'Myrtilles', kcal: 57, protein: 0.7, carbs: 14, fat: 0.3 },
  { name: 'Dattes Medjool', kcal: 277, protein: 1.8, carbs: 75, fat: 0.2 },
  { name: 'Brocoli cuit', kcal: 35, protein: 2.4, carbs: 7, fat: 0.4 },
  { name: 'Carottes cuites', kcal: 35, protein: 0.8, carbs: 8, fat: 0.2 },
  { name: 'Épinards cuits', kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.3 },
  { name: 'Tomate', kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
  { name: 'Courgette cuite', kcal: 17, protein: 1.2, carbs: 3.1, fat: 0.3 },
  { name: 'Avocat', kcal: 160, protein: 2, carbs: 8.5, fat: 15 },
  { name: 'Huile d’olive', kcal: 884, protein: 0, carbs: 0, fat: 100 },
  { name: 'Beurre de cacahuète', kcal: 588, protein: 25, carbs: 20, fat: 50 },
  { name: 'Amandes', kcal: 579, protein: 21, carbs: 22, fat: 50 },
  { name: 'Noix', kcal: 654, protein: 15, carbs: 14, fat: 65 },
  { name: 'Chocolat noir 70 %', kcal: 598, protein: 7.8, carbs: 46, fat: 43 },
  { name: 'Barre de céréales', kcal: 420, protein: 8, carbs: 65, fat: 14 },
  { name: 'Whey protéine (poudre)', kcal: 380, protein: 78, carbs: 8, fat: 5 },
  { name: 'Jambon blanc', kcal: 107, protein: 17, carbs: 1.5, fat: 3.5 },
  { name: 'Fromage à pâte dure (type emmental)', kcal: 380, protein: 28, carbs: 0, fat: 30 },
  { name: 'Eau gazeuse sucrée (canette)', kcal: 42, protein: 0, carbs: 10.6, fat: 0 },
  { name: 'Jus d’orange', kcal: 45, protein: 0.7, carbs: 10, fat: 0.2 },
  { name: 'Boisson isotonique', kcal: 25, protein: 0, carbs: 6, fat: 0 },
  { name: 'Miel', kcal: 304, protein: 0.3, carbs: 82, fat: 0 },
  { name: 'Pain de mie blanc', kcal: 265, protein: 9, carbs: 49, fat: 3.2 },
]

/* Valeurs pour une quantité donnée en grammes. */
export function scaleFood(food, grams) {
  const factor = grams / 100
  const round = (value) => Math.round(value * 10) / 10

  return {
    calories: Math.round(food.kcal * factor),
    protein: round(food.protein * factor),
    carbohydrates: round(food.carbs * factor),
    fat: round(food.fat * factor),
  }
}

export function searchFoods(query, limit = 8) {
  const q = String(query || '').trim().toLowerCase()
  if (!q) return []

  const normalized = (text) =>
    text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

  const needle = normalized(q)

  return FOOD_BASE.filter((food) => normalized(food.name).includes(needle)).slice(0, limit)
}

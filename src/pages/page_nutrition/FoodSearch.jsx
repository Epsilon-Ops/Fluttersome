import { useMemo, useState } from 'react'
import { searchFoods, scaleFood } from '../../utils/foodBase'
import { loadFoodEntries } from '../../utils/foodHelpers'

/* Recherche dans la base intégrée ou dans les aliments récents. */
export default function FoodSearch({ onPick }) {
  const [query, setQuery] = useState('')
  const [grams, setGrams] = useState('100')

  const results = useMemo(() => searchFoods(query), [query])

  const recent = useMemo(() => {
    const seen = new Set()
    return loadFoodEntries()
      .filter((entry) => entry.name)
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
      .filter((entry) => {
        const key = entry.name.toLowerCase()
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
      .slice(0, 5)
  }, [])

  const amount = Number(grams)
  const validAmount = Number.isFinite(amount) && amount > 0

  function pickBase(food) {
    if (!validAmount) return
    const values = scaleFood(food, amount)
    onPick({
      name: `${food.name} (${amount} g)`,
      quantity: '1',
      unit: 'portion',
      ...values,
    })
    setQuery('')
  }

  function pickRecent(entry) {
    onPick({
      name: entry.name,
      quantity: '1',
      unit: 'portion',
      calories: entry.calories,
      protein: entry.protein,
      carbohydrates: entry.carbohydrates,
      fat: entry.fat,
    })
  }

  return (
    <div className="food-search">
      <div className="food-search__row">
        <label>
          Rechercher un aliment
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex. riz, poulet, banane"
          />
        </label>
        <label>
          Quantité (g)
          <input
            type="number"
            min="1"
            value={grams}
            onChange={(event) => setGrams(event.target.value)}
          />
        </label>
      </div>

      {results.length > 0 && (
        <ul className="food-search__results">
          {results.map((food) => {
            const values = validAmount ? scaleFood(food, amount) : null
            return (
              <li key={food.name}>
                <button type="button" onClick={() => pickBase(food)} disabled={!validAmount}>
                  <span>{food.name}</span>
                  <small>{values ? `${values.calories} kcal · P ${values.protein} g` : ''}</small>
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {query === '' && recent.length > 0 && (
        <div className="food-search__recent">
          <small>Récemment ajoutés :</small>
          {recent.map((entry) => (
            <button key={entry.id} type="button" onClick={() => pickRecent(entry)}>
              {entry.name}
            </button>
          ))}
        </div>
      )}

      <p className="food-search__hint">
        Les valeurs sont approximatives. Elles remplissent le formulaire, que tu peux corriger.
      </p>
    </div>
  )
}

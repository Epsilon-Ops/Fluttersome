import CollapsibleSection from '../../components/CollapsibleSection'

import Hydration from './Hydration'
import FoodDiary from './FoodDiary'
import NutritionHistory from './NutritionHistory'
import '../../styles/main_pages/page_nutrition/index.css'

export default function Nutrition() {
  return (
    <main className="nutrition-page">
      <header className="nutrition-header">
        <div>
          <span className="eyebrow">EPSILON · PERFORMANCE</span>
          <h1>Nutrition</h1>
          <p>
            Suis ton alimentation, ton hydratation et ta récupération
            pour accompagner tes entraînements.
          </p>
        </div>
      </header>

      <section className="nutrition-section">
        <Hydration />
      </section>

      <section className="nutrition-section">
        <FoodDiary />
      </section>

      <CollapsibleSection id="nutrition-history-section" title="Historique 14 jours" defaultOpen={false}><section className="nutrition-section">
        <NutritionHistory />
      </section></CollapsibleSection>
    </main>
  )
}
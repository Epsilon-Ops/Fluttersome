
const ESSENTIAL_INPUTS = [
    {
      key: "sleep",
      label: "Sommeil",
    },
    {
      key: "fatigue",
      label: "Fatigue ressentie",
    },
    {
      key: "plannedSession",
      label: "Séance prévue",
    },
    {
      key: "trainingLoad",
      label: "Charge d'entraînement récente",
    },
  ]
  
  function isPresent(value) {
    return value !== null && value !== undefined
  }
  
  export function validateReadinessInputs(inputs = {}) {
    const missing = []
    const invalid = []
  
    for (const field of ESSENTIAL_INPUTS) {
      const value = inputs[field.key]
  
      if (!isPresent(value)) {
        missing.push(field.label)
        continue
      }
  
      if (typeof value === "object" && !Array.isArray(value)) {
        if (Object.keys(value).length === 0) {
          missing.push(field.label)
        }
      }
    }
  
    if (
      isPresent(inputs.sleep) &&
      typeof inputs.sleep === "object" &&
      !Array.isArray(inputs.sleep) &&
      isPresent(inputs.sleep.durationHours) &&
      (
        !Number.isFinite(inputs.sleep.durationHours) ||
        inputs.sleep.durationHours < 0
      )
    ) {
      invalid.push("Durée de sommeil invalide")
    }
  
    const canCalculate = missing.length === 0 && invalid.length === 0
  
    return {
      canCalculate,
      status: canCalculate ? "available" : "insufficient-data",
      missing,
      invalid,
      message: canCalculate
        ? "Les champs essentiels sont présents. Leur qualité et leur cohérence restent à vérifier."
        : "Le readiness ne peut pas encore être calculé de façon fiable.",
    }
  }
  
/* Contexte qui transmet l'ordre et ses modifications aux listes de tâches */
import { createContext } from 'react'

export const TaskLayoutContext = createContext(null)

/* Actions spécifiques aux tâches (timer, compteur) transmises aux cartes */
export const TaskActionsContext = createContext(null)

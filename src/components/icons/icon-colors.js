
export const TASK_COLOR_PALETTES = [
    {
      id: 'black',
      label: 'Noir',
      primary: '#202124',
      accent: '#777777',
    },
    {
      id: 'blue',
      label: 'Océan',
      primary: '#2457C5',
      accent: '#A9C6FF',
    },
    {
      id: 'green',
      label: 'Forêt',
      primary: '#207B58',
      accent: '#9BE4BC',
    },
    {
      id: 'purple',
      label: 'Lavande',
      primary: '#7045B5',
      accent: '#C9B4F5',
    },
    {
      id: 'coral',
      label: 'Corail',
      primary: '#C44D4D',
      accent: '#FFB3A7',
    },
    {
      id: 'amber',
      label: 'Ambre',
      primary: '#A65B12',
      accent: '#FFD08A',
    },
    {
      id: 'pink',
      label: 'Rose',
      primary: '#B83265',
      accent: '#FFB3D0',
    },
    {
      id: 'slate',
      label: 'Ardoise',
      primary: '#475569',
      accent: '#CBD5E1',
    },
  ]
  
  export const DEFAULT_TASK_ICON = 'check'
  export const DEFAULT_TASK_COLOR = 'black'
  
  export function getTaskColorPalette(id) {
    return (
      TASK_COLOR_PALETTES.find((palette) => palette.id === id) ??
      TASK_COLOR_PALETTES[0]
    )
  }
  
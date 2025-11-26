'use client'

import { useEffect } from 'react'

/**
 * Composant qui calcule et stocke la largeur de la scrollbar
 * pour éviter les décalages lors de l'ouverture de modals/popovers
 */
export function ScrollbarFix() {
  useEffect(() => {
    // Calculer la largeur de la scrollbar
    const calculateScrollbarWidth = () => {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)
    }

    // Calculer au chargement
    calculateScrollbarWidth()

    // Recalculer lors du redimensionnement
    window.addEventListener('resize', calculateScrollbarWidth)

    return () => {
      window.removeEventListener('resize', calculateScrollbarWidth)
    }
  }, [])

  return null
}


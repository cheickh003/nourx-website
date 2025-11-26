"use client";

import { useEffect, useLayoutEffect, useState } from 'react';

/**
 * Hook pour détecter les media queries et gérer le responsive
 * @param query - Media query string (ex: "(min-width: 1024px)")
 * @returns boolean - true si la query match, false sinon
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useLayoutEffect(() => {
    // Vérifier si on est côté client
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);

    // Setter la valeur initiale
    setMatches(mediaQuery.matches);

    // Handler pour les changements
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Ajouter le listener
    mediaQuery.addEventListener('change', handler);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}

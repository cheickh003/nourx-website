import { Inter, Space_Grotesk } from 'next/font/google'

// Police Inter pour le corps de texte
export const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Police Space Grotesk pour les sous-titres
export const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})
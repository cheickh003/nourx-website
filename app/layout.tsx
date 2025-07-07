import type { Metadata } from 'next'
import { inter, spaceGrotesk } from './fonts'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nourx - Votre partenaire digital de A à Z',
  description: 'Entreprise de Services du Numérique basée à Abidjan. Du conseil stratégique à l\'exploitation 24/7.',
  keywords: 'ESN, transformation digitale, développement web, mobile, IA, Côte d\'Ivoire, Abidjan',
  authors: [{ name: 'Nourx' }],
  openGraph: {
    title: 'Nourx - Votre partenaire digital de A à Z',
    description: 'Entreprise de Services du Numérique basée à Abidjan. Du conseil stratégique à l\'exploitation 24/7.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Nourx',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
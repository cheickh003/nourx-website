'use client'

import CardNav, { CardNavItem } from './CardNav'

const navigation: CardNavItem[] = [
  {
    label: 'Découvrir',
    bgColor: '#0D0716',
    textColor: '#FFFFFF',
    links: [
      { label: 'À propos', href: '/a-propos', ariaLabel: 'Découvrir Nourx' },
      { label: 'Expertise', href: '/expertise', ariaLabel: 'Voir nos expertises' },
      { label: 'Sécurité', href: '/securite', ariaLabel: 'Explorer notre offre sécurité' },
    ],
  },
  {
    label: 'Offres & projets',
    bgColor: '#170D27',
    textColor: '#FFFFFF',
    links: [
      { label: 'Services', href: '/services', ariaLabel: 'Découvrir nos services' },
      { label: 'Réalisations', href: '/realisations', ariaLabel: 'Voir nos réalisations' },
      { label: 'Gérer mes services', href: '/gerer-mes-services', ariaLabel: 'Accéder à la gestion de mes services' },
    ],
  },
  {
    label: 'Nous rejoindre',
    bgColor: '#271E37',
    textColor: '#FFFFFF',
    links: [
      { label: 'Carrières', href: '/offres-emploi', ariaLabel: 'Voir les offres de carrière' },
      { label: 'Contact', href: '/contact', ariaLabel: 'Contacter l’équipe Nourx' },
      { label: 'Démarrer un projet', href: '/contact', ariaLabel: 'Démarrer un projet avec Nourx' },
    ],
  },
]

export default function Header() {
  return (
    <CardNav
      logo="/logo-nourx.png"
      logoAlt="Nourx"
      items={navigation}
      baseColor="#FFFFFF"
      menuColor="#0F172A"
      buttonBgColor="#111827"
      buttonTextColor="#FFFFFF"
      ease="power3.out"
      ctaLabel="Démarrer un projet"
      ctaHref="/contact"
      className="pt-safe"
    />
  )
}

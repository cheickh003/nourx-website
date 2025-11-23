'use client'

import { useState } from 'react'
import CardNav, { CardNavItem } from './CardNav'
import StaggeredMenu, { StaggeredMenuItem, StaggeredMenuSocialItem } from './StaggeredMenu'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'

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
      { label: 'Contact', href: '/contact', ariaLabel: "Contacter l'équipe Nourx" },
      { label: 'Démarrer un projet', href: '/contact', ariaLabel: 'Démarrer un projet avec Nourx' },
    ],
  },
]

// Extraction des items pour le StaggeredMenu mobile
const mobileMenuItems: StaggeredMenuItem[] = navigation.flatMap(category =>
  category.links.map(link => ({
    label: link.label,
    ariaLabel: link.ariaLabel,
    link: link.href,
  }))
)

// Liens sociaux (à adapter selon vos réseaux sociaux)
const socialItems: StaggeredMenuSocialItem[] = [
  { label: 'LinkedIn', link: 'https://linkedin.com' },
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  // Afficher CardNav sur desktop, StaggeredMenu sur mobile
  if (isDesktop) {
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

  return (
    <StaggeredMenu
      position="left"
      colors={['#0D0716', '#170D27', '#271E37', '#0066FF']}
      items={mobileMenuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      logoUrl="/logo-nourx.png"
      menuButtonColor="#000000"
      openMenuButtonColor="#000000"
      accentColor="#0066FF"
      isFixed={true}
      changeMenuColorOnOpen={true}
      isOpen={isMobileMenuOpen}
      onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      onClose={() => setIsMobileMenuOpen(false)}
    />
  )
}

# Site Web Nourx

Site web moderne pour Nourx, une ESN basée à Abidjan, développé avec Next.js, TypeScript et Tailwind CSS.

## 🚀 Démarrage rapide

```bash
# Installation des dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Lancer en production
npm start
```

## 🛠️ Stack Technique

- **Next.js 14+** - Framework React avec App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling utility-first
- **shadcn/ui** - Composants UI réutilisables
- **lucide-react** - Icônes modernes
- **embla-carousel-react** - Carousel performant
- **clsx & tailwind-merge** - Gestion des classes CSS

## 📁 Structure du projet

```
nourx-website/
├── app/              # App Router de Next.js
│   ├── layout.tsx    # Layout principal
│   ├── page.tsx      # Page d'accueil
│   └── globals.css   # Styles globaux
├── components/       # Composants React
│   ├── Header.tsx    # Navigation sticky
│   ├── Hero.tsx      # Section hero avec typewriter
│   ├── About.tsx     # À propos avec timeline
│   ├── Services.tsx  # Grille des 9 services
│   ├── Expertise.tsx # Stack technique avec tabs
│   ├── Portfolio.tsx # Carousel de projets
│   ├── Differentiators.tsx # Points différenciants
│   ├── Testimonials.tsx # Témoignages clients
│   ├── CallToAction.tsx # CTA avec formulaire
│   └── Footer.tsx    # Pied de page complet
├── data/             # Données structurées
│   ├── portfolio.ts  # Projets réalisés
│   ├── techLogos.ts  # Logos SVG des technologies
│   └── testimonials.ts # Témoignages
├── lib/              # Utilitaires
│   └── utils.ts      # Fonctions helper
└── public/           # Assets statiques
    └── logo-nourx.png
```

## 🎨 Design System

### Couleurs
- Blanc principal : `#FFFFFF`
- Noir Nourx : `#000000`
- Bleu accent : `#0066FF`
- Gamme de gris : 50-900

### Typographie
- Headings : Space Grotesk
- Body : Inter

## 📝 Sections développées

- [x] Header avec navigation sticky et responsive (logo taille réduite)
- [x] Hero section avec animation typewriter
- [x] Section À propos avec mission et valeurs (sans timeline)
- [x] Services grid avec 9 services animés
- [x] Expertise technique avec grille de logos SVG (sans pourcentages)
- [x] Portfolio/Réalisations simplifiée avec CTA vers page dédiée
- [x] Différenciateurs avec layout zigzag
- [x] Témoignages avec carousel auto-play
- [x] CTA Section avec formulaire et WhatsApp
- [x] Footer complet avec liens et infos
- [x] Animations CSS personnalisées
- [x] Remplacement des emojis par des icônes Lucide React

## ✨ Fonctionnalités

- **Design 100% blanc** - Interface épurée et professionnelle
- **Responsive** - Optimisé pour tous les appareils
- **Animations fluides** - Animations CSS et scroll-triggered
- **Navigation sticky** - Header qui suit le scroll
- **Carousel interactif** - Pour portfolio et témoignages
- **Formulaire de contact** - Intégré avec validation
- **WhatsApp flottant** - Bouton de contact rapide
- **SEO optimisé** - Meta tags et structure sémantique
- **Performance** - Lazy loading et optimisations Next.js

## 🔧 Commandes utiles

```bash
# Linter
npm run lint

# Type checking
npx tsc --noEmit

# Build de production
npm run build

# Analyse du bundle
npm run build && npx @next/bundle-analyzer
```
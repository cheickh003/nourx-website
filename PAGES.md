# Pages Nourx - Documentation

## 🎯 Vue d'ensemble

5 pages minimalistes et modernes ont été créées pour le site Nourx, utilisant Next.js 14 (App Router), TypeScript, Tailwind CSS et shadcn/ui.

## 📄 Pages créées

### 1. **À propos** (`/a-propos`)
- Hero avec titre accrocheur
- Section statistiques (150+ projets, 50+ clients, etc.)
- Mission de l'entreprise
- Grille des valeurs (Innovation, Excellence, Transparence, Agilité)
- Section équipe avec avatars
- CTA vers contact

### 2. **Services** (`/services`)
- Hero minimaliste
- Grille 3x3 de services avec numéros (01-09)
- Effet hover subtil sur chaque service
- Section processus en 4 étapes
- CTA centré

### 3. **Expertise** (`/expertise`)
- Stack technologique en grille compacte
- Tooltips au hover sur les logos
- Barres de progression pour les domaines
- FAQ avec accordion
- Témoignage client
- Stats (30+ techs, 150+ projets, 99.9% uptime)

### 4. **Réalisations** (`/realisations`)
- Filtrage par catégorie
- Grille de projets avec images
- Dialog pour vue détaillée
- Tags technologiques
- Section statistiques

### 5. **Contact** (`/contact`)
- Split layout : formulaire + infos
- Formulaire avec validation Zod
- 4 champs seulement (nom, email, sujet, message)
- Informations de contact structurées
- Toast de confirmation
- Placeholder pour Google Maps

## 🎨 Design System

### Principes
- **Minimalisme** : Beaucoup d'espace blanc
- **Typographie** : Space Grotesk (titres) + Inter (corps)
- **Couleurs** : Noir, blanc, gris (3 nuances), bleu accent
- **Animations** : Subtiles et performantes
- **Mobile-first** : Responsive à tous les breakpoints

### Composants shadcn/ui utilisés
- Form, Input, Textarea, Select
- Dialog, Accordion, Tabs
- Badge, Avatar, Separator
- Progress, Tooltip, ScrollArea
- Skeleton, Toast, Button

## 🚀 Performance

- Images optimisées avec Next/Image
- Lazy loading des composants lourds
- Code splitting par route
- Animations CSS natives
- Formulaires optimisés avec React Hook Form

## 📱 Responsive

Toutes les pages sont parfaitement adaptées pour :
- Mobile : < 640px
- Tablet : 640px - 1024px
- Desktop : > 1024px

## 🔗 Navigation

Le Header a été mis à jour avec les liens vers toutes les pages :
- Logo → Homepage
- À propos → `/a-propos`
- Services → `/services`
- Expertise → `/expertise`
- Réalisations → `/realisations`
- Contact → `/contact`

## 📸 Assets requis

Pour un affichage optimal, ajoutez :
- `/public/team/` : Photos de l'équipe
- `/public/projects/` : Images des projets
- Google Maps API key pour la carte de contact

## ⚡ Commandes

```bash
# Développement
npm run dev

# Build production
npm run build

# Lancer en production
npm start
```

## 🎯 Prochaines étapes

1. Ajouter les vraies images
2. Intégrer Google Maps
3. Connecter le formulaire à un backend
4. Ajouter des animations de page
5. Optimiser les performances (Lighthouse 100/100)
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Nourx company website - a modern Next.js 14+ application for an ESN (Entreprise de Services du Numérique) based in Abidjan, Côte d'Ivoire. The site showcases digital transformation services, from strategic consulting to 24/7 operations.

## Essential Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000

# Production Build
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
npx tsc --noEmit    # TypeScript type checking

# Bundle Analysis
npm run build && npx @next/bundle-analyzer    # Analyze bundle size
```

## Architecture Overview

### Tech Stack
- **Next.js 15.3.5** with App Router (not Pages Router)
- **React 19.1.0** with TypeScript 5.8.3
- **Tailwind CSS** with custom design system
- **shadcn/ui** components (configured in `components.json`)
- **React Hook Form + Zod** for forms and validation

### Routing Structure
The app uses Next.js App Router with route groups:
- `app/page.tsx` - Homepage with all sections
- `app/(pages)/[page]/page.tsx` - Individual pages (a-propos, services, expertise, realisations, contact)

### Component Organization
- `components/` - Shared components used across pages (Hero, Services, About, etc.)
- `components/ui/` - shadcn/ui primitive components
- `app/_components/` - Page-specific components (if needed)

### Design System
Colors defined in `tailwind.config.js`:
- Primary: `nourx-blue: #0066FF`
- Neutrals: `nourx-black: #000000`, `nourx-white: #FFFFFF`
- Gray scale: `nourx-gray-50` through `nourx-gray-900`

Fonts:
- Headings: Space Grotesk
- Body: Inter

## Key Development Patterns

### Adding New Components
When creating new components:
1. Use TypeScript with proper typing
2. Follow existing component patterns (see Hero.tsx, Services.tsx)
3. Use Tailwind classes with the custom color palette
4. Implement responsive design (mobile-first)

### Form Handling
Forms use React Hook Form + Zod:
```typescript
const formSchema = z.object({...})
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema)
})
```

### Styling Guidelines
- Use Tailwind utility classes
- Custom animations are defined in `tailwind.config.js`
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Common patterns: `section-padding`, `container`, `heading-1/2/3`, `text-body`

### Image Handling
- Images stored in `public/` directory
- Use Next.js `Image` component for optimization
- Placeholder images currently used (e.g., `/projects/ecommerce.jpg`)

## Important Notes

### Current State
- All pages are static (SSG) - no server-side rendering
- No authentication or API routes implemented
- Contact form is simulated (no backend integration)
- No testing framework configured

### Performance Considerations
- Bundle size is monitored (see build output)
- Images should be optimized before adding
- Components use lazy loading where appropriate

### Known Issues
- Placeholder images need to be replaced with actual project images
- Contact form needs backend integration
- Google Maps integration pending in contact page

## File References
- Main documentation: `README.md`
- Page specifications: `PAGES.md`
- Component patterns: Check existing components in `components/` directory
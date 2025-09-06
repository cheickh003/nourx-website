# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nourx website - Modern Next.js application for an ESN (Entreprise de Services du Numérique) based in Abidjan, Côte d'Ivoire. The site showcases digital transformation services from strategic consulting to 24/7 operations.

## Essential Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
npx tsc --noEmit    # TypeScript type checking

# Testing APIs
curl -X POST http://localhost:3000/api/send-email -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","phoneNumber":"2250507080910","subject":"Test","message":"Test message"}'
curl -X POST http://localhost:3000/api/send-sms -H "Content-Type: application/json" -d '{"phoneNumber":"2250507080910","name":"Test","message":"Test SMS"}'
```

## Architecture Overview

### Tech Stack
- **Next.js 15.3.5** with App Router
- **React 19.1.0** with TypeScript 5.8.3
- **Tailwind CSS** with custom design system
- **shadcn/ui** components
- **React Hook Form + Zod** for form validation
- **Nodemailer** for email sending
- **Axios** for SMS API integration

### Routing Structure
```
app/
├── page.tsx                    # Homepage with all sections
├── (pages)/                    # Route group for individual pages
│   ├── a-propos/page.tsx      # About page
│   ├── services/page.tsx      # Services page
│   ├── expertise/page.tsx     # Expertise/Tech stack page
│   ├── realisations/page.tsx  # Portfolio page
│   └── contact/page.tsx       # Contact page
└── api/                       # API routes
    ├── send-email/route.ts    # Email API endpoint
    └── send-sms/route.ts      # SMS API endpoint
```

### Component Architecture
- `components/` - Shared components for homepage sections
- `components/ui/` - shadcn/ui primitives + custom components (phone-input)
- `lib/` - Utilities and data (west-africa-countries)
- `data/` - Static data (portfolio, testimonials, tech logos)

### Design System
Colors in `tailwind.config.js`:
- Primary: `nourx-blue: #0066FF`
- Neutrals: `nourx-black: #000000`, `nourx-white: #FFFFFF`
- Gray scale: `nourx-gray-50` through `nourx-gray-900`

Typography:
- Headings: Inter
- Body: Inter

Common utility classes:
- `section-padding`: Standard section padding
- `container`: Max-width container with auto margins
- `heading-1/2/3`: Typography utilities
- `text-body`: Body text styling
- `btn-primary/secondary/accent`: Button variants

## API Integration

### Email Configuration
Environment variables in `.env.local`:
```
EMAIL_HOST=mail.spacemail.com
EMAIL_PORT=465
EMAIL_USER=no-reply@nourx.dev
EMAIL_PASS=[password]
EMAIL_TO=cheickh@nourx.dev
```

### SMS Configuration
Uses SMS Pro Africa API:
```
SMS_API_URL=https://app.smspro.africa/api/http/sms/send
SMS_API_TOKEN=[token]
```
Sender ID: "Nourx"

### West African Countries Support
Phone input supports 16 West African countries with proper formatting and validation. See `lib/west-africa-countries.ts` for full list.

## Form Handling Pattern

All forms use React Hook Form + Zod:
```typescript
const formSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phoneNumber: z.string().min(10, 'Le numéro de téléphone doit contenir au moins 10 chiffres'),
  // ...
})

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema)
})
```

## Mobile Responsiveness

The site is mobile-first with specific considerations:
- Hero title: `text-4xl sm:heading-1` with proper line breaks
- Stats section: Horizontal scroll on mobile
- Service/Value grids: 2 columns on mobile, 3 on desktop
- Mobile menu: Animated with proper close button
- Footer: Compact layout on mobile

## Current Features

### Functional
- Contact forms with SMS/email confirmation
- Mobile-responsive design
- Animated sections with scroll triggers
- West African phone number support
- Beautiful HTML email templates
- WhatsApp floating button

### Pages
- Homepage with 9 sections
- About, Services, Expertise, Portfolio, Contact pages
- All pages use consistent design system

## Known Limitations

- No authentication system
- Contact form validation is basic (min length only for phone)
- Google Maps integration pending
- Placeholder images in portfolio
- No test suite configured
- Static content (no CMS)

## Development Notes

- Always check `.env.local` for API credentials
- SMS API supports all West African countries (see route.ts for country codes)
- Email templates use inline CSS for compatibility
- Forms clear on successful submission
- Toast notifications use shadcn/ui toaster
- Mobile menu uses state management in Header component
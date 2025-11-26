# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nourx website - Modern Next.js application for an ESN (Entreprise de Services du Numérique) based in Abidjan, Côte d'Ivoire. The site showcases digital transformation services, job listings with application system, and integrated payment processing.

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
curl -X POST http://localhost:3000/api/jobs/apply -F "cv=@cv.pdf" -F "motivation=@letter.pdf" -F '{"name":"Test","email":"test@example.com","phoneNumber":"2250507080910","positionId":"1"}'
```

## Architecture Overview

### Tech Stack
- **Next.js 15.3.5** with App Router
- **React 19.1.0** with TypeScript 5.8.3
- **Tailwind CSS** with custom design system
- **shadcn/ui** components
- **React Hook Form + Zod** for form validation
- **Nodemailer** for email sending
- **AWS SDK** for S3/R2 file uploads
- **Axios** for SMS API integration
- **GSAP** for animations
- **CinetPay** for payment processing

### Complete Routing Structure
```
app/
├── page.tsx                         # Homepage with all sections
├── (pages)/                          # Route group for individual pages
│   ├── a-propos/page.tsx            # About page
│   ├── services/page.tsx            # Services page
│   ├── expertise/page.tsx           # Expertise/Tech stack page
│   ├── realisations/page.tsx        # Portfolio page
│   ├── contact/page.tsx             # Contact page
│   ├── offres-emploi/                # Jobs section
│   │   ├── page.tsx                 # Job listings
│   │   ├── [jobId]/page.tsx         # Job detail page
│   │   └── postuler/page.tsx        # Multi-step application form
│   ├── payment/                      # Payment flow
│   │   ├── page.tsx                 # Payment initiation
│   │   ├── success/page.tsx         # Success redirect
│   │   ├── cancel/page.tsx          # Cancel redirect
│   │   └── confirmation/page.tsx    # Confirmation page
│   ├── securite/page.tsx             # Security service detail
│   ├── gerer-mes-services/page.tsx  # Service management
│   ├── cgv/page.tsx                 # Terms and conditions
│   ├── mentions-legales/page.tsx    # Legal mentions
│   ├── politique-de-confidentialite/page.tsx  # Privacy policy
│   └── politique-cookies/page.tsx   # Cookie policy
└── api/                              # API routes
    ├── send-email/route.ts           # Email API endpoint
    ├── send-sms/route.ts             # SMS API endpoint
    ├── send-payment-notification/route.ts  # Payment confirmation emails
    ├── jobs/apply/route.ts           # Job application with file upload
    ├── cinetpay-checkout/route.ts   # Payment gateway initiation
    ├── cinetpay-notification/route.ts     # Payment webhooks
    └── cinetpay-status/route.ts     # Payment status checking
```

### Core Library Utilities
- `lib/email.ts` - Email transporter configuration and management
- `lib/emailTemplates.ts` - HTML email template generators (15KB)
- `lib/s3.ts` - AWS S3/Cloudflare R2 integration for file uploads
- `lib/sms.ts` - SMS sending with retry logic and West African number normalization
- `lib/services.ts` - Service data and descriptions
- `lib/west-africa-countries.ts` - 16 West African countries phone support

### Key Components
- `components/` - Homepage sections and shared components
- `components/ui/` - shadcn/ui primitives + custom phone-input
- `components/jobs/` - Job application form components
- `components/AnimatedBlock.tsx` - GSAP scroll animations
- `components/CardNav.tsx` - Card-based navigation menu

### Data Files
- `data/jobs.ts` - Job listings database (18.5KB)
- `data/services.ts` - Service definitions (20.9KB)
- `data/security.ts` - Security service details (3.9KB)
- `data/portfolio.ts` - Portfolio projects
- `data/testimonials.ts` - Client testimonials

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

### Complete Environment Variables
Create `.env.local` with:
```
# Email Configuration
EMAIL_HOST=mail.spacemail.com
EMAIL_PORT=465
EMAIL_USER=no-reply@nourx.dev
EMAIL_PASS=[password]
EMAIL_TO=cheickh@nourx.dev

# SMS Configuration
SMSPRO_API_TOKEN=[token]
SMS_SENDER_ID=Nourx
SMS_ENABLED=true

# AWS S3 / Cloudflare R2
AWS_REGION=auto
AWS_S3_BUCKET=nourx-applications
AWS_ACCESS_KEY_ID=[key]
AWS_SECRET_ACCESS_KEY=[secret]
AWS_S3_ENDPOINT=https://[account-id].r2.cloudflarestorage.com

# Payment Gateway (CinetPay)
CINETPAY_API_KEY=[key]
CINETPAY_MERCHANT_ID=[id]
CINETPAY_SITE_ID=[site-id]
CINETPAY_SECRET_KEY=[secret]
```

### Job Application System
- Multi-step form with file uploads (CV, motivation letter, certificates)
- Files uploaded to S3/R2 with presigned URLs
- Email notifications to HR and applicant
- SMS confirmations for West African numbers
- Maximum file size: 5MB per file, 20MB total

### Payment Integration
- CinetPay gateway for West African payments
- Supports mobile money and card payments
- Webhook notifications for payment status
- Email confirmations on successful payment

## Form Handling Pattern

All forms use React Hook Form + Zod with consistent validation:
```typescript
const formSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phoneNumber: z.string().min(10, 'Le numéro de téléphone doit contenir au moins 10 chiffres'),
  // File uploads for job applications
  cv: z.instanceof(File).optional(),
  motivationLetter: z.instanceof(File).optional()
})

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema)
})
```

## Mobile Responsiveness

Mobile-first design with specific breakpoints:
- Hero: `text-4xl sm:heading-1` with responsive line breaks
- Stats: Horizontal scroll on mobile
- Grids: 2 columns mobile, 3+ desktop
- Mobile menu: Animated with hamburger toggle
- Forms: Full-width inputs on mobile
- File upload: Touch-friendly dropzone
- Footer: Compact layout on mobile

## Current Features

### Functional Systems
- Contact forms with SMS/email confirmation
- Job listings with detailed application system
- Multi-file upload to S3/R2
- Payment processing with CinetPay
- West African phone number support (16 countries)
- HTML email templates with inline CSS
- WhatsApp floating button
- GSAP scroll animations
- SMS retry logic with exponential backoff
- Mobile-responsive design
- Animated sections with scroll triggers

### Key Pages
- Homepage with 9+ animated sections
- Complete job portal (listings, details, applications)
- Payment flow with success/cancel handling
- Service detail pages
- Legal pages (CGV, privacy, cookies)
- All pages use consistent design system

## Known Limitations

- No authentication system
- No test suite configured
- Static content (no CMS)
- Google Maps integration pending
- Contact form validation is basic (min length only for phone)
- Placeholder images in portfolio

## Development Notes

- Check `.env.local` for all API credentials before testing
- SMS supports all West African countries with automatic number normalization
- Job applications require S3/R2 configuration for file uploads
- Payment testing requires CinetPay sandbox credentials
- Email templates use inline CSS for maximum compatibility
- Forms clear on successful submission with toast notifications
- Mobile menu state managed in Header component
- File uploads limited to PDF, DOC, DOCX formats
- Max upload sizes enforced both client and server side
- Toast notifications use shadcn/ui toaster

## Additional Documentation

- `IMPLEMENTATION-COMPLETE.md` - Detailed jobs module implementation
- `JOBS-SETUP.md` - Setup guide for jobs system
- `PAGES.md` - Page structure documentation
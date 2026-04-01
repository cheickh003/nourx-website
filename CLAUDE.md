# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nourx website — site vitrine et applicatif pour une ESN (Entreprise de Services du Numérique) basée à Abidjan, Côte d'Ivoire. Next.js App Router avec système de candidatures (upload S3/R2), paiements CinetPay (XOF/mobile money), et notifications email/SMS.

## Essential Commands

```bash
npm run dev          # Dev server on http://localhost:3000
npm run build        # Production build
npm run lint         # ESLint
npx tsc --noEmit     # TypeScript type checking
```

No test suite is configured — there are zero test files in the codebase.

## Architecture

### Tech Stack
- **Next.js 15.3.8** (App Router) + **React 19.1.0** + **TypeScript 5.8.3**
- **Tailwind CSS** + **shadcn/ui** (34 components in `components/ui/`)
- **GSAP** (CardNav navigation animations) + **Framer Motion** + custom `AnimatedBlock` (Intersection Observer)
- **React Hook Form + Zod** for all form validation
- **Resend** for marketing emails (contact forms) + **Nodemailer/SpaceMail** for transactional emails (job applications)
- **CinetPay** for West African payments (XOF currency, mobile money + card)
- **AWS S3 / Cloudflare R2** for file uploads (presigned URLs, not public)
- Custom SMS HTTP API for West African phone numbers

### Key Architectural Decisions

1. **No database** — all content is static TypeScript in `data/` (jobs, services, portfolio, testimonials, security)
2. **Dual email system** — Resend for contact forms (`/api/send-email`), Nodemailer for job applications (`/api/jobs/apply`)
3. **External admin CRM** — webhooks to `nourx.app` via HMAC-signed requests (`lib/admin-api.ts`)
4. **Best-effort side effects** — email/SMS/admin-sync failures are logged but never block HTTP responses
5. **No middleware** — all server logic lives in API route handlers
6. **Client-side heavy** — most interaction logic on client (validation, animations, form state)

### Route Structure

All pages under `app/(pages)/` route group which adds the Footer via its own `layout.tsx`. The root `layout.tsx` provides `<Header />`, `<Toaster />`, and `<ScrollbarFix />`.

Key dynamic routes:
- `offres-emploi/[jobId]` — job detail (with `not-found.tsx` fallback)
- `services/[slug]` — service detail pages
- `payment/success` redirects to `payment/confirmation` (configured in `next.config.ts`)

### API Routes Pattern

All 8 API routes in `app/api/` follow consistent patterns:
- `NextRequest` / `NextResponse` typed handlers
- Zod schema validation (`schema.parse(json)`)
- `FormData` for multipart uploads (`/api/jobs/apply`)
- Try/catch with 400 (validation) / 500 (server) error responses

| Route | Purpose |
|-------|---------|
| `send-email` | Contact form → Resend + admin webhook |
| `send-sms` | SMS notifications |
| `jobs/apply` | Job applications with S3 file upload + email + SMS |
| `cinetpay-checkout` | Payment gateway initialization |
| `cinetpay-notification` | CinetPay webhook (HMAC signed) |
| `cinetpay-status` | Payment status query |
| `send-payment-notification` | Post-payment email confirmation |
| `revalidate` | ISR revalidation endpoint |

### Core Libraries (`lib/`)

- `email.ts` — Nodemailer transporter (SpaceMail SMTP), admin email list from `ADMIN_EMAILS` env var
- `emailTemplates.ts` — HTML email templates with inline CSS for job application notifications
- `s3.ts` — S3/R2 client: upload, presigned URLs, filename sanitization
- `sms.ts` — SMS with retry logic and West African number normalization
- `admin-api.ts` — HMAC-signed webhook sync to external admin dashboard
- `services.ts` — Service definitions for payment flow
- `west-africa-countries.ts` — 131 countries for phone input selector
- `hooks/useMediaQuery.ts` — responsive breakpoint hook

### Design System

Defined in `tailwind.config.js`:
- Primary: `nourx-blue: #0066FF`
- Neutrals: `nourx-black`, `nourx-white`, `nourx-gray-50` through `nourx-gray-900`
- Custom screens: `xs: 475px`
- Font: Inter
- Custom animations: `accordion-down/up`, `marquee`

Utility classes (in `globals.css`): `section-padding`, `container`, `heading-1/2/3`, `text-body`, `btn-primary/secondary/accent`

### Form Handling

All forms use React Hook Form + Zod with this pattern:
```typescript
const schema = z.object({ /* fields */ })
const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) })
```

File uploads: max 8MB per file, PDF/DOC/DOCX only, validated client + server side. Custom `phone-input` component with country code selector.

## Environment Variables

Required in `.env.local` (no `.env.example` exists):
- **Email**: `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `ADMIN_EMAILS`
- **SMS**: `SMS_API_KEY`, `SMS_SENDER_ID`, `SMS_ENABLED`
- **S3/R2**: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_S3_BUCKET`, `AWS_S3_ENDPOINT`
- **CinetPay**: `CINETPAY_APIKEY`, `CINETPAY_SITE_ID`, `CINETPAY_SECRET_KEY`
- **Admin**: `ADMIN_API_URL`, `ADMIN_INGEST_SECRET`

## Development Notes

- Build skips external API fetches (Google fonts, admin API) — see commits `77051c7`, `c1f8fef`
- Resend client is instantiated lazily at runtime to avoid build errors when env vars are missing
- All content is in French — UI text, error messages, email templates
- `lang="fr"` set on root `<html>` element
- Documentation files are in `docs/` directory

## Additional Documentation

- `docs/IMPLEMENTATION-COMPLETE.md` — Jobs module implementation details
- `docs/JOBS-SETUP.md` — Setup guide for jobs system
- `docs/PAGES.md` — Page structure documentation

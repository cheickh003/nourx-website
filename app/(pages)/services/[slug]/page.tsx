import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Sparkles,
} from "lucide-react"

import {
  getAllServices,
  getServiceBySlug,
  type ServiceDetail,
} from "@/data/services"

interface ServicePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return {
      title: "Service - Nourx",
    }
  }

  return {
    title: `${service.title} - Nourx`,
    description: service.shortDescription,
  }
}

function KeyMetrics({ service }: { service: ServiceDetail }) {
  return (
    <section className="py-12 px-4 bg-white border border-nourx-gray-200 rounded-2xl shadow-sm">
      <div className="grid gap-6 md:grid-cols-3">
        {service.stats.map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <p className="text-sm uppercase tracking-wide text-nourx-gray-500">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-nourx-black mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Outcomes({ service }: { service: ServiceDetail }) {
  return (
    <section className="py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold mb-6">
            Impact mesurable pour vos équipes
          </h2>
          <p className="text-nourx-gray-600 leading-relaxed">
            {service.longDescription}
          </p>
        </div>
        <div className="space-y-4">
          {service.outcomes.map((item) => (
            <div
              key={item}
              className="p-5 border border-nourx-gray-200 rounded-xl bg-white flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-nourx-blue mt-1 flex-shrink-0" />
              <p className="text-nourx-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Benefits({ service }: { service: ServiceDetail }) {
  return (
    <section className="py-16">
      <div className="bg-nourx-gray-50 border border-nourx-gray-200 rounded-2xl p-8 lg:p-12">
        <h3 className="text-2xl font-semibold mb-6">Pourquoi choisir Nourx</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {service.benefits.map((benefit) => (
            <div key={benefit}>
              <p className="text-nourx-gray-700">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process({ service }: { service: ServiceDetail }) {
  return (
    <section className="py-16">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-5 h-5 text-nourx-blue" />
        <span className="text-sm font-semibold text-nourx-blue uppercase tracking-wide">
          Une méthodologie éprouvée
        </span>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {service.process.map((step, index) => (
          <div
            key={step.title}
            className="border border-nourx-gray-200 rounded-2xl p-6 bg-white relative"
          >
            <span className="absolute -top-3 left-6 px-3 py-1 bg-nourx-black text-white text-xs rounded-full">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
            <p className="text-nourx-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Technologies({ service }: { service: ServiceDetail }) {
  return (
    <section className="py-16">
      <div className="bg-white border border-nourx-gray-200 rounded-2xl p-8">
        <h3 className="text-2xl font-semibold mb-6">Technologies mobilisées</h3>
        <div className="flex flex-wrap gap-3">
          {service.technologies.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-nourx-gray-50 border border-nourx-gray-200 rounded-full text-sm text-nourx-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonial({ service }: { service: ServiceDetail }) {
  return (
    <section className="py-16">
      <div className="bg-nourx-black text-white rounded-2xl p-8 md:p-12">
        <p className="text-lg md:text-xl leading-relaxed mb-6">
          “{service.testimonial.quote}”
        </p>
        <div>
          <p className="font-semibold">{service.testimonial.author}</p>
          <p className="text-sm text-white/70">{service.testimonial.role}</p>
        </div>
      </div>
    </section>
  )
}

function CTA({ service }: { service: ServiceDetail }) {
  return (
    <section className="py-16">
      <div className="bg-nourx-gray-900 text-white rounded-2xl p-10 text-center space-y-6">
        <p className="text-xl md:text-2xl font-semibold">
          Prêt à accélérer sur {service.title.toLowerCase()} ?
        </p>
        <p className="text-white/80">{service.cta.description}</p>
        <Link
          href={service.cta.href}
          className="inline-flex items-center gap-2 bg-white text-nourx-black px-8 py-4 rounded-lg font-medium hover:bg-nourx-blue hover:text-white transition-colors"
        >
          {service.cta.label}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  )
}

export default async function ServiceDetailPage({
  params,
}: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="pt-28 pb-16 px-4 bg-nourx-gray-50">
        <div className="container max-w-5xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-nourx-gray-600 hover:text-nourx-black mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux services
          </Link>

          <div className="bg-white rounded-3xl border border-nourx-gray-200 p-8 md:p-12 shadow-sm">
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-nourx-gray-100 text-nourx-gray-600 text-sm font-medium mb-6">
              Service #{service.number}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
            <p className="text-lg text-nourx-gray-600 max-w-3xl mb-8">
              {service.shortDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={service.cta.href}
                className="inline-flex items-center gap-2 bg-nourx-black text-white px-6 py-3 rounded-full font-medium hover:bg-nourx-blue transition-colors"
              >
                {service.cta.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-nourx-gray-300 px-6 py-3 rounded-full font-medium text-nourx-black hover:border-nourx-black transition-colors"
              >
                Parler à un expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 -mt-10 relative z-10">
        <div className="container max-w-5xl mx-auto space-y-12">
          <KeyMetrics service={service} />
          <Outcomes service={service} />
          <Benefits service={service} />
          <Process service={service} />
          <Technologies service={service} />
          <Testimonial service={service} />
          <CTA service={service} />
        </div>
      </section>
    </main>
  )
}

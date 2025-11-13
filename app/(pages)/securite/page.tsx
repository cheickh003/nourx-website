import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import {
  complianceItems,
  securityCTA,
  securityMeasures,
  securityPrinciples,
  securityProcess,
} from "@/data/security"

export const metadata: Metadata = {
  title: "Sécurité & Conformité - Nourx",
  description:
    "Découvrez nos engagements en matière de sécurité, de conformité et de protection des données pour garantir la fiabilité de vos projets digitaux.",
}

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-nourx-gray-50">
        <div className="container max-w-5xl mx-auto">
          <div className="bg-white border border-nourx-gray-200 rounded-3xl p-10 md:p-14 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-nourx-gray-400 mb-4">
              Sécurité & conformité
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-nourx-black">
              Nous protégeons vos données et vos utilisateurs, de bout en bout.
            </h1>
            <p className="text-lg text-nourx-gray-600 leading-relaxed mb-8">
              Chaque projet confié à Nourx bénéficie d’un cadre sécurité strict : gouvernance, chiffrement, monitoring et
              plan de continuité documentés. Nous travaillons main dans la main avec vos équipes IT, Produit et Juridique.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-nourx-black text-white px-6 py-3 rounded-full font-medium hover:bg-nourx-blue transition-colors"
              >
                Parler à un expert sécurité
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services/conseil-digital"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-nourx-gray-300 text-nourx-black font-medium hover:border-nourx-black transition-colors"
              >
                Découvrir nos méthodes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Principes */}
      <section className="py-20 px-4">
        <div className="container max-w-5xl mx-auto space-y-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Nos principes de sécurité</h2>
            <p className="text-nourx-gray-600">
              Nous structurons nos engagements autour de trois piliers indispensables à tout SI moderne.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {securityPrinciples.map((principle) => (
              <div
                key={principle.title}
                className="border border-nourx-gray-200 rounded-2xl p-6 bg-white flex flex-col gap-4"
              >
                <principle.icon className="w-10 h-10 text-nourx-blue" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{principle.title}</h3>
                  <p className="text-nourx-gray-600">{principle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mesures concrètes */}
      <section className="py-16 px-4 bg-nourx-gray-50">
        <div className="container max-w-5xl mx-auto space-y-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Mesures concrètes</h2>
            <p className="text-nourx-gray-600">
              Combinaison de contrôles techniques, organisationnels et humains pour sécuriser chaque environnement.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {securityMeasures.map((measure) => (
              <div key={measure.category} className="bg-white border border-nourx-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">{measure.category}</h3>
                <ul className="space-y-3">
                  {measure.items.map((item) => (
                    <li key={item} className="flex gap-2 text-nourx-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-nourx-blue mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conformité */}
      <section className="py-16 px-4">
        <div className="container max-w-5xl mx-auto space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Conformité & obligations locales</h2>
            <p className="text-nourx-gray-600">
              Nos pratiques évoluent avec les réglementations régionales (RGPD, SNDI, directives de l’ANSUT) et les
              standards internationaux.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {complianceItems.map((item) => (
              <div key={item.title} className="border border-nourx-gray-200 rounded-2xl p-6 bg-white">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-nourx-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="py-16 px-4 bg-nourx-gray-50">
        <div className="container max-w-5xl mx-auto space-y-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Processus de sécurité</h2>
            <p className="text-nourx-gray-600">
              Une démarche cyclique pour anticiper, protéger et améliorer continuellement vos environnements.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {securityProcess.map((step, index) => (
              <div key={step.title} className="bg-white border border-nourx-gray-200 rounded-2xl p-6 relative">
                <span className="text-sm font-semibold text-nourx-gray-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-nourx-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="bg-nourx-gray-900 text-white rounded-3xl p-10 space-y-6 text-center">
            <h2 className="text-3xl font-bold">{securityCTA.title}</h2>
            <p className="text-white/80 text-lg">{securityCTA.description}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={securityCTA.primary.href}
                className="inline-flex items-center gap-2 bg-white text-nourx-black px-6 py-3 rounded-full font-medium hover:bg-nourx-blue hover:text-white transition-colors"
              >
                {securityCTA.primary.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={securityCTA.secondary.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/40 text-white font-medium hover:border-white transition-colors"
              >
                {securityCTA.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function ServicesPage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  const services = [
    {
      number: '01',
      title: 'Développement Web',
      description: 'Sites web modernes et applications web performantes adaptés à vos besoins.',
      details: 'React, Next.js, Laravel, WordPress'
    },
    {
      number: '02', 
      title: 'Applications Mobiles',
      description: 'Applications iOS et Android natives ou cross-platform pour toucher vos utilisateurs.',
      details: 'Flutter, Swift, Kotlin, React Native'
    },
    {
      number: '03',
      title: 'ERP et CRM',
      description: 'Solutions de gestion intégrées pour optimiser vos processus métiers.',
      details: 'Odoo, Salesforce, Solutions sur mesure'
    },
    {
      number: '04',
      title: 'Intelligence Artificielle',
      description: 'Intégration de l\'IA pour automatiser et améliorer vos services.',
      details: 'Machine Learning, NLP, Computer Vision'
    },
    {
      number: '05',
      title: 'DevOps & Cloud',
      description: 'Infrastructure cloud scalable et processus de déploiement automatisés.',
      details: 'AWS, Docker, Kubernetes, CI/CD'
    },
    {
      number: '06',
      title: 'Marketing Digital',
      description: 'Stratégies digitales pour augmenter votre visibilité et vos conversions.',
      details: 'SEO, SEM, Social Media, Analytics'
    },
    {
      number: '07',
      title: 'Support 24/7',
      description: 'Maintenance et support technique continu pour garantir la performance.',
      details: 'Monitoring, Updates, Bug fixes'
    },
    {
      number: '08',
      title: 'Formation',
      description: 'Programmes de formation personnalisés pour autonomiser vos équipes.',
      details: 'Workshops, Bootcamps, Mentoring'
    },
    {
      number: '09',
      title: 'Conseil Digital',
      description: 'Accompagnement stratégique pour votre transformation numérique.',
      details: 'Audit, Stratégie, Roadmap'
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Services qui propulsent
              <span className="block text-nourx-gray-400">votre croissance</span>
            </h1>
            <p className="text-lg md:text-xl text-nourx-gray-600 leading-relaxed">
              Une gamme complète de services digitaux pour accompagner votre entreprise à chaque étape de sa transformation numérique.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-px bg-nourx-gray-200">
            {services.map((service, index) => (
              <div
                key={service.number}
                className="bg-white p-8 md:p-12 relative group cursor-pointer transition-all duration-300 hover:bg-nourx-gray-50"
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Service Number */}
                <span className="text-6xl md:text-7xl font-bold text-nourx-gray-100 mb-6 block">
                  {service.number}
                </span>

                {/* Service Title */}
                <h3 className="text-xl md:text-2xl font-semibold mb-4">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-nourx-gray-600 mb-4">
                  {service.description}
                </p>

                {/* Service Details - Show on hover */}
                <div className={`transition-all duration-300 ${
                  hoveredService === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}>
                  <p className="text-sm text-nourx-gray-500">
                    {service.details}
                  </p>
                </div>

                {/* Arrow Icon */}
                <ArrowRight className={`absolute bottom-8 right-8 w-6 h-6 transition-all duration-300 ${
                  hoveredService === index ? 'opacity-100 translate-x-2' : 'opacity-0'
                }`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-nourx-gray-50">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            Notre Approche
          </h2>
          
          <div className="space-y-12">
            <div className="flex gap-8 items-start">
              <span className="text-2xl font-bold text-nourx-gray-300 mt-1">01</span>
              <div>
                <h3 className="text-xl font-semibold mb-2">Découverte</h3>
                <p className="text-nourx-gray-600">
                  Nous analysons vos besoins, objectifs et contraintes pour définir la meilleure approche.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <span className="text-2xl font-bold text-nourx-gray-300 mt-1">02</span>
              <div>
                <h3 className="text-xl font-semibold mb-2">Conception</h3>
                <p className="text-nourx-gray-600">
                  Création d'une solution sur mesure avec prototypes et validation à chaque étape.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <span className="text-2xl font-bold text-nourx-gray-300 mt-1">03</span>
              <div>
                <h3 className="text-xl font-semibold mb-2">Développement</h3>
                <p className="text-nourx-gray-600">
                  Réalisation agile avec des livrables réguliers et une communication transparente.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <span className="text-2xl font-bold text-nourx-gray-300 mt-1">04</span>
              <div>
                <h3 className="text-xl font-semibold mb-2">Déploiement</h3>
                <p className="text-nourx-gray-600">
                  Mise en production sécurisée avec formation et accompagnement de vos équipes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Un projet en tête ?
          </h2>
          <p className="text-lg text-nourx-gray-600 mb-8">
            Discutons de la meilleure façon de le concrétiser.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-nourx-black text-white px-8 py-4 rounded-lg hover:bg-nourx-gray-900 transition-colors font-medium"
          >
            Discuter de votre projet
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </main>
  )
}
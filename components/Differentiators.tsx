'use client'

import { useEffect, useRef, useState } from 'react'
import { 
  Zap, 
  Users, 
  Brain, 
  MapPin, 
  CreditCard,
  HeadphonesIcon,
  ShieldCheck,
  Rocket
} from 'lucide-react'

const differentiators = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Approche Full-Stack',
    description: 'Couverture complète du cycle de vie projet sans sous-traitance. De la stratégie à l\'exploitation, une équipe unique pour tous vos besoins.',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: 'Culture DevOps',
    description: 'Automatisation maximale et réduction des délais de mise en production. Déploiements continus et monitoring 24/7.',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'Innovation Pragmatique',
    description: 'Usage raisonné de l\'IA avec POCs rapides. Solutions innovantes adaptées à votre contexte et votre budget.',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: 'Proximité Locale',
    description: 'Disponibilité sur site avec connaissance approfondie du contexte UEMOA/OHADA. Équipe basée à Abidjan.',
    color: 'from-green-400 to-teal-500',
  },
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: 'Transparence Budgétaire',
    description: 'Modèles tarifaires clairs (TJM ou forfait). Pas de coûts cachés, reporting détaillé des prestations.',
    color: 'from-red-400 to-pink-500',
  },
]

export default function Differentiators() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            differentiators.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => [...prev, index])
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding bg-nourx-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">Ce qui nous différencie</h2>
          <p className="text-body max-w-2xl mx-auto">
            Une approche unique qui combine expertise technique, proximité locale et engagement qualité
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {differentiators.map((diff, index) => (
            <div
              key={diff.title}
              className={`text-center ${
                visibleItems.includes(index) ? 'animate-fade-in' : 'opacity-0'
              }`}
            >
              {/* Icon & Visual */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br ${diff.color} opacity-20 absolute inset-0 animate-pulse`}
                  />
                  <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center shadow-xl">
                    <div className="text-nourx-black scale-75 sm:scale-100">{diff.icon}</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="heading-3 text-base sm:text-xl mb-2 sm:mb-3">{diff.title}</h3>
                <p className="text-body text-xs sm:text-sm">{diff.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="mt-20 bg-white rounded-lg p-8 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <ShieldCheck className="w-10 h-10 text-nourx-blue mx-auto mb-3" />
              <h4 className="font-bold text-2xl mb-1">100%</h4>
              <p className="text-sm text-nourx-gray-600">Projets sécurisés</p>
            </div>
            <div className="text-center">
              <Users className="w-10 h-10 text-nourx-blue mx-auto mb-3" />
              <h4 className="font-bold text-2xl mb-1">95%</h4>
              <p className="text-sm text-nourx-gray-600">Clients satisfaits</p>
            </div>
            <div className="text-center">
              <Rocket className="w-10 h-10 text-nourx-blue mx-auto mb-3" />
              <h4 className="font-bold text-2xl mb-1">-50%</h4>
              <p className="text-sm text-nourx-gray-600">Time to market</p>
            </div>
            <div className="text-center">
              <HeadphonesIcon className="w-10 h-10 text-nourx-blue mx-auto mb-3" />
              <h4 className="font-bold text-2xl mb-1">24/7</h4>
              <p className="text-sm text-nourx-gray-600">Support bilingue</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
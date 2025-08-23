'use client'

import { Building2, Target, Lightbulb, Users } from 'lucide-react'

const values = [
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: 'Innovation',
    description: 'Toujours à la pointe de la technologie pour offrir les meilleures solutions.',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Proximité',
    description: 'Une équipe locale qui comprend vos besoins et votre contexte business.',
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Excellence',
    description: 'Un engagement qualité sur chaque projet, du plus simple au plus complexe.',
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: 'Partenariat',
    description: 'Une relation de confiance durable avec nos clients pour leur croissance.',
  },
]

export default function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">À propos de Nourx</h2>
          <p className="text-body max-w-2xl mx-auto">
            Une entreprise de services du numérique qui conjugue expertise internationale et flexibilité locale
          </p>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-nourx-gray-50 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="heading-3 mb-6">Notre Mission</h3>
            <p className="text-body text-lg leading-relaxed">
              Accompagner les organisations africaines dans leur transformation digitale complète, 
              de la stratégie à l'exploitation opérationnelle, en offrant des solutions innovantes, 
              adaptées au contexte local et alignées sur les standards internationaux.
            </p>
          </div>
        </div>

        {/* Values */}
        <div>
          <h3 className="heading-3 text-center mb-12">Nos Valeurs</h3>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center group"
              >
                <div className="inline-flex p-3 sm:p-4 bg-nourx-gray-50 rounded-full text-nourx-black mb-3 sm:mb-4 group-hover:bg-nourx-blue group-hover:text-white transition-all duration-300">
                  {value.icon}
                </div>
                <h4 className="font-semibold text-base sm:text-lg mb-2">{value.title}</h4>
                <p className="text-body text-xs sm:text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Numbers */}
        <div className="mt-20 bg-nourx-black text-white rounded-2xl p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-nourx-blue mb-2">80+</div>
              <p className="text-sm">Projets livrés</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-nourx-blue mb-2">35+</div>
              <p className="text-sm">Clients satisfaits</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-nourx-blue mb-2">4</div>
              <p className="text-sm">Pays couverts</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-nourx-blue mb-2">24/7</div>
              <p className="text-sm">Support disponible</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
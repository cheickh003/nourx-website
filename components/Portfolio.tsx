'use client'

import Link from 'next/link'
import { ArrowRight, Rocket, Clock } from 'lucide-react'

export default function Portfolio() {
  return (
    <section id="realisations" className="section-padding bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-2 mb-4">Nos Réalisations</h2>
          <p className="text-body text-lg mb-12">
            Des projets innovants qui transforment les entreprises et créent de la valeur mesurable
          </p>

          {/* Coming Soon Card */}
          <div className="bg-gradient-to-br from-nourx-gray-50 to-white border-2 border-dashed border-nourx-gray-200 rounded-2xl p-12 mb-12">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-nourx-blue/10 rounded-full mb-6">
                <Rocket className="w-12 h-12 text-nourx-blue" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-nourx-black">
                Projets en préparation
              </h3>
              <p className="text-nourx-gray-600 mb-6 max-w-2xl">
                Nous finalisons actuellement la présentation de nos réalisations les plus récentes. 
                Nos projets couvrent le développement web, mobile, l'IA et les solutions ERP.
              </p>
              <div className="flex items-center gap-2 text-sm text-nourx-gray-500">
                <Clock className="w-4 h-4" />
                <span>Mise à jour prochainement</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-body mb-10">
            De la refonte d'applications e-commerce à l'implémentation d'ERP sur mesure, 
            en passant par le développement d'applications mobiles et de solutions IA, 
            nous aidons nos clients à atteindre leurs objectifs digitaux.
          </p>

          {/* CTA Button */}
          <Link 
            href="/realisations" 
            className="btn-primary inline-flex items-center gap-2 group"
          >
            Découvrir nos projets
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
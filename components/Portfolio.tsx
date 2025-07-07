'use client'

import Link from 'next/link'
import { ArrowRight, Briefcase, Award, TrendingUp } from 'lucide-react'

export default function Portfolio() {
  return (
    <section id="realisations" className="section-padding bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-2 font-android mb-4">Nos Réalisations</h2>
          <p className="text-body text-lg mb-12">
            Des projets innovants qui transforment les entreprises et créent de la valeur mesurable
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-6">
              <Briefcase className="w-10 h-10 text-nourx-blue mx-auto mb-4" />
              <h3 className="font-android text-3xl font-bold mb-2">80+</h3>
              <p className="text-nourx-gray-600">Projets livrés</p>
            </div>
            <div className="p-6">
              <Award className="w-10 h-10 text-nourx-blue mx-auto mb-4" />
              <h3 className="font-android text-3xl font-bold mb-2">6</h3>
              <p className="text-nourx-gray-600">Secteurs d'activité</p>
            </div>
            <div className="p-6">
              <TrendingUp className="w-10 h-10 text-nourx-blue mx-auto mb-4" />
              <h3 className="font-android text-3xl font-bold mb-2">150%</h3>
              <p className="text-nourx-gray-600">ROI moyen</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-body mb-10">
            De la refonte d'applications e-commerce à l'implémentation d'ERP sur mesure, 
            en passant par le développement d'applications mobiles et de solutions IA, 
            découvrez comment nous avons aidé nos clients à atteindre leurs objectifs.
          </p>

          {/* CTA Button */}
          <Link 
            href="/portfolio" 
            className="btn-primary inline-flex items-center gap-2 group"
          >
            Découvrir tous nos projets
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
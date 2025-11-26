'use client'

import { ArrowRight, Rocket, Clock, Building2, Users, Award, TrendingUp } from 'lucide-react'

export default function RealisationsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Nos réalisations
              <span className="block text-nourx-gray-400">parlent d'elles-mêmes</span>
            </h1>
            <p className="text-lg md:text-xl text-nourx-gray-600 leading-relaxed">
              Découvrez bientôt une sélection de projets qui illustrent notre expertise et notre capacité à transformer des idées en solutions digitales performantes.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-nourx-gray-50 to-white border-2 border-dashed border-nourx-gray-200 rounded-3xl p-16 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="p-6 bg-nourx-blue/10 rounded-full inline-flex mb-8">
                <Rocket className="w-16 h-16 text-nourx-blue" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-nourx-black">
                Portfolio en préparation
              </h2>
              <p className="text-lg text-nourx-gray-600 mb-8 leading-relaxed">
                Nous finalisons actuellement la présentation de nos réalisations les plus marquantes. 
                Nos projets couvrent le développement web et mobile, l'intelligence artificielle, 
                les solutions ERP/CRM et bien plus encore.
              </p>
              <div className="flex items-center justify-center gap-3 text-nourx-gray-500 mb-8">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Mise à jour très prochainement</span>
              </div>
              <p className="text-nourx-gray-600">
                En attendant, n'hésitez pas à nous contacter pour discuter de votre projet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Section */}
      <section className="py-20 px-4 bg-nourx-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre impact en chiffres</h2>
            <p className="text-nourx-gray-600">Des résultats mesurables pour nos clients</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <Building2 className="w-8 h-8 text-nourx-blue mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">80+</p>
              <p className="text-nourx-gray-600">Projets livrés</p>
            </div>
            <div className="p-6">
              <Users className="w-8 h-8 text-nourx-blue mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">35+</p>
              <p className="text-nourx-gray-600">Clients satisfaits</p>
            </div>
            <div className="p-6">
              <Award className="w-8 h-8 text-nourx-blue mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">98%</p>
              <p className="text-nourx-gray-600">Taux de satisfaction</p>
            </div>
            <div className="p-6">
              <TrendingUp className="w-8 h-8 text-nourx-blue mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">6</p>
              <p className="text-nourx-gray-600">Secteurs couverts</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Votre projet sera le prochain
          </h2>
          <p className="text-lg text-nourx-gray-600 mb-8">
            Rejoignez nos clients satisfaits et donnons vie à votre vision digitale.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-nourx-black text-white px-8 py-4 rounded-full hover:bg-nourx-blue transition-all duration-300 hover:scale-105 font-medium"
          >
            Démarrer un projet
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </main>
  )
}
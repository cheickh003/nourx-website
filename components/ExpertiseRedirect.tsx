'use client'

import Link from 'next/link'
import { ArrowRight, Code, Smartphone, Cloud } from 'lucide-react'

export default function ExpertiseRedirect() {
  return (
    <section className="py-16 bg-gradient-to-r from-nourx-gray-50 to-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-nourx-black">
              Découvrez notre expertise technique
            </h2>
            <p className="text-lg text-nourx-gray-600 max-w-2xl mx-auto">
              Technologies modernes, méthodologies éprouvées et savoir-faire local pour vos projets digitaux
            </p>
          </div>

          {/* Quick Tech Icons */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="p-3 bg-blue-100 rounded-full text-blue-600 mb-2">
                <Code className="w-6 h-6" />
              </div>
              <span className="text-sm text-nourx-gray-600">Web & API</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-purple-100 rounded-full text-purple-600 mb-2">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="text-sm text-nourx-gray-600">Mobile</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-green-100 rounded-full text-green-600 mb-2">
                <Cloud className="w-6 h-6" />
              </div>
              <span className="text-sm text-nourx-gray-600">Cloud & IA</span>
            </div>
          </div>

          {/* CTA */}
          <Link 
            href="/expertise" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-nourx-blue text-white rounded-full font-medium hover:bg-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
          >
            Voir notre expertise complète
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
'use client'

import { useState } from 'react'
import { Send, MessageCircle, Phone, ArrowRight, Lock, Zap } from 'lucide-react'

export default function CallToAction() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section className="section-padding bg-gradient-to-br from-nourx-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-nourx-blue rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-nourx-blue rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="heading-2 mb-6">
                Prêt à transformer votre vision en réalité ?
              </h2>
              <p className="text-body text-lg mb-8">
                Discutons de votre projet et découvrez comment Nourx peut accélérer votre transformation digitale.
              </p>

              {/* Contact Options */}
              <div className="space-y-4 mb-8">
                <a
                  href="https://wa.me/2250708887777"
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="p-3 bg-green-100 rounded-full text-green-600">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">WhatsApp Business</h4>
                    <p className="text-sm text-nourx-gray-600">Réponse instantanée</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-nourx-gray-400 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="tel:+2250708887777"
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">+225 07 08 88 77 77</h4>
                    <p className="text-sm text-nourx-gray-600">Lun-Ven 8h-18h</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-nourx-gray-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 text-sm text-nourx-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Disponible maintenant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>100% confidentiel</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="heading-3 mb-6">Envoyez-nous un message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-nourx-gray-700 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-nourx-gray-200 rounded-lg focus:ring-2 focus:ring-nourx-blue focus:border-transparent transition-all duration-300"
                    placeholder="Jean Kouassi"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-nourx-gray-700 mb-2">
                    Email professionnel
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-nourx-gray-200 rounded-lg focus:ring-2 focus:ring-nourx-blue focus:border-transparent transition-all duration-300"
                    placeholder="jean@entreprise.ci"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-nourx-gray-700 mb-2">
                    Votre projet
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-nourx-gray-200 rounded-lg focus:ring-2 focus:ring-nourx-blue focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Décrivez brièvement votre projet..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-accent flex items-center justify-center gap-2 group"
                >
                  Envoyer le message
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-xs text-center text-nourx-gray-500">
                  En soumettant ce formulaire, vous acceptez notre politique de confidentialité
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/2250708887777"
        className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 animate-bounce"
        aria-label="Contactez-nous sur WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </section>
  )
}
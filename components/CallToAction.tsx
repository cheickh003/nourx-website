'use client'

import { useState } from 'react'
import { Send, MessageCircle, Phone, ArrowRight, Lock, Zap } from 'lucide-react'
import { PhoneInput } from '@/components/ui/phone-input'

export default function CallToAction() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Validate phone number has at least 10 digits
      if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
        throw new Error('Veuillez entrer un numéro de téléphone valide')
      }

      // Send email
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subject: 'Demande via formulaire rapide',
        }),
      })

      if (!emailResponse.ok) {
        const errorData = await emailResponse.text()
        console.error('Email error response:', errorData)
        throw new Error('Erreur lors de l\'envoi de l\'email')
      }

      // Send SMS confirmation if phone number provided
      if (formData.phoneNumber) {
        const smsResponse = await fetch('/api/send-sms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: formData.phoneNumber,
            name: formData.name,
            email: formData.email,
            message: `Bonjour ${formData.name},\n\nMerci pour votre message sur nourx.dev. Nous avons bien reçu votre demande et nous vous répondrons dans les 24 heures.\n\nCordialement,\nL'équipe Nourx`
          }),
        })

        if (!smsResponse.ok) {
          console.error('Erreur SMS:', await smsResponse.text())
          // Continue even if SMS fails
        }
      }

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
      })
    } catch (error) {
      console.error('Erreur:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      phoneNumber: value
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
                  href="https://wa.me/2250720111108"
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
                  href="tel:+2250720111108"
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">+225 07 20 11 11 08</h4>
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
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-nourx-gray-700 mb-2">
                    Téléphone
                  </label>
                  <PhoneInput
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    defaultCountryCode="CI"
                    className="w-full"
                    required
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
                  disabled={isSubmitting}
                  className="w-full btn-accent flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Envoi en cours...'
                  ) : (
                    <>
                      Envoyer le message
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm">
                    Message envoyé avec succès ! Vous recevrez une confirmation par email et SMS.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                    Une erreur est survenue. Veuillez réessayer.
                  </div>
                )}

                <p className="text-xs text-center text-nourx-gray-500">
                  En soumettant ce formulaire, vous acceptez notre politique de confidentialité
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
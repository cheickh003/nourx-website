'use client'

import { useState } from 'react'
import { Send, MessageCircle, Phone, ArrowRight, Lock, Zap, AlertCircle, CheckCircle, Loader2, User, Mail } from 'lucide-react'
import { PhoneInput } from '@/components/ui/phone-input'
import { cn } from '@/lib/utils'

export default function CallToAction() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  })

  const [formErrors, setFormErrors] = useState({
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
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-medium text-nourx-gray-700 mb-2">
                    Nom complet
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-nourx-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={cn(
                        "w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-nourx-blue focus:border-transparent transition-all duration-300 transform",
                        formErrors.name ? "border-red-500 shake" : "border-nourx-gray-200",
                        "hover:shadow-sm focus:shadow-md focus:scale-[1.01]"
                      )}
                      placeholder="Jean Kouassi"
                    />
                    {formErrors.name && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600 animate-fade-in">{formErrors.name}</p>
                  )}
                </div>

                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-nourx-gray-700 mb-2">
                    Email professionnel
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-nourx-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={cn(
                        "w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-nourx-blue focus:border-transparent transition-all duration-300 transform",
                        formErrors.email ? "border-red-500 shake" : "border-nourx-gray-200",
                        "hover:shadow-sm focus:shadow-md focus:scale-[1.01]"
                      )}
                      placeholder="jean@entreprise.ci"
                    />
                    {formErrors.email && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600 animate-fade-in">{formErrors.email}</p>
                  )}
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
                  className={cn(
                    "w-full relative py-4 px-6 rounded-lg font-medium text-white transition-all duration-300 transform",
                    "bg-gradient-to-r from-nourx-blue to-blue-600 hover:from-blue-600 hover:to-nourx-blue",
                    "hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                    "focus:outline-none focus:ring-2 focus:ring-nourx-blue focus:ring-offset-2"
                  )}
                >
                  <span className={cn(
                    "flex items-center justify-center gap-2 transition-all",
                    isSubmitting && "opacity-0"
                  )}>
                    Envoyer le message
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  {isSubmitting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </div>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-sm animate-slide-up">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-green-800">Message envoyé avec succès !</p>
                        <p className="text-green-700 mt-1">Vous recevrez une confirmation par email et SMS.</p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm animate-shake">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-red-800">Une erreur est survenue</p>
                        <p className="text-red-700 mt-1">Veuillez vérifier votre connexion et réessayer.</p>
                      </div>
                    </div>
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
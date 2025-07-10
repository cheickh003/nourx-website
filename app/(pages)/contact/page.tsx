'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PhoneInput } from '@/components/ui/phone-input'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phoneNumber: z.string()
    .min(10, 'Le numéro de téléphone doit contenir au moins 10 chiffres'),
  subject: z.string().min(1, 'Veuillez sélectionner un sujet'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      subject: '',
      message: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    try {
      // Send email
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!emailResponse.ok) {
        throw new Error('Erreur lors de l\'envoi de l\'email')
      }

      // Send SMS confirmation
      const smsResponse = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: values.phoneNumber,
          name: values.name,
          email: values.email,
          message: `Bonjour ${values.name},\n\nMerci pour votre message sur nourx.dev. Nous avons bien reçu votre demande concernant "${values.subject}" et nous vous répondrons dans les 24 heures.\n\nCordialement,\nL'équipe Nourx`
        }),
      })

      if (!smsResponse.ok) {
        console.error('Erreur SMS:', await smsResponse.text())
        // Continue even if SMS fails
      }

      toast({
        title: 'Message envoyé avec succès !',
        description: 'Vous recevrez une confirmation par email et SMS.',
      })
      
      form.reset()
    } catch (error) {
      console.error('Erreur:', error)
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      details: ['Cocody Riviera Golf', 'Cité Riviera Beach', 'Abidjan, Côte d&apos;Ivoire'],
    },
    {
      icon: Phone,
      title: 'Téléphone',
      details: ['+225 07 20 11 11 08'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['contact@nourx.dev'],
    },
    {
      icon: Clock,
      title: 'Horaires',
      details: ['Lun - Ven: 8h - 18h', 'Sam: 9h - 13h'],
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Parlons de
              <span className="block text-nourx-gray-400">votre projet</span>
            </h1>
            <p className="text-lg md:text-xl text-nourx-gray-600 leading-relaxed">
              Une question, un projet, une idée ? Notre équipe est là pour vous accompagner et répondre à tous vos besoins.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-nourx-gray-50 p-8 md:p-12 rounded-lg">
              <h2 className="text-2xl font-semibold mb-8">Envoyez-nous un message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Jean Kouassi" 
                            {...field} 
                            className="bg-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="jean@entreprise.ci" 
                            {...field}
                            className="bg-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <PhoneInput 
                            value={field.value}
                            onChange={field.onChange}
                            className="bg-white"
                            defaultCountryCode="CI"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Objet</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Sélectionnez un sujet" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="new-project">Nouveau projet</SelectItem>
                            <SelectItem value="support">Support technique</SelectItem>
                            <SelectItem value="partnership">Partenariat</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Décrivez votre projet ou votre demande..."
                            className="min-h-[120px] bg-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      'Envoi en cours...'
                    ) : (
                      <>
                        Envoyer le message
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              <p className="text-sm text-nourx-gray-600 text-center mt-6">
                Nous répondons généralement en moins de 24 heures
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-semibold mb-8">Informations de contact</h2>
              
              <div className="space-y-8">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-nourx-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-nourx-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{info.title}</h3>
                      {info.details.map((detail, index) => (
                        <p key={index} className="text-nourx-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-20 px-4 bg-nourx-gray-50">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Des questions fréquentes ?
          </h2>
          <p className="text-lg text-nourx-gray-600 mb-8">
            Consultez notre FAQ pour trouver rapidement des réponses.
          </p>
          <Button variant="outline" asChild>
            <a href="/expertise#faq">Voir la FAQ</a>
          </Button>
        </div>
      </section>
    </main>
  )
}
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import type { Job } from '@/data/jobs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Upload, X, CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { normalizeCIV } from '@/lib/sms'

const MAX_FILE_SIZE = 8 * 1024 * 1024 // 8MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

const applicationSchema = z.object({
  fullName: z.string().min(2, 'Le nom complet doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z
    .string()
    .min(7, 'Numéro de téléphone requis')
    .refine(val => normalizeCIV(val) !== null, 'Numéro de téléphone ivoirien invalide (10 chiffres)'),
  education: z.string().min(1, 'Niveau d\'études requis'),
  experience: z.string().min(1, 'Années d\'expérience requises'),
  location: z.string().min(1, 'Localisation requise'),
  salaryExpectation: z
    .string()
    .min(1, 'La prétention salariale est requise')
    .regex(/^\d+$/, 'Veuillez entrer uniquement des chiffres')
    .refine(val => parseInt(val) >= 50000, 'Le montant minimum est 50 000 FCFA'),
  motivation: z.string().min(100, 'La lettre de motivation doit contenir au moins 100 caractères'),
  consent: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter le traitement de vos données personnelles'
  })
})

type ApplicationFormData = z.infer<typeof applicationSchema>

interface ApplicationFormProps {
  job: Job
}

export default function ApplicationForm({ job }: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [files, setFiles] = useState<{
    cv: File | null
    coverLetter: File | null
    other: File | null
  }>({
    cv: null,
    coverLetter: null,
    other: null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: 'onChange'
  })

  const totalSteps = 4
  const consent = watch('consent')

  const handleFileChange = (type: 'cv' | 'coverLetter' | 'other', file: File | null) => {
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: 'Fichier trop volumineux',
          description: 'La taille maximale est de 8 Mo',
          variant: 'destructive'
        })
        return
      }
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        toast({
          title: 'Type de fichier non accepté',
          description: 'Seuls les fichiers PDF, DOC et DOCX sont acceptés',
          variant: 'destructive'
        })
        return
      }
    }
    setFiles(prev => ({ ...prev, [type]: file }))
  }

  const nextStep = async () => {
    let fieldsToValidate: (keyof ApplicationFormData)[] = []
    
    switch(currentStep) {
      case 1:
        fieldsToValidate = ['fullName', 'email', 'phone']
        break
      case 2:
        fieldsToValidate = ['education', 'experience', 'location', 'salaryExpectation']
        break
      case 3:
        if (!files.cv) {
          toast({
            title: 'CV requis',
            description: 'Veuillez télécharger votre CV',
            variant: 'destructive'
          })
          return
        }
        break
      case 4:
        fieldsToValidate = ['motivation', 'consent']
        break
    }

    const isValid = await trigger(fieldsToValidate)
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const onSubmit = async (data: ApplicationFormData) => {
    if (!files.cv) {
      toast({
        title: 'CV requis',
        description: 'Veuillez télécharger votre CV',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('jobId', job.id)
      formData.append('jobTitle', job.title)
      formData.append('fullName', data.fullName)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('education', data.education)
      formData.append('experience', data.experience)
      formData.append('location', data.location)
      formData.append('salaryExpectation', data.salaryExpectation)
      formData.append('motivation', data.motivation)
      
      formData.append('cv', files.cv)
      if (files.coverLetter) formData.append('coverLetter', files.coverLetter)
      if (files.other) formData.append('other', files.other)

      const response = await fetch('/api/jobs/apply', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi de la candidature')
      }

      setIsSuccess(true)
      toast({
        title: 'Candidature envoyée !',
        description: 'Nous avons bien reçu votre candidature et vous contacterons bientôt.',
      })
    } catch (error) {
      console.error('Submission error:', error)
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-white border border-nourx-gray-200 rounded-2xl p-8 sm:p-12 text-center animate-scale-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-nourx-black mb-4">
          Candidature envoyée avec succès !
        </h2>
        <p className="text-nourx-gray-600 mb-8 max-w-md mx-auto">
          Nous avons bien reçu votre candidature pour le poste de <strong>{job.title}</strong>. 
          Vous recevrez un email de confirmation à l'adresse {watch('email')}.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.location.href = '/offres-emploi'}
            variant="outline"
          >
            Voir les autres offres
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
          >
            Retour à l'accueil
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Progress Bar */}
      <div className="bg-white border border-nourx-gray-200 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-nourx-gray-600">
            Étape {currentStep} sur {totalSteps}
          </span>
          <span className="text-sm text-nourx-gray-500">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full bg-nourx-gray-100 rounded-full h-2">
          <div
            className="bg-nourx-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white border border-nourx-gray-200 rounded-2xl p-6 sm:p-8">
        {/* Step 1 */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-xl font-bold text-nourx-black mb-2">
                Informations personnelles
              </h3>
              <p className="text-sm text-nourx-gray-600">
                Commençons par vos informations de contact
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Nom complet *</Label>
                <Input
                  id="fullName"
                  {...register('fullName')}
                  placeholder="Ex: Kouassi Jean-Pierre"
                  className={errors.fullName ? 'border-red-500' : ''}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="votre.email@exemple.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Téléphone *</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  placeholder="+225 0123456789"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                )}
                <p className="text-xs text-nourx-gray-500 mt-1">
                  Format ivoirien: 10 chiffres (avec ou sans +225)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-xl font-bold text-nourx-black mb-2">
                Détails de votre profil
              </h3>
              <p className="text-sm text-nourx-gray-600">
                Parlez-nous de votre parcours et votre disponibilité
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="education">Niveau d'études *</Label>
                <Select onValueChange={(value) => setValue('education', value)}>
                  <SelectTrigger className={errors.education ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Sélectionnez votre niveau" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    <SelectItem value="bac">Baccalauréat</SelectItem>
                    <SelectItem value="bac+2">Bac +2 (BTS, DUT)</SelectItem>
                    <SelectItem value="licence">Licence (Bac +3)</SelectItem>
                    <SelectItem value="master">Master (Bac +5)</SelectItem>
                    <SelectItem value="doctorat">Doctorat (Bac +8)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.education && (
                  <p className="text-sm text-red-500 mt-1">{errors.education.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="experience">Années d'expérience *</Label>
                <Select onValueChange={(value) => setValue('experience', value)}>
                  <SelectTrigger className={errors.experience ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Sélectionnez votre expérience" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    <SelectItem value="0-1">Moins d'1 an</SelectItem>
                    <SelectItem value="1-2">1 à 2 ans</SelectItem>
                    <SelectItem value="3-5">3 à 5 ans</SelectItem>
                    <SelectItem value="5-10">5 à 10 ans</SelectItem>
                    <SelectItem value="10+">Plus de 10 ans</SelectItem>
                  </SelectContent>
                </Select>
                {errors.experience && (
                  <p className="text-sm text-red-500 mt-1">{errors.experience.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="location">Localisation *</Label>
                <Select onValueChange={(value) => setValue('location', value)}>
                  <SelectTrigger className={errors.location ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Sélectionnez votre commune" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    <SelectItem value="cocody">Cocody</SelectItem>
                    <SelectItem value="plateau">Plateau</SelectItem>
                    <SelectItem value="marcory">Marcory</SelectItem>
                    <SelectItem value="treichville">Treichville</SelectItem>
                    <SelectItem value="yopougon">Yopougon</SelectItem>
                    <SelectItem value="abobo">Abobo</SelectItem>
                    <SelectItem value="adjame">Adjamé</SelectItem>
                    <SelectItem value="attecoube">Attécoubé</SelectItem>
                    <SelectItem value="koumassi">Koumassi</SelectItem>
                    <SelectItem value="port-bouet">Port-Bouët</SelectItem>
                    <SelectItem value="bingerville">Bingerville</SelectItem>
                    <SelectItem value="hors-abidjan">Hors Abidjan</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
                {errors.location && (
                  <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="salaryExpectation">Prétention salariale (FCFA) *</Label>
                <Input
                  id="salaryExpectation"
                  type="text"
                  {...register('salaryExpectation')}
                  placeholder="Ex: 500000"
                  className={errors.salaryExpectation ? 'border-red-500' : ''}
                />
                {errors.salaryExpectation && (
                  <p className="text-sm text-red-500 mt-1">{errors.salaryExpectation.message}</p>
                )}
                <p className="text-xs text-nourx-gray-500 mt-1">
                  Montant mensuel souhaité en FCFA (sans espaces ni virgules)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-xl font-bold text-nourx-black mb-2">
                Documents
              </h3>
              <p className="text-sm text-nourx-gray-600">
                Téléchargez vos documents (PDF, DOC ou DOCX, max 8 Mo)
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="cv">CV * (obligatoire)</Label>
                <div className="mt-2">
                  {!files.cv ? (
                    <label
                      htmlFor="cv"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-nourx-gray-300 rounded-lg cursor-pointer hover:border-nourx-blue hover:bg-nourx-gray-50 transition-colors"
                    >
                      <Upload className="w-8 h-8 text-nourx-gray-400 mb-2" />
                      <span className="text-sm text-nourx-gray-600">
                        Cliquez pour télécharger votre CV
                      </span>
                      <input
                        id="cv"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => handleFileChange('cv', e.target.files?.[0] || null)}
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between p-4 bg-nourx-gray-50 border border-nourx-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-nourx-blue/10 rounded flex items-center justify-center">
                          <Upload className="w-5 h-5 text-nourx-blue" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-nourx-black">{files.cv.name}</p>
                          <p className="text-xs text-nourx-gray-500">
                            {(files.cv.size / 1024 / 1024).toFixed(2)} Mo
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleFileChange('cv', null)}
                        className="text-nourx-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="coverLetter">Lettre de motivation (optionnel)</Label>
                <div className="mt-2">
                  {!files.coverLetter ? (
                    <label
                      htmlFor="coverLetter"
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-nourx-gray-300 rounded-lg cursor-pointer hover:border-nourx-blue hover:bg-nourx-gray-50 transition-colors"
                    >
                      <Upload className="w-6 h-6 text-nourx-gray-400 mb-1" />
                      <span className="text-xs text-nourx-gray-600">
                        Cliquez pour télécharger
                      </span>
                      <input
                        id="coverLetter"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => handleFileChange('coverLetter', e.target.files?.[0] || null)}
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-nourx-gray-50 border border-nourx-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-nourx-blue/10 rounded flex items-center justify-center">
                          <Upload className="w-4 h-4 text-nourx-blue" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-nourx-black">{files.coverLetter.name}</p>
                          <p className="text-xs text-nourx-gray-500">
                            {(files.coverLetter.size / 1024 / 1024).toFixed(2)} Mo
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleFileChange('coverLetter', null)}
                        className="text-nourx-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="other">Autre document (optionnel)</Label>
                <div className="mt-2">
                  {!files.other ? (
                    <label
                      htmlFor="other"
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-nourx-gray-300 rounded-lg cursor-pointer hover:border-nourx-blue hover:bg-nourx-gray-50 transition-colors"
                    >
                      <Upload className="w-6 h-6 text-nourx-gray-400 mb-1" />
                      <span className="text-xs text-nourx-gray-600">
                        Cliquez pour télécharger
                      </span>
                      <input
                        id="other"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => handleFileChange('other', e.target.files?.[0] || null)}
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-nourx-gray-50 border border-nourx-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-nourx-blue/10 rounded flex items-center justify-center">
                          <Upload className="w-4 h-4 text-nourx-blue" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-nourx-black">{files.other.name}</p>
                          <p className="text-xs text-nourx-gray-500">
                            {(files.other.size / 1024 / 1024).toFixed(2)} Mo
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleFileChange('other', null)}
                        className="text-nourx-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-xl font-bold text-nourx-black mb-2">
                Dernière étape
              </h3>
              <p className="text-sm text-nourx-gray-600">
                Parlez-nous de votre motivation pour ce poste
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="motivation">Lettre de motivation *</Label>
                <Textarea
                  id="motivation"
                  {...register('motivation')}
                  placeholder="Expliquez pourquoi vous êtes le candidat idéal pour ce poste..."
                  rows={8}
                  className={errors.motivation ? 'border-red-500' : ''}
                />
                {errors.motivation && (
                  <p className="text-sm text-red-500 mt-1">{errors.motivation.message}</p>
                )}
                <p className="text-xs text-nourx-gray-500 mt-1">
                  Minimum 100 caractères
                </p>
              </div>

              <div className="bg-nourx-gray-50 border border-nourx-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    {...register('consent')}
                    className="mt-1 h-4 w-4 rounded border-nourx-gray-300 text-nourx-blue focus:ring-nourx-blue"
                  />
                  <Label htmlFor="consent" className="text-sm font-normal cursor-pointer">
                    J&apos;accepte que mes données personnelles soient collectées et traitées par Nourx dans le cadre de ma candidature, conformément à la loi n° 2013-450 relative à la protection des données à caractère personnel en Côte d&apos;Ivoire. Je peux consulter la{' '}
                    <a
                      href="/politique-de-confidentialite"
                      target="_blank"
                      className="text-nourx-blue hover:underline"
                    >
                      politique de confidentialité
                    </a>
                    . *
                  </Label>
                </div>
                {errors.consent && (
                  <p className="text-sm text-red-500">{errors.consent.message}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1 || isSubmitting}
          className="w-full sm:w-auto"
        >
          Précédent
        </Button>

        {currentStep < totalSteps ? (
          <Button
            type="button"
            onClick={nextStep}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Suivant
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isSubmitting || !consent}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              'Envoyer ma candidature'
            )}
          </Button>
        )}
      </div>
    </form>
  )
}


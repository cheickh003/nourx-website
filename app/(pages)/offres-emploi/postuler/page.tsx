'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { jobs } from '@/data/jobs'
import ApplicationForm from '@/components/jobs/ApplicationForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

function ApplicationContent() {
  const searchParams = useSearchParams()
  const jobId = searchParams.get('job')
  const isSpontaneous = searchParams.get('spontanee') === 'true'
  
  // Create a spontaneous application job object
  const spontaneousJob = {
    id: 'spontanee',
    title: 'Candidature Spontanée',
    department: 'Tous départements',
    location: 'Abidjan, Côte d\'Ivoire',
    type: 'CDI' as const,
    description: 'Envoyez-nous votre candidature spontanée',
    requirements: [],
    responsibilities: [],
    benefits: [],
    salary: 'À définir',
    postedAt: new Date().toISOString().split('T')[0]
  }

  const job = isSpontaneous ? spontaneousJob : jobs.find(j => j.id === jobId)

  if (!job) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="container max-w-2xl text-center">
          <h1 className="heading-2 mb-4">Offre non trouvée</h1>
          <p className="text-body text-nourx-gray-600 mb-8">
            L&apos;offre d&apos;emploi que vous recherchez n&apos;existe pas ou n&apos;est plus disponible.
          </p>
          <Link href="/offres-emploi" className="btn-primary">
            Retour aux offres
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-nourx-gray-50 to-white">
        <div className="container max-w-4xl">
          <Link 
            href="/offres-emploi"
            className="inline-flex items-center gap-2 text-sm text-nourx-gray-600 hover:text-nourx-black mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux offres
          </Link>

          <div className="animate-fade-in">
            <h1 className="heading-2 mb-4">
              {isSpontaneous ? (
                <>Candidature <span className="text-nourx-blue">Spontanée</span></>
              ) : (
                <>Postuler pour <span className="text-nourx-blue">{job.title}</span></>
              )}
            </h1>
            <p className="text-body text-nourx-gray-600">
              {isSpontaneous 
                ? 'Vous ne trouvez pas d\'offre qui correspond à votre profil ? Envoyez-nous votre candidature spontanée. Nous sommes toujours à la recherche de talents.'
                : 'Remplissez le formulaire ci-dessous pour soumettre votre candidature. Tous les champs marqués d\'un astérisque (*) sont obligatoires.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-16 md:pb-24">
        <div className="container max-w-4xl">
          <ApplicationForm job={job} />
        </div>
      </section>
    </main>
  )
}

export default function PostulerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nourx-blue"></div>
      </div>
    }>
      <ApplicationContent />
    </Suspense>
  )
}


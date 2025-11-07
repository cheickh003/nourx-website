import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { jobs } from '@/data/jobs'
import { ArrowLeft, MapPin, Calendar, Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface PageProps {
  params: Promise<{
    jobId: string
  }>
}

export async function generateStaticParams() {
  return jobs.map((job) => ({
    jobId: job.id,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { jobId } = await params
  const job = jobs.find((j) => j.id === jobId)
  
  if (!job) {
    return {
      title: 'Offre non trouvée - Nourx',
    }
  }

  return {
    title: `${job.title} - Nourx Carrières`,
    description: job.description,
  }
}

export default async function JobDetailPage({ params }: PageProps) {
  const { jobId } = await params
  const job = jobs.find((j) => j.id === jobId)

  if (!job) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-nourx-gray-50 to-white">
        <div className="container max-w-5xl">
          <Link 
            href="/offres-emploi"
            className="inline-flex items-center gap-2 text-sm text-nourx-gray-600 hover:text-nourx-black mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Retour aux offres
          </Link>

          <div className="animate-fade-in">
            {/* Header */}
            <div className="mb-8">
              <h1 className="heading-2 mb-4">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-nourx-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Publié le {format(new Date(job.postedAt), 'dd MMMM yyyy', { locale: fr })}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="bg-nourx-gray-50 border border-nourx-gray-200 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-nourx-black mb-2">
                    Intéressé par ce poste ?
                  </h3>
                  <p className="text-sm text-nourx-gray-600">
                    Postulez maintenant et rejoignez l&apos;équipe Nourx
                  </p>
                </div>
                <Link
                  href={`/offres-emploi/postuler?job=${job.id}`}
                  className="btn-accent whitespace-nowrap flex items-center gap-2 group w-full sm:w-auto justify-center"
                >
                  Postuler maintenant
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-16 md:pb-24">
        <div className="container max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white border border-nourx-gray-200 rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-nourx-black mb-4">
                  À propos du poste
                </h2>
                <p className="text-nourx-gray-700 leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="bg-white border border-nourx-gray-200 rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-nourx-black mb-6">
                  Responsabilités
                </h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-nourx-blue flex-shrink-0 mt-0.5" />
                      <span className="text-nourx-gray-700">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-white border border-nourx-gray-200 rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-nourx-black mb-6">
                  Profil recherché
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-nourx-blue flex-shrink-0 mt-0.5" />
                      <span className="text-nourx-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nice to Have */}
              {job.niceToHave && job.niceToHave.length > 0 && (
                <div className="bg-nourx-gray-50 border border-nourx-gray-200 rounded-2xl p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-nourx-black mb-6">
                    Atouts supplémentaires
                  </h2>
                  <ul className="space-y-3">
                    {job.niceToHave.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-nourx-blue mt-1">+</span>
                        <span className="text-nourx-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <div className="bg-white border border-nourx-gray-200 rounded-2xl p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-nourx-black mb-6">
                    Avantages
                  </h2>
                  <ul className="space-y-3">
                    {job.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-nourx-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Apply Card */}
                <div className="bg-nourx-black text-white rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Prêt à postuler ?
                  </h3>
                  <p className="text-white/80 text-sm mb-6">
                    Rejoignez une équipe dynamique et participez à des projets innovants.
                  </p>
                  <Link
                    href={`/offres-emploi/postuler?job=${job.id}`}
                    className="block w-full text-center px-6 py-3 bg-white text-nourx-black rounded-lg font-medium hover:bg-nourx-gray-100 transition-colors"
                  >
                    Postuler
                  </Link>
                </div>

                {/* Job Info Card */}
                <div className="bg-white border border-nourx-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-nourx-black mb-4">
                    Informations
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-nourx-gray-500 mb-1">Type de contrat</div>
                      <div className="text-sm font-medium text-nourx-black">{job.type}</div>
                    </div>
                    <div>
                      <div className="text-xs text-nourx-gray-500 mb-1">Localisation</div>
                      <div className="text-sm font-medium text-nourx-black">{job.location}</div>
                    </div>
                    <div>
                      <div className="text-xs text-nourx-gray-500 mb-1">Département</div>
                      <div className="text-sm font-medium text-nourx-black">{job.department}</div>
                    </div>
                    <div>
                      <div className="text-xs text-nourx-gray-500 mb-1">Date de publication</div>
                      <div className="text-sm font-medium text-nourx-black">
                        {format(new Date(job.postedAt), 'dd MMMM yyyy', { locale: fr })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Share Card - Will be handled client-side if needed */}
                <div className="bg-nourx-gray-50 border border-nourx-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-nourx-black mb-3">
                    Partager cette offre
                  </h3>
                  <p className="text-xs text-nourx-gray-600 mb-4">
                    Vous connaissez quelqu&apos;un qui pourrait être intéressé ? Partagez ce lien :
                  </p>
                  <div className="text-xs text-nourx-gray-600 font-mono bg-white border border-nourx-gray-300 rounded-lg p-3 break-all">
                    nourx.dev/offres-emploi/{job.id}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Jobs */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-nourx-black mb-8">
              Autres offres disponibles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs
                .filter((j) => j.id !== job.id)
                .slice(0, 3)
                .map((otherJob) => (
                  <Link
                    key={otherJob.id}
                    href={`/offres-emploi/${otherJob.id}`}
                    className="group bg-white border border-nourx-gray-200 rounded-xl p-6 hover:border-nourx-blue/30 hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="text-lg font-bold text-nourx-black mb-2 group-hover:text-nourx-blue transition-colors">
                      {otherJob.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-nourx-gray-600 mb-4">
                      <MapPin className="w-3 h-3" />
                      <span>{otherJob.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-nourx-blue font-medium group-hover:gap-3 transition-all">
                      Voir les détails
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


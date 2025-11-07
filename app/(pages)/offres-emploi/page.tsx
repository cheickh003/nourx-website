import { Metadata } from 'next'
import Link from 'next/link'
import { jobs } from '@/data/jobs'
import { ArrowRight, MapPin, Calendar, Briefcase } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export const metadata: Metadata = {
  title: 'Offres d\'emploi - Nourx',
  description: 'Rejoignez l\'équipe Nourx et participez à des projets innovants en Côte d\'Ivoire.',
}

export default function OffresEmploiPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-nourx-gray-50 to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="heading-1 mb-6">
              Rejoignez notre équipe
            </h1>
            <p className="text-body text-nourx-gray-600">
              Participez à des projets innovants et développez votre carrière dans un environnement dynamique et stimulant à Abidjan.
            </p>
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="section-padding">
        <div className="container max-w-5xl">
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <article
                key={job.id}
                className="group bg-white border border-nourx-gray-200 rounded-2xl p-6 sm:p-8 hover:border-nourx-blue/30 hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-nourx-black mb-3 group-hover:text-nourx-blue transition-colors">
                      {job.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-nourx-gray-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Publié le {format(new Date(job.postedAt), 'dd MMMM yyyy', { locale: fr })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/offres-emploi/postuler?job=${job.id}`}
                    className="btn-accent whitespace-nowrap group/btn flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    Postuler
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>

                {/* Description */}
                <p className="text-nourx-gray-700 mb-6 leading-relaxed">
                  {job.description}
                </p>

                {/* Details Grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Responsibilities */}
                  <div>
                    <h3 className="font-semibold text-nourx-black mb-3">Responsabilités</h3>
                    <ul className="space-y-2 text-sm text-nourx-gray-700">
                      {job.responsibilities.slice(0, 3).map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-nourx-blue mt-1">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                      {job.responsibilities.length > 3 && (
                        <li className="text-nourx-gray-500 italic">
                          +{job.responsibilities.length - 3} autres...
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="font-semibold text-nourx-black mb-3">Profil recherché</h3>
                    <ul className="space-y-2 text-sm text-nourx-gray-700">
                      {job.requirements.slice(0, 3).map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-nourx-blue mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                      {job.requirements.length > 3 && (
                        <li className="text-nourx-gray-500 italic">
                          +{job.requirements.length - 3} autres...
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-6 border-t border-nourx-gray-200 flex items-center justify-end">
                  <Link
                    href={`/offres-emploi/${job.id}`}
                    className="text-sm font-medium text-nourx-blue hover:text-nourx-black transition-colors flex items-center gap-1 group/link"
                  >
                    Voir les détails
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-nourx-gray-50 rounded-2xl p-8 sm:p-12">
            <h3 className="text-2xl font-bold text-nourx-black mb-4">
              Vous ne trouvez pas le poste qui vous correspond ?
            </h3>
            <p className="text-nourx-gray-600 mb-6 max-w-2xl mx-auto">
              Envoyez-nous votre candidature spontanée. Nous sommes toujours à la recherche de talents pour rejoindre notre équipe.
            </p>
            <Link href="/offres-emploi/postuler?spontanee=true" className="btn-secondary">
              Candidature spontanée
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}


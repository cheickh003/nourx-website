import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="container max-w-2xl text-center px-6">
        <div className="mb-8">
          <div className="w-20 h-20 bg-nourx-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🔍</span>
          </div>
          <h1 className="heading-2 mb-4">Offre non trouvée</h1>
          <p className="text-body text-nourx-gray-600 mb-8">
            L&apos;offre d&apos;emploi que vous recherchez n&apos;existe pas ou n&apos;est plus disponible.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/offres-emploi"
            className="btn-primary flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux offres
          </Link>
          <Link href="/contact" className="btn-secondary">
            Nous contacter
          </Link>
        </div>
      </div>
    </main>
  )
}


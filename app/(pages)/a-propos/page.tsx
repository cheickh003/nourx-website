import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowRight } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      number: '01',
      title: 'Innovation',
      description: 'Nous anticipons les tendances technologiques pour offrir des solutions avant-gardistes.'
    },
    {
      number: '02',
      title: 'Excellence',
      description: 'Chaque projet est une opportunité de dépasser les attentes et créer de la valeur.'
    },
    {
      number: '03',
      title: 'Transparence',
      description: 'Une communication claire et honnête est la base de toute collaboration réussie.'
    },
    {
      number: '04',
      title: 'Agilité',
      description: 'Nous nous adaptons rapidement aux changements pour garantir votre succès.'
    }
  ]

  const team = [
    {
      name: 'Amadou Diallo',
      role: 'CEO & Fondateur',
      image: '/team/amadou.jpg',
      initials: 'AD'
    },
    {
      name: 'Fatou Koné',
      role: 'CTO',
      image: '/team/fatou.jpg',
      initials: 'FK'
    },
    {
      name: 'Ibrahim Touré',
      role: 'Lead Developer',
      image: '/team/ibrahim.jpg',
      initials: 'IT'
    },
    {
      name: 'Mariam Bamba',
      role: 'Head of Design',
      image: '/team/mariam.jpg',
      initials: 'MB'
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Nous transformons vos idées en
              <span className="block text-nourx-gray-400">réalité digitale</span>
            </h1>
            <p className="text-lg md:text-xl text-nourx-gray-600 leading-relaxed">
              Depuis 2019, Nourx accompagne les entreprises ivoiriennes dans leur transformation numérique avec passion, expertise et innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-nourx-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <p className="text-4xl md:text-5xl font-bold">150+</p>
              <p className="text-nourx-gray-600 mt-2">Projets réalisés</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">50+</p>
              <p className="text-nourx-gray-600 mt-2">Clients satisfaits</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">5</p>
              <p className="text-nourx-gray-600 mt-2">Années d'expertise</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">24/7</p>
              <p className="text-nourx-gray-600 mt-2">Support disponible</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre Mission</h2>
              <p className="text-lg text-nourx-gray-600 leading-relaxed mb-6">
                Démocratiser l&apos;accès aux technologies de pointe pour permettre à chaque entreprise ivoirienne de prospérer dans l&apos;économie numérique mondiale.
              </p>
              <p className="text-lg text-nourx-gray-600 leading-relaxed">
                Nous croyons que la transformation digitale n'est pas réservée aux grandes entreprises. Notre approche sur mesure et notre expertise locale nous permettent d'accompagner des organisations de toutes tailles.
              </p>
            </div>
            <div className="relative h-96 bg-nourx-gray-100 rounded-lg overflow-hidden">
              {/* Placeholder pour image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-nourx-gray-400">Image Mission</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-nourx-gray-50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Nos Valeurs</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.number} className="bg-white p-8 rounded-lg">
                <div className="flex items-start gap-6">
                  <span className="text-5xl font-bold text-nourx-gray-200">{value.number}</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-nourx-gray-600">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre Équipe</h2>
            <p className="text-lg text-nourx-gray-600">
              Une équipe passionnée d'experts dédiés à votre succès numérique.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback className="text-2xl bg-nourx-gray-100">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-nourx-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-nourx-black text-white">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à rejoindre l'aventure ?
          </h2>
          <p className="text-lg mb-8 text-nourx-gray-300">
            Discutons de votre projet et voyons comment nous pouvons vous aider.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-white text-nourx-black px-8 py-4 rounded-lg hover:bg-nourx-gray-100 transition-colors font-medium"
          >
            Contactez-nous
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </main>
  )
}
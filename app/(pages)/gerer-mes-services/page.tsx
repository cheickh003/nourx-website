import { Metadata } from 'next'
import Link from 'next/link'
import { CreditCard, User, Settings, Globe, ExternalLink, Cloud, Server, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Gérer mes services | Nourx',
  description: 'Accédez à tous vos services Nourx : paiements, hébergement, cloud AWS, Vercel, IvoirEdu et bien plus.',
}

const services = [
  {
    title: 'Effectuer un paiement',
    description: 'Payez vos factures et services en ligne de manière sécurisée',
    icon: CreditCard,
    href: '/payment',
    isExternal: false,
    color: 'bg-green-50 border-green-200 hover:bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    title: 'Mon compte client',
    description: 'Accédez à votre espace client pour gérer vos services et commandes',
    icon: User,
    href: 'https://app.nourx.dev',
    isExternal: true,
    color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    title: 'cPanel - Hébergement',
    description: 'Gérez votre hébergement web et vos fichiers via cPanel',
    icon: Settings,
    href: 'https://cpanel.server-nourx.com',
    isExternal: true,
    color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    title: 'WordPress Admin',
    description: 'Administrez votre site WordPress en toute simplicité',
    icon: Globe,
    href: 'https://wordpress.nourx.dev',
    isExternal: true,
    color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    title: 'Gérer mon hébergement Vercel',
    description: 'Administrez vos déploiements et projets sur la plateforme Vercel',
    icon: Cloud,
    href: 'https://vercel.nourx.dev',
    isExternal: true,
    color: 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100',
    iconColor: 'text-cyan-600',
  },
  {
    title: 'Gérer mon infrastructure AWS',
    description: 'Contrôlez vos ressources cloud AWS : EC2, S3, Lambda et bien plus',
    icon: Server,
    href: 'https://aws.nourx.dev',
    isExternal: true,
    color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
    iconColor: 'text-yellow-600',
  },
  {
    title: 'Accéder à IvoirEdu',
    description: 'Votre plateforme de gestion scolaire complète - Élèves, enseignants, notes, emplois du temps',
    icon: GraduationCap,
    href: 'https://ivoiredu.com',
    isExternal: true,
    color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
]

export default function GererMesServicesPage() {
  return (
    <div className="min-h-screen bg-background pt-24 sm:pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Gérer mes services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Accédez rapidement à tous vos services Nourx. Choisissez l'option qui correspond à vos besoins.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {services.map((service) => {
            const IconComponent = service.icon
            
            if (service.isExternal) {
              return (
                <a
                  key={service.title}
                  href={service.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`border-2 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg group bg-card border-border`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-card rounded-lg shadow-sm border border-border`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </a>
              )
            }

            return (
              <Link
                key={service.title}
                href={service.href}
                className={`border-2 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg block bg-card border-border`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-card rounded-lg shadow-sm border border-border`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </Link>
            )
          })}
        </div>

        {/* Help Section */}
        <div className="bg-card rounded-xl p-8 border border-border text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Besoin d'aide ?
          </h2>
          <p className="text-muted-foreground mb-6">
            Notre équipe est là pour vous accompagner dans la gestion de vos services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all duration-300"
            >
              Nous contacter
            </Link>
            <a
              href="https://wa.me/2250799997722"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-input text-foreground rounded-full font-medium hover:bg-accent transition-all duration-300"
            >
              Support WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  services: [
    { name: 'Développement Web', href: '#' },
    { name: 'Applications Mobiles', href: '#' },
    { name: 'Intelligence Artificielle', href: '#' },
    { name: 'DevOps & Cloud', href: '#' },
  ],
  company: [
    { name: 'À propos', href: '#about' },
    { name: 'Réalisations', href: '#realisations' },
    { name: 'Blog', href: '#' },
    { name: 'Carrières', href: '#' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Politique de confidentialité', href: '/politique-de-confidentialite' },
    { name: 'Politique des cookies', href: '/politique-cookies' },
    { name: 'CGV', href: '/cgv' },
  ],
}

const socialLinks = [
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-nourx-gray-100 border-t border-nourx-gray-200">
      <div className="container py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-3">
              <Image
                src="/logo-nourx.png"
                alt="Nourx"
                width={100}
                height={30}
                className="h-6 sm:h-8 w-auto"
              />
            </Link>
            <p className="text-body text-xs sm:text-sm mb-3">
              Entreprise de Services du Numérique basée à Abidjan, Côte d&apos;Ivoire. 
              Votre partenaire pour la transformation digitale de A à Z.
            </p>
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="font-medium">Cocody Riviera Golf Cité Riviera Beach, Abidjan</p>
              <p>
                <a href="tel:+2250720111108" className="hover:text-nourx-blue transition-colors">
                  +225 07 20 11 11 08
                </a>
              </p>
              <p>
                <a href="mailto:contact@nourx.dev" className="hover:text-nourx-blue transition-colors">
                  contact@nourx.dev
                </a>
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-2 sm:mb-4 text-sm sm:text-base">Services</h3>
            <ul className="space-y-1 sm:space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs sm:text-sm text-nourx-gray-600 hover:text-nourx-black transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-2 sm:mb-4 text-sm sm:text-base">Entreprise</h3>
            <ul className="space-y-1 sm:space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs sm:text-sm text-nourx-gray-600 hover:text-nourx-black transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-semibold mb-2 sm:mb-4 text-sm sm:text-base">Légal</h3>
            <ul className="space-y-1 sm:space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs sm:text-sm text-nourx-gray-600 hover:text-nourx-black transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-nourx-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-nourx-gray-600">
              © {new Date().getFullYear()} Nourx. Tous droits réservés.
            </p>
            
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-nourx-gray-600 hover:text-nourx-black transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

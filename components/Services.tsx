'use client'

const services = [
  {
    title: 'Conseil & Stratégie digitale',
    description: 'Audit de maturité numérique, roadmaps et conduite du changement',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'group-hover:bg-nourx-blue',
  },
  {
    title: 'Développement Web',
    description: 'Sites vitrines, e-commerce, PWA avec Next.js, Laravel, WordPress',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    color: 'group-hover:bg-emerald-500',
  },
  {
    title: 'Applications mobiles',
    description: 'Apps natives et hybrides avec Swift, Kotlin, Flutter, React Native',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: 'group-hover:bg-purple-500',
  },
  {
    title: 'ERP & CRM',
    description: 'Implémentation Odoo, HubSpot, migrations et formation',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    color: 'group-hover:bg-orange-500',
  },
  {
    title: 'Intelligence Artificielle',
    description: 'Chatbots WhatsApp, RAG, automatisation, fine-tuning GPT-4o',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'group-hover:bg-indigo-500',
  },
  {
    title: 'DevOps & Cloud',
    description: 'CI/CD, Docker, Kubernetes, multi-cloud AWS, OVH, Scaleway',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    color: 'group-hover:bg-cyan-500',
  },
  {
    title: 'Marketing digital',
    description: 'SEO, SEA, inbound marketing, automation et reporting data-driven',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: 'group-hover:bg-pink-500',
  },
  {
    title: 'Infogérance 24/7',
    description: 'Maintenance, mises à jour sécurité, monitoring et SLA',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'group-hover:bg-red-500',
  },
  {
    title: 'Formation',
    description: 'Parcours sur-mesure ERP, no-code, IA, DevOps avec ateliers pratiques',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: 'group-hover:bg-green-500',
  },
]

export default function Services() {

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 px-4 bg-white">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:heading-2 mb-3 sm:mb-4">Nos Services</h2>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Une expertise complète pour accompagner votre transformation digitale de A à Z
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative p-4 sm:p-6 bg-white border border-nourx-gray-200 rounded-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent ${service.color} opacity-0 group-hover:opacity-5 rounded-lg transition-opacity" />
              
              <div className="relative z-10">
                <div className={`inline-flex p-2 sm:p-3 rounded-lg bg-nourx-gray-100 text-nourx-black mb-3 sm:mb-4 transition-all duration-300 ${service.color} group-hover:text-white`}>
                  {service.icon}
                </div>
                
                <h3 className="heading-3 text-base sm:text-xl mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-body text-xs sm:text-sm">{service.description}</p>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-nourx-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#contact" className="btn-accent">
            Discuter de votre projet
          </a>
        </div>
      </div>
    </section>
  )
}
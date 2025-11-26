export interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  companyLogo?: string
  content: string
  rating: number
  sector: string
  image?: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Amadou K.',
    position: 'Directeur digital',
    company: 'E-commerce',
    content:
      "Nourx a transformé notre approche e-commerce. Leur expertise technique et leur compréhension du marché local nous ont permis de doubler nos ventes en ligne en six mois. C'est un partenaire de confiance pour notre transformation digitale.",
    rating: 5,
    sector: 'Retail',
  },
  {
    id: '2',
    name: 'Fatou D.',
    position: 'CTO',
    company: 'Secteur bancaire',
    content:
      "L'application mobile développée par Nourx a révolutionné notre relation client. Leur maîtrise de la sécurité et leur réactivité 24/7 nous ont convaincus. Nos utilisateurs adorent la nouvelle expérience.",
    rating: 5,
    sector: 'Finance',
  },
  {
    id: '3',
    name: 'Jean-Marc Y.',
    position: 'Responsable innovation',
    company: 'Télécommunications',
    content:
      "Le chatbot IA a considérablement amélioré notre service client. Nourx l'a intégré à nos systèmes existants sans friction et nous avons réduit de 40 % le temps de traitement des demandes.",
    rating: 5,
    sector: 'Télécom',
  },
  {
    id: '4',
    name: 'Marie K.',
    position: 'Directrice des opérations',
    company: 'Industrie',
    content:
      "L'ERP sur mesure livré par Nourx a aligné tous nos processus. De la production à la comptabilité, tout est désormais centralisé et fiable. Le gain de productivité est tangible dès le premier mois.",
    rating: 5,
    sector: 'Industrie',
  },
  {
    id: '5',
    name: 'Dr. Kouadio N.',
    position: 'Responsable académique',
    company: 'Enseignement supérieur',
    content:
      "La plateforme e-learning a garanti la continuité pédagogique pour plusieurs milliers d'étudiants. Nourx a su répondre à nos exigences avec une solution robuste et évolutive.",
    rating: 5,
    sector: 'Éducation',
  },
  {
    id: '6',
    name: 'Sylvie B.',
    position: 'Directrice marketing',
    company: 'Services digitaux',
    content:
      "Les dashboards analytics livrés par Nourx nous donnent une vision temps réel de nos KPIs. Leur expertise en data visualisation rend l'outil indispensable aux équipes.",
    rating: 5,
    sector: 'Services',
  },
]


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
    position: 'Directeur Digital',
    company: 'E-commerce',
    content: 'Nourx a transformé notre approche e-commerce. Leur expertise technique et leur compréhension du marché local ont permis de doubler nos ventes en ligne en 6 mois. Un partenaire de confiance pour notre transformation digitale.',
    rating: 5,
    sector: 'Retail',
  },
  {
    id: '2',
    name: 'Fatou D.',
    position: 'CTO',
    company: 'Secteur Bancaire',
    content: 'L\'application mobile développée par Nourx a révolutionné notre relation client. Leur maîtrise de la sécurité et leur réactivité 24/7 nous ont convaincus. Nos clients adorent la nouvelle expérience.',
    rating: 5,
    sector: 'Finance',
  },
  {
    id: '3',
    name: 'Jean-Marc Y.',
    position: 'Responsable Innovation',
    company: 'Télécommunications',
    content: 'Le chatbot IA a considérablement amélioré notre service client. Nourx a su intégrer parfaitement l\'IA à nos systèmes existants. Réduction de 40% du temps de traitement des demandes.',
    rating: 5,
    sector: 'Télécom',
  },
  {
    id: '4',
    name: 'Marie K.',
    position: 'Directrice des Opérations',
    company: 'Industrie',
    content: 'L\'ERP sur mesure développé par Nourx a optimisé tous nos processus. De la production à la comptabilité, tout est maintenant centralisé et efficace. Un gain de productivité remarquable.',
    rating: 5,
    sector: 'Industrie',
  },
  {
    id: '5',
    name: 'Dr. Kouadio N.',
    position: 'Responsable Académique',
    company: 'Enseignement Supérieur',
    content: 'La plateforme e-learning a permis d\'assurer la continuité pédagogique pour plusieurs milliers d\'étudiants. Nourx a su répondre à nos exigences avec une solution robuste et évolutive.',
    rating: 5,
    sector: 'Éducation',
  },
  {
    id: '6',
    name: 'Sylvie B.',
    position: 'Directrice Marketing',
    company: 'Services Digitaux',
    content: 'Les dashboards analytics développés nous donnent une vision temps réel de nos KPIs. L\'équipe Nourx a fait preuve d\'une grande expertise en data visualization. Un outil devenu indispensable.',
    rating: 5,
    sector: 'Services',
  },
]

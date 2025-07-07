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
    name: 'Amadou Koné',
    position: 'Directeur Digital',
    company: 'PROSUMA',
    content: 'Nourx a transformé notre approche e-commerce. Leur expertise technique et leur compréhension du marché local ont permis de doubler nos ventes en ligne en 6 mois. Un partenaire de confiance pour notre transformation digitale.',
    rating: 5,
    sector: 'Retail',
  },
  {
    id: '2',
    name: 'Fatou Diallo',
    position: 'CTO',
    company: 'Banque Atlantique',
    content: 'L\'application mobile développée par Nourx a révolutionné notre relation client. Leur maîtrise de la sécurité bancaire et leur réactivité 24/7 nous ont convaincus. Nos clients adorent la nouvelle expérience.',
    rating: 5,
    sector: 'Finance',
  },
  {
    id: '3',
    name: 'Jean-Marc Yao',
    position: 'Responsable Innovation',
    company: 'MTN CI',
    content: 'Le chatbot IA a considérablement amélioré notre service client. Nourx a su intégrer parfaitement l\'IA à nos systèmes existants. Réduction de 40% du temps de traitement des demandes.',
    rating: 5,
    sector: 'Télécom',
  },
  {
    id: '4',
    name: 'Marie Kouassi',
    position: 'DRH',
    company: 'SIVOP',
    content: 'L\'ERP sur mesure développé par Nourx a optimisé tous nos processus. De la production à la comptabilité, tout est maintenant centralisé et efficace. Un gain de productivité remarquable.',
    rating: 5,
    sector: 'Industrie',
  },
  {
    id: '5',
    name: 'Dr. Kouadio N\'Guessan',
    position: 'Vice-Recteur',
    company: 'Université FHB',
    content: 'La plateforme e-learning a permis d\'assurer la continuité pédagogique pour nos 15 000 étudiants. Nourx a su répondre à nos exigences académiques avec une solution robuste et évolutive.',
    rating: 5,
    sector: 'Éducation',
  },
  {
    id: '6',
    name: 'Sylvie Bamba',
    position: 'Directrice Marketing',
    company: 'Orange CI',
    content: 'Les dashboards analytics développés nous donnent une vision temps réel de nos KPIs. L\'équipe Nourx a fait preuve d\'une grande expertise en data visualization. Un outil devenu indispensable.',
    rating: 5,
    sector: 'Télécom',
  },
]
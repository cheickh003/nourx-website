export interface Project {
  id: string
  title: string
  client: string
  sector: string
  description: string
  technologies: string[]
  metrics: {
    label: string
    value: string
  }[]
  image: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Plateforme E-commerce B2B',
    client: 'PROSUMA',
    sector: 'Retail',
    description: 'Refonte complète de la plateforme e-commerce avec intégration ERP et système de gestion multi-entrepôts.',
    technologies: ['Next.js', 'Laravel', 'PostgreSQL', 'Redis', 'Docker'],
    metrics: [
      { label: 'Performance', value: '+150%' },
      { label: 'Conversion', value: '+45%' },
      { label: 'Uptime', value: '99.9%' },
    ],
    image: '/projects/ecommerce.jpg',
    featured: true,
  },
  {
    id: '2',
    title: 'Application Mobile Banking',
    client: 'Banque Atlantique',
    sector: 'Finance',
    description: 'Application mobile native pour les services bancaires avec authentification biométrique et paiements instantanés.',
    technologies: ['Flutter', 'Node.js', 'MongoDB', 'AWS', 'Stripe'],
    metrics: [
      { label: 'Utilisateurs', value: '50K+' },
      { label: 'Transactions/jour', value: '10K+' },
      { label: 'Note App Store', value: '4.8★' },
    ],
    image: '/projects/banking.jpg',
    featured: true,
  },
  {
    id: '3',
    title: 'Chatbot IA WhatsApp',
    client: 'MTN CI',
    sector: 'Télécom',
    description: 'Assistant virtuel intelligent pour le service client avec traitement du langage naturel et intégration CRM.',
    technologies: ['Python', 'OpenAI', 'WhatsApp API', 'Redis', 'PostgreSQL'],
    metrics: [
      { label: 'Requêtes/jour', value: '5K+' },
      { label: 'Satisfaction', value: '92%' },
      { label: 'Temps réponse', value: '<2s' },
    ],
    image: '/projects/chatbot.jpg',
    featured: true,
  },
  {
    id: '4',
    title: 'ERP Sur Mesure',
    client: 'SIVOP',
    sector: 'Industrie',
    description: 'Solution ERP complète avec modules de production, stock, RH et comptabilité adaptés au secteur industriel.',
    technologies: ['Odoo', 'Python', 'PostgreSQL', 'Docker', 'Nginx'],
    metrics: [
      { label: 'Modules', value: '12' },
      { label: 'Utilisateurs', value: '200+' },
      { label: 'Processus optimisés', value: '35' },
    ],
    image: '/projects/erp.jpg',
    featured: false,
  },
  {
    id: '5',
    title: 'Plateforme E-learning',
    client: 'Université FHB',
    sector: 'Éducation',
    description: 'LMS moderne avec cours en ligne, examens sécurisés et suivi pédagogique en temps réel.',
    technologies: ['Next.js', 'Laravel', 'WebRTC', 'S3', 'CloudFront'],
    metrics: [
      { label: 'Étudiants', value: '15K+' },
      { label: 'Cours', value: '500+' },
      { label: 'Satisfaction', value: '95%' },
    ],
    image: '/projects/elearning.jpg',
    featured: false,
  },
  {
    id: '6',
    title: 'Dashboard Analytics',
    client: 'Orange CI',
    sector: 'Télécom',
    description: 'Tableau de bord temps réel pour le monitoring réseau et l\'analyse des performances.',
    technologies: ['React', 'D3.js', 'Node.js', 'InfluxDB', 'Grafana'],
    metrics: [
      { label: 'Data points/jour', value: '1M+' },
      { label: 'Dashboards', value: '25' },
      { label: 'Latence', value: '<100ms' },
    ],
    image: '/projects/dashboard.jpg',
    featured: false,
  },
]

export const sectors = [
  'Tous',
  'Retail',
  'Finance',
  'Télécom',
  'Industrie',
  'Éducation',
]
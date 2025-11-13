export interface ServiceProcessStep {
  title: string
  description: string
}

export interface ServiceStat {
  label: string
  value: string
}

export interface ServiceCTA {
  label: string
  href: string
  description: string
}

export interface ServiceTestimonial {
  quote: string
  author: string
  role: string
}

export interface ServiceDetail {
  id: string
  number: string
  slug: string
  title: string
  shortDescription: string
  details: string
  longDescription: string
  outcomes: string[]
  benefits: string[]
  process: ServiceProcessStep[]
  technologies: string[]
  stats: ServiceStat[]
  testimonial: ServiceTestimonial
  cta: ServiceCTA
}

export const services: ServiceDetail[] = [
  {
    id: 'website',
    number: '01',
    slug: 'developpement-web',
    title: 'Développement Web',
    shortDescription: 'Sites et applications web performants taillés pour vos objectifs business.',
    details: 'React, Next.js, Laravel, WordPress',
    longDescription:
      "Nous concevons des expériences web rapides, accessibles et optimisées SEO pour soutenir votre croissance. Notre équipe combine design system, architecture moderne et observabilité continue pour lancer des produits évolutifs.",
    outcomes: [
      'Time-to-market accéléré grâce à des composants réutilisables',
      'Performances Lighthouse supérieures à 90 sur desktop et mobile',
      'Instrumentation analytics ready-to-use pour piloter vos KPIs',
    ],
    benefits: [
      'UX centrée utilisateur validée par des tests réguliers',
      'Stack moderne (Next.js 15, Edge functions) pour réduire les coûts d’infrastructure',
      'CI/CD et revues de code systématiques pour fiabiliser chaque release',
    ],
    process: [
      {
        title: 'Audit & cadrage',
        description: 'Cartographie de vos parcours, workshop de priorisation et définition des objectifs mesurables.',
      },
      {
        title: 'Design system',
        description: 'Création ou extension de votre bibliothèque UI pour garder une identité forte et cohérente.',
      },
      {
        title: 'Build & QA',
        description: 'Sprints courts, tests automatisés, revues croisées et déploiement progressif.',
      },
      {
        title: 'Run & optimisation',
        description: 'Monitoring, A/B tests et roadmap d’amélioration continue pilotée par vos métriques.',
      },
    ],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Laravel', 'Node.js', 'Vercel', 'Playwright'],
    stats: [
      { label: 'Temps de chargement moyen', value: '< 1,2s' },
      { label: 'Disponibilité', value: '99,95 %' },
      { label: 'Conversions observées', value: '+38 %' },
    ],
    testimonial: {
      quote:
        "L’équipe Nourx a livré un produit web irréprochable et surtout maintenable. Chaque décision était argumentée avec des données, ce qui nous a permis d’embarquer facilement les parties prenantes.",
      author: 'L. N’guessan',
      role: 'Responsable digital',
    },
    cta: {
      label: 'Discuter de votre plateforme',
      href: '/contact',
      description: 'Présentez-nous votre contexte et repartez avec une proposition technique sous 72h.',
    },
  },
  {
    id: 'mobile',
    number: '02',
    slug: 'applications-mobiles',
    title: 'Applications Mobiles',
    shortDescription: 'Apps natives ou cross-platform pour offrir une expérience fluide sur iOS et Android.',
    details: 'Flutter, Swift, Kotlin, React Native',
    longDescription:
      "Nous construisons des applications mobiles centrées sur la performance et l’offline-first. Des POC aux app stores, nous gérons design, développement, QA et accompagnement pour vos équipes support.",
    outcomes: [
      'Architecture multi-environnements prête pour la scalabilité',
      'Observabilité mobile (crashlytics, analytics) intégrée dès la V1',
      'Process de déploiement et publication documenté pour vos équipes',
    ],
    benefits: [
      'Design responsive adapté aux usages locaux (faible connectivité, devices variés)',
      'Synchronisation sécurisée des données et chiffrement des stockages locaux',
      'Mécanismes de feature flags pour activer de nouvelles fonctionnalités sans republier',
    ],
    process: [
      {
        title: 'Product discovery',
        description: 'Personas, parcours mobiles et priorisation des fonctionnalités critiques.',
      },
      {
        title: 'Architecture & prototypage',
        description: 'Choix de la stack (natif ou hybride) et prototypage interactif validé par les utilisateurs.',
      },
      {
        title: 'Delivery itératif',
        description: 'Build, QA automatisée sur device farm et beta-testing via TestFlight / Play Console.',
      },
      {
        title: 'Lancement & support',
        description: 'Publication, monitoring temps réel et support fonctionnel 24/7.',
      },
    ],
    technologies: ['Flutter', 'Swift', 'Kotlin', 'React Native', 'Firebase', 'GraphQL', 'Fastlane'],
    stats: [
      { label: 'Crash-free users', value: '99,3 %' },
      { label: 'Note moyenne store', value: '4,7 / 5' },
      { label: 'Cycle de release', value: '2 semaines' },
    ],
    testimonial: {
      quote:
        "Le parcours mobile est devenu notre principal canal d’acquisition. Les performances et la stabilité sont au rendez-vous depuis le premier jour.",
      author: 'S. Traoré',
      role: 'Product manager',
    },
    cta: {
      label: 'Planifier un design sprint',
      href: '/contact',
      description: 'Explorons votre backlog mobile et priorisons les fonctionnalités clés.',
    },
  },
  {
    id: 'erp-crm',
    number: '03',
    slug: 'erp-crm',
    title: 'ERP & CRM sur mesure',
    shortDescription: 'Pilotez vos opérations avec des outils métiers personnalisés.',
    details: 'Odoo, Salesforce, Solutions sur mesure',
    longDescription:
      "Nous intégrons ou développons des ERP/CRM adaptés à vos processus pour aligner ventes, opérations et finance. L’objectif : fiabiliser la donnée, automatiser les tâches répétitives et offrir une vision 360° de votre activité.",
    outcomes: [
      'Données consolidées et accessibles en temps réel',
      'Workflows automatisés réduisant la charge opérationnelle',
      'Reporting multi-sociétés prêt pour vos comités de direction',
    ],
    benefits: [
      'Ateliers métier pour comprendre vos spécificités locales',
      'Connecteurs avec vos SI existants (compta, logistique, SSO)',
      'Plan de conduite du changement et formation des équipes',
    ],
    process: [
      { title: 'Diagnostic', description: 'Cartographie des processus et identification des quick wins.' },
      { title: 'Conception fonctionnelle', description: 'User stories, règles métiers et design des workflows.' },
      { title: 'Personnalisation & intégration', description: 'Développement, connecteurs API et reprises de données.' },
      { title: 'Déploiement & adoption', description: 'Tests utilisateurs, formation et support renforcé post go-live.' },
    ],
    technologies: ['Odoo', 'Salesforce', 'Supabase', 'PostgreSQL', 'Power BI', 'Make', 'Azure AD'],
    stats: [
      { label: 'Processus automatisés', value: '+45 %' },
      { label: 'Fiabilité des données', value: '99 %' },
      { label: 'Temps de validation', value: '-60 %' },
    ],
    testimonial: {
      quote:
        "Nous avons enfin un pilotage fiable de bout en bout. Les équipes terrain disposent des bonnes informations au bon moment.",
      author: 'H. Kouassi',
      role: 'Directrice opérations',
    },
    cta: {
      label: 'Cartographier vos processus',
      href: '/contact',
      description: 'Profitez d’un atelier de 90 minutes pour identifier les automatisations prioritaires.',
    },
  },
  {
    id: 'ai',
    number: '04',
    slug: 'intelligence-artificielle',
    title: 'Intelligence Artificielle',
    shortDescription: 'Automatisez vos processus avec des modèles IA entraînés sur vos données.',
    details: 'Machine Learning, NLP, Computer Vision',
    longDescription:
      "Nos experts IA conçoivent des solutions responsables pour accélérer vos opérations : scoring, assistants virtuels, vision par ordinateur. Nous partons de la donnée disponible pour livrer une valeur mesurable rapidement.",
    outcomes: [
      'Automatisation de tâches manuelles répétitives',
      'Réduction des temps de réponse et amélioration de la précision',
      'Mise en place de garde-fous pour conserver la maîtrise humaine',
    ],
    benefits: [
      'Audit des jeux de données et gouvernance associée',
      'Modèles sur-mesure optimisés pour les contextes ouest-africains',
      'Monitoring continu pour détecter la dérive des modèles',
    ],
    process: [
      { title: 'Exploration data', description: 'Inventaire des sources, nettoyage et faisabilité technique.' },
      { title: 'Prototypage', description: 'POC ciblé pour valider l’intérêt métier et la précision obtenue.' },
      { title: 'Industrialisation', description: 'Pipeline MLOps, API sécurisée et intégration à votre SI.' },
      { title: 'Pilotage', description: 'Tableau de bord, alertes et roadmap d’amélioration continue.' },
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'LangChain', 'OpenAI', 'Hugging Face', 'Vertex AI'],
    stats: [
      { label: 'Temps de traitement', value: '-70 %' },
      { label: 'Précision moyenne', value: '93 %' },
      { label: 'Étapes automatisées', value: 'jusqu’à 15' },
    ],
    testimonial: {
      quote:
        "Le copilote IA mis en place répond à nos équipes en langage naturel et fournit des recommandations fiables. Le gain de temps quotidien est incontestable.",
      author: 'N. Amani',
      role: 'Responsable innovation',
    },
    cta: {
      label: 'Tester un POC IA',
      href: '/contact',
      description: 'Identifions un cas d’usage prioritaire et lançons un prototype en quatre semaines.',
    },
  },
  {
    id: 'devops',
    number: '05',
    slug: 'devops-cloud',
    title: 'DevOps & Cloud',
    shortDescription: 'Automatisez vos déploiements et sécurisez vos infrastructures cloud.',
    details: 'AWS, Docker, Kubernetes, CI/CD',
    longDescription:
      "Notre équipe DevOps met en place des pipelines, de l’observabilité et des environnements reproductibles pour vos applications. Objectif : livrer plus vite, avec moins de risques et un contrôle des coûts cloud.",
    outcomes: [
      'Provisioning infra en quelques minutes',
      'Déploiements blue/green ou canary prêts à l’emploi',
      'Alerting temps réel et temps de rétablissement réduit',
    ],
    benefits: [
      'Infrastructure as Code (Terraform, CDK) versionnée',
      'Politique de sécurité et sauvegardes automatisées',
      'Optimisation des coûts cloud avec rapports mensuels',
    ],
    process: [
      { title: 'Assessment', description: 'Analyse de votre stack actuelle, dette technique et besoins de scalabilité.' },
      { title: 'Blueprint', description: 'Design cible : environnements, pipelines CI/CD, observabilité.' },
      { title: 'Mise en œuvre', description: 'Automatisation IaC, migration progressive et documentation.' },
      { title: 'Run partagé', description: 'Support SRE, optimisation et transfert de compétences.' },
    ],
    technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Datadog'],
    stats: [
      { label: 'Temps de déploiement', value: '-80 %' },
      { label: 'Incidents critiques', value: '-60 %' },
      { label: 'Couverture infra as code', value: '100 %' },
    ],
    testimonial: {
      quote:
        "Nous sommes passés de releases trimestrielles à des mises en production quotidiennes sans compromettre la sécurité.",
      author: 'B. Koné',
      role: 'Head of Engineering',
    },
    cta: {
      label: 'Moderniser votre pipeline',
      href: '/contact',
      description: 'Recevez un rapport d’audit DevOps détaillé avec plan d’action priorisé.',
    },
  },
  {
    id: 'marketing',
    number: '06',
    slug: 'marketing-digital',
    title: 'Marketing Digital',
    shortDescription: 'Des stratégies data-driven pour gagner en visibilité et en conversion.',
    details: 'SEO, SEM, Social Media, Analytics',
    longDescription:
      "Nous orchestrons vos campagnes payantes, SEO et social media pour générer du trafic qualifié. Les tableaux de bord temps réel vous aident à piloter vos investissements et à prouver le ROI.",
    outcomes: [
      'Positionnements SEO durables sur vos requêtes cœur de métier',
      'Campagnes multicanal optimisées en continu',
      'Reporting unifié pour vos équipes marketing et direction',
    ],
    benefits: [
      'Stratégie éditoriale alignée sur vos personas',
      'Automatisations marketing (nurturing, scoring) sur mesure',
      'Analyse des parcours pour identifier les fuites de conversion',
    ],
    process: [
      { title: 'Diagnostic marketing', description: 'Audit SEO/SEA, analyse concurrentielle et benchmark sectoriel.' },
      { title: 'Roadmap contenus & médias', description: 'Calendrier éditorial, assets et budget média.' },
      { title: 'Activation & optimisation', description: 'Campagnes orchestrées avec AB tests continus.' },
      { title: 'Reporting & learnings', description: 'Dashboards partagés, recommandations d’amélioration.' },
    ],
    technologies: ['GA4', 'Looker Studio', 'HubSpot', 'Meta Ads', 'Google Ads', 'Ahrefs', 'Segment'],
    stats: [
      { label: 'Trafic organique', value: '+120 %' },
      { label: 'CPL moyen', value: '-35 %' },
      { label: 'Engagement social', value: 'x3' },
    ],
    testimonial: {
      quote:
        "Nos contenus et campagnes sont enfin pilotés par la donnée. Chaque sprint marketing livre des enseignements actionnables.",
      author: 'E. Ayité',
      role: 'Responsable acquisition',
    },
    cta: {
      label: 'Lancer un sprint growth',
      href: '/contact',
      description: 'Nous analysons vos canaux actuels et proposons un plan d’optimisation sur 90 jours.',
    },
  },
  {
    id: 'support',
    number: '07',
    slug: 'support-24-7',
    title: 'Support & Maintenance 24/7',
    shortDescription: 'Gardez vos plateformes stables grâce à un support proactif.',
    details: 'Monitoring, updates, bug fixes',
    longDescription:
      "Nos équipes assurent la supervision, la maintenance applicative et la réponse aux incidents 24/7. Nous anticipons les risques grâce à des runbooks clairs et une communication transparente.",
    outcomes: [
      'Plan de continuité documenté et testé',
      'Supervision applicative et infrastructure consolidée',
      'Feedback loop entre support et produit pour prioriser les évolutions',
    ],
    benefits: [
      'Centre de services bilingue fr/en joignable par mail, portail et téléphone',
      'SLA différenciés selon la criticité de vos applications',
      'Post-mortems systématiques pour capitaliser sur chaque incident',
    ],
    process: [
      { title: 'Onboarding', description: 'Reprise de la documentation, mise en place des accès et KPI de support.' },
      { title: 'Monitoring', description: 'Mise sous surveillance avec alerting multi-canaux et rapports réguliers.' },
      { title: 'Support & maintenance', description: 'Traitement des demandes, correctifs et mises à jour planifiées.' },
      { title: 'Amélioration continue', description: 'Comités trimestriels pour ajuster SLA et roadmap run.' },
    ],
    technologies: ['Grafana', 'Sentry', 'PagerDuty', 'Statuspage', 'Notion', 'Linear'],
    stats: [
      { label: 'Incidents résolus dans le SLA', value: '97 %' },
      { label: 'Temps moyen de rétablissement', value: '23 min' },
      { label: 'Tickets automatisés', value: '40 %' },
    ],
    testimonial: {
      quote:
        "Le support est devenu un avantage compétitif : nous communiquons vite, et les correctifs arrivent sans perturber nos utilisateurs.",
      author: 'M. Diabaté',
      role: 'Service delivery manager',
    },
    cta: {
      label: 'Sécuriser vos opérations',
      href: '/contact',
      description: 'Construisons un plan de support adapté à vos SLA et à vos pics d’activité.',
    },
  },
  {
    id: 'training',
    number: '08',
    slug: 'formation',
    title: 'Programmes de Formation',
    shortDescription: 'Workshops, bootcamps et mentoring pour faire monter vos équipes en compétence.',
    details: 'Workshops, Bootcamps, Mentoring',
    longDescription:
      "Nous concevons des formations opérationnelles sur vos outils ou vos processus. Formats courts, bootcamps intensifs ou coaching individuel : l’objectif est de rendre vos équipes autonomes rapidement.",
    outcomes: [
      'Parcours personnalisés par rôle (tech, produit, business)',
      'Supports et replays disponibles pour capitaliser',
      'Évaluations avant/après pour mesurer l’impact',
    ],
    benefits: [
      'Intervenants seniors avec retours d’expérience terrain',
      'Sessions hybrides (présentiel + distanciel) adaptées à vos contraintes',
      'Accès à une communauté privée et mentoring post-formation',
    ],
    process: [
      { title: 'Diagnostic compétences', description: 'Entretiens et quizz pour comprendre les attentes et niveaux.' },
      { title: 'Design pédagogique', description: 'Plan de cours, activités pratiques et projets capstone.' },
      { title: 'Animation', description: 'Sessions interactives, coaching et feedback en direct.' },
      { title: 'Capitalisation', description: 'Evaluation, certificats internes et plan de suivi individuel.' },
    ],
    technologies: ['Miro', 'Notion', 'Zoom', 'Figma', 'GitHub Classroom'],
    stats: [
      { label: 'Satisfaction stagiaires', value: '4,8 / 5' },
      { label: 'Participants accompagnés', value: '200+' },
      { label: 'Compétences validées', value: '12 parcours' },
    ],
    testimonial: {
      quote:
        "Les ateliers sont pragmatiques, orientés cas réels. Les équipes appliquent immédiatement ce qu’elles apprennent sur leurs projets.",
      author: 'F. Koulibaly',
      role: 'Directrice talent',
    },
    cta: {
      label: 'Construire un parcours sur mesure',
      href: '/contact',
      description: 'Définissons ensemble le programme idéal pour vos équipes produit, tech ou business.',
    },
  },
  {
    id: 'advisory',
    number: '09',
    slug: 'conseil-digital',
    title: 'Conseil & Stratégie Digitale',
    shortDescription: 'Du diagnostic à la roadmap, clarifiez votre trajectoire numérique.',
    details: 'Audit, Stratégie, Roadmap',
    longDescription:
      "Nous accompagnons vos directions métier et IT pour définir la vision digitale, prioriser les chantiers et aligner les équipes. Études de faisabilité, business case, gouvernance : nous jouons le rôle de sparring partner.",
    outcomes: [
      'Roadmap priorisée avec ROI et dépendances',
      'Organisation cible et gouvernance projet clarifiées',
      'Accélération de la prise de décision grâce à des recommandations concrètes',
    ],
    benefits: [
      'Benchmarks sectoriels et retours d’expérience régionaux',
      'Approche orientée valeur plutôt que catalogue technologique',
      'Coaching des équipes internes pour sécuriser l’exécution',
    ],
    process: [
      { title: 'Immersion', description: 'Interviews, analyse documentaire et observation des parcours terrain.' },
      { title: 'Diagnostic', description: 'Identification des irritants, des opportunités et des quick wins.' },
      { title: 'Vision & business case', description: 'Scénarios, budget indicatif et ROI estimé.' },
      { title: 'Roadmap & gouvernance', description: 'Plan d’exécution par vague, KPIs et rituels de pilotage.' },
    ],
    technologies: ['Notion', 'FigJam', 'PowerPoint', 'Looker Studio'],
    stats: [
      { label: 'Projets priorisés', value: '15+' },
      { label: 'Alignement parties prenantes', value: '100 %' },
      { label: 'Décisions accélérées', value: 'x2' },
    ],
    testimonial: {
      quote:
        "Les ateliers ont permis d’aligner la direction générale et les métiers très rapidement. Nous avons un cap clair et mesurable.",
      author: 'G. Kouamé',
      role: 'Directeur stratégie',
    },
    cta: {
      label: 'Planifier un diagnostic',
      href: '/contact',
      description: 'Organisons une session d’immersion pour co-construire votre trajectoire digitale.',
    },
  },
]

export function getAllServices() {
  return services
}

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug)
}


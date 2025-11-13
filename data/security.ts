import type { LucideIcon } from "lucide-react"
import {
  CheckCircle2,
  Shield,
  ShieldCheck,
  ShieldHalf,
  ShieldQuestion,
} from "lucide-react"

export interface SecurityPrinciple {
  title: string
  description: string
  icon: LucideIcon
}

export interface SecurityMeasure {
  category: string
  items: string[]
}

export interface ComplianceItem {
  title: string
  description: string
}

export const securityPrinciples: SecurityPrinciple[] = [
  {
    title: "Confidentialité renforcée",
    description: "Contrôles d’accès granulaires, MFA, chiffrement des secrets et audits réguliers.",
    icon: Shield,
  },
  {
    title: "Intégrité de la donnée",
    description: "Journalisation inviolable, revues de code, tests automatisés et validations humaines.",
    icon: ShieldCheck,
  },
  {
    title: "Disponibilité continue",
    description: "Observabilité 24/7, plans de reprise d’activité et politiques de sauvegarde éprouvées.",
    icon: ShieldHalf,
  },
]

export const securityMeasures: SecurityMeasure[] = [
  {
    category: "Gouvernance & accès",
    items: [
      "Gestion des identités centralisée (SSO, RBAC)",
      "Revue trimestrielle des droits et rotation automatique des secrets",
      "Procédures d’onboarding/offboarding documentées",
    ],
  },
  {
    category: "Protection des données",
    items: [
      "Chiffrement au repos (AES‑256) et en transit (TLS 1.3)",
      "Segmentation réseau et environnements isolés (dev, staging, prod)",
      "Politique de rétention et anonymisation sur les environnements de test",
    ],
  },
  {
    category: "Détection & réponse",
    items: [
      "Monitoring applicatif et infra temps réel (logs centralisés, alertes SLA)",
      "Runbooks incidents avec astreinte 24/7",
      "Post-mortems systématiques et feed-back vers les équipes produit",
    ],
  },
  {
    category: "Conformité & audits",
    items: [
      "Veille réglementaire (RGPD, SNDI, ANSUT)",
      "Tests d’intrusion annuels confiés à un partenaire tiers",
      "Sensibilisation sécurité continue : phishing drills, modules e-learning",
    ],
  },
]

export const complianceItems: ComplianceItem[] = [
  {
    title: "Protection des données personnelles",
    description: "Traitements alignés sur le RGPD, déclarations CNIL/ARTCI si applicables et Data Protection Officer identifié.",
  },
  {
    title: "Souveraineté & localisation",
    description: "Hébergement privilégiant la zone eu-west-3 (Paris) ou des partenaires certifiés en Afrique de l’Ouest.",
  },
  {
    title: "Traçabilité & auditabilité",
    description: "Logs signés, conservation 12 mois minimum et accès restreint aux auditeurs habilités.",
  },
  {
    title: "Plan de continuité",
    description: "Tests réguliers de PRA/PCA, documentation partagée avec nos clients critiques.",
  },
]

export const securityProcess = [
  {
    title: "Évaluer",
    description: "Audit initial, analyse de risque, cartographie du SI et priorisation des contrôles.",
  },
  {
    title: "Protéger",
    description: "Déploiement des mesures techniques et organisationnelles adaptées à chaque projet.",
  },
  {
    title: "Détecter",
    description: "Observabilité fine, détection d’anomalies et alertes multi-canal pour réagir immédiatement.",
  },
  {
    title: "Répondre",
    description: "Runbooks incidents, communication transparente et amélioration continue.",
  },
]

export const securityCTA = {
  title: "Besoin d’un audit ou d’une revue sécurité ?",
  description:
    "Nos experts accompagnent vos équipes pour cartographier les risques, prioriser les actions et documenter les plans de réponse.",
  primary: { label: "Planifier une revue sécurité", href: "/contact" },
  secondary: { label: "Voir nos engagements", href: "/services/conseil-digital" },
}


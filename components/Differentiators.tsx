'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { 
  Zap, 
  Brain, 
  MapPin, 
  CreditCard,
  Rocket
} from 'lucide-react'
import { FeatureCard } from '@/components/ui/grid-feature-cards'

const features = [
  {
    title: 'Approche Full-Stack',
    icon: Zap,
    description: 'Couverture complète du cycle de vie projet sans sous-traitance. De la stratégie à l\'exploitation, une équipe unique pour tous vos besoins.',
  },
  {
    title: 'Culture DevOps',
    icon: Rocket,
    description: 'Automatisation maximale et réduction des délais de mise en production. Déploiements continus et monitoring 24/7.',
  },
  {
    title: 'Innovation Pragmatique',
    icon: Brain,
    description: 'Usage raisonné de l\'IA avec POCs rapides. Solutions innovantes adaptées à votre contexte et votre budget.',
  },
  {
    title: 'Proximité Locale',
    icon: MapPin,
    description: 'Disponibilité sur site avec connaissance approfondie du contexte UEMOA/OHADA. Équipe basée à Abidjan.',
  },
  {
    title: 'Transparence Budgétaire',
    icon: CreditCard,
    description: 'Modèles tarifaires clairs (TJM ou forfait). Pas de coûts cachés, reporting détaillé des prestations.',
  },
]

type ViewAnimationProps = {
  delay?: number;
  className?: React.ComponentProps<typeof motion.div>['className'];
  children: React.ReactNode;
}

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Differentiators() {
  return (
    <section className="py-16 md:py-32 bg-nourx-gray-50">
      <div className="mx-auto w-full max-w-5xl space-y-8 px-4">
        <AnimatedContainer className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl xl:font-extrabold text-nourx-black">
            Ce qui nous différencie
          </h2>
          <p className="mt-4 text-sm tracking-wide text-balance md:text-base text-nourx-gray-600">
            Une approche unique qui combine expertise technique, proximité locale et engagement qualité
          </p>
        </AnimatedContainer>

        <AnimatedContainer
          delay={0.4}
          className="grid grid-cols-1 divide-x divide-y divide-dashed sm:grid-cols-2 md:grid-cols-3"
        >
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </AnimatedContainer>
      </div>
    </section>
  )
}
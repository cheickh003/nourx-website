'use client'

import React, { useEffect, useRef, ReactNode } from 'react';
import { 
  CheckCircle, 
  Globe, 
  Smartphone, 
  Database, 
  Brain, 
  Cloud, 
  TrendingUp, 
  Clock, 
  BookOpen 
} from 'lucide-react';

interface BentoItemProps {
  className?: string;
  children: ReactNode;
}

interface ServiceItem {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
}

// Reusable BentoItem component
const BentoItem: React.FC<BentoItemProps> = ({ className = '', children }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      item.style.setProperty('--mouse-x', `${x}px`);
      item.style.setProperty('--mouse-y', `${y}px`);
    };

    item.addEventListener('mousemove', handleMouseMove);

    return () => {
      item.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={itemRef} className={`bento-item ${className}`}>
      {children}
    </div>
  );
};

// Services data adapted for Nourx
const services: ServiceItem[] = [
  {
    title: 'Conseil & Stratégie digitale',
    description: 'Audit de maturité numérique, roadmaps et conduite du changement pour accélérer votre transformation.',
    icon: <CheckCircle className="w-6 h-6" />,
    color: 'hover:from-blue-500/20 hover:to-nourx-blue/20',
  },
  {
    title: 'Développement Web',
    description: 'Sites vitrines, e-commerce, PWA avec Next.js, Laravel, WordPress',
    icon: <Globe className="w-6 h-6" />,
    color: 'hover:from-emerald-500/20 hover:to-emerald-600/20',
  },
  {
    title: 'Applications mobiles',
    description: 'Apps natives et hybrides avec Swift, Kotlin, Flutter, React Native',
    icon: <Smartphone className="w-6 h-6" />,
    color: 'hover:from-purple-500/20 hover:to-purple-600/20',
  },
  {
    title: 'ERP & CRM',
    description: 'Implémentation Odoo, HubSpot, migrations et formation',
    icon: <Database className="w-6 h-6" />,
    color: 'hover:from-orange-500/20 hover:to-orange-600/20',
  },
  {
    title: 'Intelligence Artificielle',
    description: 'Chatbots WhatsApp, RAG, automatisation, fine-tuning GPT-4o pour optimiser vos processus métier.',
    icon: <Brain className="w-6 h-6" />,
    color: 'hover:from-indigo-500/20 hover:to-indigo-600/20',
  },
  {
    title: 'DevOps & Cloud',
    description: 'CI/CD, Docker, Kubernetes, multi-cloud AWS, OVH, Scaleway pour une infrastructure robuste et scalable.',
    icon: <Cloud className="w-6 h-6" />,
    color: 'hover:from-cyan-500/20 hover:to-cyan-600/20',
  },
  {
    title: 'Marketing digital',
    description: 'SEO, SEA, inbound marketing, automation et reporting data-driven',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'hover:from-pink-500/20 hover:to-pink-600/20',
  },
  {
    title: 'Infogérance 24/7',
    description: 'Maintenance, mises à jour sécurité, monitoring et SLA garantis',
    icon: <Clock className="w-6 h-6" />,
    color: 'hover:from-red-500/20 hover:to-red-600/20',
  },
  {
    title: 'Formation',
    description: 'Parcours sur-mesure ERP, no-code, IA, DevOps avec ateliers pratiques',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'hover:from-green-500/20 hover:to-green-600/20',
  },
];

// Main Component
export const CyberneticBentoGrid: React.FC = () => {
  return (
    <div className="main-container">
      <div className="w-full max-w-6xl z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:heading-2 mb-3 sm:mb-4 text-nourx-black">Nos Services</h2>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 text-nourx-gray-600">
            Une expertise complète pour accompagner votre transformation digitale de A à Z
          </p>
        </div>
        
        <div className="bento-grid">
          {/* Large item - Strategy & Consulting */}
          <BentoItem className="lg:col-span-2 lg:row-span-2 flex flex-col justify-between">
            <div>
              <div className="inline-flex p-3 rounded-lg bg-nourx-blue/10 text-nourx-blue mb-4">
                {services[0].icon}
              </div>
              <h3 className="text-xl font-bold text-nourx-black mb-3">{services[0].title}</h3>
              <p className="text-nourx-gray-600 text-sm leading-relaxed">{services[0].description}</p>
            </div>
            <div className="mt-6 h-32 bg-gradient-to-br from-nourx-blue/5 to-nourx-blue/10 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-nourx-blue mb-1">80+</div>
                <div className="text-xs text-nourx-gray-500">Projets livrés</div>
              </div>
            </div>
          </BentoItem>

          {/* Web Development */}
          <BentoItem>
            <div className="inline-flex p-3 rounded-lg bg-emerald-500/10 text-emerald-600 mb-4">
              {services[1].icon}
            </div>
            <h3 className="text-lg font-bold text-nourx-black mb-2">{services[1].title}</h3>
            <p className="text-nourx-gray-600 text-sm">{services[1].description}</p>
          </BentoItem>

          {/* Mobile Apps */}
          <BentoItem>
            <div className="inline-flex p-3 rounded-lg bg-purple-500/10 text-purple-600 mb-4">
              {services[2].icon}
            </div>
            <h3 className="text-lg font-bold text-nourx-black mb-2">{services[2].title}</h3>
            <p className="text-nourx-gray-600 text-sm">{services[2].description}</p>
          </BentoItem>

          {/* AI - Tall item */}
          <BentoItem className="lg:row-span-2">
            <div className="inline-flex p-3 rounded-lg bg-indigo-500/10 text-indigo-600 mb-4">
              {services[4].icon}
            </div>
            <h3 className="text-lg font-bold text-nourx-black mb-3">{services[4].title}</h3>
            <p className="text-nourx-gray-600 text-sm leading-relaxed mb-4">{services[4].description}</p>
            <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
              <div className="text-xs text-indigo-600 font-medium">Nouveauté</div>
              <div className="text-xs text-nourx-gray-600 mt-1">GPT-4o fine-tuning</div>
            </div>
          </BentoItem>

          {/* DevOps - Wide item */}
          <BentoItem className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="inline-flex p-3 rounded-lg bg-cyan-500/10 text-cyan-600 mb-4">
                  {services[5].icon}
                </div>
                <h3 className="text-lg font-bold text-nourx-black mb-2">{services[5].title}</h3>
                <p className="text-nourx-gray-600 text-sm">{services[5].description}</p>
              </div>
              <div className="ml-4 text-right">
                <div className="text-lg font-bold text-cyan-600">24/7</div>
                <div className="text-xs text-nourx-gray-500">Monitoring</div>
              </div>
            </div>
          </BentoItem>

          {/* ERP & CRM */}
          <BentoItem>
            <div className="inline-flex p-3 rounded-lg bg-orange-500/10 text-orange-600 mb-4">
              {services[3].icon}
            </div>
            <h3 className="text-lg font-bold text-nourx-black mb-2">{services[3].title}</h3>
            <p className="text-nourx-gray-600 text-sm">{services[3].description}</p>
          </BentoItem>

          {/* Digital Marketing */}
          <BentoItem>
            <div className="inline-flex p-3 rounded-lg bg-pink-500/10 text-pink-600 mb-4">
              {services[6].icon}
            </div>
            <h3 className="text-lg font-bold text-nourx-black mb-2">{services[6].title}</h3>
            <p className="text-nourx-gray-600 text-sm">{services[6].description}</p>
          </BentoItem>

          {/* 24/7 Support */}
          <BentoItem>
            <div className="inline-flex p-3 rounded-lg bg-red-500/10 text-red-600 mb-4">
              {services[7].icon}
            </div>
            <h3 className="text-lg font-bold text-nourx-black mb-2">{services[7].title}</h3>
            <p className="text-nourx-gray-600 text-sm">{services[7].description}</p>
          </BentoItem>

          {/* Training */}
          <BentoItem>
            <div className="inline-flex p-3 rounded-lg bg-green-500/10 text-green-600 mb-4">
              {services[8].icon}
            </div>
            <h3 className="text-lg font-bold text-nourx-black mb-2">{services[8].title}</h3>
            <p className="text-nourx-gray-600 text-sm">{services[8].description}</p>
          </BentoItem>
        </div>
      </div>
    </div>
  );
};
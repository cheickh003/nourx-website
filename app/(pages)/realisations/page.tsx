'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowRight, ExternalLink } from 'lucide-react'

interface Project {
  id: number
  title: string
  client: string
  category: string
  year: string
  description: string
  image: string
  tags: string[]
  link?: string
}

export default function RealisationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [imageLoading, setImageLoading] = useState<{ [key: number]: boolean }>({})

  const projects: Project[] = [
    {
      id: 1,
      title: 'Plateforme E-commerce',
      client: 'Fashion Store CI',
      category: 'web',
      year: '2024',
      description: 'Solution e-commerce complète avec gestion des stocks, paiements mobiles et livraison intégrée.',
      image: '/projects/ecommerce.jpg',
      tags: ['Next.js', 'Stripe', 'PostgreSQL'],
      link: 'https://fashionstore.ci'
    },
    {
      id: 2,
      title: 'Application Mobile Banking',
      client: 'Banque Digitale',
      category: 'mobile',
      year: '2024',
      description: 'Application bancaire sécurisée avec authentification biométrique et transferts instantanés.',
      image: '/projects/banking.jpg',
      tags: ['Flutter', 'Firebase', 'Security']
    },
    {
      id: 3,
      title: 'ERP Gestion Hospitalière',
      client: 'Clinique Moderne',
      category: 'erp',
      year: '2023',
      description: 'Système de gestion hospitalière intégré pour patients, rendez-vous et facturation.',
      image: '/projects/hospital.jpg',
      tags: ['Laravel', 'Vue.js', 'MySQL']
    },
    {
      id: 4,
      title: 'Plateforme IA Agricole',
      client: 'AgriTech Solutions',
      category: 'ai',
      year: '2023',
      description: 'Intelligence artificielle pour prédiction des rendements et optimisation des cultures.',
      image: '/projects/agritech.jpg',
      tags: ['Python', 'TensorFlow', 'IoT']
    },
    {
      id: 5,
      title: 'Dashboard Analytics',
      client: 'DataViz Corp',
      category: 'web',
      year: '2023',
      description: 'Tableau de bord temps réel pour visualisation et analyse de données complexes.',
      image: '/projects/dashboard.jpg',
      tags: ['React', 'D3.js', 'Node.js']
    },
    {
      id: 6,
      title: 'App Livraison Express',
      client: 'QuickDeliver',
      category: 'mobile',
      year: '2023',
      description: 'Application de livraison avec tracking GPS en temps réel et paiement intégré.',
      image: '/projects/delivery.jpg',
      tags: ['React Native', 'Maps API', 'Redis']
    }
  ]

  const categories = [
    { value: 'all', label: 'Tous les projets' },
    { value: 'web', label: 'Web' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'erp', label: 'ERP/CRM' },
    { value: 'ai', label: 'Intelligence Artificielle' }
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Nos réalisations
              <span className="block text-nourx-gray-400">parlent d'elles-mêmes</span>
            </h1>
            <p className="text-lg md:text-xl text-nourx-gray-600 leading-relaxed">
              Découvrez une sélection de projets qui illustrent notre expertise et notre capacité à transformer des idées en solutions digitales performantes.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="pb-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filtrer par catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-[4/3] bg-nourx-gray-100 rounded-lg overflow-hidden mb-3 sm:mb-4">
                  {imageLoading[project.id] !== false && (
                    <Skeleton className="absolute inset-0" />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10" />
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    onLoadingComplete={() => 
                      setImageLoading(prev => ({ ...prev, [project.id]: false }))
                    }
                    onError={() => 
                      setImageLoading(prev => ({ ...prev, [project.id]: false }))
                    }
                  />
                </div>
                
                <div>
                  <h3 className="text-base sm:text-xl font-semibold mb-1 group-hover:text-nourx-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-nourx-gray-600 mb-2 sm:mb-3">
                    {project.client} • {project.year}
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {selectedProject.client} • {selectedProject.year}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                <div className="relative aspect-video bg-nourx-gray-100 rounded-lg overflow-hidden mb-6">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <p className="text-nourx-gray-600 mb-6">
                  {selectedProject.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-nourx-blue hover:underline"
                  >
                    Voir le projet en ligne
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-nourx-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">150+</p>
              <p className="text-nourx-gray-600">Projets livrés</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">50+</p>
              <p className="text-nourx-gray-600">Clients satisfaits</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">98%</p>
              <p className="text-nourx-gray-600">Taux de satisfaction</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">5</p>
              <p className="text-nourx-gray-600">Industries couvertes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Votre projet sera le prochain
          </h2>
          <p className="text-lg text-nourx-gray-600 mb-8">
            Rejoignez nos clients satisfaits et donnons vie à votre vision.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-nourx-black text-white px-8 py-4 rounded-lg hover:bg-nourx-gray-900 transition-colors font-medium"
          >
            Démarrer un projet
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </main>
  )
}
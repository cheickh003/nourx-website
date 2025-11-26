'use client'

import { useState } from 'react'
import { techLogos } from '@/data/techLogos'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ArrowRight } from 'lucide-react'

export default function ExpertisePage() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  // Technologies principales à afficher
  const featuredTechs = [
    'React', 'Next.js', 'TypeScript', 'Laravel', 'Python', 'Flutter',
    'Docker', 'AWS', 'PostgreSQL', 'MongoDB', 'OpenAI', 'TensorFlow',
    'Node.js', 'Tailwind CSS', 'Git', 'GraphQL', 'Redis', 'Kubernetes'
  ]

  const selectedTechs = techLogos.filter(tech => featuredTechs.includes(tech.name))

  const faq = [
    {
      question: 'Comment choisissez-vous les technologies pour un projet ?',
      answer: 'Nous analysons les besoins spécifiques, la scalabilité requise, le budget et les compétences de votre équipe pour recommander la stack technologique optimale.'
    },
    {
      question: 'Proposez-vous de la migration technologique ?',
      answer: 'Oui, nous accompagnons la modernisation de vos applications existantes avec une approche progressive minimisant les risques.'
    },
    {
      question: 'Assurez-vous la formation sur les technologies utilisées ?',
      answer: 'Absolument. Chaque projet inclut une phase de transfert de compétences pour garantir l\'autonomie de vos équipes.'
    },
    {
      question: 'Comment restez-vous à jour avec les nouvelles technologies ?',
      answer: 'Notre équipe consacre 20% de son temps à la veille technologique, aux formations et aux projets R&D.'
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Expertise technique
              <span className="block text-nourx-gray-400">de pointe</span>
            </h1>
            <p className="text-lg md:text-xl text-nourx-gray-600 leading-relaxed">
              Nous maîtrisons les technologies les plus avancées pour créer des solutions performantes, scalables et pérennes.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            Stack Technologique
          </h2>
          
          <TooltipProvider>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
              {selectedTechs.map((tech) => (
                <Tooltip key={tech.name}>
                  <TooltipTrigger asChild>
                    <div
                      className="bg-nourx-gray-50 rounded-lg p-6 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer"
                      onMouseEnter={() => setHoveredTech(tech.name)}
                      onMouseLeave={() => setHoveredTech(null)}
                    >
                      <div 
                        className="w-12 h-12 mx-auto text-nourx-gray-600"
                        dangerouslySetInnerHTML={{ __html: tech.svg || '' }}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tech.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>

          <p className="text-center text-nourx-gray-600 mt-12">
            + Vue.js, Angular, PHP, MySQL, Swift, Kotlin, et bien d'autres...
          </p>
        </div>
      </section>

      {/* Expertise Levels */}
      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">30+</p>
              <p className="text-nourx-gray-600">Technologies maîtrisées</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">150+</p>
              <p className="text-nourx-gray-600">Projets déployés</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">99.9%</p>
              <p className="text-nourx-gray-600">Uptime garanti</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-4 bg-nourx-gray-50">
        <div className="container max-w-4xl mx-auto">
          <blockquote className="text-center">
            <p className="text-2xl md:text-3xl font-light mb-8">
              "L'expertise technique de Nourx a été déterminante dans la réussite de notre transformation digitale. Leur maîtrise des technologies modernes nous a permis de créer une plateforme robuste et évolutive."
            </p>
            <footer>
              <p className="font-semibold">Jean-Marc Kouassi</p>
              <p className="text-nourx-gray-600">CTO, FinTech Côte d'Ivoire</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            Questions Fréquentes
          </h2>
          
          <Accordion type="single" collapsible>
            {faq.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-nourx-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-nourx-black text-white">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Besoin d'une expertise technique ?
          </h2>
          <p className="text-lg mb-8 text-nourx-gray-300">
            Parlons de votre projet et trouvons la meilleure solution technologique.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-white text-nourx-black px-8 py-4 rounded-lg hover:bg-nourx-gray-100 transition-colors font-medium"
          >
            Discuter avec un expert
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </main>
  )
}
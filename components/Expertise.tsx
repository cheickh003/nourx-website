'use client'

import { useState } from 'react'
import Link from 'next/link'

const techStack = [
  { name: 'React/Next.js', category: 'Frontend' },
  { name: 'Laravel/PHP', category: 'Backend' },
  { name: 'Flutter', category: 'Mobile' },
  { name: 'Python/Django', category: 'Backend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Swift/Kotlin', category: 'Mobile' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'AWS/GCP', category: 'Cloud' },
  { name: 'Docker/K8s', category: 'DevOps' },
  { name: 'OpenAI/GPT', category: 'IA' },
  { name: 'TensorFlow', category: 'IA' },
]

export default function Expertise() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(techStack.map(tech => tech.category)))
  
  const filteredTech = selectedCategory 
    ? techStack.filter(tech => tech.category === selectedCategory)
    : techStack

  return (
    <section id="expertise" className="section-padding bg-nourx-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">Notre Expertise Technique</h2>
          <p className="text-body max-w-2xl mx-auto">
            Nous maîtrisons les technologies les plus avancées pour créer des solutions performantes et évolutives
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedCategory === null 
                ? 'bg-nourx-black text-white' 
                : 'bg-white text-nourx-gray-600 hover:bg-nourx-gray-100'
            }`}
          >
            Toutes
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category 
                  ? 'bg-nourx-black text-white' 
                  : 'bg-white text-nourx-gray-600 hover:bg-nourx-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {filteredTech.map((tech, index) => (
            <div
              key={tech.name}
              className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-all animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <p className="font-medium">{tech.name}</p>
              <p className="text-sm text-nourx-gray-500">{tech.category}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/expertise" className="btn-secondary">
            Voir notre expertise complète
          </Link>
        </div>
      </div>
    </section>
  )
}
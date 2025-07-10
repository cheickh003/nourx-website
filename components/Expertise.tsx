'use client'

import Link from 'next/link'

const techStack = [
  { name: 'React/Next.js', category: 'Frontend' },
  { name: 'Python/Django', category: 'Backend' },
  { name: 'Flutter', category: 'Mobile' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'AWS/GCP', category: 'Cloud' },
  { name: 'OpenAI/GPT', category: 'IA' },
]

export default function Expertise() {

  return (
    <section id="expertise" className="section-padding bg-nourx-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Notre Expertise Technique</h2>
          <p className="text-body max-w-2xl mx-auto">
            Technologies clés pour créer des solutions performantes
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
          {techStack.map((tech, index) => (
            <div
              key={tech.name}
              className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-all"
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
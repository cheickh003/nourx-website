'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const stats = [
  { label: 'Projets livrés', value: '80+' },
  { label: 'Clients satisfaits', value: '35+' },
  { label: 'Support', value: '24/7' },
]

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 sm:pt-20">
      {/* Minimalist Background Blur Animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 bg-gradient-to-r from-nourx-blue/10 to-purple-500/10 rounded-full blur-3xl animate-gentle-pulse" />
        </div>
        <div className="absolute bottom-1/3 right-1/3">
          <div className="w-64 h-64 bg-gradient-to-l from-cyan-400/8 to-nourx-blue/8 rounded-full blur-2xl animate-gentle-float" />
        </div>
      </div>

      {/* Centered Content */}
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Title */}
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-nourx-black">
            Votre transformation digitale commence ici
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-xl sm:text-2xl text-nourx-gray-600 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            Du conseil stratégique à l&apos;exploitation 24/7
          </p>
        </div>

        {/* CTA Buttons */}
        <div className={`transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link 
              href="#contact" 
              className="px-8 py-4 bg-nourx-black text-white rounded-full font-medium hover:bg-nourx-blue transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Démarrer mon projet
            </Link>
            <Link 
              href="#services" 
              className="px-8 py-4 border border-nourx-gray-300 text-nourx-black rounded-full font-medium hover:border-nourx-black transition-all duration-300 hover:scale-105"
            >
              Découvrir nos services
            </Link>
          </div>
        </div>

        {/* Minimalist Stats */}
        <div className={`transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center group cursor-default"
              >
                <div className="text-3xl sm:text-4xl font-bold text-nourx-blue mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-nourx-gray-500 tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>

      <style jsx>{`
        @keyframes gentle-pulse {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
        
        @keyframes gentle-float {
          0%, 100% { 
            opacity: 0.2;
            transform: translateY(0) scale(1);
          }
          50% { 
            opacity: 0.4;
            transform: translateY(-20px) scale(1.05);
          }
        }
        
        .animate-gentle-pulse {
          animation: gentle-pulse 6s ease-in-out infinite;
        }
        
        .animate-gentle-float {
          animation: gentle-float 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
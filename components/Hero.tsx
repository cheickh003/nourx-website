'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const stats = [
  { label: 'Projets livrés', value: '80+', suffix: '' },
  { label: 'Clients récurrents', value: '35+', suffix: '' },
  { label: 'Support', value: '24/7', suffix: '' },
]

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Votre transformation digitale commence ici'
  
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96">
          <div className="absolute inset-0 bg-gradient-to-r from-nourx-gray-100 to-transparent rounded-full blur-3xl opacity-50 animate-pulse" />
        </div>
      </div>

      {/* X Pattern */}
      <div className="absolute top-1/4 right-1/4 -z-10 opacity-5">
        <svg width="200" height="200" viewBox="0 0 200 200" className="animate-spin-slow">
          <path
            d="M30 30 L170 170 M170 30 L30 170"
            stroke="currentColor"
            strokeWidth="20"
            strokeLinecap="round"
            className="text-nourx-black"
          />
        </svg>
      </div>

      <div className="container">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Title with Typewriter Effect */}
          <h1 className="text-4xl sm:heading-1 mb-6 animate-fade-in font-bold leading-tight">
            <span className="inline-block min-h-[1.2em]">
              {displayText}
              <span className="animate-blink">|</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-body text-xl md:text-2xl mb-10 animate-slide-up opacity-0 animation-delay-500">
            Du conseil stratégique à l&apos;exploitation 24/7
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-slide-up opacity-0 animation-delay-700">
            <Link href="#services" className="btn-primary">
              Découvrir nos services
            </Link>
            <Link href="#realisations" className="btn-secondary">
              Consulter nos réalisations
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-slide-up opacity-0"
                style={{ animationDelay: `${900 + index * 100}ms` }}
              >
                <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-nourx-blue mb-1 sm:mb-2">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-xs sm:text-sm text-nourx-gray-600 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animation-delay-500 {
          animation-delay: 500ms;
          animation-fill-mode: forwards;
        }
        
        .animation-delay-700 {
          animation-delay: 700ms;
          animation-fill-mode: forwards;
        }
      `}</style>
    </section>
  )
}
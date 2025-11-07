'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'À propos', href: '/a-propos' },
  { name: 'Services', href: '/services' },
  { name: 'Expertise', href: '/expertise' },
  { name: 'Réalisations', href: '/realisations' },
  { name: 'Carrières', href: '/offres-emploi' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      setIsScrolled(currentScrollY > 10)
      
      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 pt-safe',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-nourx-gray-100' 
          : 'bg-transparent',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-4">
        {/* Desktop Layout - True centered layout */}
        <div className="hidden md:block md:max-w-7xl md:mx-auto">
          <div className="relative flex items-center">
            {/* Logo - Left */}
            <div className="w-[180px] flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo-nourx.png"
                  alt="Nourx"
                  width={60}
                  height={20}
                  className="h-4 sm:h-5 w-auto transition-opacity hover:opacity-80"
                  priority
                />
              </Link>
            </div>

            {/* Navigation - Center (flex-1 centers it) */}
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center space-x-4 lg:space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative text-sm font-medium text-nourx-black/80 hover:text-nourx-black transition-all duration-300 group whitespace-nowrap"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-nourx-blue transition-all duration-300 group-hover:w-full group-hover:left-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* CTAs - Right (same width as logo area for perfect balance) */}
            <div className="w-[280px] flex-shrink-0 flex items-center justify-end gap-2 lg:gap-3">
              <Link
                href="/gerer-mes-services"
                className="px-3 lg:px-4 py-1.5 border border-nourx-blue text-nourx-blue text-xs font-medium rounded-full hover:bg-nourx-blue hover:text-white transition-all duration-300 whitespace-nowrap"
              >
                Gérer mes services
              </Link>
              <Link
                href="/contact"
                className="px-4 lg:px-6 py-2 bg-nourx-black text-white text-sm font-medium rounded-full hover:bg-nourx-blue transition-all duration-300 hover:scale-105 whitespace-nowrap"
              >
                Démarrer un projet
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-nourx.png"
              alt="Nourx"
              width={60}
              height={20}
              className="h-4 w-auto transition-opacity hover:opacity-80"
              priority
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Menu</span>
            <div className="w-5 h-4 relative">
              <span
                className={cn(
                  'block absolute h-0.5 w-full bg-nourx-black transition-all duration-300 top-0',
                  mobileMenuOpen && 'rotate-45 top-1/2 -translate-y-1/2'
                )}
              />
              <span
                className={cn(
                  'block absolute h-0.5 w-full bg-nourx-black transition-all duration-300 top-1/2 -translate-y-1/2',
                  mobileMenuOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'block absolute h-0.5 w-full bg-nourx-black transition-all duration-300 bottom-0',
                  mobileMenuOpen && '-rotate-45 top-1/2 -translate-y-1/2'
                )}
              />
            </div>
          </button>
        </div>
      </nav>
    </header>

      {/* Mobile Menu - Outside of header */}
      <div
        className={cn(
          'md:hidden fixed inset-0 bg-white z-[100] transition-transform duration-300',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Close button */}
        <button
          type="button"
          className="absolute top-3 sm:top-4 right-4 sm:right-6 p-2 z-[110]"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="w-6 h-6 relative">
            <span className="block absolute h-0.5 w-full bg-nourx-black rotate-45 top-1/2 -translate-y-1/2" />
            <span className="block absolute h-0.5 w-full bg-nourx-black -rotate-45 top-1/2 -translate-y-1/2" />
          </div>
        </button>
        
        <div className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8 p-6 sm:p-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-xl sm:text-2xl font-medium text-nourx-black transition-colors hover:text-nourx-blue"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <Link
              href="/gerer-mes-services"
              className="px-6 py-2 border border-nourx-blue text-nourx-blue rounded-full font-medium hover:bg-nourx-blue hover:text-white transition-all duration-300 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gérer mes services
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-nourx-black text-white rounded-full font-medium hover:bg-nourx-blue transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Démarrer un projet
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
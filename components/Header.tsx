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
      <nav className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-center py-5 sm:py-4">
        {/* Logo */}
        <Link href="/" className="absolute left-6 sm:left-8 flex items-center">
          <Image
            src="/logo-nourx.png"
            alt="Nourx"
            width={60}
            height={20}
            className="h-4 sm:h-5 w-auto transition-opacity hover:opacity-80"
            priority
          />
        </Link>

        {/* Centered Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-sm font-medium text-nourx-black/80 hover:text-nourx-black transition-all duration-300 group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-nourx-blue transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </Link>
          ))}
        </div>

        {/* Right CTA */}
        <div className="absolute right-6 sm:right-8 hidden md:flex items-center">
          <Link
            href="/contact"
            className="px-6 py-2 bg-nourx-black text-white text-sm font-medium rounded-full hover:bg-nourx-blue transition-all duration-300 hover:scale-105"
          >
            Démarrer un projet
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden absolute right-6 sm:right-8 p-2"
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
          <Link
            href="/contact"
            className="px-8 py-3 bg-nourx-black text-white rounded-full font-medium hover:bg-nourx-blue transition-all duration-300 mt-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            Démarrer un projet
          </Link>
        </div>
      </div>
    </>
  )
}
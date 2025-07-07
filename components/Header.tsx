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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-nourx.png"
            alt="Nourx"
            width={100}
            height={30}
            className="h-6 w-auto md:h-7"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-sm font-medium text-nourx-black transition-colors hover:text-nourx-blue after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-nourx-blue after:transition-all hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-primary ml-4"
          >
            Démarrer un projet
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden relative z-50 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Menu</span>
          <div className="w-6 h-5 relative">
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

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-2xl font-medium text-nourx-black transition-colors hover:text-nourx-blue"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-primary mt-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            Démarrer un projet
          </Link>
        </div>
      </div>
    </header>
  )
}
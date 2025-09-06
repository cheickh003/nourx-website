'use client'

import { CyberneticBentoGrid } from '@/components/ui/cybernetic-bento-grid'
import Link from 'next/link'

export default function Services() {
  return (
    <section id="services" className="bg-white">
      <CyberneticBentoGrid />
      
      <div className="text-center pb-12">
        <Link href="/contact" className="btn-accent">
          Discuter de votre projet
        </Link>
      </div>
    </section>
  )
}
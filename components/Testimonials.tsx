'use client'

import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee'
import { testimonials } from '@/data/testimonials'

export default function Testimonials() {
  // Convert existing testimonials to new format
  const formattedTestimonials = testimonials.map((testimonial) => ({
    author: {
      name: testimonial.name,
      handle: testimonial.position,
      company: testimonial.company,
    },
    text: testimonial.content,
  }))

  return (
    <TestimonialsSection
      title="Ce que disent nos clients"
      description="Des témoignages authentiques de nos partenaires qui nous font confiance pour leur transformation digitale"
      testimonials={formattedTestimonials}
    />
  )
}
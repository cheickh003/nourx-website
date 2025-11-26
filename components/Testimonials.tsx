"use client"

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { testimonials } from "@/data/testimonials"

export default function Testimonials() {
  const formattedTestimonials = testimonials.map((testimonial, index) => ({
    id: Number(testimonial.id) || index + 1,
    name: testimonial.name,
    role: testimonial.position,
    company: testimonial.company,
    content: testimonial.content,
    rating: testimonial.rating ?? 5,
    avatar:
      testimonial.image ||
      `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(testimonial.name)}`,
  }))

  return (
    <AnimatedTestimonials
      title="Ce que disent nos clients"
      subtitle="Des directions digitales, des DSI et des responsables innovation partout en Afrique de l'Ouest choisissent Nourx pour sécuriser leur transformation."
      testimonials={formattedTestimonials}
      autoRotateInterval={8000}
      trustedCompanies={["BOYOOT IMMOBILIER", "CACOMIAF", "GEK CAPITAL", "CANAL+", "Orange CI"]}
      trustedCompaniesTitle="Ils nous confient leurs projets stratégiques"
    />
  )
}

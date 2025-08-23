'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { testimonials } from '@/data/testimonials'
import { Quote, Star } from 'lucide-react'

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'center',
    skipSnaps: false,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return
    
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">Ce que disent nos clients</h2>
          <p className="text-body max-w-2xl mx-auto">
            Des témoignages authentiques de nos partenaires satisfaits
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-[0_0_100%] px-4">
                  <div className="bg-white p-8 md:p-12 text-center">
                    {/* Quote Icon */}
                    <Quote className="w-12 h-12 text-nourx-gray-300 mx-auto mb-6" />
                    
                    {/* Content */}
                    <blockquote className="text-body text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Rating */}
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-nourx-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Author */}
                    <div>
                      <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-nourx-gray-600">{testimonial.position}</p>
                      <p className="text-nourx-blue font-medium">{testimonial.company}</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-nourx-gray-100 text-nourx-gray-600 text-xs rounded-full">
                        {testimonial.sector}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'w-8 bg-nourx-black'
                    : 'bg-nourx-gray-300 hover:bg-nourx-gray-400'
                }`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        </div>

        {/* Client Logos */}
        <div className="mt-16">
          <p className="text-center text-sm text-nourx-gray-500 mb-8">
            Ils nous font confiance
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60 grayscale">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="text-2xl font-bold text-nourx-gray-400">
                {testimonial.company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
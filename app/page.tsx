import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import ExpertiseRedirect from '@/components/ExpertiseRedirect'
import Portfolio from '@/components/Portfolio'
import Differentiators from '@/components/Differentiators'
import Testimonials from '@/components/Testimonials'
import CallToAction from '@/components/CallToAction'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Services />
      <ExpertiseRedirect />
      <Portfolio />
      <Differentiators />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  )
}
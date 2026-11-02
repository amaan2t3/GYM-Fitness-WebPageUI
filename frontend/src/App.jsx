import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { Route, Routes } from 'react-router-dom'
import About from './components/About'
import { ClassesSection, ContactSection, PricingSection, TrainersSection } from './components/StudioContent'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import SiteHeader from './components/SiteHeader'
import Testimonials from './components/Testimonials'

const ToolsSection = lazy(() => import('./components/ToolsSection'))
const AdminPortal = lazy(() => import('./admin/AdminPortal'))

function PublicSite() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="site-shell">
      <SiteHeader />
      <Hero />
      <About />
      <ClassesSection />
      <TrainersSection />
      <Gallery />
      <Testimonials />
      <Suspense fallback={<section className="section tools-section" id="tools"><div className="section-inner">Loading your training tools…</div></section>}><ToolsSection /></Suspense>
      <PricingSection />
      <ContactSection />
      <Footer />
      <AnimatePresence>
        {showScrollTop && <Motion.button className="scroll-top" aria-label="Scroll to top" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={19} /></Motion.button>}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return <Routes><Route path="/" element={<PublicSite />} /><Route path="/admin/*" element={<Suspense fallback={<main className="admin-loading">Loading admin portal…</main>}><AdminPortal /></Suspense>} /><Route path="*" element={<PublicSite />} /></Routes>
}

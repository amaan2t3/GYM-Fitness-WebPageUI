import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Classes from './components/Classes'
import Trainers from './components/Trainers'
import Pricing from './components/Pricing'
import BMICalculator from './components/BMICalculator'
import WorkoutTracker from './components/WorkoutTracker'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <Hero />
      <About />
      <Classes />
      <Trainers />
      <Gallery />
      <Testimonials />
      <div className="py-20 bg-gradient-to-b from-dark to-darker">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Advanced Tools</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Track your progress with our state-of-the-art fitness tools
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <BMICalculator />
            <WorkoutTracker />
          </div>
        </div>
      </div>

      <Pricing />
      <Contact />
      <Footer />

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-primary hover:bg-orange-500 text-dark p-3 rounded-full shadow-lg transition-all z-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
import React from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight, FaHeartbeat, FaUsers, FaCalendarAlt } from 'react-icons/fa'

const Hero = () => {
  const scrollToTools = () => {
    const toolsSection = document.querySelector('#tools')
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/95 to-transparent z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
          alt="Gym Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 uppercase">
              <span className="gradient-text">Transform</span> Your Body,
              <br />
              <span className="text-white">Transform Your Life</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              Experience the ultimate fitness journey with state-of-the-art equipment, expert trainers, and a supportive community to help you crush your goals.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto justify-center bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg flex items-center gap-2"
                onClick={() => {
                  const pricingSection = document.querySelector('#pricing')
                  if (pricingSection) pricingSection.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Join Now <FaArrowRight />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto justify-center border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg"
                onClick={() => {
                  const classesSection = document.querySelector('#classes')
                  if (classesSection) classesSection.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Free Trial
              </motion.button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8">
              {[
                { icon: FaUsers, value: '200+', label: 'Members' },
                { icon: FaHeartbeat, value: '15+', label: 'Expert Coaches' },
                { icon: FaCalendarAlt, value: '35+', label: 'Weekly Classes' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="text-primary text-2xl mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Offer Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card/80 backdrop-blur-lg rounded-2xl p-8 border border-primary/30"
          >
            <FaHeartbeat className="text-primary text-4xl mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-center mb-2">Limited Offer</h3>
            <p className="text-gray-300 text-center mb-4">
              Get first month at <strong className="text-primary">30% OFF</strong> + free personal training session
            </p>
            <div className="bg-primary/10 rounded-lg p-3 text-center mb-4">
              <code className="text-primary font-mono text-lg">FORGE30</code>
            </div>
            <button 
              className="w-full bg-primary hover:bg-orange-500 text-dark px-6 py-3 rounded-full font-semibold transition-all"
              onClick={() => {
                const pricingSection = document.querySelector('#pricing')
                if (pricingSection) pricingSection.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Claim Deal
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
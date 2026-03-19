import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaDumbbell, FaBars, FaTimes, FaUser, FaShoppingBag, FaSun, FaMoon } from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('home')
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Update active link based on scroll position
      const sections = ['home', 'classes', 'trainers', 'tools', 'pricing', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveLink(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home', icon: '🏠' },
    { name: 'Classes', href: '#classes', id: 'classes', icon: '💪' },
    { name: 'Trainers', href: '#trainers', id: 'trainers', icon: '👨‍🏫' },
    { name: 'Tools', href: '#tools', id: 'tools', icon: '⚙️' },
    { name: 'Pricing', href: '#pricing', id: 'pricing', icon: '💰' },
    { name: 'Contact', href: '#contact', id: 'contact', icon: '📞' },
  ]

  const scrollToSection = (href, id) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveLink(id)
      setIsOpen(false)
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('light-mode')
  }

  return (
    <>
      {/* Background blur overlay when scrolled */}
      <motion.div
        className={`fixed top-0 left-0 w-full h-20 z-40 transition-all duration-500 ${scrolled ? 'backdrop-blur-xl' : 'backdrop-blur-none'
          }`}
        style={{ background: scrolled ? 'rgba(10, 12, 15, 0.8)' : 'transparent' }}
      />

      <nav className={` bg-black fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'
        }`}>
        <div className="container mx-auto px-4">
          <div className="relative flex justify-between items-center">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'linear',
                }}
              />
            </div>

            {/* Logo with 3D effect */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => scrollToSection('#home', 'home')}
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <FaDumbbell className="text-primary text-3xl" />
                </motion.div>
                <motion.div
                  className="absolute -inset-2 bg-primary/20 rounded-full blur-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="relative">
                <span className="text-2xl font-black tracking-tighter">
                  <span className="gradient-text">Amaan's</span>
                  <span className="text-white group-hover:text-primary transition-colors duration-300">GYM</span>
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-transparent"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            {/* Desktop Navigation - Modern Design */}
            <div className="hidden lg:flex items-center space-x-1">
              <div className="bg-white/5 backdrop-blur-sm rounded-full px-2 py-1 border border-white/10">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href, link.id)
                    }}
                    className="relative group px-5 py-2 inline-flex items-center gap-2"
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                      {link.name}
                    </span>

                    {/* Active Indicator */}
                    {activeLink === link.id && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-primary/20 rounded-full border border-primary/50"
                        transition={{ type: 'spring', duration: 0.5 }}
                      />
                    )}

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.05 }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="relative w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden group"
              >
                <motion.div
                  animate={{ rotate: isDarkMode ? 0 : 180 }}
                  transition={{ duration: 0.5 }}
                >
                  {isDarkMode ? (
                    <FaSun className="text-yellow-400 text-lg" />
                  ) : (
                    <FaMoon className="text-primary text-lg" />
                  )}
                </motion.div>
              </motion.button>

              {/* Cart Button */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group"
              >
                <FaShoppingBag className="text-gray-300 group-hover:text-primary transition-colors text-lg" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] flex items-center justify-center text-dark font-bold">
                  0
                </span>
              </motion.button>

              {/* Profile Button */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex w-10 h-10 rounded-full bg-gradient-to-r from-primary to-orange-500 items-center justify-center"
              >
                <FaUser className="text-dark text-lg" />
              </motion.button>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block relative overflow-hidden group bg-gradient-to-r from-primary to-orange-500 px-6 py-2 rounded-full font-bold text-dark shadow-lg"
                onClick={() => scrollToSection('#pricing', 'pricing')}
              >
                <span className="relative z-10">Join Now →</span>
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden relative w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center"
                onClick={() => setIsOpen(!isOpen)}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <FaTimes className="text-gray-300 text-xl" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <FaBars className="text-gray-300 text-xl" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu - Full Screen Modern Design */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.4, type: 'spring' }}
                className="lg:hidden mt-4 overflow-hidden"
              >
                <div className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
                  <div className="space-y-2">
                    {navLinks.map((link, index) => (
                      <motion.a
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault()
                          scrollToSection(link.href, link.id)
                        }}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${activeLink === link.id
                          ? 'bg-primary/20 border border-primary/50 text-primary'
                          : 'hover:bg-white/10 text-gray-300'
                          }`}
                      >
                        <span className="text-2xl">{link.icon}</span>
                        <span className="font-semibold text-lg">{link.name}</span>
                        {activeLink === link.id && (
                          <motion.div
                            layoutId="activeMobile"
                            className="ml-auto w-2 h-2 bg-primary rounded-full"
                          />
                        )}
                      </motion.a>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-primary to-orange-500 text-dark font-bold py-3 rounded-xl shadow-lg"
                      onClick={() => scrollToSection('#pricing', 'pricing')}
                    >
                      Start Your Journey →
                    </motion.button>

                    <div className="flex gap-3 mt-4">
                      <button className="flex-1 bg-white/10 backdrop-blur-sm py-2 rounded-xl text-gray-300 hover:text-primary transition-colors">
                        Login
                      </button>
                      <button className="flex-1 bg-white/10 backdrop-blur-sm py-2 rounded-xl text-gray-300 hover:text-primary transition-colors">
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Add this to your global CSS for light mode support */}
      <style jsx>{`
        .light-mode {
          --bg-dark: #ffffff;
          --text-dark: #1a1a1a;
        }
        .gradient-text {
          background: linear-gradient(135deg, #f2613a, #ff8c5a);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </>
  )
}

export default Navbar
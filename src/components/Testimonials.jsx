import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Member for 2 years",
      image: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=f97316&color=fff",
      text: "PowerFit Gym has completely changed my life. The trainers are incredibly supportive, and the community here makes every workout enjoyable. I've achieved fitness goals I never thought possible.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CrossFit Athlete",
      image: "https://ui-avatars.com/api/?name=Michael+Chen&background=f97316&color=fff",
      text: "The equipment here is top-notch, and the atmosphere is electric. It's the perfect place for anyone serious about their fitness journey. Best gym in the city, hands down.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Yoga Enthusiast",
      image: "https://ui-avatars.com/api/?name=Emily+Davis&background=f97316&color=fff",
      text: "I joined for the yoga classes but stayed for the incredible community. The instructors are knowledgeable and caring. Highly recommend the premium membership!",
      rating: 5
    }
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  return (
    <section id="testimonials" className="py-20 bg-dark2 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Member <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from our dedicated members who have transformed their lives.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-white/5 p-8 md:p-12 rounded-2xl shadow-xl"
            >
              <FaQuoteLeft className="text-primary/20 text-6xl absolute top-6 left-6" />
              
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl text-gray-300 italic mb-8 leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </p>
                
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full border-2 border-primary object-cover"
                  />
                  <div className="text-left">
                    <h4 className="font-bold text-white text-lg">{testimonials[currentIndex].name}</h4>
                    <p className="text-primary text-sm">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-colors shadow-lg"
            >
              <FaChevronLeft />
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-primary w-8' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-colors shadow-lg"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

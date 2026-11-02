import React, { useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Member for 2 years",
      text: "Amaan’s Gym & Fitness has completely changed my life. The trainers are incredibly supportive, and the community here makes every workout enjoyable. I've achieved fitness goals I never thought possible.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CrossFit Athlete",
      text: "The equipment here is top-notch, and the atmosphere is electric. It's the perfect place for anyone serious about their fitness journey. Best gym in the city, hands down.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Yoga Enthusiast",
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
    <section id="testimonials" className="section testimonial-section">
      <div className="section-inner">
        <div className="section-heading">
          <span className="eyebrow">Good things happen when you show up</span>
          <h2>A community that <span className="accent">lifts you up.</span></h2>
          <p>Encouragement, expert coaching, and progress worth celebrating.</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <Motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="testimonial-card"
            >
              <Quote className="testimonial-quote" size={40} />
              
              <div className="testimonial-content">
                <div className="testimonial-stars" aria-label={`${testimonials[currentIndex].rating} out of 5 stars`}>
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                
                <p className="testimonial-text">
                  “{testimonials[currentIndex].text}”
                </p>
                
                <div className="testimonial-author">
                  <span className="testimonial-avatar" aria-hidden="true">{testimonials[currentIndex].name.charAt(0)}</span>
                  <div>
                    <h4>{testimonials[currentIndex].name}</h4>
                    <p>{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </Motion.div>
          </AnimatePresence>

          <div className="testimonial-controls">
            <button 
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="testimonial-control"
            >
              <ChevronLeft />
            </button>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Show testimonial ${index + 1}`}
                  aria-current={index === currentIndex}
                  className={`testimonial-dot ${
                    index === currentIndex ? 'is-active' : ''
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="testimonial-control"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

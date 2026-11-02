import React, { useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  const transformations = [
    { id: 1, src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80", title: "Strength Training" },
    { id: 2, src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80", title: "Core Workout" },
    { id: 3, src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80", title: "Cardio Focus" },
    { id: 4, src: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80", title: "Personal Training" },
    { id: 5, src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80", title: "Mobility & Wellness" },
    { id: 6, src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80", title: "Athletic Conditioning" }
  ]

  return (
    <section id="gallery" className="section gallery-section">
      <div className="section-inner">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-heading"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            A look inside <span className="gradient-text">the gym.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find your space, meet your community, and make time for your health.
          </p>
        </Motion.div>

        {/* Masonry Layout */}
        <div className="gallery-grid">
          {transformations.map((img, index) => (
            <Motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="gallery-card"
              onClick={() => setSelectedImage({ src: img.src, title: img.title })}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setSelectedImage({ src: img.src, title: img.title })
                }
              }}
              aria-label={`View ${img.title}`}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover"
              />
              <span className="gallery-card-caption">{img.title}</span>
            </Motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="gallery-lightbox"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors z-50"
              aria-label="Close image viewer"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes className="text-4xl" />
            </button>
            <Motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage.src}
              alt={selectedImage.title}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl border border-white/10"
            />
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery

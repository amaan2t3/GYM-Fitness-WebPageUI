import React from 'react'
import { motion } from 'framer-motion'
import { FaClock, FaCalendarAlt } from 'react-icons/fa'

const classes = [
  {
    title: '🔥 Inferno HIIT',
    duration: '45 min',
    intensity: 'High Intensity',
    schedule: 'Mon, Wed, Fri - 7:00 AM',
    badge: 'Full Body Burn',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDmiBMNzuEXupuKV0m9fKXH933lkud0K9Oha3NMY_9aA&s'
  },
  {
    title: '🏋️ Strength Foundations',
    duration: '60 min',
    intensity: 'Power Lifting',
    schedule: 'Tue, Thu - 5:30 PM',
    badge: 'Build Muscle',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    title: '🧘 Recovery & Mobility',
    duration: '50 min',
    intensity: 'Stretch & Flow',
    schedule: 'Sat, Sun - 9:00 AM',
    badge: 'Active Recovery',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  }
]

const Classes = () => {
  return (
    <section id="classes" className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Signature Classes</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((classItem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-card rounded-2xl overflow-hidden border border-gray-800 hover:border-primary transition-all"
            >
              <div className="h-48 overflow-hidden">
                <img src={classItem.image} alt={classItem.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{classItem.title}</h3>
                <div className="space-y-2 mb-3">
                  <p className="text-gray-400 flex items-center gap-2 text-sm">
                    <FaClock className="text-primary" /> {classItem.duration} | {classItem.intensity}
                  </p>
                  <p className="text-gray-400 flex items-center gap-2 text-sm">
                    <FaCalendarAlt className="text-primary" /> {classItem.schedule}
                  </p>
                </div>
                <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                  {classItem.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Classes
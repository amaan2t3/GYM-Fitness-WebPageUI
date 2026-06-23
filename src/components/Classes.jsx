import React from 'react'
import { motion } from 'framer-motion'
import { FaClock, FaCalendarAlt } from 'react-icons/fa'

const classes = [
  {
    title: 'Weight Training',
    duration: '60 min',
    intensity: 'Strength & Power',
    schedule: 'Mon, Wed, Fri - 6:00 PM',
    badge: 'Build Muscle',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=500&q=80'
  },
  {
    title: 'Cardio Fitness',
    duration: '45 min',
    intensity: 'High Intensity',
    schedule: 'Tue, Thu - 7:00 AM',
    badge: 'Burn Fat',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=80'
  },
  {
    title: 'CrossFit',
    duration: '50 min',
    intensity: 'Extreme Conditioning',
    schedule: 'Mon, Wed, Fri - 6:00 AM',
    badge: 'Endurance',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=500&q=80'
  },
  {
    title: 'Yoga',
    duration: '60 min',
    intensity: 'Flexibility & Balance',
    schedule: 'Sat, Sun - 9:00 AM',
    badge: 'Recovery',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=500&q=80'
  },
  {
    title: 'Bodybuilding',
    duration: '90 min',
    intensity: 'Hypertrophy Focus',
    schedule: 'Mon - Sat, Flexible',
    badge: 'Pro Level',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=500&q=80'
  },
  {
    title: 'Personal Training',
    duration: '60 min',
    intensity: 'Customized',
    schedule: 'By Appointment',
    badge: '1-on-1',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=500&q=80'
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
            Fitness <span className="gradient-text">Programs</span>
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
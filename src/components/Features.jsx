

import React from 'react'
import { motion } from 'framer-motion'
import { FaDumbbell, FaHeart, FaSpa } from 'react-icons/fa'
import { FaChalkboardUser } from 'react-icons/fa6'

const features = [
  { icon: FaDumbbell, title: 'Strength Zone', description: 'Latest Hammer Strength, free weights & power racks.' },
  { icon: FaHeart, title: 'HIIT & Cardio', description: 'Assault bikes, rowers, turf track & functional training.' },
  { icon: FaSpa, title: 'Recovery Lounge', description: 'Sauna, cryotherapy, massage chairs & stretch zone.' },
  { icon: FaChalkboardUser, title: 'Expert Coaching', description: 'Personalized plans & group classes for all levels.' },
]

const Features = () => {
  return (
    <section className="py-20 bg-darker">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Premium Facilities</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-card rounded-2xl p-6 text-center border border-gray-800 hover:border-primary transition-all"
            >
              <feature.icon className="text-primary text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
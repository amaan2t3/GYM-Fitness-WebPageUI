import React from 'react'
import { motion } from 'framer-motion'
import { FaUsers, FaDumbbell, FaTrophy, FaClock } from 'react-icons/fa'

const About = () => {
  const stats = [
    { icon: FaUsers, value: '5000+', label: 'Members', color: 'text-primary' },
    { icon: FaDumbbell, value: '50+', label: 'Trainers', color: 'text-primary' },
    { icon: FaTrophy, value: '10+', label: 'Years Experience', color: 'text-primary' },
    { icon: FaClock, value: '24/7', label: 'Access', color: 'text-primary' },
  ]

  return (
    <section id="about" className="py-20 bg-dark2 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-2xl">
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
              <img
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Gym Interior"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-8 -right-8 bg-card p-6 rounded-2xl border border-primary/30 shadow-xl hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <FaTrophy className="text-primary text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Award Winning</h4>
                  <p className="text-sm text-gray-400">Best Gym 2025</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to <span className="gradient-text">PowerFit Gym</span>
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              We aren't just a gym; we are a community of dedicated individuals striving for greatness. 
              Our state-of-the-art facilities, expert trainers, and premium amenities provide the perfect 
              environment for you to transform your body and your life.
            </p>
            <p className="text-gray-400 mb-10 leading-relaxed">
              Whether you are a beginner taking your first steps into fitness or a seasoned athlete pushing 
              your limits, PowerFit Gym gives you the tools, motivation, and support you need to succeed.
            </p>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card p-6 rounded-xl border border-white/5 hover:border-primary/50 transition-colors group text-center"
                >
                  <stat.icon className={`${stat.color} text-3xl mx-auto mb-3 group-hover:scale-110 transition-transform`} />
                  <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

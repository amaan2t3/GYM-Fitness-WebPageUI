import React from 'react'
import { motion } from 'framer-motion'
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa'
import amaanImg from '../assets/passport-photo-aman.png'
import karamatImg from '../assets/karamat.jpeg'
import zeeshanImg from '../assets/zeeshan.jpeg'


const trainers = [
  {
    name: 'Amaan',
    role: 'Co-Founder & CEO',
    experience: '10+ years exp, former powerlifting champion',
    image: amaanImg,
    social: { instagram: true, linkedin: true }
  },
  {
    name: 'Zeeshan Haider',
    role: 'Co-Founder & COO',
    experience: 'Functional training specialist & nutrition coach',
    image: zeeshanImg,
    social: { instagram: true, twitter: true }
  },
  {
    name: 'Karamat Ali',
    role: 'Head Coach',
    experience: 'Certified mobility therapist, injury prevention',
    image: karamatImg,
    social: { instagram: true, facebook: true }
  }
]

const Trainers = () => {
  return (
    <section id="trainers" className="py-20 bg-darker">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Elite Trainers</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-card rounded-2xl p-6 text-center border border-gray-800 hover:border-primary transition-all"
            >
              <img src={trainer.image} alt={trainer.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary object-cover" />
              <h3 className="text-xl font-bold mb-1">{trainer.name}</h3>
              <p className="text-primary font-semibold mb-2">{trainer.role}</p>
              <p className="text-gray-400 text-sm mb-4">{trainer.experience}</p>
              <div className="flex justify-center gap-3">
                {trainer.social.instagram && <FaInstagram className="text-gray-400 hover:text-primary cursor-pointer transition-colors text-xl" />}
                {trainer.social.linkedin && <FaLinkedin className="text-gray-400 hover:text-primary cursor-pointer transition-colors text-xl" />}
                {trainer.social.twitter && <FaTwitter className="text-gray-400 hover:text-primary cursor-pointer transition-colors text-xl" />}
                {trainer.social.facebook && <FaFacebook className="text-gray-400 hover:text-primary cursor-pointer transition-colors text-xl" />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Trainers
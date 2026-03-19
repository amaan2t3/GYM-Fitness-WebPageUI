import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for reaching out! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-dark to-darker">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Get In Touch</span>
            </h2>
            <p className="text-gray-400 mb-8">
              Ready to start your fitness journey? Contact us today and let's forge your strongest self together.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-gray-400"> Amaan's GYM, parshan chowk skardu.</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <FaPhone className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-400">+92 345 5555555</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <FaEnvelope className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-400">amaangym@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <FaClock className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold">Hours</h4>
                  <p className="text-gray-400">Mon-Fri: 5:00 AM - 11:00 PM</p>
                  <p className="text-gray-400">Sat-Sun: 7:00 AM - 8:00 PM</p>
                  <p className="text-gray-400">24/7 Member Key Access</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-8 border border-gray-800"
          >
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-dark border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-dark border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                required
              />
              <textarea
                rows="4"
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-dark border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-orange-500 text-dark py-3 rounded-lg font-semibold transition-all"
              >
                Send Message
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact
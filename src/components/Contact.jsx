import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const contactInfo = [
  { icon: MapPin, label: 'Location', value: ' Amaan GYM & Fitness,Skardu, Gilgit-Baltistan, Pakistan' },
  { icon: Phone, label: 'Phone', value: '+92 355 5555555' },
  { icon: Mail, label: 'Email', value: 'amaangym&fitness@gmail.com' },
  { icon: Clock, label: 'Hours', value: 'Mon-Sat: 6:00 AM - 11:00 PM' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className=" flex justify-center items-center bg-[#0f0f0f] py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest block mb-3">
            Get In Touch
          </span>

          <h2 className="text-4xl sm:text-5xl text-white mb-4">
            CONTACT <span className="text-orange-500">US</span>
          </h2>

          <div className='flex justify-center'>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Ready to start? Let's talk about your fitness goals.
            </p>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-5 bg-[#171717] border border-zinc-800 rounded-xl hover:border-orange-500/40 transition-all hover:scale-[1.02]"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-orange-400" />
                </div>

                <div>
                  <p className="text-xs text-zinc-500 uppercase">{label}</p>
                  <p className="text-zinc-200 font-medium">{value}</p>
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-zinc-800 h-56 bg-[#171717] flex items-center justify-center hover:border-orange-500/30 transition">
              <div className="text-center text-zinc-600">
                <MapPin className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Amaan GYM & Fitness</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE (FORM) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#171717] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg"
            >

              {/* Inputs */}
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="input-style"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="input-style"
                />
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="input-style"
              />

              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="input-style text-zinc-400"
              >
                <option value="">Select Subject</option>
                <option>Membership Inquiry</option>
                <option>Personal Training</option>
                <option>Group Classes</option>
                <option>Nutrition Consultation</option>
                <option>Other</option>
              </select>

              <textarea
                name="message"
                rows={4}
                placeholder="Your message..."
                value={form.message}
                onChange={handleChange}
                required
                className="input-style resize-none"
              />

              {/* Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition ${sent
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-orange-500 to-yellow-400 text-black hover:shadow-lg hover:shadow-orange-500/30'
                  }`}
              >
                {sent ? (
                  'Message Sent ✓'
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

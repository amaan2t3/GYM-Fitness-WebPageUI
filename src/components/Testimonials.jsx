import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Lost 25kg in 6 months',
    rating: 5,
    text: 'Amaans Gym & Fitness completely changed my life. The trainers are incredible — they kept me motivated even when I wanted to quit. I went from barely being able to walk up stairs to running 5K every morning.',
    initials: 'RS',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    name: 'Priya Patel',
    role: 'Yoga & Strength Member',
    rating: 5,
    text: 'The yoga classes are phenomenal. Sofia helped me combine yoga with strength training and the results have been amazing — more flexibility, better posture, and I feel incredible.',
    initials: 'PP',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    name: 'James Wilson',
    role: 'CrossFit Enthusiast',
    rating: 5,
    text: 'Best CrossFit program I\'ve ever been part of. The 24/7 access means I can train at 5 AM before work. Worth every penny. The community here is amazing too!',
    initials: 'JW',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'Ananya Mehta',
    role: 'Elite Member – 2 Years',
    rating: 5,
    text: 'The nutrition consultation alone was worth the membership. My trainer Marcus built a plan specifically for my body type and goals. I\'ve never been in better shape at 40!',
    initials: 'AM',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'David Chen',
    role: 'Marathon Runner',
    rating: 5,
    text: 'I came for the cardio equipment and stayed for the incredible coaching. Completed my first marathon after just 4 months of training here. The facilities are world-class.',
    initials: 'DC',
    gradient: 'from-yellow-500 to-orange-400',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section id="testimonials" className=" flex justify-center items-center section-padding bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.1) 0%, transparent 70%)',
      }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-4 block">
            Success Stories
          </span>
          <h2 className="font-display text-5xl sm:text-6xl text-white mb-4">
            REAL <span className="gradient-text">RESULTS</span>
          </h2>
          <p className="text-zinc-400 text-lg">Thousands of members have transformed their lives.</p>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-[#171717] border border-zinc-800 rounded-3xl p-8 md:p-10"
            >
              <Quote className="w-10 h-10 text-orange-500/40 mb-6" />

              <p className="text-zinc-200 text-lg leading-relaxed mb-8 italic">"{t.text}"</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center font-display text-xl text-white`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{t.name}</div>
                    <div className="text-orange-400 text-xs font-medium uppercase tracking-wide">{t.role}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-[#171717] border border-zinc-800 flex items-center justify-center hover:border-orange-500 hover:text-orange-400 text-zinc-400 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all ${i === current ? 'w-8 h-2.5 bg-orange-500' : 'w-2.5 h-2.5 bg-zinc-700 hover:bg-zinc-500'}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-[#171717] border border-zinc-800 flex items-center justify-center hover:border-orange-500 hover:text-orange-400 text-zinc-400 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-3 gap-6 text-center border-t border-zinc-800 pt-10"
        >
          {[
            { value: '4.9★', label: 'Average Rating' },
            { value: '5000+', label: 'Happy Members' },
            { value: '98%', label: 'Would Recommend' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-3xl text-orange-400">{stat.value}</div>
              <div className="text-zinc-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

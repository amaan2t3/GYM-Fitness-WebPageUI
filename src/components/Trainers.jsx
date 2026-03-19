import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Dumbbell } from 'lucide-react';

const trainers = [
  {
    name: 'Amaan Kacho',
    role: 'Strength & Conditioning',
    exp: '12 Years',
    specialties: ['Powerlifting', 'Olympic Lifting', 'Muscle Building'],
    gradient: 'from-orange-500 to-red-500',
    initials: 'AK',
  },
  {
    name: 'Zeeshan Khan',
    role: 'Yoga & Mindfulness',
    exp: '8 Years',
    specialties: ['Vinyasa Yoga', 'Meditation', 'Pilates'],
    gradient: 'from-purple-500 to-indigo-500',
    initials: 'ZK',
  },
  {
    name: 'Zeeshan Haider',
    role: 'CrossFit & HIIT',
    exp: '10 Years',
    specialties: ['CrossFit', 'Functional Training', 'Fat Loss'],
    gradient: 'from-cyan-500 to-blue-500',
    initials: 'ZH',
  },
  {
    name: 'Sofia Chen',
    role: 'Nutrition & Fitness Coach',
    exp: '7 Years',
    specialties: ['Nutrition Planning', 'Weight Loss', 'Female Fitness'],
    gradient: 'from-emerald-500 to-teal-500',
    initials: 'SC',
  },
];

export default function Trainers() {
  return (
    <section id="trainers" className=" flex justify-center items-center section-padding bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-4 block">
            The Experts
          </span>
          <h2 className="font-display text-5xl sm:text-6xl text-white mb-6">
            MEET YOUR <span className="gradient-text">TRAINERS</span>
          </h2>
          <div className='flex justify-center items-center'>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mt-5 mb-5">
              Our world-class coaches are passionate about helping you reach your peak potential.
            </p>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer, i) => (
            <motion.div
              key={trainer.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-hover group bg-[#171717] border border-zinc-800 rounded-2xl overflow-hidden text-center"
            >
              {/* Avatar */}
              <div className={`relative h-48 bg-gradient-to-br ${trainer.gradient} flex items-center justify-center`}>
                <div className="w-24 h-24 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border-2 border-white/20">
                  <span className="font-display text-4xl text-white">{trainer.initials}</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1">
                  <Dumbbell className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-display text-xl text-white">{trainer.name}</h3>
                <p className="text-orange-400 text-xs font-semibold uppercase tracking-wide mt-1">{trainer.role}</p>
                <p className="text-zinc-500 text-xs mt-1">{trainer.exp} Experience</p>

                <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                  {trainer.specialties.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-xs rounded-full">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex justify-center gap-3 mt-5">
                  <button className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-orange-500 transition-colors group/btn">
                    <Instagram className="w-4 h-4 text-zinc-400 group-hover/btn:text-white" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-orange-500 transition-colors group/btn">
                    <Twitter className="w-4 h-4 text-zinc-400 group-hover/btn:text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Heart, Flame, Bike, Waves, PersonStanding, Brain, Sword } from 'lucide-react';

const services = [
  {
    icon: Dumbbell,
    title: 'Personal Training',
    description: 'One-on-one sessions with certified coaches tailored to your specific goals and fitness level.',
    color: 'from-orange-500 to-red-500',
    accent: 'orange',
    features: ['Custom workout plans', 'Nutrition guidance', 'Progress tracking'],
  },
  {
    icon: Flame,
    title: 'CrossFit',
    description: 'High-intensity functional training that builds strength, speed, and endurance like nothing else.',
    color: 'from-red-500 to-pink-500',
    accent: 'red',
    features: ['Group classes', 'Olympic lifting', 'HIIT sessions'],
  },
  {
    icon: Heart,
    title: 'Yoga & Pilates',
    description: 'Find balance and flexibility through mindful movement and breathing techniques.',
    color: 'from-purple-500 to-indigo-500',
    accent: 'purple',
    features: ['Morning & evening classes', 'All skill levels', 'Meditation sessions'],
  },
  {
    icon: Bike,
    title: 'Cardio & Cycling',
    description: 'Push your cardiovascular limits with our state-of-the-art cardio equipment and spin classes.',
    color: 'from-yellow-500 to-orange-400',
    accent: 'yellow',
    features: ['Spin classes', 'Endurance training', 'Calorie tracking'],
  },
  {
    icon: Waves,
    title: 'Swimming',
    description: 'Olympic-sized pool with professional swimming coaches for all ages and skill levels.',
    color: 'from-cyan-500 to-blue-500',
    accent: 'cyan',
    features: ['Olympic pool', 'Swim coaching', 'Aqua aerobics'],
  },
  {
    icon: Sword,
    title: 'Martial Arts',
    description: 'Master discipline and self-defense with classes in MMA, boxing, kickboxing, and more.',
    color: 'from-emerald-500 to-teal-500',
    accent: 'emerald',
    features: ['MMA & Boxing', 'Self-defense', 'Kids programs'],
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  return (
    <section id="services" className=" flex justify-center items-center section-padding bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-4 block">
            What We Offer
          </span>
          <h2 className="font-display text-5xl sm:text-6xl text-white mb-6">
            OUR <span className="gradient-text">SERVICES</span>
          </h2>
          <div className='flex justify-center items-center'>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              From high-intensity workouts to mindful practices — we have everything you need to build the body and life you want.
            </p>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="card-hover group bg-[#171717] border border-zinc-800 rounded-2xl p-6 cursor-pointer"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="font-display text-2xl text-white mb-3">{service.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-5">{service.description}</p>

                <ul className="space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-zinc-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-orange-400 group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <span>→</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

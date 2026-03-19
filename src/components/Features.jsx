import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Wifi, Utensils, ShowerHead, Car, HeartPulse, Users, Award } from 'lucide-react';

const features = [
  { icon: Clock, title: '24/7 Access', desc: 'Train whenever you want. Our facility is open around the clock, every day of the year.' },
  { icon: Wifi, title: 'Free Wi-Fi', desc: 'Stay connected with high-speed internet throughout the entire gym facility.' },
  { icon: Utensils, title: 'Nutrition Bar', desc: 'Fuel your workout with protein shakes, supplements, and healthy snacks at our in-house bar.' },
  { icon: ShowerHead, title: 'Premium Lockers', desc: 'Luxury locker rooms with hot showers, private changing areas, and secure lockers.' },
  { icon: Car, title: 'Free Parking', desc: 'Ample free parking available for all members, so getting here is always stress-free.' },
  { icon: HeartPulse, title: 'Health Monitoring', desc: 'Advanced biometric tracking, heart rate monitoring, and body composition analysis.' },
  { icon: Users, title: 'Community Events', desc: 'Monthly fitness challenges, boot camps, and social events to keep you motivated.' },
  { icon: Award, title: 'Certified Trainers', desc: 'All our trainers are internationally certified with extensive experience in their specialties.' },
];

export default function Features() {
  return (
    <section id="features" className=" flex justify-center items-center section-padding bg-[#0a0a0a] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(249,115,22,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(250,204,21,0.1) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-white font-semibold text-sm uppercase tracking-widest mb-4 block">
              Why
            </span>
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-4 block">
              Amaan's GYM & Fitness?
            </span>
            <h2 className="font-display text-5xl sm:text-6xl text-white mb-6 leading-none">
              WORLD-CLASS
              <br />
              <span className="gradient-text">FACILITIES</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              We've invested in the finest equipment, expertise, and amenities so you can focus on one thing — becoming the best version of yourself.
            </p>

            <div className="space-y-4">
              {['State-of-the-art equipment updated yearly', '15,000 sq ft of training space', 'Dedicated recovery & stretching zone', 'Monthly personalized assessments'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-black text-xs font-bold">✓</span>
                  </div>
                  <span className="text-zinc-300 text-sm m-7">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="bg-[#171717] border border-zinc-800 rounded-xl p-4 hover:border-orange-500/40 hover:bg-[#1a1a1a] transition-all group"
                >
                  <Icon className="w-6 h-6 text-orange-400 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-semibold text-sm mb-1">{feat.title}</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

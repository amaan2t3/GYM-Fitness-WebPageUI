import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play, Zap, Target, Trophy } from 'lucide-react';

const stats = [
  { icon: Trophy, value: '10+', label: 'Years Experience' },
  { icon: Target, value: '50+', label: 'Expert Trainers' },
  { icon: Zap, value: '5000+', label: 'Members' },
  { icon: Play, value: '200+', label: 'Programs' },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)' }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-yellow-400/8 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-orange-500/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-orange-500/3" />

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              <span> BUILD YOUR POWER</span>
            </div>

            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-none mb-6">
              <span className="text-white">BUILD</span>
              <br />
              <span className="gradient-text">YOUR</span>
              <br />
              <span className="text-white">POWER</span>
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-md">
              At Amaan’s GYM & FITNESS, we don’t just train bodies — we build champions.
              Experience elite workouts, modern equipment, and a community that drives you forward every day.            </p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold rounded-lg text-lg tracking-wide shadow-lg hover:shadow-orange-500/30 transition-shadow"
              >
                Start Your Journey
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-zinc-700 text-zinc-300 font-semibold rounded-lg text-lg tracking-wide hover:border-orange-500 hover:text-orange-400 transition-all"
              >
                Explore Services
              </motion.a>
            </div>
          </motion.div>

          {/* Right: Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative hidden lg:block"
          >
            {/* Big circle glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-400/10 blur-2xl" />

            {/* Central Image Placeholder with design */}
            <div className="relative z-10 flex items-center justify-center h-[480px]">
              <div className="w-72 h-72 rounded-full border-4 border-orange-500/30 flex items-center justify-center relative animate-float">
                <div className="w-56 h-56 rounded-full border-2 border-yellow-400/20 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800/50">
                  <Zap className="w-24 h-24 text-orange-500" strokeWidth={1.5} />
                </div>
                {/* Orbit dots */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-orange-400"
                    style={{
                      transform: `rotate(${deg}deg) translateX(142px)`,
                      transformOrigin: 'center center',
                      opacity: 0.4 + i * 0.1,
                    }}
                  />
                ))}
              </div>

              {/* Floating badges */}
              <div className="absolute top-8 right-0 bg-[#1a1a1a] border border-zinc-700 rounded-2xl px-4 py-3 text-sm shadow-xl">
                <div className="text-orange-400 font-bold text-lg">98%</div>
                <div className="text-zinc-400 text-xs">Success Rate</div>
              </div>
              <div className="absolute bottom-16 left-0 bg-[#1a1a1a] border border-zinc-700 rounded-2xl px-4 py-3 text-sm shadow-xl">
                <div className="text-yellow-400 font-bold text-lg">5K+</div>
                <div className="text-zinc-400 text-xs">Happy Members</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-16 border-t border-zinc-800/50"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center group">
              <Icon className="w-7 h-7 text-orange-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-display text-4xl text-white">{value}</div>
              <div className="text-zinc-500 text-sm mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}

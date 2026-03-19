import React from 'react';
import { Dumbbell, Instagram, Twitter, Facebook, Youtube, ArrowUp } from 'lucide-react';

const footerLinks = {
  Services: ['Personal Training', 'CrossFit Classes', 'Yoga & Pilates', 'Swimming', 'Martial Arts'],
  Company: ['About Us', 'Our Story', 'Careers', 'Press', 'Blog'],
  Support: ['FAQs', 'Contact Us', 'Privacy Policy', 'Terms of Use', 'Cookie Policy'],
};

export default function Footer() {
  return (
    <footer className=" flex flex-col justify-center items-center  bg-[#0a0a0a] border-t border-zinc-900 "
      style={{ marginTop: "2rem" }}
    >
      {/* CTA Banner
      <div className="bg-gradient-to-r from-orange-500 via-orange-500 to-yellow-400 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="font-display text-4xl text-black mb-1">READY TO START YOUR TRANSFORMATION?</h3>
            <p className="text-black/70 font-medium">Join 5,000+ members who changed their lives at IronForge.</p>
          </div>
          <a
            href="#pricing"
            className="flex-shrink-0 bg-black text-white font-bold px-8 py-3.5 rounded-xl hover:bg-zinc-900 transition-colors tracking-wide text-sm"
          >
            Get Started Today
          </a>
        </div>
      </div> */}

      {/* Main Footer */}
      <div className=" flex justify-center items-center w-full px-6 py-16 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-display text-white tracking-widest">
                Amaan's<span className="text-orange-500">GYM & FITNESS</span>
              </span>
            </a>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Transform your body and elevate your mind at IronForge — Mumbai's premier fitness destination.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-orange-400 hover:border-orange-500/50 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#home"
                      className="text-zinc-500 text-sm hover:text-orange-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-sm">© 2026 IronForge Gym & Fitness. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-orange-400 transition-colors"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-orange-500/50 transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}

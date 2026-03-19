import React, { useState, useEffect } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Features', href: '#features' },
  { label: 'BMI', href: '#bmi' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav

      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-[#0a0a0a]/95 backdrop-blur-xl shadow-lg shadow-black/50'
        : 'bg-transparent'

        } `}
      style={{ marginTop: '1rem' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ marginLeft: '5rem' }}>

        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Dumbbell className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-display text-white tracking-widest" >
              Amaan's<span className="text-orange-500">GYM & FITNESS</span>
            </span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-zinc-400 hover:text-orange-400 transition-colors font-medium tracking-wide uppercase relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full rounded-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href="#pricing"
            className="hidden lg:flex glow-btn items-center gap-2 px-6 py-2.5 rounded-lg border border-orange-500 text-orange-400 font-semibold text-sm tracking-wide hover:text-black transition-all duration-300"
          >
            <span>Join Now</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition - all duration - 300 overflow - hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } `}
      >
        <div className="bg-[#111111]/98 backdrop-blur-xl border-t border-zinc-800 px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-zinc-300 hover:text-orange-400 transition-colors font-medium py-2 border-b border-zinc-800/50 uppercase tracking-wide text-sm"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={() => setIsOpen(false)}
            className="block mt-4 text-center px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold rounded-lg tracking-wide"
          >
            Join Now
          </a>
        </div>
      </div>
    </nav>
  );
}

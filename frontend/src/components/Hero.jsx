import { motion as Motion } from 'framer-motion'
import { ArrowDownRight, ArrowRight, Check } from 'lucide-react'

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="hero-section">
      <div className="hero-layout">
        <Motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className="hero-kicker"><span /> AMAAN’S GYM & FITNESS</span>
          <h1>Train Stronger.<br /><span>Live Healthier.</span></h1>
          <p>Your fitness journey starts here. Find expert coaching, a welcoming community, and a training plan that works for you.</p>
          <div className="hero-actions">
            <button type="button" className="button button-primary" onClick={() => scrollTo('contact')}>Join Now <ArrowRight size={17} /></button>
            <button type="button" className="button button-secondary" onClick={() => scrollTo('classes')}>Explore Programs <ArrowDownRight size={17} /></button>
          </div>
          <div className="hero-points">
            <span><Check size={15} /> Men’s fitness</span>
            <span><Check size={15} /> Ladies’ fitness</span>
            <span><Check size={15} /> All experience levels</span>
          </div>
        </Motion.div>
        <Motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=85"
            alt="Bright, modern gym floor with strength and cardio equipment"
            fetchPriority="high"
          />
          <div className="hero-visual-caption">
            <span className="hero-caption-mark">A</span>
            <span><strong>Move with purpose.</strong><small>Feel good in your own strength.</small></span>
          </div>
          <span className="hero-visual-index">01 — YOUR NEW START</span>
        </Motion.div>
      </div>
      <div className="hero-bottom-line"><span>TRAIN WITH INTENTION</span><i /><span>MOVE WITH CONFIDENCE</span><i /><span>LIVE A LITTLE STRONGER</span></div>
    </section>
  )
}

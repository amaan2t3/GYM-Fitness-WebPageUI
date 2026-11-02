import { motion as Motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'

const reasons = [
  'Coaching that meets you where you are',
  'Dedicated programs for men and ladies',
  'A welcoming space at every fitness level',
]

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="section-inner about-layout">
        <Motion.div
          className="about-visual"
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=85"
            alt="Welcoming gym floor with room to train"
            loading="lazy"
          />
          <div className="about-photo-note"><span>01</span><strong>A space for your kind of strong.</strong></div>
        </Motion.div>
        <Motion.div
          className="about-copy"
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">A better kind of gym</span>
          <h2>Find your strength.<br /><span className="accent">Feel at home.</span></h2>
          <p>Amaan’s Gym & Fitness is for people who want to feel stronger, move better, and build healthy habits that last. We welcome men and ladies with expert guidance and a supportive community.</p>
          <ul className="about-reasons">{reasons.map((reason) => <li key={reason}><Check size={16} />{reason}</li>)}</ul>
          <a className="text-link" href="#classes">Find your program <ArrowUpRight size={16} /></a>
        </Motion.div>
      </div>
    </section>
  )
}

import { ArrowUpRight, Dumbbell, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="footer-logo" href="#home">
              <span className="footer-mark"><Dumbbell size={21} /></span>
              <span>AMAAN’S<small>GYM & FITNESS</small></span>
            </a>
            <p>A welcoming place to get stronger, feel healthier, and find your people.</p>
            <div className="footer-socials" aria-label="Social media">
              <span aria-hidden="true"><Instagram size={17} /></span>
              <span aria-hidden="true"><Facebook size={17} /></span>
            </div>
          </div>
          <div className="footer-column">
            <h2>Explore</h2>
            <a href="#about">Our approach</a>
            <a href="#mensfitness">Men’s fitness</a>
            <a href="#ladiesfitness">Ladies’ fitness</a>
            <a href="#trainers">Our coaches</a>
            <a href="#pricing">Membership</a>
          </div>
          <div className="footer-column footer-contact">
            <h2>Come say hello</h2>
            <a href="https://maps.google.com/?q=Amaan%27s+Gym+Main+Street" target="_blank" rel="noreferrer"><MapPin size={16} />Main Street, Metropolis</a>
            <a href="tel:+923455555555"><Phone size={16} />+92 345 5555555</a>
            <a href="mailto:amaangym@gmail.com"><Mail size={16} />amaangym@gmail.com</a>
            <a href="#contact" className="footer-contact-link">Plan your first visit <ArrowUpRight size={15} /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Amaan’s Gym & Fitness. All rights reserved.</span>
          <a href="/admin">Admin portal</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

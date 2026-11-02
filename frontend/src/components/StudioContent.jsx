import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowRight, Check, Clock3, Dumbbell, Instagram, MapPin, Phone, Send, Sparkles } from 'lucide-react'
import { defaultClasses, defaultPlans, defaultTrainers, getPublicCollection, submitInquiry } from '../lib/gymData'

function SectionHeading({ eyebrow, title, copy, light = false }) {
  return (
    <div className={`section-heading${light ? ' section-heading-light' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

function usePublicContent(table, fallback) {
  const [items, setItems] = useState(fallback)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    getPublicCollection(table, fallback)
      .then((rows) => {
        if (active) setItems(rows)
      })
      .catch((requestError) => {
        if (active) setError(`Could not load ${table.replace('_', ' ')}: ${requestError.message}`)
      })
    return () => { active = false }
  }, [table, fallback])

  return { items, error }
}

function ContentError({ children }) {
  return children ? <p className="inline-error" role="status">{children}</p> : null
}

function ProgramTrack({ id, variant, label, title, copy, items }) {
  if (!items.length) return null

  return (
    <section id={id} className={`program-track program-track-${variant}`}>
      <div className="program-track-heading">
        <div>
          <span className="program-track-label">{label}</span>
          <h3>{title}</h3>
        </div>
        <p>{copy}</p>
      </div>
      <div className="program-grid">
        {items.map((item) => (
          <article className="program-card" key={item.id}>
            <div className="program-image-wrap">
              <img src={item.image_url} alt="" loading="lazy" />
              <span className="program-badge">{item.badge || item.intensity}</span>
            </div>
            <div className="program-copy">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <div className="program-meta"><Clock3 size={15} /> {item.duration} <span aria-hidden="true">·</span> {item.schedule}</div>
              <a href="#contact" className="text-link">Explore program <ArrowRight size={15} /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function ClassesSection() {
  const { items, error } = usePublicContent('classes', defaultClasses)
  const mensPrograms = items.filter((item) => item.category === 'mens')
  const ladiesPrograms = items.filter((item) => item.category === 'ladies')
  const sharedPrograms = items.filter((item) => !['mens', 'ladies'].includes(item.category))

  return (
    <section id="classes" className="section programs-section">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Find your fit"
          title={<>Training for <span className="accent">every body.</span></>}
          copy="Expert coaching and purpose-built programs for men and ladies, at every stage of your fitness journey."
        />
        <ContentError>{error}</ContentError>
        <ProgramTrack id="mensfitness" variant="mens" label="For men" title="Strength starts here." copy="Bodybuilding, strength training, and athletic conditioning built around your goals." items={mensPrograms} />
        <ProgramTrack id="ladiesfitness" variant="ladies" label="For ladies" title="Strong looks different on everyone." copy="Strength, wellness, and movement in a welcoming space made for your progress." items={ladiesPrograms} />
        <ProgramTrack id="allfitness" variant="shared" label="Train together" title="Made for everyone." copy="Flexible coaching and training options for every member." items={sharedPrograms} />
      </div>
    </section>
  )
}

export function TrainersSection() {
  const { items, error } = usePublicContent('trainers', defaultTrainers)

  return (
    <section id="trainers" className="section section-paper">
      <div className="section-inner">
        <SectionHeading
          eyebrow="People who make the difference"
          title={<>Meet your <span className="accent">coaching team.</span></>}
          copy="Experienced, encouraging coaches who make every session personal and help you make progress that lasts."
        />
        <ContentError>{error}</ContentError>
        <div className="trainer-grid">
          {items.map((trainer, index) => (
            <article className="trainer-card" key={trainer.id}>
              <div className="trainer-photo">
                <img src={trainer.image_url} alt={trainer.name} loading="lazy" />
                <span className="trainer-number">COACH 0{index + 1}</span>
              </div>
              <div className="trainer-details">
                <div><h3>{trainer.name}</h3><span>{trainer.role}</span></div>
                {trainer.instagram_url && <a href={trainer.instagram_url} aria-label={`${trainer.name} on Instagram`}><Instagram size={17} /></a>}
              </div>
              <p className="trainer-experience">{trainer.experience}</p>
              <p>{trainer.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PricingSection() {
  const { items, error } = usePublicContent('membership_plans', defaultPlans)

  return (
    <section id="pricing" className="section pricing-section">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Memberships made simple"
          title={<>Make room for <span className="accent">your goals.</span></>}
          copy="Choose the support that fits your routine. Every membership welcomes men and ladies to train with confidence."
        />
        <ContentError>{error}</ContentError>
        <div className="pricing-grid">
          {items.map((plan) => (
            <article className={`price-card${plan.is_highlighted ? ' price-card-featured' : ''}`} key={plan.id}>
              {plan.is_highlighted && <span className="popular-tag"><Sparkles size={13} /> Member favourite</span>}
              <span className="price-label">{plan.name}</span>
              <p className="price-amount"><span>Rs.</span> {Number(plan.price).toLocaleString()}<small> / {plan.period}</small></p>
              <p className="price-note">Thoughtful coaching for a stronger everyday.</p>
              <ul>
                {(plan.features || []).map((feature) => <li key={feature}><Check size={16} /> {feature}</li>)}
              </ul>
              <a className={plan.is_highlighted ? 'button button-primary' : 'button button-outline'} href="#contact">
                Join {plan.name} <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [sending, setSending] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus({ type: '', message: '' })
    setSending(true)
    try {
      await submitInquiry(form)
      setForm({ name: '', email: '', message: '' })
      setStatus({ type: 'success', message: 'Thanks — your message is with our team. We’ll be in touch soon.' })
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'We could not send your message. Please try again.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="section-inner contact-layout">
        <div className="contact-copy">
          <span className="eyebrow">Your next chapter starts here</span>
          <h2>Train stronger.<br /><span className="accent">Live healthier.</span></h2>
          <p>Tell us what you’re working toward. We’ll help you find the right first step — no hard sell, just a good conversation.</p>
          <div className="contact-detail"><MapPin size={18} /><span>Main Street, Metropolis</span></div>
          <div className="contact-detail"><Phone size={18} /><a href="tel:+923455555555">+92 345 5555555</a></div>
          <div className="contact-detail"><Dumbbell size={18} /><span>Mon–Fri 5am–11pm · Weekends 7am–8pm</span></div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-heading"><span>LET’S TALK</span><Send size={18} /></div>
          <label>Name<input name="name" autoComplete="name" maxLength="100" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" /></label>
          <label>Email<input name="email" type="email" autoComplete="email" maxLength="254" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" /></label>
          <label>What are you looking for?<textarea name="message" rows="4" maxLength="3000" required value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="A free trial, class info, or just a hello..." /></label>
          {status.message && <p className={`form-message ${status.type}`} role="status">{status.message}</p>}
          <button type="submit" className="button button-primary" disabled={sending}>
            {sending ? 'Sending…' : 'Send a message'} <ArrowDownRight size={17} />
          </button>
        </form>
      </div>
    </section>
  )
}

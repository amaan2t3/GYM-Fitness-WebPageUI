import BMICalculator from './BMICalculator'
import WorkoutTracker from './WorkoutTracker'

export default function ToolsSection() {
  return (
    <section id="tools" className="section tools-section">
      <div className="section-inner">
        <div className="section-heading">
          <span className="eyebrow">Your training toolkit</span>
          <h2>Small steps. <span className="accent">Real progress.</span></h2>
          <p>Get a quick baseline and keep your next workout moving.</p>
        </div>
        <div className="tools-grid"><BMICalculator /><WorkoutTracker /></div>
      </div>
    </section>
  )
}

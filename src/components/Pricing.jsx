import React from 'react'
import { motion } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'

const plans = [
  {
    name: 'Basic Plan',
    price: 1500,
    period: 'month',
    features: ['Gym Access', 'Locker Facility'],
    popular: false
  },
  {
    name: 'Premium Plan',
    price: 3000,
    period: 'month',
    features: ['Personal Trainer', 'Diet Plan', 'All Classes'],
    popular: true
  },
  {
    name: 'Elite Plan',
    price: 5000,
    period: 'month',
    features: ['VIP Support', 'Custom Workout Plans', 'Unlimited Access'],
    popular: false
  }
]

const Pricing = () => {
  const handleJoin = (planName) => {
    console.log(`Joining ${planName} plan`);
  }

  return (
    <section id="pricing" className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Membership Plans</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-card rounded-2xl p-8 border transition-all relative ${plan.popular ? 'border-primary shadow-lg shadow-primary/20' : 'border-gray-800'
                }`}
            >
              {plan.popular && (
                <div className="mt-3 absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-dark px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}
              <h3 className=" text-orange-500 text-2xl font-bold text-center mb-4">{plan.name}</h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold">Rs. {plan.price.toLocaleString()}</span>
                <span className="text-gray-400">/{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-300">
                    <FaCheck className="text-primary text-sm" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-full font-semibold transition-all ${plan.popular
                ? 'bg-primary hover:bg-orange-500 text-dark'
                : 'border-2 border-primary text-primary hover:bg-primary hover:text-dark'
                }`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )

}
export default Pricing
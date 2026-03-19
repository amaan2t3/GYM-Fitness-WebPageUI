import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Rocket } from 'lucide-react';

const plans = [
  {
    icon: Zap,
    name: 'Starter',
    price: 1200,
    period: '/month',
    description: 'Perfect for those just starting their fitness journey.',
    features: [
      'Access to gym floor',
      'Basic cardio machines',
      'Locker & shower access',
      '2 group classes/month',
      'Fitness assessment',
    ],
    notIncluded: ['Personal trainer sessions', 'Nutrition consultation', 'Guest passes'],
    gradient: 'from-zinc-700 to-zinc-600',
    cta: 'Get Started',
    popular: false,
  },
  {
    icon: Crown,
    name: 'Pro',
    price: 2000,
    period: '/month',
    description: 'Our most popular plan for serious fitness enthusiasts.',
    features: [
      'Full gym access (24/7)',
      'Unlimited group classes',
      '4 personal trainer sessions',
      'Nutrition consultation',
      'Locker & towel service',
      '2 guest passes/month',
      'Priority booking',
    ],
    notIncluded: ['Spa & recovery suite'],
    gradient: 'from-orange-500 to-yellow-400',
    cta: 'Start Pro',
    popular: true,
  },
  {
    icon: Rocket,
    name: 'Elite',
    price: 3500,
    period: '/month',
    description: 'The ultimate all-inclusive package for peak performance.',
    features: [
      'Everything in Pro',
      'Unlimited personal training',
      'Spa & recovery suite access',
      'Body composition tracking',
      'Custom meal plans',
      'Unlimited guest passes',
      'Dedicated coach',
      'VIP member events',
    ],
    notIncluded: [],
    gradient: 'from-purple-600 to-indigo-600',
    cta: 'Go Elite',
    popular: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <section id="pricing" className="bg-[#0f0f0f] py-20 px-4">
        <div className='flex flex-col items-center mb-10'>
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-4 block">
            Membership Plans
          </span>

          <h2 className="text-4xl sm:text-5xl text-white mb-6">
            CHOOSE YOUR <span className="text-orange-500">PLAN</span>
          </h2>

          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            No contracts, no hidden fees. Start your transformation today.
          </p>
        </div>

        <div>

        </div>
//////////////////////
        <div className='flex justify-center'>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
              {plans.map((plan, i) => {
                const Icon = plan.icon;
                const displayPrice = annual ? Math.round(plan.price * 0.8) : plan.price;

                return (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className={`flex flex-col justify-between rounded-2xl p-7 border transition-all duration-300 ${plan.popular
                      ? 'bg-[#1a1a1a] border-orange-500 scale-105 shadow-xl'
                      : 'bg-[#171717] border-zinc-800 hover:border-zinc-600'
                      }`}
                  >
                    <div>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-5`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      <h3 className="text-2xl text-white">{plan.name}</h3>
                      <p className="text-zinc-500 text-sm mt-1 mb-5">{plan.description}</p>

                      <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-3xl text-white">Rs. {displayPrice}</span>
                        <span className="text-zinc-500 text-sm">{plan.period}</span>
                      </div>

                      <button
                        className={`w-full py-3 rounded-xl font-bold text-sm mb-6 ${plan.popular
                          ? 'bg-orange-500 text-black hover:bg-orange-400'
                          : 'border border-zinc-700 text-zinc-300 hover:border-orange-500 hover:text-orange-400'
                          }`}
                      >
                        {plan.cta}
                      </button>

                      <ul className="space-y-3">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                            <Check className="w-4 h-4 text-green-400" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Footer Text */}

      </section>
      <div className='flex justify-center items-center'>
        <p className="text-center text-zinc-500 text-sm mt-12">
          All plans include a 7-day free trial. Cancel anytime.
        </p>
      </div>

    </>

  );
}

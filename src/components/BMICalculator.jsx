import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (!w || !h || h <= 0) return;
    const result = (w / (h * h)).toFixed(1);
    setBmi(result);
    if (result < 18.5) setCategory({ label: 'Underweight', color: 'text-blue-400', bar: 'bg-blue-400', pct: 15 });
    else if (result < 25) setCategory({ label: 'Normal Weight', color: 'text-green-400', bar: 'bg-green-400', pct: 40 });
    else if (result < 30) setCategory({ label: 'Overweight', color: 'text-yellow-400', bar: 'bg-yellow-400', pct: 65 });
    else setCategory({ label: 'Obese', color: 'text-red-400', bar: 'bg-red-400', pct: 90 });
  };

  const reset = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory('');
  };

  const tips = {
    Underweight: ['Increase calorie intake', 'Focus on strength training', 'Add protein-rich foods'],
    'Normal Weight': ['Maintain current routine', 'Stay active daily', 'Keep balanced nutrition'],
    Overweight: ['Add cardio sessions', 'Reduce processed foods', 'Try HIIT training'],
    Obese: ['Consult a trainer', 'Start with low-impact cardio', 'Track daily calories'],
  };

  return (
    <section id="bmi" className="flex justify-center items-center section-padding  bg-[#0f0f0f]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-4 block">
            Health Tool
          </span>
          <h2 className="font-display text-5xl sm:text-6xl text-white mb-4">
            BMI <span className="gradient-text">CALCULATOR</span>
          </h2>
          <p className="text-zinc-400 text-lg">Check your Body Mass Index and get personalized fitness tips.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className=" flex justify-center items-center bg-[#171717] border border-zinc-800 rounded-3xl p-8 md:p-12  "
        >
          <div className=" flex justify-center items-center grid md:grid-cols-2 gap-10 ">
            {/* Inputs */}
            <div className="space-y-10">
              <div>
                <label className="block  text-white text-sm font-medium mb-5 py-5">Weight (kg)</label>
                <input
                  type="number"
                  placeholder="e.g. 75"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-[#0f0f0f] border border-zinc-700 rounded-xl p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors text-lg"
                  style={{ marginTop: '1rem' }}

                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-5 py-5">Height (cm)</label>
                <input
                  type="number"
                  placeholder="e.g. 175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full bg-[#0f0f0f] border border-zinc-700 rounded-xl p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors text-lg"
                  style={{ marginTop: '1rem' }}

                />
              </div>
              <div className="flex gap-3">

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={calculateBMI}
                  className="flex-1 py-4 mt-6 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold rounded-xl text-lg tracking-wide"
                  style={{ marginTop: '1rem' }}
                >
                  Calculate BMI
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={reset}
                  className="px-6 py-4 border border-zinc-700 text-zinc-400 font-semibold rounded-xl hover:border-zinc-500 transition-colors"
                  style={{ marginTop: '1rem' }}

                >
                  Reset
                </motion.button>
              </div>
            </div>

            {/* Result */}
            <div className="flex items-center justify-center">
              {bmi ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center w-full"
                >
                  <div className="w-36 h-36 rounded-full border-4 border-orange-500/30 bg-[#0f0f0f] flex flex-col items-center justify-center mx-auto mb-6">
                    <span className="font-display text-5xl text-white">{bmi}</span>
                    <span className="text-zinc-500 text-xs uppercase tracking-wide">BMI</span>
                  </div>
                  <div className={`font-display text-2xl ${category.color} mb-4`}>{category.label}</div>
                  <div className="w-full bg-zinc-800 rounded-full h-2 mb-6">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${category.pct}%` }}
                      transition={{ duration: 0.8 }}
                      className={`h-2 rounded-full ${category.bar}`}
                    />
                  </div>
                  <div className="text-left space-y-2">
                    <p className="text-zinc-400 text-xs uppercase tracking-wide font-semibold mb-3 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-orange-400" /> Recommendations
                    </p>
                    {tips[category.label]?.map((tip) => (
                      <div key={tip} className="flex items-center gap-2 text-sm text-zinc-400">
                        <span className="w-1 h-1 rounded-full bg-orange-500" />
                        {tip}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="text-center text-zinc-600">
                  <Activity className="w-20 h-20 mx-auto mb-4 opacity-30" />
                  <p className="text-sm">Enter your details to calculate your BMI</p>
                </div>
              )}
            </div>
          </div>

          {/* BMI Scale */}
          <div className="mt-8 pt-8 border-t border-zinc-800 grid grid-cols-4 gap-2 text-center text-xs">
            {[
              { label: 'Underweight', range: '< 18.5', color: 'bg-blue-400' },
              { label: 'Normal', range: '18.5–24.9', color: 'bg-green-400' },
              { label: 'Overweight', range: '25–29.9', color: 'bg-yellow-400' },
              { label: 'Obese', range: '≥ 30', color: 'bg-red-400' },
            ].map((item) => (
              <div key={item.label}>
                <div className={`h-1.5 rounded-full ${item.color} mb-2`} />
                <div className="text-zinc-400">{item.label}</div>
                <div className="text-zinc-600">{item.range}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

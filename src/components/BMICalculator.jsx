import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const BMICalculator = () => {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [category, setCategory] = useState('')
  const [history, setHistory] = useState([])

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = parseFloat(height) / 100
      const weightInKg = parseFloat(weight)
      const bmiValue = weightInKg / (heightInMeters * heightInMeters)
      setBmi(bmiValue.toFixed(1))

      let categoryText = ''
      let color = ''
      if (bmiValue < 18.5) {
        categoryText = 'Underweight'
        color = '#60a5fa'
      } else if (bmiValue < 25) {
        categoryText = 'Normal weight'
        color = '#4ade80'
      } else if (bmiValue < 30) {
        categoryText = 'Overweight'
        color = '#fbbf24'
      } else {
        categoryText = 'Obese'
        color = '#f87171'
      }
      setCategory({ text: categoryText, color })

      // Save to history
      const newEntry = {
        date: new Date().toLocaleDateString(),
        bmi: bmiValue.toFixed(1),
        category: categoryText
      }
      setHistory([newEntry, ...history].slice(0, 7))
    }
  }

  const getBMIColor = (bmiValue) => {
    if (bmiValue < 18.5) return '#60a5fa'
    if (bmiValue < 25) return '#4ade80'
    if (bmiValue < 30) return '#fbbf24'
    return '#f87171'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card rounded-2xl p-6 shadow-xl"
      id="tools"
    >
      <h3 className="text-2xl font-bold mb-2 gradient-text">BMI Calculator</h3>
      <p className="text-gray-400 mb-6">Calculate your Body Mass Index and track your progress</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full bg-dark border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary transition-colors"
            placeholder="Enter your height"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full bg-dark border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary transition-colors"
            placeholder="Enter your weight"
          />
        </div>
        <div className="md:col-span-2">
          <button
            onClick={calculateBMI}
            className="w-full bg-primary hover:bg-orange-500 text-dark py-3 rounded-lg font-semibold transition-all"
          >
            Calculate BMI
          </button>
        </div>
      </div>

      {bmi && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-dark rounded-lg p-4 mb-6"
        >
          <div className="text-center">
            <p className="text-gray-400 text-sm">Your BMI</p>
            <p className="text-5xl font-bold" style={{ color: category.color }}>{bmi}</p>
            <p className="text-lg mt-2" style={{ color: category.color }}>{category.text}</p>
          </div>

          {/* BMI Scale */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (parseFloat(bmi) / 40) * 100)}%`,
                  backgroundColor: getBMIColor(parseFloat(bmi))
                }}
              ></div>
            </div>
          </div>
        </motion.div>
      )}

      {/* BMI History Chart */}
      {history.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-3">BMI History</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1d22', border: 'none', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="bmi" stroke="#f2613a" strokeWidth={2} dot={{ fill: '#f2613a' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  )
}

export default BMICalculator
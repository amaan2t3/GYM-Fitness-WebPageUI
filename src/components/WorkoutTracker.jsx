import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlus, FaTrash, FaCheck, FaClock, FaFire } from 'react-icons/fa'

const WorkoutTracker = () => {
    const [workouts, setWorkouts] = useState(() => {
        const savedWorkouts = localStorage.getItem('workouts')
        return savedWorkouts ? JSON.parse(savedWorkouts) : []
    })
    const [newWorkout, setNewWorkout] = useState({ name: '', sets: '', reps: '', weight: '' })
    const [activeTab, setActiveTab] = useState('today')
    const [calories, setCalories] = useState(0)

    useEffect(() => {
        // Save workouts to localStorage
        localStorage.setItem('workouts', JSON.stringify(workouts))
        // Calculate total calories burned (simple calculation)
        const totalCalories = workouts.reduce((sum, w) => {
            const sets = parseInt(w.sets) || 0
            const reps = parseInt(w.reps) || 0
            const weight = parseFloat(w.weight) || 0
            return sum + (sets * reps * weight * 0.01) // Simple calorie estimation
        }, 0)
        setCalories(totalCalories)
    }, [workouts])

    const addWorkout = () => {
        if (newWorkout.name && newWorkout.sets && newWorkout.reps) {
            const workout = {
                id: Date.now(),
                ...newWorkout,
                date: new Date().toISOString(),
                completed: false
            }
            setWorkouts([workout, ...workouts])
            setNewWorkout({ name: '', sets: '', reps: '', weight: '' })
        }
    }

    const toggleComplete = (id) => {
        setWorkouts(workouts.map(w =>
            w.id === id ? { ...w, completed: !w.completed } : w
        ))
    }

    const deleteWorkout = (id) => {
        setWorkouts(workouts.filter(w => w.id !== id))
    }

    const todayWorkouts = workouts.filter(w => {
        const today = new Date().toDateString()
        const workoutDate = new Date(w.date).toDateString()
        return workoutDate === today
    })

    const allWorkouts = workouts

    const displayedWorkouts = activeTab === 'today' ? todayWorkouts : allWorkouts

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-6 shadow-xl"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h3 className="text-2xl font-bold gradient-text">Workout Tracker</h3>
                <div className="flex items-center gap-2 bg-dark px-3 py-2 rounded-lg">
                    <FaFire className="text-orange-500" />
                    <span className="font-bold">{Math.round(calories)}</span>
                    <span className="text-xs text-gray-400">cal burned</span>
                </div>
            </div>

            {/* Add Workout Form */}
            <div className="bg-dark rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <input
                        type="text"
                        placeholder="Exercise name"
                        value={newWorkout.name}
                        onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                        className="bg-card border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                    />
                    <input
                        type="number"
                        placeholder="Sets"
                        value={newWorkout.sets}
                        onChange={(e) => setNewWorkout({ ...newWorkout, sets: e.target.value })}
                        className="bg-card border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                    />
                    <input
                        type="number"
                        placeholder="Reps"
                        value={newWorkout.reps}
                        onChange={(e) => setNewWorkout({ ...newWorkout, reps: e.target.value })}
                        className="bg-card border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                    />
                    <input
                        type="number"
                        placeholder="Weight (kg)"
                        value={newWorkout.weight}
                        onChange={(e) => setNewWorkout({ ...newWorkout, weight: e.target.value })}
                        className="bg-card border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                    />
                </div>
                <button
                    onClick={addWorkout}
                    className="w-full bg-primary hover:bg-orange-500 text-dark py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                    <FaPlus /> Add Exercise
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-4">
                {[
                    { id: 'today', label: "Today's Workout", icon: FaClock },
                    { id: 'all', label: 'All Exercises', icon: FaCheck }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === tab.id
                                ? 'bg-primary text-dark'
                                : 'bg-dark text-gray-400 hover:text-gray-200'
                            }`}
                    >
                        <tab.icon className="text-sm" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Workout List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
                <AnimatePresence>
                    {displayedWorkouts.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">No workouts logged yet. Add your first exercise!</p>
                    ) : (
                        displayedWorkouts.map((workout) => (
                            <motion.div
                                key={workout.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className={`bg-dark rounded-lg p-4 flex items-center justify-between transition-all ${workout.completed ? 'opacity-60' : ''
                                    }`}
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className={`font-semibold ${workout.completed ? 'line-through' : ''}`}>
                                            {workout.name}
                                        </h4>
                                        {workout.completed && <FaCheck className="text-green-500 text-xs" />}
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        {workout.sets} sets × {workout.reps} reps
                                        {workout.weight && ` @ ${workout.weight}kg`}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {new Date(workout.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleComplete(workout.id)}
                                        className="p-2 hover:bg-green-500/20 rounded-lg transition-colors"
                                    >
                                        <FaCheck className={`${workout.completed ? 'text-green-500' : 'text-gray-500'}`} />
                                    </button>
                                    <button
                                        onClick={() => deleteWorkout(workout.id)}
                                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                                    >
                                        <FaTrash className="text-red-500" />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

export default WorkoutTracker
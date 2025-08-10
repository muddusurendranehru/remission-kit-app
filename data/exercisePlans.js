// data/exercisePlans.js
//
// Exports an array of 90 daily exercise routines designed to burn between
// 500 and 1 000 calories per day.  The routines cycle through seven
// different workouts across each week.  Intensity and activities are
// balanced to be appropriate for beginners while allowing increased
// challenge over time.

const routines = [
  {
    name: 'Cardio & Walk',
    description: '45‑minute brisk walk (approx. 6 000–8 000 steps) plus 15‑minute stretching',
    calories: 600
  },
  {
    name: 'Yoga & Mobility',
    description: '60‑minute yoga session focusing on flexibility and breathing',
    calories: 500
  },
  {
    name: 'Strength Training',
    description: '30‑minute body‑weight exercises (squats, lunges, push‑ups) and 20‑minute core workout',
    calories: 700
  },
  {
    name: 'High‑Intensity Interval Training',
    description: '20 minutes of HIIT (e.g., jumping jacks, burpees) plus 20‑minute walk',
    calories: 800
  },
  {
    name: 'Cycling',
    description: '45‑minute outdoor or stationary cycling at moderate pace',
    calories: 650
  },
  {
    name: 'Swimming / Water Aerobics',
    description: '30‑minute swimming or low‑impact water aerobics session',
    calories: 550
  },
  {
    name: 'Restorative Activity',
    description: '30‑minute mindful walking or tai chi and 15‑minute meditation',
    calories: 500
  }
];

// Generate a 90‑day plan by cycling through the above routines.
const exercisePlans = [];
for (let i = 0; i < 90; i++) {
  const routine = routines[i % routines.length];
  exercisePlans.push({
    day: i + 1,
    routine: routine.name,
    description: routine.description,
    estimatedCalories: routine.calories
  });
}

module.exports = exercisePlans;

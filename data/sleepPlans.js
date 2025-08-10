// data/sleepPlans.js
//
// A 90‑day sleep improvement schedule.  Each entry includes a tip aimed at
// improving sleep hygiene and aligning with circadian rhythms.  The tips
// repeat weekly and encourage consistent routines.

const tips = [
  'Aim for 7–8 hours of sleep each night; go to bed and wake up at the same time.',
  'Avoid caffeine after 4 PM and have a light dinner before 8 PM.',
  'Limit screen time 1 hour before bed; read a book or practice meditation instead.',
  'Create a dark, cool and quiet bedroom environment to promote deep sleep.',
  'Engage in 10 minutes of deep breathing exercises before bedtime.',
  'Take a short walk after dinner to aid digestion and support sleep.',
  'Keep a journal by your bed; jot down worries to clear your mind before sleeping.'
];

const sleepPlans = [];
for (let i = 0; i < 90; i++) {
  const tip = tips[i % tips.length];
  sleepPlans.push({
    day: i + 1,
    recommendation: tip
  });
}

module.exports = sleepPlans;

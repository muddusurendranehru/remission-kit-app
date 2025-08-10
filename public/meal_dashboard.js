// meal_dashboard.js
// This script renders the daily meal cards and the progress charts on the web page.

import { registerPatient, loginWithPhone, getTodaysMeals, getProgressRecords, recordProgress } from './supabase_integration.js';

// Example: attach event listeners to registration form
const regForm = document.getElementById('registration-form');
if (regForm) {
  regForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = regForm.querySelector('input[name="name"]').value;
    const phone = regForm.querySelector('input[name="phone"]').value;
    const region = regForm.querySelector('select[name="region"]').value;
    try {
      await registerPatient(name, phone, region);
      alert('Registration successful! Please verify OTP sent to your phone.');
    } catch (err) {
      alert('Registration failed: ' + err.message);
    }
  });
}

// Load and render meals
async function renderMeals() {
  const mealContainer = document.getElementById('meal-container');
  if (!mealContainer) return;
  try {
    const meals = await getTodaysMeals();
    mealContainer.innerHTML = '';
    meals.forEach((meal) => {
      const card = document.createElement('div');
      card.className = 'meal-card';
      card.innerHTML = `
        <h3>${meal.meal_type.toUpperCase()}: ${meal.meal_name}</h3>
        <p>Calories: ${meal.calories}</p>
        <p>Carbs: ${meal.carbs_g}g | Protein: ${meal.protein_g}g | Fat: ${meal.fat_g}g | Fiber: ${meal.fiber_g}g</p>
        <a href="${meal.recipe_url}" target="_blank">Recipe</a>
      `;
      mealContainer.appendChild(card);
    });
  } catch (err) {
    console.error(err);
  }
}

// Render progress chart using Chart.js
async function renderProgressChart() {
  const ctx = document.getElementById('progress-chart').getContext('2d');
  const records = await getProgressRecords();
  const dates = records.map((r) => r.record_date);
  const weights = records.map((r) => r.weight_kg);
  const fasting = records.map((r) => r.fasting_blood_sugar);
  const post = records.map((r) => r.postprandial_blood_sugar);
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        { label: 'Weight (kg)', data: weights, borderColor: 'blue', fill: false },
        { label: 'Fasting sugar', data: fasting, borderColor: 'green', fill: false },
        { label: 'Postprandial sugar', data: post, borderColor: 'red', fill: false }
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}

// Call the functions after login
renderMeals();
renderProgressChart();

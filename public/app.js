// public/app.js
//
// Front‑end logic for the remission kit. Handles registration, phone number
// formatting, fetching daily plans/exercises/sleep tips from the API and
// updating the UI.  Designed to be mobile‑first and accessible.

document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const form = document.getElementById('registration-form');
  const messageEl = document.getElementById('registration-message');
  const planSection = document.getElementById('daily-plan');
  const daySpan = document.getElementById('current-day');
  const vegStyleEl = document.getElementById('veg-style');
  const vegMealsEl = document.getElementById('veg-meals');
  const nonVegStyleEl = document.getElementById('nonveg-style');
  const nonVegMealsEl = document.getElementById('nonveg-meals');
  const exerciseDescEl = document.getElementById('exercise-desc');
  const sleepTipEl = document.getElementById('sleep-tip');

  let currentDay = 1;

  async function loadDay(day) {
    try {
      // Fetch meal plan
      const planRes = await fetch(`/api/plan/${day}`);
      const planData = await planRes.json();
      // Fetch exercise routine
      const exRes = await fetch(`/api/exercise/${day}`);
      const exData = await exRes.json();
      // Fetch sleep tip
      const sleepRes = await fetch(`/api/sleep/${day}`);
      const sleepData = await sleepRes.json();

      // Update UI
      daySpan.textContent = day;
      // vegetarian
      vegStyleEl.textContent = planData.vegetarian.style;
      vegMealsEl.innerHTML = '';
      planData.vegetarian.meals.forEach((meal) => {
        const li = document.createElement('li');
        li.textContent = `${meal.name}: ${meal.recipe} (${meal.calories} cal)`;
        vegMealsEl.appendChild(li);
      });
      // non‑vegetarian
      nonVegStyleEl.textContent = planData.nonVegetarian.style;
      nonVegMealsEl.innerHTML = '';
      planData.nonVegetarian.meals.forEach((meal) => {
        const li = document.createElement('li');
        li.textContent = `${meal.name}: ${meal.recipe} (${meal.calories} cal)`;
        nonVegMealsEl.appendChild(li);
      });
      // exercise
      exerciseDescEl.textContent = `${exData.routine}: ${exData.description} (≈${exData.estimatedCalories} cal burned)`;
      // sleep
      sleepTipEl.textContent = sleepData.recommendation;

      planSection.classList.remove('hidden');
    } catch (err) {
      console.error(err);
      messageEl.textContent = 'Failed to load daily plan. Please try again later.';
    }
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      messageEl.textContent = '';
      const name = document.getElementById('name').value.trim();
      let phone = document.getElementById('phone').value.replace(/\s+/g, '');
      // Normalise phone number: if it does not start with +91, prefix +91
      if (!phone.startsWith('+91')) {
        // remove any leading zeros
        phone = phone.replace(/^0+/, '');
        phone = '+91' + phone;
      }
      if (!/^[+]91[0-9]{10}$/.test(phone)) {
        messageEl.textContent = 'Please enter a valid 10‑digit Indian phone number.';
        return;
      }
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone })
        });
        const data = await res.json();
        if (data.error) {
          messageEl.textContent = data.error;
        } else {
          messageEl.textContent = 'Registration successful! Loading your day 1 plan…';
          currentDay = 1;
          await loadDay(currentDay);
        }
      } catch (err) {
        console.error(err);
        messageEl.textContent = 'An error occurred. Please try again later.';
      }
    });
  }
});

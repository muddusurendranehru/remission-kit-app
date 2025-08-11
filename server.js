// server.js
//
// Entry point for the 90‑Day Diabetes & Obesity Remission Kit.  This server
// uses Express to deliver static assets, provide simple API endpoints for
// meal plans, exercise routines and sleep recommendations, and register
// patients via Supabase.  All endpoints run on port 3018 by default.

require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// Load data
const mealPlans = require('./data/mealPlans');
const exercisePlans = require('./data/exercisePlans');
const sleepPlans = require('./data/sleepPlans');

const app = express();
const PORT = process.env.PORT || 3018;

app.use(cors());
app.use(express.json());
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Create Supabase client from environment variables.  The anonymous key is
// safe to expose when Row Level Security is enabled.  NEVER expose the
// service_role key on the client.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Register a new user
// Register a new user
// Register a new user
app.post('/api/register', async (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone number are required' });
  }
  try {
    const { data, error } = await supabase
      .from('patients')
      .insert([{ name, phone }]);
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Return the meal plan for a given day (1‑90)
app.get('/api/plan/:day', (req, res) => {
  const day = parseInt(req.params.day, 10);
  if (Number.isNaN(day) || day < 1 || day > mealPlans.length) {
    return res.status(400).json({ error: 'Day must be between 1 and 90' });
  }
  res.json(mealPlans[day - 1]);
});

// Return the exercise routine for a given day
app.get('/api/exercise/:day', (req, res) => {
  const day = parseInt(req.params.day, 10);
  if (Number.isNaN(day) || day < 1 || day > exercisePlans.length) {
    return res.status(400).json({ error: 'Day must be between 1 and 90' });
  }
  res.json(exercisePlans[day - 1]);
});

// Return the sleep recommendation for a given day
app.get('/api/sleep/:day', (req, res) => {
  const day = parseInt(req.params.day, 10);
  if (Number.isNaN(day) || day < 1 || day > sleepPlans.length) {
    return res.status(400).json({ error: 'Day must be between 1 and 90' });
  }
  res.json(sleepPlans[day - 1]);
});

// Fallback route: serve index.html for any other route (SPA behaviour)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Remission Kit server is running on port ${PORT}`);
});

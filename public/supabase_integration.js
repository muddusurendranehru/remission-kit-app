// supabase_integration.js
// This file shows how to initialize Supabase and add functions for authentication,
// patient registration, meal retrieval and progress tracking.

// Import the Supabase client (in a real project you would bundle via a build tool)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize Supabase
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Register a new patient
export async function registerPatient(name, phone, region) {
  // sign up user anonymously or via phone OTP
  const { user, error: authError } = await supabase.auth.signUp({
    phone: phone,
  });
  if (authError) throw authError;
  // insert into patients table
  const { error: dbError } = await supabase.from('patients').insert({
    id: user.id,
    name,
    phone,
    region,
    start_date: new Date().toISOString().split('T')[0],
  });
  if (dbError) throw dbError;
  return user;
}

// Log in using phone number (requires OTP)
export async function loginWithPhone(phone) {
  const { session, error } = await supabase.auth.signInWithOtp({
    phone,
  });
  if (error) throw error;
  return session;
}

// Fetch meal plans for a given day number (1‑90)
export async function getMealPlanForDay(dayNumber) {
  const { data, error } = await supabase
    .from('daily_meal_plans')
    .select('*')
    .eq('day_number', dayNumber)
    .order('meal_type');
  if (error) throw error;
  return data;
}

// Assign a meal plan to a patient on a specific day
export async function assignMealsToPatient(patientId, dayNumber) {
  // fetch meal plans for the day
  const meals = await getMealPlanForDay(dayNumber);
  const assignments = meals.map((meal) => ({
    patient_id: patientId,
    day_number: dayNumber,
    meal_plan_id: meal.id,
  }));
  const { error } = await supabase.from('patient_meal_assignments').insert(assignments);
  if (error) throw error;
}

// Retrieve today’s meal plan for the logged-in patient
export async function getTodaysMeals() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not logged in');
  // fetch patient record
  const { data: patient } = await supabase.from('patients').select('*').eq('id', user.id).single();
  const startDate = new Date(patient.start_date);
  const today = new Date();
  const diff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
  const dayNumber = ((diff - 1) % 90) + 1;
  // ensure assignment exists
  await assignMealsToPatient(patient.id, dayNumber);
  // fetch assigned meals with details
  const { data, error } = await supabase
    .from('patient_meal_assignments')
    .select('*, meal:daily_meal_plans(*)')
    .eq('patient_id', patient.id)
    .eq('day_number', dayNumber);
  if (error) throw error;
  return data.map(row => row.meal);
}

// Record a progress entry (weight and blood sugar)
export async function recordProgress(weightKg, fastingSugar, postprandialSugar) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not logged in');
  const { error } = await supabase.from('progress_tracking').insert({
    patient_id: user.id,
    record_date: new Date().toISOString().split('T')[0],
    weight_kg: weightKg,
    fasting_blood_sugar: fastingSugar,
    postprandial_blood_sugar: postprandialSugar,
  });
  if (error) throw error;
}

// Fetch progress records for the patient
export async function getProgressRecords() {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('progress_tracking')
    .select('record_date, weight_kg, fasting_blood_sugar, postprandial_blood_sugar')
    .eq('patient_id', user.id)
    .order('record_date');
  if (error) throw error;
  return data;
}

// data/mealPlans.js
//
// This module exports an array of 90 daily meal plans tailored to the
// Indian context. Each plan contains vegetarian and non‑vegetarian options
// structured into five meals that add up to approximately 1 500 calories.
// The dishes cycle through North and South Indian cuisine to provide
// variety across the programme.  For scalability you can replace or
// extend the underlying dish arrays.

const northVegBreakfast = [
  'Poha with peanuts and vegetables',
  'Besan chilla with mint chutney',
  'Vegetable upma with sambhar',
  'Masala oats with sprouts',
  'Whole‑wheat paratha with curd',
  'Methi thepla with pickle',
  'Aloo paratha (oil‑free) with low‑fat yogurt'
];

const southVegBreakfast = [
  'Idli with coconut chutney and sambhar',
  'Dosa with tomato chutney',
  'Rava upma with veggies',
  'Pongal with chutney',
  'Ragi dosa with chutney',
  'Uttapam with onion and tomato',
  'Appam with stew'
];

const northNonVegBreakfast = [
  'Egg white omelette with multigrain toast',
  'Chicken keema with roti',
  'Paneer (low fat) bhurji with toast',
  'Boiled eggs with sprouts salad',
  'Grilled fish with spinach',
  'Masala omelette with tomato salad',
  'Shakshuka with whole‑wheat bread'
];

const southNonVegBreakfast = [
  'Egg dosa with chutney',
  'Prawn upma',
  'Chicken idli (steamed with shredded chicken)',
  'Fish curry with appam',
  'Egg appam with stew',
  'Chicken uttapam',
  'Anchovy stir fry with idiyappam'
];

// Dishes for lunch and dinner.  Vegetarian lists include legumes and
// vegetables; non‑veg lists include lean meats or fish.  Snacks are
// intentionally light to maintain the 1 500‑calorie target.
const northVegMain = [
  'Dal tadka with brown rice and cucumber salad',
  'Rajma with roti and mixed vegetable sabzi',
  'Chickpea curry with jeera rice and salad',
  'Palak paneer (low fat) with roti',
  'Baingan bharta with jowar roti',
  'Mixed vegetable curry with paratha',
  'Sarson ka saag with makki roti'
];

const southVegMain = [
  'Sambhar with brown rice and cucumber raita',
  'Coconut curry with kodo millet',
  'Avial with red rice',
  'Kootu with steamed rice',
  'Drumstick curry with dosa',
  'Tomato pappu with rice',
  'Mixed veg kurma with chapathi'
];

const northNonVegMain = [
  'Grilled chicken with roti and salad',
  'Fish curry with brown rice',
  'Egg curry with quinoa',
  'Chicken tikka with roti',
  'Chicken stew with red rice',
  'Mutton rogan josh (lean) with millet roti',
  'Fish fry (shallow) with dal and rice'
];

const southNonVegMain = [
  'Chettinad chicken with dosa',
  'Fish molee with appam',
  'Prawn curry with steamed rice',
  'Chicken ghee roast with neer dosa',
  'Kerala fish curry with brown rice',
  'Egg curry with idiyappam',
  'Mutton sukka (lean) with ragi mudde'
];

const vegSnacks = [
  'Roasted chana',
  'Fresh fruit salad',
  'Low‑fat yogurt with cucumber',
  'Sprouts chaat',
  'Handful of nuts (almonds/walnuts)',
  'Vegetable soup',
  'Buttermilk'
];

const nonVegSnacks = [
  'Boiled egg with pepper',
  'Grilled fish bites',
  'Chicken salad (small portion)',
  'Egg white scramble',
  'Tuna salad lettuce cups',
  'Prawn skewers',
  'Paneer tikka (technically vegetarian but high protein)'
];

// Generate the 90‑day meal plan.  Each day alternates between North and South
// Indian cuisine.  Use modular arithmetic to cycle through the dish arrays.
const mealPlans = [];
for (let i = 0; i < 90; i++) {
  const isNorth = i % 2 === 0;
  const vegBreakfastList = isNorth ? northVegBreakfast : southVegBreakfast;
  const nonVegBreakfastList = isNorth ? northNonVegBreakfast : southNonVegBreakfast;
  const vegMainList = isNorth ? northVegMain : southVegMain;
  const nonVegMainList = isNorth ? northNonVegMain : southNonVegMain;
  const vegSnackList = vegSnacks;
  const nonVegSnackList = nonVegSnacks;

  const vegMeals = [
    {
      name: 'Breakfast',
      calories: 300,
      recipe: vegBreakfastList[i % vegBreakfastList.length]
    },
    {
      name: 'Mid‑Morning',
      calories: 150,
      recipe: 'Seasonal fruit (e.g., papaya, guava)'
    },
    {
      name: 'Lunch',
      calories: 400,
      recipe: vegMainList[i % vegMainList.length]
    },
    {
      name: 'Snack',
      calories: 150,
      recipe: vegSnackList[i % vegSnackList.length]
    },
    {
      name: 'Dinner',
      calories: 500,
      recipe: vegMainList[(i + 2) % vegMainList.length] // pick a different main dish for dinner
    }
  ];

  const nonVegMeals = [
    {
      name: 'Breakfast',
      calories: 350,
      recipe: nonVegBreakfastList[i % nonVegBreakfastList.length]
    },
    {
      name: 'Mid‑Morning',
      calories: 150,
      recipe: 'Seasonal fruit (e.g., watermelon, apple)'
    },
    {
      name: 'Lunch',
      calories: 450,
      recipe: nonVegMainList[i % nonVegMainList.length]
    },
    {
      name: 'Snack',
      calories: 150,
      recipe: nonVegSnackList[i % nonVegSnackList.length]
    },
    {
      name: 'Dinner',
      calories: 550,
      recipe: nonVegMainList[(i + 3) % nonVegMainList.length]
    }
  ];

  mealPlans.push({
    day: i + 1,
    vegetarian: {
      style: isNorth ? 'North Indian' : 'South Indian',
      meals: vegMeals
    },
    nonVegetarian: {
      style: isNorth ? 'North Indian' : 'South Indian',
      meals: nonVegMeals
    }
  });
}

module.exports = mealPlans;

// /routes/weather.js
const express = require('express');
const { fetchWeatherData, checkWeatherCache, updateWeatherCache } = require('../services/weatherService');

const router = express.Router();

router.get('/weather', checkWeatherCache, async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const weatherData = await fetchWeatherData(lat, lon);
    updateWeatherCache(weatherData);
    res.json(weatherData);
  } catch (error) {
    res.status(500).send('Error fetching weather data');
  }
});

module.exports = router;

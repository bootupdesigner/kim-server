// /services/weatherService.js
const axios = require('axios');

const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;
const CURRENT_WEATHER_URL = 'http://api.weatherstack.com/current';

let weatherCache = {
  data: null,
  timestamp: null,
};

const fetchWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(CURRENT_WEATHER_URL, {
      params: {
        access_key: WEATHERSTACK_API_KEY,
        query: `${lat},${lon}`,
        units: 'f',
      },
    });

    return {
      currentTempFahrenheit: response.data.current.temperature,
      minTempFahrenheit: response.data.current.temperature - 5,
      maxTempFahrenheit: response.data.current.temperature + 5,
      chanceOfRain: response.data.current.precip,
      location: response.data.location.name,
      weatherDescription: response.data.current.weather_descriptions[0],
      weatherIcon: response.data.current.weather_icons[0],
    };
  } catch (error) {
    throw new Error('Error fetching weather data');
  }
};

const checkWeatherCache = (req, res, next) => {
  const currentTime = Date.now();
  const cacheDuration = 3600000; // 1 hour

  if (weatherCache.data && weatherCache.timestamp && currentTime - weatherCache.timestamp < cacheDuration) {
    res.json(weatherCache.data);
  } else {
    next();
  }
};

const updateWeatherCache = (weatherData) => {
  weatherCache.data = weatherData;
  weatherCache.timestamp = Date.now();
};

module.exports = { fetchWeatherData, checkWeatherCache, updateWeatherCache };

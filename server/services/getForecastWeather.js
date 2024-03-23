// weatherService.js

const axios = require('axios');
const process = require('process');

const apiKey = process.env.OPENWEATHER_API_KEY;
const baseURL = 'https://api.openweathermap.org/data/2.5';

async function getForecastWeather(lat, lon, date) {
  try {
    const endpoint = `/forecast/?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await axios.get(`${baseURL}${endpoint}`);

    const forecasts = response.data.list;
    const currentDate = new Date(date);

    let temperatureRange = { min: Infinity, max: -Infinity };
    let feelsLikeRange = { min: Infinity, max: -Infinity };
    let sumTemperature = 0;
    let countTemperature = 0;
    let weatherSummary = {};
    let descriptionSummary = {};
    let rain = false;
    let snow = false;

    for (const forecast of forecasts) {
      const forecastTime = new Date(forecast.dt_txt);

      // Check if forecast is for the specified date and between current time and 5pm
      if (forecastTime.getDate() === currentDate.getDate() && forecastTime.getHours() >= currentDate.getHours() && forecastTime.getHours() <= 17) {
        // Update temperature range, feelsLike range, etc.
        // ... (same logic as before)
      }
    }

    // Calculate average temperature, generate weather description string, etc.
    // ... (same logic as before)

    return {
      temperatureRange,
      feelsLikeRange,
      averageTemperature,
      weatherSummary,
      descriptionSummary,
      rain,
      snow
    };
  } catch (error) {
    throw new Error('Error processing weather data');
  }
}

module.exports = { getForecastWeather };

const express = require('express');
const axios = require('axios');
const app = express();
const process = require('process');
require('dotenv').config();
const router = express.Router();

const apiKey = process.env.OPENWEATHER_API_KEY;
const baseURL = 'https://api.openweathermap.org/data/2.5';

router
  .route('/')
  .get(async (req, res) => {
    try {
      const { lat, lon } = req.query;      
      const endpoint = `/weather/?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const currentWeatherResponse = await axios.get(`${baseURL}${endpoint}`);

      const forecastEndpoint = `/forecast/?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const forecastResponse = await axios.get(`${baseURL}${forecastEndpoint}`);

      const currentWeather = currentWeatherResponse.data;
      const forecastData = forecastResponse.data;

      // Get current weather data
      const { main, weather } = currentWeather;
      const { temp } = main;
      const { description } = weather[0];

      // Get temperature range from 8 AM to 6 PM
      const temperatureRange = forecastData.list.reduce((acc, forecast) => {
        const forecastTime = new Date(forecast.dt * 1000);
        const hour = forecastTime.getHours();
        if (hour >= 8 && hour <= 18) {
          if (!acc.min || forecast.main.temp_min < acc.min) {
            acc.min = forecast.main.temp_min;
          }
          if (!acc.max || forecast.main.temp_max > acc.max) {
            acc.max = forecast.main.temp_max;
          }
        }
        return acc;
      }, {});

      // Get rain happens time and mainly condition
      const rainTimes = [];
      forecastData.list.forEach(forecast => {
        if (forecast.weather[0].main === 'Rain') {
          const time = new Date(forecast.dt * 1000);
          rainTimes.push(time.toLocaleString());
        }
      });

      res.json({
        currentWeather: {
          temperature: temp,
          description: description
        },
        temperatureRange: temperatureRange,
        rainTimes: rainTimes
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  });

module.exports = router;
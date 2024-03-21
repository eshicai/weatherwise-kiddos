const express = require('express');
const axios = require('axios');
const app = express();
const process = require('process');
require('dotenv').config();
const router = express.Router();
const { getClothingFromTemperature } = require('../services/getClothing');
const { getPiecesFromTemperature } = require('../services/getPieces');

const apiKey = process.env.OPENWEATHER_API_KEY;
const baseURL = 'https://api.openweathermap.org/data/2.5';

router
  .route('/')
  .get(async (req, res) => {
    try {
      const { lat, lon } = req.query;
      const endpoint = `/forecast/?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const response = await axios.get(`${baseURL}${endpoint}`);

      // Get tomorrow's date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowDate = tomorrow.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'

      // Extract relevant weather data for tomorrow between 8am and 5pm
      const forecasts = response.data.list;
      let temperatureRange = { min: Infinity, max: -Infinity }; // Initialize temperature range
      let feelsLikeRange = { min: Infinity, max: -Infinity }; // Initialize feelsLike range
      let sumTemperature = 0; // Initialize sum of temperatures
      let countTemperature = 0; // Initialize count of temperature data points
      let rain = false; // Initialize rain flag
      let snow = false; // Initialize snow flag
      const city = response.data.city.name; // Extract city name
      const country = response.data.city.country; // Extract country code
      let weatherSummary = {}; // Initialize object to summarize occurrences of different weather conditions
      let descriptionSummary = {}; // Initialize object to summarize occurrences of different weather descriptions

      for (const forecast of forecasts) {
        const forecastTime = new Date(forecast.dt_txt); // Convert forecast time to Date object
        const forecastDate = forecastTime.toISOString().split('T')[0]; // Extract forecast date

        // Check if forecast is for tomorrow and between 8am and 5pm
        if (forecastDate === tomorrowDate && forecastTime.getHours() >= 8 && forecastTime.getHours() <= 17) {
          // Update temperature range
          if (forecast.main.temp < temperatureRange.min) {
            temperatureRange.min = forecast.main.temp;
          }
          if (forecast.main.temp > temperatureRange.max) {
            temperatureRange.max = forecast.main.temp;
          }

          // Update feelsLike range
          if (forecast.main.feels_like < feelsLikeRange.min) {
            feelsLikeRange.min = forecast.main.feels_like;
          }
          if (forecast.main.feels_like > feelsLikeRange.max) {
            feelsLikeRange.max = forecast.main.feels_like;
          }

          // Update sum and count of temperatures for average calculation
          sumTemperature += forecast.main.temp;
          countTemperature++;

          // Check for rain
          if (forecast.weather[0].main === 'Rain') {
            rain = true;
          }

          // Check for snow
          if (forecast.weather[0].main === 'Snow') {
            snow = true;
          }

          // Update weather summary
          const weatherMain = forecast.weather[0].main;
          if (weatherSummary[weatherMain]) {
            weatherSummary[weatherMain]++;
          } else {
            weatherSummary[weatherMain] = 1;
          }

          // Update description summary
          const weatherDescription = forecast.weather[0].description;
          if (descriptionSummary[weatherDescription]) {
            descriptionSummary[weatherDescription]++;
          } else {
            descriptionSummary[weatherDescription] = 1;
          }
        }
      }

      // Calculate average temperature
      let averageTemperature = countTemperature > 0 ? sumTemperature / countTemperature : 0;
      averageTemperature = Math.round(averageTemperature);

      temperatureRange.min = Math.round(temperatureRange.min);
      temperatureRange.max = Math.round(temperatureRange.max);
      feelsLikeRange.min = Math.round(feelsLikeRange.min);
      feelsLikeRange.max = Math.round(feelsLikeRange.max);

      // Generate weather description string
      let weatherDescriptionString = 'mainly';
      const descriptions = Object.keys(descriptionSummary);
      descriptions.forEach((description, index) => {
        if (index > 0) {
          weatherDescriptionString += ' with';
        }
        weatherDescriptionString += ` ${description}`;
      });

      const clothing = getClothingFromTemperature(averageTemperature);
      const pieces = getPiecesFromTemperature(averageTemperature);

      // Send summarized weather data for tomorrow as response
      res.json({
        city,
        country,
        averageTemperature,
        temperatureRange,
        feelsLikeRange,
        rain,
        snow,
        weatherSummary,
        descriptionSummary,
        weatherDescription: weatherDescriptionString,
        "clothing": clothing,
        "pieces": pieces
      });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;

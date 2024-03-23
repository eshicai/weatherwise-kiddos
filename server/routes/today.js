const express = require('express');
const axios = require('axios');
const process = require('process');
require('dotenv').config();
const router = express.Router();
const { getClothingFromTemperature } = require('../services/getClothing');
const { getPiecesFromTemperature } = require('../services/getPieces');
const { getEssentials } = require('../services/getEssentials');
const { getAccessoriesFromTemperature } = require('../services/getAccessories');
const { getSpecials } = require('../services/getSpecials');

const apiKey = process.env.OPENWEATHER_API_KEY;
const baseURL = 'https://api.openweathermap.org/data/2.5';

router
  .route('/')
  .get(async (req, res) => {
    try {
      // Extracting latitude and longitude from query parameters
      const { lat, lon, timezoneOffset } = req.query;
      console.log(timezoneOffset);
      const endpoint = `/forecast/?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const response = await axios.get(`${baseURL}${endpoint}`);

      // Get current date
      const currentDate = new Date();

      const forecasts = response.data.list;
      const city = response.data.city.name;
      const country = response.data.city.country;

      let temperatureRange = { min: Infinity, max: -Infinity };
      let feelsLikeRange = { min: Infinity, max: -Infinity };
      let sumTemperature = 0;
      let countTemperature = 0;
      let weatherSummary = {};
      let descriptionSummary = {};
      let rain = false;
      let snow = false;

      // Looping through forecast data
      for (const forecast of forecasts) {
        const forecastTime = new Date(forecast.dt_txt);
        console.log(forecast);
        console.log(forecastTime);

        // Check if forecast is for today and between current time and 5pm
        if (forecastTime.getDate() === currentDate.getDate() && forecastTime.getHours() >= currentDate.getHours() && forecastTime.getHours() <= 17) {
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

      // Retrieving clothing, pieces, essentials and specials data based on weather conditions or date
      const clothing = getClothingFromTemperature(averageTemperature);
      const pieces = getPiecesFromTemperature(averageTemperature);
      const essentials = getEssentials(rain, snow);
      const accessories = getAccessoriesFromTemperature(averageTemperature);
      const specialEventToday = getSpecials(currentDate);

      // Send summarized weather data for today as response
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
        clothing,
        pieces,
        essentials,
        accessories,
        "specials": specialEventToday
      });
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      res.status(500).send('Failed to fetch forecast data');
    }
  });

module.exports = router;

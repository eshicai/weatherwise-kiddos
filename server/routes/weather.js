const express = require('express');
const axios = require('axios');
const process = require('process');
require('dotenv').config();
const router = express.Router();
const { getClothingFromTemperature } = require('../services/getClothing');
const { getPiecesFromTemperature } = require('../services/getPieces');
const { getEssentials } = require('../services/getEssentials');

const baseURL = 'https://api.openweathermap.org/data/2.5';
const apiKey = process.env.OPENWEATHER_API_KEY;

router
  .route('/')
  .get(async (req, res) => {
    try {
      const { lat, lon } = req.query;
      const endpoint = `/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const response = await axios.get(`${baseURL}${endpoint}`);

      const weatherData = response.data;      
      const currentTemp = Math.round(weatherData.main.temp);








      const clothing = getClothingFromTemperature(currentTemp);

      const results = {
        "city": weatherData.name,
        "country": weatherData.sys.country,
        "temperature": currentTemp,
        "feelsLike": Math.round(weatherData.main.feels_like),
        "mainWeather": weatherData.weather[0].main,
        "weatherDescription": weatherData.weather[0].description,
        "clothing": clothing,
      }

      res.status(200).json(results);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }


  })

module.exports = router;
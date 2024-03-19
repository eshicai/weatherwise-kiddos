const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const axios = require('axios');
const router = express.Router();
const { getClothingFromTemperature } = require('../services/getClothing');

const weatherAPIEndpoint = 'https://api.openweathermap.org/data/2.5/weather';
const { OPENWEATHER_API_KEY } = process.env;


router
  .route('/')
  .get((req, res) => {
    const { lat, lon } = req.query;
    console.log(lat);
    console.log(lon);

    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7b1a938a38de8aa17f25b5c032bdedc7`);
        const weatherData = response.data;
        const currentTemp = Math.round(weatherData.main.temp - 273.15);
        const clothing = getClothingFromTemperature(currentTemp);

        const results = {
          "city": weatherData.name,
          "country": weatherData.sys.country,
          "temperature": currentTemp,
          "feelsLike": Math.round(weatherData.main.feels_like - 273.15),
          "mainWeather": weatherData.weather[0].main,
          "weatherDescription": weatherData.weather[0].description,
          "clothing": clothing,
        }

        console.log(results);
        res.status(200).json(results);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
      }
    }
    fetchWeather();
  })

module.exports = router;
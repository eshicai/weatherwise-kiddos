const express = require('express');
const axios = require('axios');
const process = require('process');
require('dotenv').config();
const router = express.Router();
const { getForecastWeather } = require('../services/getForecastWeather')

router
  .route('/')
  .get(async (req, res) => {
    try {
      const { lat, lon, timezoneOffset: clientTimezoneOffset } = req.query;

      const date = new Date();

      const weatherData = await getForecastWeather(lat, lon, date, clientTimezoneOffset);

      res.json(weatherData);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      res.status(500).send('Failed to fetch forecast data');
    }
  });

module.exports = router;
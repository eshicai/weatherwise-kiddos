const express = require('express');
require('dotenv').config();
const router = express.Router();
const { getForecastWeather } = require('../services/getForecastWeather')

router
  .route('/')
  .get(async (req, res) => {
    try {
      const { lat, lon, dateOffset, timezoneOffset: clientTimezoneOffset } = req.query;

      const date = new Date();
      // set date plus offset to retrieve desired day's data
      date.setDate(date.getDate() + Number(dateOffset));

      const weatherData = await getForecastWeather(lat, lon, date, clientTimezoneOffset);

      res.json(weatherData);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      res.status(500).send('Failed to fetch forecast data');
    }
  });

module.exports = router;
const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weather-controller');

router
  .route('/')
  .get(weatherController.currentWeather);

module.exports = router;
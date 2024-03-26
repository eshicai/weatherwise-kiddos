const express = require('express');
const router = express.Router();
const forecastController = require('../controllers/forecast-controller');

router
  .route('/')
  .get(forecastController.forecastWeather);

module.exports = router;
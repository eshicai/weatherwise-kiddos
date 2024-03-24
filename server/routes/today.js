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

      const weatherData = await getForecastWeather(lat, lon, date);

      res.json(weatherData);
      // console.log(date.getTimezoneOffset());
      // const serverTimezoneOffset = date.getTimezoneOffset();
      // const offset = serverTimezoneOffset - clientTimezoneOffset;
      // console.log(offset);
      // // const adjustedDate = new Date(date.getTime() - timezoneOffset * 60000); 
      // console.log(date.getHours());

      // const hour = date.getHours();      
      
      // if (hour < 17) {
      //   // client local time: < 17, get forecast to have summary and current to show current temperature/feels like/etc.
      //   const weatherData = await getForecastWeather(lat, lon, date);
      //   res.json(weatherData);
      // } else if ( hour >= 17) {
      //   // client local time: >= 17, get only current, not forecast for today, only the moment    
      //   res.status(200).send('ok');
      // }
    


      // const adjustedDate = new Date(date.getTime() - timezoneOffset * 60000);      
      // console.log(adjustedDate);
      // const currentHour = adjustedDate.getHours();
      // console.log(currentHour);



      //const weatherData = await getForecastWeather(lat, lon, adjustedDate);
      //res.json(weatherData);
      





    } catch (error) {
      console.error('Error fetching forecast data:', error);
      res.status(500).send('Failed to fetch forecast data');
    }
  });

module.exports = router;
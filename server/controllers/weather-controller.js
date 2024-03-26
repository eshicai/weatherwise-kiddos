const axios = require('axios');
const process = require('process');
require('dotenv').config();

const { getClothingFromTemperature } = require('../services/getClothing');
const { getPiecesFromTemperature } = require('../services/getPieces');
const { getEssentials } = require('../services/getEssentials');
const { getAccessoriesFromTemperature } = require('../services/getAccessories');
const { getSpecials } = require('../services/getSpecials');

const baseURL = 'https://api.openweathermap.org/data/2.5';
const apiKey = process.env.OPENWEATHER_API_KEY;

const currentWeather = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const endpoint = `/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await axios.get(`${baseURL}${endpoint}`);

    const weatherData = response.data;
    const currentTemp = Math.round(weatherData.main.temp);

    const rain = (weatherData.weather.some(item => item.main.includes('Rain'))) ? true : false;
    const snow = (weatherData.weather.some(item => item.main.includes('Snow'))) ? true : false;

    const clothing = getClothingFromTemperature(currentTemp);
    const pieces = getPiecesFromTemperature(currentTemp);
    const essentials = getEssentials(rain, snow);
    const accessories = getAccessoriesFromTemperature(currentTemp);
    const specials = getSpecials(new Date());

    const results = {
      "city": weatherData.name,
      "country": weatherData.sys.country,
      "temperature": currentTemp,
      "feelsLike": Math.round(weatherData.main.feels_like),
      rain,
      snow,
      "mainWeather": weatherData.weather[0].main,
      "weatherDescription": weatherData.weather[0].description,
      "clothing": clothing,
      pieces,
      essentials,
      accessories,
      specials
    }

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}

module.exports = {
  currentWeather
};
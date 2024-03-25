const axios = require('axios');
const process = require('process');
require('dotenv').config();

const { getClothingFromTemperature } = require('./getClothing');
const { getPiecesFromTemperature } = require('./getPieces');
const { getEssentials } = require('./getEssentials');
const { getAccessoriesFromTemperature } = require('./getAccessories');
const { getSpecials } = require('./getSpecials');

const apiKey = process.env.OPENWEATHER_API_KEY;
const baseURL = 'https://api.openweathermap.org/data/2.5';

const getForecastWeather = async (lat, lon, date, clientTimezoneOffset) => {
  try {
    const endpoint = `/forecast/?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await axios.get(`${baseURL}${endpoint}`);

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

    // target data from 8 AM to 5 PM locally for school time
    // use timezone offset from client to calculate how to select data from forecast     
    //const startHour = 8; // 8 AM
    const endHour = 17; // 5 PM
    const offset = clientTimezoneOffset / 60; // Client timezene offset in hours.
    const offsetBreakpoint = 24 - endHour; // max 24 hours per day, 24 - 17 = 7
    const nextDayEndhour = endHour + offset - 24; // if offset >= 7, need data from next day in UTC time      

    const selectedDate = date.getDate();

    for (const forecast of forecasts) {
      const forecastTime = new Date(forecast.dt_txt);

      // console.log("$$$$$$$$$$$$$$$$$$$$$");
      // console.log("forecastTime=" + forecastTime);
      // console.log("forecastTime.getDate()=" + forecastTime.getDate());
      // console.log("forecastTime.getHours()=" + forecastTime.getHours());
      // console.log('\n');

      if ((offset < offsetBreakpoint && (
        (forecastTime.getDate() === selectedDate && forecastTime.getHours() >= (8 + offset) && forecastTime.getHours() <= (17 + offset))
      ))
        || 
          ((forecastTime.getDate() === selectedDate && forecastTime.getHours() >= (8 + offset) && forecastTime.getHours() < 24) ||
            (forecastTime.getDate() === (selectedDate + 1) && forecastTime.getHours() <= nextDayEndhour))
        ) {
        // Update temperature range, feelsLike range, etc.
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

    // Calculate average temperature, generate weather description string, etc.
    let averageTemperature = countTemperature > 0 ? sumTemperature / countTemperature : 0;
    averageTemperature = Math.round(averageTemperature);

    temperatureRange.min = Math.round(temperatureRange.min);
    temperatureRange.max = Math.round(temperatureRange.max);
    feelsLikeRange.min = Math.round(feelsLikeRange.min);
    feelsLikeRange.max = Math.round(feelsLikeRange.max);

    //Generate weather description string
    let weatherDescriptionString = 'mainly';
    const descriptions = Object.keys(descriptionSummary);
    descriptions.forEach((description, index) => {
      if (index > 0) {
        weatherDescriptionString += ', ';
      }
      weatherDescriptionString += ` ${description}`;
    });

    // Retrieving clothing, pieces, essentials and specials data based on weather conditions or date
    const clothing = getClothingFromTemperature(averageTemperature);
    const pieces = getPiecesFromTemperature(averageTemperature);
    const essentials = getEssentials(rain, snow);
    const accessories = getAccessoriesFromTemperature(averageTemperature);
    const specials = getSpecials(date);

    return {
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
      specials
    };
  } catch (error) {
    console.error('Error processing weather data');
  }
}

module.exports = { getForecastWeather };
import './ForecastWeather.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getDayNumberInWeek } from '../../utils/date';

export const ForecastWeather = ({ dateOffset }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_API_KEY;

  // default location: Toronto
  const defaultLatitude = 43.64780785016635;
  const defaultLongitude = -79.39656626973078;
  const defaultTimezoneOffset = 240;

  const latitude = sessionStorage.getItem('latitude') || defaultLatitude;
  const longitude = sessionStorage.getItem('longitude') || defaultLongitude;
  const timezoneOffset = sessionStorage.getItem('timezoneOffset') || defaultTimezoneOffset;

  const [forecast, setForecast] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const endpoint = `/forecast?lat=${latitude}&lon=${longitude}&dateOffset=${dateOffset}&timezoneOffset=${timezoneOffset}&api_key=${apiKey}`;
  const forecastUrl = `${baseUrl}${endpoint}`;

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(forecastUrl);
        setForecast(response.data);
        setIsLoading(false);
      } catch (error) {
        setHasError(true);
      }
    }

    fetchForecast();
  }, [forecastUrl])

  if (hasError && !forecast) {
    return <p>Unable to access weather right now. Please try again later.</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  const {
    city,
    country,
    averageTemperature,
    temperatureRange,
    feelsLikeRange,
    rain,
    snow,
    weatherSummary,
    descriptionSummary,
    weatherDescription,
    clothing,
    pieces,
    accessories,
    essentials,
    specials
  } = forecast;

  const day = getDayNumberInWeek(dateOffset);

  console.log(clothing);

  return (
    <div className='forecast'>
      <div className='forecast__details'>
        <div className='forecast__details-inner'>
          <p className='forecast__city'>City: {city}</p>
          <p className='forecast__country'>Country: {country}</p>
          <h3>Between 8AM to 5PM</h3>
          <p className='forecast__temperature'>Average Temperature: {averageTemperature}°C</p>
          <p className='forecast__temperature-range'>low {temperatureRange.min}°C  high {temperatureRange.max}°C</p>
          <p className='forecast__feels-like'>Feels Like: low {feelsLikeRange.min}°C  high {feelsLikeRange.max}°C</p>
          <p className='forecast__main-weather'>{weatherSummary.weatherMain}</p>
          <p className='forecast__description'>{descriptionSummary.weatherDescription}</p>
          <p className='forecast__description'>{weatherDescription}</p>
          {rain === true && <p className='forecast__rain'>🌧️ Rain</p>}
          {snow === true && <p className='forecast__snow'>❄️ Snow</p>}
        </div>
        <div className='forecast__clothing'>
          <h3 className='forecast__clothing-title'>Clothing:</h3>
          <p className='forecast__clothing-description'>{clothing.description}</p>
          <p className='forecast__clothing-top'>Top: {clothing.top}</p>
          <p className='forecast__clothing-bottom'>Bottom: {clothing.bottom}</p>
          <p className='forecast__clothing-jacket'>Jacket: {clothing.jacket}</p>
          <p className='forecast__clothing-footwear'>Shoes: {clothing.footwear}</p>
        </div>
      </div>
      <div className='forecast__clothing-container'>
        <img className='forecast__clothing-image' src={`${baseUrl}${clothing.image}`} alt='forecast clothes' />
      </div>
      <div className='forecast__pieces-container'>
        <img className='forecast__piece-image' src={`${baseUrl}${pieces.top}/${day}.png`} alt='top for forecast' />
        <img className='forecast__piece-image' src={`${baseUrl}${pieces.bottom}/${day}.png`} alt='bottom for forecast' />
        <img className='forecast__piece-image' src={`${baseUrl}${pieces.jacket}/${day}.png`} alt='jacket for forecast' />
      </div>
      {accessories &&
        (<div className='forecast__accessories-container'>
          <h3 className='forecast__accessories-title'>Don't forget:</h3>
          <p className='forecast__accessories'>{accessories.accessories}</p>
        </div>)}
      {essentials &&
        (<div className='forecast__essentials'>
          <h3 className='forecast__essentials-title'>Pack your little one with:</h3>
          <p className='forecast__essentials-jacket'>{essentials.jacket}</p>
          <p className='forecast__essentials-pants'>{essentials.pants}</p>
          <p className='forecast__essentials-footwear'>{essentials.footware}</p>
        </div>)}
      {specials &&
        (<div className='forecast__specials-container'>
          <h3 className='forecast__specials-title'>{specials.event}</h3>
          <p className='forecast__specials'>{specials.color}</p>
        </div>)}
    </div>
  )
}
import './TodayWeather.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';

export const TodayWeather = ({ latitude, longitude, timezoneOffset }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_API_KEY;

  const storedWeather = localStorage.getItem('weather');
  const [weather, setWeather] = useState(storedWeather || '');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const endpoint = `weather?lat=${latitude}&lon=${longitude}&timezoneOffset=${timezoneOffset}`;
  const weatherUrl = `${baseUrl}/${endpoint}&api_key=${apiKey}`;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(weatherUrl);
        setWeather(response.data);
        setIsLoading(false);
      } catch (error) {
        setHasError(true);
      }
    }

    fetchWeather();
  }, [weatherUrl])

  if (hasError && !weather) {
    return <p>Unable to access weather right now. Please try again later.</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className='today'>
      <div className='today__details'>
        <div className='today__details-inner'>
          <p className='today__city'>City: {weather.city}</p>
          <p className='today__country'>Country: {weather.country}</p>
          <p className='today__temperature'>Temperature: {weather.temperature}°C</p>
          <p className='today__feels-like'>Feels Like: {weather.feelsLike}°C</p>
          <p className='today__main-weather'>{weather.mainWeather}</p>
          <p className='today__weather-description'>{weather.weatherDescription}</p>
        </div>
        <hr className='today__hr' />
        <div className='today__clothing'>
          <p className='today__clothing-title'>Clothing:</p>
          <p className='today__clothing-top'>Top: {weather.clothing.top}</p>
          <p className='today__clothing-bottom'>Bottom: {weather.clothing.bottom}</p>
          <p className='today__clothing-jacket'>Jacket: {weather.clothing.jacket}</p>
        </div>
      </div>
      <div className='today__image-container'>
        <img className='today__clothing-image' src={`${baseUrl}/${weather.clothing.image}`} alt='recommendation clothes' />
      </div>
    </div>
  )
}
import './GetWeather.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';

export const GetWeather = ({ latitude, longitude }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_API_KEY;

  const storedWeather = localStorage.getItem('weather');
  const [weather, setWeather] = useState(storedWeather || '');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const endpoint = `weather?lat=${latitude}&lon=${longitude}`;
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
    <div className='get-weather'>
      <div className='get-weather__details'>
        <div className='get-weather__details-inner'>
          <p className='get-weather__city'>City: {weather.city}</p>
          <p className='get-weather__country'>Country: {weather.country}</p>
          <p className='get-weather__temperature'>Temperature: {weather.temperature}°C</p>
          <p className='get-weather__feels-like'>Feels Like: {weather.feelsLike}°C</p>
          <p className='get-weather__main-weather'>{weather.mainWeather}</p>
          <p className='get-weather__weather-description'>{weather.weatherDescription}</p>
        </div>
        <hr className='get-weather__hr' />
        <div className='get-weather__clothing'>
          <p className='get-weather__clothing-title'>Clothing:</p>
          <p className='get-weather__clothing-top'>Top: {weather.clothing.top}</p>
          <p className='get-weather__clothing-bottom'>Bottom: {weather.clothing.bottom}</p>
          <p className='get-weather__clothing-jacket'>Jacket: {weather.clothing.jacket}</p>
        </div>
      </div>
      <div className='get-weather__image-container'>
        <img className='get-weather__clothing-image' src={`${baseUrl}/${weather.clothing.image}`} alt='recommendation clothes' />
      </div>
    </div>
  )
}
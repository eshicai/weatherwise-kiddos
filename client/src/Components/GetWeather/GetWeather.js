import './GetWeather.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';

export const GetWeather = ({ latitude, longitude }) => {
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_API_KEY;

  const storedWeather = localStorage.getItem('weather');
  const [weather, setWeather] = useState(storedWeather || '');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const endpoint = `weather?lat=${latitude}&lon=${longitude}`;
  const weatherUrl = `${baseUrl}/${endpoint}&api_key=${apiKey}`;
  console.log(weatherUrl);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(weatherUrl);
        console.log(response.data);
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

  console.log(weather.clothing.image)

  return (
    <div className='get-weather'>
      <p>City: {weather.city}</p>
      <p>Country: {weather.country}</p>
      <p>Temperature: {weather.temperature}</p>
      <p>Feels Like: {weather.feelsLike}</p>
      <p>{weather.mainWeather}</p>
      <p>{weather.weatherDescription}</p>
      <hr />
      <p>Clothing:</p>
      <p>Top:{weather.clothing.top}</p>
      <p>Bottom:{weather.clothing.bottom}</p>
      <p>Jacket:{weather.clothing.jacket}</p>
      <img src={`${baseUrl}/${weather.clothing.image}`} alt='recommendation clothes'></img>
    </div>
  )
}

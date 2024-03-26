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

  const endpoint = `/weather?lat=${latitude}&lon=${longitude}`;
  const weatherUrl = `${baseUrl}${endpoint}&api_key=${apiKey}`;

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

  const {
    city,
    country,
    temperature,
    feelsLike,
    rain,
    snow,
    mainWeather,
    weatherDescription,
    clothing,
    pieces,
    accessories,
    essentials,
    specials
  } = weather;

  const today = new Date();
  const day = today.getDay();

  console.log(clothing);

  return (
    <div className='today'>
      <div className='today__details'>
        <div className='today__details-inner'>
          <p className='today__city'>City: {city}</p>
          <p className='today__country'>Country: {country}</p>
          <h3>Between 8AM to 5PM</h3>
          <p className='today__temperature'>Temperature: {temperature}°C</p>
          <p className='today__feels-like'>Feels Like: {feelsLike}°C</p>
          <p className='today__main-weather'>Mainly {mainWeather}</p>
          <p className='today__weather-description'>{weatherDescription}</p>
          {rain === true && <p className='today__rain'>🌧️ Rain</p>}
          {snow === true && <p className='today__snow'>❄️ Snow</p>}
        </div>
        <hr className='today__hr' />
        <div className='today__clothing'>
          <h3 className='today__clothing-title'>Clothing:</h3>
          <p className='today__clothing-description'>{clothing.description}</p>
          <p className='today__clothing-top'>Top: {clothing.top}</p>
          <p className='today__clothing-bottom'>Bottom: {clothing.bottom}</p>
          <p className='today__clothing-jacket'>Jacket: {clothing.jacket}</p>
          <p className='today__clothing-footwear'>Shoes: {clothing.footwear}</p>
        </div>
      </div>
      <div className='today__image-container'>
        <img className='today__clothing-image' src={`${baseUrl}/${clothing.image}`} alt='recommendation clothes' />
      </div>
      <div className='today__pieces-container'>
        <img className='today__piece-image' src={`${baseUrl}${pieces.top}/${day}.png`} alt='top for today' />
        <img className='today__piece-image' src={`${baseUrl}${pieces.bottom}/${day}.png`} alt='bottom for today' />
        <img className='today__piece-image' src={`${baseUrl}${pieces.jacket}/${day}.png`} alt='jacket for today' />
      </div>
      {accessories &&
        (<div className='today__accessories-container'>
          <h3 className='today__accessories-title'>Don't forget:</h3>
          <p className='today__accessories'>{accessories.accessories}</p>
        </div>)}
      {essentials &&
        (<div className='today__essentials'>
          <h3 className='today__essentials-title'>Pack your little one with:</h3>
          <p className='today__essentials-jacket'>{essentials.jacket}</p>
          <p className='today__essentials-pants'>{essentials.pants}</p>
          <p className='today__essentials-footwear'>{essentials.footware}</p>
        </div>)}
      {specials &&
        (<div className='today__specials-container'>
          <h3 className='today__specials-title'>{specials.event}</h3>
          <p className='today__specials'>{specials.color}</p>
        </div>)}
    </div>
  )
}
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
    clothing,
    pieces,
    accessories,
    essentials,
    specials
  } = weather;

  const today = new Date();
  const day = today.getDay();

  return (
    <div className='today'>
      <div className='today__basic'>
        <h3 className='today__basic-location'>{city}, {country}</h3>
        <p className='today__basic-weather'>Mostly {mainWeather}</p>
        <p className='today__basic-temperature'>{temperature}°C</p>
        <p className='today__basic-feels-like'>Feels Like {feelsLike}°C</p>
      </div>

      <div className='today_clothings'>
        <div className='today__clothing'>
          <img className='today__clothing-image' src={`${baseUrl}/${clothing.image}`} alt='recommendation clothes' />
          <p className='today__clothing-description'>{clothing.description}</p>
        </div>

        <ul className='today__pieces'>
          <li className='today__pieces-item'>
            <p className='today__pieces-top'>Top: {clothing.top}</p>
            <img className='today__pieces-image' src={`${baseUrl}${pieces.top}/${day}.png`} alt='top for today' />
          </li>
          <li className='today__pieces-item'>
            <p className='today__pieces-bottom'>Bottom: {clothing.bottom}</p>
            <img className='today__pieces-image' src={`${baseUrl}${pieces.bottom}/${day}.png`} alt='bottom for today' />
          </li>
          {clothing.jacket !== 'none' &&
            (<li className='today__pieces-item'>
              <p className='today__pieces-jacket'>Jacket: {clothing.jacket}</p>
              <img className='today__pieces-image' src={`${baseUrl}${pieces.jacket}/${day}.png`} alt='jacket for today' />
            </li>)}
          <li className='today__pieces-item'>
            <img className='forecast__pieces-image' src={`${baseUrl}${pieces.footware}.png`} alt='footware for today' />
            <p className='today__pieces-footwear'>Shoes: {clothing.footwear}</p>
          </li>
        </ul>
      </div>

      {accessories &&
        (<div className='today__accessories'>
          <h3 className='today__accessories-details'>Also Bring: {accessories.accessories}</h3>
        </div>)}

      {essentials &&
        (<div className='today__essentials'>
          {rain === true && <p className='today__essential-rain'>🌧️ Chance of Rain</p>}
          {snow === true && <p className='today__essential-snow'>❄️ Chance of Snow</p>}
          <h3 className='today__essentials-title'>Pack your little one with:</h3>
          <ul className='today__essentails-items'>
            <li className='today__essentails-item'>
              <p className='today__essentials-jacket'>{essentials.jacket}</p>
              <img className='today__essentials-image' src={`${baseUrl}${essentials.jacket_image}`} alt='jacket for essential' />
            </li>
            <li className='today__essentails-item'>
              <p className='today__essentials-pants'>{essentials.pants}</p>
              <img className='today__essentials-image' src={`${baseUrl}${essentials.pants_image}`} alt='pants for essential' />
            </li>
            <li className='today__essentails-item'>
              <p className='today__essentials-footwear'>{essentials.footware}</p>
              <img className='today__essentials-image' src={`${baseUrl}${essentials.footware_image}`} alt='footware for essential' />
            </li>
          </ul>
        </div>)}

      {specials &&
        (<div className='today__specials'>
          <h3 className='today__specials-title'>{specials.event}</h3>
          <p className='today__specials-color'>{specials.color}</p>
        </div>)}
    </div>
  )
}
import './ForecastWeather.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getDayNumberInWeek } from '../../utils/date';
import { Link } from 'react-router-dom';

export const ForecastWeather = ({ dateOffset }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_API_KEY;

  // default location: Toronto
  // const defaultLatitude = 43.64780785016635;
  // const defaultLongitude = -79.39656626973078;
  // const defaultTimezoneOffset = 240;

  // default location: Miami, FL, USA
  const defaultLatitude = 25.7617;
  const defaultLongitude = -80.1918;
  const defaultTimezoneOffset = 240;

  const latitude = sessionStorage.getItem('latitude') || defaultLatitude;
  const longitude = sessionStorage.getItem('longitude') || defaultLongitude;
  const timezoneOffset = sessionStorage.getItem('timezoneOffset') || defaultTimezoneOffset;
  const user = sessionStorage.getItem('user');

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

  return (
    <div className='forecast'>
      <div className="forecast__main">
        <div className='forecast__clothing'>
          <img className='forecast__clothing-image' src={`${baseUrl}${clothing.image}`} alt='forecast recommendation clothes' />
        </div>
        <div className='forecast__basic'>
          <h3 className='forecast__basic-location'>{city}, {country}</h3>
          <h3>Between 8AM to 5PM</h3>
          <p className='forecast__basic-weather'>{weatherSummary.weatherMain}</p>
          <p className='forecast__description'>{descriptionSummary.weatherDescription}</p>
          <p className='forecast__description'>{weatherDescription}</p>
          <p className='forecast__temperature'>Average Temperature: {averageTemperature}°C</p>
          <p className='forecast__temperature-range'>low {temperatureRange.min}°C  high {temperatureRange.max}°C</p>
          <p className='forecast__feels-like'>Feels Like: low {feelsLikeRange.min}°C  high {feelsLikeRange.max}°C</p>
          <p className='forecast__clothing-description'>{clothing.description}</p>
        </div>
      </div>

      {user && (<div className="forecast__clothing-buttons">
        <button className="forecast__clothing-button">
          <Link className='forecast__clothing-link' to='/feedback/2'>
            Provide feedback on the comfort level of the attire: whether it's too warm or too chilly
          </Link>
        </button>
      </div>)}

      <ul className='forecast__pieces'>
        <li className='forecast__pieces-item'>
          <img className='forecast__pieces-image' src={`${baseUrl}${pieces.top}/${day}.png`} alt='top for forecast day' />
          <p className='forecast__pieces-top'>Top: {clothing.top}</p>
        </li>
        <li className='forecast__pieces-item'>
          <img className='forecast__pieces-image' src={`${baseUrl}${pieces.bottom}/${day}.png`} alt='bottom for forecast day' />
          <p className='forecast__pieces-bottom'>Bottom: {clothing.bottom}</p>
        </li>
        {clothing.jacket !== 'none' &&
          (<li className='forecast__pieces-item'>
            <img className='forecast__pieces-image' src={`${baseUrl}${pieces.jacket}/${day}.png`} alt='jacket for forecast day' />
            <p className='forecast__pieces-jacket'>Jacket: {clothing.jacket}</p>
          </li>)}
        <li className='forecast__pieces-item'>
          <img className='forecast__pieces-image' src={`${baseUrl}${pieces.footware}.png`} alt='footware for forecast day' />
          <p className='forecast__pieces-footwear'>Shoes: {clothing.footwear}</p>
        </li>
      </ul>

      {accessories &&
        (<div className='forecast__accessories'>
          <h3 className='forecast__accessories-details'>Also Bring: {accessories.accessories}</h3>
        </div>)}

      {essentials &&
        (<div className='forecast__essentials'>
          {rain === true && <p className='forecast__essentials-rain'>🌧️ Chance of Rain</p>}
          {snow === true && <p className='forecast__essentials-snow'>❄️ Chance of Snow</p>}
          <h3 className='forecast__essentials-title'>Pack your little one with:</h3>
          <ul className='forecast__essentials-items'>
            <li className='forecast__essentials-item'>
              <p className='forecast__essentials-jacket'>{essentials.jacket}</p>
              <img className='forecast__essentials-image' src={`${baseUrl}${essentials.jacket_image}`} alt='jacket for essential' />
            </li>
            <li className='forecast__essentials-item'>
              <p className='forecast__essentials-pants'>{essentials.pants}</p>
              <img className='forecast__essentials-image' src={`${baseUrl}${essentials.pants_image}`} alt='pants for essential' />
            </li>
            <li className='forecast__essentials-item'>
              <p className='forecast__essentials-footwear'>{essentials.footware}</p>
              <img className='forecast__essentials-image' src={`${baseUrl}${essentials.footware_image}`} alt='footware for essential' />
            </li>
          </ul>
        </div>)}

      {specials &&
        (<div className='forecast__specials'>
          <h3 className='forecast__specials-title'>{specials.event}</h3>
          <p className='forecast__specials-color'>{specials.color}</p>
        </div>)}
    </div>
  )
}
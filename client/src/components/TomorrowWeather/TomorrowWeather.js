import './TomorrowWeather.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getDayNumberInWeek } from '../../utils/date';

export const TomorrowWeather = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_API_KEY;

  const defaultLatitude = 43.64780785016635;
  const defaultLongitude = -79.39656626973078;

  const latitude = sessionStorage.getItem('latitude') || defaultLatitude;
  const longitude = sessionStorage.getItem('longitude') || defaultLongitude;
  console.log(latitude);
  console.log(longitude);

  const [tomorrow, setTomorrow] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const endpoint = `/tomorrow?lat=${latitude}&lon=${longitude}&api_key=${apiKey}`;
  const tomorrowUrl = `${baseUrl}${endpoint}`;

  useEffect(() => {
    const fetchTomorrow = async () => {
      try {
        const response = await axios.get(tomorrowUrl);
        setTomorrow(response.data);
        setIsLoading(false);
      } catch (error) {
        setHasError(true);
      }
    }

    fetchTomorrow();
  }, [tomorrowUrl])

  if (hasError && !tomorrow) {
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
        pieces
  } = tomorrow;

  console.log(clothing);
  console.log(pieces);

  const day = getDayNumberInWeek(1);

  return (
    <div className='tomorrow'>
      <div className='tomorrow__details'>
        <div className='tomorrow__details-inner'>
          <p className='tomorrow__city'>City: {city}</p>
          <p className='tomorrow__country'>Country: {country}</p>
          <p className='tomorrow__temperature'>Temperature: {averageTemperature}°C</p>
          <p className='tomorrow__temperature-range'>low {temperatureRange.min}°C - high {temperatureRange.max}°C</p>
          <p className='tomorrow__feels-like'>Feels Like: low {feelsLikeRange.min}°C - high {feelsLikeRange.max}°C</p>
          <p className='tomorrow__main-weather'>{weatherSummary.weatherMain}</p>
          <p className='tomorrow__description'>{descriptionSummary.weatherDescription}</p>
          <p className='tomorrow__description'>{weatherDescription}</p>
          <p className='tomorrow__rain'>{rain}</p>
          <p className='tomorrow__rain'>{snow}</p>
        </div>
        <div className='tomorrow__clothing'>
          <p className='tomorrow__clothing-title'>Clothing:</p>
          <p className='tomorrow__clothing-top'>Top: {clothing.top}</p>
          <p className='tomorrow__clothing-bottom'>Bottom: {clothing.bottom}</p>
          <p className='tomorrow__clothing-jacket'>Jacket: {clothing.jacket}</p>
        </div>
      </div>
      <div className='tomorrow__clothing-container'>
        <img className='tomorrow__clothing-image' src={`${baseUrl}${clothing.image}`} alt='tomorrowd clothes' />
      </div>
      <div className='tomorrow__pieces-container'>
        <img className='tomorrow__piece-image' src={`${baseUrl}${pieces.top}/${day}.png`} alt='top for tomorrow' />
        <img className='tomorrow__piece-image' src={`${baseUrl}${pieces.bottom}/${day}.png`} alt='bottom for tomorrow' />
        <img className='tomorrow__piece-image' src={`${baseUrl}${pieces.jacket}/${day}.png`} alt='jacket for tomorrow' />
      </div>
    </div>
  )
}


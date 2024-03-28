import './LocationAndWeather.scss'
import React, { useEffect, useState } from 'react';
import { TodayWeather } from '../TodayWeather/TodayWeather';
import { ForecastWeather } from '../ForecastWeather/ForecastWeather';
import { Location } from '../../pages/Location/Location';
import { isStillToday } from '../../utils/dateOffset';
import { getDateOffset } from '../../utils/dateOffset';

export const LocationAndWeather = () => {
  // // default location: Toronto
  // const defaultLatitude = 43.64780785016635;
  // const defaultLongitude = -79.39656626973078;
  // const defaultTimezoneOffset = 240;

  // default location: Miami, FL, USA
  const defaultLatitude = 25.7617;
  const defaultLongitude = -80.1918;
  const defaultTimezoneOffset = 240;

  const storedLatitude = sessionStorage.getItem('latitude');
  const storedLongitude = sessionStorage.getItem('longitude');
  const storedTimezoneOffest = sessionStorage.getItem('timezoneOffset');
  const buttonClicked = sessionStorage.getItem('locationButtonClicked');

  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(storedLatitude || defaultLatitude);
  const [longitude, setLongitude] = useState(storedLongitude || defaultLongitude);
  const [timezoneOffset, setTimezoneOffset] = useState(storedTimezoneOffest || defaultTimezoneOffset);
  const [showButton, setShowButton] = useState(buttonClicked !== 'true');
  const [buttonConfirm, setButtonConfirm] = useState(false);
  const [getLocation, setGetLocation] = useState(false);

  sessionStorage.setItem('timezoneOffset', timezoneOffset);

  const handleLocationClick = () => {
    setButtonConfirm(true);
  }

  const fetchWeatherData = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });

    sessionStorage.setItem('latitude', position.coords.latitude);
    sessionStorage.setItem('longitude', position.coords.longitude);
    sessionStorage.setItem('locationButtonClicked', 'true');
    setShowButton(false);
  }

  const handleLocationError = (error) => {
    console.error('Error getting user location:', error.message);
  }

  useEffect(() => {
    const getGeoLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchWeatherData, handleLocationError);
      } else {
        console.error("Geolocation not supported");
      }

      const timezoneOffset = (new Date()).getTimezoneOffset();
      sessionStorage.setItem('timezoneOffset', timezoneOffset);
      setTimezoneOffset(timezoneOffset);
    }

    if (getLocation) {
      getGeoLocation();
      setGetLocation(false);
    }
  }, ([getLocation]));

  const today = isStillToday();
  const dateOffset = getDateOffset();

  return (
    <div className='location'>
      {showButton && !location ? (
        <div>
          <button className='location__button' onClick={handleLocationClick}>Get My Location</button>
        </div>
      ) : null}
      {buttonConfirm && <Location setButtonConfirm={setButtonConfirm} setGetLocation={setGetLocation} />}

      {today ?
        <TodayWeather className='location__weather' latitude={latitude} longitude={longitude} />
        :
        <ForecastWeather dateOffset={dateOffset} />
      }
    </div>
  );
}
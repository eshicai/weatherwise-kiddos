import './LocationAndWeather.scss'
import React, { useEffect, useState } from 'react';
import { TodayWeather } from '../TodayWeather/TodayWeather';
import { Clock } from '../Clock/Clock';
import { Location } from '../../pages/Location/Location';

export const LocationAndWeather = () => {
  // default location: Toronto
  const defaultLatitude = 43.64780785016635;
  const defaultLongitude = -79.39656626973078;
  const defaultTimezoneOffset = 240;

  const storedLatitude = sessionStorage.getItem('latitude');
  const storedLongitude = sessionStorage.getItem('longitude');
  const storedTimezoneOffset = sessionStorage.getItem('timezoneOffset');
  const buttonClicked = sessionStorage.getItem('locationButtonClicked');

  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(storedLatitude || defaultLatitude);
  const [longitude, setLongitude] = useState(storedLongitude || defaultLongitude);
  const [timezoneOffset, setTimezoneOffset] = useState(storedTimezoneOffset || defaultTimezoneOffset);
  const [showButton, setShowButton] = useState(buttonClicked !== 'true');
  const [buttonConfirm, setButtonConfirm] = useState(false);
  const [getLocation, setGetLocation] = useState(false);

  const handleLocationClick = () => {
    setButtonConfirm(true);
  }

  const getGeoLocation = () => {
    console.log('getting location!!');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchWeatherData, handleLocationError);
    } else {
      console.log("Geolocation not supported");
    }

    const timezoneOffset = (new Date()).getTimezoneOffset();
    console.log(timezoneOffset);
    setTimezoneOffset(timezoneOffset);
    sessionStorage.setItem('timezoneOffset', timezoneOffset);
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
    if (getLocation) {
      getGeoLocation();

      setGetLocation(false);
    }
  }, ([getLocation], [getGeoLocation]));

  return (
    <div className='location'>
      <div>
        <Clock className='location__clock' />
      </div>
      {showButton && !location ? (
        <div>
          <button className='location__button' onClick={handleLocationClick}>Get My Location</button>
          <p className='location__button-explaination'>Click the button above to enable personalized weather forecasts based on your current location</p>
        </div>
      ) : null}
      {buttonConfirm && <Location setButtonConfirm={setButtonConfirm} setGetLocation={setGetLocation} />}

      <TodayWeather className='location__weather' latitude={latitude} longitude={longitude} timezoneOffset={timezoneOffset} />
    </div>
  );
}
import './LocationAndWeather.scss'
import React, { useState } from 'react';
import { GetWeather } from '../GetWeather/GetWeather';
import { Clock } from '../Clock/Clock';

export const LocationAndWeather = () => {
  const defaultLatitude = 43.64780785016635;
  const defaultLongitude = -79.39656626973078;
  
  const storedLatitude = sessionStorage.getItem('latitude');
  const storedLongitude = sessionStorage.getItem('longitude');
  console.log(storedLatitude);
  console.log(storedLongitude);

  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(storedLatitude || defaultLatitude);
  const [longitude, setLongitude] = useState(storedLongitude || defaultLongitude);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchWeatherData, handleLocationError);
    } else {
      console.log("Geolocation not supported");
    }
  }

  const fetchWeatherData = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    setLocation({ latitude, longitude });

    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    console.log(latitude);
    console.log(longitude);

    sessionStorage.setItem('latitude', position.coords.latitude);
    sessionStorage.setItem('longitude', position.coords.longitude);

    const testStoredLatitude = sessionStorage.getItem('latitude');
    const testStoredLongitude = sessionStorage.getItem('longitude');
    console.log(testStoredLatitude);
    console.log(testStoredLongitude);
  }

  const handleLocationError = (error) => {
    console.error('Error getting user location:', error.message);
  }

  return (
    <div className='location'>
      <div>
        <Clock className='location__clock' />
      </div>
      {!location ? <button className='location__button' onClick={handleLocationClick}>Get Location</button> : null}
      <GetWeather className='location__weather' latitude={latitude} longitude={longitude} />
    </div>
  );
}

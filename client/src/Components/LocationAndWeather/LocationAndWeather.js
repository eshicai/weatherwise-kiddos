import './LocationAndWeather.scss'
import React, { useState } from 'react';
import { GetWeather } from '../GetWeather/GetWeather';
import { Clock } from '../Clock/Clock';

export const LocationAndWeather = () => {
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(49.2827);
  const [longitude, setLongitude] = useState(-123.1207);

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
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  const handleLocationError = (error) => {
    console.error('Error getting user location:', error.message);
  }

  return (
    <div>
      <Clock />
      {!location ? <button onClick={handleLocationClick}>Get Location</button> : null}
      <GetWeather latitude={latitude} longitude={longitude} />
    </div>
  );
}

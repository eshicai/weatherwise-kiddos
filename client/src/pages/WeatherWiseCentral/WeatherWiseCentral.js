import './WeatherWiseCentral.scss'
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { LocationAndWeather } from '../../components/LocationAndWeather/LocationAndWeather';
import { Slogan } from '../../components/Slogan/Slogan';

export const WeatherWiseCentral = () => {
  return (
    <div className="home-page">
      <Header />
      <main className='main'>
        <Link to='/tomorrow'>Tomorrow</Link>
        <LocationAndWeather />
        <Slogan />
      </main>
    </div>
  )
}
import './WeatherWiseCentral.scss'
import { Link } from 'react-router-dom';
import { Header } from '../../Components/Header/Header';
import { LocationAndWeather } from '../../Components/LocationAndWeather/LocationAndWeather';
import { Slogan } from '../../Components/Slogan/Slogan';

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

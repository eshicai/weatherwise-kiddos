import './Tomorrow.scss'
import { Link } from 'react-router-dom';
import { Header } from '../../Components/Header/Header';
import { TomorrowWeather } from '../../Components/TomorrowWeather/TomorrowWeather';
import { Slogan } from '../../Components/Slogan/Slogan';

export const Tomorrow = () => {
  return (
    <div className="tomorrow-page">
      <Header />
      <main className='main'>
        <Link to='/'>Today</Link>
        <TomorrowWeather />
        <Slogan />
      </main>
    </div>
  )
}

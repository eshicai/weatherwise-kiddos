import './Tomorrow.scss'
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { TomorrowWeather } from '../../components/TomorrowWeather/TomorrowWeather';
import { Slogan } from '../../components/Slogan/Slogan';

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

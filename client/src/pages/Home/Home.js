import './Home.scss'
import { Header } from '../../components/Header/Header';
import { Clock } from '../../components/Clock/Clock';
import { LocationAndWeather } from '../../components/LocationAndWeather/LocationAndWeather';
import { Slogan } from '../../components/Slogan/Slogan';
import { ForwardLink } from '../../components/ForwardLink/ForwardLink';
import { DateInfo } from '../../components/DateInfo/DateInfo';

export const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <main className='main'>
        <div>
          <DateInfo />
          <Clock className='location__clock' />
        </div>
        <ForwardLink link="/tomorrow" heading="Tomorrow" />
        <LocationAndWeather />
        <Slogan />
      </main>
    </div>
  )
}
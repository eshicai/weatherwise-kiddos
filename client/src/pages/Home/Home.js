import './Home.scss'
import { Header } from '../../components/Header/Header';
import { Clock } from '../../components/Clock/Clock';
import { LocationAndWeather } from '../../components/LocationAndWeather/LocationAndWeather';
import { Slogan } from '../../components/Slogan/Slogan';
import { ForwardLink } from '../../components/ForwardLink/ForwardLink';
import { DateInfo } from '../../components/DateInfo/DateInfo';

export const Home = () => {
  return (
    <div className="homepage">
      <Header />
      <main className='homepage-main'>
        <div className="homepage__info">
          <DateInfo className="homepage__info-date" />
          <Clock className='homepage__info-clock' />
        </div>
        <ForwardLink className="homepage__right-link" link="/tomorrow" heading='Tomorrow' />
        <LocationAndWeather className="homepage__location-weather" />
        <Slogan className="homepage__slogan" />
      </main>
    </div>
  )
}
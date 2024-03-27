import './Home.scss'
import { Header } from '../../components/Header/Header';
import { Clock } from '../../components/Clock/Clock';
import { LocationAndWeather } from '../../components/LocationAndWeather/LocationAndWeather';
import { Slogan } from '../../components/Slogan/Slogan';
import { ForwardLink } from '../../components/ForwardLink/ForwardLink';
import { DateInfo } from '../../components/DateInfo/DateInfo';

export const Home = ({ isUserLoggedIn, setIsUserLoggedIn }) => {
  return (
    <div className="homepage">
      <Header className='homepage__header' isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} />
      <main className='homepage-main'>
        <div className="homepage-main__forward-link-container">
          <ForwardLink className="homepage-main__forward-link" link="/tomorrow" heading='Tomorrow' />
        </div>
        <div className="homepage-main__info">
          <DateInfo className="homepage-main__info-date" />
          <Clock className='homepage-main__info-clock' />
        </div>
        <LocationAndWeather className="homepage-main__location-weather" isUserLoggedIn={isUserLoggedIn} />
      </main>
      <Slogan className="homepage__slogan" />
    </div>
  )
}
import './DayAfterTomorrow.scss'
import { Header } from '../../components/Header/Header';
import { ForecastWeather } from '../../components/ForecastWeather/ForecastWeather';
import { Slogan } from '../../components/Slogan/Slogan';
import { Link } from 'react-router-dom';
import { BackwardLink } from '../../components/BackwardLink/BackwardLink';
import { ForwardLink } from '../../components/ForwardLink/ForwardLink';

export const DayAfterTomorrow = () => {
  const dateOffset = 2;

  return (
    <div className="day-after-tomorrow-page">
      <Header />
      <main className='main'>
        <div className="day-after-tomorrow-page__heading-container">
          <BackwardLink link="/tomorrow" heading="Tomorrow" />
          <Link to='/'></Link>
          <ForwardLink link="/in_three_days" heading="Three Days from Now" />
        </div>
        <ForecastWeather dateOffset={dateOffset} />
        <Slogan />
      </main>
    </div>
  )
}
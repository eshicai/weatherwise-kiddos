import './InThreeDays.scss'
import { Header } from '../../components/Header/Header';
import { ForecastWeather } from '../../components/ForecastWeather/ForecastWeather';
import { Slogan } from '../../components/Slogan/Slogan';
import { Link } from 'react-router-dom';
import { BackwardLink } from '../../components/BackwardLink/BackwardLink';
import { DateInfo } from '../../components/DateInfo/DateInfo';

export const InThreeDays = () => {
  const dateOffset = 3;

  return (
    <div className="in-three-days-page">
      <Header />
      <main className='main'>
        <DateInfo dateOffset={dateOffset} />
        <div className="in-three-days-page__heading-container">
          <BackwardLink link="/day_after_tomorrow" heading="The Day after Tomorrow" />
          <Link to='/'></Link>
        </div>
        <ForecastWeather dateOffset={dateOffset} />
        <Slogan />
      </main>
    </div>
  )
}
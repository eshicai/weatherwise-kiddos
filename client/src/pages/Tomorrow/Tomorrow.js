import './Tomorrow.scss'
import { Header } from '../../components/Header/Header';
import { ForecastWeather } from '../../components/ForecastWeather/ForecastWeather';
import { Slogan } from '../../components/Slogan/Slogan';
import { BackwardLink } from '../../components/BackwardLink/BackwardLink';
import { ForwardLink } from '../../components/ForwardLink/ForwardLink';
import { DateInfo } from '../../components/DateInfo/DateInfo';
import { getWeekday } from '../../utils/weekday';

export const Tomorrow = () => {
  const dateOffset = 1;

  return (
    <div className="tomorrow-page">
      <Header />
      <main className='main'>
        <DateInfo dateOffset={dateOffset} />
        <div className="tomorrow-page__heading-container">
          <BackwardLink link="/" heading="Today" />
          <ForwardLink link="/day_after_tomorrow" heading={getWeekday(dateOffset + 1)} />
        </div>
        <ForecastWeather dateOffset={dateOffset} />        
      </main>
      <Slogan />
    </div>
  )
}
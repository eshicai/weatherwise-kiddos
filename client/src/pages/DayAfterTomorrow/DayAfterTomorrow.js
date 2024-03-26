import './DayAfterTomorrow.scss'
import { Header } from '../../components/Header/Header';
import { ForecastWeather } from '../../components/ForecastWeather/ForecastWeather';
import { Slogan } from '../../components/Slogan/Slogan';
import { BackwardLink } from '../../components/BackwardLink/BackwardLink';
import { ForwardLink } from '../../components/ForwardLink/ForwardLink';
import { HomeLink } from '../../components/HomeLink/HomeLink';
import { DateInfo } from '../../components/DateInfo/DateInfo';
import { getWeekday } from '../../utils/weekday';

export const DayAfterTomorrow = () => {
  const dateOffset = 2;

  return (
    <div className="day-after-tomorrow-page">
      <Header />
      <main className='main'>
      <DateInfo dateOffset={dateOffset} />
        <div className="day-after-tomorrow-page__heading-container">
          <BackwardLink link="/tomorrow" heading={getWeekday(dateOffset - 1)} />
          <HomeLink link="/" heading="Today" />
          <ForwardLink link="/in_three_days" heading={getWeekday(dateOffset + 1)} />
        </div>
        <ForecastWeather dateOffset={dateOffset} />
        <Slogan />
      </main>
    </div>
  )
}
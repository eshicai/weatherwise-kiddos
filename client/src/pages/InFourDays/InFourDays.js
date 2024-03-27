import './InFourDays.scss'
import { Header } from '../../components/Header/Header';
import { ForecastWeather } from '../../components/ForecastWeather/ForecastWeather';
import { Slogan } from '../../components/Slogan/Slogan';
import { BackwardLink } from '../../components/BackwardLink/BackwardLink';
import { HomeLink } from '../../components/HomeLink/HomeLink';
import { DateInfo } from '../../components/DateInfo/DateInfo';
import { getWeekday } from '../../utils/weekday';

export const InFourDays = () => {
  const dateOffset = 4;

  return (
    <div className="in-four-days-page">
      <Header />
      <main className='main'>
        <DateInfo dateOffset={dateOffset} />
        <div className="in-four-days-page__heading-container">
          <BackwardLink link="/in_three_days" heading={getWeekday(dateOffset - 1)} />
          <HomeLink link="/" heading="Today" />
        </div>
        <ForecastWeather dateOffset={dateOffset} />        
      </main>
      <Slogan />
    </div>
  )
}
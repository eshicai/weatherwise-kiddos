import './InThreeDays.scss'
import { Header } from '../../components/Header/Header';
import { ForecastWeather } from '../../components/ForecastWeather/ForecastWeather';
import { Slogan } from '../../components/Slogan/Slogan';
import { BackwardLink } from '../../components/BackwardLink/BackwardLink';
import { ForwardLink } from '../../components/ForwardLink/ForwardLink';
import { HomeLink } from '../../components/HomeLink/HomeLink';
import { DateInfo } from '../../components/DateInfo/DateInfo';
import { getWeekday } from '../../utils/weekday';
import { getDateOffset } from '../../utils/dateOffset';

export const InThreeDays = () => {
  const dateOffset = getDateOffset(3);

  return (
    <div className="in-three-days-page">
      <Header />
      <main className='main'>
        <DateInfo dateOffset={dateOffset} />
        <div className="in-three-days-page__heading-container">
          <BackwardLink link="/day_after_tomorrow" heading={getWeekday(dateOffset - 1)} />
          <HomeLink link="/" heading="Today" />
          <ForwardLink link="/in_four_days" heading={getWeekday(dateOffset + 1)} />
        </div>
        <ForecastWeather dateOffset={dateOffset} />
      </main>
      <Slogan />
    </div>
  )
}
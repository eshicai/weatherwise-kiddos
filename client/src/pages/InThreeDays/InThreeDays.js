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
      <Header className="in-three-days-page__header" />
      <main className='in-three-days-page__main'>
        <DateInfo className="in-three-days-page__date-info" dateOffset={3} />
        <ul className="in-three-days-page__heading-container">
          <li className='in-three-days-page__heading-item'><BackwardLink link="/day_after_tomorrow" heading={getWeekday(2)} /></li>          
          <li className='in-three-days-page__heading-item'><HomeLink link="/" heading="Today" /></li>
          <li className='in-three-days-page__heading-item'><ForwardLink link="/in_four_days" heading={getWeekday(4)} /></li>
        </ul>
        <ForecastWeather className="in-three-days-page__forecast-weather" dateOffset={dateOffset} />
      </main>
      <Slogan className="in-three-days-page__slogan" />
    </div>
  )
}
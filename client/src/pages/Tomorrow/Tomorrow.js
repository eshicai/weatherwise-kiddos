import './Tomorrow.scss'
import { Header } from '../../components/Header/Header';
import { ForecastWeather } from '../../components/ForecastWeather/ForecastWeather';
import { Slogan } from '../../components/Slogan/Slogan';
import { BackwardLink } from '../../components/BackwardLink/BackwardLink';
import { ForwardLink } from '../../components/ForwardLink/ForwardLink';
import { HomeLink } from '../../components/HomeLink/HomeLink';
import { DateInfo } from '../../components/DateInfo/DateInfo';
import { getWeekday } from '../../utils/weekday';
import { getDateOffset } from '../../utils/dateOffset';

export const Tomorrow = () => {
  const dateOffset = getDateOffset(1);

  return (
    <div className="tomorrow-page">
      <Header className="tomorrow-page__header" />
      <main className='tomorrow-page__main'>
        <DateInfo className="tomorrow-page__date-info" dateOffset={1} />
        <ul className="tomorrow-page__heading-container">
          <li className="tomorrow-page__backward-link-container">
            <BackwardLink className="tomorrow-page__backward-link" link="/" heading="Today" />
          </li>
          <li className="tomorrow-page__forward-link-container">
            <ForwardLink className="tomorrow-page__forward-link" link="/day_after_tomorrow" heading={getWeekday(2)} />
          </li>
        </ul>
        <ForecastWeather className="tomorrow-page__forecast-weather" dateOffset={dateOffset} />
      </main>
      <Slogan className="tomorrow-page__slogan" />
    </div>
  )
}
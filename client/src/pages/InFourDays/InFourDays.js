import './InFourDays.scss'
import { Header } from '../../components/Header/Header';
import { ForecastWeather } from '../../components/ForecastWeather/ForecastWeather';
import { Slogan } from '../../components/Slogan/Slogan';
import { BackwardLink } from '../../components/BackwardLink/BackwardLink';
import { HomeLink } from '../../components/HomeLink/HomeLink';
import { DateInfo } from '../../components/DateInfo/DateInfo';
import { getWeekday } from '../../utils/weekday';
import { getDateOffset } from '../../utils/dateOffset';

export const InFourDays = () => {
  const dateOffset = getDateOffset(4);

  return (
    <div className="in-four-days-page">
      <Header className="in-four-days-page__header" />
      <main className='in-four-days-page__main'>
        <DateInfo className="in-four-days-page__date-info" dateOffset={4} />
        <div className="in-four-days-page__heading-container">
          <div className='in-four-days-page__backward-link-container'>
            <BackwardLink className="in-four-days-page__backward-link" link="/in_three_days" heading={getWeekday(3)} />
          </div>
          <div>
            <HomeLink className="in-four-days-page__home-link" link="/" heading="Today" />
          </div>
        </div>
        <ForecastWeather className="in-four-days-page__forecast-weather" dateOffset={dateOffset} />
      </main>
      <Slogan className="in-four-days-page__slogan" />
    </div>
  )
}
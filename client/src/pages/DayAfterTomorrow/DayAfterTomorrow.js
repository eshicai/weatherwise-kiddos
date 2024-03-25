import { Header } from '../../components/Header/Header';
import { ForecastWeather } from '../../components/ForecastWeather/ForecastWeather';
import { Slogan } from '../../components/Slogan/Slogan';
import { HeadingWithBackArrow } from '../../components/HeadingWithBackArrow/HeadingWithBackArrow';

export const DayAfterTomorrow = () => {
  const dateOffset = 2;

  return (
    <div className="day-after-tomorrow-page">
      <Header />
      <main className='main'>
        <div className="day-after-tomorrow-page__heading-container">
          <HeadingWithBackArrow link="/" heading="Today" />
        </div>
        <ForecastWeather dateOffset={dateOffset} />
        <Slogan />
      </main>
    </div>
  )
}
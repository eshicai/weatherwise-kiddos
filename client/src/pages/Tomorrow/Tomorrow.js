import './Tomorrow.scss'
import { Header } from '../../components/Header/Header';
import { ForecastWeather } from '../../components/ForecastWeather/ForecastWeather';
import { Slogan } from '../../components/Slogan/Slogan';
import { HeadingWithBackArrow } from '../../components/HeadingWithBackArrow/HeadingWithBackArrow';

export const Tomorrow = () => {
  const dateOffset = 1;

  return (
    <div className="tomorrow-page">
      <Header />
      <main className='main'>
        <div className="tomorrow-page__heading-container">
          <HeadingWithBackArrow link="/" heading="Today" />
        </div>
        <ForecastWeather dateOffset={dateOffset} />
        <Slogan />
      </main>
    </div>
  )
}
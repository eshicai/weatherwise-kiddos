import { Header } from '../../components/Header/Header';
import { ForecastWeather } from '../../components/ForecastWeather/ForecastWeather';
import { Slogan } from '../../components/Slogan/Slogan';
import { HeadingWithBackArrow } from '../../components/HeadingWithBackArrow/HeadingWithBackArrow';

export const InThreeDays = () => {
  const dateOffset = 3;

  return (
    <div className="in-three-days-page">
      <Header />
      <main className='main'>
        <div className="in-three-days-page__heading-container">
          <HeadingWithBackArrow link="/" heading="Today" />
        </div>
        <ForecastWeather dateOffset={dateOffset} />
        <Slogan />
      </main>
    </div>
  )
}
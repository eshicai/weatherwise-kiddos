import './WeatherWiseCentral.scss'
import { Header } from '../../Components/Header/Header';
import { LocationAndWeather } from '../../Components/LocationAndWeather/LocationAndWeather';

export const WeatherWiseCentral = () => {
  return (
    <div className="video-player">
      <Header />
      <main className='main'>
        <LocationAndWeather />
        {/* <Recommendations /> */}
      </main>
    </div>
  )
}

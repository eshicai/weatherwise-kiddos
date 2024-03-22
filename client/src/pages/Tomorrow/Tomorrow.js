import './Tomorrow.scss'
import { Header } from '../../components/Header/Header';
import { TomorrowWeather } from '../../components/TomorrowWeather/TomorrowWeather';
import { Slogan } from '../../components/Slogan/Slogan';
import { HeadingWithBackArrow } from '../../components/HeadingWithBackArrow/HeadingWithBackArrow';

export const Tomorrow = () => {
  return (
    <div className="tomorrow-page">
      <Header />
      <main className='main'>
        {/* <Link to='/'>Today</Link> */}
        <div className="tomorrow-page__heading-container">
          <HeadingWithBackArrow
            link="/"
            heading="Today"
          />
        </div>
        <TomorrowWeather />
        <Slogan />
      </main>
    </div>
  )
}

import './Home.scss'
import { Header } from '../../components/Header/Header';
import { LocationAndWeather } from '../../components/LocationAndWeather/LocationAndWeather';
import { Slogan } from '../../components/Slogan/Slogan';
import { ForwardLink } from '../../components/ForwardLink/ForwardLink';

export const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <main className='main'>
      <ForwardLink link="/tomorrow" heading="Tomorrow" />
        <LocationAndWeather />
        <Slogan />
      </main>
    </div>
  )
}
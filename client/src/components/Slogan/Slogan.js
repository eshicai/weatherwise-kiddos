import './Slogan.scss'
import sloganImg from '../../assets/images/mar.png';

export const Slogan = () => {
  return (
    <div className='slogan'>
      <p className='slogan__image-description'>"In the spring, at the end of the day, you should smell like dirt." - Margaret Atwood</p>
      <img className='slogan__image' src={sloganImg} alt='month'></img>
      <h1 className='slogan__content'>Dress your little ones in style, rain or shine, with WeatherWise Kiddos!</h1>
    </div>
  )
}
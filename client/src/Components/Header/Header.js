import './Header.scss';
import logoImg from '../../assets/logo/weatherwisekiddos-logo.png'
import userAvatar from '../../assets/images/Mohan-muruge.jpg'
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header className='header'>
            <div className='header__logo-container'>
                <Link to='/'>
                    <img className='header__logo logo' src={logoImg} alt='WeatherWise kiddos logo'></img>
                </Link>
            </div>
            <div className='header__content'>
                <div className='header__group'>
                    <form className='header__search'>
                        <input className='header__search-input' type='search' placeholder='Search'></input>
                    </form>
                    <div className='header__upload-button-container'>
                        <Link to='/upload'>
                            <button className='header__upload-button'>UPLOAD</button>
                        </Link>
                    </div>
                </div>
                <div className='header__image-container'>
                    <img className='avatar header__image' src={userAvatar} alt='user profile avatar'></img>
                </div>
            </div>
        </header>
    )
}

import './Header.scss';
import logoImg from '../../assets/logo/weatherwisekiddos-logo.png'
import userAvatar from '../../assets/images/headshort.png'
import { Link, Navigate } from 'react-router-dom';
import { Logout } from '../../pages/Logout/Logout';

export const Header = ({ isUserLoggedIn, setIsUserLoggedIn }) => {
  console.log(isUserLoggedIn);

  return (
    // <header className='header'>
    //   <div className='header__logo-container'>
    //     <Link to='/'>
    //       <img className='header__logo logo' src={logoImg} alt='WeatherWise kiddos logo'></img>
    //     </Link>
    //   </div>
    //   <div>
    //     <h1>WeatherWise Kiddos</h1>
    //   </div>
    //   <div className='header__content'>
    //     <div className='header__group'>
    //       <div className='header__button-container'>
    //         <Link to='/login'>
    //           <button className='header__button'>Login</button>
    //         </Link>
    //       </div>
    //     </div>
    //     <div className='header__image-container'>
    //       <img className='avatar header__image' src={userAvatar} alt='user profile avatar'></img>
    //     </div>
    //   </div>
    // </header>

    <div className='navbar'>
      <span className='logo'>
        <Link className='link' to='/'>Weather Wise</Link>
      </span> {
        isUserLoggedIn ? (
          <ul className='list'>
            <li className='listItem'>
              <img src={userAvatar} alt='' className='avatar1'></img>
            </li>
            <li className='listItem'>John Doe</li>
            <li className='listItem'>
            <Link className='link' to='logout' isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn}>Logout</Link>
              {/* <Logout isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} /> */}
            </li>
          </ul>
        ) : (<Link className='link' to='login'>Login</Link>)
      }

    </div>
  )
}

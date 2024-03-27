import './Logout.scss'
import closeX from "../../assets/icons/close-24px.svg";

export const Logout = ({ isUserLoggedIn, setIsUserLoggedIn }) => {
  const handleLogoutClick = () => {
    setIsUserLoggedIn(false);
  }

  return (
    <div className="logout">
      <div className="logout__container">
        <div className="logout__top-btn-container">
          <button className="logout__closeBtn"
            // onClick={() => {
            //   setButtonConfirm(false);
            // }}
          >
            <img className="logout__closeIcon" src={closeX} alt="X for close" />
          </button>
        </div>
        <div className="logout__wrapper">
          <div className="logout__text-container">
            <div className="logout__title1">
              <h1 className="logout__title">Logout</h1>
            </div>
            <div className="logout__body-container">
              <p className="logout__body">By clicking 'Confirm,' you will be logged out of your account. Are you sure you want to proceed?</p>
            </div>
          </div>
          <div className="logout__footer">
            <button className="logout__cancel"
              // onClick={() => { setButtonConfirm(false); }} id="cancelBtn"
              >
              Cancel
            </button>
            <button onClick={() => handleLogoutClick()} className="logout__delete">Confirm</button>
          </div>
        </div>
      </div>
    </div>

  );
}
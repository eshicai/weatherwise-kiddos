import './Location.scss'
import closeX from "../../assets/icons/close-24px.svg";

export const Location = ({ setButtonConfirm, setGetLocation }) => {
  const handleLocationClick = () => {
    setGetLocation(true);
    setButtonConfirm(false);
  }

  return (
    <div className="popup">
      <div className="popup__container">
        <div className="popup__top-btn-container">
          <button className="popup__closeBtn"
            onClick={() => {
              setButtonConfirm(false);
            }}
          >
            <img className="popup__closeIcon" src={closeX} alt="X for close" />
          </button>
        </div>
        <div className="popup__wrapper">
          <div className="popup__text-container">
            <div className="popup__title1">
              <h1 className="popup__title">Get My Location</h1>
            </div>
            <div className="popup__body-container">
              <p className="popup__body">Click the Confirm button below to enable personalized weather forecasts based on your current location</p>
            </div>
          </div>
          <div className="popup__footer">
            <button className="popup__cancel"
              onClick={() => { setButtonConfirm(false); }} id="cancelBtn">
              Cancel
            </button>
            <button onClick={() => handleLocationClick()} className="popup__delete">Confirm</button>
          </div>
        </div>
      </div>
    </div>

  );
}
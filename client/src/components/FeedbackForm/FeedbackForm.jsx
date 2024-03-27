import "./FeedbackForm.scss";
import { useLocation } from "react-router-dom";

export const FeedbackForm = () => {

  return (
    <div className="feedback">
      <button className="feedback__button">The clothes are too hot?</button>
      <button className="feedback__button">The clothes are too cold?</button>
    </div>
  )
}
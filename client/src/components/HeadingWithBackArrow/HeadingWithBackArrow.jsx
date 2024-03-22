import { Link } from "react-router-dom";
import "./HeadingWithBackArrow.scss";

export const HeadingWithBackArrow = ({ link, heading, className }) => {
  return (
    <article
      className={`heading-with-back-arrow ${className ? className : ""}`}
    >
      <Link className="heading-with-back-arrow__back-link" to={link}></Link>
      <h1 className="heading-with-back-arrow__heading">{heading}</h1>
    </article>
  );
};
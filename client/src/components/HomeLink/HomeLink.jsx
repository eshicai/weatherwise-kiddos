import { Link } from "react-router-dom";
import "./HomeLink.scss";

export const HomeLink = ({ link, heading, className }) => {
  return (
    <article className={`home ${className ? className : ""}`}>
      <Link className="home-link" to={link}></Link>
      <Link className="home-heading-link" to={link}>
        <h1 className="home__heading">{heading}</h1>
      </Link>
    </article>
  );
};
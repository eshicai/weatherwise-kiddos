import { Link } from "react-router-dom";
import "./BackwardLink.scss";

export const BackwardLink = ({ link, heading, className }) => {
  return (
    <article className={`backward ${className ? className : ""}`}>
      <Link className="backward-link" to={link}></Link>
      <Link className="backward-heading-link" to={link}>
        <h1 className="backward__heading">{heading}</h1>
      </Link>
    </article>
  );
};
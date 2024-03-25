import { Link } from "react-router-dom";
import "./ForwardLink.scss";

export const ForwardLink = ({ link, heading, className }) => {
  return (
    <article className={`forward ${className ? className : ""}`}>
      <Link className="forward-link" to={link}></Link>
      <Link className="forward-heading-link" to={link}>
        <h1 className="forward__heading">{heading}</h1>
      </Link>
    </article>
  );
};
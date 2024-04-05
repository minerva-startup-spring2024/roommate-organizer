"use client";
import "./Card.css";
function Card(props) {
  return (
    <div className="card">
      <img className="card-image" src={props.image} alt={props.altText} />
      <h2 className="card-title">{props.title}</h2>
      <br></br>
      <p className="card-text">{props.text}</p>
      <h4> {props.date}</h4>
    </div>
  );
}

export default Card;

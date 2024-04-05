"use client";
import "./Card.css";
function Card(props) {
  return (
    <div className="card">
      <img className="card-image" src={props.image} />
      <h4> From {props.fullName} </h4>
      <br></br>
      <p className="card-text">{props.text}</p>
      <br></br>

      <h4> {props.date}</h4>
    </div>
  );
}

export default Card;

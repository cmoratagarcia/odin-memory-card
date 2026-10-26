import React from "react";

export default function Card(props) {
  return (
    <button className="card" onClick={props.handleClick}>
      <div className="card-image">
        <img src={props.image} alt="" />
      </div>
      <div className="card-name">{props.name}</div>
    </button>
  );
}

import React from "react";

export default function Card(props) {
  return (
    <div className="card">
      <div className="card-image">
        <img src={props.image} alt="" />
      </div>
      <div className="card-name">{props.name}</div>
    </div>
  );
}

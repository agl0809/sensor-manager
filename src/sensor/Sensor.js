import React from "react";
import "./Sensor.css";

const Sensor = props => (
  <div className="sensor">
    <div className="name">{props.name}</div>
    {props.value && (
      <div className="details">
        {props.value} {props.unit}
      </div>
    )}
    <button
      className="change-status"
      onClick={() => props.changeStatus(props.id)}
    >
      {props.connected ? "Disconnect" : "Connect"}
    </button>
  </div>
);

export default Sensor;

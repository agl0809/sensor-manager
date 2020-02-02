import React from "react";
import "./Sensor.css";

const Sensor = props => (
  <div className="sensor">
    <div className="name">{props.message.name}</div>
    {props.message.value && (
      <div className="details">
        {props.message.value} {props.message.unit}
      </div>
    )}
    <button
      className="change-status"
      onClick={() =>
        props.onStatusChange(props.message.connected, props.message.id)
      }
    >
      {props.message.connected ? "Disconnect" : "Connect"}
    </button>
  </div>
);

export default Sensor;

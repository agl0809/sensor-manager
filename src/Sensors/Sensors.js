import React from "react";
import Sensor from "../Sensor/Sensor";
import "./Sensors.css";

const Sensors = props =>
  props.sensors.length > 0 ? (
    <div className="sensor-panel">
      {props.sensors.map(message => (
        <Sensor
          key={message.id}
          message={message}
          onStatusChange={props.changeStatus}
        />
      ))}
    </div>
  ) : (
    <p className="no-sensors">There are not sensors active now</p>
  );

export default Sensors;

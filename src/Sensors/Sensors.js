import React from "react";
import Sensor from "../Sensor/Sensor";
import "./Sensors.css";

const NO_SENSORS = "There are not sensors connected now";

const Sensors = props =>
  props.sensors.length > 0 ? (
    <div className="sensor-panel">
      {props.sensors.map(sensor => (
        <Sensor key={sensor.id} {...sensor} changeStatus={props.changeStatus} />
      ))}
    </div>
  ) : (
    <p className="no-sensors">{NO_SENSORS}</p>
  );

export default Sensors;

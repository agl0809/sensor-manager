import React, { Component } from "react";
import "./Sensor.css";

class Sensor extends Component {
  render() {
    if (this.props.sensors.length > 0) {
      return (
        <div className="sensor-panel">
          {this.props.sensors.map((message, index) => (
            <div key={message.id} className="sensor">
              <div className="name">{message.name}</div>
              <div className="details">{message.value}</div>
              <div className="actions">
                <button
                  onClick={() =>
                    this.props.handleSensorChange(message.connected, message.id)
                  }
                >
                  {message.connected ? "Disconnect" : "Connect"}
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return <p className="no-sensors">No sensors available</p>;
    }
  }
}

export default Sensor;

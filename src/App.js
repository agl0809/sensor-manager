import React, { Component, Fragment } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Sensor from "./sensor/Sensor";
import "./App.css";

const URL = "ws://127.0.0.1:5000";

class App extends Component {
  state = {
    showConnected: false,
    sensors: []
  };

  ws = new W3CWebSocket(URL);

  componentDidMount() {
    this.ws.onopen = () => {
      console.log("connection established");
    };

    this.ws.onmessage = message => {
      const sensor = JSON.parse(message.data);
      this.addSensor(sensor);
    };

    this.ws.onclose = () => {
      console.log("disconnected");
    };
  }

  addSensor = sensor => {
    let updatedSensors = [...this.state.sensors];
    const sensorIndex = this.state.sensors.findIndex(el => el.id === sensor.id);

    if (sensorIndex >= 0) {
      updatedSensors[sensorIndex] = sensor;
    } else {
      updatedSensors = [sensor, ...updatedSensors];
    }

    this.setState({ sensors: updatedSensors });
  };

  handleSensorChange = (isConnect, sensorId) => {
    this.setState(prevState => ({
      sensors: prevState.sensors.map(el =>
        el.id === sensorId ? { ...el, connected: !el.connected } : el
      )
    }));

    this.sendData(isConnect, sensorId);
  };

  sendData = (isConnect, sensorId) => {
    const command = isConnect ? "disconnect" : "connect";
    const data = {
      command,
      id: sensorId
    };

    try {
      this.ws.send(JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  handleCheckboxChange = event =>
    this.setState({ showConnected: event.target.checked });

  render() {
    this.sensors = this.state.showConnected
      ? this.state.sensors.filter(sensor => sensor.connected)
      : this.state.sensors;

    return (
      <Fragment>
        <div className="App-header">
          <span className="title">Sensors Management</span>
          <span className="toggle">
            Show connected
            <Checkbox
              checked={this.state.showConnected}
              onChange={this.handleCheckboxChange}
            />
          </span>
        </div>
        <Sensor
          sensors={this.sensors}
          handleSensorChange={this.handleSensorChange}
        />
      </Fragment>
    );
  }
}

const Checkbox = props => <input type="checkbox" {...props} />;

export default App;

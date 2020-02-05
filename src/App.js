import React, { Component, Fragment } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Sensors from "./Sensors/Sensors";
import Header from "./Header/Header";
import "./App.css";

const URL = "ws://127.0.0.1:5000";

class App extends Component {
  ws = new W3CWebSocket(URL);

  constructor(props) {
    super(props);
    this.state = {
      showConnected: false,
      sensors: []
    };

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
    let updatedSensors = this.state.sensors;
    const index = this.state.sensors.findIndex(el => el.id === sensor.id);

    index >= 0 ? (updatedSensors[index] = sensor) : updatedSensors.push(sensor);

    this.setState({ sensors: updatedSensors });
  };

  sendData = id => {
    const command = this.state.sensors.find(elem => elem.id === id).connected
      ? "disconnect"
      : "connect";

    try {
      this.ws.send(JSON.stringify({ command, id }));
    } catch (error) {
      console.log(error);
    }
  };

  handleCheckboxChange = event =>
    this.setState({ showConnected: event.target.checked });

  filterSensors = () =>
    this.state.showConnected
      ? this.state.sensors.filter(sensor => sensor.connected)
      : this.state.sensors;

  render() {
    return (
      <Fragment>
        <Header
          checked={this.state.showConnected}
          onChange={this.handleCheckboxChange}
        />
        <Sensors sensors={this.filterSensors()} changeStatus={this.sendData} />
      </Fragment>
    );
  }
}

export default App;

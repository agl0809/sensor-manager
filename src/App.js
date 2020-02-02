import React, { Component, Fragment } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Sensors from "./Sensors/Sensors";
import Header from "./Header/Header";
import "./App.css";

const URL = "ws://127.0.0.1:5000";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnected: false,
      sensors: []
    };
  }

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
    let updatedSensors = this.state.sensors;
    const index = this.state.sensors.findIndex(el => el.id === sensor.id);

    index >= 0 ? (updatedSensors[index] = sensor) : updatedSensors.push(sensor);

    this.setState({ sensors: updatedSensors });
  };

  changeStatus = (isConnect, sensorId) => {
    const updatedSensors = this.state.sensors.map(el =>
      el.id === sensorId ? { ...el, connected: !el.connected } : el
    );

    this.setState({
      sensors: updatedSensors
    });

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
        <Header
          checked={this.state.showConnected}
          onChange={this.handleCheckboxChange}
        />
        <Sensors sensors={this.sensors} changeStatus={this.changeStatus} />
      </Fragment>
    );
  }
}

export default App;

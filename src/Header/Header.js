import React from "react";
import "./Header.css";

const Header = props => (
  <div className="App-header">
    <span className="title">Sensors Management</span>
    <ShowConnected {...props} />
  </div>
);

const ShowConnected = props => (
  <span className="toggle">
    Show connected
    <input type="checkbox" {...props} />
  </span>
);

export default Header;

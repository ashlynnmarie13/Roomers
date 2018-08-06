import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { withRouter } from "react-router";

import Landing from "./components/Landing/Landing";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Landing />
      </div>
    );
  }
}

export default App;

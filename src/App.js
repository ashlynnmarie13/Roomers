import React, { Component } from "react";
import Login from "./components/Login/Login";
import "./App.css";

import Landing from "./components/Landing/Landing";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Landing />
        <Login />
      </div>
    );
  }
}

export default App;

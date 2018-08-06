import React, { Component } from "react";
import Login from "./components/Login/Login";
import routes from "./routes";
import "./reset.css";
import "./App.css";

import Landing from "./components/Landing/Landing";

class App extends Component {
  render() {
    return <div className="App">{routes}</div>;
  }
}

export default App;

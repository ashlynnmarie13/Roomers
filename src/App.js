import React, { Component } from "react";
import Login from "./components/Login/Login";
import routes from "./routes";
import "./reset.css";
import "./App.css";
import Nav from "./components/Nav/Nav"

import Landing from "./components/Landing/Landing";

class App extends Component {
  render() {
    return <div className="App">
    <Nav />
    {routes}
    </div>;
  }
}

export default App;

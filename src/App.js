import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { withRouter } from "react-router";

import Landing from "./components/Landing/Landing";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Landing />
          <Login />
        </div>
      </Provider>
    );
  }
}

export default App;

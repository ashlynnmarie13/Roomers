import React, { Component } from "react";
import routes from "./routes";
import "./reset.css";
import "./App.css";
import { withRouter } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "./redux/ducks/userReducer";

class App extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    return (
      <div className="App">
        <p>{JSON.stringify(this.props.user)}</p>
        <Nav />
        {routes}
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => state,
    { getUser }
  )(App)
);

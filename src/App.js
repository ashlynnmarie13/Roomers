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
    console.log(this.props.user);
    return (
      <div className="App">
        {this.props.location.pathname !== "/" && <Nav user={this.props.user} />}
        {routes}
        {/* {console.log(this.props)} */}
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

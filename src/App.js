import React, { Component } from "react";
import Login from "./components/Login/Login";
import routes from "./routes";
import "./reset.css";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Hom from "./components/Hom/Hom";
import { connect } from "react-redux";
import { getUser } from "./redux/ducks/userReducer";
import Landing from "./components/Landing/Landing";

class App extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    return (
      <div className="App">
        <p>{JSON.stringify(this.props.user)}</p>

        {routes}
      </div>
    );
  }
}

const mapStateToProps = ({ user, state }) => ({ ...user, state });

export default connect(
  mapStateToProps,
  { getUser }
)(App);

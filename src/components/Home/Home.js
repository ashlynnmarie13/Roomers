import React, { Component } from "react";
import "./Home.css";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return <div>Home</div>;
  }
}

export default connect(state => state)(Home);

import React, { Component } from "react";
import Login from "../Login/Login";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Landing.css";

export default class Landing extends Component {
  constructor() {
    super();
    this.state = {
      top: null,
      bottom: null
    };
  }
  render() {
    return (
      <div>
        <Login className="myButton" />
        <div>
          Find a Room
          <Link to="/signup" className="myButton">
            Sign-Up
          </Link>
        </div>
        <div>
          Rent a Room
          <Link to="/signup" className="myButton">
            Create Account
          </Link>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import Login from "../Login/Login";

export default class Landing extends Component {
  render() {
    return (
      <div>
        <Login />
        <div>
          Find a Room
          <button>Register</button>
        </div>
        <div>
          Rent a Room
          <button>Register</button>
        </div>
      </div>
    );
  }
}

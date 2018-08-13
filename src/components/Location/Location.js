import React, { Component } from "react";
import axios from "axios";
import stateModel from "../Models/stateModel";
export default class Location extends Component {
  state = {
    state: stateModel.states,
    city: stateModel.states["8"].cities
  };

  render() {
    console.log(this.state.state);
    console.log(this.state.city);
    // const cities = this.state.states.map((cities, i) => {
    //   return <div>{cities}</div>;
    // });

    return (
      <div>
        {" "}
        <p>{this.state.city}</p>
      </div>
    );
  }
}

import React, { Component } from "react";
import axios from "axios";
import stateModel from "../Models/stateModel";
export default class Location extends Component {
  state = {
    Cities: []
  };
  componentDidMount() {
    axios.get(``).then(response => this.setState({}));
  }

  render() {
    return <div>osdjoiasjdo</div>;
  }
}

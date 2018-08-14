import React, { Component } from "react";

import axios from "axios";
import stateModel from "../Models/stateModel";
export default class Location extends Component {
  state = {
    state: stateModel.states,
    city: stateModel.states["31"].cities
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`/location/{id}`)
      .then(response => this.setState({ cities: response.data, id }));
  }

  render() {
    const { isLoading, city } = this.props;
    console.log(this.state.state);
    console.log(this.state.city);
    const citiesDisplay = isLoading ? (
      <p>Loading...</p>
    ) : (
      city.map(item => {
        return (
          <div>
            <div> </div>
          </div>
        );
      })
    );

    return (
      <div>
        <div>{citiesDisplay}</div>; console.log(citiesDisplay)
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    city: state.city
  };
};

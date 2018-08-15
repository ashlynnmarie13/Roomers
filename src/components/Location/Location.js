import React, { Component } from "react";
import ListingCard from "../ListingCard/ListingCard";
import axios from "axios";

export default class Location extends Component {
  state = {
    cities: []
  };

  componentDidMount() {
    const { state } = this.props.match.params;
    axios.get(`/api/listing/${state}`).then(response =>
      this.setState({
        cities: [
          {
            ...response.data,
            state
          }
        ]
      })
    );
  }
  render() {
    function RemoveFalse() {
      for (var key in traits) {
        if (traits[key] === false) {
          delete traits[key];
        } else {
          traitsArray.push(key);
        }
      }
    }
    function RemoveFalsePrefs() {
      for (var key in prefs) {
        if (prefs[key] === false) {
          delete prefs[key];
        } else {
          prefsArray.push(key);
        }
      }
    }
    RemoveFalse();

    RemoveFalsePrefs();
    console.log("cities: ", traits);
    console.log("ities: ", traitsArray);
    console.log("myPObj: ", prefs);
    console.log("myPArray: ", prefsArray);

    const finalPrefsArray = [];

    let cities = this.state;
    console.log(cities.cities[0]);

    let cityList = this.state.cities.map((citi, i) => {
      return (
        <div>
          <ListingCard />
          <h3>{citi.adress}</h3>
        </div>
      );
    });

    return <div>{cityList}</div>;
  }
}

import React, { Component } from "react";
import ListingCard from "../ListingCard/ListingCard";
import { Card, Image } from "semantic-ui-react";
import RoomCard from "../RoomCard/RoomCard";
import axios from "axios";
import styled from "styled-components";
import "./Location.css";
import { Link } from "react-router-dom";
import image from "../Location/skyline.jpg";

import stateModel from "../Models/stateModel";

import { Select, Checkbox, Loader, Segment, Input } from "semantic-ui-react";
const Wrapper = styled.section`
position: absolute;
top:380px;
left:490px;
opacity: 0.8;

  width: 50%;
  margin auto;
`;

export default class Location extends Component {
  state = {
    cities: [],
    states: stateModel.states,
    selectedState: ""
  };

  componentDidMount() {
    const { state } = this.props.match.params;
    let cities = [];

    stateModel.states.forEach(val => {
      if (val.value === state) {
        cities = val.cities;
      }
      console.log(cities);
    });

    axios.get(`/api/listing/${state}`).then(response =>
      this.setState({
        cities: [
          {
            ...response.data,
            state,
            cities
          }
        ]
      })
    );
  }

  dropdownHandler = (e, data) => {
    const { value } = data;
    // this.setState({ selectedState: value });
  };

  render() {
    console.log(this.state.cities);

    let cities = this.state;
    let mappableCities = [];
    console.log(cities.cities);
    for (const city in cities.cities[0]) {
      mappableCities.push(cities.cities[0][city]);
    }
    console.log(mappableCities);
    let cityList =
      mappableCities &&
      mappableCities.map((city, i) => {
        return (
          <div className="cards" style={{ display: "flex" }}>
            <Card
              style={{ height: "425px", width: "400px", marginTop: "20px" }}
            >
              <Image src="data:image/jpeg;base64,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" />

              <Card.Content style={{ height: "110px" }}>
                <Card.Header>
                  {city.address && city.rent.moveInDate}
                  {city.address && city.rent.rentLength} + Months
                </Card.Header>
                <Card.Meta>
                  <span className="date">
                    ${city.address && city.rent.monthlyCost}
                    {" in "}
                    {city.address && city.address.street}
                  </span>
                </Card.Meta>
                <Card.Description />
                <a>Add to Wishlist</a>{" "}
              </Card.Content>
            </Card>
          </div>
        );
      });

    return (
      <div>
        <div>
          <img
            class="location-image"
            src={require("../Location/skyline.jpg")}
          />
        </div>
        <Wrapper>
          <div class="input-group">
            <Select
              className="search-city"
              onChange={(e, data) => this.dropdownHandler()}
              placeholder="Select City"
              options={this.state.cities[0] && this.state.cities[0].cities}
            />
          </div>
        </Wrapper>
        <div class="pageBody">{cityList}</div>
      </div>
    );
  }
}

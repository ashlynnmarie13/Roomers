import React, { Component } from "react";
import ListingCard from "../ListingCard/ListingCard";
import { Card, Image } from "semantic-ui-react";
import RoomCard from "../RoomCard/RoomCard";
import stateModel from "../Models/stateModel";
import axios from "axios";
import styled from "styled-components";
import "./Location.css";
import { Link } from "react-router-dom";
import image from "../Location/skyline.jpg";

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
              <Image src="" />

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

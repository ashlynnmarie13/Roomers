import React, { Component } from "react";
import ListingCard from "../ListingCard/ListingCard";
import { Card, Image } from "semantic-ui-react";
import RoomCard from "../RoomCard/RoomCard";
import states from "../Models/stateModel";

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
    selectedCity: ""
  };

  componentDidMount() {
    this.searchStates(this.props.match.params.state);
  }
  searchStates = state => {
    console.log(state);
    axios
      .get(
        `/api/listing/state/?selectedState=${state}
        `
      )
      .then(response =>
        this.setState({
          cities: response.data
        })
      );
  };
  dropdownHandler = (e, data) => {
    const { value } = data;
    this.setState({ selectedState: value }, () => this.searchStates());
  };

  render() {
    console.log(this.state.drop);
    console.log(this.props);
    console.log(states.states);

    const locationList = this.state.cities.map((val, i) => {
      const {
        address,
        amenities,
        human,
        prefs,
        rent,
        userID,
        _id,
        images
      } = val;

      return (
        <RoomCard
          address={address}
          amenities={amenities}
          human={human}
          prefs={prefs}
          rent={rent}
          userID={userID}
          id={_id}
          loggedInUser={this.props.user && this.props.user.authID}
          key={i}
          text="Add To Favorite"
          onSubmit={this.addToWishList}
          images={images}
        />
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
              onChange={(e, data) => this.dropdownHandler(e, data)}
              placeholder="Select a city"
              name="selectedCity"
              search
              selection
              options={states.states}
            />
          </div>
        </Wrapper>
        <div class="pageBody">{locationList}</div>
      </div>
    );
  }
}

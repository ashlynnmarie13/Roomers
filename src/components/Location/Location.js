import React, { Component } from "react";
import ListingCard from "../ListingCard/ListingCard";
import { Card, Image, Dropdown, Button } from "semantic-ui-react";
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
    selectedCity: "",
    selectedState: "",
    listings: [],
    cityImage: ""
  };

  componentDidMount() {
    // this.searchStates(this.props.match.params.state);
    const { state } = this.props.match.params;

    let cities = [];
    let cityImage = "";

    stateModel.states.forEach(val => {
      if (val.value === state) {
        cities = val.cities;
        cityImage = val.image;
      }
    });

    this.setState(
      {
        selectedState: state,
        selectedCity: cities[0].value,
        cities,
        cityImage
      },
      () => this.searchCities(this.state.selectedCity)
    );
  }

  // searchStates = state => {
  //   console.log(state);
  //   axios
  //     .get(
  //       `/api/listing/state/?selectedState=${state}
  //      `
  //     )
  //     .then(response =>
  //       this.setState({
  //         cities: response.data
  //       })
  //     );
  // };

  searchCities = selectedCity => {
    console.log(selectedCity);
    axios
      .get(
        `/api/city/?selectedCity=${selectedCity}
       `
      )
      .then(response =>
        this.setState({
          listings: response.data
        })
      );
  };

  dropdownHandler = (e, data) => {
    const { value } = data;
    console.log(value);
    this.setState({ selectedCity: value }, () => this.searchCities(value));
  };

  render() {
    console.log(
      this.state.cities
      // && this.state.cities[0].address.city
    );
    // console.log(this.state.states.cities);

    const texts = this.state.cities.map((val, i) => {
      return val.text;
    });
    console.log(texts);

    const values = this.state.cities.map((val, i) => {
      return val.value;
    });
    console.log(values);

    const locationList = this.state.listings.map((val, i) => {
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
      console.log(locationList);

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
      <div className="height">
        <div
          style={{
            background: `url(${
              this.state.cityImage
            }) no-repeat center center / cover`,
            width: "100%",
            height: "600px"
          }}
          className="search-bar"
        >
          <div className="search-text"> SEARCH BY CITY</div>
          <Dropdown
            onChange={(e, data) => this.dropdownHandler(e, data)}
            style={{
              width: "50%",
              zIndex: "100",
              height: "10%",

              fontSize: "1.3em"
            }}
            placeholder="Select City"
            name="selectedCity"
            search
            selection
            value={this.state.selectedCity}
            options={[
              { text: texts[0], value: values[0] },
              { text: texts[1], value: values[1] },
              { text: texts[2], value: values[2] }
            ]}
          />
        </div>

        <div className="pageBody">{locationList}</div>
        <div className="center">
          <Link to={`/search/rooms/${this.state.selectedState}`}>
            <Button
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",

                backgroundColor: "#cf6766",
                border: "solid #cf6766 2px",
                color: "white",
                width: "100%",
                height: "70%",
                fontSize: "1.2em",
                marginBottom: "100px"
              }}
            >
              Explore More
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

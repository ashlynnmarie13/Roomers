import React, { Component } from "react";
import RoomCard from "../RoomCard/RoomCard";
import axios from "axios";
import { Input, Checkbox, Dropdown, Label } from "semantic-ui-react";
import states from "../Models/stateModel";
import length from "../Models/lengthModel";
import "./SearchRooms.css";

class SearchRooms extends Component {
  state = {
    rooms: [],
    smoke: false,
    clean: false,
    guests: false,
    pets: false,
    washer: false,
    wifi: false,
    utilities: false,
    furnished: false,
    elevator: false,
    doorman: false,
    airConditioning: false,
    heating: false,
    gym: false,
    tv: false,
    privateBathroom: false,
    outdoorSpace: false,
    hasPet: false,
    selectedState: "",
    rentLength: ""
  };

  componentDidMount() {
    this.searchRooms();
  }

  searchRooms = () => {
    const {
      smoke,
      clean,
      guests,
      pets,
      washer,
      wifi,
      utilities,
      furnished,
      elevator,
      doorman,
      airConditioning,
      heating,
      gym,
      tv,
      privateBathroom,
      outdoorSpace,
      hasPet,
      selectedState,
      rentLength,
      male,
      female
    } = this.state;

    axios
      .get(
        `/api/rooms/?smoke=${smoke}&clean=${clean}&guests=${guests}&pets=${pets}&washer=${washer}&wifi=${wifi}&utilities=${utilities}&furnished=${furnished}&elevator=${elevator}&doorman=${doorman}&airConditioning=${airConditioning}&heating=${heating}&gym=${gym}&tv=${tv}&privateBathroom=${privateBathroom}&outdoorSpace=${outdoorSpace}&hasPet=${hasPet}&selectedState=${selectedState}&rentLength=${rentLength}`
      )
      .then(rooms => this.setState({ rooms: rooms.data }));
  };

  checkboxHandler = (e, data) => {
    const { name, checked } = data;
    this.setState({ [name]: checked }, () => this.searchRooms());
  };

  dropdownHandler = (e, data) => {
    const { name, value } = data;
    this.setState({ [name]: value }, () => this.searchRooms());
  };

  genderHandler = (e, data) => {};

  render() {
    console.log(this.state.selectedState);
    const roomList = this.state.rooms.map(val => {
      const { address, amenities, human, prefs, rent, userID, _id } = val;

      return (
        <RoomCard
          address={address}
          amenities={amenities}
          human={human}
          prefs={prefs}
          rent={rent}
          userID={userID}
          id={_id}
        />
      );
    });
    return (
      <div className="search-rooms">
        <div className="search-menu">
          <div className="search-section">
            <p className="search-section-title">Select State</p>
            <Dropdown
              onChange={(e, data) => this.dropdownHandler(e, data)}
              style={{ width: "20px" }}
              placeholder="Select a State"
              name="selectedState"
              search
              selection
              options={states.states}
            />
          </div>

          <div className="search-section">
            <p className="search-section-title">Rent</p>
            <Input
              style={{ marginTop: 0 }}
              labelPosition="right"
              type="text"
              placeholder="Amount"
            >
              <Label basic>$</Label>
              <input />
              <Label>.00</Label>
            </Input>

            <Dropdown
              onChange={(e, data) => this.dropdownHandler(e, data)}
              style={{ width: "20px" }}
              placeholder="Length (Months)"
              name="rentLength"
              search
              selection
              options={length.length}
            />
          </div>

          <div className="search-section">
            <p className="search-section-title">Gender</p>
            <Dropdown
              onChange={(e, data) => this.dropdownHandler(e, data)}
              style={{ width: "20px" }}
              placeholder="Gender"
              name="gender"
              search
              selection
              options={[
                { text: "Male", value: "male" },
                { text: "Female", value: "female" }
              ]}
            />
          </div>

          <div className="search-section">
            <p className="search-section-title">Preferences</p>
            <div className="slider-selection">
              <Checkbox
                slider
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="smoke"
                style={{ margin: "10px 0" }}
                label="Smoke"
              />
              <Checkbox
                slider
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="clean"
                style={{ margin: "10px 0" }}
                label="Clean"
              />
              <Checkbox
                slider
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="guests"
                style={{ margin: "10px 0" }}
                label="Guests"
              />
              <Checkbox
                slider
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="pets"
                style={{ margin: "10px 0" }}
                label="Pets"
              />
            </div>
          </div>
          <div className="search-section">
            <p className="search-section-title">Amenities</p>
            <div className="selection">
              <Checkbox
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="washer"
                style={{ margin: "10px 0" }}
                label="Washer"
              />
              <Checkbox
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="wifi"
                style={{ margin: "10px 0" }}
                label="Wifi"
              />
              <Checkbox
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="utilities"
                style={{ margin: "10px 0" }}
                label="Utilities"
              />
              <Checkbox
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="furnished"
                style={{ margin: "10px 0" }}
                label="Furnished"
              />
              <Checkbox
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="elevator"
                style={{ margin: "10px 0" }}
                label="Elevator"
              />
              <Checkbox
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="doorman"
                style={{ margin: "10px 0" }}
                label="Doorman"
              />
              <Checkbox
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="airConditioning"
                style={{ margin: "10px 0" }}
                label="Air Conditioning"
              />
              <Checkbox
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="heating"
                style={{ margin: "10px 0" }}
                label="Heating"
              />
              <Checkbox
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="gym"
                style={{ margin: "10px 0" }}
                label="Gym"
              />
              <Checkbox
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="tv"
                style={{ margin: "10px 0" }}
                label="TV"
              />
              <Checkbox
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="privateBathroom"
                style={{ margin: "10px 0" }}
                label="Private Bathroom"
              />
              <Checkbox
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="outdoorSpace"
                style={{ margin: "10px 0" }}
                label="Outdoor Space"
              />
              <Checkbox
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="hasPet"
                style={{ margin: "10px 0" }}
                label="Has Pet"
              />
            </div>
          </div>
        </div>
        <div className="search-results">{roomList}</div>
      </div>
    );
  }
}

export default SearchRooms;

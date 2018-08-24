import React, { Component } from "react";
import RoomCard from "../RoomCard/RoomCard";
import axios from "axios";
import { connect } from "react-redux";
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
    washer: true,
    wifi: true,
    utilities: true,
    furnished: true,
    elevator: false,
    doorman: false,
    airConditioning: true,
    heating: true,
    gym: false,
    tv: false,
    privateBathroom: true,
    outdoorSpace: false,
    hasPet: false,
    male: true,
    female: false,
    selectedState: "",
    rentLength: 0,
    monthlyCost: 9999
  };

  componentDidMount() {
    let state = this.props.match.params.state;

    if (state.length !== 1) {
      this.setState({ selectedState: state });
      this.searchRoomsByState();
    } else {
      this.searchRooms();
    }
  }

  searchRoomsByState = () => {
    let state = this.props.match.params.state;

    axios
      .get(`/api/listings/state/${state}`)
      .then(rooms => this.setState({ rooms: rooms.data }));
  };

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
      selectedState,
      rentLength,
      monthlyCost,
      male,
      female
    } = this.state;

    axios
      .get(
        `/api/rooms/?smoke=${smoke}&clean=${clean}&guests=${guests}&pets=${pets}&washer=${washer}&wifi=${wifi}&utilities=${utilities}&furnished=${furnished}&elevator=${elevator}&doorman=${doorman}&airConditioning=${airConditioning}&heating=${heating}&gym=${gym}&tv=${tv}&privateBathroom=${privateBathroom}&outdoorSpace=${outdoorSpace}&selectedState=${selectedState}&rentLength=${rentLength}&male=${male}&female=${female}&monthlyCost=${monthlyCost}`
      )
      .then(rooms => this.setState({ rooms: rooms.data }));
  };

  inputHandler = e => {
    if (e.target.value.length === 0) {
      this.setState({ monthlyCost: 999 }, () => this.searchRooms());
    } else {
      this.setState({ monthlyCost: e.target.value }, () => this.searchRooms());
    }
  };

  checkboxHandler = (e, data) => {
    const { name, checked } = data;

    this.setState({ [name]: checked }, () => this.searchRooms());
  };

  dropdownHandler = (e, data) => {
    const { name, value } = data;

    this.setState({ [name]: value }, () => this.searchRooms());
  };

  genderHandler = (e, data) => {
    const { name, value } = data;

    if (value === "male") {
      this.setState({ male: true, female: false }, () => this.searchRooms());
    } else if (value === "female") {
      this.setState({ male: false, female: true }, () => this.searchRooms());
    } else {
      this.setState({ male: true, female: true }, () => this.searchRooms());
    }
  };

  addToWishList = (
    id,
    userID,
    loggedInUser,
    monthlyCost,
    city,
    state,
    moveInDate,
    rentLength,
    image
  ) => {
    axios
      .post("/api/addtowishlist", {
        id,
        userID,
        loggedInUser,
        monthlyCost,
        city,
        state,
        moveInDate,
        rentLength,
        image
      })

      .then(res => {
        // this.props.history.push("/wishlist");
      })
      .catch(console.log);
  };

  render() {
    const roomList = this.state.rooms.map((val, i) => {
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
          text="Add To Favorites"
          onSubmit={this.addToWishList}
          images={images}
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
              value={this.state.selectedState}
              options={states.states}
            />
          </div>

          <div className="search-section">
            <p className="search-section-title">Rent</p>
            <Input
              onChange={event => this.inputHandler(event)}
              style={{ marginTop: 0, width: "40%" }}
              labelPosition="right"
              type="number"
              placeholder="Max Amount"
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
              onChange={(e, data) => this.genderHandler(e, data)}
              style={{ width: "20px" }}
              placeholder="Gender"
              name="gender"
              search
              selection
              options={[
                { text: "Male", value: "male" },
                { text: "Female", value: "female" },
                { text: "Both", value: "both" }
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
                defaultChecked
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="washer"
                style={{ margin: "10px 0" }}
                label="Washer"
              />
              <Checkbox
                defaultChecked
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="wifi"
                style={{ margin: "10px 0" }}
                label="Wifi"
              />
              <Checkbox
                defaultChecked
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="utilities"
                style={{ margin: "10px 0" }}
                label="Utilities"
              />
              <Checkbox
                defaultChecked
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
                defaultChecked
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="airConditioning"
                style={{ margin: "10px 0" }}
                label="Air Conditioning"
              />
              <Checkbox
                defaultChecked
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
                defaultChecked
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
            </div>
          </div>
        </div>
        <div className="search-results">{roomList}</div>
      </div>
    );
  }
}

export default connect(state => state)(SearchRooms);

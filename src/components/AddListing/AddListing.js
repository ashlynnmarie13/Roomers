import React, { Component } from "react";
import ReactDOM from "react-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import {
  Checkbox,
  Input,
  Label,
  Dropdown,
  Button,
  TextArea
} from "semantic-ui-react";
import { connect } from "react-redux";
import lengthModel from "../Models/lengthModel";
import ReactS3Uploader from "react-s3-uploader";
import "react-dates/initialize";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import axios from "axios";
import "./AddListing.css";

class AddListing extends Component {
  constructor() {
    super();

    this.state = {
      earlyTwenties: false,
      lateTwenties: false,
      thirties: false,
      fortiesAndOlder: false,
      male: true,
      female: false,
      street: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      monthlyCost: 0,
      depositCost: 0,
      moveInDate: "",
      rentLength: 0,
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
      lat: 0,
      lng: 0,
      images: [],
      description: ""
    };

    this.roomate = React.createRef();
    this.location = React.createRef();
    this.cost = React.createRef();
    this.amenities = React.createRef();
    this.description = React.createRef();
  }

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  radioHandler = (e, data) => {
    const { name } = data;

    name === "male"
      ? this.setState({ male: true, female: false })
      : this.setState({ male: false, female: true });
  };

  checkboxHandler = (e, data) => {
    const { id, checked } = data;

    this.setState({ [id]: checked });
  };

  dropdownHandler = (e, { value }) => {
    this.setState({ rentLength: value });
  };

  submitListing = () => {
    const { authID } = this.props.user;

    axios
      .post("/api/listing/add", { ...this.state, userID: authID })
      .then(response => {
        this.props.history.push("/myprofile");
      });
  };

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address).then(results => {
      this.setState(
        {
          address,
          street: `${results[0].address_components[0].long_name} ${
            results[0].address_components[1].long_name
          }`,
          city: results[0].address_components[3].long_name,
          state: results[0].address_components[5].long_name,
          zip: results[0].address_components[7].long_name
        },
        () => {
          getLatLng(results[0])
            .then(latLng => this.setState({ lat: latLng.lat, lng: latLng.lng }))
            .catch(error => console.error("Error", error));
        }
      );
    });
  };

  onUpload = s3 => {
    this.setState({
      images: [
        ...this.state.images,
        process.env.REACT_APP_AWS_URL + s3.filename
      ]
    });
  };

  scrollTo = chosenRef => {
    let node;

    switch (chosenRef) {
      case "roomate":
        node = ReactDOM.findDOMNode(this.refs.roomate);
        break;
      case "location":
        node = ReactDOM.findDOMNode(this.refs.location);
        break;
      case "cost":
        node = ReactDOM.findDOMNode(this.refs.cost);
        break;
      case "amenities":
        node = ReactDOM.findDOMNode(this.refs.amenities);
        break;
      case "description":
        node = ReactDOM.findDOMNode(this.refs.description);
        break;
    }

    window.scrollTo(0, node.offsetTop);
    window.scrollTo({
      top: node.offsetTop,
      behavior: "smooth"
    });
  };

  render() {
    let images = this.state.images.map((val, i) => {
      return (
        <div key={i} className="image-container">
          <img className="image-item" src={val} alt="" />
        </div>
      );
    });

    return (
      <div className="add-listing">
        <div className="listing-nav">
          <h1 className="nav-header">List Your Place</h1>

          <p onClick={() => this.scrollTo("roomate")}>Roomate</p>
          <p onClick={() => this.scrollTo("location")}>Location</p>
          <p onClick={() => this.scrollTo("cost")}>Cost</p>
          <p onClick={() => this.scrollTo("amenities")}>Amenities</p>
          <p onClick={() => this.scrollTo("description")}>Description</p>
        </div>
        <div className="listing-sections">
          <div ref="roomate" className="listing-section">
            <div>
              <p className="details-header">Who's your ideal roomate?</p>
            </div>
            <div className="section-details">
              <div className="selection">
                <div className="selection-title">Age:</div>
                <div className="section-inputs">
                  <div className="age-input">
                    <Checkbox
                      onChange={(e, data) => this.checkboxHandler(e, data)}
                      id="earlyTwenties"
                      label="Early 20s"
                    />
                  </div>
                  <div className="age-input">
                    <Checkbox
                      onChange={(e, data) => this.checkboxHandler(e, data)}
                      id="lateTwenties"
                      label="Late 20s"
                    />
                  </div>
                  <div className="age-input">
                    <Checkbox
                      onChange={(e, data) => this.checkboxHandler(e, data)}
                      id="thirties"
                      label="30s"
                    />
                  </div>
                  <div className="age-input">
                    <Checkbox
                      onChange={(e, data) => this.checkboxHandler(e, data)}
                      id="fortiesAndOlder"
                      label="40s and Older"
                    />
                  </div>
                </div>
              </div>
              <div className="selection">
                <div className="selection-title">Gender:</div>
                <div className="section-inputs">
                  <div className="age-input">
                    <Checkbox
                      onClick={(e, data) => this.radioHandler(e, data)}
                      style={{ fontSize: "18px", margin: "3px 0" }}
                      radio
                      checked={this.state.male}
                      name="male"
                      label="Male"
                    />
                  </div>
                  <div className="age-input">
                    <Checkbox
                      onClick={(e, data) => this.radioHandler(e, data)}
                      style={{ fontSize: "18px", margin: "3px 0" }}
                      radio
                      checked={this.state.female}
                      name="female"
                      label="Female"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div />
          </div>
          <div ref="location" className="listing-section">
            <div>
              <p className="details-header">Where's your place located?</p>
            </div>
            <div className="section-details">
              <div className="address">
                <div className="section-google-input">
                  <div className="">
                    <PlacesAutocomplete
                      value={this.state.address}
                      onChange={this.handleChange}
                      onSelect={this.handleSelect}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading
                      }) => (
                        <div>
                          <Input
                            required
                            {...getInputProps({
                              placeholder: "Search Places ...",
                              className: "location-search-input"
                            })}
                          />
                          <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                              const className = suggestion.active
                                ? "suggestion-item--active"
                                : "suggestion-item";
                              // inline style for demonstration purpose
                              const style = suggestion.active
                                ? {
                                    backgroundColor: "#fafafa",
                                    cursor: "pointer"
                                  }
                                : {
                                    backgroundColor: "#ffffff",
                                    cursor: "pointer"
                                  };
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style
                                  })}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  </div>
                </div>
              </div>
            </div>
            <div />
          </div>
          <div ref="cost" className="listing-section">
            <div>
              <p className="details-header">
                What's the monthly rent? When can your roomate move in?
              </p>
            </div>
            <div className="section-details">
              <div className="address">
                <div className="section-address-inputs">
                  <div className="address-input">
                    <span className="selection-title">Monthly Rent:</span>
                    <Input
                      required
                      name="monthlyCost"
                      onChange={e => this.inputHandler(e)}
                      style={{ width: "100%", margin: "5px 10px" }}
                      labelPosition="right"
                      type="number"
                      placeholder="Enter Monthly Amount"
                    >
                      <Label basic>$</Label>
                      <input />
                      <Label>.00</Label>
                    </Input>
                  </div>

                  <div className="address-input">
                    <span className="selection-title">Deposit Amount:</span>
                    <Input
                      required
                      name="depositCost"
                      onChange={e => this.inputHandler(e)}
                      style={{ width: "60%", margin: "5px 10px" }}
                      labelPosition="right"
                      type="number"
                      placeholder="Deposit Amount"
                    >
                      <Label basic>$</Label>
                      <input />
                      <Label>.00</Label>
                    </Input>
                  </div>
                  <div className="address-input">
                    <div className="selection-title">Length: </div>
                    <Dropdown
                      required
                      style={{ width: "100%", margin: "5px 10px" }}
                      onChange={this.dropdownHandler}
                      options={lengthModel.length}
                      placeholder="Months"
                      selection
                      value={this.state.length}
                    />
                  </div>
                  <div className="address-input">
                    <div className="selection-title">Move in date: </div>
                    <SingleDatePicker
                      date={this.state.date} // momentPropTypes.momentObj or null
                      onDateChange={date => this.setState({ moveInDate: date })} // PropTypes.func.isRequired
                      focused={this.state.focused} // PropTypes.bool
                      onFocusChange={({ focused }) =>
                        this.setState({ focused })
                      } // PropTypes.func.isRequired
                      id="your_unique_id" // PropTypes.string.isRequired,
                    />
                  </div>
                </div>
              </div>
            </div>
            <div />
          </div>

          <div ref="amenities" className="listing-section">
            <div>
              <p className="details-header">Amenities</p>
            </div>
            <div className="section-details">
              <div className="amend-selection">
                <div className="amend-item">
                  <Checkbox
                    onChange={(e, data) => this.checkboxHandler(e, data)}
                    id="washer"
                    label="In-unit Washer"
                  />
                </div>
                <div className="amend-item">
                  <Checkbox
                    onChange={(e, data) => this.checkboxHandler(e, data)}
                    id="wifi"
                    label="Wifi included"
                  />
                </div>
                <div className="amend-item">
                  <Checkbox
                    onChange={(e, data) => this.checkboxHandler(e, data)}
                    id="utilities"
                    label="Utilities included"
                  />
                </div>
                <div className="amend-item">
                  <Checkbox
                    onChange={(e, data) => this.checkboxHandler(e, data)}
                    id="furnished"
                    label="Furnished"
                  />
                </div>
                <div className="amend-item">
                  <Checkbox
                    onChange={(e, data) => this.checkboxHandler(e, data)}
                    id="elevator"
                    label="Elevator"
                  />
                </div>
                <div className="amend-item">
                  <Checkbox
                    onChange={(e, data) => this.checkboxHandler(e, data)}
                    id="doorman"
                    label="Doorman"
                  />
                </div>
                <div className="amend-item">
                  <Checkbox
                    onChange={(e, data) => this.checkboxHandler(e, data)}
                    id="airConditioning"
                    label="Air Conditioning"
                  />
                </div>
                <div className="amend-item">
                  <Checkbox
                    onChange={(e, data) => this.checkboxHandler(e, data)}
                    id="heating"
                    label="Heating"
                  />
                </div>
                <div className="amend-item">
                  <Checkbox
                    onChange={(e, data) => this.checkboxHandler(e, data)}
                    id="gym"
                    label="Gym"
                  />
                </div>
                <div className="amend-item">
                  <Checkbox
                    onChange={(e, data) => this.checkboxHandler(e, data)}
                    id="tv"
                    label="TV"
                  />
                </div>
                <div className="amend-item">
                  <Checkbox
                    onChange={(e, data) => this.checkboxHandler(e, data)}
                    id="privateBathroom"
                    label="Private Bathroom"
                  />
                </div>
                <div className="amend-item">
                  <Checkbox
                    onChange={(e, data) => this.checkboxHandler(e, data)}
                    id="outdoorSpace"
                    label="Outdoor Space"
                  />
                </div>
                <div className="amend-item">
                  <Checkbox
                    onChange={(e, data) => this.checkboxHandler(e, data)}
                    id="hasPet"
                    label="Has Pet"
                  />
                </div>
              </div>
            </div>
            <div />
          </div>
          <div ref="description" className="listing-section">
            <div>
              <p className="details-header">Description</p>
            </div>
            <div className="section-details">
              <TextArea
                required
                name="description"
                onChange={e => this.inputHandler(e)}
                autoHeight
                rows={8}
                style={{ width: "100%" }}
              />
            </div>
            <div />
          </div>
          <div className="listing-section">
            <div>
              <p className="details-header">Upload Photos</p>
            </div>
            <div className="section-details">
              <ReactS3Uploader
                required
                signingUrl="/s3/sign"
                signingUrlMethod="GET"
                accept="image/*"
                s3path=""
                onProgress={this.progress}
                onFinish={this.onUpload}
                contentDisposition="auto"
                scrubFilename={filename =>
                  filename.replace(/[^\w\d_\-.]+/gi, "")
                }
                inputRef={cmp => (this.uploadInput = cmp)}
                server={process.env.REACT_APP_SERVER}
                autoUpload
              />
            </div>
            <div className="images">{images}</div>
            <div />
          </div>
          <div className="listing-section-button">
            <div>
              <Button onClick={() => this.submitListing()} color="blue">
                Save
              </Button>
            </div>
            <div />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(AddListing);

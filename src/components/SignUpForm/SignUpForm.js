import React, { Component } from "react";
import ReactS3Uploader from "react-s3-uploader";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import {
  Input,
  Checkbox,
  TextArea,
  Button,
  Icon,
  Card,
  Dropdown
} from "semantic-ui-react";
import "react-dates/initialize";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController,
  DayPicker
} from "react-dates";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import { addUserInfo } from "../../redux/ducks/userReducer";
import { connect } from "react-redux";
import "./SignUpForm.css";
import axios from "axios";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

class SignUpForm extends Component {
  state = {
    userID: "",
    name: "",
    male: true,
    female: false,
    year: "",
    date: "",
    email: "",
    phone: "",
    dob: "",
    about: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    address: "",
    lat: 0,
    lng: 0,
    title: "",
    companyName: "",
    description: "",
    organized: false,
    clean: false,
    healthy: false,
    professional: false,
    student: false,
    earlyBird: false,
    nightOwl: false,
    fitnessEnthusiast: false,
    creative: false,
    bookworm: false,
    foodie: false,
    partyAnimal: false,
    vegan: false,
    introverted: false,
    smoke: false,
    clean: false,
    guests: false,
    pets: false,
    image: "",
    focused: true
  };

  addDashes = f => {
    let f_val = f.replace(/\D[^\.]/g, "");
    return f_val.slice(0, 3) + "-" + f_val.slice(3, 6) + "-" + f_val.slice(6);
  };

  inputHandler = e => {
    if (e.target.name === "phone") {
      let phone = this.addDashes(e.target.value);
      this.setState({ phone });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  checkboxHandler = (e, data) => {
    const { name, checked } = data;
    this.setState({ [e.target.name]: checked });
  };

  submitHandler = e => {
    e.preventDefault();

    this.props.addUserInfo({
      ...this.state,
      userID: this.props.user.authID
    });
    this.props.history.push("/home");
  };

  handleChange = address => {
    this.setState({ address });
  };

  dropdownHandler = (e, data) => {
    const { name, value } = data;
    if (value === "male") {
      this.setState({ male: true, female: false });
    } else if (value === "female") {
      this.setState({ male: false, female: true });
    } else {
      this.setState({ [name]: value });
    }
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
      profilePic: process.env.REACT_APP_AWS_URL + s3.filename
    });
  };

  render() {
    return (
      <div className="sign-up">
        <div className="picture" />
        <form
          encType="multipart/form-data"
          onSubmit={e => this.submitHandler(e)}
          className="sign-up-form"
        >
          <div className="section section-basic">
            <div className="first-section">
              <h1 className="section-title">
                <i class="fas fa-smile" /> Basic Info
              </h1>
              <div className="input-item">
                <p className="section-item">Name</p>
                <Input
                  placeholder="Name"
                  onChange={event => this.inputHandler(event)}
                  placeholder="Name"
                  name="name"
                  type="text"
                  required
                />
              </div>
              <div className="input-item">
                <p className="section-item">Gender</p>
                <Dropdown
                  onChange={(e, data) => this.dropdownHandler(e, data)}
                  style={{ height: "60%" }}
                  placeholder="Gender"
                  name="gender"
                  search
                  selection
                  options={[
                    { text: "Male", value: "male" },
                    { text: "Female", value: "female" }
                  ]}
                  required
                />
              </div>
              <div className="input-item">
                <p className="section-item">Email</p>
                <Input required iconPosition="left" placeholder="Email">
                  <Icon name="at" />
                  <input />
                </Input>
              </div>
              <div className="input-item">
                <p className="section-item">Phone</p>
                {/* <br /> */}
                <div>
                  <PhoneInput
                    style={{ marginBottom: "3%" }}
                    placeholder="Enter phone number"
                    country="US"
                    value={this.state.phone}
                    onChange={phone => this.setState({ phone })}
                  />
                </div>
                <div className="input-item">
                  <p className="section-item">Date of Birth</p>

                  {!this.state.year ? (
                    <Dropdown
                      onChange={(e, data) => this.dropdownHandler(e, data)}
                      name="year"
                      placeholder="Year"
                      options={[
                        { text: "2010", value: "2010" },
                        { text: "2018", value: "2018" }
                      ]}
                    />
                  ) : (
                    <DayPicker
                      date={moment(`01/01/${this.state.year}`)} // momentPropTypes.momentObj or null
                      onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                      focused={this.state.focused} // PropTypes.bool
                      onFocusChange={({ focused }) =>
                        this.setState({ focused })
                      }
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="second-section">
              <div className="input-item-about">
                <p className="section-item-about">About you</p>
                <TextArea
                  placeholder="Interests, hobbies, habits..."
                  style={{ width: "100%", height: "500px" }}
                  onChange={event => this.inputHandler(event)}
                  name="about"
                  type="text"
                  required
                />
              </div>
              <div className="address">
                <div className="input">
                  <p className="section-item-address">Address</p>
                  <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                    required
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
              <div className="input-photo">
                <p className="section-item-photo">Upload a photo:</p>
                {this.state.image ? (
                  <img
                    onClick={() => this.setState({ image: "" })}
                    className="profile-image"
                    src={this.state.image}
                    alt=""
                  />
                ) : (
                  <ReactS3Uploader
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
                    required
                  />
                )}
              </div>
            </div>
          </div>

          <div className="section-traits">
            <h1 className="section-title">
              <i class="fas fa-laugh" /> Traits
            </h1>

            <div className="traits-one">
              <label htmlFor="clean">Organized</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="organized"
                id="organized"
                type="checkbox"
              />
              <label htmlFor="clean">Healthy</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="healthy"
                id="healthy"
                type="checkbox"
              />
              <label htmlFor="professional">Professional</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="professional"
                id="professional"
                type="checkbox"
              />
              <label htmlFor="student">Student</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="student"
                id="student"
                type="checkbox"
              />
              <label htmlFor="earlyBird">Early Bird</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="earlyBird"
                id="earlyBird"
                type="checkbox"
              />
              <label htmlFor="nightOwl">Night Owl</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="nightOwl"
                id="nightOwl"
                type="checkbox"
              />
            </div>
            <div className="traits-two">
              <label htmlFor="fitnessEnthusiast">Fitness Enthusiast</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="fitnessEnthusiast"
                id="fitnessEnthusiast"
                type="checkbox"
              />
              <label htmlFor="creative">Creative</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="creative"
                id="creative"
                type="checkbox"
              />

              <label htmlFor="bookworm">Bookworm</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="bookworm"
                id="bookworm"
                type="checkbox"
              />
              <label htmlFor="foodie">Foodie</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="foodie"
                id="foodie"
                type="checkbox"
              />
              <label htmlFor="partyAnimal">Party Animal</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="partyAnimal"
                id="partyAnimal"
                type="checkbox"
              />
              <label htmlFor="vegan">Vegan</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="vegan"
                id="vegan"
                type="checkbox"
              />
              <label htmlFor="introverted">Introverted</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="introverted"
                id="introverted"
                type="checkbox"
              />
            </div>
          </div>

          <div className="third-section">
            <div className="section-description">
              <h1 className="section-title">
                <i class="fas fa-pencil-alt" /> Description
              </h1>

              <TextArea
                placeholder="What are you looking for?"
                style={{ width: "500px", height: "180px" }}
                onChange={event => this.inputHandler(event)}
                name="description"
                type="text"
                required
              />
            </div>
            <div className="section-career">
              <h1 className="section-title">
                <i class="fas fa-briefcase" /> Career
              </h1>
              <div className="job-inputs">
                <p className="section-item">Job Title</p>
                <Input
                  style={{ height: "50px" }}
                  onChange={event => this.inputHandler(event)}
                  name="title"
                  type="text"
                  placeholder="CEO"
                  required
                />
                <p className="section-item">Company Name</p>
                <Input
                  style={{ height: "50px" }}
                  onChange={event => this.inputHandler(event)}
                  name="companyName"
                  type="text"
                  placeholder="BARC-Housing"
                  required
                />
              </div>
            </div>

            <div className="section-prefs">
              <h1 className="section-title">
                <i class="fas fa-thumbs-up" /> Preferences
              </h1>
              <div className="job-inputs">
                <div className="pref-item">
                  <Checkbox
                    onChange={(event, data) =>
                      this.checkboxHandler(event, data)
                    }
                    name="smoke"
                    id="smoke"
                    type="checkbox"
                  />
                  <label htmlFor="smoke">
                    {"  "}
                    Smoker <i className="fas fa-smoking" />
                  </label>
                </div>
                <div className="pref-item">
                  <Checkbox
                    onChange={(event, data) =>
                      this.checkboxHandler(event, data)
                    }
                    name="guests"
                    id="guests"
                    type="checkbox"
                  />
                  <label htmlFor="guests">
                    {"  "}
                    Guests <i className="fas fa-users" />
                  </label>
                </div>
                <div className="pref-item">
                  <Checkbox
                    onChange={(event, data) =>
                      this.checkboxHandler(event, data)
                    }
                    name="pets"
                    id="pets"
                    type="checkbox"
                  />
                  <label className="" htmlFor="pets">
                    {"  "}
                    Pets <i className="fas fa-paw" />
                  </label>
                </div>
                <div className="pref-item">
                  <Checkbox
                    onChange={(event, data) =>
                      this.checkboxHandler(event, data)
                    }
                    name="clean"
                    id="clean"
                    type="checkbox"
                  />
                  <label className="" htmlFor="clean">
                    {"  "}
                    Clean <i class="fas fa-shower" />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button
              style={{
                backgroundColor: "#031424",
                color: "white",
                height: "75px",
                width: "175px",
                fontSize: "20px"
              }}
              type="submit"
              animated
            >
              <Button.Content visible>Submit</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  state => state,
  { addUserInfo }
)(SignUpForm);

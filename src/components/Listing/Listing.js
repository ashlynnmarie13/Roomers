import React, { Component } from "react";
import MyMapComponent from "../MyMapComponent/MyMapComponent";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Button, Header, Icon, Modal, Checkbox } from "semantic-ui-react";
import { connect } from "react-redux";
import "./Listing.css";

class Listing extends Component {
  state = {
    listingInfo: {},
    userInfo: {},
    loggedInUser: "",
    editToggle: false,
    modalOpen: false,
    imageNum: 0,
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
    outdoorSpace: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get(`/api/listing/id/${id}`).then(listing => {
      this.setState({ listingInfo: listing.data }, () => {
        let amenArr = [];
        let prefsArr = [];

        for (let i in this.state.listingInfo.amenities) {
          if (this.state.listingInfo.amenities[i] === true) {
            amenArr.push(i);
          }
        }

        for (let i in this.state.listingInfo.prefs) {
          if (this.state.listingInfo.prefs[i] === true) {
            prefsArr.push(i);
          }
        }

        amenArr.forEach(val => {
          switch (val) {
            case "washer":
              this.setState({ washer: true });
              break;
            case "wifi":
              this.setState({ wifi: true });
              break;
            case "utilities":
              this.setState({ utilities: true });
              break;
            case "furnished":
              this.setState({ furnished: true });
              break;
            case "elevator":
              this.setState({ elevator: true });
              break;
            case "doorman":
              this.setState({ doorman: true });
              break;
            case "airConditioning":
              this.setState({ airConditioning: true });
              break;
            case "heating":
              this.setState({ heating: true });
              break;
            case "gym":
              this.setState({ gym: true });
              break;
            case "tv":
              this.setState({ tv: true });
              break;
            case "privateBathroom":
              this.setState({ privateBathroom: true });
              break;
            case "outdoorSpace":
              this.setState({ outdoorSpace: true });
              break;
            case "hasPet":
              this.setState({ hasPet: true });
              break;
            default:
              break;
          }
        });

        prefsArr.forEach(val => {
          switch (val) {
            case "smoke":
              this.setState({ smoke: true });
              break;
            case "clean":
              this.setState({ clean: true });
              break;
            case "guests":
              this.setState({ guests: true });
              break;
            case "pets":
              this.setState({ pets: true });
              break;
            default:
              break;
          }
        });

        axios
          .get(`/api/user/info/${this.state.listingInfo.userID}`)
          .then(user => this.setState({ userInfo: user.data }));
      });
    });
  }

  deleteListing = () => {
    const { id } = this.props.match.params;
    axios
      .delete(`/api/listing/${id}`)
      .then(listings => this.props.history.push("/myprofile"));
  };

  confirmChanges = () => {
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
      hasPet
    } = this.state;
    const { id } = this.props.match.params;

    axios
      .put(`/api/listing/${id}`, {
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
        hasPet
      })
      .then(response => {
        const { smoke, clean, guests, pets } = response.data.prefs;
        const {
          airConditioning,
          doorman,
          elevator,
          furnished,
          gym,
          heating,
          outdoorSpace,
          privateBathroom,
          tv,
          utilities,
          washer,
          wifi
        } = response.data.amenities;

        console.log(response.data.amenities, response.data.prefs);

        this.setState({
          listingInfo: {
            ...this.state.listingInfo,
            amenities: response.data.amenities,
            prefs: response.data.prefs
          },

          // ["listingInfo.prefs"]: {
          //   smoke,
          //   clean,
          //   guests,
          //   pets
          // },

          editToggle: false
        });
      });
  };

  checkboxHandler = (e, data) => {
    const { id, checked } = data;

    this.setState({ [id]: checked });
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = choice => {
    if (choice) {
      this.deleteListing();
    }
    this.setState({ modalOpen: false });
  };

  amenitiesList = amenities => {
    let list = [];

    for (let i in amenities) {
      if (amenities[i] === true) {
        list.push(i);
      }
    }

    let newArr = list.map(val => {
      switch (val) {
        case "washer":
          return "Washer Included";
        case "wifi":
          return "Wifi Included";
        case "utilities":
          return "Utilities Included";
        case "furnished":
          return "Furnished";
        case "elevator":
          return "Elevator";
        case "doorman":
          return "Doorman";
        case "airConditioning":
          return "Air Conditioning";
        case "heating":
          return "Heating";
        case "gym":
          return "Gym";
        case "tv":
          return "TV";
        case "privateBathroom":
          return "Private Bathroom";
        case "outdoorSpace":
          return "Outdoor Space";
        case "hasPet":
          return "Has Pet";
      }
    });

    return newArr;
  };

  prefsList = prefs => {
    let list = [];

    for (let i in prefs) {
      if (prefs[i] === false) {
        switch (i) {
          case "smoke":
            list.push("No Smoking");
            break;
          case "guests":
            list.push("No Guests");
            break;
          case "pets":
            list.push("No Pets");
            break;
          case "clean":
            list.push("No Messes");
            break;
        }
      } else {
        switch (i) {
          case "smoke":
            list.push("Smoking is okay");
            break;
          case "guests":
            list.push("Guests are welcome");
            break;
          case "pets":
            list.push("Pets can stay");
            break;
          case "clean":
            list.push("Don't need to be a clean freak");
            break;
        }
      }
    }

    return list;
  };

  carousel = direction => {
    if (direction === "left") {
      if (this.state.imageNum <= 0) {
        this.setState({ imageNum: this.state.listingInfo.images.length - 1 });
      } else {
        this.setState({ imageNum: this.state.imageNum - 1 });
      }
    } else {
      if (this.state.imageNum >= this.state.listingInfo.images.length - 1) {
        this.setState({ imageNum: 0 });
      } else {
        this.setState({ imageNum: this.state.imageNum + 1 });
      }
    }
  };

  render() {
    const {
      aboutMe,
      birthday,
      date,
      email,
      interestsDescription,
      name,
      phone,
      prefs,
      profilePic,
      title,
      traits,
      _id
    } = this.state.userInfo;

    let amenities = this.amenitiesList(this.state.listingInfo.amenities).map(
      val => {
        return <p className="list-item">{val}</p>;
      }
    );

    let preferences = this.prefsList(this.state.listingInfo.prefs).map(val => {
      return <p className="list-item">{val}</p>;
    });

    return (
      <div className="listing-page">
        <div className="listing-image">
          <img
            src={
              this.state.listingInfo.images &&
              this.state.listingInfo.images[this.state.imageNum]
            }
            alt=""
          />
          <i
            onClick={() => this.carousel("left")}
            className="far fa-arrow-alt-circle-left"
          />
          <i
            onClick={() => this.carousel("right")}
            className="far fa-arrow-alt-circle-right"
          />
        </div>
        <div className="listing">
          <div className="listing-details">
            <div className="listing-header">
              <h1>
                $
                {this.state.listingInfo.rent &&
                  Number(
                    this.state.listingInfo.rent.monthlyCost
                  ).toLocaleString()}{" "}
                in{" "}
                {this.state.listingInfo.address &&
                  this.state.listingInfo.address.city}
                ,{" "}
                {this.state.listingInfo.address &&
                  this.state.listingInfo.address.state}
              </h1>
              <div className="listing-info">
                <span>Move in: </span>
                {this.state.listingInfo.rent &&
                  moment(this.state.listingInfo.rent.moveInDate).format(
                    "MMM Do YYYY"
                  )}
                <span>Duration: </span>
                {this.state.listingInfo.rent &&
                  this.state.listingInfo.rent.rentLength}{" "}
                months
                <span>Deposit: </span>$
                {this.state.listingInfo.rent &&
                  Number(
                    this.state.listingInfo.rent.depositCost
                  ).toLocaleString()}
              </div>
              <div className="listing-section">
                <h1>
                  <i class="fas fa-home" /> {this.state.userInfo.name}
                  's place{" "}
                </h1>
                <h2>The Space</h2>
                <p className="listing-section-description">
                  {this.state.listingInfo.description}
                </p>
                <h2>Amenities</h2>
                <div className="amenities-list">
                  {this.state.editToggle ? (
                    <React.Fragment>
                      {" "}
                      <Checkbox
                        className="list-item"
                        toggle
                        onChange={(e, data) => this.checkboxHandler(e, data)}
                        id="washer"
                        label="Washer Included"
                        checked={this.state.washer}
                      />{" "}
                      <Checkbox
                        className="list-item"
                        toggle
                        onChange={(e, data) => this.checkboxHandler(e, data)}
                        id="wifi"
                        label="Wifi Included"
                        checked={this.state.wifi}
                      />{" "}
                      <Checkbox
                        className="list-item"
                        toggle
                        onChange={(e, data) => this.checkboxHandler(e, data)}
                        id="utilities"
                        label="Utilities Included"
                        checked={this.state.utilities}
                      />{" "}
                      <Checkbox
                        className="list-item"
                        toggle
                        onChange={(e, data) => this.checkboxHandler(e, data)}
                        id="furnished"
                        label="Furnished"
                        checked={this.state.furnished}
                      />
                      <Checkbox
                        className="list-item"
                        toggle
                        onChange={(e, data) => this.checkboxHandler(e, data)}
                        id="elevator"
                        label="Elevator"
                        checked={this.state.elevator}
                      />
                      <Checkbox
                        className="list-item"
                        toggle
                        onChange={(e, data) => this.checkboxHandler(e, data)}
                        id="doorman"
                        label="Doorman"
                        checked={this.state.doorman}
                      />
                      <Checkbox
                        className="list-item"
                        toggle
                        onChange={(e, data) => this.checkboxHandler(e, data)}
                        id="airConditioning"
                        label="Air Conditioning"
                        checked={this.state.airConditioning}
                      />
                      <Checkbox
                        className="list-item"
                        toggle
                        onChange={(e, data) => this.checkboxHandler(e, data)}
                        id="heating"
                        label="Heating"
                        checked={this.state.heating}
                      />
                      <Checkbox
                        className="list-item"
                        toggle
                        onChange={(e, data) => this.checkboxHandler(e, data)}
                        id="gym"
                        label="Gym"
                        checked={this.state.gym}
                      />
                      <Checkbox
                        className="list-item"
                        toggle
                        onChange={(e, data) => this.checkboxHandler(e, data)}
                        id="tv"
                        label="TV"
                        checked={this.state.tv}
                      />
                      <Checkbox
                        className="list-item"
                        toggle
                        onChange={(e, data) => this.checkboxHandler(e, data)}
                        id="privateBathroom"
                        label="Private Bathroom"
                        checked={this.state.privateBathroom}
                      />
                      <Checkbox
                        className="list-item"
                        toggle
                        onChange={(e, data) => this.checkboxHandler(e, data)}
                        id="outdoorSpace"
                        label="Outdoor Space"
                        checked={this.state.outdoorSpace}
                      />
                    </React.Fragment>
                  ) : (
                    amenities
                  )}
                </div>
              </div>
              <div className="listing-section">
                <h1>
                  <i class="fas fa-adjust" /> {this.state.userInfo.name}
                  's Ideal Roomate{" "}
                </h1>
                <h2>Roomate Rules</h2>
                <div className="amenities-list">
                  {this.state.editToggle ? (
                    <React.Fragment>
                      {" "}
                      <Checkbox
                        className="list-item"
                        slider
                        onChange={(e, data) => this.checkboxHandler(e, data)}
                        id="smoke"
                        label="Smoking"
                        checked={this.state.smoke}
                      />{" "}
                      <Checkbox
                        className="list-item"
                        slider
                        onChange={(e, data) => this.checkboxHandler(e, data)}
                        id="clean"
                        label="Clean/Organized"
                        checked={this.state.clean}
                      />{" "}
                      <Checkbox
                        className="list-item"
                        slider
                        onChange={(e, data) => this.checkboxHandler(e, data)}
                        id="guests"
                        label="Frequent Guests"
                        checked={this.state.guests}
                      />{" "}
                      <Checkbox
                        className="list-item"
                        slider
                        onChange={(e, data) => this.checkboxHandler(e, data)}
                        id="pets"
                        label="Pet Owner"
                        checked={this.state.pets}
                      />
                    </React.Fragment>
                  ) : (
                    preferences
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="listing-profile">
            <div className="listing-profile-card">
              <Link to={`/profile/${_id}`}>
                <img style={{ objectFit: "cover" }} src={profilePic} alt="" />
              </Link>

              <Link to={`/chat/${_id}`}>
                <Button
                  style={{
                    margin: "10px 0",
                    backgroundColor: "#8eaebd",
                    color: "white",
                    textShadow: ".5px .5px #000000"
                  }}
                >
                  Message
                </Button>
              </Link>
              <h3>More about {name}</h3>
              <p>{aboutMe}</p>
            </div>
          </div>
        </div>

        <div className="google-maps">
          <MyMapComponent
            lat={
              this.state.listingInfo.address &&
              this.state.listingInfo.address.lat
            }
            lng={
              this.state.listingInfo.address &&
              this.state.listingInfo.address.lng
            }
          />
        </div>
        {this.props.user.authID === _id && (
          <div className="listing-buttons">
            <Button
              onClick={() =>
                this.setState({ editToggle: !this.state.editToggle })
              }
              style={{
                marginRight: "10px",
                backgroundColor: "white",
                border: "solid #031424 2px",
                color: "#031424"
              }}
            >
              {this.state.editToggle ? <p>Cancel</p> : <p>Edit</p>}
            </Button>
            {this.state.editToggle ? (
              <Button
                style={{
                  backgroundColor: "#031424",
                  border: "solid #031424 2px",
                  color: "white"
                }}
                onClick={() => this.confirmChanges()}
              >
                Confirm
              </Button>
            ) : (
              <Modal
                trigger={
                  <Button
                    style={{
                      backgroundColor: "#031424",
                      border: "solid #031424 2px",
                      color: "white"
                    }}
                    onClick={this.handleOpen}
                  >
                    Delete
                  </Button>
                }
                open={this.state.modalOpen}
                onClose={this.handleClose}
                basic
                size="small"
              >
                <Header icon="browser" content="Delete Listing" />
                <Modal.Content>
                  <h3>Are you sure you want to delete this listing?</h3>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    style={{
                      backgroundColor: "white",
                      border: "solid #031424 2px",
                      color: "#031424"
                    }}
                    onClick={() => this.handleClose(false)}
                    inverted
                  >
                    <Icon name="cancel" /> Cancel
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#031424",
                      border: "solid #031424 2px",
                      color: "white"
                    }}
                    onClick={() => this.handleClose(true)}
                    inverted
                  >
                    <Icon name="checkmark" /> Yes
                  </Button>
                </Modal.Actions>
              </Modal>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default connect(state => state)(Listing);

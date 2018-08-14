import React, { Component } from "react";
import MyMapComponent from "../MyMapComponent/MyMapComponent";
import { Link } from "react-router-dom";
import axios from "axios";
import { list } from "../../../node_modules/postcss";
import { Button } from "semantic-ui-react";
import "./Listing.css";

class Listing extends Component {
  state = {
    listingInfo: {},
    userInfo: {}
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/listing/${id}`).then(listing => {
      this.setState({ listingInfo: listing.data[0] }, () =>
        axios
          .get(`/api/user/info/${this.state.listingInfo.userID}`)
          .then(user => this.setState({ userInfo: user.data }))
      );
    });
  }

  render() {
    console.log(this.state);
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

    return (
      <div>
        <div
          style={{
            backgroundImage: `url(${this.state.listingInfo &&
              this.state.listingInfo.images})`
          }}
          className="listing-image"
        />
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
                  this.state.listingInfo.rent.moveInDate}
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
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veniam, ducimus incidunt necessitatibus repudiandae rerum nisi
                  rem excepturi sed iure aperiam accusantium laboriosam? Nisi
                  commodi ullam consequatur voluptatem magnam tempore ipsum.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Illum voluptatem odit accusamus dolorum voluptate dolores
                  fugit nihil, mollitia, assumenda soluta ipsa dolore tempora
                  deserunt laboriosam necessitatibus asperiores deleniti
                  doloribus reprehenderit?
                </p>
                <h2>Amenities</h2>
              </div>
            </div>
          </div>
          <div className="listing-profile">
            <div className="listing-profile-card">
              <Link to={`/profile/${_id}`}>
                <img src={profilePic} alt="" />
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

        {/* <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        /> */}
      </div>
    );
  }
}

export default Listing;

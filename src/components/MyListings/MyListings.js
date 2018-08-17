import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./MyListings.css";
import RoomCard from "../RoomCard/RoomCard";
import { WSAEINVALIDPROCTABLE } from "constants";

class MyListings extends Component {
  state = {
    isLoading: false,
    listings: []
  };

  componentDidMount() {
    const { authID } = this.props.user;
    console.log(this.props);
    axios
      .get(`/api/listing/${authID}`)
      .then(response => this.setState({ listings: { ...response.data } }));
  }

  render() {
    const listings = this.state.listings;
    const { authID } = this.props.user;
    console.log(listings);

    let roomsList = Object.values(listings);
    console.log(listings[0]);
    console.log(roomsList);

    const rooms = [];
    roomsList.forEach(function(thing) {
      if (thing.userID === authID) {
        rooms.push(thing);
      } else {
        console.log("not me");
      }
    });

    console.log(rooms);

    const finalRooms = rooms.map(val => {
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
          images={images}
        />
      );
    });

    return <div className="profile-listings">{finalRooms}</div>;
  }
}

export default connect(state => state)(MyListings);

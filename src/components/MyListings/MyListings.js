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
    const authID = this.props.user.authID;
    axios
      .get(`/api/listings/id/${authID}`)
      .then(response => this.setState({ listings: { ...response.data } }));
  }

  render() {
    const listings = this.state.listings;

    let roomsList = Object.values(listings);
    const rooms = roomsList.map(val => {
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
      console.log(address);

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

    return <div className="profile-listings">{rooms}</div>;
  }
}

export default connect(state => state)(MyListings);

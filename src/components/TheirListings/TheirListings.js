import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./TheirListings.css";
import RoomCard from "../RoomCard/RoomCard";
import { WSAEINVALIDPROCTABLE } from "constants";

class TheirListings extends Component {
  state = {
    isLoading: false,
    listings: []
  };

  componentDidMount() {
    const authID = "google-oauth2|109803081908967859150";
    console.log(this.props);
    axios
      .get(`/api/listing/${authID}`)
      .then(response => this.setState({ listings: { ...response.data } }));
  }

  render() {
    const listings = this.state.listings;

    let roomsList = Object.values(listings);

    const rooms = roomsList.map(val => {
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

    return <div>{rooms}</div>;
  }
}

export default connect(state => state)(TheirListings);

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
    const id = this.props.id;
    console.log(this.props);
    axios

      .get(`/api/listings/${id}`)

      .then(response => {
        console.log(response.data);
        this.setState({ listings: response.data });
      });
  }

  render() {
    const finalRooms = this.state.listings.map(val => {
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

export default connect(state => state)(TheirListings);

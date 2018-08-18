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
    const id = this.props;
    console.log(this.props);
    axios
      .get(`/api/listing/${id}`)
      .then(response => this.setState({ listings: { ...response.data } }));
  }

  render() {
    const listings = this.state.listings;
    const { id } = this.props.id;
    console.log(id);
    console.log(listings);

    let roomsList = Object.values(listings);
    console.log(listings[0]);
    console.log(roomsList);

    const rooms = [];
    roomsList.forEach(function(item) {
      if (item.userID === id) {
        rooms.push(item);
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

export default connect(state => state)(TheirListings);

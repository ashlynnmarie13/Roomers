import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./MyListings.css";

class MyListings extends Component {
  state = {
    isLoading: false,
    listings: []
  };

  componentDidMount = () => {
    const { id } = this.props.user;

    axios
      .get(`/api/user/listings/${id}`)
      .then(listings => console.log(listings.data));
  };

  render() {
    return <div>My Listings</div>;
  }
}

export default connect(state => state)(MyListings);

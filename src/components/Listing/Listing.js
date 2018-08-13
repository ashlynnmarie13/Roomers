import React, { Component } from "react";
import axios from "axios";

export default class Listing extends Component {
  state = {
    listingInfo: {}
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`/api/listing/${id}`)
      .then(listing => this.setState({ listingInfo: listing.data }));
  }

  render() {
    console.log(this.state.listingInfo[0]);
    return <div>Listing</div>;
  }
}

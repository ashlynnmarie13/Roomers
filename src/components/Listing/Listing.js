import React, { Component } from "react";
import MyMapComponent from "../MyMapComponent/MyMapComponent";
import axios from "axios";

class Listing extends Component {
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
    return (
      <div>
        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Listing;

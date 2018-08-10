import React, { Component } from "react";
import axios from "axios";
import stateModel from "../Models/stateModel";
import { connect } from "react-redux";
import ListingCard from "../ListingCard/ListingCard";
import { Select, Loader, Segment, Input } from "semantic-ui-react";
import "./SearchRooms.css";


class SearchRooms extends Component {
state = {

  selectedState: "",
    states: stateModel.states
}



componentDidMount() {
  this.searchListings();
}

searchListings = () => {

  axios
    .get(
      `/api/listing`
    )
    .then(response =>
      this.setState({ listings: response.data, isLoading: false }, () =>
        console.log(response.data)
      )
    );
};



render() {
    console.log(stateModel.states);
    const listings = this.state.listings.map((listing, i) => {
      const { adress, rent, roomages, roomimages, profilePic, availableDate, _id } = listing;

      return (
        <ListingCard
          key={i}
          adress={adress}
          rent={rent}
          roomages={roomages}
          roomimages={roomimages}
          profilePic={profilePic}
          availableDate={availableDate}
          id={_id}
          pathPush={this.props.history.push}
        />
      );
    });

    const loader = (
      <Segment style={{ height: "90vh" }}>
        <Loader active>Loading</Loader>
      </Segment>
    );

    return (
      <div>
        <div className="search-listings">
          <div className="filter-options">
            

            <div className="search-listing-section">
              <p className="search-section-title">Location</p>
              <Select
                onChange={(e, data) => this.dropdownHandler(e, data)}
                className="search-listing-item"
                placeholder="Select City"
                options={this.state.states}
              />
            </div>
          </div>
          {this.state.isLoading ? (
            loader
          ) : (
            <div className="listings">{listings}</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  listing: state.listing
});

export default connect(
  mapStateToProps,
)(SearchRooms);


import React, { Component } from "react";
import axios from "axios";
import cityModel from "../Models/cityModel";
import { connect } from "react-redux";
import ListingCard from "../ListingCard/ListingCard";
import { Select, Loader, Segment, Input } from "semantic-ui-react";
import "./SearchRooms.css";

class SearchRooms extends Component {
  state = {
    cities: cityModel.cities,
    listings: [],
    selectedCity:""
  };

  componentDidMount() {
    this.searchListings();
  }

  searchListings = () => {
    axios.get(`/api/listing/?city=omaha`);
    // .then(response =>
    //   this.setState({ listings: response.data, isLoading: false }, () =>
    //     console.log(response.data)
    //   )
    // );
  };
  inputHandler = e => {
    this.setState({ search: e.target.value }, () => this.searchListings());
  };
  dropdownHandler = (e, data) => {
    const { value } = data;
    this.setState({ selectedCity: value }, () => this.searchListings());
  };

  render() {
    console.log(cityModel.states);
    const listings = this.state.listings.map((listing, i) => {
      const {
        address,
        rent,
        roomages,
        roomimages,
        availableDate,
        _id
      } = listing;

      return (
        <ListingCard
          key={i}
          address={address}
          rent={rent}
          roomages={roomages}
          roomimages={roomimages}
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
                options={this.state.cities}
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

export default connect(mapStateToProps)(SearchRooms);

import React, { Component } from "react";
import Cards from "../Cards/Cards";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";
class Location extends Component {
  state = {
    listing: []
  };
  componentDidMount = () => {
    // axios.get("/api/Listing").then({ listing: listing.data });
  };

  render() {
    const { listing } = this.state;
    let listingList;
    listing &&
      (listingList = listing.map(val => {
        const {} = val;
        // return()
      }));
    return (
      <div>
        <Card>
          <Image src="" />
          <Card.Content>
            <Card.Header>Listing Name</Card.Header>
            <Card.Meta>
              <span className="date">rent</span>
            </Card.Meta>
            <Card.Description>Prefs</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              go to user profile
            </a>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default Location;

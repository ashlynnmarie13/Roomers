import React, { Component } from "react";
import axios from "axios";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import "./Wishlist.css";

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishList: []
    };
  }

  componentDidMount() {
    axios.get(`/api/wishlist/${this.props.user.authID}`).then(response => {
      this.setState({
        wishList: response.data.wishList
      });
    });
  }

  deleteFromWishList(listing) {
    axios.delete(`/api/listing/wishlist/${listing.id}`).then(() =>
      axios.get("api/wishlist").then(response => {
        this.setState({
          listing: response.data
        });
      })
    );
  }
  render() {
    const wishList = this.state.wishList.map((val, i) => {
      const {
        city,
        id,
        image,
        loggedInUser,
        monthlyCost,
        moveInDate,
        rentLength,
        state,
        userID,
        address,
        rent
      } = val;

      console.log(val);

      return (
        <Card style={{ height: "400px", marginTop: 0 }}>
          <Link to={`/listing/${id}`}>
            <Image style={{ width: "100%", height: "200px" }} src={image} />
          </Link>
          <Card.Content>
            <Card.Header>
              ${monthlyCost} in {city}, {state}
            </Card.Header>
            <Card.Meta>
              <span className="date">
                {moment(moveInDate).format("MMM Do YYYY")} - {rentLength} Months
              </span>
            </Card.Meta>
            <Card.Description />
          </Card.Content>
          <Card.Content extra>
           <a > Delete From Wishlist</a>
          </Card.Content>
        </Card>
      );
    });
    return <div className="search-results">{wishList}</div>;
  }
}
export default connect(state => state)(Wishlist);

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
      wishList: [],
      listings: []
    };
  }

  componentDidMount() {
    axios.get(`/api/wishlist/${this.props.user.authID}`).then(response => {
      this.setState({
        wishList: response.data.wishList
      });
    });
  }

  deleteFromWishList(id) {
    axios
      .delete(`/api/delete/${this.props.user.authID}`, {
        data: { wishListID: id }
      })
      .then(response => {
        console.log(response);
        this.setState({
          wishList: response.data.wishList
        });
      });
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

      return (
        <Card
          className="room-card"
          style={{ height: "400px", margin: "0 5px" }}
        >
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
            <p
              class="wishlist-action"
              onClick={() => this.deleteFromWishList(id)}
            >
              {" "}
              <i class="fas fa-times" /> Delete From Wishlist
            </p>
          </Card.Content>
        </Card>
      );
    });
    return (
      <div className="wishlist-listings" style={{ width: "90%" }}>
        {wishList}
      </div>
    );
  }
}
export default connect(state => state)(Wishlist);

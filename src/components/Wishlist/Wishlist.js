import React, { Component } from "react";
import axios from "axios";
import RoomCard from "../RoomCard/RoomCard";
import "./Wishlist.css";

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: []
    };
  }

  componentDidMount() {
    axios.get("/api/favorite").then(response => {
      this.setState({
        favotite: response.data
      });
    });
  }

  deleteFromFavList(listing) {
    axios.delete(`/api/listing/favorite/${listing.id}`).then(() =>
      axios.get("api/favorite").then(response => {
        this.setState({
          cart: response.data
        });
      })
    );
  }
  render() {
    console.log(this.state.selectedState);
    const favorite = this.state.favorite.map((val, i) => {
      const { address, amenities, human, prefs, rent, userID, _id } = val;

      return (
        <RoomCard
          address={address}
          amenities={amenities}
          human={human}
          prefs={prefs}
          rent={rent}
          userID={userID}
          id={_id}
          key={i}
          text="Delete From Favorite"
          onSubmit={() => this.deleteFromFavList(1, _id, 1)}
        />
      );
    });
    return(
      <div className="search-results">{favorite}</div>
    )
  }

}
export default Wishlist;
